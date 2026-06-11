import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { FileText, PlusCircle, BarChart3, LogOut } from 'lucide-react';
import { SEOHead } from '@/components/seo/SEOHead';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useAuth } from '@/components/admin/AuthProvider';

const navItems = [
  { to: '/adminpanel/posts', label: 'Posts', icon: FileText, end: true },
  { to: '/adminpanel/posts/new', label: 'New Post', icon: PlusCircle, end: true },
  { to: '/adminpanel/analytics', label: 'Analytics', icon: BarChart3, end: true },
];

export function AdminLayout() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/adminpanel/login', { replace: true });
  };

  return (
    <div className="min-h-screen flex bg-muted/30">
      {/* Admin pages must never be indexed */}
      <SEOHead title="Admin" noindex />

      {/* Sidebar */}
      <aside className="hidden md:flex w-60 flex-col border-r border-border bg-white">
        <div className="px-6 h-16 flex items-center border-b border-border">
          <span className="font-semibold tracking-tight">GYANAMA Admin</span>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                )
              }
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="p-3 border-t border-border">
          <p className="px-3 pb-2 text-xs text-muted-foreground truncate">{user?.email}</p>
          <Button variant="ghost" className="w-full justify-start" onClick={handleSignOut}>
            <LogOut className="w-4 h-4" /> Sign out
          </Button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile top bar */}
        <header className="md:hidden h-14 flex items-center justify-between px-4 border-b border-border bg-white">
          <span className="font-semibold">GYANAMA Admin</span>
          <Button variant="ghost" size="sm" onClick={handleSignOut}>
            <LogOut className="w-4 h-4" />
          </Button>
        </header>
        {/* Mobile nav */}
        <nav className="md:hidden flex gap-2 p-3 overflow-x-auto border-b border-border bg-white">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm whitespace-nowrap',
                  isActive ? 'bg-primary/10 text-primary' : 'text-muted-foreground bg-muted',
                )
              }
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <main className="flex-1 p-4 md:p-8 max-w-5xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
