import { Request, Response } from "express";
import { userServices } from "./user.service";

const createUser = async (req: Request, res: Response) => {
  try {
    const result = await userServices.createUser(req.body);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: result.rows,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
      errors: err.message,
    });
  }
};

const loginUser = async (req: Request, res: Response) => {
  try {
    const result = await userServices.loginUser(req.body);

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        token: result.token,
        user: result.user,
      },
    });
  } catch (err: any) {
    res.status(401).json({
      success: false,
      message: err.message,
      errors: err.message,
    });
  }
};

export const userControllers = {
  createUser,
  loginUser,
};
