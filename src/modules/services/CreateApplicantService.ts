import { Applicant, OnfidoApiError } from "@onfido/api";
import { Service } from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";
import { onfido } from "../../apiConfig";
import { CreateApplicantInput } from "../../Types/Inputs/CreateApplicantInput";
import { UserRepository } from "../repositories/UserRepository";

@Service()
export class CreateOnfidoApplicantService {

    @InjectRepository(UserRepository)
    private readonly userRepo: UserRepository;

    async createOnfidoApplicant({ firstName, lastName }: CreateApplicantInput): Promise<Applicant | undefined> {

        try {
            const applicant = await onfido.applicant.create({
                firstName: firstName,
                lastName: lastName
            });

            let applicantId = applicant.id;

            await this.userRepo.save({ firstName, lastName, applicantId });

            return applicant;

        } catch (error) {
            if (error instanceof OnfidoApiError) {
                // An error response was received from the Onfido API, extra info is available.
                console.log(error.message);
                console.log(error.type);
                console.log(error.isClientError());
            } else {
                // No response was received for some reason e.g. a network error.
                console.log(error.message);
            }
        }
        return undefined;
    }
}
