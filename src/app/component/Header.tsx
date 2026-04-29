'use client';

import { Search, Bell, ChevronDown, Menu, LogOut } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Header({ onMenuClick, title = 'Dashboard', subtitle = 'Welcome back, Admin!' }: { onMenuClick?: () => void; title?: string; subtitle?: string }) {
  const router = useRouter();
  const [searchFocused, setSearchFocused] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const handleLogout = async () => {
    try {
       await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`, {
        method: 'POST',
        credentials: 'include'
      });
    } catch {
      // Ignore error
    }

    if (typeof window !== 'undefined') {
      localStorage.removeItem('isLoggedIn');
    }

    router.push('/login');
  };

  const notifications = [
    { id: 1, type: 'booking', message: 'New booking from Rahul Sharma', time: '5 min ago' },
    { id: 2, type: 'checkin', message: 'Guest checked in - Room 201', time: '15 min ago' },
    { id: 3, type: 'payment', message: 'Payment received - ₹12,500', time: '30 min ago' },
    { id: 4, type: 'maintenance', message: 'Maintenance request - Room 104', time: '1 hour ago' },
  ];

  return (
    <header className="bg-white border-b border-slate-200 px-4 lg:px-6 py-3 sticky top-0 z-30 shrink-0">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            <Menu className="w-5 h-5 text-slate-600" />
          </button>
          <div>
            <h1 className="text-xl font-semibold text-slate-800">{title}</h1>
            <p className="text-sm text-slate-500 hidden sm:block">{subtitle}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <div
            className={`hidden sm:flex items-center bg-slate-50 border rounded-lg transition-all duration-200 ${
              searchFocused ? 'border-blue-400 ring-2 ring-blue-100' : 'border-slate-200'
            }`}
          >
            <Search className="w-4 h-4 text-slate-400 ml-3" aria-hidden="true" />
            <input
              type="search"
              placeholder="Search..."
              className="bg-transparent border-none outline-none text-sm py-2 px-3 w-48 lg:w-64 text-slate-700 placeholder:text-slate-400"
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              aria-label="Search dashboard"
            />
          </div>

           <div className="relative">
             <button
               onClick={() => setNotificationsOpen(!notificationsOpen)}
               className="relative p-2 hover:bg-slate-100 rounded-lg transition-colors"
               aria-label={`Notifications${notifications.length > 0 ? ` (${notifications.length} unread)` : ''}`}
               aria-expanded={notificationsOpen}
             >
               <Bell className="w-5 h-5 text-slate-600" aria-hidden="true" />
               <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" aria-hidden="true"></span>
               {notifications.length > 0 && (
                 <span className="sr-only">{notifications.length} unread notifications</span>
               )}
             </button>

            {notificationsOpen && (
              <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden animate-fadeIn">
                <div className="p-3 border-b border-slate-100 flex items-center justify-between">
                  <p className="font-medium text-slate-800">Notifications</p>
                  <button className="text-xs text-blue-600 hover:text-blue-700">Mark all as read</button>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.map((notif) => (
                    <div key={notif.id} className="p-3 border-b border-slate-50 hover:bg-slate-50 transition-colors cursor-pointer">
                      <p className="text-sm text-slate-800">{notif.message}</p>
                      <p className="text-xs text-slate-400 mt-1">{notif.time}</p>
                    </div>
                  ))}
                </div>
                <div className="p-2 border-t border-slate-100">
                  <button className="w-full text-center py-2 text-sm text-slate-600 hover:text-slate-800 transition-colors">
                    View All Notifications
                  </button>
                </div>
              </div>
            )}
          </div>

           <div className="relative">
             <button
               onClick={() => setProfileOpen(!profileOpen)}
               className="flex items-center gap-2 p-1.5 hover:bg-slate-100 rounded-lg transition-colors"
               aria-label="User profile menu"
               aria-expanded={profileOpen}
             >
               <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                 <span className="text-white text-sm font-medium">A</span>
               </div>
               <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform hidden sm:block ${profileOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
             </button>

            {profileOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden animate-fadeIn">
                <div className="p-3 border-b border-slate-100">
                  <p className="font-medium text-slate-800">Admin User</p>
                  <p className="text-sm text-slate-500">admin@hotel.com</p>
                </div>
                <div className="p-1">
                  <button className="w-full text-left px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">
                    Profile Settings
                  </button>
                    <button onClick={handleLogout} className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-red-300">
                      <LogOut className="w-4 h-4" aria-hidden="true" />
                      Logout
                    </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}