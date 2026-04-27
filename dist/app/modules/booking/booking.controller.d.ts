import { Request, Response } from "express";
export declare const bookingControllers: {
    createBooking: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    getBookings: (req: Request, res: Response) => Promise<void>;
    updateBooking: (req: Request<{
        bookingId: string;
    }>, res: Response) => Promise<void>;
};
//# sourceMappingURL=booking.controller.d.ts.map