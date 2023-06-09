import { UserFriends } from "./UserFriends";
import { Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable, OneToOne, JoinColumn } from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { CarbonData } from "./CarbonData";
import { UserGroupe } from "./UserGroupe";
import { Donation } from "./Donation";
import { BankDetails } from "./BankDetails";


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

  @Field(() => [UserFriends])
  @OneToMany(() => UserFriends, (userFriend) => userFriend.userFriend)
  userFriend: UserFriends[];

  @OneToMany(() => UserFriends, (userFriend) => userFriend.userSender)
  userSender: UserFriends[];

  @Field(() => [UserGroupe])
  @OneToMany(() => UserGroupe, (userGroupe) => userGroupe.user)
  chefGroupe: UserGroupe[];

  @Field(() => [UserGroupe])
  @ManyToMany(() => UserGroupe, (userGroup) => userGroup.members )
  @JoinTable()
  groups: UserGroupe[];

  @Field(() => [Donation])
  @OneToMany(() => Donation, (donation) => donation.user)
  donation : Donation[];

  @Field(() => BankDetails)
  @OneToOne(() => BankDetails, (bankDetails) => bankDetails.user)
  @JoinColumn()
  bankDetails: BankDetails;

  @Field()
  @Column()
  modifiedAt: Date;

  @Field()
  @Column()
  createdAt: Date;

}
