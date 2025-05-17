const express=require("express")
const {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} =require("../controllers/categoryController.js");
const { isAdmin, auth, isClient, isFreelancer } = require("../middlewares/authMiddleware.js");

const router = express.Router();

router.post("/create-category",auth,isAdmin,createCategory);
router.get("/get-all-categories", getAllCategories);
router.get("/get-jobs-of-particular-category/:categoryId",getCategoryById);
router.put("/update-category/:id",auth,isAdmin,updateCategory);
router.delete("/delete-category/:id",auth,isAdmin,deleteCategory);

module.exports = router

