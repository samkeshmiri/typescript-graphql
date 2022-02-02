import { Field, ObjectType, ID, Root } from "type-graphql";
import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@ObjectType() // make it a type in gql and choose the Fields() we expose to the query
@Entity()
export class User {

    @Field(() => ID) // return ID type from gql use with apollo cache
    @PrimaryGeneratedColumn() // each entity must have a primary key - this one is auto genned ("uuid") // will gen a uuid
    id: number; // types of each field // int or double ? cause gql needs to know

    @Field()
    @Column() // can specify type for db here too ("int") 
    firstName: string;

    @Field()
    @Column()
    lastName: string;

    @Field() // expose it to gql schema
    @Column("text", { unique: true })
    email: string;

    // not stored in db becuase we didn't specify column
    @Field({description: "first and last name"})
    name(@Root() parent: User): string {
        return `${parent.firstName} ${parent.lastName}`;
    }
    @Column()
    // @Min(5)
    password: string;

    @Column('bool', { default: false })
    confirmed: boolean;

}