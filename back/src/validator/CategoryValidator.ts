import { MaxLength } from "class-validator";
import { Field, InputType, Int } from "type-graphql";

@InputType()
export class CategoryInput {
  @Field({ nullable: true })
  @MaxLength(255)
  title: string = "";

  @Field(() => Int, { nullable: true })
  categoryId: number;
}