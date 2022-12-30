const express = require("express");
const router = express.Router();
const {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategoryById,
  deleteCategoryById,
} = require("../controllers/categoryController");
const { isAuth, isAdmin } = require("../middleware/auth");

router.route("/").get(getAllCategories).post(isAuth, isAdmin, createCategory);
router
  .route("/:id")
  .get(getCategoryById)
  .put(isAuth, isAdmin, updateCategoryById)
  .delete(isAuth, isAdmin, deleteCategoryById);

module.exports = router;
