import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Clock, MapPin, ArrowLeft, Check, X, Info, AlertCircle, DollarSign } from 'lucide-react';

const Booking = () => {
  const [product, setProduct] = useState({
    id: 1,
    name: 'Football Field - Main',
    unitPrice: 500,
    amount: 1,
    category: 'Football',
    location: 'Main Ground',
    icon: '⚽',
    image: 'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=800',
    description: 'Professional-grade football field with floodlights and spectator seating'
  });
  
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const timeSlots = [
    { time: '06:00 AM', available: true },
    { time: '07:00 AM', available: true },
    { time: '08:00 AM', available: false },
    { time: '09:00 AM', available: true },
    { time: '10:00 AM', available: true },
    { time: '11:00 AM', available: false },
    { time: '12:00 PM', available: true },
    { time: '01:00 PM', available: true },
    { time: '02:00 PM', available: true },
    { time: '03:00 PM', available: false },
    { time: '04:00 PM', available: true },
    { time: '05:00 PM', available: true },
    { time: '06:00 PM', available: true },
    { time: '07:00 PM', available: false },
    { time: '08:00 PM', available: true },
    { time: '09:00 PM', available: true },
  ];

  const nextSevenDays = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return date;
  });

  const handleBooking = () => {
    if (!selectedSlot) {
      alert('Please select a time slot');
      return;
    }
    setShowConfirmation(true);
  };

  const confirmBooking = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      window.location.href = `/payment?bookingId=${Date.now()}&amount=${product.unitPrice}`;
    }, 1500);
  };

  const formatDate = (date) => {
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  const isToday = (date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
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
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
              <div className="relative h-80">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-5xl drop-shadow-lg">{product.icon}</span>
                    <span className="px-4 py-1.5 bg-white/90 backdrop-blur text-indigo-600 text-sm font-bold rounded-full">
                      {product.category}
                    </span>
                  </div>
                  <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">{product.name}</h1>
                  <div className="flex items-center gap-4 text-white drop-shadow-lg">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5" />
                      <span className="font-medium">{product.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold">₹{product.unitPrice}</span>
                      <span>per hour</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                  <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-gray-700">
                    <p className="font-bold text-blue-900 mb-1">Booking Information</p>
                    <p className="text-gray-600">{product.description}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <CalendarIcon className="w-6 h-6 text-indigo-600" />
                <h2 className="text-2xl font-bold text-gray-900">Select Date</h2>
              </div>
              <div className="grid grid-cols-7 gap-3">
                {nextSevenDays.map((date, idx) => {
                  const dateStr = date.toISOString().split('T')[0];
                  const isSelected = selectedDate === dateStr;
                  return (
                    <button
                      key={idx}
                      onClick={() => setSelectedDate(dateStr)}
                      className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                        isSelected
                          ? 'bg-gradient-to-br from-indigo-600 to-purple-600 border-indigo-600 text-white shadow-lg shadow-indigo-500/30 transform scale-105'
                          : 'bg-white border-gray-200 text-gray-700 hover:border-indigo-300 hover:shadow-md'
                      }`}
                    >
                      <div className="text-center">
                        <div className={`text-xs font-bold mb-1 ${isSelected ? 'text-white' : 'text-gray-500'}`}>
                          {isToday(date) ? 'Today' : date.toLocaleDateString('en-US', { weekday: 'short' })}
                        </div>
                        <div className="text-2xl font-bold">{date.getDate()}</div>
                        <div className={`text-xs mt-1 ${isSelected ? 'text-white' : 'text-gray-500'}`}>
                          {date.toLocaleDateString('en-US', { month: 'short' })}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Clock className="w-6 h-6 text-indigo-600" />
                  <h2 className="text-2xl font-bold text-gray-900">Select Time Slot</h2>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-gradient-to-br from-indigo-600 to-purple-600 rounded"></div>
                    <span className="text-gray-600">Selected</span>
                  </div>
                  <div className="flex items-center gap-1 ml-3">
                    <div className="w-3 h-3 bg-white border-2 border-gray-200 rounded"></div>
                    <span className="text-gray-600">Available</span>
                  </div>
                  <div className="flex items-center gap-1 ml-3">
                    <div className="w-3 h-3 bg-red-50 border-2 border-red-200 rounded"></div>
                    <span className="text-gray-600">Booked</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-3">
                {timeSlots.map((slot, idx) => (
                  <button
                    key={idx}
                    onClick={() => slot.available && setSelectedSlot(slot)}
                    disabled={!slot.available}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 relative group ${
                      selectedSlot?.time === slot.time
                        ? 'bg-gradient-to-br from-indigo-600 to-purple-600 border-indigo-600 text-white shadow-lg shadow-indigo-500/30 transform scale-105'
                        : slot.available
                        ? 'bg-white border-gray-200 text-gray-700 hover:border-indigo-300 hover:shadow-md hover:scale-105'
                        : 'bg-red-50 border-red-200 text-red-400 cursor-not-allowed opacity-60'
                    }`}
                  >
                    <div className="text-center">
                      <div className="font-bold mb-1 text-sm">{slot.time}</div>
                      {!slot.available && <div className="text-xs font-medium flex items-center justify-center gap-1"><X className="w-3 h-3"/> Booked</div>}
                      {slot.available && selectedSlot?.time === slot.time && (
                        <Check className="w-5 h-5 mx-auto mt-1" />
                      )}
                      {slot.available && selectedSlot?.time !== slot.time && (
                        <div className="text-xs text-gray-400 mt-1">Click to select</div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-xl flex items-start gap-2">
                <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-blue-700">Each booking slot is for 1 hour. Select your preferred time carefully.</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Booking Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <CalendarIcon className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-500 text-sm font-semibold">Date</p>
                    <p className="text-gray-900 font-bold">
                      {selectedDate ? new Date(selectedDate).toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      }) : 'Not selected'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-500 text-sm font-semibold">Time</p>
                    <p className="text-gray-900 font-bold">
                      {selectedSlot ? selectedSlot.time : 'Not selected'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-500 text-sm font-semibold">Location</p>
                    <p className="text-gray-900 font-bold">{product.location}</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6 mb-6">
                <div className="flex justify-between items-center mb-3 text-gray-600">
                  <span className="font-medium">Base Price</span>
                  <span className="font-bold">₹{product.unitPrice}</span>
                </div>
                <div className="flex justify-between items-center mb-3 text-gray-600">
                  <span className="font-medium">Duration</span>
                  <span className="font-bold">1 hour</span>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                  <span className="text-xl font-bold text-gray-900">Total</span>
                  <span className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">₹{product.unitPrice}</span>
                </div>
              </div>

              <button
                onClick={handleBooking}
                disabled={!selectedSlot || loading}
                className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
                  selectedSlot && !loading
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 transform hover:-translate-y-0.5'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              >
                {loading ? 'Processing...' : 'Confirm Booking'}
              </button>

              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
                <p className="text-yellow-900 text-sm">
                  <strong>Note:</strong> You can cancel your booking up to 2 hours before the scheduled time for a full refund.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showConfirmation && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl transform animate-scale-in">
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-indigo-500/30">
                <Check className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Confirm Your Booking</h2>
              <p className="text-gray-600">Please review your booking details before proceeding to payment</p>
            </div>

            <div className="space-y-3 mb-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
              <div className="flex justify-between">
                <span className="text-gray-600 font-medium">Facility</span>
                <span className="text-gray-900 font-bold">{product.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 font-medium">Date</span>
                <span className="text-gray-900 font-bold">{new Date(selectedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 font-medium">Time</span>
                <span className="text-gray-900 font-bold">{selectedSlot?.time}</span>
              </div>
              <div className="flex justify-between pt-3 border-t border-gray-300">
                <span className="text-gray-900 font-bold">Total Amount</span>
                <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">₹{product.unitPrice}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirmation(false)}
                className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl border border-gray-300 transition"
              >
                Cancel
              </button>
              <button
                onClick={confirmBooking}
                className="flex-1 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold rounded-xl transition shadow-lg shadow-indigo-500/30"
              >
                Proceed to Payment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Booking;