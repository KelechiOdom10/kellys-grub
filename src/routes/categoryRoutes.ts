import { Router } from "express";
import {
  getAllCategories,
  createCategory,
  getCategoryById,
  updateCategoryById,
  deleteCategoryById,
} from "~/controllers/categoryController";
import { isAuth, isAdmin } from "~/middleware/auth";

const router = Router();

router.route("/").get(getAllCategories).post(isAuth, isAdmin, createCategory);
router
  .route("/:id")
  .get(getCategoryById)
  .put(isAuth, isAdmin, updateCategoryById)
  .delete(isAuth, isAdmin, deleteCategoryById);

export default router;
