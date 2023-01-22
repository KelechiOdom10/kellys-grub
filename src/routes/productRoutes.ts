import { Router } from "express";
import {
  createProduct,
  deleteProductById,
  getAllProducts,
  getHomePageCollection,
  getProductBySlug,
  updateProductById,
} from "~/controllers/productController";
import { isAuth, isAdmin } from "~/middleware/auth";

const router = Router();

router.route("/").get(getAllProducts).post(isAuth, isAdmin, createProduct);
router.route("/home").get(getHomePageCollection);
router.route("/:slug").get(getProductBySlug);
router
  .route("/:id")
  .put(isAuth, isAdmin, updateProductById)
  .delete(isAuth, isAdmin, deleteProductById);

export default router;
