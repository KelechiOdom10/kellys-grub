import { Router } from "express";
import {
  getAllCategories,
  createCategory,
  updateCategoryById,
  deleteCategoryById,
  getCategoryBySlug,
} from "~/controllers/categoryController";
import { isAuth, isAdmin } from "~/middleware/auth";

const router = Router();

router.route("/").get(getAllCategories).post(isAuth, isAdmin, createCategory);
router.route("/:slug").get(getCategoryBySlug);
router
  .route("/:id")
  .put(isAuth, isAdmin, updateCategoryById)
  .delete(isAuth, isAdmin, deleteCategoryById);
router.route("/:slug/products").get(getCategoryBySlug);

export default router;
