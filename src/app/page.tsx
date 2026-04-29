import type { Metadata } from 'next';
import LandingPageClient from './LandingPageClient';

export const metadata: Metadata = {
  title: 'HotelHub - Modern Hotel Management System',
  description: 'Streamline hotel operations with HotelHub - the all-in-one hotel management platform for bookings, guest relations, and analytics.',
  openGraph: {
    title: 'HotelHub - Modern Hotel Management System',
    description: 'Streamline hotel operations with HotelHub - the all-in-one hotel management platform.',
    type: 'website',
  },
};

export default function HomePage() {
  return <LandingPageClient />;
}
