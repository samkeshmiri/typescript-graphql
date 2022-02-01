import { graphql } from "graphql";
import { createSchema } from "../utils/createSchema";
export const gCall = async ({ source, variableValues }) => {
    return graphql({
        schema: await createSchema(),
        source,
        variableValues
    });
};
//# sourceMappingURL=gCall.js.map