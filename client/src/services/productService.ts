import { api } from "~/api/apiClient";
import { ProductDetail, Products } from "~/types/product";

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
      data: ProductDetail;
    }>(`/products/${slug}`);
    return response.data;
  }

  async getHomePageCollection() {
    const response = await api.get<{
      success: boolean;
      data: {
        productsOnSale: Products;
        newAdditions: Products;
      };
    }>("/products/home");
    return response.data;
  }
}

export default new ProductService();
