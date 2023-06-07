import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Field, ObjectType } from "type-graphql";

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
  username: string;

  @Field()
  @Column()
  firstname: string;

  @Field()
  @Column()
  lastname: string;

  @Field()
  @Column()
  totalCo2: number;

  @Column({
    nullable: true,
  })
  isVerified: boolean;

  @Column()
  modifiedAt: Date;

  @Column()
  createdAt: Date;
}
