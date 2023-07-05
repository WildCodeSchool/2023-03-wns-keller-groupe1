import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, ManyToMany } from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { User } from "./User";

@ObjectType()
@Entity()
export class UserGroupe {
    @Field()
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    title: string;

    @Field()
    @Column()
    modifiedAt: Date;

    @Field()
    @Column()
    createdAt: Date;

    @Field(() => User)
    @ManyToOne(() => User, (user) => user.chefGroupe)
    user: User;
   
    @Field(() => [User])
    @ManyToMany(() => User, (user) => user.groups)
    members: User[];
}