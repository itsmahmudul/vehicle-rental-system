"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.vehicleRoutes = void 0;
const express_1 = __importDefault(require("express"));
const vehicle_controller_1 = require("./vehicle.controller");
const auth_1 = require("../../middlewares/auth");
const router = express_1.default.Router();
// admin only
router.post("/", (0, auth_1.auth)("admin"), vehicle_controller_1.vehicleControllers.createVehicle);
// public
router.get("/", vehicle_controller_1.vehicleControllers.getVehicles);
//update
router.put("/:vehicleId", (0, auth_1.auth)("admin"), vehicle_controller_1.vehicleControllers.updateVehicle);
//delete
router.delete("/:vehicleId", (0, auth_1.auth)("admin"), vehicle_controller_1.vehicleControllers.deleteVehicle);
exports.vehicleRoutes = router;
//# sourceMappingURL=vehicle.route.js.map