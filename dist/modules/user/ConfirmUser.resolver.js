var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Arg, Mutation, Resolver } from "type-graphql";
import { User } from "../../entity/User";
import { redis } from "../../redis";
import { confirmUserPrefix } from "../constants/redisprefixes";
let ConfirmUserResolver = class ConfirmUserResolver {
    async confirmUser(token) {
        let userId = await redis.get(confirmUserPrefix + token);
        if (!userId) {
            return false;
        }
        await User.update({ id: parseInt(userId, 10) }, { confirmed: true });
        await redis.del(token);
        return true;
    }
};
__decorate([
    Mutation(() => Boolean),
    __param(0, Arg("token")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ConfirmUserResolver.prototype, "confirmUser", null);
ConfirmUserResolver = __decorate([
    Resolver()
], ConfirmUserResolver);
export { ConfirmUserResolver };
//# sourceMappingURL=ConfirmUser.resolver.js.map