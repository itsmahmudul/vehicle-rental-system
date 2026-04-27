import express from "express";
import { auth } from "../../middlewares/auth";
import { bookingControllers } from "./booking.controller";

const router = express.Router();

router.post("/", auth("user", "admin"), bookingControllers.createBooking);

router.get("/", auth("admin", "customer"), bookingControllers.getBookings);

router.put("/:bookingId", auth("admin", "customer"), bookingControllers.updateBooking);

export const bookingRoutes = router;