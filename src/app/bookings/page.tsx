'use client';

import { useState } from 'react';
import DashboardLayout from '../component/DashboardLayout';
import Modal from '../component/Modal';
import { recentBookingsData as initialBookings } from '../../data/dashboardData';
import StatsCards from '../component/StatsCards';
import { Search, Filter, Download, Plus, Calendar, User, MapPin, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { BookingData } from '../component/RecentBookings';

const bookingStats = [
  { id: 'total', title: 'Total Bookings', value: '125', change: '+12.5%', positive: true, icon: 'Calendar', color: '#3b82f6', bgColor: '#dbeafe' },
  { id: 'confirmed', title: 'Confirmed', value: '45', change: '+5.2%', positive: true, icon: 'Calendar', color: '#10b981', bgColor: '#d1fae5' },
  { id: 'pending', title: 'Pending', value: '28', change: '-3.1%', positive: false, icon: 'Calendar', color: '#f59e0b', bgColor: '#fef3c7' },
  { id: 'cancelled', title: 'Cancelled', value: '8', change: '+1.2%', positive: false, icon: 'Calendar', color: '#ef4444', bgColor: '#fee2e2' },
];

export default function BookingsPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [showNewBooking, setShowNewBooking] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [showActionMenu, setShowActionMenu] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [bookings, setBookings] = useState<BookingData[]>(initialBookings);
  const [newBooking, setNewBooking] = useState({
    guestName: '',
    email: '',
    phone: '',
    roomType: '',
    checkIn: '',
    checkOut: '',
    specialRequests: '',
  });
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);

  const tabs = [
    { id: 'all', label: 'All Bookings' },
    { id: 'confirmed', label: 'Confirmed' },
    { id: 'pending', label: 'Pending' },
    { id: 'checked-in', label: 'Checked In' },
    { id: 'completed', label: 'Completed' },
    { id: 'cancelled', label: 'Cancelled' },
  ];

  const getStatusFromTab = (tab: string) => {
    switch(tab) {
      case 'confirmed': return 'Confirmed';
      case 'pending': return 'Pending';
      case 'checked-in': return 'Checked-in';
      case 'completed': return 'Completed';
      case 'cancelled': return 'Cancelled';
      default: return '';
    }
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesTab = activeTab === 'all' || booking.status === getStatusFromTab(activeTab);
    const matchesSearch = searchQuery === '' || 
      booking.guestName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.room.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const handleCreateBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBooking.guestName || !newBooking.roomType || !newBooking.checkIn || !newBooking.checkOut) {
      alert('Please fill in all required fields');
      return;
    }
    const booking: BookingData = {
      id: `BK-${Date.now()}`,
      guestName: newBooking.guestName,
      room: newBooking.roomType,
      checkIn: newBooking.checkIn,
      checkOut: newBooking.checkOut,
      status: 'Pending',
    };
    setBookings([booking, ...bookings]);
    setNewBooking({ guestName: '', email: '', phone: '', roomType: '', checkIn: '', checkOut: '', specialRequests: '' });
    setShowNewBooking(false);
    alert('Booking created successfully!');
  };

  const handleStatusChange = (bookingId: string, newStatus: string) => {
    setBookings(bookings.map(b => b.id === bookingId ? { ...b, status: newStatus } : b));
    setShowActionMenu(null);
    alert(`Booking ${bookingId} status changed to ${newStatus}`);
  };

  const handleDeleteBooking = (bookingId: string) => {
    if (confirm('Are you sure you want to delete this booking?')) {
      setBookings(bookings.filter(b => b.id !== bookingId));
      alert('Booking deleted successfully!');
    }
  };

  const handleExport = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Booking ID,Guest Name,Room,Check-in,Check-out,Status\n"
      + filteredBookings.map(b => `${b.id},${b.guestName},${b.room},${b.checkIn},${b.checkOut},${b.status}`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "bookings.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    alert('Bookings exported successfully!');
  };

  const toggleStatusFilter = (status: string) => {
    setSelectedStatuses(prev => 
      prev.includes(status) ? prev.filter(s => s !== status) : [...prev, status]
    );
  };

  const applyFilters = () => {
    setShowFilters(false);
    alert('Filters applied successfully!');
  };

  return (
    <DashboardLayout title="Bookings" subtitle="Manage hotel reservations">
      <div className="space-y-6">
        <StatsCards data={bookingStats} />

        <div className="card p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide pb-2 sm:pb-0">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-[#1e3a5f] text-white'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="flex-1 sm:flex-none relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search bookings..."
                  className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm w-full sm:w-64 focus:outline-none focus:border-blue-400"
                />
              </div>
              <button 
                onClick={() => setShowFilters(true)}
                className="p-2 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
              >
                <Filter className="w-4 h-4 text-slate-600" />
              </button>
              <button onClick={handleExport} className="p-2 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors">
                <Download className="w-4 h-4 text-slate-600" />
              </button>
              <button 
                onClick={() => setShowNewBooking(true)}
                className="btn-primary flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">New Booking</span>
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50">
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Booking ID</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Guest Name</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Room</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Check-in</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Check-out</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredBookings.map((booking) => {
                  const statusStyle = booking.status === 'Confirmed' ? { bg: '#dcfce7', text: '#166534' } :
                    booking.status === 'Checked-in' ? { bg: '#dbeafe', text: '#1e40af' } :
                    booking.status === 'Pending' ? { bg: '#fef3c7', text: '#92400e' } :
                    { bg: '#f1f5f9', text: '#475569' };
                  return (
                    <tr key={booking.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-medium text-slate-800">{booking.id}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-slate-800">{booking.guestName}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-slate-600">{booking.room}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-slate-600">{new Date(booking.checkIn).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-slate-600">{new Date(booking.checkOut).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: statusStyle.bg, color: statusStyle.text }}>
                          {booking.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="relative">
                          <button 
                            onClick={() => setShowActionMenu(showActionMenu === booking.id ? null : booking.id)}
                            className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors"
                          >
                            <AlertCircle className="w-5 h-5 text-slate-400" />
                          </button>
                          {showActionMenu === booking.id && (
                            <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-xl shadow-lg border border-slate-100 z-10">
                              <button onClick={() => handleStatusChange(booking.id, 'Confirmed')} className="w-full text-left px-4 py-2 text-sm text-green-600 hover:bg-green-50 flex items-center gap-2">
                                <CheckCircle className="w-4 h-4" /> Mark Confirmed
                              </button>
                              <button onClick={() => handleStatusChange(booking.id, 'Checked-in')} className="w-full text-left px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 flex items-center gap-2">
                                <User className="w-4 h-4" /> Mark Checked-in
                              </button>
                              <button onClick={() => handleStatusChange(booking.id, 'Completed')} className="w-full text-left px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 flex items-center gap-2">
                                <CheckCircle className="w-4 h-4" /> Mark Completed
                              </button>
                              <button onClick={() => handleStatusChange(booking.id, 'Cancelled')} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2">
                                <XCircle className="w-4 h-4" /> Cancel Booking
                              </button>
                              <hr className="border-slate-100" />
                              <button onClick={() => handleDeleteBooking(booking.id)} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2">
                                <XCircle className="w-4 h-4" /> Delete
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Modal isOpen={showNewBooking} onClose={() => setShowNewBooking(false)} title="New Booking" size="lg">
        <form onSubmit={handleCreateBooking} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Guest Name *</label>
              <input
                type="text"
                value={newBooking.guestName}
                onChange={(e) => setNewBooking({...newBooking, guestName: e.target.value})}
                placeholder="Enter guest name"
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-400"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
              <input
                type="email"
                value={newBooking.email}
                onChange={(e) => setNewBooking({...newBooking, email: e.target.value})}
                placeholder="Enter email"
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Phone</label>
              <input
                type="tel"
                value={newBooking.phone}
                onChange={(e) => setNewBooking({...newBooking, phone: e.target.value})}
                placeholder="Enter phone number"
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Room Type *</label>
              <select 
                value={newBooking.roomType}
                onChange={(e) => setNewBooking({...newBooking, roomType: e.target.value})}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-400"
                required
              >
                <option value="">Select room type</option>
                <option>Standard</option>
                <option>Deluxe</option>
                <option>Suite</option>
                <option>Presidential</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Check-in Date *</label>
              <input
                type="date"
                value={newBooking.checkIn}
                onChange={(e) => setNewBooking({...newBooking, checkIn: e.target.value})}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-400"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Check-out Date *</label>
              <input
                type="date"
                value={newBooking.checkOut}
                onChange={(e) => setNewBooking({...newBooking, checkOut: e.target.value})}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-400"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-2">Special Requests</label>
              <textarea
                value={newBooking.specialRequests}
                onChange={(e) => setNewBooking({...newBooking, specialRequests: e.target.value})}
                placeholder="Any special requests..."
                rows={3}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-400 resize-none"
              />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setShowNewBooking(false)}
              className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Create Booking
            </button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={showFilters} onClose={() => setShowFilters(false)} title="Filter Bookings" size="md">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Date Range</label>
            <div className="grid grid-cols-2 gap-4">
              <input type="date" className="w-full px-4 py-2 border border-slate-200 rounded-lg" />
              <input type="date" className="w-full px-4 py-2 border border-slate-200 rounded-lg" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Status</label>
            <div className="flex flex-wrap gap-2">
              {['Confirmed', 'Pending', 'Checked-in', 'Completed', 'Cancelled'].map((status) => (
                <label key={status} className="flex items-center gap-2">
                  <input 
                    type="checkbox" 
                    checked={selectedStatuses.includes(status)}
                    onChange={() => toggleStatusFilter(status)}
                    className="rounded border-slate-300" 
                  />
                  <span className="text-sm text-slate-600">{status}</span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Room Type</label>
            <select className="w-full px-4 py-2 border border-slate-200 rounded-lg">
              <option>All Rooms</option>
              <option>Standard</option>
              <option>Deluxe</option>
              <option>Suite</option>
            </select>
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => {
                setSelectedStatuses([]);
                setShowFilters(false);
              }}
              className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Clear
            </button>
            <button
              type="button"
              onClick={applyFilters}
              className="btn-primary"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </Modal>
    </DashboardLayout>
  );
}