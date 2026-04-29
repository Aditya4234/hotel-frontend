'use client';

import { useEffect, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import DashboardLayout from '../component/DashboardLayout';
import StatsCards from '../component/StatsCards';
import QuickActions from '../component/QuickActions';
import { statsData, bookingOverviewData, roomStatusData, recentBookingsData, activitiesData } from '../../data/dashboardData';

const ChartsSection = dynamic(() => import('../component/Charts'), {
  loading: () => <div className="card p-6 h-72 animate-pulse bg-slate-100" />,
  ssr: false,
});

const RecentBookings = dynamic(() => import('../component/RecentBookings'), {
  loading: () => <div className="card p-6 h-48 animate-pulse bg-slate-100" />,
  ssr: false,
});

const ActivitiesPanel = dynamic(() => import('../component/Activities'), {
  loading: () => <div className="card p-6 h-48 animate-pulse bg-slate-100" />,
  ssr: false,
});

function DashboardContent() {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
         const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`, {
          method: 'GET',
          credentials: 'include',
        });
        if (!res.ok) {
          router.push('/login');
        }
      } catch {
        router.push('/login');
      }
    };
    checkAuth();
  }, [router]);

  return (
    <DashboardLayout title="Dashboard" subtitle="Welcome back, Admin!">
      <div className="space-y-6">
        <StatsCards data={statsData} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Suspense fallback={<div className="card p-6 h-72 animate-pulse bg-slate-100" />}>
              <ChartsSection bookingData={bookingOverviewData} roomData={roomStatusData} />
            </Suspense>
          </div>
          <div>
            <QuickActions />
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2">
            <Suspense fallback={<div className="card p-6 h-48 animate-pulse bg-slate-100" />}>
              <RecentBookings data={recentBookingsData} />
            </Suspense>
          </div>
          <div>
            <Suspense fallback={<div className="card p-6 h-48 animate-pulse bg-slate-100" />}>
              <ActivitiesPanel data={activitiesData} />
            </Suspense>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default function Dashboard() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-slate-50"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900" /></div>}>
      <DashboardContent />
    </Suspense>
  );
}
