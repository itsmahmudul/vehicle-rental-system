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
exports.bookingServices = void 0;
const db_1 = require("../../config/db");
//create
const createBooking = (payload, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const vehicleResult = yield db_1.pool.query(`SELECT * FROM vehicles WHERE id = $1`, [payload.vehicle_id]);
    const vehicle = vehicleResult.rows[0];
    if (!vehicle) {
        throw new Error("Vehicle not found");
    }
    if (vehicle.availability_status === "booked") {
        throw new Error("Vehicle is already booked");
    }
    const startDate = new Date(payload.rent_start_date);
    const endDate = new Date(payload.rent_end_date);
    const diff = endDate.getTime() - startDate.getTime();
    const days = diff / (1000 * 60 * 60 * 24);
    if (days <= 0) {
        throw new Error("End date must be after start date");
    }
    const totalPrice = days * Number(vehicle.daily_rent_price);
    const result = yield db_1.pool.query(`
    INSERT INTO bookings 
    (user_id, vehicle_id, rent_start_date, rent_end_date, total_price, status)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *
    `, [
        userId,
        payload.vehicle_id,
        payload.rent_start_date,
        payload.rent_end_date,
        totalPrice,
        "active",
    ]);
    // vehicle booked
    yield db_1.pool.query(`
    UPDATE vehicles
    SET availability_status = 'booked'
    WHERE id = $1
    `, [payload.vehicle_id]);
    return result;
});
//get
const getBookings = (user) => __awaiter(void 0, void 0, void 0, function* () {
    if (user.role === "admin") {
        const result = yield db_1.pool.query(`
      SELECT 
        bookings.*,
        users.name AS customer_name,
        users.email AS customer_email,
        vehicles.vehicle_name,
        vehicles.registration_number
      FROM bookings
      JOIN users ON bookings.user_id = users.id
      JOIN vehicles ON bookings.vehicle_id = vehicles.id
    `);
        return result;
    }
    const result = yield db_1.pool.query(`
    SELECT 
      bookings.*,
      vehicles.vehicle_name,
      vehicles.registration_number,
      vehicles.type
    FROM bookings
    JOIN vehicles ON bookings.vehicle_id = vehicles.id
    WHERE bookings.user_id = $1
    `, [user.id]);
    return result;
});
//update
const updateBooking = (bookingId, status, user) => __awaiter(void 0, void 0, void 0, function* () {
    const bookingResult = yield db_1.pool.query(`SELECT * FROM bookings WHERE id = $1`, [bookingId]);
    const booking = bookingResult.rows[0];
    if (!booking) {
        throw new Error("Booking not found");
    }
    if (user.role === "customer" && booking.user_id !== user.id) {
        throw new Error("You can only update your own booking");
    }
    if (user.role === "customer" && status !== "cancelled") {
        throw new Error("Customer can only cancel booking");
    }
    if (user.role === "admin" && status !== "returned") {
        throw new Error("Admin can only mark booking as returned");
    }
    const result = yield db_1.pool.query(`
    UPDATE bookings
    SET status = $1
    WHERE id = $2
    RETURNING *
    `, [status, bookingId]);
    if (status === "cancelled" || status === "returned") {
        yield db_1.pool.query(`
      UPDATE vehicles
      SET availability_status = 'available'
      WHERE id = $1
      `, [booking.vehicle_id]);
    }
    return result;
});
exports.bookingServices = {
    createBooking,
    getBookings,
    updateBooking
};
//# sourceMappingURL=booking.service.js.map