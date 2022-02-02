import { Arg, ClassType, Field, InputType, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { Product } from "../../../entity/Product";
import { User } from "../../../entity/User";
import { RegisterInput } from "./Register/RegisterInput";


/**
 * 
 * This file removes the need for extending types in order to inherit from an abstract resolver
 * @param suffix 
 * @param returnType 
 * @param inputType 
 * @param entity 
 * @returns 
 */

// move mutation into base resolver and make parameters generic
function createResolver<T extends ClassType, X extends ClassType>(
    suffix: string, // help us name the resolver
    returnType: T, // what gql should return
    inputType: X, 
    entity: any, // the entity we are creating
    middleware? : any
    ) {
    @Resolver()
    abstract class BaseResolver {

        @UseMiddleware(...middleware || []) // pass any middleware added before the resolver runs // maybe undefined error if didn't add || []
        @Mutation(() => returnType, { name: `create${suffix}` })
        async create(@Arg("data", () => inputType) data: any) { // within arg it tells gql what to set the gql type to
            return entity.create(data).save();
        }
    }

    return BaseResolver;
}

@InputType()
class ProductInput {
    @Field()
    name: string;
}

// returns class to use as a resolver
export const CreateUserResolver = createResolver("User", User, RegisterInput, User);
export const CreateProductResolver = createResolver("Product", Product, ProductInput, Product);
