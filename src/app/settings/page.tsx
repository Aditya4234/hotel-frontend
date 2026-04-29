'use client';

import { useState } from 'react';
import DashboardLayout from '../component/DashboardLayout';
import { Save, Building2, Bell, Shield, Palette, Mail, Phone, MapPin, Globe, Clock, DollarSign, Users } from 'lucide-react';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('general');
  const [generalSettings, setGeneralSettings] = useState({
    hotelName: 'HotelHub Grand',
    brandName: 'HotelHub',
    email: 'contact@hotelhub.com',
    phone: '+91 98765 43210',
    address: '123 Hotel Street, Business District, Mumbai - 400001',
    checkin: '14:00',
    checkout: '11:00',
    timezone: 'Asia/Kolkata (IST)',
    currency: 'INR (₹)',
  });
  const [notifications, setNotifications] = useState({
    newBooking: true,
    checkIn: true,
    checkOut: false,
    paymentReceived: true,
    maintenanceRequests: true,
    dailyReport: false,
  });
  const [securitySettings, setSecuritySettings] = useState({
    twoFactor: true,
    sessionTimeout: '30 minutes',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [appearanceSettings, setAppearanceSettings] = useState({
    accentColor: '#3b82f6',
    theme: 'dark',
  });

  const tabs = [
    { id: 'general', label: 'General', icon: Building2 },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'appearance', label: 'Appearance', icon: Palette },
  ];

  const handleSaveGeneral = () => {
    alert('General settings saved');
  };

  const handleToggleNotification = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSaveNotifications = () => {
    alert('Notification preferences saved');
  };

  const handleToggleTwoFactor = () => {
    setSecuritySettings((prev) => ({ ...prev, twoFactor: !prev.twoFactor }));
  };

  const handleSaveSecurity = () => {
    if (securitySettings.newPassword && securitySettings.newPassword !== securitySettings.confirmPassword) {
      alert('New password and confirmation do not match');
      return;
    }
    alert('Security settings updated');
  };

  const handleSaveAppearance = () => {
    alert('Appearance saved');
  };

  return (
    <DashboardLayout title="Settings" subtitle="Manage your hotel configuration">
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <div className="card p-4">
              <nav className="space-y-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all ${
                        activeTab === tab.id
                          ? 'bg-[#1e3a5f] text-white'
                          : 'text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          <div className="lg:col-span-3">
            {activeTab === 'general' && (
              <div className="card p-6 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-4">Hotel Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Hotel Name</label>
                      <input
                        type="text"
                        value={generalSettings.hotelName}
                        onChange={(e) => setGeneralSettings({ ...generalSettings, hotelName: e.target.value })}
                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-400"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Brand Name</label>
                      <input
                        type="text"
                        value={generalSettings.brandName}
                        onChange={(e) => setGeneralSettings({ ...generalSettings, brandName: e.target.value })}
                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-400"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                      <input
                        type="email"
                        value={generalSettings.email}
                        onChange={(e) => setGeneralSettings({ ...generalSettings, email: e.target.value })}
                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-400"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Phone</label>
                      <input
                        type="tel"
                        value={generalSettings.phone}
                        onChange={(e) => setGeneralSettings({ ...generalSettings, phone: e.target.value })}
                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-400"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-slate-700 mb-2">Address</label>
                      <input
                        type="text"
                        value={generalSettings.address}
                        onChange={(e) => setGeneralSettings({ ...generalSettings, address: e.target.value })}
                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-400"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <h3 className="text-lg font-semibold text-slate-800 mb-4">Business Hours</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Check-in Time</label>
                      <input
                        type="time"
                        value={generalSettings.checkin}
                        onChange={(e) => setGeneralSettings({ ...generalSettings, checkin: e.target.value })}
                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-400"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Check-out Time</label>
                      <input
                        type="time"
                        value={generalSettings.checkout}
                        onChange={(e) => setGeneralSettings({ ...generalSettings, checkout: e.target.value })}
                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-400"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Timezone</label>
                      <select
                        value={generalSettings.timezone}
                        onChange={(e) => setGeneralSettings({ ...generalSettings, timezone: e.target.value })}
                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-400"
                      >
                        <option>Asia/Kolkata (IST)</option>
                        <option>Asia/Dubai (GST)</option>
                        <option>Asia/Singapore (SGT)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Currency</label>
                      <select
                        value={generalSettings.currency}
                        onChange={(e) => setGeneralSettings({ ...generalSettings, currency: e.target.value })}
                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-400"
                      >
                        <option>INR (₹)</option>
                        <option>USD ($)</option>
                        <option>AED (د.إ)</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button type="button" onClick={handleSaveGeneral} className="btn-primary flex items-center gap-2">
                    <Save className="w-4 h-4" />
                    Save Changes
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="card p-6 space-y-6">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Notification Preferences</h3>
                <div className="space-y-4">
                  {[
                    { key: 'newBooking', label: 'New Booking Alerts', desc: 'Get notified when a new booking is made' },
                    { key: 'checkIn', label: 'Check-in Notifications', desc: 'Alert when guests check in' },
                    { key: 'checkOut', label: 'Check-out Reminders', desc: 'Reminder before guest check-out' },
                    { key: 'paymentReceived', label: 'Payment Received', desc: 'Alert for successful payments' },
                    { key: 'maintenanceRequests', label: 'Maintenance Requests', desc: 'Notify for maintenance issues' },
                    { key: 'dailyReport', label: 'Daily Report Email', desc: 'Receive daily summary' },
                  ].map((item) => {
                    const enabled = notifications[item.key as keyof typeof notifications];
                    return (
                      <div key={item.label} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                        <div>
                          <p className="font-medium text-slate-800">{item.label}</p>
                          <p className="text-sm text-slate-500">{item.desc}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleToggleNotification(item.key as keyof typeof notifications)}
                          className={`w-12 h-6 rounded-full transition-colors ${
                            enabled ? 'bg-green-500' : 'bg-slate-300'
                          }`}
                        >
                          <div
                            className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${
                              enabled ? 'translate-x-6' : 'translate-x-0.5'
                            }`}
                          />
                        </button>
                      </div>
                    );
                  })}
                </div>
                <div className="flex justify-end">
                  <button type="button" onClick={handleSaveNotifications} className="btn-primary flex items-center gap-2">
                    <Save className="w-4 h-4" />
                    Save Preferences
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="card p-6 space-y-6">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Security Settings</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-slate-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium text-slate-800">Two-Factor Authentication</p>
                      <button
                        type="button"
                        onClick={handleToggleTwoFactor}
                        className={`w-12 h-6 rounded-full transition-colors ${
                          securitySettings.twoFactor ? 'bg-green-500' : 'bg-slate-300'
                        }`}
                      >
                        <div
                          className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${
                            securitySettings.twoFactor ? 'translate-x-6' : 'translate-x-0.5'
                          }`}
                        />
                      </button>
                    </div>
                    <p className="text-sm text-slate-500">Add an extra layer of security to your account</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium text-slate-800">Session Timeout</p>
                    </div>
                    <select
                      value={securitySettings.sessionTimeout}
                      onChange={(e) => setSecuritySettings({ ...securitySettings, sessionTimeout: e.target.value })}
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg"
                    >
                      <option>15 minutes</option>
                      <option>30 minutes</option>
                      <option>1 hour</option>
                      <option>Never</option>
                    </select>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-lg">
                    <p className="font-medium text-slate-800 mb-2">Change Password</p>
                    <div className="space-y-3">
                      <input
                        type="password"
                        value={securitySettings.currentPassword}
                        onChange={(e) => setSecuritySettings({ ...securitySettings, currentPassword: e.target.value })}
                        placeholder="Current password"
                        className="w-full px-4 py-2 border border-slate-200 rounded-lg"
                      />
                      <input
                        type="password"
                        value={securitySettings.newPassword}
                        onChange={(e) => setSecuritySettings({ ...securitySettings, newPassword: e.target.value })}
                        placeholder="New password"
                        className="w-full px-4 py-2 border border-slate-200 rounded-lg"
                      />
                      <input
                        type="password"
                        value={securitySettings.confirmPassword}
                        onChange={(e) => setSecuritySettings({ ...securitySettings, confirmPassword: e.target.value })}
                        placeholder="Confirm new password"
                        className="w-full px-4 py-2 border border-slate-200 rounded-lg"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-end">
                  <button type="button" onClick={handleSaveSecurity} className="btn-primary flex items-center gap-2">
                    <Save className="w-4 h-4" />
                    Update Settings
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'appearance' && (
              <div className="card p-6 space-y-6">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Appearance Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Accent Color</label>
                    <div className="flex gap-3">
                      {['#3b82f6', '#10b981', '#8b5cf6', '#f59e0b', '#ef4444'].map((color) => (
                        <button
                          key={color}
                          type="button"
                          onClick={() => setAppearanceSettings({ ...appearanceSettings, accentColor: color })}
                          className={`w-10 h-10 rounded-lg border-2 ${
                            appearanceSettings.accentColor === color ? 'border-slate-800' : 'border-slate-200'
                          }`}
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Sidebar Style</label>
                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={() => setAppearanceSettings({ ...appearanceSettings, theme: 'dark' })}
                        className={`flex-1 p-4 rounded-lg text-center ${
                          appearanceSettings.theme === 'dark' ? 'bg-[#1e3a5f] text-white' : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        Dark
                      </button>
                      <button
                        type="button"
                        onClick={() => setAppearanceSettings({ ...appearanceSettings, theme: 'light' })}
                        className={`flex-1 p-4 rounded-lg text-center ${
                          appearanceSettings.theme === 'light' ? 'bg-[#1e3a5f] text-white' : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        Light
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end">
                  <button type="button" onClick={handleSaveAppearance} className="btn-primary flex items-center gap-2">
                    <Save className="w-4 h-4" />
                    Save Theme
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}