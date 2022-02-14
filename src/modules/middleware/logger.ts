import { MyContext } from "src/Types/MyContext";
import { MiddlewareFn } from "type-graphql";

export const logger: MiddlewareFn<MyContext> = async ({ }, next) => {
    
    console.log("I am middleware");
    
    return next(); // next middleware if multiple or itself
};