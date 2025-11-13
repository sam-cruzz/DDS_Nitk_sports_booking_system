import axios from 'axios';

const API_BASE_URL = 'http://localhost:1110/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add token to headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        const userType = localStorage.getItem('userType') || 'user';
        
        const response = await axios.post(`${API_BASE_URL}/authentication/${userType}/refreshtoken`, {
          refreshToken: refreshToken,
        });

        const { accessToken } = response.data;
        localStorage.setItem('accessToken', accessToken);

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        localStorage.clear();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  registerAdmin: (data) => api.post('/authentication/users/register', { ...data, role: 'ADMIN' }),
  loginAdmin: (data) => api.post('/authentication/users/login', data),
  registerUser: (data) => api.post('/authentication/users/register', { ...data, role: 'USER' }),
  loginUser: (data) => api.post('/authentication/users/login', data),
  logout: (data) => api.post('/authentication/users/logout', data),
  refreshToken: (data) => api.post('/authentication/users/refresh-token', data),
};

// Product API
export const productAPI = {
  getAllProducts: (params) => api.get('/products', { params }),
  getProductById: (id) => api.get(`/products/${id}`),
  createProduct: (data) => api.post('/products', data),
  updateProduct: (id, data) => api.put(`/products/${id}`, data),
  deleteProduct: (id) => api.delete(`/products/${id}`),
};

// Booking API
export const bookingAPI = {
  getSlots: (productId, date) => api.get('/booking/slots', { params: { productId, date } }),
  createBooking: (data) => api.post('/booking/create', data),
};

// Payment API
export const paymentAPI = {
  processPayment: (data) => api.post('/payment/pay', data),
  getPayment: (id) => api.get(`/payment/${id}`),
  getPaymentByBooking: (bookingId) => api.get(`/payment/booking/${bookingId}`),
};

export default api;
