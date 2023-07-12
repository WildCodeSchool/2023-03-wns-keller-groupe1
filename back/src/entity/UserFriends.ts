import { ObjectType, Field } from "type-graphql";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@ObjectType()
@Entity()
export class UserFriends {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  accepted: boolean;

  @Field()
  @Column()
  createdAt: Date;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.userReceiver)
  userReceiver: User

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.userSender)
  userSender: User
}
