import * as argon2 from "argon2";
import * as jwt from "jsonwebtoken";

import { Arg, Authorized, Mutation, Query, Resolver } from "type-graphql";
import { GraphQLError } from 'graphql';
import dataSource from "../utils";
import { User } from "../entity/User";
import { JWT_SECRET } from "../index";
import { UserInput } from "../validator/UserValidator";
import { validate } from "class-validator";

@Resolver()
class UserResolver {
  @Mutation(() => String)
  async createUser(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Arg("firstname") firstname: string,
    @Arg("lastname") lastname: string
  ): Promise<String> {
    try {
      const args = new UserInput();
      args.email = email;
      args.password = password;
      args.firstname = firstname;
      args.lastname = lastname;
      const validationErrors = await validate(args);

      if (validationErrors.length > 0) {
        throw new Error("Validation error");
      }
      
      const user = new User();
      user.email = email;
      user.firstname = firstname;
      user.lastname = lastname;
      user.totalCo2 = 0;
      user.isVerified = true;
      user.modifiedAt = new Date();
      user.createdAt = new Date();
      user.hashedPassword = await argon2.hash(password);
      await dataSource.getRepository(User).save(user);
      return "User created";
    } catch (error) {
      throw new GraphQLError('An error occured');  
    }
  }

  @Query(() => String)
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string
  ): Promise<String> {
    const args = new UserInput();
    args.email = email;
    args.password = password;
    const validationErrors = await validate(args);

    if (validationErrors.length > 0) {
      throw new Error("Validation error");
    }

    const user = await dataSource
      .getRepository(User)
      .findOneByOrFail({ email });
    try {
      if (await argon2.verify(user.hashedPassword, password)) {
        const token = jwt.sign({ email }, JWT_SECRET);
        return token;
      } else {
        throw new GraphQLError('An error occured');  
      }
    } catch (err) {
      throw new GraphQLError('An error occured');  
    }
  }

  @Query(() => User)
  async getUserFromToken(
    @Arg("token") token: string
  ): Promise<User|String> {
    try {
      const decoded: any = jwt.verify(token, JWT_SECRET);
      const user = await dataSource
      .getRepository(User)
      .findOneByOrFail({ email: decoded.email });
      return user;
    } catch (err) {
      throw new GraphQLError('An error occured');  
    }
  }

  @Query(() => String)
  async refreshToken(
    @Arg("token") token: string
  ): Promise<String> {
    try {
      const decoded: any = jwt.verify(token, JWT_SECRET);
      const user = await dataSource
      .getRepository(User)
      .findOneByOrFail({ email: decoded.email });
      delete decoded.iat;
      delete decoded.exp;
      delete decoded.nbf;
      delete decoded.jti; 
      return jwt.sign({ email: user.email }, JWT_SECRET);
    } catch (err) {
      throw new GraphQLError('An error occured');  
    }
  }

  @Query(() => String)
  async verifyToken(
    @Arg("token") token: string
  ): Promise<String> {
    try {
      const decoded: any = jwt.verify(token, JWT_SECRET);
      const user = await dataSource
      .getRepository(User)
      .findOneByOrFail({ email: decoded.email });
      if (decoded != null && user != null) {
        return "User is logged in";
      } else {
        throw new GraphQLError('An error occured');  
      }
    } catch (err) {
      throw new GraphQLError('An error occured');  
    }
  }

  @Authorized()
  @Query(() => [User])
  async getAllUsers(): Promise<User[]|string> {
    try {
      const users = await dataSource
      .getRepository(User)
      .find({
        relations: [
          "groups",
          "carbonData",
          "donation",
          "userFriend",
          "userSender",
          "bankDetails"
        ],
      });
      return users;
    } catch (error) {
      throw new GraphQLError('An error occured');  
    }
  }

  @Query(() => User)
  async getUser(@Arg("userId") userId: number): Promise<User | string> {
    try {
      const user = await dataSource
        .getRepository(User)
        .findOne({
          where: { userId },
          relations: [
            "groups",
            "carbonData",
            "donation",
            "userFriend",
            "userSender",
            "bankDetails"
          ],
        });
      if (user != null) {
        return user;
      } else {
        throw new Error();
      }
    } catch (error) {
      throw new GraphQLError('An error occured');  
    }
  }

  @Mutation(() => String)
  async updateUser(
    @Arg("userId") userId: number,
    @Arg("email") email: string,
    @Arg("firstname") firstname: string,
    @Arg("lastname") lastname: string,
    @Arg("totalCo2") totalCo2: number
  ): Promise<string> {
    const args = new UserInput();
    args.email = email;
    args.id = userId;
    args.totalCo2 = totalCo2;
    args.firstname = firstname;
    args.lastname = lastname;
    const validationErrors = await validate(args);

    if (validationErrors.length > 0) {
      throw new Error("Validation error");
    }
    
    try {
      await dataSource
        .getRepository(User)
        .update(userId, {
          email,
          firstname,
          lastname,
          totalCo2,
          modifiedAt: new Date(),
        });
      return `User ${userId} updated`;
    } catch (error) {
      throw new GraphQLError('An error occured');  
    }
  }

  @Mutation(() => String)
  async deleteUser(@Arg("userId") userId: number): Promise<string> {
    try {
      await dataSource.getRepository(User).delete({ userId });
      return "User deleted";
    } catch (error) {
      throw new GraphQLError('An error occured');  
    }
  }
}

export default UserResolver;
