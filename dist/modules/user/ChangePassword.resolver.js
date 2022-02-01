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
import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { User } from "../../entity/User";
import { redis } from "../../redis";
import { forgetPasswordPrefix } from "../constants/redisprefixes";
import { ChangePasswordInput } from "./ChangePassword/ChangePasswordInput";
import bcrypt from 'bcryptjs';
let ChangePasswordResolver = class ChangePasswordResolver {
    async changePassword({ token, password }, ctx) {
        const userId = await redis.get(forgetPasswordPrefix + token);
        if (!userId) {
            return null;
        }
        const user = await User.findOne(userId);
        if (!user) {
            return null;
        }
        await redis.del(forgetPasswordPrefix + token);
        user.password = await bcrypt.hash(password, 12);
        await user.save();
        ctx.req.session.userId = user.id;
        return user;
    }
};
__decorate([
    Mutation(() => User, { nullable: true }),
    __param(0, Arg("data")),
    __param(1, Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ChangePasswordInput, Object]),
    __metadata("design:returntype", Promise)
], ChangePasswordResolver.prototype, "changePassword", null);
ChangePasswordResolver = __decorate([
    Resolver()
], ChangePasswordResolver);
export { ChangePasswordResolver };
//# sourceMappingURL=ChangePassword.resolver.js.map