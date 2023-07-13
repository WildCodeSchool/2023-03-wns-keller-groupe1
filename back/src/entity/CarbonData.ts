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
  @Column("float")
  consumption: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.carbonData)
  user: User;

  @Field(() => Category, {nullable: true})
  @ManyToOne(() => Category, (category) => category.carbonData, { nullable: true })
  category: Category;

  @Field()
  @Column({
    nullable: true,
  })
  categoryString: string;

  @Field()
  @Column()
  modifiedAt: Date;

  @Field()
  @Column()
  createdAt: Date;
}