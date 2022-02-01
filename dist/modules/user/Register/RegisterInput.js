var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IsEmail, Length } from "class-validator";
import { Field, InputType } from "type-graphql";
import { PasswordInput } from "../../shared/PasswordInput";
let RegisterInput = class RegisterInput extends PasswordInput {
};
__decorate([
    Field(),
    Length(1, 255),
    __metadata("design:type", String)
], RegisterInput.prototype, "firstName", void 0);
__decorate([
    Field(),
    Length(1, 255),
    __metadata("design:type", String)
], RegisterInput.prototype, "lastName", void 0);
__decorate([
    Field(),
    IsEmail({}),
    __metadata("design:type", String)
], RegisterInput.prototype, "email", void 0);
RegisterInput = __decorate([
    InputType()
], RegisterInput);
export { RegisterInput };
//# sourceMappingURL=RegisterInput.js.map