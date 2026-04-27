"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("./db");
const createTables = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db_1.pool.query(`
            CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            name VARCHAR(50) NOT NULL,
            email VARCHAR(50) UNIQUE NOT NULL,
            password TEXT NOT NULL,
            role VARCHAR(20) DEFAULT 'user',\
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
            `);
        yield db_1.pool.query(`
      CREATE TABLE IF NOT EXISTS vehicles (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        type VARCHAR(50) NOT NULL,
        registration_number VARCHAR(100) UNIQUE NOT NULL,
        daily_rent_price NUMERIC(10, 2) NOT NULL,
        availability BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
        yield db_1.pool.query(`
      CREATE TABLE IF NOT EXISTS bookings (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        vehicle_id INTEGER REFERENCES vehicles(id) ON DELETE CASCADE,
        start_date DATE NOT NULL,
        end_date DATE NOT NULL,
        total_cost NUMERIC(10, 2),
        status VARCHAR(20) DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
        console.log("Tables created successfully");
    }
    catch (err) {
        console.log("Table connection failed", err);
    }
});
exports.default = createTables;
//# sourceMappingURL=createTables.js.map