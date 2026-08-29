# Symptom Signal

Symptom Signal is a mobile-first chronic disease symptom tracker. It lets people securely record symptom events, rate their severity, add optional notes, and review the previous 30 days in a calendar.

## Features

- JWT-based registration and login with bcrypt password hashing
- Quick event logger with common symptoms and a custom-symptom option
- Required symptom name and 1–10 severity validation
- Optional notes
- 30-day calendar and a day-by-day event timeline
- Responsive, touch-friendly HTML/CSS/JavaScript interface

## Stack

- Frontend: vanilla JavaScript, HTML5, CSS3
- Backend: Node.js and Express
- Data: PostgreSQL
- Authentication: JSON Web Tokens and bcrypt

## Get started

1. Create a PostgreSQL database named `symptom_signal`.
2. Run the schema:

   ```bash
   psql -d symptom_signal -f db/schema.sql
   ```

3. Copy the environment template and set a secure JWT secret:

   ```bash
   cp .env.example .env
   ```

4. Install and run:

   ```bash
   npm install
   npm run dev
   ```

Open `http://localhost:3000`.

## Tests

Run the validation tests with:

```bash
npm test
```

## API

| Method | Endpoint | Description |
| --- | --- | --- |
| POST | `/api/auth/register` | Create an account |
| POST | `/api/auth/login` | Sign in and receive a JWT |
| GET | `/api/events?start=YYYY-MM-DD&end=YYYY-MM-DD` | Retrieve the current user’s events |
| POST | `/api/events` | Record a symptom event |

Protected routes require `Authorization: Bearer <token>`.
