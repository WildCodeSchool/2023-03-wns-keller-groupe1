import { Arg, Mutation, Query, Resolver } from "type-graphql";
import dataSource from "../utils";
import { Category } from "../entity/Category";
import { CategoryInput } from "../validator/CategoryValidator";
import { validate } from "class-validator";
import { GraphQLError } from "graphql";

@Resolver()
class CategoryResolver {
  @Mutation(() => String)
  async createCategory(@Arg("title") title: string): Promise<String|GraphQLError> {
    try {
      const args = new CategoryInput();
      args.title = title;
      const validationErrors = await validate(args);

      if (validationErrors.length > 0) {
        return new GraphQLError('Validation error');  
      }

      const category = new Category();
      category.title = title;
      await dataSource.getRepository(Category).save(category);
      return "Category created";
    } catch (error) {
      return new GraphQLError('An error occured'); 
    }
  }

  @Query(() => Category)
  async getCategory(
    @Arg("categoryId") categoryId: number
  ): Promise<Category|GraphQLError> {
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
      return new GraphQLError('An error occured'); 
    }
  }

  @Query(() => [Category])
  async getAllCategories(): Promise<Category[]|GraphQLError> {
    try {
      const categories = await dataSource
        .getRepository(Category)
        .find({ relations: ["carbonData"] });
      return categories;
    } catch (error) {
      return new GraphQLError('An error occured'); 
    }
  }

  @Mutation(() => String)
  async updateCategory(
    @Arg("title") title: string,
    @Arg("categoryId") categoryId: number
  ): Promise<string|GraphQLError> {
    try {
      const args = new CategoryInput();
      args.title = title;
      args.categoryId = categoryId;
      const validationErrors = await validate(args);

      if (validationErrors.length > 0) {
        throw new GraphQLError('Validation error');  
      }
      await dataSource.getRepository(Category).update(categoryId, { title });
      return "Category updated";
    } catch (error) {
      return new GraphQLError('An error occured'); 
    }
  }

  @Mutation(() => String)
  async deleteCategory(@Arg("categoryId") categoryId: number): Promise<string|GraphQLError> {
    try {
      const args = new CategoryInput();
      args.categoryId = categoryId;
      const validationErrors = await validate(args);

      if (validationErrors.length > 0) {
        throw new GraphQLError('Validation error');  
      }
      await dataSource.getRepository(Category).delete(categoryId);
      return "Category deleted";
    } catch (error) {
      return new GraphQLError('An error occured'); 
    }
  }
}

export default CategoryResolver;
