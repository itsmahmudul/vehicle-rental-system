import { TVehicle } from "./vehicle.interface";
import { QueryResult } from "pg";
export declare const vehicleServices: {
    createVehicle: (payload: TVehicle) => Promise<QueryResult>;
    getVehicles: () => Promise<QueryResult>;
    updateVehicle: (vehicleId: string, payload: Partial<TVehicle>) => Promise<QueryResult>;
    deleteVehicle: (vehicleId: string) => Promise<QueryResult>;
};
//# sourceMappingURL=vehicle.service.d.ts.map