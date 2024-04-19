import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | FlashYXE Dashboard',
    default: 'FlashYXE Dashboard',
  },
  description:
    'Part of Saskatchewan Polytechnic’s Cloud Computing and Blockchain program, our project, led by instructor Mayra Samaniego MSc. Ph.D. (c) , is here to revolutionize.',
  metadataBase: new URL('https://namcoi.com'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
