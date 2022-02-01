import { Connection } from "typeorm";
import { gCall } from "../../../test-utils/gCall";
import { testConn } from "../../../test-utils/testConn";

let conn: Connection;

beforeAll(async () => {
  conn = await testConn();
});
afterAll(async () => {
  await conn.close();
});

const registerMutation =
    ` mutation($input: RegisterInput!) {
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
                    email: "bob3000@bob.com",
                    password: "vfqjmsdhvc"
                }
            }
        }))
    })
});
