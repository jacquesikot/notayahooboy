"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateAuth = void 0;
const joi_1 = __importDefault(require("joi"));
const validateUser = (user) => {
    const schema = joi_1.default.object({
        company_id: joi_1.default.number().required(),
        user_unique_reference: joi_1.default.string().min(3).max(45).required(),
        hustle_name: joi_1.default.string().min(3).max(45).required(),
        firstname: joi_1.default.string().min(3).max(45),
        middlename: joi_1.default.string().min(3).max(45),
        lastname: joi_1.default.string().min(3).max(45).required(),
        date_of_birth: joi_1.default.required(),
        mobile_number: joi_1.default.string().min(3).max(45).required(),
        gender: joi_1.default.string().min(3).max(45).required(),
        email_address: joi_1.default.string().email().min(3).max(45).required(),
        pin_code: joi_1.default.string().min(3).max(45).required(),
        ip_address: joi_1.default.string().min(3).max(45).required(),
        verified: joi_1.default.string().min(3).max(45),
        date_created: joi_1.default.required(),
        password: joi_1.default.string().min(3).max(25).required(),
    });
    return schema.validate(user);
};
exports.validateAuth = (credential) => {
    const schema = joi_1.default.object({
        email_address: joi_1.default.string().min(5).max(255).required().email(),
        password: joi_1.default.string().min(3).max(255).required(),
    });
    return schema.validate(credential);
};
exports.default = validateUser;
//# sourceMappingURL=user.js.map