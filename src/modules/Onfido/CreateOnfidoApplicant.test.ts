import { Applicant } from "@onfido/api";
import { mock, mockDeep } from "jest-mock-extended";
import { when } from "jest-when";
import { OnfidoApi } from "../../apiConfig";
import { CreateApplicantInput } from "../../Types/Inputs/CreateApplicantInput";
import { UserRepository } from "../repositories/UserRepository";
import { CreateKycApplicantService } from "./CreateApplicantService";

describe("when I try to create an applicant", () => {
    const onfidoApi = mockDeep<OnfidoApi>();
    const userRepo = mock<UserRepository>();
    const createApplicantService = new CreateKycApplicantService(onfidoApi, userRepo);

    let userId = 1;
    
    let userInput: CreateApplicantInput = {
        firstName: "jane",
        lastName: "doe"
    };
    
    it("should create an applicant id and update the database", async () => {
        
        let applicant: Applicant = {
            id: "1",
            createdAt: "2022-02-21T18:55:43Z",
            deleteAt: null,
            href: "/v3.2/applicants/476f79ec-92c6-4f36-a67a-ada7b4fa3b48",
            firstName: "jane",
            lastName: "doe",
            email: null,
            dob:  null,
            address:  null,
            idNumbers:  null
        };
        
        when(onfidoApi.onfido.applicant.create).mockResolvedValue(applicant);
        
        await expect(createApplicantService.createKycApplicant(userId, userInput))
            .resolves
            .not
            .toThrow();
        
        expect(userRepo.update)
            .toHaveBeenCalledWith(userId, {applicantId: applicant.id});
    });

    // describe("when first name is blank", () => {
    //     it("should throw an error", async () => {
    //         let missingUserInput: CreateApplicantInput = {
    //             firstName: "",
    //             lastName: "doe"
    //         };

    //         await expect(createApplicantService.createKycApplicant(userId, missingUserInput))
    //             .rejects
    //             .toThrow("Missing firstName or lastName in the request");
    //     })
    // });
});
