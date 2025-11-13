import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Booking from './pages/Booking';
import Payment from './pages/Payment';
import MyBookings from './pages/MyBookings';
import GearRental from './pages/GearRental';
import AdminPanel from './pages/AdminPanel';

// Simple router based on pathname
const App = () => {
  const path = window.location.pathname;

  // Protected route check
  const isAuthenticated = !!localStorage.getItem('accessToken');
  
  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated) {
      window.location.href = '/login';
      return null;
    }
    return children;
  };

  const renderPage = () => {
    switch (path) {
      case '/':
        return <Home />;
      case '/login':
        return <Login />;
      case '/register':
        return <Register />;
      case '/dashboard':
        return (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        );
      case '/booking':
        return (
          <ProtectedRoute>
            <Booking />
          </ProtectedRoute>
        );
      case '/payment':
        return (
          <ProtectedRoute>
            <Payment />
          </ProtectedRoute>
        );
      case '/my-bookings':
        return (
          <ProtectedRoute>
            <MyBookings />
          </ProtectedRoute>
        );
      case '/gear-rental':
        return (
          <ProtectedRoute>
            <GearRental />
          </ProtectedRoute>
        );
      case '/admin':
        return (
          <ProtectedRoute>
            <AdminPanel />
          </ProtectedRoute>
        );
      default:
        return (
          <div className="container">
            <h1>404 - Page Not Found</h1>
            <p><a href="/">Go to Home</a></p>
          </div>
        );
    }
  };

  // Don't show Navbar on pages that have their own navigation
  const showNavbar = !['/login', '/register', '/', '/dashboard', '/booking', '/payment', '/my-bookings', '/gear-rental', '/admin'].includes(path);

  return (
    <>
      {showNavbar && <Navbar />}
      {renderPage()}
    </>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
