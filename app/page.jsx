import { redirect } from 'next/navigation';

export default function Home({ searchParams }) {
  const table = searchParams?.table || '1';
  redirect(`/menu?table=${table}`);
}
