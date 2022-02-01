import { gCall } from "../../../test-utils/gCall";
import { testConn } from "../../../test-utils/testConn";
let conn = await testConn();
beforeAll(async () => {
    conn = await testConn();
});
const registerMutation = ` mutation($input: RegisterInput!) {
    registerUser(input: $input) {
     id
     firstName
     lastName
     email 
    }
  }
`;
describe('Register', () => {
    it("create user", async () => {
        console.log(await gCall({
            source: registerMutation,
            variableValues: {
                input: {
                    firstName: "bob",
                    lastName: "bob2",
                    email: "bob@bob.com",
                    password: "asdfg"
                }
            }
        }));
    });
});
//# sourceMappingURL=Register.test.js.map