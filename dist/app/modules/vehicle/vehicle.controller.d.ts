import { Request, Response } from "express";
export declare const vehicleControllers: {
    createVehicle: (req: Request, res: Response) => Promise<void>;
    getVehicles: (req: Request, res: Response) => Promise<void>;
    updateVehicle: (req: Request<{
        vehicleId: string;
    }>, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    deleteVehicle: (req: Request<{
        vehicleId: string;
    }>, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
};
//# sourceMappingURL=vehicle.controller.d.ts.map