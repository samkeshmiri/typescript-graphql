import { Ctx, Query, Resolver } from "type-graphql";
import { User } from "../../entity/User";
import { MyContext } from "src/types/MyContext";
import { UserRepository } from "../repositories/UserRepository";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Service } from "typedi";

// @Resolver()
// export class MeResolver {
//     @Query(() => User, { nullable: true })
//     async me(@Ctx() ctx: MyContext): Promise<User | undefined> {
//         if (!ctx.req.session!.userId) {
//             return undefined; // gql casts undefined to null
//         }
//         return User.findOne(ctx.req.session.userId);
//     }
// }

@Resolver()
@Service()
export class newMeResolver { 

    @InjectRepository(UserRepository)
    private readonly userRepo: UserRepository;

    @Query(() => User)
    async newMe(@Ctx() ctx: MyContext): Promise<User | undefined> {
        if (!ctx.req.session.userId) {
            throw new Error("no user currently logged in")
        }
        return this.userRepo.findOne(ctx.req.session.userId);
    }
}
