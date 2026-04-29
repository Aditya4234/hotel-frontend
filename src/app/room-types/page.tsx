'use client';

import { useState } from 'react';
import DashboardLayout from '../component/DashboardLayout';
import Modal from '../component/Modal';
import { Search, Plus, Edit, Trash2, Bed, DollarSign, Users, Wifi, Tv, Coffee, Maximize2 } from 'lucide-react';

const roomTypesData = [
  { id: '1', name: 'Standard Room', basePrice: 2500, capacity: 2, size: '250 sq ft', amenities: ['Wifi', 'TV'], count: 45, occupied: 28, status: 'active' },
  { id: '2', name: 'Deluxe Room', basePrice: 4500, capacity: 3, size: '350 sq ft', amenities: ['Wifi', 'TV', 'Coffee'], count: 30, occupied: 22, status: 'active' },
  { id: '3', name: 'Suite', basePrice: 8000, capacity: 4, size: '550 sq ft', amenities: ['Wifi', 'TV', 'Coffee', 'Bathtub'], count: 15, occupied: 12, status: 'active' },
  { id: '4', name: 'Presidential Suite', basePrice: 15000, capacity: 6, size: '1200 sq ft', amenities: ['Wifi', 'TV', 'Coffee', 'Bathtub', 'Butler'], count: 5, occupied: 3, status: 'active' },
];

const amenityIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  Wifi, Tv, Coffee, Maximize2,
};

export default function RoomTypesPage() {
  const [showAddType, setShowAddType] = useState(false);
  const [showEditType, setShowEditType] = useState(false);
  const [selectedType, setSelectedType] = useState<typeof roomTypesData[0] | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [roomTypes, setRoomTypes] = useState(roomTypesData);
  const [newType, setNewType] = useState({
    name: '',
    basePrice: '',
    capacity: '',
    size: '',
    amenities: [] as string[],
    status: 'active',
  });
  const [editTypeData, setEditTypeData] = useState({
    name: '',
    basePrice: '',
    capacity: '',
    size: '',
    status: 'active',
  });

  const handleEditType = (type: typeof roomTypesData[0]) => {
    setSelectedType(type);
    setEditTypeData({
      name: type.name,
      basePrice: type.basePrice.toString(),
      capacity: type.capacity.toString(),
      size: type.size,
      status: type.status,
    });
    setShowEditType(true);
  };

  const handleDeleteType = (typeId: string) => {
    setRoomTypes(roomTypes.filter((type) => type.id !== typeId));
    alert('Room type removed successfully');
  };

  const handleAddType = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newType.name || !newType.basePrice || !newType.capacity || !newType.size) {
      alert('Please complete all required fields');
      return;
    }
    setRoomTypes([
      {
        id: Date.now().toString(),
        name: newType.name,
        basePrice: parseInt(newType.basePrice, 10),
        capacity: parseInt(newType.capacity, 10),
        size: newType.size,
        amenities: newType.amenities,
        count: 0,
        occupied: 0,
        status: newType.status,
      },
      ...roomTypes,
    ]);
    setNewType({ name: '', basePrice: '', capacity: '', size: '', amenities: [], status: 'active' });
    setShowAddType(false);
  };

  const handleSaveEditType = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedType) return;
    setRoomTypes(roomTypes.map((type) =>
      type.id === selectedType.id
        ? {
            ...type,
            name: editTypeData.name,
            basePrice: parseInt(editTypeData.basePrice, 10),
            capacity: parseInt(editTypeData.capacity, 10),
            size: editTypeData.size,
            status: editTypeData.status,
          }
        : type
    ));
    setShowEditType(false);
    setSelectedType(null);
    alert('Room type updated successfully');
  };

  const filteredRoomTypes = roomTypes.filter((type) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      type.name.toLowerCase().includes(query) ||
      type.capacity.toString().includes(query) ||
      type.size.toLowerCase().includes(query)
    );
  });

  return (
    <DashboardLayout title="Room Types" subtitle="Configure room categories">
      <div className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="stat-card">
            <p className="text-sm text-slate-500 mb-1">Total Types</p>
            <p className="text-2xl font-bold text-slate-800">4</p>
          </div>
          <div className="stat-card">
            <p className="text-sm text-slate-500 mb-1">Total Rooms</p>
            <p className="text-2xl font-bold text-slate-800">95</p>
          </div>
          <div className="stat-card">
            <p className="text-sm text-slate-500 mb-1">Avg. Price</p>
            <p className="text-2xl font-bold text-slate-800">₹5,500</p>
          </div>
          <div className="stat-card">
            <p className="text-sm text-slate-500 mb-1">Occupancy Rate</p>
            <p className="text-2xl font-bold text-slate-800">68%</p>
          </div>
        </div>

        <div className="card overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-slate-800">Room Type Configuration</h3>
              <p className="text-sm text-slate-500">Manage room categories and pricing</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search types..."
                  className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm w-48"
                />
              </div>
              <button 
                onClick={() => setShowAddType(true)}
                className="btn-primary flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Type
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50">
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Room Type</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Base Price</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Capacity</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Size</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Amenities</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Rooms</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredRoomTypes.map((type) => (
                  <tr key={type.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-medium text-slate-800">{type.name}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-slate-800">₹{type.basePrice.toLocaleString()}</p>
                      <p className="text-xs text-slate-500">/night</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4 text-slate-400" />
                        <span className="text-sm text-slate-600">{type.capacity}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-slate-600">{type.size}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        {type.amenities.map((amenity) => {
                          const Icon = amenityIcons[amenity];
                          return Icon ? <Icon key={amenity} className="w-4 h-4 text-slate-400" /> : null;
                        })}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <p className="text-sm text-slate-800">{type.occupied}/{type.count}</p>
                        <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-green-500 rounded-full"
                            style={{ width: `${(type.occupied / type.count) * 100}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => handleEditType(type)}
                          className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors"
                        >
                          <Edit className="w-4 h-4 text-slate-400" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteType(type.id)}
                          className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors"
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

      <Modal isOpen={showAddType} onClose={() => setShowAddType(false)} title="Add Room Type" size="lg">
        <form onSubmit={handleAddType} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Type Name</label>
              <input
                type="text"
                value={newType.name}
                onChange={(e) => setNewType({ ...newType, name: e.target.value })}
                placeholder="e.g., Deluxe Room"
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Base Price (per night)</label>
              <input
                type="number"
                value={newType.basePrice}
                onChange={(e) => setNewType({ ...newType, basePrice: e.target.value })}
                placeholder="₹2500"
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Capacity (guests)</label>
              <input
                type="number"
                value={newType.capacity}
                onChange={(e) => setNewType({ ...newType, capacity: e.target.value })}
                placeholder="2"
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Room Size</label>
              <input
                type="text"
                value={newType.size}
                onChange={(e) => setNewType({ ...newType, size: e.target.value })}
                placeholder="250 sq ft"
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-400"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-2">Amenities</label>
              <div className="flex flex-wrap gap-3">
                {['Wifi', 'TV', 'AC', 'Coffee Machine', 'Bathtub', 'Mini Bar', 'Safe', 'Balcony'].map((amenity) => (
                  <label key={amenity} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={newType.amenities.includes(amenity)}
                      onChange={() => setNewType((prev) => ({
                        ...prev,
                        amenities: prev.amenities.includes(amenity)
                          ? prev.amenities.filter((item) => item !== amenity)
                          : [...prev.amenities, amenity],
                      }))}
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
              onClick={() => setShowAddType(false)}
              className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Add Room Type
            </button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={showEditType} onClose={() => setShowEditType(false)} title="Edit Room Type" size="lg">
        {selectedType && (
          <form onSubmit={handleSaveEditType} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Type Name</label>
                <input
                  type="text"
                  value={editTypeData.name}
                  onChange={(e) => setEditTypeData({ ...editTypeData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Base Price</label>
                <input
                  type="number"
                  value={editTypeData.basePrice}
                  onChange={(e) => setEditTypeData({ ...editTypeData, basePrice: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Capacity</label>
                <input
                  type="number"
                  value={editTypeData.capacity}
                  onChange={(e) => setEditTypeData({ ...editTypeData, capacity: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Room Size</label>
                <input
                  type="text"
                  value={editTypeData.size}
                  onChange={(e) => setEditTypeData({ ...editTypeData, size: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-400"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-2">Amenities</label>
                <div className="flex flex-wrap gap-3">
                  {['Wifi', 'TV', 'AC', 'Coffee Machine', 'Bathtub', 'Mini Bar', 'Safe', 'Balcony'].map((amenity) => (
                    <label key={amenity} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        defaultChecked={selectedType.amenities.includes(amenity)}
                        className="rounded border-slate-300"
                        disabled
                      />
                      <span className="text-sm text-slate-600">{amenity}</span>
                    </label>
                  ))}
                </div>
                <p className="text-xs text-slate-500 mt-2">Amenity selection is read-only in this sample editor.</p>
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-2">Status</label>
                <select
                  value={editTypeData.status}
                  onChange={(e) => setEditTypeData({ ...editTypeData, status: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-400"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowEditType(false)}
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
    </DashboardLayout>
  );
}