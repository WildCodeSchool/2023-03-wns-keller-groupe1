import { Field, Float, InputType, Int } from "type-graphql";
import { MaxLength } from "class-validator";

@InputType()
export class CarbonDataInput {
  @Field(() => Int, { nullable: true })
  id: number;

  @Field({ nullable: true })
  @MaxLength(255)
  title: string = "";

  @Field(() => Float, { nullable: true })
  consumption: number;

  @Field(() => Int, { nullable: true })
  userId: number;

  @Field(() => Int, { nullable: true })
  categoryId: number;

  @Field({ nullable: true })
  @MaxLength(255)
  categoryString: string = "";

  @Field(() => String, { nullable: true })
  createdAt: string;
}
