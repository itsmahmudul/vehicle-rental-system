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
exports.vehicleServices = void 0;
const db_1 = require("../../config/db");
//create
const createVehicle = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_1.pool.query(`
    INSERT INTO vehicles (vehicle_name, type, registration_number, daily_rent_price, availability_status)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
    `, [
        payload.vehicle_name,
        payload.type,
        payload.registration_number,
        payload.daily_rent_price,
        payload.availability_status || "available",
    ]);
    return result;
});
//get
const getVehicles = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_1.pool.query(`SELECT * FROM vehicles`);
    return result;
});
//Update
const updateVehicle = (vehicleId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const fields = [];
    const values = [];
    let index = 1;
    if (payload.vehicle_name) {
        fields.push(`vehicle_name = $${index++}`);
        values.push(payload.vehicle_name);
    }
    if (payload.type) {
        fields.push(`type = $${index++}`);
        values.push(payload.type);
    }
    if (payload.registration_number) {
        fields.push(`registration_number = $${index++}`);
        values.push(payload.registration_number);
    }
    if (payload.daily_rent_price) {
        fields.push(`daily_rent_price = $${index++}`);
        values.push(payload.daily_rent_price);
    }
    if (payload.availability_status) {
        fields.push(`availability_status = $${index++}`);
        values.push(payload.availability_status);
    }
    if (fields.length === 0) {
        throw new Error("No fields provided for update");
    }
    values.push(vehicleId);
    const result = yield db_1.pool.query(`
    UPDATE vehicles
    SET ${fields.join(", ")}
    WHERE id = $${index}
    RETURNING *
    `, values);
    return result;
});
//delete
const deleteVehicle = (vehicleId) => __awaiter(void 0, void 0, void 0, function* () {
    const activeBooking = yield db_1.pool.query(`
    SELECT * FROM bookings
    WHERE vehicle_id = $1 AND status = 'active'
    `, [vehicleId]);
    if (activeBooking.rows.length > 0) {
        throw new Error("Cannot delete vehicle with active bookings");
    }
    const result = yield db_1.pool.query(`
    DELETE FROM vehicles
    WHERE id = $1
    RETURNING *
    `, [vehicleId]);
    return result;
});
exports.vehicleServices = {
    createVehicle,
    getVehicles,
    updateVehicle,
    deleteVehicle,
};
//# sourceMappingURL=vehicle.service.js.map