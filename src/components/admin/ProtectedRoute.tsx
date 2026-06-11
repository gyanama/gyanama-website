import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useAuth } from './AuthProvider';

/**
 * Guards admin routes. While the session resolves, shows a spinner. If there is
 * no session, or the user is not in the `admins` allowlist, redirects to login.
 * (RLS independently enforces this server-side — this is just UX.)
 */
export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { session, isAdmin, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!session || !isAdmin) {
    return <Navigate to="/adminpanel/login" replace />;
  }

  return <>{children}</>;
}
