import React, { useState } from 'react';
import { authAPI } from '../services/api';
import { LogIn, Mail, Lock, User, Shield, Zap, Trophy, Target, Info, Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const [userType, setUserType] = useState('user');
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    console.log('🔐 Login attempt with:', { email: formData.email, userType });

    try {
      // Hardcoded admin login (accepts both 'admin' and 'admin@nitk.edu.in')
      if (userType === 'admin' && 
          (formData.email === 'admin' || formData.email === 'admin@nitk.edu.in') && 
          formData.password === 'admin') {
        console.log('✅ Hardcoded admin login successful!');
        localStorage.setItem('accessToken', 'admin-token-' + Date.now());
        localStorage.setItem('refreshToken', 'admin-refresh-' + Date.now());
        localStorage.setItem('userType', 'admin');
        localStorage.setItem('userEmail', 'admin@nitk.edu.in');
        
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 500);
        return;
      }

      const loginFunction = userType === 'admin' ? authAPI.loginAdmin : authAPI.loginUser;
      console.log('📡 Calling API...');
      
      const response = await loginFunction(formData);
      console.log('✅ API Response:', response);
      console.log('📦 Response data:', response.data);

      const tokens = response.data.response || response.data;
      console.log('🔑 Extracted tokens:', tokens);
      
      const { accessToken, refreshToken } = tokens;
      
      if (!accessToken) {
        console.error('❌ No access token in response!');
        throw new Error('Invalid response: no access token received');
      }

      console.log('💾 Storing tokens in localStorage...');
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('userType', userType);
      localStorage.setItem('userEmail', formData.email);

      console.log('✅ Login successful! Redirecting to dashboard...');
      window.location.href = '/dashboard';
    } catch (err) {
      console.error('❌ Login error:', err);
      console.error('Error details:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status
      });
      
      const errorMsg = err.response?.data?.message || err.message || 'Login failed. Please check your credentials.';
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 max-w-6xl w-full relative z-10">
        {/* Left Side - Hero Section */}
        <div className="hidden lg:flex flex-col justify-center p-12 text-white">
          <div className="mb-8 animate-fade-in">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-5xl">🏆</span>
              <div>
                <h1 className="text-5xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                  NITK Sports
                </h1>
                <p className="text-purple-300 font-semibold">Book Your Next Game</p>
              </div>
            </div>
            
            <h2 className="text-4xl font-bold mb-4 leading-tight">
              Welcome Back to <br />
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Sports Excellence
              </span>
            </h2>
            <p className="text-gray-300 text-lg mb-8">
              Sign in to access premium sports facilities, manage bookings, and join the NITK sports community.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="space-y-4 animate-slide-up">
            <div className="flex items-start gap-4 p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/10 transition">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Instant Booking</h3>
                <p className="text-gray-400 text-sm">Reserve facilities in seconds with real-time availability</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/10 transition">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">15+ Facilities</h3>
                <p className="text-gray-400 text-sm">Access to football fields, basketball courts, and more</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/10 transition">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Secure & Reliable</h3>
                <p className="text-gray-400 text-sm">Your bookings and payments are always protected</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="flex items-center justify-center">
          <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl animate-scale-in">
            {/* Mobile Logo */}
            <div className="lg:hidden flex items-center justify-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Trophy className="w-7 h-7 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-white">NITK Sports</h1>
            </div>

            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">Welcome Back!</h2>
              <p className="text-gray-300">Sign in to continue your sports journey</p>
            </div>

            {/* User Type Toggle */}
            <div className="flex gap-3 mb-6">
              <button
                type="button"
                onClick={() => {
                  setUserType('user');
                  setError('');
                }}
                className={`flex-1 py-3 px-4 rounded-xl font-semibold transition flex items-center justify-center gap-2 ${
                  userType === 'user'
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/50'
                    : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/20'
                }`}
              >
                <User className="w-5 h-5" />
                User
              </button>
              <button
                type="button"
                onClick={() => {
                  setUserType('admin');
                  setError('');
                }}
                className={`flex-1 py-3 px-4 rounded-xl font-semibold transition flex items-center justify-center gap-2 ${
                  userType === 'admin'
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/50'
                    : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/20'
                }`}
              >
                <Shield className="w-5 h-5" />
                Admin
              </button>
            </div>

            {/* Admin Hint */}
            {userType === 'admin' && (
              <div className="mb-4 p-3 bg-blue-500/20 border border-blue-500/50 rounded-xl text-blue-200 text-sm flex items-start gap-2">
                <Info className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold mb-1">Admin Login Credentials:</p>
                  <p>Email: <code className="bg-black/30 px-2 py-0.5 rounded">admin@nitk.edu.in</code></p>
                  <p>Password: <code className="bg-black/30 px-2 py-0.5 rounded">admin</code></p>
                </div>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-gray-300 mb-2 text-sm font-semibold">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type={userType === 'admin' ? 'text' : 'email'}
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={userType === 'admin' ? 'admin@nitk.edu.in' : 'your@email.com'}
                    required
                    className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-300 mb-2 text-sm font-semibold">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    required
                    className="w-full pl-12 pr-12 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 transition"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-300 text-sm flex items-center gap-2 animate-shake">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-4 rounded-xl font-bold text-lg transition flex items-center justify-center gap-2 ${
                  loading
                    ? 'bg-gray-500/20 text-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg shadow-purple-500/50 hover:shadow-purple-500/70'
                }`}
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Signing In...
                  </>
                ) : (
                  <>
                    <LogIn className="w-5 h-5" />
                    Sign In
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-400">
                New to NITK Sports?{' '}
                <a href="/register" className="text-purple-400 hover:text-purple-300 font-semibold transition">
                  Create an account
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
