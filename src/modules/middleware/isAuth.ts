import { MyContext } from "src/Types/MyContext";
import { MiddlewareFn } from "type-graphql";

export const isAuth: MiddlewareFn<MyContext> = async ({ context }, next) => {

    if (!context.req.session.userId) {
        throw new Error("not authenticated");
    }

    return next(); // next middleware if multiple or itself
};
