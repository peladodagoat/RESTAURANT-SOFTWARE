import AdminShell from '@/components/admin/AdminShell';

export const metadata = { title: 'Bella Vista — Admin' };

export default function AdminLayout({ children }) {
  return <AdminShell>{children}</AdminShell>;
}
