import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

export interface DailyViews {
  day: string;
  views: number;
}
export interface TopPath {
  path: string;
  views: number;
}
export interface SessionSummary {
  sessions: number;
  avg_duration_seconds: number;
  bounce_rate_pct: number;
}
export interface DeviceBreakdown {
  device: string;
  sessions: number;
}

// All of these read RLS-protected views — only an authenticated admin gets rows.

export function useDailyViews() {
  return useQuery({
    queryKey: ['analytics', 'daily'],
    queryFn: async (): Promise<DailyViews[]> => {
      const { data, error } = await supabase
        .from('analytics_daily_views')
        .select('*')
        .order('day', { ascending: true });
      if (error) throw error;
      return (data ?? []) as DailyViews[];
    },
  });
}

export function useTopPaths() {
  return useQuery({
    queryKey: ['analytics', 'top-paths'],
    queryFn: async (): Promise<TopPath[]> => {
      const { data, error } = await supabase
        .from('analytics_top_paths')
        .select('*')
        .limit(10);
      if (error) throw error;
      return (data ?? []) as TopPath[];
    },
  });
}

export function useSessionSummary() {
  return useQuery({
    queryKey: ['analytics', 'summary'],
    queryFn: async (): Promise<SessionSummary> => {
      const { data, error } = await supabase
        .from('analytics_session_summary')
        .select('*')
        .maybeSingle();
      if (error) throw error;
      return (
        (data as SessionSummary) ?? {
          sessions: 0,
          avg_duration_seconds: 0,
          bounce_rate_pct: 0,
        }
      );
    },
  });
}

export function useDeviceBreakdown() {
  return useQuery({
    queryKey: ['analytics', 'devices'],
    queryFn: async (): Promise<DeviceBreakdown[]> => {
      const { data, error } = await supabase
        .from('analytics_device_breakdown')
        .select('*');
      if (error) throw error;
      return (data ?? []) as DeviceBreakdown[];
    },
  });
}
