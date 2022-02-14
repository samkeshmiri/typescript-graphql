import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class GenerateOnfidoSdkTokenResponse {
    @Field()
    sdkToken: String;
}