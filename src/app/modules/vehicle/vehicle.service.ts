import { pool } from "../../config/db";
import { TVehicle } from "./vehicle.interface";
import { QueryResult } from "pg";

//create
const createVehicle = async (payload: TVehicle): Promise<QueryResult> => {
  const result = await pool.query(
    `
    INSERT INTO vehicles (vehicle_name, type, registration_number, daily_rent_price, availability_status)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
    `,
    [
      payload.vehicle_name,
      payload.type,
      payload.registration_number,
      payload.daily_rent_price,
      payload.availability_status || "available",
    ],
  );

  return result;
};

//get
const getVehicles = async (): Promise<QueryResult> => {
  const result = await pool.query(`SELECT * FROM vehicles`);
  return result;
};

//Update
const updateVehicle = async (vehicleId: string, payload: Partial<TVehicle>) => {
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

  const result = await pool.query(
    `
    UPDATE vehicles
    SET ${fields.join(", ")}
    WHERE id = $${index}
    RETURNING *
    `,
    values,
  );

  return result;
};

//delete
const deleteVehicle = async (vehicleId: string) => {
  const activeBooking = await pool.query(
    `
    SELECT * FROM bookings
    WHERE vehicle_id = $1 AND status = 'active'
    `,
    [vehicleId]
  );

  if (activeBooking.rows.length > 0) {
    throw new Error("Cannot delete vehicle with active bookings");
  }

  const result = await pool.query(
    `
    DELETE FROM vehicles
    WHERE id = $1
    RETURNING *
    `,
    [vehicleId]
  );

  return result;
};

export const vehicleServices: {
  createVehicle: (payload: TVehicle) => Promise<QueryResult>;
  getVehicles: () => Promise<QueryResult>;
  updateVehicle: (
    vehicleId: string,
    payload: Partial<TVehicle>,
  ) => Promise<QueryResult>;
  deleteVehicle: (vehicleId: string) => Promise<QueryResult>;
} = {
  createVehicle,
  getVehicles,
  updateVehicle,
  deleteVehicle,
};
