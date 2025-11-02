# Anything - Build and Deploy Mobile Apps with AI

## Overview
This is a full-stack web application built with React Router 7, Hono server, and PostgreSQL. The application enables building and deploying mobile apps using AI technology. It features a modern tech stack with server-side rendering, authentication, and a comprehensive brand/program management system.

## Project Architecture

### Technology Stack
- **Frontend Framework**: React 18 with React Router 7
- **Server Framework**: Hono (lightweight Node.js server)
- **Database**: PostgreSQL (Neon serverless)
- **Authentication**: Auth.js (formerly NextAuth.js) with Hono adapter
- **Styling**: Tailwind CSS 4 with Chakra UI components
- **Build Tool**: Vite 6
- **Runtime**: Bun (for development)
- **Package Manager**: Bun

### Project Structure
```
Web/
├── __create/           # Server setup and middleware
│   ├── index.ts       # Main Hono server configuration
│   ├── adapter.ts     # PostgreSQL auth adapter
│   └── route-builder.ts
├── plugins/           # Vite plugins for custom functionality
├── src/
│   ├── app/           # Application routes and pages
│   │   ├── api/       # API route handlers
│   │   │   ├── auth/  # Authentication endpoints
│   │   │   ├── brands/# Brand management APIs
│   │   │   └── programs/# Program management APIs
│   │   ├── layout.jsx # Root layout with React Query
│   │   └── page.jsx   # Home page
│   ├── __create/      # Shared utilities
│   └── utils/         # Client-side utilities
├── vite.config.ts     # Vite configuration
└── package.json       # Dependencies and scripts
```

## Database Schema

### Authentication Tables
- **auth_users**: User accounts (id, name, email, emailVerified, image)
- **auth_accounts**: Linked authentication providers (supports multiple auth methods)
- **auth_sessions**: User sessions with JWT tokens
- **auth_verification_token**: Email verification tokens

### Application Tables
- **brands**: Brand information (id, name, total_reward)
- **programs**: Loyalty/reward programs with detailed tracking
  - Program types, dates, targets, achievements
  - Reward calculations and status tracking
  - Time-based progress monitoring

## Environment Variables

### Required Secrets
- `DATABASE_URL`: PostgreSQL connection string (automatically configured by Replit)
- `AUTH_SECRET`: JWT signing secret for authentication

### Optional Configuration
- `CORS_ORIGINS`: Comma-separated list of allowed CORS origins
- `NEXT_PUBLIC_*`: Public environment variables accessible in the browser

## Development Setup

### Running Locally
The application runs on port 5000 with hot module reloading enabled:
```bash
cd Web && bun run dev
```

### Key Features Configured
1. **Server-Side Rendering (SSR)**: Enabled via React Router config
2. **Authentication**: Credentials-based signup/login with Argon2 password hashing
3. **Database Connection Pooling**: Using Neon's serverless PostgreSQL
4. **Hot Module Replacement**: Vite dev server with HMR
5. **Proxy-Friendly**: Configured with `allowedHosts: true` for Replit environment

## API Endpoints

### Authentication
- `POST /api/auth/signin/credentials-signin` - Sign in
- `POST /api/auth/signin/credentials-signup` - Sign up
- `GET /api/auth/session` - Get current session

### Brands
- `POST /api/brands/create` - Create new brand
- `GET /api/brands/list` - List all brands

### Programs
- `POST /api/programs/create` - Create new program
- `GET /api/programs/list` - List programs with filters
- `PATCH /api/programs/update` - Update program

## Deployment

The application is configured for deployment on Replit with:
- **Deployment Type**: Autoscale (stateless)
- **Build Command**: `cd Web && bun run build` - Creates production-optimized build
- **Run Command**: `cd Web && bun run start` - Runs the production server
- **Port**: 5000 (exposed for web preview)

### Production Build
The build process compiles and optimizes:
- React components with tree-shaking
- Server-side rendering bundles
- Tailwind CSS production build
- Type checking and validation

## Recent Changes
- **2024-11-02**: Initial Replit setup
  - Installed dependencies with Bun
  - Created PostgreSQL database schema
  - Configured AUTH_SECRET environment variable
  - Fixed plugin filename typo (addRenderlds.ts → addRenderIds.ts)
  - Updated vite.config.ts to bind to port 5000
  - Set up development workflow
  - Created deployment configuration

## Known Issues & Notes
- Authentication session warnings appear in browser console - these are non-blocking and occur when checking for existing sessions
- The home page intentionally returns null (blank page) - actual content is in other routes
- React hydration warnings may appear during development - these don't affect functionality

## Development Notes
- Uses custom Vite plugins for advanced features (render IDs, layouts, font loading)
- Babel transformation for styled-jsx support
- Custom auth adapter for PostgreSQL integration
- Middleware: CORS, request ID tracking, error handling
