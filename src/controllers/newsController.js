const prisma = require("../config/database");

// Create a new news article
exports.createNews = async (req, res) => {
  const { title, content } = req.body;
  const coverImage = req.file ? `/uploads/${req.file.filename}` : "";

  console.log(coverImage);

  try {
    const news = await prisma.news.create({
      data: {
        title,
        content,
        coverImage,
        authorId: req.user.id, // Authenticated user
      },
    });

    res.status(201).json(news);
  } catch (error) {
    res.status(500).json({ message: "Error creating news", error });
  }
};

// Get all news articles
exports.getNews = async (req, res) => {
  try {
    const news = await prisma.news.findMany({ include: { author: true } });
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: "Error fetching news", error });
  }
};

// Get a single news article by ID
exports.getNewsById = async (req, res) => {
  try {
    const news = await prisma.news.findUnique({
      where: { id: req.params.id },
      include: { author: true },
    });

    if (!news) return res.status(404).json({ message: "News not found" });

    res.json(news);
  } catch (error) {
    res.status(500).json({ message: "Error fetching news", error });
  }
};

// Update a news article
exports.updateNews = async (req, res) => {
  const { title, content } = req.body;
  const coverImage = req.file ? `/uploads/${req.file.filename}` : undefined;

  try {
    const news = await prisma.news.update({
      where: { id: req.params.id },
      data: { title, content, ...(coverImage && { coverImage }) },
    });

    res.json(news);
  } catch (error) {
    res.status(500).json({ message: "Error updating news", error });
  }
};

// Delete a news article
exports.deleteNews = async (req, res) => {
  try {
    await prisma.news.delete({ where: { id: req.params.id } });
    res.json({ message: "News deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting news", error });
  }
};
