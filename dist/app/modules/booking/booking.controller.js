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
exports.bookingControllers = void 0;
const booking_service_1 = require("./booking.service");
const createBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized user",
            });
        }
        const result = yield booking_service_1.bookingServices.createBooking(req.body, Number(userId));
        res.status(201).json({
            success: true,
            message: "Booking created successfully",
            data: result.rows[0],
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
});
const getBookings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const result = yield booking_service_1.bookingServices.getBookings(req.user);
        res.status(200).json({
            success: true,
            message: ((_a = req.user) === null || _a === void 0 ? void 0 : _a.role) === "admin"
                ? "Bookings retrieved successfully"
                : "Your bookings retrieved successfully",
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
const updateBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookingId } = req.params;
        const { status } = req.body;
        const result = yield booking_service_1.bookingServices.updateBooking(bookingId, status, req.user);
        res.status(200).json({
            success: true,
            message: status === "returned"
                ? "Booking marked as returned. Vehicle is now available"
                : "Booking cancelled successfully",
            data: result.rows[0],
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
exports.bookingControllers = {
    createBooking,
    getBookings,
    updateBooking,
};
//# sourceMappingURL=booking.controller.js.map