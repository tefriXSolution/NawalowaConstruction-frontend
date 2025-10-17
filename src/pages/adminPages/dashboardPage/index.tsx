import React, { useEffect, useMemo, useState } from 'react';
import { Contact } from '@/pages/adminPages/contactsPage/types';
import { contactApiService } from '@/pages/adminPages/contactsPage/services/contactApiService';

type DashboardMetrics = {
  contacts: {
    total: number;
    unread: number;
  };
  rentals: {
    total: number;
    available: number;
  };
};

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL as string | undefined) || 'http://localhost:3001/api';

export const DashboardPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [metrics, setMetrics] = useState<DashboardMetrics>({
    contacts: { total: 0, unread: 0 },
    rentals: { total: 0, available: 0 },
  });

  const token = useMemo(() => localStorage.getItem('token'), []);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Contacts: reuse existing service
        const contactsRes = await contactApiService.getContacts();
        const contacts: Contact[] = contactsRes.data || [];
        const totalMessages = contacts.length;
        const unreadMessages = contacts.filter((c) => !c.isRead).length;

        // Rentals: fetch list and compute availability.
        // Try multiple known paths based on backend routes and legacy endpoints.
        const base = API_BASE_URL.replace(/\/$/, '');
        const paths = [
          '/rentals',
          '/rentItems',
          '/rent-items',
          '/rentItems/list-rent-items',
          '/rent-items/list-rent-items',
        ];

        let rentals: Array<{ availability?: boolean }> = [];
        let lastStatus: number | undefined;
        for (const p of paths) {
          try {
            const res = await fetch(`${base}${p}`, {
              headers: {
                'Content-Type': 'application/json',
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
              },
            });
            lastStatus = res.status;
            if (!res.ok) continue;
            const json = await res.json();
            // Support both { data: [...] } and raw array
            const arr = Array.isArray(json) ? json : Array.isArray(json?.data) ? json.data : [];
            rentals = arr as Array<{ availability?: boolean }>;
            break;
          } catch {
            // continue trying next path
          }
        }
        if (!rentals.length && lastStatus && lastStatus >= 400) {
          throw new Error(`Failed to load rentals (${lastStatus})`);
        }
        const totalRentals = rentals.length;
        const availableRentals = rentals.filter((r) => r.availability === true).length;

        if (!isMounted) return;
        setMetrics({
          contacts: { total: totalMessages, unread: unreadMessages },
          rentals: { total: totalRentals, available: availableRentals },
        });
      } catch (err) {
        if (!isMounted) return;
        setError(err instanceof Error ? err.message : 'Failed to load dashboard data');
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();
    return () => {
      isMounted = false;
    };
  }, [token]);

  return (
    <div className="p-6">
      <h1 className="mb-6 text-2xl font-semibold text-gray-900">Dashboard</h1>

      {loading ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-28 animate-pulse rounded-lg bg-gray-100" />
          ))}
        </div>
      ) : error ? (
        <div className="rounded-md border border-red-200 bg-red-50 p-4 text-red-700">
          {error}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <MetricCard title="Unread Messages" value={metrics.contacts.unread} variant="warning" />
          <MetricCard title="Total Messages" value={metrics.contacts.total} />
          <MetricCard title="Available Items" value={metrics.rentals.available} variant="success" />
          <MetricCard title="Total Items" value={metrics.rentals.total} />
        </div>
      )}
    </div>
  );
};

type MetricCardProps = {
  title: string;
  value: number | string;
  variant?: 'default' | 'success' | 'warning' | 'danger';
};

const variantClasses: Record<NonNullable<MetricCardProps['variant']>, string> = {
  default: 'bg-white text-gray-900',
  success: 'bg-green-50 text-green-800',
  warning: 'bg-yellow-50 text-yellow-800',
  danger: 'bg-red-50 text-red-800',
};

const MetricCard: React.FC<MetricCardProps> = ({ title, value, variant = 'default' }) => (
  <div className={`rounded-lg border border-gray-200 p-5 shadow-sm ${variantClasses[variant]}`}>
    <div className="text-sm font-medium opacity-80">{title}</div>
    <div className="mt-2 text-3xl font-bold">{value}</div>
  </div>
);

export default DashboardPage;
