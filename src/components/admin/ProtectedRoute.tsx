'use client';

import { useEffect, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { useAuth } from './AuthProvider';

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { session, isAdmin, loading } = useAuth();
  const router = useRouter();
  const allowed = !!session && isAdmin;

  useEffect(() => {
    if (!loading && !allowed) router.replace('/adminpanel/login');
  }, [loading, allowed, router]);

  if (loading || !allowed) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return <>{children}</>;
}
