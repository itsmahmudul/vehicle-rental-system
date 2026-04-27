import express from "express";
import { userControllers } from "./user.controller";

const router = express.Router();

router.post("/register", userControllers.createUser);
router.post("/login", userControllers.loginUser);

export const userRoutes = router;