import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class SubmitKycCheckResponse {
    @Field({ nullable: false})
    checkId: String;
}