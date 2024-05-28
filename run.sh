# Check if node_modules folder exists and npx is available
if [ ! -d "node_modules" ] || ! command -v npx &> /dev/null; then
    echo "node_modules does not exist or npx is not installed. Please run npm install or check your Node.js setup."
    exit 1
fi

# Running Prisma migration
echo "Running Prisma migration..."
npx prisma migrate dev

# Check if the migration was successful
if [ $? -eq 0 ]; then
    echo "Migration completed successfully."
else
    echo "Migration failed. Check the errors above."
    exit 1
fi

# Start the development server or run development script
echo "Starting development environment..."
yarn dev