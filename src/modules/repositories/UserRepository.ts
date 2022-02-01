import { EntityRepository, Repository } from "typeorm";
import { User } from "../../entity/User";

@EntityRepository(User)
export class UserRepository extends Repository<User> {

    // add any custom methods here
    async findOrCreate({id, ...data}: Partial<User>) {
        let user = await this.findOne(id);
        
        if (!user) {
            user = await this.save({
                id,
                ...data
            });
        }
        return user;
    }

    async findAll({}: Partial<User>): Promise<User> {
        return await this.query("select * from public.user");
    }

}