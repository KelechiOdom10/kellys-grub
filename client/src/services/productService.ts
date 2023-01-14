import { api } from "~/api/apiClient";
import { Product, Products } from "~/types/product";

class ProductService {
  async getProducts() {
    const response = await api.get<{
      success: boolean;
      data: Products;
    }>("/products");
    return response.data;
  }

  async getProduct(slug: string) {
    const response = await api.get<{
      success: boolean;
      data: Product;
    }>(`/products/${slug}`);
    return response.data;
  }
}

export default new ProductService();
