'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '../component/DashboardLayout';
import { Search, Plus, Download, CreditCard, DollarSign, TrendingUp, Calendar, Filter } from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';

const paymentStats = [
  { label: 'Today', value: '₹45,200', icon: Calendar, change: '+12%' },
  { label: 'This Week', value: '₹2,85,000', icon: DollarSign, change: '+8%' },
  { label: 'This Month', value: '₹12,45,000', icon: DollarSign, change: '+18%' },
  { label: 'Pending', value: '₹85,000', icon: CreditCard, change: '-5%' },
];

const transactions = [
  { id: 'TXN-001', guest: 'Rahul Sharma', amount: 12500, method: 'UPI', status: 'completed', date: '2026-04-24', time: '10:30 AM' },
  { id: 'TXN-002', guest: 'Priya Patel', amount: 8500, method: 'Card', status: 'completed', date: '2026-04-24', time: '11:15 AM' },
  { id: 'TXN-003', guest: 'Amit Kumar', amount: 15000, method: 'Bank Transfer', status: 'pending', date: '2026-04-24', time: '12:00 PM' },
  { id: 'TXN-004', guest: 'Sneha Reddy', amount: 4500, method: 'Cash', status: 'completed', date: '2026-04-23', time: '09:45 AM' },
  { id: 'TXN-005', guest: 'Vikram Singh', amount: 22000, method: 'Card', status: 'completed', date: '2026-04-23', time: '02:30 PM' },
];

const monthlyData = [
  { month: 'Jan', revenue: 280000 },
  { month: 'Feb', revenue: 350000 },
  { month: 'Mar', revenue: 320000 },
  { month: 'Apr', revenue: 450000 },
  { month: 'May', revenue: 410000 },
  { month: 'Jun', revenue: 520000 },
];

const paymentMethods = [
  { name: 'UPI', value: 36, color: '#3b82f6' },
  { name: 'Card', value: 30, color: '#10b981' },
  { name: 'Cash', value: 20, color: '#8b5cf6' },
  { name: 'Bank', value: 14, color: '#f59e0b' },
];

export default function PaymentsPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleExport = () => {
    const filteredCount = filteredTransactions.length;
    alert(`Exported ${filteredCount} transaction${filteredCount === 1 ? '' : 's'} to CSV.`);
  };

  const filteredTransactions = transactions.filter((txn) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      txn.id.toLowerCase().includes(query) ||
      txn.guest.toLowerCase().includes(query) ||
      txn.method.toLowerCase().includes(query) ||
      txn.status.toLowerCase().includes(query) ||
      txn.date.toLowerCase().includes(query) ||
      txn.time.toLowerCase().includes(query)
    );
  });

  return (
    <DashboardLayout title="Payments" subtitle="Track revenue and transactions">
      <div className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {paymentStats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="stat-card">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-slate-500">{stat.label}</p>
                  <Icon className="w-5 h-5 text-slate-400" />
                </div>
                <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
                <p className="text-xs text-green-600">{stat.change}</p>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card p-6">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-slate-800">Revenue Trend</h3>
              <p className="text-sm text-slate-500">Monthly comparison</p>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0} aspect={undefined}>
                <AreaChart data={monthlyData}>
                  <defs>
                    <linearGradient id="colorRevenue2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#64748b' }} />
                  <YAxis tick={{ fontSize: 12, fill: '#64748b' }} tickFormatter={(v) => `₹${v/1000}k`} />
                  <Tooltip formatter={(value) => `₹${Number(value).toLocaleString()}`} />
                  <Area type="monotone" dataKey="revenue" stroke="#3b82f6" fill="url(#colorRevenue2)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="card p-6">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-slate-800">Payment Methods</h3>
              <p className="text-sm text-slate-500">Distribution</p>
            </div>
            <div className="space-y-4">
              {paymentMethods.map((method) => (
                <div key={method.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">{method.name}</span>
                    <span className="text-sm font-medium text-slate-800">{method.value}%</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${method.value}%`, backgroundColor: method.color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-800">Recent Transactions</h3>
              <p className="text-sm text-slate-500">Latest payment activity</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search transactions..."
                  className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm w-full sm:w-64"
                />
              </div>
              <button type="button" onClick={handleExport} className="btn-primary flex items-center gap-2">
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Transaction ID</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Guest</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Amount</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Method</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Date & Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredTransactions.map((txn) => (
                  <tr key={txn.id} className="hover:bg-slate-50">
                    <td className="px-4 py-4">
                      <span className="font-medium text-slate-800">{txn.id}</span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-slate-800">{txn.guest}</span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="font-medium text-slate-800">₹{txn.amount.toLocaleString()}</span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-slate-600">{txn.method}</span>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        txn.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                        {txn.status}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-sm text-slate-600">{txn.date} {txn.time}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}