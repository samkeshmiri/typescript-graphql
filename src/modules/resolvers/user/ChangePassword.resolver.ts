import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { User } from "../../../entity/User";
import { redis } from "../../../redis";
import { forgetPasswordPrefix } from "../../constants/redisprefixes";
import { ChangePasswordInput } from "./ChangePassword/ChangePasswordInput";
import bcrypt from 'bcryptjs';
import { MyContext } from "../../../types/MyContext";
import { Service } from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";
import { UserRepository } from "../../repositories/UserRepository";

@Resolver()
@Service()
export class ChangePasswordResolver {

    @InjectRepository(UserRepository)
    private readonly userRepo: UserRepository;
    
    @Mutation(() => User, { nullable: true })
    async changePassword(
        @Arg("data") { token, password }: ChangePasswordInput,
        @Ctx() ctx: MyContext): Promise<User | null> {

        const userId = await redis.get(forgetPasswordPrefix + token);

        if (!userId) {
            return null;
        }

        const user = await this.userRepo.findOne(userId);

        if (!user) {
            return null;
        }

        await redis.del(forgetPasswordPrefix + token);

        user.password = await bcrypt.hash(password, 12);

        await this.userRepo.save(user);

        ctx.req.session.userId = user.id;

        return user;
    }
}
