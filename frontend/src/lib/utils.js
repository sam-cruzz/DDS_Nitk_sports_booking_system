import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(date) {
  return new Intl.DateTimeFormat('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date));
}

export function formatTime(time) {
  return new Intl.DateTimeFormat('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(`2000-01-01T${time}`));
}

export function generateId() {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export function getInitials(name) {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export function isSlotAvailable(slot, bookings) {
  return !bookings.some(
    booking =>
      booking.sportId === slot.sportId &&
      booking.date === slot.date &&
      booking.timeSlot === slot.time &&
      booking.status !== 'cancelled'
  );
}

export function getTimeSlots() {
  const slots = [];
  for (let hour = 6; hour <= 22; hour++) {
    slots.push({
      id: `slot-${hour}`,
      time: `${hour.toString().padStart(2, '0')}:00`,
      label: `${hour > 12 ? hour - 12 : hour}:00 ${hour >= 12 ? 'PM' : 'AM'}`,
    });
  }
  return slots;
}

export function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

export function validatePhone(phone) {
  const re = /^[6-9]\d{9}$/;
  return re.test(phone);
}

export function getStatusColor(status) {
  const colors = {
    pending: 'warning',
    confirmed: 'success',
    cancelled: 'danger',
    completed: 'info',
  };
  return colors[status] || 'info';
}

export function sortByDate(items, key = 'date', order = 'desc') {
  return [...items].sort((a, b) => {
    const dateA = new Date(a[key]);
    const dateB = new Date(b[key]);
    return order === 'desc' ? dateB - dateA : dateA - dateB;
  });
}

export function groupByDate(items, key = 'date') {
  return items.reduce((groups, item) => {
    const date = item[key];
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(item);
    return groups;
  }, {});
}

export function calculateTotalRevenue(bookings) {
  return bookings
    .filter(b => b.status === 'confirmed' || b.status === 'completed')
    .reduce((total, b) => total + (b.amount || 0), 0);
}

export function getUpcomingBookings(bookings) {
  const now = new Date();
  return bookings.filter(booking => {
    const bookingDate = new Date(`${booking.date}T${booking.timeSlot}`);
    return bookingDate > now && booking.status === 'confirmed';
  });
}

export function getPastBookings(bookings) {
  const now = new Date();
  return bookings.filter(booking => {
    const bookingDate = new Date(`${booking.date}T${booking.timeSlot}`);
    return bookingDate <= now;
  });
}
