import { Field, InputType } from "type-graphql";

@InputType()
export class UserFriendInput {
  @Field({ nullable: true })
  userId: number;

  @Field({ nullable: true })
  friendId: number;
}