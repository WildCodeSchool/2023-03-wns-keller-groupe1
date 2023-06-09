import { Column, Entity, PrimaryGeneratedColumn, OneToOne } from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { User } from "./User";

@ObjectType()
@Entity()
export class BankDetails {

  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  stripeDetails: string;

  @Field(() => User)
  @OneToOne(() => User, (user) => user.bankDetails)
  user: User;

  @Field()
  @Column()
  modifiedAt: Date;

  @Field()
  @Column()
  createdAt: Date;
}