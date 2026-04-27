import { Request, Response } from "express";
import { bookingServices } from "./booking.service";

const createBooking = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized user",
      });
    }

    const result = await bookingServices.createBooking(
      req.body,
      Number(userId),
    );

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: result.rows[0],
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getBookings = async (req: Request, res: Response) => {
  try {
    const result = await bookingServices.getBookings(req.user);

    res.status(200).json({
      success: true,
      message:
        req.user?.role === "admin"
          ? "Bookings retrieved successfully"
          : "Your bookings retrieved successfully",
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

const updateBooking = async (
  req: Request<{ bookingId: string }>,
  res: Response,
) => {
  try {
    const { bookingId } = req.params;
    const { status } = req.body;

    const result = await bookingServices.updateBooking(
      bookingId,
      status,
      req.user,
    );

    res.status(200).json({
      success: true,
      message:
        status === "returned"
          ? "Booking marked as returned. Vehicle is now available"
          : "Booking cancelled successfully",
      data: result.rows[0],
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
      errors: err.message,
    });
  }
};

export const bookingControllers = {
  createBooking,
  getBookings,
  updateBooking,
};
