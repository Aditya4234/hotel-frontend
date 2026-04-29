'use client';

import { UserCheck, Sparkles, LogOut, Wrench, Clock } from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  'UserCheck': UserCheck,
  'Sparkles': Sparkles,
  'LogOut': LogOut,
  'Wrench': Wrench,
};

interface Activity {
  id: number;
  time: string;
  title: string;
  room: string;
  status: string;
  guest: string;
}

interface ActivitiesPanelProps {
  data: Activity[];
}

function getStatusDot(status: string): { bg: string; ring: string; pulse?: boolean } {
  switch (status) {
    case 'completed':
      return { bg: '#10b981', ring: '#10b981' };
    case 'in-progress':
      return { bg: '#3b82f6', ring: '#3b82f600', pulse: true };
    case 'scheduled':
      return { bg: '#f59e0b', ring: '#f59e0b' };
    case 'pending':
      return { bg: '#94a3b8', ring: '#94a3b8' };
    default:
      return { bg: '#94a3b8', ring: '#94a3b8' };
  }
}

export default function ActivitiesPanel({ data }: ActivitiesPanelProps) {
  return (
    <div className="card overflow-hidden">
      <div className="p-6 border-b border-slate-100">
        <div className="flex items-center justify-between">
          <div>
             <h2 className="text-lg font-semibold text-slate-800">Today&apos;s Activities</h2>
             <p className="text-sm text-slate-500">Real-time updates</p>
           </div>
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Clock className="w-4 h-4" />
            <span>{new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'short' })}</span>
          </div>
        </div>
      </div>
      <div className="p-4 max-h-96 overflow-y-auto scrollbar-hide">
        <div className="space-y-1">
          {data.map((activity, index) => {
            const statusStyle = getStatusDot(activity.status);
            const Icon = iconMap[activity.title.includes('Check-in') ? 'UserCheck' : activity.title.includes('Check-out') ? 'LogOut' : activity.title.includes('Housekeeping') ? 'Sparkles' : 'Wrench'] || Clock;

            return (
              <div
                key={activity.id}
                className="flex items-start gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors group"
              >
                <div className="relative flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      activity.status === 'completed'
                        ? 'bg-green-100'
                        : activity.status === 'in-progress'
                        ? 'bg-blue-100'
                        : activity.status === 'scheduled'
                        ? 'bg-amber-100'
                        : 'bg-slate-100'
                    }`}
                  >
                    <Icon
                      className={`w-5 h-5 ${
                        activity.status === 'completed'
                          ? 'text-green-600'
                          : activity.status === 'in-progress'
                          ? 'text-blue-600'
                          : activity.status === 'scheduled'
                          ? 'text-amber-600'
                          : 'text-slate-500'
                      }`}
                    />
                  </div>
                  {index < data.length - 1 && (
                    <div className="absolute top-10 w-0.5 h-full bg-slate-200 -z-10" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="text-sm font-medium text-slate-800">{activity.title}</h4>
                      <p className="text-sm text-slate-500">
                        {activity.room}
                        {activity.guest !== '-' && ` • ${activity.guest}`}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`status-dot ${statusStyle.pulse ? 'animate-pulse' : ''}`}
                        style={{ backgroundColor: statusStyle.bg }}
                      />
                      <span className="text-xs text-slate-500 capitalize">{activity.status}</span>
                    </div>
                  </div>
                </div>
                <div className="text-xs text-slate-400 whitespace-nowrap">{activity.time}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}