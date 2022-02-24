import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class CreateApplicantResponse {
    @Field({ nullable: false})
    id: string;

    @Field({ nullable: false})
    sdkToken?: string;
}