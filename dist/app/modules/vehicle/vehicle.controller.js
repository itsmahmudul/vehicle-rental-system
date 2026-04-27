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
exports.vehicleControllers = void 0;
const vehicle_service_1 = require("./vehicle.service");
const createVehicle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield vehicle_service_1.vehicleServices.createVehicle(req.body);
        res.status(201).json({
            success: true,
            message: "Vehicle created successfully",
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
const getVehicles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield vehicle_service_1.vehicleServices.getVehicles();
        res.status(200).json({
            success: true,
            message: "Vehicles retrieved successfully",
            data: result.rows,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
});
const updateVehicle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { vehicleId } = req.params;
        const result = yield vehicle_service_1.vehicleServices.updateVehicle(vehicleId, req.body);
        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Vehicle not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Vehicle updated successfully",
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
const deleteVehicle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { vehicleId } = req.params;
        const result = yield vehicle_service_1.vehicleServices.deleteVehicle(vehicleId);
        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Vehicle not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Vehicle deleted successfully",
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
exports.vehicleControllers = {
    createVehicle,
    getVehicles,
    updateVehicle,
    deleteVehicle,
};
//# sourceMappingURL=vehicle.controller.js.map