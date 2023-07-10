import { Arg, Mutation, Query, Resolver } from "type-graphql";
import dataSource from "../utils";
import { CarbonData } from "../entity/CarbonData";
import { Category } from "../entity/Category";
import { User } from "../entity/User";
import { validate } from "class-validator";
import { CarbonDataInput } from "../validator/CarbonDataValidator";
import { GraphQLError } from "graphql";

@Resolver()
class CarbonDataResolver {
  @Mutation(() => String)
  async createCarbonData(
    @Arg("title") title: string,
    @Arg("consumption") consumption: number,
    @Arg("price") price: number,
    @Arg("category") categoryString: string,
    @Arg("userId") userId: number
  ): Promise<String|GraphQLError|any> {
    try {
      const args = new CarbonDataInput();
      args.title = title;
      args.consumption = consumption;
      args.price = price;
      args.categoryString = categoryString;
      args.userId = userId;
      const validationErrors = await validate(args);

      if (validationErrors.length > 0) {
        return new GraphQLError('Validation error');  
      }

      const carbonData = new CarbonData();
      carbonData.title = title;
      carbonData.consumption = consumption;
      carbonData.price = price;
      carbonData.modifiedAt = new Date();
      carbonData.createdAt = new Date();
      carbonData.categoryString = categoryString;
      carbonData.user = await dataSource
        .getRepository(User)
        .findOneByOrFail({ userId });
      await dataSource.getRepository(CarbonData).save(carbonData);
      return "Carbon data created";
    } catch (error) {
      return new GraphQLError('An error occured'); 
    }
  }

  @Query(() => CarbonData)
  async getCarbonData(@Arg("id") id: number): Promise<CarbonData|GraphQLError> {
    try {
      const carbonData = await dataSource
        .getRepository(CarbonData)
        .findOne({ where: { id }, relations: ["user", "category"] });
      if (carbonData != null) {
        return carbonData;
      }
      throw new Error();
    } catch (error) {
      return new GraphQLError('An error occured'); 
    }
  }

  @Query(() => [CarbonData])
  async getAllCarbonData(): Promise<CarbonData[]|GraphQLError> {
    try {
      const carbonData = await dataSource
        .getRepository(CarbonData)
        .find({ relations: ["user", "category"] });
      return carbonData;
    } catch (error) {
      return new GraphQLError('An error occured'); 
    }
  }

  @Mutation(() => String)
  async updateCarbonData(
    @Arg("id") id: number,
    @Arg("title") title: string,
    @Arg("consumption") consumption: number,
    @Arg("price") price: number
  ): Promise<string|GraphQLError> {
    try {
      const args = new CarbonDataInput();
      args.title = title;
      args.consumption = consumption;
      args.price = price;
      args.id = id;
      const validationErrors = await validate(args);

      if (validationErrors.length > 0) {
        throw new GraphQLError('Validation error');  
      }
      await dataSource
        .getRepository(CarbonData)
        .update(id, { title, consumption, price });
      return "Carbon data updated";
    } catch (error) {
      return new GraphQLError('An error occured'); 
    }
  }

  @Mutation(() => String)
  async deleteCarbonData(@Arg("id") id: number): Promise<string|GraphQLError> {
    try {
      const args = new CarbonDataInput();
      args.id = id;
      const validationErrors = await validate(args);

      if (validationErrors.length > 0) {
        throw new GraphQLError('Validation error');  
      }
      await dataSource.getRepository(CarbonData).delete(id);
      return "Carbon data deleted";
    } catch (error) {
      return new GraphQLError('An error occured'); 
    }
  }
}

export default CarbonDataResolver;
