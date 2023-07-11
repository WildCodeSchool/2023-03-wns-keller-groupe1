import { Arg, Mutation, Query, Resolver } from "type-graphql";
import dataSource from "../utils";
import { Donation } from "../entity/Donation";
import { User } from "../entity/User";
import Stripe from "stripe";
import { GraphQLError } from 'graphql';
import { STRIPE_SECRET } from "../index";

@Resolver()
class DonationResolver {
  @Query(() => [Donation])
  async getAllDonation(): Promise<Donation[] | String> {
    try {
      const donation = await dataSource
        .getRepository(Donation)
        .find({ relations: ["user"] });
      return donation;
    } catch (error) {
      return "An error occured";
    }
  }

  @Mutation(() => String)
  async deleteDonation(@Arg("id") id: number): Promise<string> {
    try {
      await dataSource.getRepository(Donation).delete(id);
      return " Donation delete";
    } catch (error) {
      return "Error Donation is not delete";
    }
  }

  @Mutation(() => String)
  async updateDonation(
    @Arg("id") id: number,
    @Arg("amount") amount: number
  ): Promise<String> {
    try {
      await dataSource.getRepository(Donation).update(id, { amount });
      return "Donation Updated";
    } catch (error) {
      return "Fail Update Donation";
    }
  }

  @Query(() => Donation)
  async getDonation(@Arg("id") Id: number): Promise<Donation | String> {
    try {
      const donation = await dataSource
        .getRepository(Donation)
        .findOne({ where: { Id }, relations: ["user"] });
      if (donation != null) {
        return donation;
      } else {
        throw new Error();
      }
    } catch (error) {
      return "An error occured";
    }
  }


  @Mutation(() => String)
  async checkoutDonation(
    @Arg("userid") userId: number,
  ): Promise<string|GraphQLError> {
    try {
      const user = await dataSource
      .getRepository(User)
      .findOne({
        where: { userId }
      });
  
      if (!user) {
        return new GraphQLError("No user found"); 
      }
  
      const stripe = new Stripe(STRIPE_SECRET , {
        apiVersion: '2022-11-15',
      });
  
      const session = await stripe.checkout.sessions.create({
        customer_email: user.email,
        submit_type: 'donate',
        line_items: [
          {
            price: 'price_1NSKjoBnwmYc7FtQC6n3crqD',
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: "http://localhost:3000/payment/success?session_id={CHECKOUT_SESSION_ID}",
        cancel_url: `http://localhost:3000/dashboard`,
      });
  
      if (session.url) {
        return session.url;
      } else {
        return new GraphQLError("An error occured"); 
      }
    } catch (error) {
      return new GraphQLError("An error occured"); 
    }
   
  }

  @Mutation(() => String)
  async checkoutSuccess(
    @Arg("userid") userId: number,
    @Arg("sessionId") sessionId: string,
  ): Promise<string|GraphQLError> {

    try {
      const user = await dataSource
      .getRepository(User)
      .findOne({
        where: { userId }
      });
  
      if (!user) {
        return new GraphQLError("No user found"); 
      }
  
      const stripe = new Stripe(STRIPE_SECRET, {
        apiVersion: '2022-11-15',
      });
  
      const session: any = await stripe.checkout.sessions.retrieve(sessionId);
  
      const donation = new Donation();
      donation.amount = session.amount_subtotal;
      donation.user = user;
      donation.created_at = new Date();
      await dataSource.getRepository(Donation).save(donation);
  
      return "Payment succeeded";
    } catch (error) {
      return new GraphQLError("An error occured")
    }
  }
}

export default DonationResolver;
