import { IsEmail, Length} from "class-validator";
import { Field, InputType } from "type-graphql";
import { PasswordInput } from "../../shared/PasswordInput";

@InputType() // creates input gql type
export class RegisterInput extends PasswordInput { // no multiple inheritence in TS
    @Field()
    @Length(1, 255)
    firstName: string;

    @Field()
    @Length(1, 255)
    lastName: string;

    @Field()
    @IsEmail({ })
    email: string;
}
