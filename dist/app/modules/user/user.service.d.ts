import { TUser } from "./user.interface";
export declare const userServices: {
    createUser: (payload: TUser) => Promise<any>;
    loginUser: (payload: {
        email: string;
        password: string;
    }) => Promise<{
        token: string;
        user: {
            id: any;
            name: any;
            email: any;
            phone: any;
            role: any;
        };
    }>;
};
//# sourceMappingURL=user.service.d.ts.map