const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function connectDB() {
  try {
    await prisma.$connect();
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1); // Exit process if database connection fails
  }
}

// Call the function to establish the connection
connectDB();

module.exports = prisma;
