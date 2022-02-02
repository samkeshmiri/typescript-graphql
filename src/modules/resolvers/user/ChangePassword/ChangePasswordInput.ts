import { Field, InputType } from "type-graphql";
import { PasswordInput } from "../../../shared/PasswordInput";

@InputType() // creates input gql type
export class ChangePasswordInput extends PasswordInput {

    @Field()
    token: string;
}
