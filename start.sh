#!/bin/bash

echo "🚀 Starting Spring Boot Microservices Application..."
echo ""

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker first."
    exit 1
fi

echo "✅ Docker is running"
echo ""

# Check if docker-compose is available
if ! command -v docker-compose &> /dev/null; then
    echo "❌ docker-compose is not installed"
    exit 1
fi

echo "✅ docker-compose is available"
echo ""

# Stop any existing containers
echo "🛑 Stopping existing containers..."
docker-compose down

# Build and start all services
echo ""
echo "🏗️  Building and starting all services..."
echo "   This may take a few minutes on first run..."
echo ""

docker-compose up --build -d

# Wait for services to start
echo ""
echo "⏳ Waiting for services to start..."
sleep 30

# Check service status
echo ""
echo "📊 Service Status:"
docker-compose ps

echo ""
echo "✅ Deployment Complete!"
echo ""
echo "🌐 Access URLs:"
echo "   Frontend:       http://localhost"
echo "   API Gateway:    http://localhost:1110"
echo "   Eureka Server:  http://localhost:8761"
echo ""
echo "📝 Next Steps:"
echo "   1. Open http://localhost in your browser"
echo "   2. Register an admin user"
echo "   3. Register a regular user"
echo "   4. Admin: Create products"
echo "   5. User: Book and pay for products"
echo ""
echo "📋 View logs:"
echo "   All services:     docker-compose logs -f"
echo "   Specific service: docker-compose logs -f [service-name]"
echo ""
echo "🛑 Stop services:"
echo "   docker-compose down"
echo ""
