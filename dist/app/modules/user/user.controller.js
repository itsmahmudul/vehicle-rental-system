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
Object.defineProperty(exports, "__esModule", { value: true });
exports.userControllers = void 0;
const user_service_1 = require("./user.service");
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_service_1.userServices.createUser(req.body);
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: result.rows,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
            errors: err.message,
        });
    }
});
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_service_1.userServices.loginUser(req.body);
        res.status(200).json({
            success: true,
            message: "Login successful",
            data: {
                token: result.token,
                user: result.user,
            },
        });
    }
    catch (err) {
        res.status(401).json({
            success: false,
            message: err.message,
            errors: err.message,
        });
    }
});
exports.userControllers = {
    createUser,
    loginUser,
};
//# sourceMappingURL=user.controller.js.map