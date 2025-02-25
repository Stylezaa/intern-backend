// Load environment variables from .env file
require("dotenv").config();

// Import required libraries
const express = require("express"); // Express framework for creating APIs
const cors = require("cors"); // Middleware to allow cross-origin requests
const morgan = require("morgan"); // HTTP request logger for debugging
const helmet = require("helmet"); // Adds security headers to prevent attacks
const bodyParser = require("body-parser"); // Parses request body data (not needed with express.json)
const path = require("path"); // Built-in Node.js module for working with file paths

// Import API routes (Modular route handling)
const authRoutes = require("./routes/authRoutes"); // Handles authentication (login, register)
const userRoutes = require("./routes/userRoutes"); // Handles user CRUD operations
const newsRoutes = require("./routes/newsRoutes"); // Handles news CRUD operations

// Create an instance of Express.js
const app = express();

// Middleware setup
app.use(express.json()); // Allows Express to parse JSON request bodies
app.use(cors()); // Enables Cross-Origin Resource Sharing (CORS) for API access from different origins
app.use(morgan("dev")); // Logs HTTP requests in the console (useful for debugging)
app.use(helmet()); // Adds security headers to prevent attacks like XSS, clickjacking, etc.

// Serve static files (uploads folder) so images can be accessed via URL
app.use("/uploads", express.static(path.resolve(__dirname + "/uploads")));

// Register API routes (maps routes to controllers)
app.use("/api/auth", authRoutes); // Authentication routes (register, login)
app.use("/api/users", userRoutes); // User management routes (CRUD operations)
app.use("/api/news", newsRoutes); // News management routes (CRUD operations)

// Define the port from environment variables or default to 5000
const PORT = process.env.PORT || 5000;

// Start the Express server and listen for incoming requests
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
