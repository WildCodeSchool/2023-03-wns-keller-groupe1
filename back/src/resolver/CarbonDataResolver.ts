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
    @Arg("category") categoryString: string,
    @Arg("userId") userId: number,
    @Arg("createdAt", () => String) createdAt: string
  ): Promise<String | GraphQLError | any> {
    try {
      const args = new CarbonDataInput();
      args.title = title;
      args.consumption = consumption;
      args.categoryString = categoryString;
      args.userId = userId;
      const validationErrors = await validate(args);

      if (validationErrors.length > 0) {
        return new GraphQLError("Validation error");
      }

      const carbonData = new CarbonData();
      carbonData.title = title;
      carbonData.consumption = consumption;
      carbonData.modifiedAt = new Date();
      carbonData.createdAt = new Date(createdAt);
      carbonData.categoryString = categoryString;
      carbonData.user = await dataSource
        .getRepository(User)
        .findOneByOrFail({ userId });
      await dataSource.getRepository(CarbonData).save(carbonData);
      return "Carbon data created";
    } catch (error) {
      return new GraphQLError("An error occured");
    }
  }

  @Query(() => CarbonData)
  async getCarbonData(
    @Arg("id") id: number
  ): Promise<CarbonData | GraphQLError> {
    try {
      const carbonData = await dataSource
        .getRepository(CarbonData)
        .findOne({ where: { id }, relations: ["user", "category"] });
      if (carbonData != null) {
        return carbonData;
      }
      throw new Error();
    } catch (error) {
      return new GraphQLError("An error occured");
    }
  }

  @Query(() => [CarbonData])
  async getAllCarbonData(): Promise<CarbonData[] | GraphQLError> {
    try {
      const carbonData = await dataSource
        .getRepository(CarbonData)
        .find({ relations: ["user", "category"] });
      return carbonData;
    } catch (error) {
      return new GraphQLError("An error occured");
    }
  }

  @Mutation(() => String)
  async updateCarbonData(
    @Arg("id") id: number,
    @Arg("title") title: string,
    @Arg("category") categoryString: string,
    @Arg("consumption") consumption: number,
    @Arg("createdAt", () => String, { nullable: true }) createdAt?: string // Ajout d'un argument optionnel pour la date de création
  ): Promise<string | GraphQLError | any> {
    try {
      const args = new CarbonDataInput();
      args.title = title;
      args.consumption = consumption;
      args.id = id;
      args.categoryString = categoryString;
      if (createdAt != null) args.createdAt = createdAt;

      const validationErrors = await validate(args);

      if (validationErrors.length > 0) {
        throw new GraphQLError("Validation error");
      }

      const updateData: any = { title, consumption, categoryString };

      if (createdAt != null) {
        const createdAtDate = new Date(createdAt);
        updateData.createdAt = createdAtDate;
      }

      await dataSource.getRepository(CarbonData).update(id, updateData);
      return "Carbon data updated";
    } catch (error) {
      return new GraphQLError("An error occurred");
    }
  }

  @Mutation(() => String)
  async deleteCarbonData(
    @Arg("id") id: number
  ): Promise<string | GraphQLError> {
    try {
      const args = new CarbonDataInput();
      args.id = id;
      const validationErrors = await validate(args);

      if (validationErrors.length > 0) {
        throw new GraphQLError("Validation error");
      }
      await dataSource.getRepository(CarbonData).delete(id);
      return "Carbon data deleted";
    } catch (error) {
      return new GraphQLError("An error occured");
    }
  }
}

export default CarbonDataResolver;
