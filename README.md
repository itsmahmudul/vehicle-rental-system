# Vehicle Rental System API

A backend REST API for a Vehicle Rental System built with Node.js, Express, TypeScript, PostgreSQL, JWT authentication, and bcrypt password hashing.

## Features

- User signup and signin
- JWT based authentication
- Role based authorization: admin and customer
- Admin can create, update, delete vehicles
- Public users can view vehicles
- Customers can create bookings
- Admin can view all bookings
- Customers can view only their own bookings
- Booking price is calculated automatically
- Vehicle availability updates automatically when booked, cancelled, or returned

## Tech Stack

- Node.js
- Express.js
- TypeScript
- PostgreSQL
- JWT
- bcrypt
- dotenv
- cors
- pg

## Installation

```bash
npm install

## 🌐 Live API

The API is deployed on Vercel:

👉 https://vehicle-rental-system-eta-ten.vercel.app/

---

### 🔐 Auth

- **Signup**
  POST https://vehicle-rental-system-eta-ten.vercel.app/api/v1/auth/signup

- **Signin**
  POST https://vehicle-rental-system-eta-ten.vercel.app/api/v1/auth/signin

---

### 🚗 Vehicles

- **Get All Vehicles**
  GET https://vehicle-rental-system-eta-ten.vercel.app/api/v1/vehicles

- **Get Vehicle by ID**
  GET https://vehicle-rental-system-eta-ten.vercel.app/api/v1/vehicles/:vehicleId

- **Create Vehicle (Admin)**
  POST https://vehicle-rental-system-eta-ten.vercel.app/api/v1/vehicles

- **Update Vehicle (Admin)**
  PUT https://vehicle-rental-system-eta-ten.vercel.app/api/v1/vehicles/:vehicleId

- **Delete Vehicle (Admin)**
  DELETE https://vehicle-rental-system-eta-ten.vercel.app/api/v1/vehicles/:vehicleId

---

### 📅 Bookings

- **Create Booking**
  POST https://vehicle-rental-system-eta-ten.vercel.app/api/v1/bookings

- **Get Bookings (Role-based)**
  GET https://vehicle-rental-system-eta-ten.vercel.app/api/v1/bookings

- **Update Booking (Cancel / Return)**
  PUT https://vehicle-rental-system-eta-ten.vercel.app/api/v1/bookings/:bookingId

  ### ✏️ Update Examples

#### Update Vehicle (Admin)

PUT /api/v1/vehicles/:vehicleId

Body:
```json
{
  "vehicle_name": "Updated Car",
  "daily_rent_price": 60,
  "availability_status": "available"
}