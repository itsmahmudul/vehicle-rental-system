import { QueryResult } from "pg";
import { pool } from "../../config/db";
import { TBooking } from "./booking.interface";

const createBooking = async (
  payload: TBooking,
  userId: number,
): Promise<QueryResult> => {
  const vehicleResult = await pool.query(
    `SELECT * FROM vehicles WHERE id = $1`,
    [payload.vehicle_id],
  );

  const vehicle = vehicleResult.rows[0];

  if (!vehicle) {
    throw new Error("Vehicle not found");
  }

  if (!vehicle.availability) {
    throw new Error("Vehicle is not available");
  }

  const startDate = new Date(payload.start_date);
  const endDate = new Date(payload.end_date);

  const timeDifference = endDate.getTime() - startDate.getTime();
  const totalDays = timeDifference / (1000 * 60 * 60 * 24);

  if (totalDays <= 0) {
    throw new Error("End date must be after start date");
  }

  const totalCost = totalDays * Number(vehicle.daily_rent_price);

  const result = await pool.query(
    `
    INSERT INTO bookings (user_id, vehicle_id, start_date, end_date, total_cost, status)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *
    `,
    [
      userId,
      payload.vehicle_id,
      payload.start_date,
      payload.end_date,
      totalCost,
      "pending",
    ],
  );

  await pool.query(
    `
    UPDATE vehicles
    SET availability = false
    WHERE id = $1
    `,
    [payload.vehicle_id],
  );

  return result;
};

export const bookingServices: {
  createBooking: (payload: TBooking, userId: number) => Promise<QueryResult>;
} = {
  createBooking,
};
