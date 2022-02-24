import { buildSchema } from "type-graphql";
import { Container } from "typedi";
import { ApplicantResolver } from "../modules/Onfido/Applicant";
import { ChangePasswordResolver } from "../modules/resolvers/user/ChangePassword.resolver";
import { ConfirmUserResolver } from "../modules/resolvers/user/ConfirmUser.resolver";
// import { FindAllUsersResolver } from "../modules/resolvers/user/FindAllUsers.resolver";
import { ForgotPasswordResolver } from "../modules/resolvers/user/ForgotPassword";
import { LoginResolver } from "../modules/resolvers/user/Login.resolver";
import { LogoutResolver } from "../modules/resolvers/user/Logout.resolver";
import { MeResolver } from "../modules/resolvers/user/Me.resolver";
import { RegisterResolver } from "../modules/resolvers/user/Register.resolver";

export const createSchema = () => buildSchema({
  container: Container,
  // resolvers: [__dirname + "/../modules/resolvers/user/*.resolver.ts"], // so you dont have to import each resolver
  resolvers: 
  [
    ApplicantResolver,
    ChangePasswordResolver,
    ConfirmUserResolver,
    // FindAllUsersResolver,
    ForgotPasswordResolver,
    LoginResolver,
    LogoutResolver,
    RegisterResolver,
    MeResolver
  ]
  // authChecker: ({ context: { req } }) => {
  //   return req.session.userId;
  // }
});
