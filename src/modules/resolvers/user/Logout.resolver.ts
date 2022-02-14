import { Ctx, Mutation, Resolver } from "type-graphql";
import { MyContext } from "../../../Types/MyContext";

@Resolver()
export class LogoutResolver {

    @Mutation(() => Boolean)
    async logout(@Ctx() ctx: MyContext): Promise<Boolean> {
        return new Promise((resolve, reject) => // pass a function to the promise
            ctx.req.session.destroy((err) => { // destroys session
                if (err) {
                    console.log(err);
                    return reject(false);
                }
                ctx.res.clearCookie('usercookie');
                return resolve(true);
            })
        );
    }
}