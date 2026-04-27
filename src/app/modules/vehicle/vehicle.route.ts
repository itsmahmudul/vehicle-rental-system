import express from "express";
import { vehicleControllers } from "./vehicle.controller";
import { auth } from "../../middlewares/auth";

const router = express.Router();

// admin only
router.post("/", auth("admin"), vehicleControllers.createVehicle);

// public
router.get("/", vehicleControllers.getVehicles);

router.put("/:vehicleId", auth("admin"), vehicleControllers.updateVehicle);

export const vehicleRoutes = router;
