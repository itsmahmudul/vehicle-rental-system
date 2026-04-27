import express from "express";
import { auth } from "../../middlewares/auth";
import { bookingControllers } from "./booking.controller";

const router = express.Router();

router.post("/", auth("user", "admin"), bookingControllers.createBooking);

export const bookingRoutes = router;