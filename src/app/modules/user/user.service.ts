import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../../config";
import { pool } from "../../config/db";
import { TUser } from "./user.interface";

const createUser = async (payload: TUser) => {
  const hashedPassword = await bcrypt.hash(
    payload.password,
    Number(config.bcrypt_salt_rounds)
  );

  const result = await pool.query(
    `
    INSERT INTO users (name, email, password, phone, role)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id, name, email, phone, role
    `,
    [
      payload.name,
      payload.email,
      hashedPassword,
      payload.phone,
      payload.role || "customer",
    ]
  );

  return result.rows[0];
};

const loginUser = async (payload: { email: string; password: string }) => {
  const result = await pool.query(
    `
    SELECT * FROM users
    WHERE email = $1
    `,
    [payload.email]
  );

  const user = result.rows[0];

  if (!user) {
    throw new Error("User not found");
  }

  const isPasswordMatched = await bcrypt.compare(
    payload.password,
    user.password
  );

  if (!isPasswordMatched) {
    throw new Error("Password is incorrect");
  }

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    config.jwt_secret as string,
    {
      expiresIn: "7d",
    }
  );

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
    },
  };
};

export const userServices = {
  createUser,
  loginUser,
};