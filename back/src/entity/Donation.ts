import { Column, Entity, PrimaryGeneratedColumn , ManyToOne} from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { User } from "./User";

@ObjectType()
@Entity()
export class Donation {


    @Field()
    @PrimaryGeneratedColumn()
        Id: number;


        @Field()
        @Column()
            amount: number;


                @Field()
                @Column()
                    created_at: Date;



                    @Field(() => User)
                    @ManyToOne(() => User, (user) => user.donation)
                    user: User;


}