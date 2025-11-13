# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-11-13

### Added

#### Frontend
- 🎨 Complete React 18 frontend with Vite and Tailwind CSS
- 🏠 Modern Home page with hero section and features
- 🔐 Login and Register pages with form validation
- 📊 Dashboard for browsing sports facilities
- 📅 Booking page with date and time slot selection
- 💳 Payment page with card validation
- 📋 My Bookings page with status filtering
- 🎽 Sports Gear Rental page with 22+ equipment items
  - Shopping cart functionality
  - Hourly rental (1-8 hours)
  - Category filtering
  - Dynamic price calculation
- 👨‍💼 Comprehensive Admin Panel with 4 tabs:
  - Overview: Real-time statistics and recent bookings
  - All Bookings: Search, filter, and manage bookings
  - User Management: User cards with activity tracking
  - Analytics: Popular facilities, peak hours, revenue trends
- 🔐 Hardcoded admin login (admin@nitk.edu.in / admin)
- 👁️ Password visibility toggle
- 🔍 Search and filter functionality across all pages
- 📱 Fully responsive design
- 🏆 Consistent trophy emoji logo across all pages

#### Backend Services
- 🔐 Auth Service (Port 1112)
  - JWT token generation and validation
  - User and admin authentication
  - Token refresh mechanism
  - Role-based access control
- 👥 User Service (Port 1113)
  - User profile management
  - User CRUD operations
- 🏟️ Product Service (Port 1111)
  - Sports facility management
  - Search and filter facilities
- 📅 Booking Service (Port 1116)
  - Create and manage bookings
  - Time slot availability checking
  - Booking cancellation
- 💳 Payment Service (Port 1115)
  - Payment processing
  - Payment validation
- 📧 Notification Service (Port 1117)
  - Email notifications
  - SMS notifications (future)

#### Infrastructure
- 🌉 API Gateway (Port 1110)
  - Centralized routing
  - CORS configuration
  - JWT validation
- 🔍 Eureka Server (Port 8761)
  - Service discovery
  - Health monitoring
- 🐳 Docker Compose orchestration
  - One-command startup (start.bat / start.sh)
  - MySQL 8.0.33 database
  - Nginx web server for frontend
- 📮 Postman collections for API testing
- 📝 Database initialization scripts

### Enhanced
- 📖 Comprehensive README with:
  - Feature showcase
  - Architecture diagrams
  - Quick start guide
  - API documentation
  - Troubleshooting guide
  - Project structure overview
- 🎨 Modern UI/UX with smooth animations
- 🔒 Secure JWT authentication
- 📊 Real-time data updates
- 🎯 Improved error handling

### Security
- 🔐 JWT-based authentication
- 🔑 BCrypt password hashing
- 🛡️ Role-based access control (Admin/User)
- 🌐 CORS configuration
- 🚫 SQL injection prevention with JPA

### Documentation
- 📖 Enhanced README.md
- 📄 LICENSE (MIT)
- 🤝 CONTRIBUTING.md
- 📋 CHANGELOG.md
- 📮 Postman API collections
- 💡 Code comments and JavaDoc

### Fixed
- 🐛 Admin email validation (accepts both "admin" and "admin@nitk.edu.in")
- 🐛 Dynamic input type for admin login
- 🐛 CORS issues with frontend
- 🐛 Token refresh mechanism
- 🐛 Booking time slot conflicts

### Performance
- ⚡ Optimized Docker images
- ⚡ Nginx caching for frontend
- ⚡ Database indexing
- ⚡ Lazy loading for components

## [0.1.0] - 2024 (Base)

### Initial Release
- Basic Spring Boot microservices architecture
- JWT authentication framework
- Product management
- User management
- Docker containerization

---

## Version History

| Version | Date | Description |
|---------|------|-------------|
| 1.0.0 | 2025-11-13 | Complete NITK Sports Platform release |
| 0.1.0 | 2024 | Initial microservices base |

---

## Upgrade Guide

### From 0.1.0 to 1.0.0

1. **Database Changes**
   - New tables: `bookings`, `payments`, `notifications`
   - Updated schema with `init.sql`

2. **New Services**
   - Add Booking Service container
   - Add Payment Service container
   - Add Notification Service container
   - Add Frontend container

3. **Configuration Updates**
   - Update CORS configuration in API Gateway
   - Add new service routes in API Gateway
   - Update Eureka discovery settings

4. **Frontend Integration**
   - Deploy React frontend with Nginx
   - Configure environment variables
   - Update API endpoints

### Migration Steps

```bash
# Backup existing data
docker-compose exec database mysqldump -uroot -proot springbootmicroservicesdb > backup.sql

# Pull latest changes
git pull origin main

# Rebuild containers
docker-compose down
docker-compose up -d --build

# Verify all services
docker-compose ps
```

---

## Roadmap

See [README.md](README.md#-roadmap) for upcoming features.

---

## Support

For questions or issues, please:
- Check [existing issues](https://github.com/sam-cruzz/DDS_Nitk_sports_booking_system/issues)
- Open a [new issue](https://github.com/sam-cruzz/DDS_Nitk_sports_booking_system/issues/new)
- Contact: support@nitksports.edu.in
