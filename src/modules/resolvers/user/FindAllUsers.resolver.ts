import { Query, Resolver } from "type-graphql";
import { Service } from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";
import { User } from "../../../entity/User";
import { UserRepository } from "../../repositories/UserRepository";


@Resolver()
@Service()
export class FindAllUsersResolver {
    
    @InjectRepository(UserRepository)
    private readonly userRepo: UserRepository;

    @Query(() => [User])
    allUsers() {
        return this.userRepo.findAll({});
    }
}
