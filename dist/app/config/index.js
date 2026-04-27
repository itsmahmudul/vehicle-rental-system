"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.default = {
    port: process.env.PORT,
    database_url: process.env.DATABASE_URL,
    jwt_secret: process.env.JWT_SECRET,
    bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
};
//# sourceMappingURL=index.js.map