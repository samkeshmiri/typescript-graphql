import { Arg, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import bcrypt from 'bcryptjs';
import { User } from "../../../entity/User";
import { RegisterInput } from "./Register/RegisterInput";
import { isAuth } from "../../middleware/isAuth";
import { logger } from "../../middleware/logger";
// import { createConfirmationUrl } from "../../utils/createConfirmationUrl";
// import { sendEmail } from "../../utils/sendEmail";
import { UserRepository } from "../../repositories/UserRepository";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Service } from "typedi";

@Resolver() // so we know which field this is resolving for
@Service()
export class RegisterResolver {

    @InjectRepository(UserRepository)
    private readonly userRepo: UserRepository;

    // @Authorized() // cookie cleared means you cant run it without being logged in
    @Query(() => String, { nullable: true, name: "helloWorld" }) // we want the query to return a string // option is to set the name different to the function
    @UseMiddleware(isAuth, logger) // diff way to authenticate with our own method
    async hello() { // hello would be name of the query in gql unless name override above 
        return "Hello World";
    }

    @Mutation(() => User, { nullable: false, name: "registerUser" }) // we want the query to return a string // option is to set the mutation name different to the function
    async register(
        @Arg('input') { firstName, lastName, email, password }: RegisterInput): Promise<User> {

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await this.userRepo.findOrCreate(
            {
                firstName,
                lastName,
                email,
                password: hashedPassword
            }
        )
       // await sendEmail(email, await createConfirmationUrl(user.id));

        return user;
    }

    // @InjectRepository(UserRepository)
    // private readonly userRepo: UserRepository;

    // @Query(() => User)
    // async newMe(@Ctx() ctx: MyContext): Promise < User | undefined > {
    //     if(!ctx.req.session.userId) {
    //     throw new Error("no user currently logged in")
    // }
    // return this.userRepo.findOne(ctx.req.session.userId);

}
