import { Field, InputType, registerEnumType } from "type-graphql";

enum CheckKycResultTypes {
    CLEAR = "CLEAR",
    CONSIDER = "CONDSIDER", 
    PENDING = "PENDING"
}

registerEnumType(CheckKycResultTypes, {
    name: "CheckKycResult"
});

@InputType()
export class CheckKycResultResponse {
    @Field(() => CheckKycResultTypes)
    checkResult: CheckKycResultTypes
}