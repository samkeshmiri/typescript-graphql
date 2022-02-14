import { Report } from "@onfido/api";
import { Field, ObjectType } from "type-graphql";

@ObjectType() 
export class GetReportResponse {

    @Field()
    report: Report;

}