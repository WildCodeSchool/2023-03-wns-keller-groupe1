import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { UserFriends } from "../entity/UserFriends";
import dataSource from "../utils";
import { User } from "../entity/User";
import { UserFriendInput } from "../validator/UserFriendValidator";
import { validate } from "class-validator";
import { GraphQLError } from "graphql";

@Resolver()
class UserFriendResolver {
  @Mutation(() => String)
  async sendFriendRequest(
    @Arg("userId") userId: number,
    @Arg("friendId") friendId: number
  ): Promise<String|GraphQLError> {
    try {
      const args = new UserFriendInput();
      args.userId = userId;
      args.friendId = friendId;
      const validationErrors = await validate(args);

      if (validationErrors.length > 0) {
        return new GraphQLError('Validation error');  
      }
      
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
      return new GraphQLError('An error occured'); 
    }
  }

  @Query(() => UserFriends)
  async getFriendRequest(@Arg("id") id: number): Promise<UserFriends|GraphQLError> {
    try {
      const userFriend = await dataSource
        .getRepository(UserFriends)
        .findOneByOrFail({ id });
      return userFriend;
    } catch (error) {
      return new GraphQLError('An error occured'); 
    }
  }

  @Query(() => [UserFriends])
  async getAllFriendRequest(): Promise<UserFriends[]|GraphQLError> {
    try {
      const userFriends = await dataSource
        .getRepository(UserFriends)
        .find({ relations: ["userFriend", "userSender"] });
      return userFriends;
    } catch (error) {
      return new GraphQLError('An error occured'); 
    }
  }

  @Mutation(() => String)
  async deleteFriendRequest(@Arg("id") id: number): Promise<string|GraphQLError> {
    try {
      const args = new UserFriendInput();
      args.id = id;
      const validationErrors = await validate(args);

      if (validationErrors.length > 0) {
        return new GraphQLError('Validation error');  
      }
      await dataSource.getRepository(UserFriends).delete(id);
      return "userFriend deleted";
    } catch (error) {
      return new GraphQLError('An error occured'); 
    }
  }

  @Query(() => [UserFriends])
  async getUserFriendList(
    @Arg("userId") userId: number
  ): Promise<UserFriends[]|GraphQLError> {
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
        return new GraphQLError('Not friend found'); 
      }
    } catch (error) {
      return new GraphQLError('An error occured'); 
    }
  }

  @Mutation(() => String)
  async acceptFriendRequest(
    @Arg("id") id: number
  ): Promise<String|GraphQLError> {
    try {
      const args = new UserFriendInput();
      args.id = id;
      const validationErrors = await validate(args);

      if (validationErrors.length > 0) {
        return new GraphQLError('Validation error');  
      }
      await dataSource.getRepository(UserFriends).update(id, {accepted: true});
      return "Friend request accepted";
    } catch (error) {
      return new GraphQLError('An error occured'); 
    } 
  }
}

export default UserFriendResolver;
