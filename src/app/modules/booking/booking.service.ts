import { QueryResult } from "pg";
import { pool } from "../../config/db";
import { TBooking } from "./booking.interface";


//create
const createBooking = async (
  payload: TBooking,
  userId: number
): Promise<QueryResult> => {
  const vehicleResult = await pool.query(
    `SELECT * FROM vehicles WHERE id = $1`,
    [payload.vehicle_id]
  );

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

  const result = await pool.query(
    `
    INSERT INTO bookings 
    (user_id, vehicle_id, rent_start_date, rent_end_date, total_price, status)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *
    `,
    [
      userId,
      payload.vehicle_id,
      payload.rent_start_date,
      payload.rent_end_date,
      totalPrice,
      "active",
    ]
  );

  // vehicle booked
  await pool.query(
    `
    UPDATE vehicles
    SET availability_status = 'booked'
    WHERE id = $1
    `,
    [payload.vehicle_id]
  );

  return result;
};


//get
const getBookings = async (user: any) => {
  if (user.role === "admin") {
    const result = await pool.query(`
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

  const result = await pool.query(
    `
    SELECT 
      bookings.*,
      vehicles.vehicle_name,
      vehicles.registration_number,
      vehicles.type
    FROM bookings
    JOIN vehicles ON bookings.vehicle_id = vehicles.id
    WHERE bookings.user_id = $1
    `,
    [user.id]
  );

  return result;
};

export const bookingServices = {
  createBooking,
  getBookings
};