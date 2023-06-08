import { Arg, Mutation, Query, Resolver } from "type-graphql";
import dataSource from "../utils";
import { UserGroupe } from "../entity/UserGroupe";
import { User } from "../entity/User";


@Resolver()
class UserGroupeResolver{
// CREATE
@Mutation(() => String)
async createUserGroupe(
    @Arg('userId') userId: number,
    @Arg('title')  title: string,
    @Arg('userFriendId') userFriendId: number,
    
):Promise<any>{
    try {
        const userGroupe = new UserGroupe;
        userGroupe.title = title;
        // userGroupe.friend = await dataSource.getRepository(User).findOneByOrFail({userFriendId});
        userGroupe.modifiedAt = new Date();
        userGroupe.createdAt = new Date();
        userGroupe.user = await dataSource.getRepository(User).findOneByOrFail({ userId });
        await dataSource.getRepository(UserGroupe).save(userGroupe);
        return "Groupe Created"
    } catch (error) {
        return error;
    }};

    //UPDATE
@Mutation(( ) => String)
    async updateUserGroupe (
    @Arg('title') title: string,
    @Arg('userId') userId: number,
    ) : Promise<string> {

    try {
        await dataSource.getRepository(UserGroupe).update(userId , {title})
       return " group update" 
    } 
    catch (error) {
        return "error update groupe";
    }
};

//DELETE
@Mutation(() => String)
async deleteUserGroupe(
    @Arg('id') id:number,
): Promise<string>{
    try {
        await dataSource.getRepository(UserGroupe).delete(id)
        return 'groupe is deleted'
    } catch (error) {
        return "groupe is not deleted"
    }
}
}

export default UserGroupeResolver; 

