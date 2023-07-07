import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { User } from "./User";
import { Category } from "./Category";

@ObjectType()
@Entity()
export class CarbonData {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column()
  consumption: number;

  @Field()
  @Column()
  price: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.carbonData)
  user: User;

  @Field(() => Category)
  @ManyToOne(() => Category, (category) => category.carbonData, { eager: true })
  category: Category;

  @Field()
  @Column()
  modifiedAt: Date;

  @Field()
  @Column()
  createdAt: Date;
}