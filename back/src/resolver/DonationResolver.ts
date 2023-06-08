
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import dataSource from "../utils";
import { Donation } from "../entity/Donation";
import { User } from "../entity/User";



@Resolver()
class DonationResolver{
    @Mutation(() => String)
    async createDonation(
        // les Arg sont des données passer que l'on veut récupéré depuis l'entity
        @Arg("userid") userId:number,
        @Arg("amount") amount: number,

    ): Promise<any> {
    try {
        const donation = new Donation;
            donation.amount = amount;
            donation.user = await dataSource.getRepository(User).findOneByOrFail({userId});
            donation.created_at = new Date();
            await dataSource.getRepository(Donation).save(donation);
            return "Donation created";
    } catch (error) {
        return error;
    }
    }

    @Mutation(( ) => String)
    async deleteDonation(
        @Arg("id") id:number,
    ): Promise<string> {
        try {
            await dataSource.getRepository(Donation).delete(id)
            return " Donation delete"
        } catch (error) {
            return "Error Donation is not delete"
        }
    };

    @Mutation(( ) => String)
    async updateDonation(
        @Arg('id') id:number,
        @Arg("amount") amount:number,
    ): Promise<String>{
        try {
            await dataSource.getRepository(Donation).update(id, {amount})
            return 'Donation Updated'
        } catch (error) {
            return 'Fail Update Donation'
        }
    };

    @Query(( ) => Donation)
    async getDonation(
        @Arg('id') Id:number, 
    ): Promise<Donation | String>{
        try {
            const donation = await dataSource.getRepository(Donation).findOneByOrFail({Id});
            return donation; 
        } catch (error) {
            return "An error occured"
        }
    }
    
    @Query(() => [Donation])
    async getAllDonation() : Promise<Donation[] | String> {
        try {
            const donation = await dataSource.getRepository(Donation).find()
            return donation;
        } catch (error) {
            return "An error occured"
        }
    }
}


export default DonationResolver;