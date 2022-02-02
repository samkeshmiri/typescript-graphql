import { Arg, Mutation, Resolver } from "type-graphql";
import { v4 } from "uuid";
import { User } from "../../../entity/User";
import { redis } from "../../../redis";
import { sendEmail } from "../../../utils/sendEmail";
import { forgetPasswordPrefix } from "../../constants/redisprefixes";

@Resolver()
export class ForgotPasswordResolver {
    @Mutation(() => Boolean)
    async forgotPassword(@Arg("email") email: string): Promise<boolean> {

        const user = await User.findOne({ where: {email}});

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
