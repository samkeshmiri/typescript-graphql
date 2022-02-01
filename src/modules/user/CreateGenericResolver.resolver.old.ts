import { Arg, ClassType, Field, InputType, Mutation, Resolver } from "type-graphql";
import { Product } from "../../entity/Product";
import { User } from "../../entity/User";
import { RegisterInput } from "./Register/RegisterInput";


// move mutation into base resolver and make parameters generic
function createBaseResolver<T extends ClassType, X extends ClassType>(
    suffix: string, // help us name the resolver
    returnType: T, // what gql should return
    inputType: X, 
    entity: any // the entity we are creating
    ) {
    @Resolver({ isAbstract: true })
    abstract class BaseResolver {

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

const BaseCreateUser = createBaseResolver("User", User, RegisterInput, User);
const BaseCreateProduct = createBaseResolver("Product", Product, ProductInput, Product);

@Resolver()
export class CreateUserResolver extends BaseCreateUser {
}

@Resolver()
export class CreateProductResolver extends BaseCreateProduct {
}
