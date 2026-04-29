'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  CalendarDays,
  Users,
  DoorOpen,
  Building2,
  UserCog,
  Sparkles,
  CreditCard,
  BarChart3,
  Settings,
  ChevronLeft,
  Star,
  X,
} from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  LayoutDashboard,
  CalendarDays,
  Users,
  DoorOpen,
  Building2,
  UserCog,
  Sparkles,
  CreditCard,
  BarChart3,
  Settings,
};

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard', href: '/dashboard' },
  { id: 'bookings', label: 'Bookings', icon: 'CalendarDays', href: '/bookings' },
  { id: 'guests', label: 'Guests', icon: 'Users', href: '/guests' },
  { id: 'rooms', label: 'Rooms', icon: 'DoorOpen', href: '/rooms' },
  { id: 'room-types', label: 'Room Types', icon: 'Building2', href: '/room-types' },
  { id: 'staff', label: 'Staff', icon: 'UserCog', href: '/staff' },
  { id: 'services', label: 'Services', icon: 'Sparkles', href: '/services' },
  { id: 'payments', label: 'Payments', icon: 'CreditCard', href: '/payments' },
  { id: 'reports', label: 'Reports', icon: 'BarChart3', href: '/reports' },
  { id: 'settings', label: 'Settings', icon: 'Settings', href: '/settings' },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed lg:sticky lg:top-0 left-0 h-dvh z-50 transition-all duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          ${collapsed ? 'w-20' : 'w-64'}
          bg-gradient-to-b from-[#1e3a5f] via-[#1e3a5f] to-[#0f2744]
          flex flex-col overflow-hidden
          ${isOpen ? 'shadow-2xl' : ''}
        `}
      >
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          {!collapsed && (
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-white font-semibold text-lg">Hotel<span className="text-blue-300">Hub</span></h1>
                <p className="text-blue-300 text-xs">Management</p>
              </div>
            </div>
          )}
          {collapsed && (
            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center mx-auto">
              <Building2 className="w-6 h-6 text-white" />
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex p-1.5 hover:bg-white/10 rounded-lg transition-colors"
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <ChevronLeft className={`w-5 h-5 text-blue-200 transition-transform ${collapsed ? 'rotate-180' : ''}`} />
          </button>
          <button
            onClick={onClose}
            className="lg:hidden p-1.5 hover:bg-white/10 rounded-lg transition-colors"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5 text-blue-200" />
          </button>
        </div>

        <nav className="flex-1 py-4 px-3 overflow-y-auto scrollbar-hide">
          <ul className="space-y-1">
             {navItems.map((item) => {
               const Icon = iconMap[item.icon];
               const isActive = pathname === item.href ||
                 (item.href !== '/' && pathname?.startsWith(item.href));

               return (
                 <li key={item.id}>
                   <Link
                     href={item.href}
                     onClick={onClose}
                     className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200
                       ${isActive
                         ? 'bg-white/25 text-white shadow-sm font-semibold'
                         : 'text-blue-50 hover:bg-white/15 hover:text-white'
                       }
                       ${collapsed ? 'justify-center' : ''}
                     `}
                     title={collapsed ? item.label : undefined}
                     aria-current={isActive ? 'page' : undefined}
                   >
                     <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-white' : 'text-blue-200'}`} aria-hidden="true" />
                     {!collapsed && (
                       <span className="font-medium text-sm">{item.label}</span>
                     )}
                   </Link>
                 </li>
               );
             })}
           </ul>
        </nav>

        {!collapsed && (
          <div className="p-4 border-t border-white/10">
            <div className="bg-gradient-to-br from-white/20 to-white/5 rounded-2xl p-4 text-center">
              <div className="flex justify-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <h3 className="text-white font-semibold mb-1">Premium Hotel</h3>
              <p className="text-blue-200 text-xs mb-3">Unlock all features</p>
                   <button className="w-full bg-white text-[#1e3a5f] py-2 px-4 rounded-xl font-medium text-sm hover:bg-blue-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 focus:ring-offset-[#1e3a5f]">
                        Upgrade Now
                      </button>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}