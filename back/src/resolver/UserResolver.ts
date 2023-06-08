import * as argon2 from "argon2";
import * as jwt from "jsonwebtoken";

import { Arg, Authorized, Mutation, Query, Resolver } from "type-graphql";
import dataSource from "../utils";
import { User } from "../entity/User";
import { JWT_SECRET } from "../index";

@Resolver()
class UserResolver {
  @Mutation(() => String)
  async createUser(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Arg("firstname") firstname: string,
    @Arg("lastname") lastname: string,
  ): Promise<String> {
    try {
      if (email === "" || password === "" || firstname === "" || lastname === "") {
        throw new Error;
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
      return "An error occured";
    }
  }

  @Query(() => String)
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string
  ): Promise<String> {
    const user = await dataSource
      .getRepository(User)
      .findOneByOrFail({ email });
    try {
      if (await argon2.verify(user.hashedPassword, password)) {
        const token = jwt.sign({ email }, JWT_SECRET);
        return token;
      } else {
        return "An error occured";
      }
    } catch (err) {
      console.log(err);
      return "An error occured";
    }
  }

  @Authorized()
  @Query(() => [User])
  async getAllUsers(): Promise<User[]> {
    const users = await dataSource.getRepository(User).find();
    return users;
  }

  @Query(() => User)
  async getUser(
    @Arg("userId") userId: number,
  ): Promise<User|string> {
    try {
      const user = await dataSource.getRepository(User).findOneByOrFail({ userId });
      return user;
    } catch (error) {
      return "An error occured";
    }
  }

  @Mutation(() => String)
  async updateUser(
    @Arg("userId") userId: number,
    @Arg("email") email: string,
    @Arg("firstname") firstname: string,
    @Arg("lastname") lastname: string,
    @Arg("totalCo2") totalCo2: number,
  ): Promise<string> {
    try {
      await dataSource.getRepository(User).update( userId, { email, firstname, lastname, totalCo2, modifiedAt: new Date()} );
      return `User ${userId} updated`;
    } catch (error) {
      return "An error occured";
    }
  }

  @Mutation(() => String)
  async deleteUser(
    @Arg("userId") userId: number,
  ): Promise<string> {
    try {
      await dataSource.getRepository(User).delete({ userId });
      return "User deleted";
    } catch (error) {
      return "An error occured";
    }
  }
}

export default UserResolver;
