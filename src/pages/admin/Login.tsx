import { useState, FormEvent } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Loader2, Lock } from 'lucide-react';
import { SEOHead } from '@/components/seo/SEOHead';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/components/admin/AuthProvider';

export default function AdminLogin() {
  const { session, isAdmin, loading, signIn } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Already authenticated admins skip the login screen.
  if (!loading && session && isAdmin) {
    return <Navigate to="/adminpanel/posts" replace />;
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    const { error: signInError } = await signIn(email.trim(), password);
    setSubmitting(false);
    if (signInError) {
      setError(signInError);
      return;
    }
    navigate('/adminpanel/posts', { replace: true });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
      <SEOHead title="Admin Login" noindex />
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg border border-border p-8">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-semibold text-lg leading-tight">Admin Login</h1>
            <p className="text-xs text-muted-foreground">GYANAMA blog & analytics</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <Button type="submit" variant="hero" className="w-full" disabled={submitting}>
            {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Sign in'}
          </Button>
        </form>
      </div>
    </div>
  );
}
