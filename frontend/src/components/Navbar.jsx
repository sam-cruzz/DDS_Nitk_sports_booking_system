import React from 'react';
import { Trophy, LogOut, User } from 'lucide-react';

const Navbar = () => {
  const isLoggedIn = !!localStorage.getItem('accessToken');
  const userType = localStorage.getItem('userType');
  const userName = localStorage.getItem('userEmail')?.split('@')[0] || 'User';

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      localStorage.clear();
      window.location.href = '/login';
    }
  };

  return (
    <nav className="bg-black/30 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <a href="/" className="flex items-center gap-3 text-white hover:text-purple-400 transition">
            <Trophy className="w-8 h-8 text-yellow-400" />
            <span className="text-2xl font-bold">NITK Sports</span>
          </a>
          
          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              <>
                <a href="/dashboard" className="text-gray-300 hover:text-white transition font-semibold">
                  Dashboard
                </a>
                <div className="flex items-center gap-3 px-4 py-2 bg-white/10 rounded-lg border border-white/20">
                  <User className="w-5 h-5 text-purple-400" />
                  <span className="text-white font-semibold">{userName}</span>
                  <span className={`px-2 py-1 text-xs rounded-full ${userType === 'admin' ? 'bg-purple-500' : 'bg-blue-500'} text-white`}>
                    {userType === 'admin' ? 'Admin' : 'User'}
                  </span>
                </div>
                <button onClick={handleLogout} className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg border border-red-500/30 transition flex items-center gap-2">
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <a href="/login" className="px-4 py-2 text-white hover:text-gray-200 transition font-semibold">
                  Login
                </a>
                <a href="/register" className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-white font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition transform hover:scale-105">
                  Get Started
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
