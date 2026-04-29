'use client';

import { useState } from 'react';
import DashboardLayout from '../component/DashboardLayout';
import Modal from '../component/Modal';
import { Search, Plus, Edit, Trash2, Mail, Phone, User, Shield, Clock, Star } from 'lucide-react';

const staffData = [
  { id: '1', name: 'Rajesh Kumar', role: 'Manager', department: 'Front Desk', email: 'rajesh@hotel.com', phone: '+91 98765 43210', shift: 'Morning', status: 'active', rating: 4.8 },
  { id: '2', name: 'Meera Singh', role: 'Receptionist', department: 'Front Desk', email: 'meera@hotel.com', phone: '+91 87654 32109', shift: 'Morning', status: 'active', rating: 4.6 },
  { id: '3', name: 'Amit Patel', role: 'Housekeeper', department: 'Housekeeping', email: 'amit@hotel.com', phone: '+91 76543 21098', shift: 'Day', status: 'active', rating: 4.5 },
  { id: '4', name: 'Sunita Devi', role: 'Housekeeper', department: 'Housekeeping', email: 'sunita@hotel.com', phone: '+91 65432 10987', shift: 'Day', status: 'active', rating: 4.7 },
  { id: '5', name: 'Vikram Sharma', role: 'Chef', department: 'Kitchen', email: 'vikram@hotel.com', phone: '+91 54321 09876', shift: 'Morning', status: 'active', rating: 4.9 },
  { id: '6', name: 'Anita Gupta', role: 'Security', department: 'Security', email: 'anita@hotel.com', phone: '+91 43210 98765', shift: 'Night', status: 'on-leave', rating: 4.4 },
];

const departments = ['All Departments', 'Front Desk', 'Housekeeping', 'Kitchen', 'Security', 'Maintenance'];

export default function StaffPage() {
  const [activeDept, setActiveDept] = useState('All Departments');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddStaff, setShowAddStaff] = useState(false);
  const [showEditStaff, setShowEditStaff] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<typeof staffData[0] | null>(null);
  const [staffList, setStaffList] = useState(staffData);
  const [newStaff, setNewStaff] = useState({
    name: '',
    role: '',
    department: 'Front Desk',
    email: '',
    phone: '',
    shift: 'Morning',
  });
  const [editStaffData, setEditStaffData] = useState({
    name: '',
    role: '',
    department: 'Front Desk',
    shift: 'Morning',
    status: 'active',
  });

  const handleEditStaff = (staff: typeof staffData[0]) => {
    setSelectedStaff(staff);
    setEditStaffData({
      name: staff.name,
      role: staff.role,
      department: staff.department,
      shift: staff.shift,
      status: staff.status,
    });
    setShowEditStaff(true);
  };

  const handleAddStaff = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStaff.name || !newStaff.role || !newStaff.email || !newStaff.phone) {
      alert('Please complete all required fields');
      return;
    }
    setStaffList([
      {
        ...newStaff,
        id: Date.now().toString(),
        status: 'active',
        rating: 0,
      },
      ...staffList,
    ] as typeof staffData);
    setNewStaff({ name: '', role: '', department: 'Front Desk', email: '', phone: '', shift: 'Morning' });
    setShowAddStaff(false);
  };

  const handleSaveStaff = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStaff) return;
    setStaffList(staffList.map((staff) =>
      staff.id === selectedStaff.id
        ? { ...staff, ...editStaffData }
        : staff
    ));
    setSelectedStaff(null);
    setShowEditStaff(false);
    alert('Staff member updated successfully');
  };

  const filteredStaff = staffList.filter((staff) => {
    const matchesDept = activeDept === 'All Departments' || staff.department === activeDept;
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      !query ||
      staff.name.toLowerCase().includes(query) ||
      staff.role.toLowerCase().includes(query) ||
      staff.email.toLowerCase().includes(query);
    return matchesDept && matchesSearch;
  });

  return (
    <DashboardLayout title="Staff" subtitle="Manage hotel employees">
      <div className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="stat-card">
            <p className="text-sm text-slate-500 mb-1">Total Staff</p>
            <p className="text-2xl font-bold text-slate-800">24</p>
          </div>
          <div className="stat-card">
            <p className="text-sm text-slate-500 mb-1">On Duty</p>
            <p className="text-2xl font-bold text-slate-800">18</p>
          </div>
          <div className="stat-card">
            <p className="text-sm text-slate-500 mb-1">On Leave</p>
            <p className="text-2xl font-bold text-slate-800">3</p>
          </div>
          <div className="stat-card">
            <p className="text-sm text-slate-500 mb-1">Avg. Rating</p>
            <p className="text-2xl font-bold text-slate-800">4.6</p>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide pb-2 sm:pb-0">
              {departments.map((dept) => (
                <button
                  key={dept}
                  onClick={() => setActiveDept(dept)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                    activeDept === dept
                      ? 'bg-[#1e3a5f] text-white'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {dept}
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
                  placeholder="Search staff..."
                  className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm w-full sm:w-64 focus:outline-none focus:border-blue-400"
                />
              </div>
              <button 
                onClick={() => setShowAddStaff(true)}
                className="btn-primary flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Add Staff</span>
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Staff Member</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Role</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Department</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Shift</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Rating</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredStaff.map((staff) => (
                  <tr key={staff.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center text-white font-semibold text-sm">
                          {staff.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="font-medium text-slate-800">{staff.name}</p>
                          <p className="text-sm text-slate-500">{staff.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <p className="font-medium text-slate-800">{staff.role}</p>
                    </td>
                    <td className="px-4 py-4">
                      <p className="text-sm text-slate-600">{staff.department}</p>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4 text-slate-400" />
                        <span className="text-sm text-slate-600">{staff.shift}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span 
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          staff.status === 'active' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-amber-100 text-amber-700'
                        }`}
                      >
                        {staff.status === 'active' ? 'Active' : 'On Leave'}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium text-slate-800">{staff.rating}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <button className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors">
                          <Mail className="w-4 h-4 text-slate-400" />
                        </button>
                        <button 
                          onClick={() => handleEditStaff(staff)}
                          className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors"
                        >
                          <Edit className="w-4 h-4 text-slate-400" />
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

      <Modal isOpen={showAddStaff} onClose={() => setShowAddStaff(false)} title="Add New Staff" size="lg">
        <form onSubmit={handleAddStaff} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
              <input
                type="text"
                value={newStaff.name}
                onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })}
                placeholder="Enter staff name"
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Role</label>
              <input
                type="text"
                value={newStaff.role}
                onChange={(e) => setNewStaff({ ...newStaff, role: e.target.value })}
                placeholder="e.g., Receptionist"
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Department</label>
              <select
                value={newStaff.department}
                onChange={(e) => setNewStaff({ ...newStaff, department: e.target.value })}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-400"
              >
                <option>Front Desk</option>
                <option>Housekeeping</option>
                <option>Kitchen</option>
                <option>Security</option>
                <option>Maintenance</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Shift</label>
              <select
                value={newStaff.shift}
                onChange={(e) => setNewStaff({ ...newStaff, shift: e.target.value })}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-400"
              >
                <option>Morning</option>
                <option>Day</option>
                <option>Night</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
              <input
                type="email"
                value={newStaff.email}
                onChange={(e) => setNewStaff({ ...newStaff, email: e.target.value })}
                placeholder="staff@hotel.com"
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Phone</label>
              <input
                type="tel"
                value={newStaff.phone}
                onChange={(e) => setNewStaff({ ...newStaff, phone: e.target.value })}
                placeholder="+91 98765 43210"
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-400"
              />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setShowAddStaff(false)}
              className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Add Staff
            </button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={showEditStaff} onClose={() => setShowEditStaff(false)} title="Edit Staff" size="lg">
        {selectedStaff && (
          <form onSubmit={handleSaveStaff} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
                <input
                  type="text"
                  value={editStaffData.name}
                  onChange={(e) => setEditStaffData({ ...editStaffData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Role</label>
                <input
                  type="text"
                  value={editStaffData.role}
                  onChange={(e) => setEditStaffData({ ...editStaffData, role: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Department</label>
                <select
                  value={editStaffData.department}
                  onChange={(e) => setEditStaffData({ ...editStaffData, department: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-400"
                >
                  <option>Front Desk</option>
                  <option>Housekeeping</option>
                  <option>Kitchen</option>
                  <option>Security</option>
                  <option>Maintenance</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Shift</label>
                <select
                  value={editStaffData.shift}
                  onChange={(e) => setEditStaffData({ ...editStaffData, shift: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-400"
                >
                  <option>Morning</option>
                  <option>Day</option>
                  <option>Night</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Status</label>
                <select
                  value={editStaffData.status}
                  onChange={(e) => setEditStaffData({ ...editStaffData, status: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-400"
                >
                  <option value="active">Active</option>
                  <option value="on-leave">On Leave</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowEditStaff(false)}
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