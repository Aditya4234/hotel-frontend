'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '../component/DashboardLayout';
import { Search, Download, FileText, Calendar, BarChart3, TrendingUp, Users, Bed, DollarSign } from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const reportTypes = [
  { id: 'occupancy', name: 'Occupancy Report', description: 'Room occupancy analytics', icon: Bed },
  { id: 'revenue', name: 'Revenue Report', description: 'Financial performance', icon: DollarSign },
  { id: 'guest', name: 'Guest Analytics', description: 'Guest demographics', icon: Users },
  { id: 'booking', name: 'Booking Trends', description: 'Booking patterns', icon: TrendingUp },
];

const monthlyOccupancy = [
  { month: 'Jan', occupancy: 65 },
  { month: 'Feb', occupancy: 72 },
  { month: 'Mar', occupancy: 68 },
  { month: 'Apr', occupancy: 78 },
  { month: 'May', occupancy: 82 },
  { month: 'Jun', occupancy: 85 },
];

const bookingSource = [
  { name: 'Direct', value: 45, color: '#3b82f6' },
  { name: 'Booking.com', value: 25, color: '#10b981' },
  { name: 'MakeMyTrip', value: 15, color: '#8b5cf6' },
  { name: 'Others', value: 15, color: '#f59e0b' },
];

const topRooms = [
  { room: 'Suite 201', bookings: 25, revenue: 200000 },
  { room: 'Deluxe 105', bookings: 22, revenue: 99000 },
  { room: 'Standard 302', bookings: 18, revenue: 45000 },
  { room: 'Suite 401', bookings: 15, revenue: 120000 },
];

export default function ReportsPage() {
  const [selectedReport, setSelectedReport] = useState('occupancy');

  const handleExportPDF = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <DashboardLayout title="Reports" subtitle="Analytics and insights">
      <div className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="stat-card">
            <p className="text-sm text-slate-500 mb-1">Total Revenue</p>
            <p className="text-2xl font-bold text-slate-800">₹45.2L</p>
            <p className="text-xs text-green-600">+18% vs last month</p>
          </div>
          <div className="stat-card">
            <p className="text-sm text-slate-500 mb-1">Avg. Occupancy</p>
            <p className="text-2xl font-bold text-slate-800">75%</p>
            <p className="text-xs text-green-600">+5% vs last month</p>
          </div>
          <div className="stat-card">
            <p className="text-sm text-slate-500 mb-1">Total Bookings</p>
            <p className="text-2xl font-bold text-slate-800">892</p>
            <p className="text-xs text-green-600">+12% vs last month</p>
          </div>
          <div className="stat-card">
            <p className="text-sm text-slate-500 mb-1">Avg. Daily Rate</p>
            <p className="text-2xl font-bold text-slate-800">₹5,200</p>
            <p className="text-xs text-green-600">+8% vs last month</p>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-800">Select Report Type</h3>
              <p className="text-sm text-slate-500">Choose a report to view details</p>
            </div>
            <button type="button" onClick={handleExportPDF} className="btn-primary flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export PDF
            </button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {reportTypes.map((report) => {
              const Icon = report.icon;
              return (
                <button
                  key={report.id}
                  onClick={() => setSelectedReport(report.id)}
                  className={`p-4 rounded-xl text-left transition-all ${
                    selectedReport === report.id 
                      ? 'bg-blue-50 border-2 border-blue-500' 
                      : 'bg-slate-50 border-2 border-transparent hover:border-slate-200'
                  }`}
                >
                  <Icon className="w-6 h-6 mb-2 text-blue-500" />
                  <p className="font-medium text-slate-800">{report.name}</p>
                  <p className="text-xs text-slate-500">{report.description}</p>
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h4 className="text-md font-semibold text-slate-800 mb-4">Monthly Occupancy Trend</h4>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0} aspect={undefined}>
                  <BarChart data={monthlyOccupancy}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#64748b' }} />
                    <YAxis tick={{ fontSize: 12, fill: '#64748b' }} unit="%" />
                    <Tooltip formatter={(value) => `${Number(value)}%`} />
                    <Bar dataKey="occupancy" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div>
              <h4 className="text-md font-semibold text-slate-800 mb-4">Booking Source Distribution</h4>
              <div className="h-64">
<ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0} aspect={undefined}>
                  <PieChart>
                    <Pie data={bookingSource} cx="50%" cy="50%" outerRadius={80} dataKey="value" label>
                      {bookingSource.map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: unknown) => `${Number(value)}%`} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex flex-wrap gap-4 mt-4 justify-center">
                {bookingSource.map((source) => (
                  <div key={source.name} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: source.color }} />
                    <span className="text-sm text-slate-600">{source.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-slate-100">
            <h4 className="text-md font-semibold text-slate-800 mb-4">Top Performing Rooms</h4>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50">
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Room</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Total Bookings</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Revenue</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {topRooms.map((room) => (
                    <tr key={room.room} className="hover:bg-slate-50">
                      <td className="px-4 py-3 font-medium text-slate-800">{room.room}</td>
                      <td className="px-4 py-3 text-slate-600">{room.bookings}</td>
                      <td className="px-4 py-3 font-medium text-slate-800">₹{room.revenue.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}