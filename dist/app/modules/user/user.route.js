"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const auth_1 = require("../../middlewares/auth");
const router = express_1.default.Router();
router.post("/signup", user_controller_1.userControllers.createUser);
router.post("/signin", user_controller_1.userControllers.loginUser);
//temp
router.get("/me", (0, auth_1.auth)("user", "admin"), (req, res) => {
    res.status(200).json({
        success: true,
        message: "Protected route working",
        data: req.user,
    });
});
exports.userRoutes = router;
//# sourceMappingURL=user.route.js.map