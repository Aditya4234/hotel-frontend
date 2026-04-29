'use client';

import { useState } from 'react';
import DashboardLayout from '../component/DashboardLayout';
import Modal from '../component/Modal';
import RoomsGrid from '../component/RoomsGrid';
import { Search, Filter, Plus, Bed, Users, DollarSign, Wrench, Edit, Trash2, CheckCircle, XCircle } from 'lucide-react';

interface Room {
  id: string;
  number: string;
  type: string;
  floor: number;
  status: 'available' | 'occupied' | 'maintenance' | 'out-of-service';
  price: number;
  guest?: string;
  amenities?: string[];
}

const roomStats = [
  { label: 'Total Rooms', value: '100', icon: Bed, color: '#3b82f6' },
  { label: 'Occupied', value: '68', icon: Users, color: '#10b981' },
  { label: 'Available', value: '24', icon: Bed, color: '#f59e0b' },
  { label: 'Revenue/Day', value: '₹1.2L', icon: DollarSign, color: '#8b5cf6' },
];

const floors = ['All Floors', 'Floor 1', 'Floor 2', 'Floor 3'];
const roomTypes = ['All Types', 'Standard', 'Deluxe', 'Suite', 'Presidential'];

const initialRooms: Room[] = [
  { id: '101', number: '101', type: 'Standard', floor: 1, status: 'occupied', price: 2500, guest: 'Ananya Gupta' },
  { id: '102', number: '102', type: 'Standard', floor: 1, status: 'available', price: 2500 },
  { id: '103', number: '103', type: 'Deluxe', floor: 1, status: 'occupied', price: 4500, guest: 'Rahul Verma' },
  { id: '104', number: '104', type: 'Deluxe', floor: 1, status: 'maintenance', price: 4500 },
  { id: '201', number: '201', type: 'Suite', floor: 2, status: 'available', price: 8000 },
  { id: '202', number: '202', type: 'Suite', floor: 2, status: 'occupied', price: 8000, guest: 'Priya Singh' },
];

export default function RoomsPage() {
  const [activeFloor, setActiveFloor] = useState('All Floors');
  const [activeType, setActiveType] = useState('All Types');
  const [showAddRoom, setShowAddRoom] = useState(false);
  const [showEditRoom, setShowEditRoom] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [rooms, setRooms] = useState<Room[]>(initialRooms);
  const [newRoom, setNewRoom] = useState({
    number: '',
    floor: 'Floor 1',
    type: 'Standard',
    price: '',
    amenities: [] as string[],
  });
  const [editRoomData, setEditRoomData] = useState({
    status: '',
    price: '',
  });

  const handleEditRoom = (room: Room) => {
    setSelectedRoom(room);
    setEditRoomData({ status: room.status, price: room.price.toString() });
    setShowEditRoom(true);
  };

  const handleDeleteRoom = (room: Room) => {
    setSelectedRoom(room);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (selectedRoom) {
      setRooms(rooms.filter(r => r.id !== selectedRoom.id));
      setShowDeleteConfirm(false);
      setSelectedRoom(null);
      alert('Room deleted successfully!');
    }
  };

  const handleAddRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRoom.number || !newRoom.price) {
      alert('Please fill in all required fields');
      return;
    }
    const room: Room = {
      id: Date.now().toString(),
      number: newRoom.number,
      type: newRoom.type,
      floor: parseInt(newRoom.floor.replace('Floor ', '')),
      status: 'available',
      price: parseInt(newRoom.price),
      amenities: newRoom.amenities,
    };
    setRooms([room, ...rooms]);
    setNewRoom({ number: '', floor: 'Floor 1', type: 'Standard', price: '', amenities: [] });
    setShowAddRoom(false);
    alert('Room added successfully!');
  };

  const handleUpdateRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRoom) return;
    setRooms(rooms.map(r => 
      r.id === selectedRoom.id 
        ? { ...r, status: editRoomData.status as Room['status'], price: parseInt(editRoomData.price) }
        : r
    ));
    setShowEditRoom(false);
    setSelectedRoom(null);
    alert('Room updated successfully!');
  };

  const handleStatusChange = (roomId: string, newStatus: Room['status']) => {
    setRooms(rooms.map(r => r.id === roomId ? { ...r, status: newStatus } : r));
    alert(`Room status changed to ${newStatus}`);
  };

  const filteredRooms = rooms.filter(room => {
    const matchesFloor = activeFloor === 'All Floors' || `Floor ${room.floor}` === activeFloor;
    const matchesType = activeType === 'All Types' || room.type === activeType;
    const matchesSearch = searchQuery === '' || 
      room.number.includes(searchQuery) ||
      room.type.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFloor && matchesType && matchesSearch;
  });

  const toggleAmenity = (amenity: string) => {
    setNewRoom(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  return (
    <DashboardLayout title="Rooms" subtitle="Manage room inventory">
      <div className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {roomStats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="stat-card">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-slate-500">{stat.label}</p>
                  <Icon className="w-5 h-5" style={{ color: stat.color }} />
                </div>
                <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
              </div>
            );
          })}
        </div>

        <div className="card p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div className="flex flex-wrap items-center gap-3">
              <select
                value={activeFloor}
                onChange={(e) => setActiveFloor(e.target.value)}
                className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-400"
              >
                {floors.map((floor) => (
                  <option key={floor} value={floor}>{floor}</option>
                ))}
              </select>
              <select
                value={activeType}
                onChange={(e) => setActiveType(e.target.value)}
                className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-400"
              >
                {roomTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="flex-1 sm:flex-none relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search rooms..."
                  className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm w-full sm:w-64 focus:outline-none focus:border-blue-400"
                />
              </div>
              <button 
                onClick={() => setShowAddRoom(true)}
                className="btn-primary flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Add Room</span>
              </button>
            </div>
          </div>

          <RoomsGrid />

          <div className="mt-6 overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Room</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Type</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Floor</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Price</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredRooms.map((room) => (
                  <tr key={room.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-medium text-slate-800">Room {room.number}</td>
                    <td className="px-4 py-3 text-slate-600">{room.type}</td>
                    <td className="px-4 py-3 text-slate-600">Floor {room.floor}</td>
                    <td className="px-4 py-3">
                      <select 
                        value={room.status}
                        onChange={(e) => handleStatusChange(room.id, e.target.value as Room['status'])}
                        className={`px-2 py-1 rounded-full text-xs font-medium border-0 cursor-pointer ${
                          room.status === 'available' ? 'bg-green-100 text-green-700' :
                          room.status === 'occupied' ? 'bg-blue-100 text-blue-700' :
                          room.status === 'maintenance' ? 'bg-amber-100 text-amber-700' :
                          'bg-red-100 text-red-700'
                        }`}
                      >
                        <option value="available">Available</option>
                        <option value="occupied">Occupied</option>
                        <option value="maintenance">Maintenance</option>
                        <option value="out-of-service">Out of Service</option>
                      </select>
                    </td>
                    <td className="px-4 py-3 text-slate-800">₹{room.price.toLocaleString()}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => handleEditRoom(room)}
                          className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors"
                          title="Edit Room"
                        >
                          <Edit className="w-4 h-4 text-slate-400" />
                        </button>
                        <button 
                          onClick={() => handleDeleteRoom(room)}
                          className="p-1.5 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete Room"
                        >
                          <Trash2 className="w-4 h-4 text-red-400" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Modal isOpen={showAddRoom} onClose={() => setShowAddRoom(false)} title="Add New Room" size="md">
        <form onSubmit={handleAddRoom} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Room Number *</label>
              <input
                type="text"
                value={newRoom.number}
                onChange={(e) => setNewRoom({...newRoom, number: e.target.value})}
                placeholder="e.g., 301"
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-400"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Floor *</label>
              <select 
                value={newRoom.floor}
                onChange={(e) => setNewRoom({...newRoom, floor: e.target.value})}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-400"
                required
              >
                <option>Floor 1</option>
                <option>Floor 2</option>
                <option>Floor 3</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Room Type *</label>
              <select 
                value={newRoom.type}
                onChange={(e) => setNewRoom({...newRoom, type: e.target.value})}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-400"
                required
              >
                <option>Standard</option>
                <option>Deluxe</option>
                <option>Suite</option>
                <option>Presidential</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Price per Night *</label>
              <input
                type="number"
                value={newRoom.price}
                onChange={(e) => setNewRoom({...newRoom, price: e.target.value})}
                placeholder="₹2500"
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-400"
                required
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-2">Amenities</label>
              <div className="flex flex-wrap gap-3">
                {['Wifi', 'TV', 'AC', 'Coffee Machine', 'Bathtub', 'Mini Bar'].map((amenity) => (
                  <label key={amenity} className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={newRoom.amenities.includes(amenity)}
                      onChange={() => toggleAmenity(amenity)}
                      className="rounded border-slate-300" 
                    />
                    <span className="text-sm text-slate-600">{amenity}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setShowAddRoom(false)}
              className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Add Room
            </button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={showEditRoom} onClose={() => setShowEditRoom(false)} title="Edit Room" size="md">
        {selectedRoom && (
          <form onSubmit={handleUpdateRoom} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Room Number</label>
                <input
                  type="text"
                  defaultValue={selectedRoom.number}
                  disabled
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg bg-slate-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Status</label>
                <select 
                  value={editRoomData.status}
                  onChange={(e) => setEditRoomData({...editRoomData, status: e.target.value})}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-400"
                >
                  <option value="available">Available</option>
                  <option value="occupied">Occupied</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="out-of-service">Out of Service</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Price per Night</label>
                <input
                  type="number"
                  value={editRoomData.price}
                  onChange={(e) => setEditRoomData({...editRoomData, price: e.target.value})}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-400"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowEditRoom(false)}
                className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button type="submit" className="btn-primary">
                Save Changes
              </button>
            </div>
          </form>
        )}
      </Modal>

      <Modal isOpen={showDeleteConfirm} onClose={() => setShowDeleteConfirm(false)} title="Confirm Delete" size="sm">
        <div className="space-y-4">
          <p className="text-slate-600">Are you sure you want to delete Room {selectedRoom?.number}? This action cannot be undone.</p>
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setShowDeleteConfirm(false)}
              className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={confirmDelete}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </DashboardLayout>
  );
}