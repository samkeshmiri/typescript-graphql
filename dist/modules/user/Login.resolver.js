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
import bcrypt from 'bcryptjs';
import { User } from "../../entity/User";
let LoginResolver = class LoginResolver {
    async login(email, password, ctx) {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return null;
        }
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            return null;
        }
        if (!user.confirmed) {
            return null;
        }
        ctx.req.session.userId = user.id;
        return user;
    }
};
__decorate([
    Mutation(() => User, { nullable: true }),
    __param(0, Arg("email")),
    __param(1, Arg("password")),
    __param(2, Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], LoginResolver.prototype, "login", null);
LoginResolver = __decorate([
    Resolver()
], LoginResolver);
export { LoginResolver };
//# sourceMappingURL=Login.resolver.js.map