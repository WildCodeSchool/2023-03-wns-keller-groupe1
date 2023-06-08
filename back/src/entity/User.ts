import { UserFriends } from "./UserFriends";
import { Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable } from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { CarbonData } from "./CarbonData";
import { UserGroupe } from "./UserGroupe";
import { Donation } from "./Donation";


@ObjectType()
@Entity()
export class User {
  @Field()
  @PrimaryGeneratedColumn()
  userId: number;

  @Field()
  @Column()
  email: string;

  @Column()
  hashedPassword: string;

  @Field()
  @Column()
  firstname: string;

  @Field()
  @Column()
  lastname: string;

  @Field()
  @Column()
  totalCo2: number;

  @Field()
  @Column({
    nullable: true,
  })
  isVerified: boolean;

  @Field(() => [CarbonData])
  @OneToMany(() => CarbonData, (carbonData) => carbonData.user)
  carbonData: CarbonData[];

  @OneToMany(() => UserFriends, (userFriend) => userFriend.userFriend)
  userFriend: UserFriends[];

  @OneToMany(() => UserFriends, (userFriend) => userFriend.userSender)
  userSender: UserFriends[];

  @Field(() => [UserGroupe])
  @OneToMany(() => UserGroupe, (userGroupe) => userGroupe.user)
  chefGroupe: UserGroupe[];

  @Field(() => [UserGroupe])
  @ManyToMany(() => UserGroupe)
  @JoinTable()
  members: UserGroupe[];

  @Field(() => [Donation])
  @OneToMany(() => Donation, (donation) => donation.user)
  donation : Donation[];

  @Field()
  @Column()
  modifiedAt: Date;

  @Field()
  @Column()
  createdAt: Date;

}
