import { InputType, Field } from "type-graphql";

@InputType()
export class SubmitKycCheckInput {
    @Field({nullable: false})
    applicantId: string;

    @Field({nullable: false})
    reportNames: string[];
}
 