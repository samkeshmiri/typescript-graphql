import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import Container, { Service } from "typedi";
import { OnfidoApi } from "../../apiConfig";
import { CreateApplicantInput } from "../../Types/Inputs/CreateApplicantInput";
import { MyContext } from "../../Types/MyContext";
import { CreateApplicantResponse } from "../../Types/Responses/CreateApplicantResponse";
import { GenerateOnfidoSdkTokenResponse } from "../../Types/Responses/GenerateOnfidoSdkTokenResponse";
import { CreateKycApplicantService } from "./CreateApplicantService";

@Resolver()
@Service()
export class ApplicantResolver {

    constructor(private onfidoApi: OnfidoApi, private readonly createApplicantService: CreateKycApplicantService) { }

    @Mutation(() => CreateApplicantResponse)
    async createOnfidoApplicant(
        @Ctx() ctx: MyContext,
        @Arg('input') { firstName, lastName }: CreateApplicantInput): Promise<CreateApplicantResponse> {
        let userId = ctx.req.session.userId;
        let applicant = await this.createApplicantService.createKycApplicant(userId, { firstName, lastName });

        ctx.req.session.applicantId = applicant.id
        return applicant;
    }

    @Mutation(() => GenerateOnfidoSdkTokenResponse)
    async generateOnfidoSdkToken(
        @Ctx() ctx: MyContext): Promise<GenerateOnfidoSdkTokenResponse> {
        let applicantId = ctx.req.session.applicantId
        let sdkToken = await this.onfidoApi.onfido.sdkToken.generate({
            applicantId,
            applicationId: "com.apay.mobile"
        });
        return { sdkToken };
    }

    // @Mutation()
    // async submitKycCheck({ applicantId, reportNames }: SubmitKycCheckInput): Promise<SubmitKycCheckResponse | undefined> {
    //     return undefined;
    // };

    // @Query()
    // async checkKycResult(): Promise<CheckKycResultResponse | undefined> {
    //     return undefined;
    // };
}
