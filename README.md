# Anything
Build and deploy Mobile Apps with Anything AI

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
