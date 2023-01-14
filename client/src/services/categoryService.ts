import { api } from "~/api/apiClient";
import { Categories, Category } from "~/types/category";

class CategoryService {
  async getCategories() {
    const response = await api.get<{
      success: boolean;
      data: Categories;
    }>("/categories");
    return response.data;
  }

  async getCategory(slug: string) {
    const response = await api.get<{
      success: boolean;
      data: Category;
    }>(`/categories/${slug}`);
    return response.data;
  }
}

export default new CategoryService();
