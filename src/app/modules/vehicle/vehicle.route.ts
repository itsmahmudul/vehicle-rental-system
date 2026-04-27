import express from "express";
import { vehicleControllers } from "./vehicle.controller";
import { auth } from "../../middlewares/auth";

const router = express.Router();

// admin only
router.post("/", auth("admin"), vehicleControllers.createVehicle);

// public
router.get("/", vehicleControllers.getVehicles);

//update
router.put("/:vehicleId", auth("admin"), vehicleControllers.updateVehicle);

//delete
router.delete("/:vehicleId", auth("admin"), vehicleControllers.deleteVehicle);

export const vehicleRoutes = router;
