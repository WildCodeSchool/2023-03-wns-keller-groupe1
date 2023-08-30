import * as argon2 from "argon2";
import * as jwt from "jsonwebtoken";
import { Like } from 'typeorm';
import { Arg, Authorized, Mutation, Query, Resolver, } from "type-graphql";
import { GraphQLError } from "graphql";
import dataSource from "../utils";
import { User } from "../entity/User";
import { UserInput } from "../validator/UserValidator";
import { validate } from "class-validator";

const JWT_SECRET = process.env.JWT_SECRET_KEY as string;

@Resolver()
class UserResolver {
  @Mutation(() => String)
  async createUser(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Arg("firstname") firstname: string,
    @Arg("lastname") lastname: string
  ): Promise<string | GraphQLError> {
    try {
      const args = new UserInput();
      args.email = email;
      args.password = password;
      args.firstname = firstname;
      args.lastname = lastname;
      const validationErrors = await validate(args);

      if (validationErrors.length > 0) {
        return new GraphQLError("Validation error");
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
      return new GraphQLError("An error occured");
    }
  }

  @Query(() => String)
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string
  ): Promise<String | GraphQLError> {
    try {
      const user = await dataSource
        .getRepository(User)
        .findOne({ where: { email } });
      
      if (!user) {
        return new GraphQLError("Cette adresse mail n'est pas utilisé");
      }

      if (await argon2.verify(user.hashedPassword, password)) {
        const token = jwt.sign({ email }, JWT_SECRET);
        return token;
      } else {
        return new GraphQLError('Mauvais identifiants');  
      }
    } catch (err) {
      return new GraphQLError("An error occured");
    }
  }

  @Query(() => User)
  async getUserFromToken(
    @Arg("token") token: string
  ): Promise<User | String | GraphQLError> {
    try {
      const decoded: any = jwt.verify(token, JWT_SECRET);
      const user = await dataSource
        .getRepository(User)
        .findOneByOrFail({ email: decoded.email });
      return user;
    } catch (err) {
      return new GraphQLError("An error occured");
    }
  }

  @Query(() => String)
  async refreshToken(
    @Arg("token") token: string
  ): Promise<String | GraphQLError> {
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
      return new GraphQLError("An error occured");
    }
  }

  @Query(() => String)
  async verifyToken(
    @Arg("token") token: string
  ): Promise<String | GraphQLError> {
    try {
      const decoded: any = jwt.verify(token, JWT_SECRET);
      const user = await dataSource
        .getRepository(User)
        .findOneByOrFail({ email: decoded.email });
      if (decoded != null && user != null) {
        return "User is logged in";
      } else {
        return new GraphQLError("User is not logged in");
      }
    } catch (err) {
      return new GraphQLError("An error occured");
    }
  }

  @Authorized()
  @Query(() => [User])
  async getAllUsers(): Promise<User[] | string | GraphQLError> {
    try {
      const users = await dataSource.getRepository(User).find({
        relations: [
          "groups",
          "carbonData",
          "donation",
          "userReceiver",
          "userSender",
          "bankDetails",
        ],
      });
      return users;
    } catch (error) {
      return new GraphQLError("An error occured");
    }
  }

  @Query(() => [User])
  async getUsersByName(
    @Arg("name") name: string
  ): Promise<User[]> {
    const users = await dataSource.getRepository(User).find({
      where: [
        { firstname: Like(`%${name}%`) },
        { lastname: Like(`%${name}%`) }
      ],
      relations: [
        "groups",
        "carbonData",
        "donation",
        "userReceiver",
        "userSender",
        "bankDetails"
      ],
    });
    return users;
  }

  @Query(() => User)
  async getUser(
    @Arg("userId") userId: number
  ): Promise<User | string | GraphQLError> {
    try {
      const user = await dataSource.getRepository(User).findOne({
        where: { userId },
        relations: [
          "groups",
          "carbonData",
          "donation",
          "userReceiver",
          "userSender",
          "bankDetails",
        ],
      });
      if (user != null) {
        return user;
      } else {
        return new GraphQLError("No user found");
      }
    } catch (error) {
      return new GraphQLError("An error occured");
    }
  }

  @Mutation(() => String)
  async updateUser(
    @Arg("userId") userId: number,
    @Arg("email") email: string,
    @Arg("firstname") firstname: string,
    @Arg("lastname") lastname: string,
    @Arg("totalCo2") totalCo2: number,
    @Arg("age") age:  string,
    @Arg("city") city: string,
    @Arg("about") about: string,
    @Arg("gender") gender: string,
    @Arg("tel") tel: string,

  ): Promise<String | GraphQLError> {
    try {
      // const args = new UserInput();
      // args.email = email;
      // args.totalCo2 = totalCo2;
      // args.firstname = firstname;
      // args.lastname = lastname;
      // const validationErrors = await validate(args);

      // if (validationErrors.length > 0) {
      //   return new GraphQLError("Validation error");
      // }

      await dataSource.getRepository(User).update(userId, {
        email,
        firstname,
        lastname,
        totalCo2,
        modifiedAt: new Date(),
        age,
        city,
        tel,
        gender,
        about,
      });
      return `User ${userId} updated`;
    } catch (error) {
      return new GraphQLError("An error occured");
    }
  }

  @Mutation(() => String)
  async deleteUser(
    @Arg("userId") userId: number
  ): Promise<string | GraphQLError> {
    try {
      await dataSource.getRepository(User).delete({ userId });
      return "User deleted";
    } catch (error) {
      return new GraphQLError("An error occured");
    }
  }
}

export default UserResolver;
