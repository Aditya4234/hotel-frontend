'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useState } from 'react';
import { Hotel, ArrowRight, Users, Bed, Calendar, TrendingUp, Star, Wifi, Car, Coffee, ChevronDown, Play, Check, Sparkles, Shield, Zap } from 'lucide-react';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'HotelHub',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  description: 'Modern hotel management platform for efficient hotel operations',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'INR',
  },
};

export default function LandingPageClient() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(prev => !prev);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const handleLoginClick = () => {
    router.push('/login');
    closeMobileMenu();
  };

  const rooms = [
    { name: 'Single Standard', image: '/image/Single-Standard.jpeg', price: '₹2,999', features: ['Free WiFi', 'AC', 'TV'] },
    { name: 'Double Deluxe', image: '/image/Double-Delux.jpeg', price: '₹4,999', features: ['Free WiFi', 'AC', 'Mini Bar', 'Balcony'] },
    { name: 'Superior Deluxe', image: '/image/Superior-Delux.jpeg', price: '₹6,999', features: ['Free WiFi', 'AC', 'Mini Bar', 'Jacuzzi', 'Sea View'] },
    { name: 'Superior Standard', image: '/image/Superior-Standard.jpeg', price: '₹5,499', features: ['Free WiFi', 'AC', 'Work Desk', 'City View'] },
  ];

  const stats = [
    { value: '500+', label: 'Hotels Trust Us' },
    { value: '10K+', label: 'Bookings Managed' },
    { value: '99.9%', label: 'Uptime Guarantee' },
    { value: '24/7', label: 'Customer Support' },
  ];

  const testimonials = [
    { name: 'Rahul Sharma', role: 'Hotel Manager', text: 'HotelHub transformed our booking process. Efficiency increased by 300%.', rating: 5 },
    { name: 'Priya Patel', role: 'Owner, Grand Palace', text: 'Best investment we made. The dashboard is intuitive and powerful.', rating: 5 },
    { name: 'Amit Kumar', role: 'Operations Head', text: 'Managing 200+ rooms became effortless with HotelHub.', rating: 5 },
  ];

  const features = [
    { icon: <Bed className="w-8 h-8" />, title: 'Smart Room Management', desc: 'Real-time room status, automated alerts, and seamless inventory control.', color: 'bg-blue-50 text-blue-600' },
    { icon: <Calendar className="w-8 h-8" />, title: 'Advanced Booking System', desc: 'Multi-channel booking sync, instant confirmations, and smart scheduling.', color: 'bg-green-50 text-green-600' },
    { icon: <Users className="w-8 h-8" />, title: 'Guest Relationship Hub', desc: 'Complete guest profiles, preferences tracking, and loyalty programs.', color: 'bg-purple-50 text-purple-600' },
    { icon: <TrendingUp className="w-8 h-8" />, title: 'Intelligent Analytics', desc: 'Revenue forecasting, occupancy trends, and performance insights.', color: 'bg-orange-50 text-orange-600' },
    { icon: <Shield className="w-8 h-8" />, title: 'Secure & Compliant', desc: 'Bank-grade security, GDPR compliant, and data encryption.', color: 'bg-red-50 text-red-600' },
    { icon: <Zap className="w-8 h-8" />, title: 'Lightning Fast', desc: 'Optimized performance, instant load times, and offline capabilities.', color: 'bg-yellow-50 text-yellow-600' },
  ];

  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 z-50 shadow-sm" role="navigation" aria-label="Main navigation">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10">
                <Image src="/image/logo.svg" alt="HotelHub logo" fill className="object-contain" />
              </div>
              <div>
                <span className="text-2xl font-bold text-slate-900">Hotel<span className="text-blue-600">Hub</span></span>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">Features</a>
              <a href="#rooms" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">Rooms</a>
              <a href="#testimonials" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">Reviews</a>
              <a href="#contact" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">Contact</a>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={handleLoginClick}
                className="hidden sm:block bg-slate-900 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-slate-800 transition-all hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
                aria-label="Login to dashboard"
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(prev => !prev)}
                className="md:hidden p-2 hover:bg-slate-100 rounded-lg cursor-pointer"
                aria-label="Toggle mobile menu"
                aria-expanded={mobileMenuOpen}
              >
                <div className="w-5 h-px bg-slate-600 mb-1.5"></div>
                <div className="w-5 h-px bg-slate-600 mb-1.5"></div>
                <div className="w-5 h-px bg-slate-600"></div>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-200 px-4 py-4 space-y-3">
          <a href="#features" className="block text-sm font-medium text-slate-600 hover:text-slate-900 py-2" onClick={() => setMobileMenuOpen(false)}>Features</a>
          <a href="#rooms" className="block text-sm font-medium text-slate-600 hover:text-slate-900 py-2" onClick={() => setMobileMenuOpen(false)}>Rooms</a>
          <a href="#testimonials" className="block text-sm font-medium text-slate-600 hover:text-slate-900 py-2" onClick={() => setMobileMenuOpen(false)}>Reviews</a>
          <a href="#contact" className="block text-sm font-medium text-slate-600 hover:text-slate-900 py-2" onClick={() => setMobileMenuOpen(false)}>Contact</a>
          <button
            onClick={() => { handleLoginClick(); setMobileMenuOpen(false); }}
            className="w-full bg-slate-900 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-slate-800 transition-all text-left"
          >
            Login
          </button>
        </div>
      )}

      <main className="pt-20">
        <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900">
          <div className="absolute inset-0">
            <Image
              src="/image/main-image.jpeg"
              alt="Luxury Hotel"
              fill
              className="object-cover opacity-30"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 to-slate-900/60" />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-blue-600/20 text-blue-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4" />
                Next-Gen Hotel Management Platform
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                Manage Your Hotel Like{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-200">Never Before</span>
              </h1>
              <p className="text-xl text-slate-300 mb-10 leading-relaxed">
                Streamline operations, boost revenue, and delight guests with our all-in-one hotel management platform. Built for modern hotels.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleLoginClick}
                  className="inline-flex items-center justify-center gap-2 bg-white text-slate-900 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-slate-100 transition-all hover:shadow-2xl group focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                >
                  Get Started Free
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </button>
                <button className="inline-flex items-center justify-center gap-2 bg-white/10 text-white border border-white/20 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/20 transition-all focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2">
                  <Play className="w-5 h-5" aria-hidden="true" />
                  Watch Demo
                </button>
              </div>
              <div className="flex items-center gap-6 mt-12">
                <div className="flex -space-x-3">
                  {[1,2,3,4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 border-2 border-white flex items-center justify-center text-white text-sm font-bold">
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1 mb-1">
                    {[1,2,3,4,5].map((i) => <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
                  </div>
                  <p className="text-sm text-slate-300">Trusted by 500+ hotels worldwide</p>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center p-6 rounded-2xl bg-slate-50 hover:bg-slate-100 transition-colors">
                  <p className="text-4xl lg:text-5xl font-bold text-slate-900 mb-2">{stat.value}</p>
                  <p className="text-slate-600 font-medium">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="features" className="py-24 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
                <Sparkles className="w-4 h-4" />
                Powerful Features
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
                Everything You Need in One Place
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                From booking management to guest relations, HotelHub provides all the tools you need to run your hotel efficiently.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="group bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-xl hover:border-slate-300 transition-all duration-300">
                  <div className={`inline-flex p-3 rounded-xl ${feature.color} mb-6 group-hover:scale-110 transition-transform`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="rooms" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
                <Bed className="w-4 h-4" />
                Luxury Rooms
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
                Explore Our Premium Rooms
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Discover comfort and luxury in every room, designed to exceed your guests' expectations.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {rooms.map((room, index) => (
                <div key={index} className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={room.image}
                      alt={room.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                      <span className="text-sm font-bold text-slate-900">{room.price}</span>
                      <span className="text-xs text-slate-600">/night</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-slate-900 text-lg mb-3">{room.name}</h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {room.features.map((feature, i) => (
                        <span key={i} className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-md">{feature}</span>
                      ))}
                    </div>
                     <button
                       onClick={handleLoginClick}
                       className="w-full bg-slate-900 text-white py-2.5 rounded-lg font-medium hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
                     >
                       Book Now
                     </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="testimonials" className="py-24 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                Testimonials
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
                Trusted by Industry Leaders
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-slate-600 mb-6 italic">"{testimonial.text}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-bold">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">{testimonial.name}</p>
                      <p className="text-sm text-slate-500">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 relative overflow-hidden">
          <div className="absolute inset-0">
            <Image src="/image/details-1.jpeg" alt="" fill className="object-cover opacity-10" />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Transform Your Hotel?
            </h2>
            <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
              Join hundreds of hotels already using HotelHub. Start your free trial today - no credit card required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
               <button
                 onClick={handleLoginClick}
                 className="inline-flex items-center justify-center gap-2 bg-white text-slate-900 px-10 py-4 rounded-xl font-semibold text-lg hover:bg-slate-100 transition-all hover:shadow-2xl group focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
               >
                 Start Free Trial
                 <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
               </button>
            </div>
            <div className="flex items-center justify-center gap-8 mt-12 text-slate-400 text-sm">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-400" />
                No setup fees
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-400" />
                Cancel anytime
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-400" />
                24/7 support
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer id="contact" className="bg-slate-900 text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="relative w-10 h-10">
                  <Image src="/image/logo.svg" alt="HotelHub" fill className="object-contain brightness-0 invert" />
                </div>
                <span className="text-2xl font-bold text-white">Hotel<span className="text-blue-400">Hub</span></span>
              </div>
              <p className="text-sm leading-relaxed">
                Modern hotel management platform designed to streamline operations and enhance guest experiences.
              </p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-sm">© 2026 HotelHub. All rights reserved.</p>
            <div className="flex items-center gap-6 mt-4 sm:mt-0">
              <a href="#" className="hover:text-white transition-colors">Twitter</a>
              <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
              <a href="#" className="hover:text-white transition-colors">Facebook</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
