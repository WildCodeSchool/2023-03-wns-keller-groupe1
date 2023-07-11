import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { UserFriends } from "../entity/UserFriends";
import dataSource from "../utils";
import { User } from "../entity/User";
import { UserFriendInput } from "../validator/UserFriendValidator";
import { validate } from "class-validator";
import { GraphQLError } from "graphql";
import { In } from "typeorm";

@Resolver()
class UserFriendResolver {
  @Mutation(() => String)
  async sendFriendRequest(
    @Arg("userId") userId: number,
    @Arg("friendId") friendId: number
  ): Promise<String | GraphQLError> {
    try {
      const args = new UserFriendInput();
      args.userId = userId;
      args.friendId = friendId;
      const validationErrors = await validate(args);

      if (validationErrors.length > 0) {
        return new GraphQLError("Validation error");
      }

      const userFriend = new UserFriends();
      userFriend.accepted = false;
      userFriend.createdAt = new Date();
      userFriend.userSender = await dataSource
        .getRepository(User)
        .findOneByOrFail({ userId });
      userFriend.userReceiver = await dataSource
        .getRepository(User)
        .findOneByOrFail({ userId: friendId });
      await dataSource.getRepository(UserFriends).save(userFriend);
      return "userFriend created!!";
    } catch (error) {
      return new GraphQLError("An error occured");
    }
  }

  @Query(() => UserFriends)
  async getFriendRequest(
    @Arg("id") id: number
  ): Promise<UserFriends | GraphQLError> {
    try {
      const userFriend = await dataSource
        .getRepository(UserFriends)
        .findOneByOrFail({ id });
      return userFriend;
    } catch (error) {
      return new GraphQLError("An error occured");
    }
  }

  @Query(() => [UserFriends])
  async getAllFriendRequest(
    @Arg("userId") userId: number
  ): Promise<UserFriends[] | GraphQLError> {
    try {
      const userReceiver = await dataSource
        .getRepository(User)
        .findOneByOrFail({ userId });
      const userFriends = await dataSource.getRepository(UserFriends).find({
        where: { userReceiver },
        relations: ["userReceiver", "userSender"],
      });
      return userFriends;
    } catch (error) {
      return new GraphQLError("An error occured");
    }
  }

  @Mutation(() => String)
  async deleteFriendRequest(
    @Arg("id") id: number
  ): Promise<string | GraphQLError> {
    try {
      const args = new UserFriendInput();
      args.id = id;
      const validationErrors = await validate(args);

      if (validationErrors.length > 0) {
        return new GraphQLError("Validation error");
      }
      await dataSource.getRepository(UserFriends).delete(id);
      return "userFriend deleted";
    } catch (error) {
      return new GraphQLError("An error occured");
    }
  }

  @Query(() => [UserFriends])
  async getUserFriendList(
    @Arg("userId") userId: number
  ): Promise<UserFriends[] | GraphQLError> {
    try {
      const user = await dataSource
        .getRepository(User)
        .findOneByOrFail({ userId });
      const userFriendList = await dataSource.getRepository(UserFriends).find({
        where: { userSender: user },
        relations: ["userReceiver", "userSender"],
      });
      if (userFriendList != null) {
        return userFriendList;
      } else {
        return new GraphQLError("Not friend found");
      }
    } catch (error) {
      return new GraphQLError("An error occured");
    }
  }

  @Query(() => [User])
  async getFriends(
    @Arg("userId") userId: number
  ): Promise<User[] | GraphQLError> {
    try {
      const user = await dataSource
        .getRepository(User)
        .findOne({ where: { userId } });

      if (user == null) {
        return new GraphQLError("User not found");
      }

      const sentFriendRequests = await dataSource
        .getRepository(UserFriends)
        .find({
          where: { userSender: user, accepted: true },
          relations: ["userReceiver"],
        });

      const receivedFriendRequests = await dataSource
        .getRepository(UserFriends)
        .find({
          where: { userReceiver: user, accepted: true },
          relations: ["userSender"],
        });

      const friendsIds = [
        ...sentFriendRequests.map((relation) => relation.userReceiver.userId),
        ...receivedFriendRequests.map((relation) => relation.userSender.userId),
      ];

      const friends = await dataSource
        .getRepository(User)
        .find({ where: { userId: In(friendsIds) } });

      return friends;
    } catch (error) {
      console.log(error);
      return new GraphQLError("An error occured");
    }
  }

  @Mutation(() => String)
  async acceptFriendRequest(
    @Arg("id") id: number
  ): Promise<string | GraphQLError> {
    try {
      const args = new UserFriendInput();
      args.id = id;
      const validationErrors = await validate(args);

      if (validationErrors.length > 0) {
        return new GraphQLError("Validation error");
      }

      await dataSource
        .getRepository(UserFriends)
        .update(id, { accepted: true });

      return "Demande d'amitié acceptée";
    } catch (error) {
      console.log(error);
      return new GraphQLError("Une erreur est survenue");
    }
  }
}

export default UserFriendResolver;
