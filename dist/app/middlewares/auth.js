"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const auth = (...requiredRoles) => {
    return (req, res, next) => {
        try {
            const token = req.headers.authorization;
            if (!token) {
                return res.status(401).json({
                    success: false,
                    message: "You are not authorized",
                });
            }
            // Bearer token remove
            const splitToken = token.split(" ")[1];
            if (!splitToken) {
                return res.status(401).json({
                    success: false,
                    message: "Invalid token format",
                });
            }
            const decoded = jsonwebtoken_1.default.verify(splitToken, config_1.default.jwt_secret);
            if (requiredRoles.length &&
                !requiredRoles.includes(decoded.role)) {
                return res.status(403).json({
                    success: false,
                    message: "Forbidden access",
                });
            }
            req.user = decoded;
            next();
        }
        catch (error) {
            return res.status(401).json({
                success: false,
                message: "Invalid token",
            });
        }
    };
};
exports.auth = auth;
//# sourceMappingURL=auth.js.map