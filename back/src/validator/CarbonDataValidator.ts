import { MaxLength } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class CarbonDataInput {
  @Field({ nullable: true })
  @MaxLength(255)
  title: string;

  @Field({ nullable: true })
  consumption: number;

  @Field({ nullable: true })
  price: number;

  @Field({ nullable: true })
  userId: number;

  @Field({ nullable: true })
  categoryId: number;
}