import { Arg, Mutation, Query, Resolver } from "type-graphql";
import dataSource from "../utils";
import { Category } from "../entity/Category";

@Resolver()
class CategoryResolver {
  @Mutation(() => String)
  async createCategory(@Arg("title") title: string): Promise<String> {
    try {
      const category = new Category();
      category.title = title;
      await dataSource.getRepository(Category).save(category);
      return "Category created";
    } catch (error) {
      return "An error occured";
    }
  }

  @Query(() => Category)
  async getCategory(
    @Arg("categoryId") categoryId: number
  ): Promise<Category | string> {
    try {
      const category = await dataSource
        .getRepository(Category)
        .findOne({ where: { categoryId }, relations: ["carbonData"] });
      if (category != null) {
        return category;
      } else {
        throw new Error();
      }
    } catch (error) {
      return "An error occured";
    }
  }

  @Query(() => [Category])
  async getAllCategories(): Promise<Category[] | string> {
    try {
      const categories = await dataSource
        .getRepository(Category)
        .find({ relations: ["carbonData"] });
      return categories;
    } catch (error) {
      return "An error occured";
    }
  }

  @Mutation(() => String)
  async updateCategory(
    @Arg("title") title: string,
    @Arg("categoryId") categoryId: number
  ): Promise<string> {
    try {
      await dataSource.getRepository(Category).update(categoryId, { title });
      return "Category updated";
    } catch (error) {
      return "An error occured";
    }
  }

  @Mutation(() => String)
  async deleteCategory(@Arg("categoryId") categoryId: number): Promise<string> {
    try {
      await dataSource.getRepository(Category).delete(categoryId);
      return "Category deleted";
    } catch (error) {
      return "An error occured";
    }
  }
}

export default CategoryResolver;
