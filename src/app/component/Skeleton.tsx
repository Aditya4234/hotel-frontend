'use client';

export function StatsCardSkeleton() {
  return (
    <div className="stat-card animate-pulse">
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 rounded-2xl bg-slate-200" />
        <div className="w-14 h-5 rounded-lg bg-slate-200" />
      </div>
      <div className="w-24 h-4 rounded-lg bg-slate-200 mb-2" />
      <div className="w-20 h-8 rounded-lg bg-slate-200" />
    </div>
  );
}

export function BookingRowSkeleton() {
  return (
    <tr className="animate-pulse">
      <td className="px-6 py-4"><div className="w-16 h-4 rounded bg-slate-200" /></td>
      <td className="px-6 py-4"><div className="w-28 h-4 rounded bg-slate-200" /></td>
      <td className="px-6 py-4"><div className="w-20 h-4 rounded bg-slate-200" /></td>
      <td className="px-6 py-4"><div className="w-16 h-4 rounded bg-slate-200" /></td>
      <td className="px-6 py-4"><div className="w-16 h-4 rounded bg-slate-200" /></td>
      <td className="px-6 py-4"><div className="w-20 h-6 rounded-full bg-slate-200" /></td>
    </tr>
  );
}

export function ChartSkeleton() {
  return (
    <div className="card p-6 animate-pulse">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="w-36 h-5 rounded-lg bg-slate-200 mb-2" />
          <div className="w-24 h-4 rounded-lg bg-slate-200" />
        </div>
        <div className="flex gap-2">
          <div className="w-16 h-8 rounded-lg bg-slate-200" />
          <div className="w-16 h-8 rounded-lg bg-slate-200" />
        </div>
      </div>
      <div className="h-72 flex items-center justify-center">
        <div className="w-full h-full bg-slate-100 rounded-lg" />
      </div>
    </div>
  );
}

export function ActivitySkeleton() {
  return (
    <div className="flex items-start gap-4 p-3">
      <div className="w-10 h-10 rounded-xl bg-slate-200" />
      <div className="flex-1">
        <div className="w-32 h-4 rounded-lg bg-slate-200 mb-2" />
        <div className="w-24 h-3 rounded-lg bg-slate-200" />
      </div>
      <div className="w-12 h-3 rounded-lg bg-slate-200" />
    </div>
  );
}

export function TableSkeleton() {
  return (
    <div className="card overflow-hidden animate-pulse">
      <div className="p-6 border-b border-slate-100">
        <div className="flex items-center justify-between">
          <div>
            <div className="w-36 h-5 rounded-lg bg-slate-200 mb-2" />
            <div className="w-28 h-4 rounded-lg bg-slate-200" />
          </div>
          <div className="w-20 h-9 rounded-lg bg-slate-200" />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50">
              {['ID', 'Guest', 'Room', 'Check-in', 'Check-out', 'Status'].map((h) => (
                <th key={h} className="px-6 py-3 text-left">
                  <div className="w-16 h-3 rounded bg-slate-200" />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[...Array(5)].map((_, i) => <BookingRowSkeleton key={i} />)}
          </tbody>
        </table>
      </div>
    </div>
  );
}