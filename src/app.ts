import express, { Application, Request, Response } from "express";
import cors from "cors";
import { userRoutes } from "./app/modules/user/user.route";
import { vehicleRoutes } from "./app/modules/vehicle/vehicle.route";

const app: Application = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", userRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Vehicle Rental System API is running");
});

app.use("/api/vehicles", vehicleRoutes);

export default app;
