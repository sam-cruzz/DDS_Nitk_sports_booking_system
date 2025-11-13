import React, { useState, useEffect } from 'react';
import { ArrowLeft, Calendar, Clock, MapPin, CreditCard, CheckCircle, XCircle, AlertCircle, Download, Search, Filter } from 'lucide-react';

const MyBookings = () => {
  const [bookings, setBookings] = useState([
    // Mock data - replace with actual API call
    {
      id: 1,
      facilityName: 'Football Field - Main',
      facilityIcon: '⚽',
      location: 'Main Ground',
      date: '2025-11-15',
      time: '06:00 PM',
      amount: 500,
      status: 'confirmed',
      bookingId: 'BK001234',
      transactionId: 'TXN1730123456',
      image: 'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=400'
    },
    {
      id: 2,
      facilityName: 'Basketball Court 1',
      facilityIcon: '🏀',
      location: 'Indoor Stadium',
      date: '2025-11-12',
      time: '08:00 AM',
      amount: 300,
      status: 'completed',
      bookingId: 'BK001233',
      transactionId: 'TXN1730023456',
      image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400'
    },
    {
      id: 3,
      facilityName: 'Badminton Hall - A Block',
      facilityIcon: '🏸',
      location: 'Sports Complex',
      date: '2025-11-20',
      time: '03:00 PM',
      amount: 200,
      status: 'pending',
      bookingId: 'BK001235',
      transactionId: 'TXN1730223456',
      image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=400'
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.facilityName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          booking.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'completed':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'pending':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'cancelled':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="w-5 h-5" />;
      case 'completed':
        return <CheckCircle className="w-5 h-5" />;
      case 'pending':
        return <AlertCircle className="w-5 h-5" />;
      case 'cancelled':
        return <XCircle className="w-5 h-5" />;
      default:
        return <AlertCircle className="w-5 h-5" />;
    }
  };

  const downloadReceipt = (booking) => {
    // Mock download - implement actual receipt download
    alert(`Downloading receipt for booking ${booking.bookingId}`);
  };

  const cancelBooking = (bookingId) => {
    if (confirm('Are you sure you want to cancel this booking? This action cannot be undone.')) {
      // Implement cancel booking API call
      setBookings(bookings.map(b => 
        b.id === bookingId ? { ...b, status: 'cancelled' } : b
      ));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50">
      <nav className="bg-white/80 backdrop-blur-xl border-b border-gray-200 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button onClick={() => window.history.back()} className="flex items-center gap-2 text-gray-700 hover:text-indigo-600 transition font-semibold">
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Dashboard</span>
            </button>
            <div className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-2">
              <span className="text-3xl">🏆</span>
              NITK Sports
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
            My Bookings
          </h1>
          <p className="text-gray-600 text-lg">
            View and manage all your facility bookings
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl p-6 mb-8 border border-gray-200 shadow-sm">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative group">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-indigo-600 transition" />
              <input
                type="text"
                placeholder="Search bookings by facility or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition"
              />
            </div>
            
            <div className="relative group">
              <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-indigo-600 transition" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="pl-12 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 appearance-none focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition cursor-pointer font-semibold"
              >
                <option value="all">All Bookings</option>
                <option value="confirmed">Confirmed</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>

        {/* Bookings List */}
        {filteredBookings.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-200">
            <div className="text-6xl mb-4">📅</div>
            <p className="text-gray-600 text-xl font-semibold mb-2">No bookings found</p>
            <p className="text-gray-500 mb-6">Start booking your favorite sports facilities</p>
            <a href="/dashboard" className="inline-block px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold rounded-xl transition shadow-lg shadow-indigo-500/30">
              Browse Facilities
            </a>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredBookings.map((booking) => (
              <div key={booking.id} className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-indigo-300 hover:shadow-xl transition-all duration-300">
                <div className="flex flex-col md:flex-row">
                  {/* Image Section */}
                  <div className="md:w-64 h-48 md:h-auto relative">
                    <img src={booking.image} alt={booking.facilityName} className="w-full h-full object-cover" />
                    <div className="absolute top-4 left-4">
                      <span className="text-5xl drop-shadow-lg">{booking.facilityIcon}</span>
                    </div>
                  </div>

                  {/* Details Section */}
                  <div className="flex-1 p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{booking.facilityName}</h3>
                        <div className="flex items-center gap-2 text-gray-600 mb-2">
                          <MapPin className="w-4 h-4 text-indigo-500" />
                          <span className="font-medium">{booking.location}</span>
                        </div>
                      </div>
                      <div className={`px-4 py-2 rounded-xl border-2 font-bold uppercase text-sm flex items-center gap-2 ${getStatusColor(booking.status)}`}>
                        {getStatusIcon(booking.status)}
                        {booking.status}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 p-4 bg-gray-50 rounded-xl">
                      <div>
                        <p className="text-gray-500 text-sm font-semibold mb-1">Booking ID</p>
                        <p className="text-gray-900 font-bold">{booking.bookingId}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-sm font-semibold mb-1">Date</p>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4 text-indigo-500" />
                          <p className="text-gray-900 font-bold">{new Date(booking.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-gray-500 text-sm font-semibold mb-1">Time</p>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4 text-purple-500" />
                          <p className="text-gray-900 font-bold">{booking.time}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-gray-500 text-sm font-semibold mb-1">Amount</p>
                        <div className="flex items-center gap-1">
                          <CreditCard className="w-4 h-4 text-green-500" />
                          <p className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">₹{booking.amount}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => downloadReceipt(booking)}
                        className="flex-1 md:flex-none px-6 py-2.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 font-bold rounded-xl border border-indigo-200 transition flex items-center justify-center gap-2"
                      >
                        <Download className="w-4 h-4" />
                        Receipt
                      </button>
                      
                      {booking.status === 'confirmed' && (
                        <button
                          onClick={() => cancelBooking(booking.id)}
                          className="flex-1 md:flex-none px-6 py-2.5 bg-red-50 hover:bg-red-100 text-red-600 font-bold rounded-xl border border-red-200 transition flex items-center justify-center gap-2"
                        >
                          <XCircle className="w-4 h-4" />
                          Cancel
                        </button>
                      )}

                      {booking.status === 'completed' && (
                        <button
                          onClick={() => window.location.href = `/booking?productId=${booking.id}`}
                          className="flex-1 md:flex-none px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold rounded-xl transition shadow-lg shadow-indigo-500/30"
                        >
                          Book Again
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
