import { Column, Entity, PrimaryGeneratedColumn, ManyToOne} from "typeorm";
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
    @ManyToOne(() => User , (friend) => friend.userGroupe)
    friend : User;

    @Field(() => User)
    @ManyToOne(() => User, (user) => user.userGroupe)
    user: User;

    
}