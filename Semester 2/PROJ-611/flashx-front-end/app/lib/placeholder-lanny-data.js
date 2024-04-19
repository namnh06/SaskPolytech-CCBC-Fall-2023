// This file contains placeholder data that you'll be replacing with real data in the Data Fetching chapter:
// https://nextjs.org/learn/dashboard-app/fetching-data
const users = [
  {
    id: '410544b2-4001-4271-9855-fec4b6a6442a',
    name: 'Nam Nguyen',
    email: 'nguyen0465@saskpolytech.ca',
    password: 'saskpolytech',
    image_url: '/users/nam-nguyen.png'
  },
  {
    id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
    name: 'Tai Nguyen',
    email: 'nguyen6169@saskpolytech.ca',
    password: 'saskpolytech',
    image_url: '/users/tai-nguyen.png'
  },
  {
    id: '50ca3e18-62cd-11ee-8c99-0242ac120002',
    name: 'Hieu Nguyen',
    email: 'nguyen8189@saskpolytech.ca',
    password: 'saskpolytech',
    image_url: '/users/hieu-nguyen.png'
  },
  {
    id: '76d65c26-f784-44a2-ac19-586678f7c2f2',
    name: 'Lanny Mcdonald',
    email: 'lanny@hotmail.com',
    password: 'saskpolytech',
    image_url: '/users/lanny-mcdonald.png'
  },
  {
    id: '96d63c27-f384-14a2-ac29-586638f7c2f2',
    name: 'Thien',
    email: 'admin@thienvietnam.com',
    password: 'saskpolytech',
    image_url: '/users/nam-nguyen.png'
  }
];

const customers = [
  {
    id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
    name: 'Tai Nguyen',
    email: 'nguyen6169@saskpolytech.ca',
    image_url: '/customers/tai-nguyen.png',
  },
  {
    id: '3958dc9e-742f-4377-85e9-fec4b6a6442a',
    name: 'Hieu Nguyen',
    email: 'nguyen8189@saskpolytech.ca',
    image_url: '/customers/hieu-nguyen.png',
  },
  {
    id: '3958dc9e-737f-4377-85e9-fec4b6a6442a',
    name: 'Nam Nguyen',
    email: 'nguyen0465@saskpolytech.ca',
    image_url: '/customers/nam-nguyen.png',
  },
  {
    id: '50ca3e18-62cd-11ee-8c99-0242ac120002',
    name: 'Lanny Mcdonald',
    email: 'lanny@hotmail.com',
    image_url: '/customers/lanny-mcdonald.png',
  },
];

const invoices = [
  {
    customer_id: customers[3].id,
    amount: 3457,
    status: 'waiting',
    date: '2024-03-05',
    image_url: '/invoices/invoice.png'
  },
  {
    customer_id: customers[3].id,
    amount: 5424,
    status: 'waiting',
    date: '2024-02-16',
    image_url: '/invoices/invoice.png'
  },
  {
    customer_id: customers[3].id,
    amount: 10258,
    status: 'waiting',
    date: '2024-02-27',
    image_url: '/invoices/invoice.png'
  },
  {
    customer_id: customers[3].id,
    amount: 12545,
    status: 'completed',
    date: '2024-03-09',
    image_url: '/invoices/invoice.png'
  },
  {
    customer_id: customers[3].id,
    amount: 4250,
    status: 'completed',
    date: '2024-02-17',
    image_url: '/invoices/invoice.png'
  },
  {
    customer_id: customers[3].id,
    amount: 8546,
    status: 'completed',
    date: '2024-02-07',
    image_url: '/invoices/invoice.png'
  },
  {
    customer_id: customers[3].id,
    amount: 5059,
    status: 'completed',
    date: '2024-02-19',
    image_url: '/invoices/invoice.png'
  },
  {
    customer_id: customers[3].id,
    amount: 8945,
    status: 'completed',
    date: '2024-02-03',
    image_url: '/invoices/invoice.png'
  },
  {
    customer_id: customers[3].id,
    amount: 8135,
    status: 'completed',
    date: '2024-03-24',
    image_url: '/invoices/invoice.png'
  },
  {
    customer_id: customers[3].id,
    amount: 4925,
    status: 'completed',
    date: '2024-03-25',
    image_url: '/invoices/invoice.png'
  },
  {
    customer_id: customers[3].id,
    amount: 10304,
    status: 'cancelled',
    date: '2024-03-25',
    image_url: '/invoices/invoice.png'
  },
  {
    customer_id: customers[3].id,
    amount: 20500,
    status: 'completed',
    date: '2024-03-25',
    image_url: '/invoices/invoice.png'
  },
  {
    customer_id: customers[3].id,
    amount: 13500,
    status: 'waiting',
    date: '2024-03-25',
    image_url: '/invoices/invoice.png'
  },
  {
    customer_id: customers[3].id,
    amount: 6259,
    status: 'waiting',
    date: '2024-03-27',
    image_url: '/invoices/invoice.png'
  },
];

const revenue = [
  { month: 'Jan', revenue: 80 },
  { month: 'Feb', revenue: 300 },
  { month: 'Mar', revenue: 400 },
  // { month: 'Apr', revenue: 150 },
  // { month: 'May', revenue: 2300 },
  // { month: 'Jun', revenue: 3200 },
  // { month: 'Jul', revenue: 3500 },
  // { month: 'Aug', revenue: 3700 },
  // { month: 'Sep', revenue: 2500 },
  // { month: 'Oct', revenue: 2800 },
  // { month: 'Nov', revenue: 3000 },
  // { month: 'Dec', revenue: 4800 },
];

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

module.exports = {
  users,
  customers,
  invoices,
  revenue,
};
