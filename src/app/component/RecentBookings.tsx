'use client';

import { ArrowRight, MoreHorizontal } from 'lucide-react';

export interface BookingData {
  id: string;
  guestName: string;
  room: string;
  checkIn: string;
  checkOut: string;
  status: string;
}

interface RecentBookingsProps {
  data: BookingData[];
}

export function getStatusStyle(status: string): { bg: string; text: string } {
  switch (status) {
    case 'Confirmed':
      return { bg: '#dcfce7', text: '#166534' };
    case 'Checked-in':
      return { bg: '#dbeafe', text: '#1e40af' };
    case 'Pending':
      return { bg: '#fef3c7', text: '#92400e' };
    default:
      return { bg: '#f1f5f9', text: '#475569' };
  }
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
}

export default function RecentBookings({ data }: RecentBookingsProps) {
  return (
    <div className="card overflow-hidden">
      <div className="p-6 border-b border-slate-100">
        <div className="flex items-center justify-between">
        <div>
             <h2 className="text-lg font-semibold text-slate-800">Recent Bookings</h2>
             <p className="text-sm text-slate-500">Latest reservations</p>
           </div>
           <button className="btn-primary flex items-center gap-2" aria-label="View all bookings">
             View All
             <ArrowRight className="w-4 h-4" aria-hidden="true" />
           </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50">
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Booking ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Guest Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Room
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Check-in
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Check-out
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {data.map((booking) => {
              const statusStyle = getStatusStyle(booking.status);

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
                    <span className="text-sm text-slate-600">{formatDate(booking.checkIn)}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-slate-600">{formatDate(booking.checkOut)}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className="badge"
                      style={{
                        backgroundColor: statusStyle.bg,
                        color: statusStyle.text,
                      }}
                    >
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                     <button className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors" aria-label={`More actions for booking ${booking.id}`}>
                       <MoreHorizontal className="w-5 h-5 text-slate-400" aria-hidden="true" />
                     </button>
                   </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}