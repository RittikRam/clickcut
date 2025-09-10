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

## Current Status
✅ Fully functional and ready for use
✅ Database connected and schema created
✅ All API endpoints operational
✅ Authentication system working
✅ Deployment configured