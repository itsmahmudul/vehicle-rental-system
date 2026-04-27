import express from "express";
import { userControllers } from "./user.controller";
import { auth } from "../../middlewares/auth";

const router = express.Router();

router.post("/register", userControllers.createUser);
router.post("/login", userControllers.loginUser);

//temp
router.get("/me", auth("user", "admin"), (req, res) => {
  res.status(200).json({
    success: true,
    message: "Protected route working",
    data: req.user,
  });
});

export const userRoutes = router;