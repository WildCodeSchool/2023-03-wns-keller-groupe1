import { Length } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class BankDetailsInput {
  @Field({ nullable: true })
  userId: number;

  @Field()
  @Length(1, 255)
  stripeDetails: string;
}