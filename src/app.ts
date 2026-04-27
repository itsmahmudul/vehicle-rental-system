import express, { Application, Request, Response } from "express";
import cors from "cors";
import { userRoutes } from "./app/modules/user/user.route";
import { vehicleRoutes } from "./app/modules/vehicle/vehicle.route";
import { bookingRoutes } from "./app/modules/booking/booking.route";

const app: Application = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/auth", userRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Vehicle Rental System API is running");
});

app.use("/api/v1/vehicles", vehicleRoutes);

app.use("/api/v1/bookings", bookingRoutes);

export default app;
