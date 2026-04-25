import bcrypt from "bcrypt";
import { QueryResult } from "pg";
import config from "../../config";
import { pool } from "../../config/db";
import { TUser } from "./user.interface";

type TCreateUserReturn = {
  id: number;
  name: string;
  email: string;
  role: string;
  created_at: Date;
};

const createUser = async (
  payload: TUser
): Promise<QueryResult<TCreateUserReturn>> => {
  const hashedPassword = await bcrypt.hash(
    payload.password,
    Number(config.bcrypt_salt_rounds)
  );

  const result = await pool.query<TCreateUserReturn>(
    `
    INSERT INTO users (name, email, password, role)
    VALUES ($1, $2, $3, $4)
    RETURNING id, name, email, role, created_at
    `,
    [payload.name, payload.email, hashedPassword, payload.role || "user"]
  );

  return result;
};

type TUserServices = {
  createUser: (payload: TUser) => Promise<QueryResult<TCreateUserReturn>>;
};

export const userServices: TUserServices = {
  createUser,
};