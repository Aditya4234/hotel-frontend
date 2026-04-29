'use client';

import { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';

if (typeof window !== 'undefined') {
  const noop = () => {};
  if ('performance' in window && 'mark' in performance) {
    const originalMark = performance.mark.bind(performance);
    performance.mark = (name: string, options?: PerformanceMarkOptions) => {
      if (name.startsWith('recharts')) return undefined as unknown as PerformanceMark;
      return originalMark(name, options);
    };
  }
}

interface BookingChartProps {
  data: Array<{ name: string; bookings: number; revenue: number }>;
}

function BookingOverviewChart({ data }: BookingChartProps) {
  const [activeDataKey, setActiveDataKey] = useState<'bookings' | 'revenue'>('bookings');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-slate-800">Booking Overview</h3>
          <p className="text-sm text-slate-500">Monthly trends</p>
        </div>
        <div className="flex bg-slate-100 rounded-lg p-1">
          <button
            onClick={() => setActiveDataKey('bookings')}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
              activeDataKey === 'bookings'
                ? 'bg-white text-slate-800 shadow-sm'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Bookings
          </button>
          <button
            onClick={() => setActiveDataKey('revenue')}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
              activeDataKey === 'revenue'
                ? 'bg-white text-slate-800 shadow-sm'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Revenue
          </button>
        </div>
      </div>
      <div className="h-72 min-h-[18rem]">
        {mounted ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 12, fill: '#64748b' }}
                tickLine={false}
                axisLine={{ stroke: '#e2e8f0' }}
              />
              <YAxis
                tick={{ fontSize: 12, fill: '#64748b' }}
                tickLine={false}
                axisLine={{ stroke: '#e2e8f0' }}
                tickFormatter={(value) =>
                  activeDataKey === 'revenue' ? `₹${value / 1000}k` : value
                }
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: 'none',
                  borderRadius: '12px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                }}
                formatter={(value) =>
                  activeDataKey === 'revenue' ? `₹${Number(value).toLocaleString()}` : value
                }
              />
              <Line
                type="monotone"
                dataKey={activeDataKey}
                stroke={activeDataKey === 'bookings' ? '#3b82f6' : '#8b5cf6'}
                strokeWidth={3}
                dot={{ fill: activeDataKey === 'bookings' ? '#3b82f6' : '#8b5cf6', strokeWidth: 0, r: 4 }}
                activeDot={{ r: 6, stroke: 'white', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center h-full text-slate-400">Loading chart...</div>
        )}
      </div>
    </div>
  );
}

interface RoomStatusData {
  name: string;
  value: number;
  color: string;
}

interface RoomStatusChartProps {
  data: RoomStatusData[];
}

function RoomStatusDonut({ data }: RoomStatusChartProps) {
  const [mounted, setMounted] = useState(false);
  const total = data.reduce((acc, item) => acc + item.value, 0);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="card p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-slate-800">Room Status</h3>
        <p className="text-sm text-slate-500">Current occupancy</p>
      </div>
      <div className="h-72 min-h-[18rem] flex items-center">
        {mounted ? (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={4}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: unknown) => `${value} rooms`}
              />
              <Legend
                verticalAlign="bottom"
                height={36}
                formatter={(value) => (
                  <span className="text-sm text-slate-600">{value}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center h-full text-slate-400">Loading chart...</div>
        )}
      </div>
      <div className="grid grid-cols-2 gap-3 mt-4">
        {data.map((item) => (
          <div key={item.name} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-sm text-slate-600">{item.name}</span>
            <span className="text-sm font-medium text-slate-800 ml-auto">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

interface ChartsSectionProps {
  bookingData: BookingChartProps['data'];
  roomData: RoomStatusData[];
}

export default function ChartsSection({ bookingData, roomData }: ChartsSectionProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <BookingOverviewChart data={bookingData} />
      </div>
      <div>
        <RoomStatusDonut data={roomData} />
      </div>
    </div>
  );
}