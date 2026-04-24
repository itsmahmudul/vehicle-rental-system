import { pool } from "./db";

const testDB = async () => {
  try {
    const result = await pool.query("SELECT NOW()");
    console.log("Database created successfully", result.rows[0]);
  } catch (error) {
    console.log("Database connection failed", error);
  }
};

export default testDB;
