import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { UserFriends } from "../entity/UserFriends";
import dataSource from "../utils";
import { User } from "../entity/User";

@Resolver()
class UserFriendResolver {
  @Mutation(() => String)
  async createUserFriend(
    @Arg("accepted") accepted: Boolean,
    @Arg("userId") userId: number
  ): Promise<any> {
    try {
      const userFriend = new UserFriends();
      userFriend.accepted = true;
      userFriend.created = new Date();
      userFriend.userFriend = await dataSource
        .getRepository(User)
        .findOneByOrFail({ userId });
      await dataSource.getRepository(UserFriends).save(userFriend);
      return "userFriend created!!";
    } catch (error) {
      return "can't create a new userFriend";
    }
  }

  @Query(() => UserFriends)
  async getUserFriend(@Arg("id") id: number): Promise<UserFriends | string> {
    try {
      const userFriend = await dataSource.getRepository(UserFriends).findOneByOrFail({ id });
      return userFriend;
    } catch (error) {
      return "Error you can't get an userFriends";
    }
  }

  @Query(() => [UserFriends])
  async getAllUserFriend(): Promise<UserFriends[] | string> {
    try {
      const userFriends = await dataSource.getRepository(UserFriends).find();
      return userFriends;
    } catch (error) {
      return "Error you can't get all userFriends";
    }
  }
  

  @Mutation(() => String)
  async deleteUserFriend(@Arg("id") id: number): Promise<string> {
    try {
      await dataSource.getRepository(UserFriends).delete(id);
      return "userFriend deleted";
    } catch (error) {
      return "can't delete userFriend";
    }
  }
}

export default UserFriendResolver;
