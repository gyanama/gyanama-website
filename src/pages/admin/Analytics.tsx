import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { Loader2, Users, Clock, MousePointerClick } from 'lucide-react';
import {
  useDailyViews,
  useTopPaths,
  useSessionSummary,
  useDeviceBreakdown,
} from '@/hooks/queries/useAnalytics';

const COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b'];

function StatCard({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div className="bg-white rounded-2xl border border-border p-5">
      <div className="flex items-center gap-2 text-muted-foreground mb-2">
        <Icon className="w-4 h-4" />
        <span className="text-sm">{label}</span>
      </div>
      <p className="text-3xl font-semibold">{value}</p>
    </div>
  );
}

function formatDuration(seconds: number): string {
  const s = Math.round(seconds);
  if (s < 60) return `${s}s`;
  const m = Math.floor(s / 60);
  const rem = s % 60;
  return `${m}m ${rem}s`;
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-border p-5">
      <h2 className="font-semibold mb-4">{title}</h2>
      {children}
    </div>
  );
}

export default function Analytics() {
  const daily = useDailyViews();
  const topPaths = useTopPaths();
  const summary = useSessionSummary();
  const devices = useDeviceBreakdown();

  const loading =
    daily.isLoading || topPaths.isLoading || summary.isLoading || devices.isLoading;
  const error = daily.isError || topPaths.isError || summary.isError || devices.isError;

  // Show the most recent 30 days of view data.
  const dailyData = (daily.data ?? []).slice(-30).map((d) => ({
    day: new Date(d.day).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }),
    views: Number(d.views),
  }));

  const pathData = (topPaths.data ?? []).map((p) => ({
    path: p.path.length > 24 ? `${p.path.slice(0, 24)}…` : p.path,
    views: Number(p.views),
  }));

  const deviceData = (devices.data ?? []).map((d) => ({
    name: d.device,
    value: Number(d.sessions),
  }));

  const s = summary.data;

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Analytics</h1>

      {loading && (
        <div className="flex items-center gap-2 text-muted-foreground py-12 justify-center">
          <Loader2 className="w-5 h-5 animate-spin" /> Loading analytics…
        </div>
      )}

      {error && (
        <p className="text-destructive py-12 text-center">
          Failed to load analytics. Check your Supabase configuration.
        </p>
      )}

      {!loading && !error && (
        <div className="space-y-6">
          {/* Stat cards (Postgres numeric/bigint can arrive as strings → coerce) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <StatCard
              label="Total sessions"
              value={Number(s?.sessions ?? 0).toLocaleString('en-IN')}
              icon={Users}
            />
            <StatCard
              label="Avg. session time"
              value={formatDuration(Number(s?.avg_duration_seconds ?? 0))}
              icon={Clock}
            />
            <StatCard
              label="Bounce rate"
              value={`${Math.round(Number(s?.bounce_rate_pct ?? 0))}%`}
              icon={MousePointerClick}
            />
          </div>

          {/* Views over time */}
          <Panel title="Page views (last 30 days)">
            {dailyData.length === 0 ? (
              <p className="text-sm text-muted-foreground py-8 text-center">No data yet.</p>
            ) : (
              <ResponsiveContainer width="100%" height={260}>
                <AreaChart data={dailyData}>
                  <defs>
                    <linearGradient id="views" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#eef2f7" />
                  <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                  <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="views"
                    stroke="#3b82f6"
                    fill="url(#views)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </Panel>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top pages */}
            <Panel title="Top pages">
              {pathData.length === 0 ? (
                <p className="text-sm text-muted-foreground py-8 text-center">No data yet.</p>
              ) : (
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={pathData} layout="vertical" margin={{ left: 24 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#eef2f7" horizontal={false} />
                    <XAxis type="number" allowDecimals={false} tick={{ fontSize: 12 }} />
                    <YAxis
                      type="category"
                      dataKey="path"
                      width={140}
                      tick={{ fontSize: 11 }}
                    />
                    <Tooltip />
                    <Bar dataKey="views" fill="#8b5cf6" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </Panel>

            {/* Device breakdown */}
            <Panel title="Devices">
              {deviceData.length === 0 ? (
                <p className="text-sm text-muted-foreground py-8 text-center">No data yet.</p>
              ) : (
                <ResponsiveContainer width="100%" height={280}>
                  <PieChart>
                    <Pie
                      data={deviceData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={2}
                    >
                      {deviceData.map((_, i) => (
                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </Panel>
          </div>
        </div>
      )}
    </div>
  );
}
