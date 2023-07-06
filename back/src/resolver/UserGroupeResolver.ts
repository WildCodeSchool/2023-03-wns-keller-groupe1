import { Arg, Mutation, Query, Resolver } from "type-graphql";
import dataSource from "../utils";
import { UserGroupe } from "../entity/UserGroupe";
import { User } from "../entity/User";
import { UserGroupInput } from "../validator/UserGroupValidator";
import { validate } from "class-validator";
import { GraphQLError } from "graphql";

@Resolver()
class UserGroupeResolver {
  // CREATE
  @Mutation(() => String)
  async createUserGroupe(
    @Arg("userId") userId: number,
    @Arg("title") title: string
  ): Promise<string|GraphQLError> {
    try {
      const args = new UserGroupInput();
      args.userId = userId;
      args.title = title;
      const validationErrors = await validate(args);

      if (validationErrors.length > 0) {
        return new GraphQLError('Validation error');  
      }

      const userGroupe = new UserGroupe();
      userGroupe.title = title;
      userGroupe.modifiedAt = new Date();
      userGroupe.createdAt = new Date();
      userGroupe.user = await dataSource
        .getRepository(User)
        .findOneByOrFail({ userId });
      await dataSource.getRepository(UserGroupe).save(userGroupe);
      return "Groupe Created";
    } catch (error) {
      return new GraphQLError('An error occured'); 
    }
  }

  // UPDATE
  @Mutation(() => String)
  async updateUserGroupe(
    @Arg("title") title: string,
    @Arg("id") id: number
  ): Promise<string|GraphQLError> {
    try {
      const args = new UserGroupInput();
      args.id = id;
      args.title = title;
      const validationErrors = await validate(args);

      if (validationErrors.length > 0) {
        return new GraphQLError('Validation error');  
      }

      await dataSource.getRepository(UserGroupe).update(id, { title });
      return " group update";
    } catch (error) {
      return new GraphQLError('An error occured');  
    }
  }

  // DELETE
  @Mutation(() => String)
  async deleteUserGroupe(@Arg("id") id: number): Promise<string|GraphQLError> {
    try {
      const args = new UserGroupInput();
      args.id = id;
      const validationErrors = await validate(args);

      if (validationErrors.length > 0) {
        return new GraphQLError('Validation error');  
      }
      await dataSource.getRepository(UserGroupe).delete(id);
      return "groupe is deleted";
    } catch (error) {
      return new GraphQLError('An error occured');  
    }
  }

  @Query(() => UserGroupe)
  async getUserGroupe(@Arg("id") id: number): Promise<UserGroupe|string|GraphQLError > {
    try {
      const userGroupe = await dataSource
        .getRepository(UserGroupe)
        .findOne({where: {id}, relations: ['user', 'members']});
      if (userGroupe != null) {
        return userGroupe;
      } else {
        throw new Error();
      }   
    } catch (error) {
      return new GraphQLError('An error occured'); 
    }
  }

  @Query(() => [UserGroupe])
  async getAllUserGroupe(): Promise<UserGroupe[]|string|GraphQLError> {
    try {
      const allUserGroupe = await dataSource.getRepository(UserGroupe).find({relations: ['user', 'members']});
      return allUserGroupe;
    } catch (error) {
      return new GraphQLError('An error occured'); 
    }
  }

	@Mutation(() => String)
	async addUserToGroup(
		@Arg("userId") userId: number,
		@Arg("groupeId") groupeId: number
	): Promise<string|GraphQLError> {
		try {
      const args = new UserGroupInput();
      args.userId = userId;
      args.groupeId = groupeId;
      const validationErrors = await validate(args);

      if (validationErrors.length > 0) {
        return new GraphQLError('Validation error');  
      }
			const user = await dataSource.getRepository(User).findOne({ 
				where: { userId },
				relations: ['groups']
			});
			const groupToAdd = await dataSource.getRepository(UserGroupe).findOneByOrFail({id: groupeId});
			
			if (user != null) {
				const currentUserGroupe = user.groups;
				user.groups = [...currentUserGroupe, groupToAdd];
			} 
				
			return "User has been added";
		} catch (error) {
			return new GraphQLError('An error occured'); 
		}
	}

	@Mutation(() => String)
	async removeUserFromGroup(
		@Arg("userId") userId: number,
		@Arg("groupeId") groupeId: number
	): Promise<string|GraphQLError> {
		try {
      const args = new UserGroupInput();
      args.userId = userId;
      args.groupeId = groupeId;
      const validationErrors = await validate(args);

      if (validationErrors.length > 0) {
        return new GraphQLError('Validation error');  
      }

			const user = await dataSource.getRepository(User).findOne({ 
				where: { userId },
				relations: ['groups']
			});

			if (user != null) {
				const currentUserGroupe = user.groups;
				const groupToRemove = await dataSource.getRepository(UserGroupe).findOneByOrFail({id: groupeId});
				currentUserGroupe.filter((groups) => groups !== groupToRemove);
			}

			return "User has been removed from group";
		} catch (error) {
			return new GraphQLError('An error occured'); 
		}
	}
}

export default UserGroupeResolver;
