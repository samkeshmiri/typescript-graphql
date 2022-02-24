import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import bcrypt from 'bcryptjs';
import { User } from "../../../entity/User";
import { MyContext } from "src/Types/MyContext";
import { getCustomRepository } from "typeorm";
import { UserRepository } from "../../repositories/UserRepository";
import { Service } from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";

@Resolver()
@Service()
export class LoginResolver {

    @InjectRepository(UserRepository)
    private readonly userRepo: UserRepository;

    @Mutation(() => User, { nullable: true })
    async login(
        @Arg("email") email: string,
        @Arg("password") password: string,
        @Ctx() ctx: MyContext): Promise<User | null> {

        const user = await this.userRepo.findOne({ where: { email } });

        if (!user) {
            return null;
        }

        const valid: boolean = await bcrypt.compare(password, user.password);

        if (!valid) {
            return null;
        }

        if (!user.confirmed) {
         // could throw error
        }

        ctx.req.session.userId = user.id;

        return user;
    }

}