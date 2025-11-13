@echo off
echo ========================================
echo Starting Spring Boot Microservices
echo ========================================
echo.

REM Check if Docker is running
docker info >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Docker is not running. Please start Docker first.
    pause
    exit /b 1
)

echo [OK] Docker is running
echo.

REM Stop existing containers
echo Stopping existing containers...
docker-compose down
echo.

REM Build and start all services
echo Building and starting all services...
echo This may take a few minutes on first run...
echo.
docker-compose up --build -d

REM Wait for services to start
echo.
echo Waiting for services to start...
timeout /t 30 /nobreak >nul

REM Check service status
echo.
echo Service Status:
docker-compose ps

echo.
echo ========================================
echo Deployment Complete!
echo ========================================
echo.
echo Access URLs:
echo   Frontend:       http://localhost
echo   API Gateway:    http://localhost:1110
echo   Eureka Server:  http://localhost:8761
echo.
echo Next Steps:
echo   1. Open http://localhost in your browser
echo   2. Register an admin user
echo   3. Register a regular user
echo   4. Admin: Create products
echo   5. User: Book and pay for products
echo.
echo View logs:
echo   All services:     docker-compose logs -f
echo   Specific service: docker-compose logs -f [service-name]
echo.
echo Stop services:
echo   docker-compose down
echo.
pause
