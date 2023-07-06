import { MaxLength } from "class-validator";
import { Field, InputType, Int } from "type-graphql";

@InputType()
export class UserGroupInput {
  @Field(() => Int, { nullable: true })
  id: number;

  @Field(() => Int, { nullable: true })
  userId: number;

  @Field(() => Int, { nullable: true })
  groupeId: number;

  @Field({ nullable: true })
  @MaxLength(255)
  title: string = "";
}