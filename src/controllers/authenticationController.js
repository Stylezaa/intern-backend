// Database
const prisma = require("../config/database");
// Library
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register a new user
exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser)
      return res.status(400).json({ message: "Email already in use" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error });
  }
};

// Login user
exports.login = async (req, res) => {
  const { email, password } = req.body;

  console.log("Request Body:", req.body);

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    // Check if user exists before accessing `user.password`
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Ensure password is defined before comparing
    if (!user.password) {
      return res
        .status(500)
        .json({ message: "User password is missing in the database" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({ token });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Login error", error });
  }
};
