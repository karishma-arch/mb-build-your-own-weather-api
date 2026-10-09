-- Build Your Own Weather API

A REST API built using Node.js and Express that allows users to manage locations and access weather information.

## Features

* User registration and login
* Password reset with OTP verification
* Update user profile
* Add, view, and delete locations
* Get current weather
* Get hourly and daily forecasts
* Get weather alerts
* Set custom weather alerts

## Tech Stack

* Node.js
* Express.js
* PostgreSQL
* Drizzle ORM
* JWT Authentication
* OpenWeather API

## Installation

```bash
git clone YOUR_REPOSITORY_URL
cd weather-api
npm install
```

Create a `.env` file and add the required environment variables.

Start the development server:

```bash
npm run dev
```

## API Endpoints

| Method | Endpoint                      | Description               |
| ------ | ----------------------------- | ------------------------- |
| POST   | `/api/register`               | Register a user           |
| POST   | `/api/login`                  | Login                     |
| GET    | `/api/getme`                  | Get current user          |
| POST   | `/api/locations`              | Create a location         |
| GET    | `/api/getlocation`            | Get saved locations       |
| DELETE | `/api/locations/:id`          | Delete a location         |
| GET    | `/api/locations/:id/weather`  | Get current weather       |
| GET    | `/api/locations/:id/forecast` | Get weather forecast      |
| GET    | `/api/locations/:id/alerts`   | Get weather alerts        |
| POST   | `/api/alerts`                 | Set custom weather alerts |

Some endpoints require authentication.

## Environment Variables

Configure your database connection, JWT secret, and OpenWeather API key in your `.env` file.

## Purpose

This project was built to practice REST API development, authentication, database operations with Drizzle ORM, and external API integration.
