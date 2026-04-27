"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const user_route_1 = require("./app/modules/user/user.route");
const vehicle_route_1 = require("./app/modules/vehicle/vehicle.route");
const booking_route_1 = require("./app/modules/booking/booking.route");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/api/v1/auth", user_route_1.userRoutes);
app.get("/", (req, res) => {
    res.send("Vehicle Rental System API is running");
});
app.use("/api/v1/vehicles", vehicle_route_1.vehicleRoutes);
app.use("/api/v1/bookings", booking_route_1.bookingRoutes);
exports.default = app;
//# sourceMappingURL=app.js.map