// Database
const prisma = require("../config/database");

// Get all users
exports.getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({ include: { News: true } });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
};

// Get a single user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.params.id },
      include: { News: true },
    });

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error });
  }
};

// Update a user
exports.updateUser = async (req, res) => {
  const { name, email } = req.body;

  try {
    const user = await prisma.user.update({
      where: { id: req.params.id },
      data: { name, email },
    });

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error });
  }
};

// Delete a user
exports.deleteUser = async (req, res) => {
  try {
    await prisma.user.delete({ where: { id: req.params.id } });
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error });
  }
};
