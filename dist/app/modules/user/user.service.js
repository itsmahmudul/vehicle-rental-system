"use strict";
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
exports.userServices = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
const db_1 = require("../../config/db");
const createUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const hashedPassword = yield bcrypt_1.default.hash(payload.password, Number(config_1.default.bcrypt_salt_rounds));
    const result = yield db_1.pool.query(`
    INSERT INTO users (name, email, password, phone, role)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id, name, email, phone, role
    `, [
        payload.name,
        payload.email,
        hashedPassword,
        payload.phone,
        payload.role || "customer",
    ]);
    return result.rows[0];
});
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_1.pool.query(`
    SELECT * FROM users
    WHERE email = $1
    `, [payload.email]);
    const user = result.rows[0];
    if (!user) {
        throw new Error("User not found");
    }
    const isPasswordMatched = yield bcrypt_1.default.compare(payload.password, user.password);
    if (!isPasswordMatched) {
        throw new Error("Password is incorrect");
    }
    const token = jsonwebtoken_1.default.sign({
        id: user.id,
        email: user.email,
        role: user.role,
    }, config_1.default.jwt_secret, {
        expiresIn: "7d",
    });
    return {
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role,
        },
    };
});
exports.userServices = {
    createUser,
    loginUser,
};
//# sourceMappingURL=user.service.js.map