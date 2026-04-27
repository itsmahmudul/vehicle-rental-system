import { pool } from "../../config/db";
import { TVehicle } from "./vehicle.interface";
import { QueryResult } from "pg";

const createVehicle = async (
  payload: TVehicle
): Promise<QueryResult> => {
  const result = await pool.query(
    `
    INSERT INTO vehicles (name, type, registration_number, daily_rent_price, availability)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
    `,
    [
      payload.name,
      payload.type,
      payload.registration_number,
      payload.daily_rent_price,
      payload.availability ?? true,
    ]
  );

  return result;
};

const getVehicles = async (): Promise<QueryResult> => {
  const result = await pool.query(`SELECT * FROM vehicles`);
  return result;
};

export const vehicleServices: {
  createVehicle: (payload: TVehicle) => Promise<QueryResult>;
  getVehicles: () => Promise<QueryResult>;
} = {
  createVehicle,
  getVehicles,
};