import { Ctx, Query, Resolver } from "type-graphql";
import { User } from "../../../entity/User";
import { MyContext } from "src/Types/MyContext";
import { UserRepository } from "../../repositories/UserRepository";
import { Service } from "typedi";

@Resolver()
@Service()
export class MeResolver { 

    constructor(private readonly userRepo: UserRepository) {
        this.userRepo = userRepo;
    }

    @Query(() => User)
    async me(@Ctx() ctx: MyContext): Promise<User | undefined> {
        if (!ctx.req.session.userId) {
            throw new Error("no user currently logged in")
        }
        return this.userRepo.findOne(ctx.req.session.userId);
    }
}
