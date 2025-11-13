import React, { useState, useEffect } from 'react';
import { Trophy, Menu, X, User, LogOut } from 'lucide-react';

const Navigation = ({ transparent = false, fixed = false }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Check authentication
    const token = localStorage.getItem('accessToken');
    const email = localStorage.getItem('userEmail');
    setIsAuthenticated(!!token);
    setUserName(email?.split('@')[0] || 'User');
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      localStorage.clear();
      window.location.href = '/login';
    }
  };

  const navClasses = `
    ${fixed ? 'fixed' : 'relative'} top-0 w-full z-50 transition-all duration-300
    ${transparent && !isScrolled
      ? 'bg-transparent border-transparent'
      : 'bg-white/90 backdrop-blur-xl border-b border-slate-200/50 shadow-sm'
    }
  `;

  const linkClasses = (isScrolled || !transparent) 
    ? 'text-slate-700 hover:text-primary-600' 
    : 'text-white hover:text-white/80';

  return (
    <nav className={navClasses}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 shadow-md">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <span className={`text-xl font-bold transition-colors ${(isScrolled || !transparent) ? 'text-slate-900' : 'text-white'}`}>
              NITK Sports
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="/#features" className={`font-medium transition-colors ${linkClasses}`}>
              Features
            </a>
            <a href="/#sports" className={`font-medium transition-colors ${linkClasses}`}>
              Sports
            </a>
            {isAuthenticated && (
              <a href="/dashboard" className={`font-medium transition-colors ${linkClasses}`}>
                Dashboard
              </a>
            )}
            <a href="/#about" className={`font-medium transition-colors ${linkClasses}`}>
              About
            </a>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${(isScrolled || !transparent) ? 'bg-slate-100' : 'bg-white/20'}`}>
                  <User className="w-4 h-4" />
                  <span className={`font-medium text-sm ${(isScrolled || !transparent) ? 'text-slate-700' : 'text-white'}`}>
                    {userName}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-600 border border-red-200 transition-colors font-medium"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <a
                  href="/login"
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    (isScrolled || !transparent)
                      ? 'text-slate-700 hover:bg-slate-100'
                      : 'text-white hover:bg-white/10'
                  }`}
                >
                  Login
                </a>
                <a
                  href="/register"
                  className="px-6 py-2.5 bg-gradient-to-r from-primary-600 to-primary-500 rounded-lg text-white font-semibold hover:shadow-lg hover:shadow-primary-500/30 transition-all duration-300 transform hover:scale-105"
                >
                  Get Started
                </a>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors ${
              (isScrolled || !transparent) ? 'text-slate-700 hover:bg-slate-100' : 'text-white hover:bg-white/10'
            }`}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-200/50 animate-fade-in-up">
            <div className="space-y-2">
              <a href="/#features" className="block px-4 py-2 rounded-lg text-slate-700 hover:bg-slate-100 font-medium transition-colors">
                Features
              </a>
              <a href="/#sports" className="block px-4 py-2 rounded-lg text-slate-700 hover:bg-slate-100 font-medium transition-colors">
                Sports
              </a>
              {isAuthenticated && (
                <a href="/dashboard" className="block px-4 py-2 rounded-lg text-slate-700 hover:bg-slate-100 font-medium transition-colors">
                  Dashboard
                </a>
              )}
              <a href="/#about" className="block px-4 py-2 rounded-lg text-slate-700 hover:bg-slate-100 font-medium transition-colors">
                About
              </a>
              {isAuthenticated ? (
                <>
                  <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-lg">
                    <User className="w-4 h-4 text-slate-600" />
                    <span className="font-medium text-slate-700">{userName}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/10 text-red-600 font-medium hover:bg-red-500/20 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <a href="/login" className="block px-4 py-2 rounded-lg text-slate-700 hover:bg-slate-100 font-medium transition-colors">
                    Login
                  </a>
                  <a href="/register" className="block px-4 py-2 bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-lg font-semibold text-center hover:shadow-lg transition-all">
                    Get Started
                  </a>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
