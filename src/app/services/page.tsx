'use client';

import { useState } from 'react';
import DashboardLayout from '../component/DashboardLayout';
import Modal from '../component/Modal';
import { Search, Plus, Edit, Trash2, Sparkles, Clock, DollarSign } from 'lucide-react';

const servicesData = [
  { id: '1', name: 'Room Service', description: 'In-room dining and beverages', price: 500, status: 'active', orders: 245 },
  { id: '2', name: 'Housekeeping', description: 'Daily cleaning and turndown', price: 300, status: 'active', orders: 520 },
  { id: '3', name: 'Spa & Wellness', description: 'Massage and relaxation', price: 2500, status: 'active', orders: 85 },
  { id: '4', name: 'Airport Transfer', description: 'Pickup and drop service', price: 1500, status: 'active', orders: 120 },
  { id: '5', name: 'Laundry', description: 'Clothing cleaning service', price: 200, status: 'active', orders: 310 },
  { id: '6', name: 'Business Center', description: 'Printing and fax', price: 100, status: 'active', orders: 45 },
  { id: '7', name: 'Concierge', description: '24/7 assistance', price: 0, status: 'active', orders: 180 },
  { id: '8', name: 'Pool & Gym', description: 'Fitness access', price: 500, status: 'inactive', orders: 0 },
];

export default function ServicesPage() {
  const [showAddService, setShowAddService] = useState(false);
  const [showEditService, setShowEditService] = useState(false);
  const [selectedService, setSelectedService] = useState<typeof servicesData[0] | null>(null);
  const [services, setServices] = useState(servicesData);
  const [searchQuery, setSearchQuery] = useState('');
  const [newService, setNewService] = useState({
    name: '',
    description: '',
    price: '',
    status: 'active',
  });
  const [editServiceData, setEditServiceData] = useState({
    name: '',
    description: '',
    price: '',
    status: 'active',
  });

  const handleEditService = (service: typeof servicesData[0]) => {
    setSelectedService(service);
    setEditServiceData({
      name: service.name,
      description: service.description,
      price: service.price.toString(),
      status: service.status,
    });
    setShowEditService(true);
  };

  const handleDeleteService = (serviceId: string) => {
    setServices(services.filter((service) => service.id !== serviceId));
    alert('Service removed successfully');
  };

  const handleAddService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newService.name || !newService.description || newService.price === '') {
      alert('Please complete all required fields');
      return;
    }
    setServices([
      {
        id: Date.now().toString(),
        name: newService.name,
        description: newService.description,
        price: parseInt(newService.price, 10),
        status: newService.status,
        orders: 0,
      },
      ...services,
    ]);
    setNewService({ name: '', description: '', price: '', status: 'active' });
    setShowAddService(false);
  };

  const handleSaveService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedService) return;
    setServices(services.map((service) =>
      service.id === selectedService.id
        ? { ...service, ...editServiceData, price: parseInt(editServiceData.price, 10) }
        : service
    ));
    setSelectedService(null);
    setShowEditService(false);
    alert('Service updated successfully');
  };

  const filteredServices = services.filter((service) => {
    const query = searchQuery.toLowerCase();
    return (
      !query ||
      service.name.toLowerCase().includes(query) ||
      service.description.toLowerCase().includes(query) ||
      service.status.toLowerCase().includes(query)
    );
  });

  return (
    <DashboardLayout title="Services" subtitle="Manage hotel services">
      <div className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="stat-card">
            <p className="text-sm text-slate-500 mb-1">Total Services</p>
            <p className="text-2xl font-bold text-slate-800">8</p>
          </div>
          <div className="stat-card">
            <p className="text-sm text-slate-500 mb-1">Active</p>
            <p className="text-2xl font-bold text-slate-800">7</p>
          </div>
          <div className="stat-card">
            <p className="text-sm text-slate-500 mb-1">Orders Today</p>
            <p className="text-2xl font-bold text-slate-800">42</p>
          </div>
          <div className="stat-card">
            <p className="text-sm text-slate-500 mb-1">Revenue Today</p>
            <p className="text-2xl font-bold text-slate-800">₹28,500</p>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-800">Service Configuration</h3>
              <p className="text-sm text-slate-500">Manage available hotel services</p>
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search services..."
                  className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm w-full sm:w-64"
                />
              </div>
              <button 
                onClick={() => setShowAddService(true)}
                className="btn-primary flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Add Service</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredServices.map((service) => (
              <div key={service.id} className="p-4 border border-slate-200 rounded-xl hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-blue-500" />
                    <h4 className="font-medium text-slate-800">{service.name}</h4>
                  </div>
                  <span 
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      service.status === 'active' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {service.status}
                  </span>
                </div>
                <p className="text-sm text-slate-500 mb-3">{service.description}</p>
                <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                  <div>
                    <p className="text-lg font-bold text-slate-800">
                      {service.price === 0 ? 'Free' : `₹${service.price}`}
                    </p>
                    {service.price > 0 && <p className="text-xs text-slate-500">per order</p>}
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-slate-800">{service.orders}</p>
                    <p className="text-xs text-slate-500">orders</p>
                  </div>
                </div>
                <div className="flex gap-2 mt-3 pt-3 border-t border-slate-100">
                  <button 
                    onClick={() => handleEditService(service)}
                    className="flex-1 flex items-center justify-center gap-1 py-1.5 text-sm text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    <Edit className="w-4 h-4" /> Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteService(service.id)}
                    className="flex-1 flex items-center justify-center gap-1 py-1.5 text-sm text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" /> Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Modal isOpen={showAddService} onClose={() => setShowAddService(false)} title="Add New Service" size="md">
        <form onSubmit={handleAddService} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Service Name</label>
            <input
              type="text"
              value={newService.name}
              onChange={(e) => setNewService({ ...newService, name: e.target.value })}
              placeholder="e.g., Room Service"
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
            <textarea
              value={newService.description}
              onChange={(e) => setNewService({ ...newService, description: e.target.value })}
              placeholder="Describe the service..."
              rows={2}
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-400 resize-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Price</label>
              <input
                type="number"
                value={newService.price}
                onChange={(e) => setNewService({ ...newService, price: e.target.value })}
                placeholder="0 for free"
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Status</label>
              <select
                value={newService.status}
                onChange={(e) => setNewService({ ...newService, status: e.target.value })}
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
              onClick={() => setShowAddService(false)}
              className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Add Service
            </button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={showEditService} onClose={() => setShowEditService(false)} title="Edit Service" size="md">
        {selectedService && (
          <form onSubmit={handleSaveService} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Service Name</label>
              <input
                type="text"
                value={editServiceData.name}
                onChange={(e) => setEditServiceData({ ...editServiceData, name: e.target.value })}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
              <textarea
                value={editServiceData.description}
                onChange={(e) => setEditServiceData({ ...editServiceData, description: e.target.value })}
                rows={2}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-400 resize-none"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Price</label>
                <input
                  type="number"
                  value={editServiceData.price}
                  onChange={(e) => setEditServiceData({ ...editServiceData, price: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Status</label>
                <select
                  value={editServiceData.status}
                  onChange={(e) => setEditServiceData({ ...editServiceData, status: e.target.value })}
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
                onClick={() => setShowEditService(false)}
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