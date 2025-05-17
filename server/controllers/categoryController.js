const Category = require("../models/Category.js");

// 📌 Create a new category
exports.createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const categoryExists = await Category.findOne({ name });

    if (categoryExists) {
      return res.status(400).json({ message: "Category already exists" });
    }

    const category = new Category({ name, description });
    await category.save();

    res.status(201).json({ 
      success:true,
      message: "Category created successfully", 
      category });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 📌 Get all categories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 📌 Get a single category by ID
exports.getCategoryById = async (req, res) => {
  try {
    const {categoryId}=req.params;
    // console.log(categoryId);
    const category = await Category.findById(categoryId)
  .populate({
    path: "jobs",
    populate: { 
      path: "clientId" 
    }
  });
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json({
      success:true,
      message:"Successfully fetched jobs of the category",
      data:category
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 📌 Update a category
exports.updateCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      { name, description },
      { new: true }
    );

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({ message: "Category updated successfully", category });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 📌 Delete a category
exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
