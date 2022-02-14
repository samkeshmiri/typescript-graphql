import { Length } from "class-validator";
import { InputType, Field } from "type-graphql";

@InputType() // creates input gql type
export class CreateApplicantInput {
    @Field({nullable: false})
    @Length(1, 255)
    firstName: string;

    @Field({nullable: false})
    @Length(1, 255)
    lastName: string;
}
