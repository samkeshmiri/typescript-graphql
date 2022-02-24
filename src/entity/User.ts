import { Field, ObjectType, ID, Root, Int } from "type-graphql";
import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@ObjectType() // make it a type in gql and choose the Fields() we expose to the query
@Entity()
export class User {

    @Field(() => ID) // return ID type from gql use with apollo cache
    @PrimaryGeneratedColumn() // each entity must have a primary key - this one is auto genned ("uuid") 
    id: number; // types of each field

    @Field()
    @Column() // can specify type for db here too ("int") 
    firstName: string;

    @Field()
    @Column()
    lastName: string;

    @Field({defaultValue: ""}) // expose it to gql schema
    @Column("text", { unique: true, nullable: true })
    email: string;

    // not stored in db becuase we didn't specify column
    @Field({description: "first and last name"})
    fullName(@Root() parent: User): string {
        return `${parent.firstName} ${parent.lastName}`;
    }

    @Column({nullable: true})
    // @Min(5)
    password: string;

    @Column('bool', { default: false })
    confirmed: boolean;

    @Field()
    @Column("text", { nullable: true})
    applicantId: string;

}
