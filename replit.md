# ClickCut URL Shortener - Replit Setup

## Overview
This is a Spring Boot URL shortener application that has been successfully configured to run in the Replit environment. The application provides REST API endpoints for creating and managing shortened URLs with user authentication.

## Recent Changes
- **September 10, 2025**: Imported from GitHub and configured for Replit environment
- Updated Java version from 21 to 19 to match available runtime
- Fixed Maven POM file (removed duplicate dependencies)
- Configured PostgreSQL database connection using Replit environment variables
- Set up workflow to run on port 8080
- Configured deployment for production VM

## Project Architecture
- **Language**: Java 19 with Spring Boot 3.5.4
- **Database**: PostgreSQL (Replit-provided)
- **Authentication**: JWT-based security
- **Build Tool**: Maven
- **Server**: Embedded Tomcat running on port 8080

## Key Components
- **Controllers**: REST API endpoints for URL management and authentication
- **Security**: JWT authentication with Spring Security
- **Database**: JPA/Hibernate with PostgreSQL
- **Services**: Business logic for URL shortening and user management

## API Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/urls/shorten` - Create short URL (authenticated)
- `GET /api/urls/myurls` - Get user's URLs (authenticated)
- `GET /{shortUrl}` - Redirect to original URL
- `GET /api/urls/analytics/{shorturl}` - Get analytics (authenticated)

## Database Schema
- **users**: User accounts with authentication
- **url_mapping**: URL mappings with click tracking
- **click_event**: Individual click events for analytics

## Environment Configuration
- Database connection configured via Replit environment variables
- Server runs on port 8080 with host 0.0.0.0
- JWT secret configured in application.properties
- Hibernate auto-creates/updates database schema

## Deployment
- Configured for VM deployment (stateful)
- Production command: `./mvnw spring-boot:run`
- No build step required (compiled at runtime)

## Frontend Application
- **Framework**: React 18 + Vite 5
- **Styling**: Tailwind CSS with custom components
- **Routing**: React Router with protected routes
- **Authentication**: JWT-based with context management
- **UI Components**: Lucide React icons, Headless UI
- **Features**: Responsive design, modern login/register forms

## Frontend Features
- **Authentication**: Beautiful login and register forms with validation
- **Dashboard**: URL creation and management interface
- **Analytics**: Comprehensive URL analytics with charts and metrics
- **Admin Panel**: User and system management (admin-only)
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Real-time Updates**: Live click tracking and statistics

## Technical Architecture
- **Frontend**: React + Vite running on port 5000
- **Backend**: Spring Boot API running on port 8080
- **Database**: PostgreSQL with auto-generated schema
- **Authentication**: JWT tokens with automatic refresh
- **Communication**: Axios-based API service layer

## Current Status
✅ Fully functional URL shortener with modern frontend
✅ Backend API with JWT authentication
✅ Database connected and schema created
✅ Beautiful responsive React frontend
✅ Admin panel for user management
✅ Comprehensive analytics dashboard
✅ Deployment configured for production
✅ Both frontend and backend workflows running