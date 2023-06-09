import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { UserFriends } from "../entity/UserFriends";
import dataSource from "../utils";
import { User } from "../entity/User";

@Resolver()
class UserFriendResolver {
  @Mutation(() => String)
  async sendFriendRequest(
    @Arg("userId") userId: number,
    @Arg("friendId") friendId: number
  ): Promise<any> {
    try {
      const userFriend = new UserFriends();
      userFriend.accepted = false;
      userFriend.createdAt = new Date();
      userFriend.userSender = await dataSource
        .getRepository(User)
        .findOneByOrFail({ userId: friendId });
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
  async getFriendRequest(@Arg("id") id: number): Promise<UserFriends | string> {
    try {
      const userFriend = await dataSource
        .getRepository(UserFriends)
        .findOneByOrFail({ id });
      return userFriend;
    } catch (error) {
      return "Error you can't get an userFriends";
    }
  }

  @Query(() => [UserFriends])
  async getAllFriendRequest(): Promise<UserFriends[] | string> {
    try {
      const userFriends = await dataSource
        .getRepository(UserFriends)
        .find({ relations: ["userFriend", "userSender"] });
      return userFriends;
    } catch (error) {
      return "Error you can't get all userFriends";
    }
  }

  @Mutation(() => String)
  async deleteFriendRequest(@Arg("id") id: number): Promise<string> {
    try {
      await dataSource.getRepository(UserFriends).delete(id);
      return "userFriend deleted";
    } catch (error) {
      return "can't delete userFriend";
    }
  }

  @Query(() => [UserFriends])
  async getUserFriendList(
    @Arg("userId") userId: number
  ): Promise<UserFriends[] | string> {
    try {
      const user = await dataSource
        .getRepository(User)
        .findOneByOrFail({ userId });
      const userFriendList = await dataSource
        .getRepository(UserFriends)
        .find({
          where: { userSender: user },
          relations: ["userFriend", "userSender"],
        });
      if (userFriendList != null) {
        return userFriendList;
      } else {
        throw new Error();
      }
    } catch (error) {
      return "An error occured";
    }
  }

  @Mutation(() => String)
  async acceptFriendRequest(
    @Arg("id") id: number
  ): Promise<any> {
    try {
      await dataSource.getRepository(UserFriends).update(id, {accepted: true});
      return "Friend request accepted";
    } catch (error) {
      return "An error occured";
    } 
  }
}

export default UserFriendResolver;
