import { Arg, Mutation, Resolver } from "type-graphql";
import { Service } from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";
import { redis } from "../../../redis";
import { confirmUserPrefix } from "../../constants/redisprefixes";
import { UserRepository } from "../../repositories/UserRepository";



@Service()
@Resolver()
export class ConfirmUserResolver {

    @InjectRepository(UserRepository)
    private readonly userRepo: UserRepository;

    @Mutation(() => Boolean)
    async confirmUser(@Arg("token") token: string): Promise<boolean> {

        let userId = await redis.get(confirmUserPrefix + token);
        
        if (!userId) {
            return false;
        }

        await this.userRepo.update({id: parseInt(userId, 10)}, {confirmed: true});
        await redis.del(token);

        return true;
    }

}
