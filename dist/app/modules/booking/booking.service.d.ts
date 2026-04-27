import { QueryResult } from "pg";
import { TBooking } from "./booking.interface";
export declare const bookingServices: {
    createBooking: (payload: TBooking, userId: number) => Promise<QueryResult>;
    getBookings: (user: any) => Promise<QueryResult<any>>;
    updateBooking: (bookingId: string, status: string, user: any) => Promise<QueryResult<any>>;
};
//# sourceMappingURL=booking.service.d.ts.map