'use client';

import { useEffect, useState } from 'react';
import { DollarSign, TrendingUp, TrendingDown, Calendar, CreditCard, Banknote, Wallet } from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

const revenueByMonth = [
  { month: 'Jan', revenue: 280000, bookings: 45 },
  { month: 'Feb', revenue: 350000, bookings: 52 },
  { month: 'Mar', revenue: 320000, bookings: 48 },
  { month: 'Apr', revenue: 450000, bookings: 65 },
  { month: 'May', revenue: 410000, bookings: 58 },
  { month: 'Jun', revenue: 520000, bookings: 72 },
];

const revenueBySource = [
  { name: 'Online Booking', value: 45, color: '#3b82f6' },
  { name: 'Walk-in', value: 25, color: '#10b981' },
  { name: 'Corporate', value: 20, color: '#8b5cf6' },
  { name: 'Travel Agent', value: 10, color: '#f59e0b' },
];

const revenueStats = [
  { label: 'Today', value: '₹45,200', change: '+12%', positive: true, icon: 'Calendar' },
  { label: 'This Week', value: '₹2,85,000', change: '+8%', positive: true, icon: 'Calendar' },
  { label: 'This Month', value: '₹12,45,000', change: '+18%', positive: true, icon: 'Calendar' },
  { label: 'Avg. Per Day', value: '₹41,500', change: '+5%', positive: true, icon: 'Calendar' },
];

const paymentMethods = [
  { method: 'UPI', amount: '₹4,50,000', percentage: 36, color: '#3b82f6' },
  { method: 'Card', amount: '₹3,75,000', percentage: 30, color: '#10b981' },
  { method: 'Cash', amount: '₹2,50,000', percentage: 20, color: '#8b5cf6' },
  { method: 'Bank Transfer', amount: '₹1,70,000', percentage: 14, color: '#f59e0b' },
];

export default function RevenueAnalytics() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {revenueStats.map((stat) => (
          <div key={stat.label} className="stat-card group cursor-default">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-500">{stat.label}</span>
              <div className={`text-xs font-medium ${stat.positive ? 'text-green-600' : 'text-red-600'}`}>
                {stat.change}
              </div>
            </div>
            <p className="text-xl font-bold text-slate-800">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card p-6">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-slate-800">Revenue Trend</h3>
            <p className="text-sm text-slate-500">Monthly comparison</p>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0} aspect={undefined}>
              <AreaChart data={revenueByMonth}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis 
                  dataKey="month" 
                  tick={{ fontSize: 12, fill: '#64748b' }}
                  tickLine={false}
                  axisLine={{ stroke: '#e2e8f0' }}
                />
                <YAxis 
                  tick={{ fontSize: 12, fill: '#64748b' }}
                  tickLine={false}
                  axisLine={{ stroke: '#e2e8f0' }}
                  tickFormatter={(value) => `₹${value/1000}k`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: 'none',
                    borderRadius: '12px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  }}
                  formatter={(value) => `₹${Number(value).toLocaleString()}`}
                />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorRevenue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card p-6">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-slate-800">Booking Source</h3>
            <p className="text-sm text-slate-500">Distribution by channel</p>
          </div>
          <div className="space-y-4">
            {revenueBySource.map((source) => (
              <div key={source.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">{source.name}</span>
                  <span className="text-sm font-medium text-slate-800">{source.value}%</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${source.value}%`, backgroundColor: source.color }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100">
            <h4 className="text-sm font-medium text-slate-700 mb-3">Payment Methods</h4>
            <div className="grid grid-cols-2 gap-3">
              {paymentMethods.map((payment) => (
                <div key={payment.method} className="flex items-center justify-between p-2 bg-slate-50 rounded-lg">
                  <span className="text-sm text-slate-600">{payment.method}</span>
                  <span className="text-sm font-medium text-slate-800">{payment.percentage}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}