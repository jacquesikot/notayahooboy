"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const _ = __importStar(require("lodash"));
const client_1 = require("@prisma/client");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const constants_1 = require("../constants");
const prisma = new client_1.PrismaClient();
class UserService {
    findUser(user_params) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = yield prisma.user.findOne({
                where: { email_address: user_params.email_address },
            });
            return user;
        });
    }
    findUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = yield prisma.user.findOne({ where: { user_id: id } });
            return user;
        });
    }
    createUser(user_params) {
        return __awaiter(this, void 0, void 0, function* () {
            const salt = yield bcrypt_1.default.genSalt(10);
            user_params.password = yield bcrypt_1.default.hash(user_params.password, salt);
            let user = yield prisma.user.create({
                data: {
                    company_id: user_params.company_id,
                    user_unique_reference: user_params.user_unique_reference,
                    hustle_name: user_params.hustle_name,
                    fistname: user_params.firstname,
                    middlename: user_params.middlename,
                    lastname: user_params.lastname,
                    date_of_birth: new Date(user_params.date_of_birth),
                    mobile_number: user_params.mobile_number,
                    gender: user_params.gender,
                    email_address: user_params.email_address,
                    pin_code: user_params.pin_code,
                    ip_address: user_params.ip_address,
                    verified: 'false',
                    password: user_params.password,
                    date_created: new Date(user_params.date_created),
                },
            });
            return _.pick(user, ['user_id', 'firstname', 'lastname', 'email_address']);
        });
    }
    validatePassword(reqPassword, userPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            const validPassword = yield bcrypt_1.default.compare(reqPassword, userPassword);
            if (!validPassword)
                return false;
            return true;
        });
    }
    getToken(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = jsonwebtoken_1.default.sign({ user_id: id }, constants_1.JWT_KEY);
            return token.toString();
        });
    }
}
exports.default = UserService;
//# sourceMappingURL=UserService.js.map