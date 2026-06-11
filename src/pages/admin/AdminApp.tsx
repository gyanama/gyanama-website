import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '@/components/admin/AuthProvider';
import { ProtectedRoute } from '@/components/admin/ProtectedRoute';
import { AdminLayout } from '@/components/layout/AdminLayout';
import AdminLogin from './Login';
import PostsList from './PostsList';
import PostEditor from './PostEditor';
import Analytics from './Analytics';

/**
 * Self-contained admin application mounted at /adminpanel/*. Wraps everything in
 * AuthProvider and gates the dashboard behind ProtectedRoute. Lazy-loaded from
 * App.tsx so no admin/auth code ships in the public bundle.
 */
export default function AdminApp() {
  return (
    <AuthProvider>
      <Routes>
        <Route index element={<Navigate to="posts" replace />} />
        <Route path="login" element={<AdminLogin />} />
        <Route
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="posts" element={<PostsList />} />
          <Route path="posts/new" element={<PostEditor />} />
          <Route path="posts/:id/edit" element={<PostEditor />} />
          <Route path="analytics" element={<Analytics />} />
        </Route>
        <Route path="*" element={<Navigate to="posts" replace />} />
      </Routes>
    </AuthProvider>
  );
}
