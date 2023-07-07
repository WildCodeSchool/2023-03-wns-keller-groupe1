import { MaxLength } from "class-validator";
import { Field, InputType, Int } from "type-graphql";

@InputType()
export class CarbonDataInput {
  @Field(() => Int, { nullable: true })
  id: number;

  @Field({ nullable: true })
  @MaxLength(255)
  title: string = "";

  @Field(() => Int, { nullable: true })
  consumption: number;

  @Field(() => Int, { nullable: true })
  price: number;

  @Field(() => Int, { nullable: true })
  userId: number;

  @Field(() => Int, { nullable: true })
  categoryId: number;
}