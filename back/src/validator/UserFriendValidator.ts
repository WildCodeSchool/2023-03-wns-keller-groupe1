import { Field, InputType, Int } from "type-graphql";

@InputType()
export class UserFriendInput {
  @Field(() => Int, { nullable: true })
  id: number;

  @Field(() => Int, { nullable: true })
  userId: number;

  @Field(() => Int, { nullable: true })
  friendId: number;
}