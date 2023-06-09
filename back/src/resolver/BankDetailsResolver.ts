import { Arg, Mutation, Query, Resolver } from "type-graphql";
import dataSource from "../utils";
import { BankDetails } from "../entity/BankDetails";
import { User } from "../entity/User";

@Resolver()
class BankDetailsResolver {
  @Mutation(() => String)
  async createBankDetails(
    @Arg("userId") userId: number,
    @Arg("stripeDetails") stripeDetails: string
  ): Promise<string> {
    try {
      const bankDetails = new BankDetails();
      bankDetails.stripeDetails = stripeDetails;
      bankDetails.user = await dataSource
        .getRepository(User)
        .findOneByOrFail({ userId });
      bankDetails.modifiedAt = new Date();
      bankDetails.createdAt = new Date();
      await dataSource.getRepository(BankDetails).save(bankDetails);

      return "Bank details created";
    } catch (error) {
      return "An error occured";
    }
  }

  @Query(() => BankDetails)
  async getUserBankDetails(
    @Arg("userId") userId: number
  ): Promise<BankDetails | string> {
    try {
      const bankDetails = await dataSource
      .getRepository(BankDetails)
      .findOne({
        where: {
          user: await dataSource.getRepository(User).findOneByOrFail({ userId })
        },
        relations: ['user']
      });
      if (bankDetails != null) {
        return bankDetails;
      } else {
        throw new Error();   
      }
    } catch (error) {
      return "An error occured";
    }
  }

  @Query(() => BankDetails)
  async getBankDetails(
    @Arg("id") id: number
  ): Promise<BankDetails | string> {
    try {
      const bankDetails = await dataSource
      .getRepository(BankDetails)
      .findOne({where: {id}, relations: ['user'] });
      if (bankDetails != null) {
        return bankDetails;
      } else {
        throw new Error();   
      }
    } catch (error) {
      return "An error occured";
    }
  }

  @Query(() => [BankDetails])
  async getAllBankDetails(): Promise<BankDetails[] | string> {
    try {
      const bankDetails = await dataSource
      .getRepository(BankDetails)
      .find();
      if (bankDetails != null) {
        return bankDetails;
      } else {
        throw new Error();   
      }
    } catch (error) {
      return "An error occured";
    }
  }

  @Mutation(() => String)
  async updateBankDetails(
    @Arg("id") id: number,
    @Arg("stripeDetails") stripeDetails: string
  ): Promise<string> {
    try {
      await dataSource
      .getRepository(BankDetails)
      .update(id, {stripeDetails, modifiedAt: new Date()});   
    return "Bank details updated";
    } catch (error) {
      return "An error occured";
    }
  }

  @Mutation(() => String)
  async deleteBankDetails(@Arg("id") id: number): Promise<string> {
    try {
      await dataSource.getRepository(BankDetails).delete({ id });
      return "Bank details deleted";
    } catch (error) {
      return "An error occured";
    }
  }
}

export default BankDetailsResolver;
