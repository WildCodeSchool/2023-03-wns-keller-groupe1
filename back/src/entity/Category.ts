import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { CarbonData } from "./CarbonData";

@ObjectType()
@Entity()
export class Category {
  @Field()
  @PrimaryGeneratedColumn()
  categoryId: number;

  @Field()
  @Column()
  title: string;

  @Field(() => [CarbonData])
  @OneToMany(() => CarbonData, (carbonData) => carbonData.category)
  carbonData: CarbonData[];
}