# 🏆 NITK Sports Booking Platform

<p align="center">
  <img src="https://img.shields.io/badge/Spring%20Boot-3.x-6DB33F?logo=springboot&logoColor=white" alt="Spring Boot" />
  <img src="https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/Docker-Compose-2496ED?logo=docker&logoColor=white" alt="Docker" />
  <img src="https://img.shields.io/badge/MySQL-8.0-4479A1?logo=mysql&logoColor=white" alt="MySQL" />
  <img src="https://img.shields.io/badge/JWT-Authentication-000000?logo=jsonwebtokens&logoColor=white" alt="JWT" />
</p>

<p align="center">
  A modern, full-stack sports facility booking platform built with Spring Boot microservices architecture and React frontend. Features secure JWT authentication, real-time availability checking, sports gear rental, and comprehensive admin management.
</p>

<p align="center">
  <strong>📄 <a href="221cs246_DDS_Final_Reports.pdf">View Project Report (PDF)</a></strong>
</p>

---

## 🌟 Key Features

### 👥 For Users
- **🏟️ Facility Booking**: Browse and book sports facilities (Football, Basketball, Cricket, Badminton, Tennis, etc.)
- **⏰ Real-time Availability**: Live slot checking with visual time grid (6 AM - 9 PM)
- **🎽 Gear Rental**: Rent sports equipment by the hour (1-8 hours) with shopping cart
- **📱 Modern UI**: Clean, responsive interface with smooth animations and Tailwind CSS
- **💳 Secure Payments**: Integrated payment processing with card validation
- **📋 Booking Management**: View, cancel, and manage all your bookings
- **🔍 Search & Filter**: Find facilities by name, location, or category

### 👨‍💼 For Admins
- **📊 Dashboard**: Real-time platform statistics and analytics
- **👥 User Management**: View and manage all registered users
- **📅 Booking Management**: Complete booking oversight with search and filter
- **🏢 Facility Management**: Add, edit, and delete sports facilities
- **📈 Analytics**: Revenue trends, popular facilities, peak hours analysis
- **🚀 Quick Access**: Hardcoded login for testing (`admin@nitk.edu.in` / `admin`)

### 🔧 Technical Highlights
- **Microservices Architecture**: 10 independent, scalable services
- **Service Discovery**: Netflix Eureka for dynamic service registration
- **API Gateway**: Centralized routing with Spring Cloud Gateway
- **JWT Security**: Token-based authentication with refresh tokens
- **Docker Deployment**: Complete containerization with one-command startup
- **RESTful APIs**: Well-documented endpoints with Postman collections

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    API Gateway (Port 1110)                   │
│              Spring Cloud Gateway + CORS + JWT               │
└────────────┬────────────────────────────────────────────────┘
             │
    ┌────────┴────────┐
    │  Eureka Server  │ (Port 8761)
    │ Service Registry│ - Service Discovery
    └────────┬────────┘
             │
    ┌────────┴──────────────────────────────────────────┐
    │                                                    │
┌───▼────────┐  ┌───────────┐  ┌──────────┐  ┌────────▼────┐
│   Auth     │  │   User    │  │ Product  │  │  Booking    │
│  Service   │  │  Service  │  │ Service  │  │  Service    │
│ (Port 1112)│  │(Port 1113)│  │(Port 1111)│ │(Port 1116)  │
│            │  │           │  │          │  │             │
│ - Login    │  │- Profile  │  │- CRUD    │  │- Create     │
│ - Register │  │- Update   │  │- Search  │  │- Cancel     │
│ - JWT      │  │- Roles    │  │- Filter  │  │- View       │
└────────────┘  └───────────┘  └──────────┘  └──────┬──────┘
                                                     │
                                              ┌──────▼──────┐
                                              │   Payment   │
                                              │   Service   │
                                              │ (Port 1115) │
                                              │             │
                                              │- Process    │
                                              │- Validate   │
                                              └──────┬──────┘
                                                     │
                                              ┌──────▼──────┐
                                              │Notification │
                                              │  Service    │
                                              │ (Port 1117) │
                                              │             │
                                              │- Email      │
                                              │- SMS        │
                                              └─────────────┘

         ┌──────────────────────────────────────────────┐
         │        MySQL Database (Port 3307)            │
         │   - Users  - Products  - Bookings            │
         │   - Payments  - Tokens  - Notifications      │
         └──────────────────────────────────────────────┘

         ┌──────────────────────────────────────────────┐
         │         React Frontend (Port 8080)           │
         │    Vite + Tailwind CSS + Nginx + Axios       │
         │                                              │
         │  Pages: Login, Register, Dashboard, Booking, │
         │  Payment, MyBookings, GearRental, AdminPanel │
         └──────────────────────────────────────────────┘
```

---

## 🚀 Quick Start

### Prerequisites
- **Docker**: Version 20.x or higher
- **Docker Compose**: Version 2.x or higher
- **Ports Available**: 1110-1117, 3307, 8080, 8761

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/sam-cruzz/DDS_Nitk_sports_booking_system.git
cd DDS_Nitk_sports_booking_system
```

2. **Start the application**

**Windows:**
```bash
start.bat
```

**Linux/Mac:**
```bash
chmod +x start.sh
./start.sh
```

**Or use Docker Compose directly:**
```bash
docker-compose up -d
```

3. **Wait for services to initialize** (2-3 minutes)

4. **Access the application**
- **Frontend**: http://localhost:8080
- **API Gateway**: http://localhost:1110
- **Eureka Dashboard**: http://localhost:8761

### 🔑 Login Credentials

**Admin Access:**
- Email: `admin@nitk.edu.in`
- Password: `admin`

**Test User:**
- Email: `sammmmm@gmail.com`
- Password: `@1234567`

---

## 📁 Project Structure

```
springbootmicroserviceswithsecurity/
├── 🌐 frontend/                 # React + Vite + Tailwind CSS
│   ├── src/
│   │   ├── pages/              # Page components
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Booking.jsx
│   │   │   ├── Payment.jsx
│   │   │   ├── MyBookings.jsx
│   │   │   ├── GearRental.jsx
│   │   │   └── AdminPanel.jsx
│   │   ├── components/         # Reusable components
│   │   ├── services/           # API services
│   │   └── styles.css
│   ├── Dockerfile
│   ├── nginx.conf
│   └── package.json
│
├── 🔐 authservice/              # JWT Authentication
│   ├── src/main/java/...
│   ├── Dockerfile
│   └── pom.xml
│
├── 👥 userservice/              # User Management
├── 🏟️ productservice/           # Facility Management
├── 📅 bookingservice/           # Booking Operations
├── 💳 paymentservice/           # Payment Processing
├── 📧 notificationservice/      # Notifications
│
├── 🌉 apigateway/               # API Gateway + CORS
├── 🔍 eurekaserver/             # Service Discovery
│
├── 📮 postman_collection/       # API Testing
│   ├── nitk.postman_collection.json
│   └── nitk.postman_environment.json
│
├── 🐳 docker-compose.yml        # Orchestration
├── 📝 init.sql                  # Database Init
├── 🚀 start.bat / start.sh      # Startup Scripts
└── 📖 README.md
```

---

## 🛠️ Tech Stack

| Category | Technologies |
|----------|-------------|
| **Backend** | Spring Boot 3.x, Java 21, Spring Cloud |
| **Frontend** | React 18, Vite, Tailwind CSS 3, Axios |
| **Security** | Spring Security, JWT, BCrypt |
| **Database** | MySQL 8.0.33 |
| **Service Discovery** | Netflix Eureka |
| **API Gateway** | Spring Cloud Gateway |
| **Build Tools** | Maven 3.9.x |
| **Containerization** | Docker, Docker Compose |
| **Icons** | Lucide React |
| **Web Server** | Nginx Alpine |

---

## 📚 API Documentation

### Base URL
```
http://localhost:1110/api/v1
```

### Explore REST APIs

### Explore REST APIs

#### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/authentication/admin/register` | Admin Registration | ❌ |
| POST | `/authentication/admin/login` | Admin Login | ❌ |
| POST | `/authentication/admin/refreshtoken` | Refresh Admin Token | ✅ |
| POST | `/authentication/admin/logout` | Admin Logout | ✅ |
| POST | `/authentication/user/register` | User Registration | ❌ |
| POST | `/authentication/user/login` | User Login | ❌ |
| POST | `/authentication/user/refreshtoken` | Refresh User Token | ✅ |
| POST | `/authentication/user/logout` | User Logout | ✅ |

#### Product (Facility) Endpoints

| Method | Endpoint | Description | Role Required |
|--------|----------|-------------|---------------|
| POST | `/products` | Create Facility | Admin |
| GET | `/products` | Get All Facilities | User/Admin |
| GET | `/products/{id}` | Get Facility by ID | User/Admin |
| PUT | `/products/{id}` | Update Facility | Admin |
| DELETE | `/products/{id}` | Delete Facility | Admin |

#### Booking Endpoints

| Method | Endpoint | Description | Role Required |
|--------|----------|-------------|---------------|
| POST | `/bookings` | Create Booking | User/Admin |
| GET | `/bookings` | Get All Bookings | Admin |
| GET | `/bookings/user/{userId}` | Get User Bookings | User/Admin |
| PUT | `/bookings/{id}` | Update Booking | User/Admin |
| DELETE | `/bookings/{id}` | Cancel Booking | User/Admin |

#### Payment Endpoints

| Method | Endpoint | Description | Role Required |
|--------|----------|-------------|---------------|
| POST | `/payments` | Process Payment | User/Admin |
| GET | `/payments/{id}` | Get Payment Details | User/Admin |
| GET | `/payments/booking/{bookingId}` | Get Payment by Booking | User/Admin |

### Example Requests

**User Login:**
```bash
curl -X POST http://localhost:1110/api/v1/authentication/user/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
```

**Create Booking:**
```bash
curl -X POST http://localhost:1110/api/v1/bookings \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {your_jwt_token}" \
  -d '{
    "productId": 1,
    "date": "2025-11-13",
    "timeSlot": "06:00 PM",
    "userId": 1
  }'
```

**Get All Facilities:**
```bash
curl -X GET http://localhost:1110/api/v1/products \
  -H "Authorization: Bearer {your_jwt_token}"
```

📮 **For complete API documentation**, import the Postman collections from `postman_collection/` folder.

---

## 🎨 Features Showcase

### 🏠 Home Page
- Hero section with call-to-action
- Feature highlights
- Responsive navigation
- Modern gradient design

### 📊 Admin Panel (4 Tabs)

**1. Overview Tab**
- Real-time statistics cards
- Today's users, bookings, revenue
- Facility usage percentage
- Recent bookings table with status badges

**2. All Bookings Tab**
- Search by user or facility name
- Filter by status (Confirmed, Pending, Cancelled)
- View complete booking details
- Cancel/manage bookings
- Pagination support

**3. User Management Tab**
- User profile cards with avatars
- Total bookings and spending per user
- Account status indicators
- Search by name or email
- User activity tracking

**4. Analytics Tab**
- Popular facilities bar chart
- Peak booking hours visualization
- 7-day revenue trend graph
- Data-driven insights

### 🏟️ Facility Booking Flow
1. Browse available facilities with search/filter
2. Select date (next 7 days)
3. Choose time slot (16 slots: 6 AM - 9 PM)
4. Review booking summary
5. Enter payment details
6. Receive confirmation

### 🎽 Sports Gear Rental
- **22+ Equipment Items** across 7 categories:
  - Football (Balls, Cleats, Shin Guards, Jerseys)
  - Basketball (Balls, Shoes, Jerseys)
  - Badminton (Rackets, Shuttlecocks, Shoes)
  - Cricket (Bats, Balls, Helmets, Pads)
  - Tennis (Rackets, Balls, Shoes)
  - Table Tennis (Paddles, Balls)
  - Volleyball (Balls, Knee Pads)
- Shopping cart with quantity management
- Flexible rental duration (1-8 hours)
- Dynamic price calculation
- Category filtering

### 📱 My Bookings
- View all past and upcoming bookings
- Status-based filtering
- Search by facility name
- Cancel confirmed bookings
- Rebook from history
- Color-coded status badges

---

## ⚙️ Configuration

### Environment Variables

You can customize the application by creating a `.env` file:

### Environment Variables

You can customize the application by creating a `.env` file:

```env
# Database Configuration
MYSQL_ROOT_PASSWORD=root
MYSQL_DATABASE=springbootmicroservicesdb
MYSQL_USER=springbootuser
MYSQL_PASSWORD=springbootpassword

# JWT Configuration
JWT_SECRET=your-secret-key-here
JWT_EXPIRATION=86400000

# Service Ports
EUREKA_PORT=8761
API_GATEWAY_PORT=1110
AUTH_SERVICE_PORT=1112
USER_SERVICE_PORT=1113
PRODUCT_SERVICE_PORT=1111
BOOKING_SERVICE_PORT=1116
PAYMENT_SERVICE_PORT=1115
NOTIFICATION_SERVICE_PORT=1117
FRONTEND_PORT=8080
```

### Database Configuration

- **Host**: localhost
- **Port**: 3307
- **Database**: springbootmicroservicesdb
- **Username**: root
- **Password**: root

Database is automatically initialized using `init.sql` on first startup.

### CORS Configuration

CORS is pre-configured to allow requests from:
- `http://localhost:8080` (Production Frontend)
- `http://localhost:3000` (Development)

To modify CORS settings, edit:
```java
apigateway/src/main/java/com/springbootmicroservices/apigateway/config/CorsConfig.java
```

---

## 🔧 Troubleshooting

### Services Not Starting

```bash
# Check service status
docker-compose ps

# View logs for specific service
docker-compose logs -f [service-name]
# Example: docker-compose logs -f frontend

# Restart all services
docker-compose restart

# Rebuild and restart
docker-compose up -d --build
```

### Database Connection Issues

```bash
# Check MySQL container
docker-compose logs -f database

# Verify database is ready
docker exec -it springbootmicroserviceswithsecurity-database-1 mysql -uroot -proot -e "SHOW DATABASES;"
```

### Port Already in Use

```bash
# Linux/Mac - Find process using port
lsof -i :8080

# Windows - Find process using port
netstat -ano | findstr :8080

# Kill process (replace PID)
kill -9 <PID>          # Linux/Mac
taskkill /PID <PID> /F  # Windows
```

### Frontend Not Loading

```bash
# Rebuild frontend container
docker-compose up -d --build frontend

# Check frontend logs
docker-compose logs -f frontend

# Clear browser cache and reload
```

### Complete Fresh Start

```bash
# Stop all containers
docker-compose down

# Remove all volumes (⚠️ Deletes all data)
docker-compose down -v

# Remove images
docker-compose down --rmi all

# Start fresh
docker-compose up -d --build
```

---

## 🧪 Testing

### Using Postman

1. Import collections from `postman_collection/`:
   - `nitk.postman_collection.json` - All API endpoints
   - `nitk.postman_environment.json` - Environment variables

2. Set environment to `NITK Sports`

3. Test flow:
   - Register user → Login → Get token
   - Browse facilities → Create booking → Process payment

### Manual Testing Checklist

- [ ] User registration with email validation
- [ ] User login with JWT token generation
- [ ] Admin login with hardcoded credentials
- [ ] Browse facilities with search
- [ ] Create booking with time slot selection
- [ ] Payment processing
- [ ] View bookings in "My Bookings"
- [ ] Cancel booking
- [ ] Rent sports gear with cart
- [ ] Admin panel - all 4 tabs functional
- [ ] Responsive design on mobile/tablet

---

## 📚 Documentation

### Project Report
📄 **[Download Complete Project Report (PDF)](221cs246_DDS_Final_Reports.pdf)**

The comprehensive project report includes:
- System architecture and design
- Technology stack justification
- Implementation details
- Database schema and relationships
- API documentation
- Testing strategies
- Security considerations
- Performance analysis
- Future enhancements

### Additional Documentation
- 📖 [API Documentation](#-api-documentation) - REST endpoints and examples
- 🤝 [Contributing Guide](CONTRIBUTING.md) - How to contribute
- 📋 [Changelog](CHANGELOG.md) - Version history and updates
- 📮 [Postman Collections](postman_collection/) - API testing collections

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. Commit your changes
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. Push to the branch
   ```bash
   git push origin feature/AmazingFeature
   ```
5. Open a Pull Request

### Code Style Guidelines

- **Java**: Follow Spring Boot best practices, use Lombok
- **React**: Functional components with hooks, ESLint rules
- **CSS**: Tailwind CSS utility classes
- **Commits**: Use conventional commit messages

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👥 Team

- **Developers**: 
  - [sam-cruzz](https://github.com/sam-cruzz) - Shashank Prabhakar
  - [Riser59](https://github.com/Riser59)
- **Course**: Distributed Database Systems (DDS) - 221CS246
- **Institution**: NITK Surathkal

---

## 🙏 Acknowledgments

- **NITK Surathkal** for project requirements and guidance
- **Course**: Distributed Database Systems (DDS) - 221CS246
- Spring Boot community for excellent documentation
- React and Tailwind CSS teams for amazing tools
- Docker for simplifying deployment
- Open source community for inspiration

### 📚 References

For detailed technical documentation, implementation details, and system design, please refer to:

**📄 [Project Report - 221cs246_DDS_Final_Reports.pdf](221cs246_DDS_Final_Reports.pdf)**

The report covers:
- Complete system architecture with microservices design
- Database design and distributed database concepts
- JWT authentication and security implementation
- Frontend-backend integration
- Docker containerization strategy
- Testing and validation approach
- Performance analysis and optimization
- Future scope and enhancements

---

## 📞 Support

For support, please:
- 📧 Email: support@nitksports.edu.in
- 🐛 Open an issue in this repository
- 💬 Join our discussions

---

## 🗺️ Roadmap

### Upcoming Features
- [ ] Mobile app (React Native)
- [ ] Real-time notifications with WebSocket
- [ ] Social login (Google, Facebook)
- [ ] QR code booking confirmation
- [ ] AI-powered facility recommendations
- [ ] Multi-language support
- [ ] Advanced analytics dashboard
- [ ] Integration with university calendar
- [ ] Recurring bookings
- [ ] Waitlist functionality

---

## 📊 Project Statistics

- **Total Services**: 10 microservices
- **Frontend Pages**: 8 (Login, Register, Home, Dashboard, Booking, Payment, MyBookings, GearRental, AdminPanel)
- **API Endpoints**: 25+
- **Lines of Code**: 10,000+
- **Docker Containers**: 11 (Services + Database + Frontend)

---

<p align="center">
  <b>⭐ Star this repository if you find it helpful!</b>
</p>

<p align="center">
  Made with ❤️ for NITK Community
</p>

<p align="center">
  <a href="#-nitk-sports-booking-platform">Back to Top ⬆️</a>
</p>