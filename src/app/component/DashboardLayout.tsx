'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from './Sidebar';
import Header from './Header';

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

function DashboardLayoutContent({ children, title, subtitle }: DashboardLayoutProps) {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = () => {
      if (typeof window !== 'undefined') {
        try {
          const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
          setIsAuthenticated(loggedIn);
          if (!loggedIn) {
            router.replace('/login');
          }
        } catch {
          setIsAuthenticated(false);
          router.replace('/login');
        }
      }
    };

    if (document.visibilityState === 'hidden') {
      const handleVisibilityChange = () => {
        if (document.visibilityState === 'visible') {
          checkAuth();
        }
      };
      document.addEventListener('visibilitychange', handleVisibilityChange, { once: true });
    } else {
      checkAuth();
    }
  }, [router]);

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-slate-50">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col min-h-screen w-full lg:w-auto">
        <Header
          onMenuClick={() => setSidebarOpen(true)}
          title={title}
          subtitle={subtitle || `Welcome back, Admin!`}
        />

        <main className="flex-1 p-4 lg:p-6 space-y-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

export default function DashboardLayout(props: DashboardLayoutProps) {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-slate-50"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900" /></div>}>
      <DashboardLayoutContent {...props} />
    </Suspense>
  );
}