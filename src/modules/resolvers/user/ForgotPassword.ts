import { Arg, Mutation, Resolver } from "type-graphql";
import { Service } from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";
import { v4 } from "uuid";
import { redis } from "../../../redis";
import { sendEmail } from "../../../utils/sendEmail";
import { forgetPasswordPrefix } from "../../constants/redisprefixes";
import { UserRepository } from "../../repositories/UserRepository";

@Resolver()
@Service()
export class ForgotPasswordResolver {

    @InjectRepository(UserRepository)
    private readonly userRepo: UserRepository;

    @Mutation(() => Boolean)
    async forgotPassword(@Arg("email") email: string): Promise<boolean> {

        const user = await this.userRepo.findOne({ where: {email}});

        if (!user) {
            return true; // could throw error but probs not safe for security
        }

        const token = v4();
        await redis.set(forgetPasswordPrefix + token, user.id, "ex", 60 * 60 * 24); // 1 day expiration in redis
        
        await sendEmail( // would use different email template here by using different function
            email, `http://localhost:3000/user/change-password/${token}`);
        return true;
    }
}
