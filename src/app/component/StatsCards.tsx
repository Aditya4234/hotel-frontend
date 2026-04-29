'use client';

import {
  CalendarDays,
  UserCheck,
  Bed,
  IndianRupee,
  TrendingUp,
  TrendingDown,
} from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  CalendarDays,
  UserCheck,
  Bed,
  IndianRupee,
};

interface StatsCardProps {
  id: string;
  title: string;
  value: string;
  change: string;
  positive: boolean;
  icon: string;
  color: string;
  bgColor: string;
}

function StatsCard({ title, value, change, positive, icon, color, bgColor }: StatsCardProps) {
  const Icon = iconMap[icon] || CalendarDays;

  return (
    <div className="stat-card group cursor-default">
      <div className="flex items-start justify-between mb-4">
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110"
          style={{ backgroundColor: bgColor }}
        >
          <Icon className="w-6 h-6" />
        </div>
        <div
          className={`flex items-center gap-1 text-sm font-medium ${
            positive ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {positive ? (
            <TrendingUp className="w-4 h-4" />
          ) : (
            <TrendingDown className="w-4 h-4" />
          )}
          <span>{change}</span>
        </div>
      </div>
      <h3 className="text-slate-500 text-sm font-medium mb-1">{title}</h3>
      <p className="text-2xl font-bold" style={{ color: color }}>{value}</p>
    </div>
  );
}

interface StatsCardsProps {
  data: StatsCardProps[];
}

export default function StatsCards({ data }: StatsCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {data.map((stat) => (
        <StatsCard key={stat.id} {...stat} />
      ))}
    </div>
  );
}