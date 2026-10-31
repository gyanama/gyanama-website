import { Suspense } from 'react';
import AdminLogin from '@/components/admin/Login';

export default function Page() {
  return (
    <Suspense fallback={null}>
      <AdminLogin />
    </Suspense>
  );
}
