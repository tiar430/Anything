# Contributing to Anything

Thank you for your interest in contributing to Anything! This document provides guidelines and instructions for contributing to the project.

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) (latest version)
- [PostgreSQL](https://www.postgresql.org/) (15 or higher)
- Node.js 20+ (for compatibility)

### Initial Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/anything.git
   cd anything
   ```

2. **Run the setup script**
   
   Using bash:
   ```bash
   chmod +x setup.sh
   ./setup.sh
   ```
   
   Or using Node.js:
   ```bash
   node setup.js
   ```

3. **Configure environment variables**
   
   Edit `.env` file and update:
   - `DATABASE_URL`: Your PostgreSQL connection string
   - Other optional variables as needed

4. **Set up the database**
   
   Run the SQL commands from `replit.md` to create the required tables:
   - `auth_users`
   - `auth_accounts`
   - `auth_sessions`
   - `auth_verification_token`
   - `brands`
   - `programs`

5. **Start development server**
   ```bash
   cd Web
   bun run dev
   ```
   
   The app will be available at `http://localhost:5000`

## Development Workflow

### Project Structure

```
Web/
├── __create/         # Server-side setup and middleware
├── plugins/          # Vite plugins
├── src/
│   ├── app/          # Application routes and pages
│   │   ├── api/      # API endpoints
│   │   └── ...       # Page components
│   ├── __create/     # Shared utilities
│   └── utils/        # Client-side utilities
```

### Available Scripts

From the `Web` directory:

- `bun run dev` - Start development server with HMR
- `bun run build` - Build for production
- `bun run start` - Run production server
- `bun run typecheck` - Run TypeScript type checking

### Coding Standards

1. **TypeScript**: Use TypeScript for type safety
2. **Formatting**: Code is auto-formatted (follow existing patterns)
3. **Naming Conventions**:
   - Files: kebab-case for components, camelCase for utilities
   - Components: PascalCase
   - Functions/Variables: camelCase
   - Constants: UPPER_SNAKE_CASE

4. **Component Structure**:
   ```jsx
   // Imports
   import { ... } from '...';
   
   // Types/Interfaces
   interface Props {
     // ...
   }
   
   // Component
   export default function ComponentName({ props }: Props) {
     // Logic
     
     // Render
     return (
       // JSX
     );
   }
   ```

### Database Changes

1. Never modify primary key types in existing tables
2. Always test migrations locally before committing
3. Document schema changes in commit messages

### API Development

1. API routes go in `src/app/api/`
2. Follow RESTful conventions
3. Use proper HTTP status codes
4. Handle errors gracefully
5. Validate input data

Example API route:
```javascript
import sql from "@/app/api/utils/sql";

export async function POST(request) {
  try {
    const { field } = await request.json();
    
    // Validation
    if (!field) {
      return Response.json(
        { error: "Field is required" },
        { status: 400 }
      );
    }
    
    // Database operation
    const result = await sql`
      INSERT INTO table (field) 
      VALUES (${field}) 
      RETURNING *
    `;
    
    return Response.json(result[0]);
  } catch (error) {
    console.error("Error:", error);
    return Response.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
```

## Pull Request Process

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Write clean, documented code
   - Add tests if applicable
   - Update documentation

3. **Test your changes**
   ```bash
   bun run typecheck
   bun run build
   ```

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: description of your feature"
   ```
   
   Follow [Conventional Commits](https://www.conventionalcommits.org/):
   - `feat:` - New feature
   - `fix:` - Bug fix
   - `docs:` - Documentation changes
   - `style:` - Code style changes (formatting, etc.)
   - `refactor:` - Code refactoring
   - `test:` - Adding or updating tests
   - `chore:` - Maintenance tasks

5. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request**
   - Provide a clear description of changes
   - Reference any related issues
   - Wait for code review

## Testing

- Ensure your code doesn't break existing functionality
- Test on different screen sizes for UI changes
- Verify database operations don't corrupt data
- Check authentication flows still work

## Getting Help

- Check the [README.md](README.md) for project overview
- Read [replit.md](replit.md) for technical details
- Open an issue for bugs or feature requests
- Ask questions in pull request discussions

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on the code, not the person
- Help others learn and grow

## License

By contributing, you agree that your contributions will be licensed under the same license as the project.
