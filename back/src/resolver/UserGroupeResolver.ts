import { Arg, Mutation, Query, Resolver } from "type-graphql";
import dataSource from "../utils";
import { UserGroupe } from "../entity/UserGroupe";
import { User } from "../entity/User";

@Resolver()
class UserGroupeResolver {
  // CREATE
  @Mutation(() => String)
  async createUserGroupe(
    @Arg("userId") userId: number,
    @Arg("title") title: string
  ): Promise<any> {
    try {
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
      return error;
    }
  }

  // UPDATE
  @Mutation(() => String)
  async updateUserGroupe(
    @Arg("title") title: string,
    @Arg("id") id: number
  ): Promise<string> {
    try {
      await dataSource.getRepository(UserGroupe).update(id, { title });
      return " group update";
    } catch (error) {
      return "error update groupe";
    }
  }

  // DELETE
  @Mutation(() => String)
  async deleteUserGroupe(@Arg("id") id: number): Promise<string> {
    try {
      await dataSource.getRepository(UserGroupe).delete(id);
      return "groupe is deleted";
    } catch (error) {
      return "groupe is not deleted";
    }
  }

  @Query(() => UserGroupe)
  async getUserGroupe(@Arg("Id") Id: number): Promise<UserGroupe | string > {
    try {
      const userGroupe = await dataSource
        .getRepository(UserGroupe)
        .findOne({where: {Id}, relations: ['user']});
      if (userGroupe != null) {
        return userGroupe;
      } else {
        throw new Error();
      }   
    } catch (error) {
      return "Error UserGroupe";
    }
  }

  @Query(() => [UserGroupe])
  async getAllUserGroupe(): Promise<UserGroupe[] | string> {
    try {
      const allUserGroupe = await dataSource.getRepository(UserGroupe).find();
      return allUserGroupe;
    } catch (error) {
      return "Error UserGroupe";
    }
  }

	@Mutation(() => String)
	async addUserToGroup(
		@Arg("userId") userId: number,
		@Arg("groupeId") groupeId: number
	): Promise<any> {
		try {
			const user = await dataSource.getRepository(User).findOne({ 
				where: { userId },
				relations: ['groups']
			});
			const groupToAdd = await dataSource.getRepository(UserGroupe).findOneByOrFail({Id: groupeId});
			
			if (user != null) {
				const currentUserGroupe = user.groups;
				user.groups = [...currentUserGroupe, groupToAdd];
			} 
				
			return "User has been added";
		} catch (error) {
			return "Error UserGroupe";
		}
	}

	@Mutation(() => String)
	async removeUserFromGroup(
		@Arg("userId") userId: number,
		@Arg("groupeId") groupeId: number
	): Promise<string> {
		try {
			const user = await dataSource.getRepository(User).findOne({ 
				where: { userId },
				relations: ['groups']
			});

			if (user != null) {
				const currentUserGroupe = user.groups;
				const groupToRemove = await dataSource.getRepository(UserGroupe).findOneByOrFail({Id: groupeId});
				currentUserGroupe.filter((groups) => groups !== groupToRemove);
			}

			return "Group has been removed";
		} catch (error) {
			return "Error UserGroupe";
		}
	}
}

export default UserGroupeResolver;
