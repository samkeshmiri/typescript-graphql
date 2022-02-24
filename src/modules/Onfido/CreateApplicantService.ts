import { OnfidoApiError } from "@onfido/api";
import { Service } from "typedi";
import { OnfidoApi } from "../../apiConfig";
import { CreateApplicantInput } from "../../Types/Inputs/CreateApplicantInput";
import { CreateApplicantResponse } from "../../Types/Responses/CreateApplicantResponse";
import { UserRepository } from "../repositories/UserRepository";

@Service()
export class CreateKycApplicantService {

    constructor(private onfidoApi: OnfidoApi, private readonly userRepo: UserRepository) {
        this.userRepo = userRepo;
     };

    // @InjectRepository(User)
    // private readonly userRepo: Repository<User>;

    async createKycApplicant(userId: number, { firstName, lastName }: CreateApplicantInput): Promise<CreateApplicantResponse> {

        try {
            const applicant: CreateApplicantResponse = await this.onfidoApi.onfido.applicant.create({
                firstName: firstName,
                lastName: lastName
            });

            if (applicant.id) {
                applicant.sdkToken = await this.onfidoApi.onfido.sdkToken.generate({
                    applicantId: applicant.id,
                    applicationId: "com.apay.mobile"
                });

                if (applicant.sdkToken) {
                    await this.userRepo.update(userId, { applicantId: applicant.id });
                    return applicant;
                } else {
                    throw new Error("Onfido sdkToken was not generated.");
                }
            } else {
                throw new Error("Onfido applicant ID was not generated");
            };
        } catch (error) {
            if (error instanceof OnfidoApiError) {
                console.log("Onfido error : " + error.message);
                console.log(error.type); 
                console.log(error.isClientError());
            } else {
                console.log(error.message);
            }
            throw(error);
        }
    }
}
