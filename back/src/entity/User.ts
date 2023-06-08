import { Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable } from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { CarbonData } from "./CarbonData";
import { UserGroupe } from "./UserGroupe";

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

  @Field(() => [UserGroupe])
  @OneToMany(() => UserGroupe, (userGroupe) => userGroupe.user)
  chefGroupe: UserGroupe[];

  @Field(() => [UserGroupe])
  @ManyToMany(() => UserGroupe)
  @JoinTable()
  members: UserGroupe[];

  @Field()
  @Column()
  modifiedAt: Date;

  @Field()
  @Column()
  createdAt: Date;
}
