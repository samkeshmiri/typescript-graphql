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
import { v4 } from "uuid";
import { User } from "../../entity/User";
import { redis } from "../../redis";
import { sendEmail } from "../../utils/sendEmail";
import { forgetPasswordPrefix } from "../constants/redisprefixes";
let ForgotPasswordResolver = class ForgotPasswordResolver {
    async forgotPassword(email) {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return true;
        }
        const token = v4();
        await redis.set(forgetPasswordPrefix + token, user.id, "ex", 60 * 60 * 24);
        await sendEmail(email, `http://localhost:3000/user/change-password/${token}`);
        return true;
    }
};
__decorate([
    Mutation(() => Boolean),
    __param(0, Arg("email")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ForgotPasswordResolver.prototype, "forgotPassword", null);
ForgotPasswordResolver = __decorate([
    Resolver()
], ForgotPasswordResolver);
export { ForgotPasswordResolver };
//# sourceMappingURL=ForgotPassword.js.map