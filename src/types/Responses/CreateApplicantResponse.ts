import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class CreateApplicantResponse {
    @Field({ nullable: false})
    id: String;
}