import { IsEmail, MaxLength } from "class-validator";
import { Field, InputType, Int } from "type-graphql";

@InputType({ description: "Input for creating a user" })
export class UserInput {
  @Field(() => Int, { nullable: true })
  userId: number | null;

  @Field({ nullable: true })
  @IsEmail()
  email: string = "";

  @Field({ nullable: true})
  @MaxLength(255)
  password: string = "";

  @Field({ nullable: true })
  @MaxLength(255)
  firstname: string = "";

  @Field({ nullable: true })
  @MaxLength(255)
  lastname: string = "";

  @Field(() => Int, { nullable: true })
  totalCo2: number | null;
}
