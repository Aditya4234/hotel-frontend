'use client';

import { User, Mail, Phone, Calendar, Building2, Clock, MoreHorizontal, Star, MessageCircle } from 'lucide-react';

interface Guest {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalVisits: number;
  totalSpent: number;
  lastVisit: string;
  membership: 'silver' | 'gold' | 'platinum' | 'diamond';
  vip: boolean;
}

const guestsData: Guest[] = [
  { id: '1', name: 'Rahul Sharma', email: 'rahul.sharma@email.com', phone: '+91 98765 43210', totalVisits: 12, totalSpent: 185000, lastVisit: '2026-04-24', membership: 'gold', vip: true },
  { id: '2', name: 'Priya Patel', email: 'priya.patel@email.com', phone: '+91 87654 32109', totalVisits: 8, totalSpent: 120000, lastVisit: '2026-04-23', membership: 'silver', vip: false },
  { id: '3', name: 'Amit Kumar', email: 'amit.kumar@email.com', phone: '+91 76543 21098', totalVisits: 25, totalSpent: 450000, lastVisit: '2026-04-22', membership: 'platinum', vip: true },
  { id: '4', name: 'Sneha Reddy', email: 'sneha.reddy@email.com', phone: '+91 65432 10987', totalVisits: 5, totalSpent: 65000, lastVisit: '2026-04-21', membership: 'silver', vip: false },
  { id: '5', name: 'Vikram Singh', email: 'vikram.singh@email.com', phone: '+91 54321 09876', totalVisits: 15, totalSpent: 280000, lastVisit: '2026-04-20', membership: 'gold', vip: false },
];

const membershipColors = {
  silver: { bg: '#f1f5f9', text: '#475569', badge: '#94a3b8' },
  gold: { bg: '#fef3c7', text: '#92400e', badge: '#f59e0b' },
  platinum: { bg: '#e0e7ff', text: '#3730a3', badge: '#6366f1' },
  diamond: { bg: '#dbeafe', text: '#1e40af', badge: '#3b82f6' },
};

function GuestCard({ guest }: { guest: Guest }) {
  const membership = membershipColors[guest.membership];

  return (
    <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer group">
      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-slate-600 to-slate-800 flex items-center justify-center text-white font-semibold">
        {guest.name.split(' ').map(n => n[0]).join('')}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h4 className="font-medium text-slate-800 truncate">{guest.name}</h4>
          {guest.vip && (
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 flex-shrink-0" />
          )}
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Mail className="w-3 h-3" />
          <span className="truncate">{guest.email}</span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <span 
          className="px-2 py-1 rounded-full text-xs font-medium capitalize"
          style={{ backgroundColor: membership.bg, color: membership.text }}
        >
          {guest.membership}
        </span>
        <button className="p-1.5 hover:bg-slate-100 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
          <MessageCircle className="w-4 h-4 text-slate-400" />
        </button>
      </div>
    </div>
  );
}

export default function GuestPreview() {
  const vipCount = guestsData.filter(g => g.vip).length;
  const totalRevenue = guestsData.reduce((acc, g) => acc + g.totalSpent, 0);

  return (
    <div className="card overflow-hidden">
      <div className="p-6 border-b border-slate-100">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-slate-800">Top Guests</h3>
            <p className="text-sm text-slate-500">By lifetime value</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-slate-800">{guestsData.length}</p>
            <p className="text-xs text-slate-500">Active Guests</p>
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="p-3 bg-slate-50 rounded-xl">
            <p className="text-xs text-slate-500 mb-1">VIP Guests</p>
            <p className="text-lg font-bold text-slate-800">{vipCount}</p>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl">
            <p className="text-xs text-slate-500 mb-1">Total Revenue</p>
            <p className="text-lg font-bold text-slate-800">₹{(totalRevenue / 100000).toFixed(1)}L</p>
          </div>
        </div>

        <div className="space-y-1">
          {guestsData.map((guest) => (
            <GuestCard key={guest.id} guest={guest} />
          ))}
        </div>
      </div>

      <div className="p-4 border-t border-slate-100">
        <button className="w-full py-2 text-sm text-slate-600 hover:text-slate-800 font-medium transition-colors">
          View All Guests
        </button>
      </div>
    </div>
  );
}