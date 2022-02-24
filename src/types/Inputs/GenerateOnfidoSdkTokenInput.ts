import { InputType, Field } from "type-graphql";

@InputType() // creates input gql type
export class GenerateKycSdkTokenInput {
    @Field({nullable: false})
    applicantId: string
}
