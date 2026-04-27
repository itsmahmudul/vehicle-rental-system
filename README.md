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