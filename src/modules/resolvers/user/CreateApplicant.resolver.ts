import { Applicant } from "@onfido/api";
import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { Service } from "typedi";
import { CreateApplicantInput } from "../../../Types/Inputs/CreateApplicantInput";
import { MyContext } from "../../../Types/MyContext";
import { CreateApplicantResponse } from "../../../Types/Responses/CreateApplicantResponse";
import { CreateOnfidoApplicantService } from "../../services/CreateApplicantService";

@Service()
@Resolver()
export class CreateApplicantResolver {

    applicantId: string | undefined = "";

    constructor(private readonly createApplicantService: CreateOnfidoApplicantService) { }

    @Mutation(() => CreateApplicantResponse)
    async createOnfidoApplicant(
        @Ctx() ctx: MyContext,
        @Arg('input') { firstName, lastName }: CreateApplicantInput): Promise<Applicant | undefined> {
        //    return this.createApplicantService.createOnfidoApplicant({ firstName, lastName });

        let applicant = this.createApplicantService.createOnfidoApplicant({ firstName, lastName });
        applicant.then(applicant => { 
            this.applicantId = applicant?.id
         } )
         
        ctx.req.session.applicantId = this.applicantId;
        return applicant;
    }

}
