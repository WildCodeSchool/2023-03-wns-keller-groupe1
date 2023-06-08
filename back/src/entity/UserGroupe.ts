import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, ManyToMany} from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { User } from "./User";

@ObjectType()
@Entity()
export class UserGroupe {
    @Field()
    @PrimaryGeneratedColumn()
        Id: number;

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
    @ManyToMany(() => User , (members) => members.groupe)
    members : User;

    @Field(() => User)
    @ManyToOne(() => User, (user) => user.chefGroupe)
    user: User;

    
}