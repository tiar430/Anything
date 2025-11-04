#!/bin/bash

echo "🚀 Setting up Anything - Mobile App Builder"
echo "==========================================="
echo ""

# Check if bun is installed
if ! command -v bun &> /dev/null
then
    echo "❌ Bun is not installed. Please install Bun first:"
    echo "   curl -fsSL https://bun.sh/install | bash"
    exit 1
fi

echo "✅ Bun detected: $(bun --version)"
echo ""

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file from template..."
    cp .env.example .env
    
    # Generate AUTH_SECRET
    echo "🔑 Generating AUTH_SECRET..."
    AUTH_SECRET=$(openssl rand -base64 32)
    
    # Update .env file
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        sed -i '' "s|AUTH_SECRET=your-secret-key-here|AUTH_SECRET=$AUTH_SECRET|g" .env
    else
        # Linux
        sed -i "s|AUTH_SECRET=your-secret-key-here|AUTH_SECRET=$AUTH_SECRET|g" .env
    fi
    
    echo "✅ .env file created with generated AUTH_SECRET"
    echo ""
    echo "⚠️  IMPORTANT: Please update DATABASE_URL in .env with your PostgreSQL connection string"
    echo ""
else
    echo "ℹ️  .env file already exists, skipping..."
    echo ""
fi

# Install dependencies
echo "📦 Installing dependencies..."
cd Web && bun install
cd ..

echo ""
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Update DATABASE_URL in .env file"
echo "2. Create database tables by running the SQL schema (see replit.md)"
echo "3. Run 'cd Web && bun run dev' to start development server"
echo "4. Access the app at http://localhost:5000"
echo ""
