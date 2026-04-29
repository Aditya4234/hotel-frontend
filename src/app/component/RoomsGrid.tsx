'use client';

import { Bed, Users, Wifi, Coffee, Tv, Maximize, DollarSign } from 'lucide-react';

interface Room {
  id: string;
  number: string;
  type: string;
  floor: number;
  status: 'occupied' | 'available' | 'maintenance' | 'out-of-service';
  price: number;
  amenities: string[];
  guest?: string;
}

const roomsData: Room[] = [
  { id: '1', number: '101', type: 'Standard', floor: 1, status: 'occupied', price: 2500, amenities: ['Wifi'], guest: 'Ananya Gupta' },
  { id: '2', number: '102', type: 'Standard', floor: 1, status: 'available', price: 2500, amenities: ['Wifi', 'TV'] },
  { id: '3', number: '103', type: 'Deluxe', floor: 1, status: 'occupied', price: 4500, amenities: ['Wifi', 'TV', 'Coffee'], guest: 'Rahul Verma' },
  { id: '4', number: '104', type: 'Deluxe', floor: 1, status: 'maintenance', price: 4500, amenities: ['Wifi', 'TV'] },
  { id: '5', number: '201', type: 'Suite', floor: 2, status: 'available', price: 8000, amenities: ['Wifi', 'TV', 'Coffee', 'Bathtub'] },
  { id: '6', number: '202', type: 'Suite', floor: 2, status: 'occupied', price: 8000, amenities: ['Wifi', 'TV', 'Coffee'], guest: 'Priya Singh' },
  { id: '7', number: '203', type: 'Standard', floor: 2, status: 'available', price: 2500, amenities: ['Wifi'] },
  { id: '8', number: '204', type: 'Deluxe', floor: 2, status: 'occupied', price: 4500, amenities: ['Wifi', 'TV'], guest: 'Amit Kumar' },
  { id: '9', number: '301', type: 'Presidential', floor: 3, status: 'out-of-service', price: 15000, amenities: ['Wifi', 'TV', 'Coffee', 'Bathtub', 'Butler'] },
  { id: '10', number: '302', type: 'Suite', floor: 3, status: 'available', price: 8000, amenities: ['Wifi', 'TV', 'Coffee'] },
  { id: '11', number: '303', type: 'Deluxe', floor: 3, status: 'occupied', price: 4500, amenities: ['Wifi', 'TV'], guest: 'Sneha Reddy' },
  { id: '12', number: '304', type: 'Standard', floor: 3, status: 'available', price: 2500, amenities: ['Wifi'], guest: '' },
];

const statusColors = {
  occupied: { bg: '#dbeafe', text: '#1e40af', label: 'Occupied' },
  available: { bg: '#d1fae5', text: '#166534', label: 'Available' },
  maintenance: { bg: '#fef3c7', text: '#92400e', label: 'Maintenance' },
  'out-of-service': { bg: '#fee2e2', text: '#991b1b', label: 'Out of Service' },
};

const amenityIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  Wifi, Coffee, Tv,
};

function RoomCard({ room }: { room: Room }) {
  const status = statusColors[room.status];
  const amenities = room.amenities.slice(0, 3);

  return (
    <div className="card p-4 hover:shadow-lg transition-all duration-300 cursor-pointer group">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-lg font-bold text-slate-800">Room {room.number}</h3>
          <p className="text-sm text-slate-500">{room.type} • Floor {room.floor}</p>
        </div>
        <span className="badge" style={{ backgroundColor: status.bg, color: status.text }}>
          {status.label}
        </span>
      </div>

      {room.status === 'occupied' && room.guest && (
        <div className="flex items-center gap-2 mb-3 p-2 bg-slate-50 rounded-lg">
          <Users className="w-4 h-4 text-slate-500" />
          <span className="text-sm text-slate-600">{room.guest}</span>
        </div>
      )}

      <div className="flex items-center justify-between pt-3 border-t border-slate-100">
        <div className="flex items-center gap-1">
          {amenities.map((amenity) => {
            const Icon = amenityIcons[amenity];
            return Icon ? <Icon key={amenity} className="w-4 h-4 text-slate-400" /> : null;
          })}
        </div>
        <div className="text-right">
          <p className="text-xs text-slate-500">₹{room.price.toLocaleString()}</p>
          <p className="text-xs text-slate-400">/night</p>
        </div>
      </div>
    </div>
  );
}

export default function RoomsGrid() {
  const available = roomsData.filter(r => r.status === 'available').length;
  const occupied = roomsData.filter(r => r.status === 'occupied').length;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-800">Room Inventory</h3>
          <p className="text-sm text-slate-500">Real-time room status</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-blue-500" />
            <span className="text-sm text-slate-600">{occupied} occupied</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-green-500" />
            <span className="text-sm text-slate-600">{available} available</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {roomsData.map((room) => (
          <RoomCard key={room.id} room={room} />
        ))}
      </div>
    </div>
  );
}