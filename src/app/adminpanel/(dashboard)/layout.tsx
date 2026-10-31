import { Suspense, type ReactNode } from 'react';
import { ProtectedRoute } from '@/components/admin/ProtectedRoute';
import { AdminShell } from '@/components/admin/AdminShell';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={null}>
      <ProtectedRoute>
        <AdminShell>{children}</AdminShell>
      </ProtectedRoute>
    </Suspense>
  );
}
