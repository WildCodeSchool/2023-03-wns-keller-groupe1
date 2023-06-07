import { Arg, Mutation, Query, Resolver } from "type-graphql";
import dataSource from "../utils";
import { CarbonData } from "../entity/CarbonData";
import { Category } from "../entity/Category";
import { User } from "../entity/User";

@Resolver()
class CarbonDataResolver {

  @Mutation(() => String)
  async createCarbonData(
    @Arg("title") title: string,
    @Arg("consumption") consumption: number,
    @Arg("price") price: number,
    @Arg("categoryId") categoryId: number,
    @Arg("userId") userId: number,
  ): Promise<any> {
    try {
      const carbonData = new CarbonData;
      carbonData.title = title;
      carbonData.consumption = consumption;
      carbonData.price = price;
      carbonData.modifiedAt = new Date();
      carbonData.createdAt = new Date();
      carbonData.category = await dataSource.getRepository(Category).findOneByOrFail({ categoryId });
      carbonData.user = await dataSource.getRepository(User).findOneByOrFail({ userId });
      await dataSource.getRepository(CarbonData).save(carbonData);
      return "Carbon data created";
    } catch (error) {
      return error;
    }
  }

  @Query(() => CarbonData)
  async getCarbonData(
    @Arg("id") id: number
  ): Promise<CarbonData|string> {
    try {
      const carbonData = await dataSource.getRepository(CarbonData).findOneByOrFail({ id });
      return carbonData;
    } catch (error) {
      return "An error occured";
    }
  }

  @Query(() => [CarbonData])
  async getAllCarbonData(): Promise<CarbonData[]|string> {
    try {
      const carbonData = await dataSource.getRepository(CarbonData).find();
      return carbonData;
    } catch (error) {
      return "An error occured";
    }
  }

  @Mutation(() => String)
  async updateCarbonData(
    @Arg("id") id: number,
    @Arg("title") title: string,
    @Arg("consumption") consumption: number,
    @Arg("price") price: number,
  ): Promise<string> {
    try {
      await dataSource.getRepository(CarbonData).update( id, { title, consumption, price })
      return "Carbon data updated";
    } catch (error) {
      return "An error occured";
    }
  }

  @Mutation(() => String)
  async deleteCarbonData(
    @Arg("id") id: number
  ): Promise<string> {
    try {
      await dataSource.getRepository(CarbonData).delete( id )
      return "Carbon data deleted";
    } catch (error) {
      return "An error occured";
    }
  }
}

export default CarbonDataResolver;