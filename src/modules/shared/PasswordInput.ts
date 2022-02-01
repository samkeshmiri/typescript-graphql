import { Field, InputType } from "type-graphql";

// abstracted out password type for types to extend from here

@InputType() // creates input gql type
export class PasswordInput {

    @Field()
    // no validation because it will be hashed
    password: string;
}
