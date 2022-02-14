import { EntityRepository, Repository } from "typeorm";
import { User } from "../../entity/User";

interface UserRepo {
    findOrCreate({id, ...data}: Partial<User>): Promise<User>;
    findAll({}: Partial<User>): Promise<User>;
}

@EntityRepository(User)
export class UserRepository extends Repository<User> implements UserRepo {

    // add any custom methods here
    async findOrCreate({id, ...data}: Partial<User>): Promise<User> {
        let user = await this.findOne(id);

        console.log(user);

        // console.log(data);
        
        if (!user) {
            console.log("user not exists");
            user = await this.save({
                id,
                ...data
            });
        }

        return user;
    }

    async findAll({}: Partial<User>): Promise<User> {
        return await this.query('select "id", "firstName", "applicantId" from public.user');
    }

}