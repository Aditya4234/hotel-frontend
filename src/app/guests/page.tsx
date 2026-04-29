'use client';

import { useState } from 'react';
import DashboardLayout from '../component/DashboardLayout';
import Modal from '../component/Modal';
import { Search, Plus, User, Mail, Phone, Building2, Star } from 'lucide-react';

const guestsData = [
  { id: '1', name: 'Rahul Sharma', email: 'rahul.sharma@email.com', phone: '+91 98765 43210', totalVisits: 12, totalSpent: 185000, membership: 'gold', vip: true },
  { id: '2', name: 'Priya Patel', email: 'priya.patel@email.com', phone: '+91 87654 32109', totalVisits: 8, totalSpent: 120000, membership: 'silver', vip: false },
  { id: '3', name: 'Amit Kumar', email: 'amit.kumar@email.com', phone: '+91 76543 21098', totalVisits: 25, totalSpent: 450000, membership: 'platinum', vip: true },
  { id: '4', name: 'Sneha Reddy', email: 'sneha.reddy@email.com', phone: '+91 65432 10987', totalVisits: 5, totalSpent: 65000, membership: 'silver', vip: false },
  { id: '5', name: 'Vikram Singh', email: 'vikram.singh@email.com', phone: '+91 54321 09876', totalVisits: 15, totalSpent: 280000, membership: 'gold', vip: false },
  { id: '6', name: 'Ananya Gupta', email: 'ananya.gupta@email.com', phone: '+91 43210 98765', totalVisits: 3, totalSpent: 45000, membership: 'bronze', vip: false },
];

const membershipColors = {
  bronze: { bg: '#f5f5f4', text: '#78716c', badge: '#a8a29e' },
  silver: { bg: '#f1f5f9', text: '#475569', badge: '#94a3b8' },
  gold: { bg: '#fef3c7', text: '#92400e', badge: '#f59e0b' },
  platinum: { bg: '#e0e7ff', text: '#3730a3', badge: '#6366f1' },
  diamond: { bg: '#dbeafe', text: '#1e40af', badge: '#3b82f6' },
};

const stats = [
  { label: 'Total Guests', value: '892', change: '+12%' },
  { label: 'VIP Guests', value: '45', change: '+5%' },
  { label: 'New This Month', value: '28', change: '+18%' },
  { label: 'Avg. Stay', value: '2.4 days', change: '+8%' },
];

export default function GuestsPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddGuest, setShowAddGuest] = useState(false);
  const [showViewGuest, setShowViewGuest] = useState(false);
  const [selectedGuest, setSelectedGuest] = useState<typeof guestsData[0] | null>(null);
  const [guests, setGuests] = useState(guestsData);
  const [newGuest, setNewGuest] = useState({
    name: '',
    email: '',
    phone: '',
    membership: 'bronze',
    vip: false,
  });

  const tabs = [
    { id: 'all', label: 'All Guests' },
    { id: 'vip', label: 'VIP Guests' },
    { id: 'new', label: 'New Guests' },
    { id: 'repeat', label: 'Repeat Guests' },
  ];

  const handleViewGuest = (guest: typeof guestsData[0]) => {
    setSelectedGuest(guest);
    setShowViewGuest(true);
  };

  const handleAddGuest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGuest.name || !newGuest.email || !newGuest.phone) {
      alert('Please complete all required fields');
      return;
    }
    setGuests([
      {
        id: Date.now().toString(),
        name: newGuest.name,
        email: newGuest.email,
        phone: newGuest.phone,
        totalVisits: 0,
        totalSpent: 0,
        membership: newGuest.membership,
        vip: newGuest.vip,
      },
      ...guests,
    ]);
    setNewGuest({ name: '', email: '', phone: '', membership: 'bronze', vip: false });
    setShowAddGuest(false);
  };

  const filteredGuests = guests.filter((guest) => {
    const matchesTab =
      activeTab === 'all' ||
      (activeTab === 'vip' && guest.vip) ||
      (activeTab === 'new' && guest.totalVisits <= 5) ||
      (activeTab === 'repeat' && guest.totalVisits > 5);

    const query = searchQuery.toLowerCase();
    const matchesSearch =
      !query ||
      guest.name.toLowerCase().includes(query) ||
      guest.email.toLowerCase().includes(query) ||
      guest.phone.toLowerCase().includes(query) ||
      guest.membership.toLowerCase().includes(query);

    return matchesTab && matchesSearch;
  });

  return (
    <DashboardLayout title="Guests" subtitle="Manage guest relationships">
      <div className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="stat-card">
              <p className="text-sm text-slate-500 mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
              <p className="text-xs text-green-600">{stat.change} from last month</p>
            </div>
          ))}
        </div>

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
                  placeholder="Search guests..."
                  className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm w-full sm:w-64 focus:outline-none focus:border-blue-400"
                />
              </div>
              <button 
                onClick={() => setShowAddGuest(true)}
                className="btn-primary flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Add Guest</span>
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Guest</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Contact</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Visits</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Total Spent</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Membership</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredGuests.map((guest) => {
                  const membership = membershipColors[guest.membership as keyof typeof membershipColors] || membershipColors.silver;
                  return (
                    <tr key={guest.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-600 to-slate-800 flex items-center justify-center text-white font-semibold text-sm">
                            {guest.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-medium text-slate-800">{guest.name}</p>
                              {guest.vip && <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <p className="text-sm text-slate-600">{guest.email}</p>
                        <p className="text-sm text-slate-500">{guest.phone}</p>
                      </td>
                      <td className="px-4 py-4">
                        <p className="font-medium text-slate-800">{guest.totalVisits}</p>
                      </td>
                      <td className="px-4 py-4">
                        <p className="font-medium text-slate-800">₹{guest.totalSpent.toLocaleString()}</p>
                      </td>
                      <td className="px-4 py-4">
                        <span 
                          className="px-2 py-1 rounded-full text-xs font-medium capitalize"
                          style={{ backgroundColor: membership.bg, color: membership.text }}
                        >
                          {guest.membership}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => handleViewGuest(guest)}
                            className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors"
                          >
                            <User className="w-4 h-4 text-slate-400" />
                          </button>
                          <button className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors">
                            <Mail className="w-4 h-4 text-slate-400" />
                          </button>
                          <button className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors">
                            <Phone className="w-4 h-4 text-slate-400" />
                          </button>
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

      <Modal isOpen={showAddGuest} onClose={() => setShowAddGuest(false)} title="Add New Guest" size="lg">
        <form onSubmit={handleAddGuest} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
              <input
                type="text"
                value={newGuest.name}
                onChange={(e) => setNewGuest({ ...newGuest, name: e.target.value })}
                placeholder="Enter guest name"
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
              <input
                type="email"
                value={newGuest.email}
                onChange={(e) => setNewGuest({ ...newGuest, email: e.target.value })}
                placeholder="Enter email"
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Phone</label>
              <input
                type="tel"
                value={newGuest.phone}
                onChange={(e) => setNewGuest({ ...newGuest, phone: e.target.value })}
                placeholder="Enter phone number"
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Date of Birth</label>
              <input
                type="date"
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Membership Tier</label>
              <select
                value={newGuest.membership}
                onChange={(e) => setNewGuest({ ...newGuest, membership: e.target.value })}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-400"
              >
                <option value="bronze">Bronze</option>
                <option value="silver">Silver</option>
                <option value="gold">Gold</option>
                <option value="platinum">Platinum</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">VIP Status</label>
              <label className="flex items-center gap-2 mt-2">
                <input
                  type="checkbox"
                  checked={newGuest.vip}
                  onChange={(e) => setNewGuest({ ...newGuest, vip: e.target.checked })}
                  className="rounded border-slate-300"
                />
                <span className="text-sm text-slate-600">Mark as VIP</span>
              </label>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-2">Address</label>
              <textarea
                placeholder="Enter address..."
                rows={2}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-400 resize-none"
              />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setShowAddGuest(false)}
              className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Add Guest
            </button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={showViewGuest} onClose={() => setShowViewGuest(false)} title="Guest Details" size="lg">
        {selectedGuest && (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-slate-600 to-slate-800 flex items-center justify-center text-white text-2xl font-bold">
                {selectedGuest.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-semibold text-slate-800">{selectedGuest.name}</h3>
                  {selectedGuest.vip && <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />}
                </div>
                <p className="text-slate-500">{selectedGuest.email}</p>
                <p className="text-slate-500">{selectedGuest.phone}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 bg-slate-50 rounded-xl text-center">
                <p className="text-2xl font-bold text-slate-800">{selectedGuest.totalVisits}</p>
                <p className="text-sm text-slate-500">Total Visits</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl text-center">
                <p className="text-2xl font-bold text-slate-800">₹{(selectedGuest.totalSpent/1000).toFixed(0)}K</p>
                <p className="text-sm text-slate-500">Total Spent</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl text-center">
                <p className="text-2xl font-bold text-slate-800 capitalize">{selectedGuest.membership}</p>
                <p className="text-sm text-slate-500">Membership</p>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
              <button className="px-4 py-2 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                Send Email
              </button>
              <button className="btn-primary">
                Edit Guest
              </button>
            </div>
          </div>
        )}
      </Modal>
    </DashboardLayout>
  );
}