# Contributing to NITK Sports Booking Platform

First off, thank you for considering contributing to NITK Sports Booking Platform! 🎉

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Coding Guidelines](#coding-guidelines)
- [Commit Message Guidelines](#commit-message-guidelines)
- [Pull Request Process](#pull-request-process)

## 📜 Code of Conduct

This project and everyone participating in it is governed by respect, collaboration, and professionalism. By participating, you are expected to uphold this code.

## 🤝 How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates. When you create a bug report, include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples** (code snippets, screenshots)
- **Describe the behavior you observed** and what you expected
- **Include details about your environment** (OS, Docker version, etc.)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, include:

- **Use a clear and descriptive title**
- **Provide a step-by-step description** of the suggested enhancement
- **Explain why this enhancement would be useful**
- **List any alternative solutions** you've considered

### Pull Requests

- Fill in the required template
- Follow the coding guidelines
- Include screenshots for UI changes
- Update documentation as needed
- Add tests for new features

## 💻 Development Setup

### Prerequisites

- Docker & Docker Compose
- Java 21
- Node.js 18+ (for frontend development)
- Maven 3.9+

### Local Development

1. **Fork and clone the repository**
```bash
git clone https://github.com/YOUR_USERNAME/DDS_Nitk_sports_booking_system.git
cd DDS_Nitk_sports_booking_system
```

2. **Start the full stack**
```bash
docker-compose up -d
```

3. **For frontend development** (with hot reload):
```bash
cd frontend
npm install
npm run dev
```

4. **For backend development** (individual service):
```bash
cd [service-name]
mvn spring-boot:run
```

## 📝 Coding Guidelines

### Java (Backend)

- **Follow Spring Boot best practices**
- **Use Lombok** to reduce boilerplate code
- **Meaningful names** for classes, methods, and variables
- **JavaDoc** for public APIs
- **Handle exceptions** appropriately
- **Write unit tests** for business logic

Example:
```java
@Service
@RequiredArgsConstructor
public class BookingService {
    
    private final BookingRepository bookingRepository;
    
    /**
     * Creates a new booking for a facility
     * @param request the booking request details
     * @return the created booking
     * @throws BookingException if the time slot is not available
     */
    public BookingResponse createBooking(BookingRequest request) {
        // Implementation
    }
}
```

### React (Frontend)

- **Functional components** with hooks
- **Descriptive component names** in PascalCase
- **PropTypes or TypeScript** for prop validation
- **Extract reusable logic** into custom hooks
- **Follow Tailwind CSS** utility-first approach
- **Organize imports** (React → Third-party → Local)

Example:
```jsx
import React, { useState, useEffect } from 'react';
import { Calendar, Clock } from 'lucide-react';
import { api } from '../services/api';

const BookingCard = ({ facility, onBook }) => {
  const [selectedSlot, setSelectedSlot] = useState(null);
  
  // Component logic
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* Component JSX */}
    </div>
  );
};

export default BookingCard;
```

### CSS (Tailwind)

- **Use Tailwind utility classes** primarily
- **Create custom components** in `styles.css` only when necessary
- **Follow mobile-first** responsive design
- **Use consistent spacing** (4, 8, 12, 16, 24 pattern)

## 📌 Commit Message Guidelines

We follow **Conventional Commits** specification:

### Format
```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types
- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation changes
- **style**: Code style changes (formatting, missing semicolons, etc.)
- **refactor**: Code refactoring
- **test**: Adding or updating tests
- **chore**: Maintenance tasks

### Examples

```bash
feat(booking): add time slot validation

Implement validation to prevent double booking of time slots.
Add error handling for conflicting bookings.

Closes #123
```

```bash
fix(auth): resolve JWT token expiration issue

- Increase token expiration time to 24 hours
- Add refresh token rotation
- Update token validation logic

Fixes #456
```

```bash
docs(readme): update installation instructions

Add troubleshooting section for common Docker issues
```

## 🔀 Pull Request Process

1. **Update your fork** with the latest upstream changes:
```bash
git remote add upstream https://github.com/sam-cruzz/DDS_Nitk_sports_booking_system.git
git fetch upstream
git merge upstream/main
```

2. **Create a feature branch**:
```bash
git checkout -b feature/your-feature-name
```

3. **Make your changes** following the coding guidelines

4. **Test your changes**:
```bash
# Backend tests
mvn test

# Frontend tests
npm test

# Integration tests
docker-compose up -d
# Verify all services are running
```

5. **Commit your changes** with conventional commits:
```bash
git add .
git commit -m "feat(feature): add new feature"
```

6. **Push to your fork**:
```bash
git push origin feature/your-feature-name
```

7. **Open a Pull Request** with:
   - Clear title and description
   - Reference related issues
   - Screenshots (if UI changes)
   - Test results

### PR Review Process

- At least one maintainer approval required
- All tests must pass
- Code coverage should not decrease
- Documentation must be updated

## 🧪 Testing Guidelines

### Backend Testing

```java
@Test
void shouldCreateBookingSuccessfully() {
    // Given
    BookingRequest request = BookingRequest.builder()
        .facilityId(1L)
        .date(LocalDate.now())
        .timeSlot("06:00 PM")
        .build();
    
    // When
    BookingResponse response = bookingService.createBooking(request);
    
    // Then
    assertThat(response).isNotNull();
    assertThat(response.getStatus()).isEqualTo(BookingStatus.CONFIRMED);
}
```

### Frontend Testing

```jsx
import { render, screen, fireEvent } from '@testing-library/react';
import BookingCard from './BookingCard';

test('should display facility name', () => {
  const facility = { id: 1, name: 'Football Field' };
  render(<BookingCard facility={facility} />);
  
  expect(screen.getByText('Football Field')).toBeInTheDocument();
});
```

## 📚 Additional Resources

- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Docker Documentation](https://docs.docker.com)
- [Conventional Commits](https://www.conventionalcommits.org)

## ❓ Questions?

Feel free to:
- Open an issue with the `question` label
- Join our discussions
- Contact the maintainers

---

Thank you for contributing! 🎉
