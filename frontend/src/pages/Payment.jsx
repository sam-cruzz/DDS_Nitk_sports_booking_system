import React, { useState, useEffect } from 'react';
import { CreditCard, CheckCircle, XCircle, ArrowLeft, Calendar, DollarSign, Hash, Shield } from 'lucide-react';

const Payment = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  });

  const urlParams = new URLSearchParams(window.location.search);
  const bookingId = urlParams.get('bookingId');
  const amount = urlParams.get('amount');

  const handleCardChange = (e) => {
    let value = e.target.value;
    if (e.target.name === 'cardNumber') {
      value = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
      if (value.length > 19) return;
    }
    if (e.target.name === 'expiryDate') {
      value = value.replace(/\D/g, '');
      if (value.length >= 2) {
        value = value.slice(0, 2) + '/' + value.slice(2, 4);
      }
      if (value.length > 5) return;
    }
    if (e.target.name === 'cvv' && value.length > 3) return;
    
    setCardDetails({ ...cardDetails, [e.target.name]: value });
  };

  const handlePayment = async () => {
    if (!bookingId || !amount) {
      setError('Invalid payment details');
      return;
    }

    if (!cardDetails.cardNumber || !cardDetails.cardName || !cardDetails.expiryDate || !cardDetails.cvv) {
      setError('Please fill in all card details');
      return;
    }

    try {
      setLoading(true);
      setError('');

      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      const paymentData = {
        id: Math.floor(Math.random() * 100000),
        bookingId: parseInt(bookingId),
        amount: parseFloat(amount),
        status: 'SUCCESS',
        transactionId: `TXN${Date.now()}`,
        paymentMethod: 'Card ending in ' + cardDetails.cardNumber.slice(-4)
      };

      setSuccess(true);
      setPaymentDetails(paymentData);
    } catch (err) {
      setError('Payment processing failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!bookingId || !amount) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-8 text-center border border-gray-200 shadow-lg max-w-md">
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Invalid Payment Request</h2>
          <p className="text-gray-600 mb-6">The payment link is invalid or expired.</p>
          <a href="/dashboard" className="inline-block px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold rounded-xl transition shadow-lg shadow-indigo-500/30">
            Go to Dashboard
          </a>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50">
        <nav className="bg-white/80 backdrop-blur-xl border-b border-gray-200 shadow-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent flex items-center justify-center gap-2">
              <span className="text-3xl">🏆</span>
              NITK Sports
            </div>
          </div>
        </nav>

        <div className="max-w-2xl mx-auto px-6 py-12">
          <div className="bg-white rounded-2xl p-8 text-center border border-gray-200 shadow-lg">
            <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/30 animate-scale-in">
              <CheckCircle className="w-14 h-14 text-white" />
            </div>
            
            <h1 className="text-4xl font-bold text-gray-900 mb-3">Payment Successful!</h1>
            <p className="text-gray-600 text-lg mb-8">Your booking has been confirmed</p>
            
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-8 space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-gray-200">
                <div className="flex items-center gap-3 text-gray-600">
                  <Hash className="w-5 h-5" />
                  <span className="font-semibold">Transaction ID</span>
                </div>
                <span className="text-gray-900 font-mono font-bold">{paymentDetails?.transactionId}</span>
              </div>
              
              <div className="flex items-center justify-between py-3 border-b border-gray-200">
                <div className="flex items-center gap-3 text-gray-600">
                  <Calendar className="w-5 h-5" />
                  <span className="font-semibold">Booking ID</span>
                </div>
                <span className="text-gray-900 font-bold">{bookingId}</span>
              </div>
              
              <div className="flex items-center justify-between py-3 border-b border-gray-200">
                <div className="flex items-center gap-3 text-gray-600">
                  <CreditCard className="w-5 h-5" />
                  <span className="font-semibold">Payment Method</span>
                </div>
                <span className="text-gray-900 font-bold">{paymentDetails?.paymentMethod}</span>
              </div>
              
              <div className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3 text-gray-600">
                  <DollarSign className="w-5 h-5" />
                  <span className="font-semibold">Amount Paid</span>
                </div>
                <span className="text-3xl font-bold text-green-500">₹{amount}</span>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => window.location.href = '/dashboard'}
                className="flex-1 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold rounded-xl transition shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40"
              >
                Back to Dashboard
              </button>
              <button
                onClick={() => window.print()}
                className="flex-1 py-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl border border-gray-300 transition"
              >
                Print Receipt
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50">
      <nav className="bg-white/80 backdrop-blur-xl border-b border-gray-200 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button onClick={() => window.history.back()} className="flex items-center gap-2 text-gray-700 hover:text-indigo-600 transition font-semibold">
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </button>
            <div className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-2">
              <span className="text-3xl">🏆</span>
              NITK Sports
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Complete Your Payment</h1>
          <p className="text-gray-600 text-lg">Secure payment for your sports facility booking</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Payment Details</h2>
                  <p className="text-gray-600 text-sm">Enter your card information</p>
                </div>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2 text-sm">Card Number</label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={cardDetails.cardNumber}
                    onChange={handleCardChange}
                    placeholder="1234 5678 9012 3456"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition font-mono text-lg"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2 text-sm">Cardholder Name</label>
                  <input
                    type="text"
                    name="cardName"
                    value={cardDetails.cardName}
                    onChange={handleCardChange}
                    placeholder="John Doe"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2 text-sm">Expiry Date</label>
                    <input
                      type="text"
                      name="expiryDate"
                      value={cardDetails.expiryDate}
                      onChange={handleCardChange}
                      placeholder="MM/YY"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2 text-sm">CVV</label>
                    <input
                      type="password"
                      name="cvv"
                      value={cardDetails.cvv}
                      onChange={handleCardChange}
                      placeholder="123"
                      maxLength="3"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition font-mono"
                    />
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-xl mt-6">
                  <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-gray-700">
                    <p className="font-bold text-blue-900 mb-1">Secure Payment</p>
                    <p className="text-gray-600">Your payment information is encrypted and secure. We use industry-standard security protocols.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between py-3 border-b border-gray-200">
                  <span className="text-gray-600 font-medium">Booking ID</span>
                  <span className="text-gray-900 font-bold">#{bookingId}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-200">
                  <span className="text-gray-600 font-medium">Booking Fee</span>
                  <span className="text-gray-900 font-bold">₹{amount}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-200">
                  <span className="text-gray-600 font-medium">Processing Fee</span>
                  <span className="text-gray-900 font-bold">₹0</span>
                </div>
                <div className="flex justify-between items-center pt-3">
                  <span className="text-xl font-bold text-gray-900">Total</span>
                  <span className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">₹{amount}</span>
                </div>
              </div>

              {error && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl">
                  <div className="flex items-center gap-2 text-red-600">
                    <XCircle className="w-5 h-5" />
                    <span className="text-sm font-bold">{error}</span>
                  </div>
                </div>
              )}

              <button
                onClick={handlePayment}
                disabled={loading}
                className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
                  loading
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 transform hover:-translate-y-0.5'
                }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-gray-300 border-t-gray-500 rounded-full animate-spin"></div>
                    Processing...
                  </span>
                ) : (
                  `Pay ₹${amount}`
                )}
              </button>

              <button
                onClick={() => window.location.href = '/dashboard'}
                className="w-full mt-3 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl border border-gray-300 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
