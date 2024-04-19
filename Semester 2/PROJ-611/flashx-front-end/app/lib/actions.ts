'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import Form from '../ui/invoices/create-form';

const FormSchema = z.object({
    id: z.string(),
    customerId: z.string({
        invalid_type_error: 'Please select a courier.'
    }),
    amount: z.coerce.number().gt(0, { message: 'Please enter an amount greater than $0.'}),
    status: z.enum(['waiting', 'delivering', 'completed', 'cancelled'], {
        invalid_type_error: 'Please select an invoice status.'
    }),
    file: z.instanceof(File),
    date: z.string(),
});

const CreateInvoice = FormSchema.omit({id: true, date: true});

export type State = {
    errors?: {
        customerId?: string[];
        amount?: string[];
        status?: string[];
        file?: File[];
    };
    message?: string | null;
}

export async function createInvoice(prevState: State, formData: FormData) {
    const validatedFields = CreateInvoice.safeParse({
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status'),
        file: formData.get('file'),
    });

    if(!validatedFields.success) {
        const fieldErrors = validatedFields.error.flatten().fieldErrors;
        return {
            errors: {
                ...fieldErrors,
                file: fieldErrors.file ? fieldErrors.file.map(filename => new File([], filename)) : undefined,
            },
            message: 'Missing Fields. Failed to Create Invoice',
        }
    }

    const { customerId, amount, status, file } = validatedFields.data;
    const amountInCents = amount * 100;
    const date = new Date().toISOString().split('T')[0];

    const response = await fetch(
        process.env.NEXT_PUBLIC_BASE_URL + '/api/upload',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ filename: file.name, contentType: file.type }),
        },
      );
  
      if (response.ok) {
        const { url, fields } = await response.json();
  
        const formData = new FormData();
        Object.entries(fields).forEach(([key, value]) => {
          formData.append(key, value as string);
        });
        formData.append('file', file);
  
        const uploadResponse = await fetch(url, {
          method: 'POST',
          body: formData,
        });
  
        if (uploadResponse.ok) {
          console.log('Upload successful!');
        } else {
          console.error('S3 Upload Error:', uploadResponse);
          console.error('Upload failed.');
        }
      } else {
        console.log('Failed to get pre-signed URL.');
      }

    try {
        await sql`
        INSERT INTO invoices (customer_id, amount, status, date, image_url)
        VALUES (${customerId}, ${amountInCents}, ${status}, ${date}, ${file.name})
        `;
    } catch (error) {
        return {
            message: 'Database Error: Failed to Create Invoice.'
        };
    }

    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
}

const UpdateInvoice = FormSchema.omit({ id: true, date: true });

export async function updateInvoice(
    id: string,
    prevState: State,
    formData: FormData
) {
    const validatedFields = UpdateInvoice.safeParse({
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status'),
        file: formData.get('file'),
    });

    if(!validatedFields.success) {
        const fieldErrors = validatedFields.error.flatten().fieldErrors;
        return {
            errors: {
                ...fieldErrors,
                file: fieldErrors.file ? fieldErrors.file.map(filename => new File([], filename)) : undefined,
            },
            message: 'Missing Fields. Failed to Create Invoice',
        }
    }

    const { customerId, amount, status, file } = validatedFields.data;
    const amountInCents = amount * 100;

    const response = await fetch(
      process.env.NEXT_PUBLIC_BASE_URL + '/api/upload',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ filename: file.name, contentType: file.type }),
      },
    );

    if (response.ok) {
      const { url, fields } = await response.json();

      const formData = new FormData();
      Object.entries(fields).forEach(([key, value]) => {
        formData.append(key, value as string);
      });
      formData.append('file', file);

      const uploadResponse = await fetch(url, {
        method: 'POST',
        body: formData,
      });

      if (uploadResponse.ok) {
        console.log('Upload successful!');
      } else {
        console.error('S3 Upload Error:', uploadResponse);
        console.error('Upload failed.');
      }
    } else {
      console.log('Failed to get pre-signed URL.');
    }

    try {
        await sql`
        UPDATE invoices
        SET status = ${status}, evidence_image_url = ${file.name}
        WHERE id = ${id}
        `;
    } catch (error) {
        return { message: 'Database Error: Failed to Update Invoice.' }
    }

    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
}

export async function deleteInvoice(id: string) {
    throw new Error('Failed to Delete Invoice.');

    try {
        await sql`
        DELETE FROM invoices WHERE id = ${id}
        `;
        revalidatePath('/dashboard/invoices');
        return { message: 'Deleted Invoice.'};
    } catch (error) {
        return { message: 'Database Error: Failed to Delete Invoice.' }
    }
}

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        await signIn('credentials', formData);
    } catch (error) {
        if(error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid Credentials. Please try again.';
                default:
                    return 'Something went wrong. Please try again.';
            }
        }
        throw error;
    }
}