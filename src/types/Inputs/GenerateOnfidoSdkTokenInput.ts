import { InputType, Field } from "type-graphql";

@InputType() // creates input gql type
export class GenerateOnfidoSdkTokenInput {
    @Field({nullable: false})
    applicantId: string
}
