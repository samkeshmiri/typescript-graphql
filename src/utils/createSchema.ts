import { buildSchema } from "type-graphql";
import Container from "typedi";

export const createSchema = () => buildSchema({
  container: Container,
  //  resolvers: [MeResolver, RegisterResolver, LoginResolver, ConfirmUserResolver],
  resolvers: [__dirname + "/../modules/*/*.resolver.ts"], // so you dont have to import each resolver
  // authChecker: ({ context: { req } }) => {
  //   return req.session.userId;
  // }
});