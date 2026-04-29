'use client';

import { useRouter } from 'next/navigation';
import { 
  Plus, 
  UserPlus, 
  CalendarPlus, 
  ClipboardList, 
  Wrench, 
  FileText,
  CreditCard,
  MessageSquare,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface QuickAction {
  id: string;
  label: string;
  icon: string;
  color: string;
  bgColor: string;
  count?: number;
}

const quickActions: QuickAction[] = [
  { id: 'new-booking', label: 'New Booking', icon: 'CalendarPlus', color: '#3b82f6', bgColor: '#dbeafe', count: 12 },
  { id: 'check-in', label: 'Check In', icon: 'UserPlus', color: '#10b981', bgColor: '#d1fae5', count: 8 },
  { id: 'check-out', label: 'Check Out', icon: 'UserPlus', color: '#f59e0b', bgColor: '#fef3c7', count: 5 },
  { id: 'housekeeping', label: 'Housekeeping', icon: 'Sparkles', color: '#8b5cf6', bgColor: '#ede9fe', count: 15 },
  { id: 'maintenance', label: 'Maintenance', icon: 'Wrench', color: '#ef4444', bgColor: '#fee2e2', count: 3 },
  { id: 'pending', label: 'Pending', icon: 'ClipboardList', color: '#64748b', bgColor: '#f1f5f9', count: 7 },
];

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  CalendarPlus,
  UserPlus,
  Sparkles,
  Wrench,
  ClipboardList,
};

export default function QuickActions() {
  const router = useRouter();

  const handleActionClick = (label: string) => {
    alert(`${label} clicked`);
  };

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-4">
          <div>
             <h2 className="text-lg font-semibold text-slate-800">Quick Actions</h2>
             <p className="text-sm text-slate-500">One-click operations</p>
           </div>
        <button
           type="button"
           onClick={() => router.push('/bookings')}
           className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-blue-300 rounded"
           aria-label="View all bookings"
         >
           View All <ArrowRight className="w-4 h-4" aria-hidden="true" />
         </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {quickActions.map((action) => {
          const Icon = iconMap[action.icon] || Plus;
          const colorClass = action.id === 'new-booking' ? 'text-blue-500' : 
                         action.id === 'check-in' ? 'text-green-500' :
                         action.id === 'check-out' ? 'text-amber-500' :
                         action.id === 'housekeeping' ? 'text-purple-500' :
                         action.id === 'maintenance' ? 'text-red-500' : 'text-slate-500';
          
          return (
            <button
              key={action.id}
              type="button"
              onClick={() => handleActionClick(action.label)}
              className="flex items-center gap-3 p-3 rounded-xl hover:shadow-md transition-all duration-200 group text-left"
              style={{ backgroundColor: action.bgColor }}
            >
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 bg-white"
              >
                <Icon className={`w-5 h-5 ${colorClass}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-slate-800 text-sm">{action.label}</p>
                {action.count && (
                  <p className="text-xs text-slate-500">{action.count} pending</p>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}