import { IsEmail, MaxLength } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType({ description: "Input for creating a user" })
export class UserInput {
  @Field({ nullable: true })
  id: number;

  @Field({ nullable: true })
  @IsEmail()
  email: string;

  @Field({ nullable: true})
  @MaxLength(255)
  password: string;

  @Field({ nullable: true })
  @MaxLength(255)
  firstname: string;

  @Field({ nullable: true })
  @MaxLength(255)
  lastname: string;

  @Field({ nullable: true })
  totalCo2: number;
}
