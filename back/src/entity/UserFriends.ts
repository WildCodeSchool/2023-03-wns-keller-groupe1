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
  created: Date;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.userFriend)
  userFriend: User

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.userSender)
  userSender: User
}
