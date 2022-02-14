import { Arg, Mutation, Resolver } from "type-graphql";
import { Service } from "typedi";
import { onfido } from "../../../apiConfig";
import { GenerateOnfidoSdkTokenInput } from "../../../Types/Inputs/GenerateOnfidoSdkTokenInput";
import { GenerateOnfidoSdkTokenResponse } from "../../../Types/Responses/GenerateOnfidoSdkTokenResponse";

@Service()
@Resolver()
export class resolver {
    @Mutation(() => GenerateOnfidoSdkTokenResponse)
    async generateOnfidoSdkToken(
        @Arg('applicantId')  { applicantId }: GenerateOnfidoSdkTokenInput): Promise<String>{
        let sdkToken = await onfido.sdkToken.generate({
            applicantId,
            applicationId: "com.apay.mobile"
        });
        return sdkToken;
    }
}
