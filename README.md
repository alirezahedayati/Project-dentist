# Dr. Azadeh Mehrdad Dental Website | Nuxt 3

A standalone project built with Nuxt 3 + TypeScript + Tailwind CSS + Nitro API + PostgreSQL, featuring a fully Persian, right-to-left (RTL) interface.

The project was developed based on the original requirements, using suitable images and assets from the provided Vue/Vite/PHP project.

## Implemented Features

- Responsive Public Website: Includes a homepage, dynamic service pages, doctor profile, contact information and directions, frequently asked questions (FAQ), Persian SEO optimization, and a floating appointment button for mobile users.
- Fully Functional Appointment Booking: Patients can select a service and its duration, choose a date using the Persian (Jalali) calendar, and view available time slots based on weekly schedules, holidays, existing appointments, and time zone settings. The process also includes patient information, booking confirmation, and a randomly generated tracking code.
- Database-Level Double-Booking Prevention: PostgreSQL uses `EXCLUDE USING gist (tstzrange(...))` to prevent overlapping active appointments. This ensures that even two simultaneous booking requests cannot reserve overlapping time slots. Service duration is also taken into account.
- Appointment Management for Patients: Patients can track, cancel, or reschedule appointments using their tracking code and mobile number, subject to the cancellation deadline configured in the admin dashboard.
- Admin Dashboard: Includes secure authentication with bcrypt-hashed passwords, database-backed sessions using `HttpOnly` cookies, rate limiting for failed login attempts, appointment statistics, filtering, daily and weekly calendar views, appointment status management, time adjustments, and tools for managing services, weekly schedules, holidays, and website information.
- SMS Integration: Includes a configurable SMS gateway that can connect to a custom SMS provider, along with a reminder script designed for scheduled execution.

## Important Project Notes

> Current Project Limitations: Appointment booking and the admin dashboard require a properly configured and running PostgreSQL database.
>
> SMS notifications will only work after configuring the SMS provider and adapting the API integration to match your provider's requirements.
>
> Online deposit payments and Progressive Web App (PWA) functionality are not enabled in this version.
>
> The included dental-related images are placeholders and should not be considered actual photographs of the doctor.
>
> The doctor's professional background, real clinic address, and contact number have not yet been provided and should be completed through the admin dashboard.

## Local Setup

Requirements: Node.js 20.11 or later, npm, and Docker (or PostgreSQL 15/16).

Run the following commands:

```
cp .env.example .env
```

Edit the `.env` file and configure `DATABASE_URL`, `ADMIN_EMAIL`, and `ADMIN_PASSWORD`.

Make sure the database password in `DATABASE_URL` matches `POSTGRES_PASSWORD` in your Docker Compose configuration.

Then run:

```
docker compose up -d db
npm install
npm run db:setup
npm run dev
```

Once the project is running, you can access:

- Website: `http://localhost:3000`
- Admin Login: `http://localhost:3000/admin/login`

For example, if your Docker database password is `change-me`, your database connection string would look like this:

```
DATABASE_URL=postgresql://dentist:change-me@localhost:5432/dentist
```

Important: Always use a strong, unique password in production. The example `ADMIN_PASSWORD` is not intended for actual use. Set a secure password containing at least 12 characters.

### Production Build

To build and run the application in production:

```
npm run build
node .output/server/index.mjs
```

All website information is loaded directly from the database rather than a mock data file.

During initial setup, eight sample dental services are added through `database/schema.sql`.

Running the setup process again will not delete existing records. If other service records already exist, the eight sample services will not be inserted again.

### Running Tests

After setting up PostgreSQL, you can run the calendar integration tests and database overlap-prevention tests using:

```
npm run test:core
```

These tests run inside a temporary database transaction and use `ROLLBACK` afterward, ensuring that test changes are not permanently saved.

For additional confidence, browser-based end-to-end testing is also recommended before launching the website publicly.

## SMS Configuration

To connect your SMS provider, add the following values to your `.env` file:

```
SMS_API_URL=https://sms-provider.example/api/send
SMS_API_KEY=YOUR_PROVIDER_KEY
SMS_SENDER=YOUR_SENDER_ID
```

The current integration expects your SMS provider to support a `POST` request with the following authorization header:

```
Authorization: Bearer <SMS_API_KEY>
```

The request body should follow this JSON format:

```
{
  "to": "0912...",
  "message": "...",
  "sender": "..."
}
```

The provider should return an HTTP `2xx` response to indicate success.

Please note: Most Iranian SMS providers use different API structures or authentication methods.

If your provider has a different API format, you will need to adjust these files according to its documentation:

- `server/utils/sms.ts`
- `scripts/reminders.mjs`

The SMS integration is not an openly accessible, anonymous API. It requires a properly configured server-side API key.

### Automated Appointment Reminders

To send reminders for appointments scheduled within the next 2 to 24 hours, configure a cron job to run the reminder script every hour:

```
0 * * * * cd /srv/dentist-nuxt && /usr/bin/npm run reminders >> /var/log/dentist-reminders.log 2>&1
```

After a reminder is successfully sent, the database records its status to prevent the next scheduled run from sending the same notification again.

However, if a network issue makes it unclear whether the SMS provider received the request, another attempt may occur.

For reliable protection against duplicate messages, using the SMS provider's idempotency key mechanism is recommended.

## Security and Deployment Recommendations

1. Use HTTPS and a Secure Reverse Proxy: Deploy the application behind HTTPS and a properly configured reverse proxy. In production, configure:
   ```
   SESSION_COOKIE_SECURE=true
   NUXT_PUBLIC_SITE_URL=https://your-domain.com
   ```
2. Protect Your Database: Schedule regular encrypted database backups, restrict database access to private connections, and keep admin credentials securely stored outside the source code repository.
3. Respect Patient Privacy: Collect only the personal information necessary for appointment booking. Prepare a customized privacy policy covering data storage, retention, deletion, and compliance with the regulations applicable to the clinic's location.
4. Configure IP Handling Securely: Ensure the application receives the actual client IP address only through a trusted reverse proxy. If needed, apply additional global rate limiting at the proxy level.
5. Deposit Payment Integration: Online deposit payments have not yet been implemented. A disabled placeholder field has been included to support future development.
6. Legacy Database Migration: Appointments from the previous project's MariaDB database have not been imported automatically. The original records contain `reserved_for = NULL` values, so proper data cleanup and date/time mapping are required before performing a real migration.
7. Default Clinic Working Hours: The initial schedule is provided for demonstration purposes:
   - Saturday to Wednesday: 9:00 AM – 5:00 PM
   - Thursday: 9:00 AM – 1:00 PM
   - Friday: Closed
   These hours should be updated through the admin dashboard to reflect the clinic's actual working schedule.

## Project Structure

```
pages/
# Public pages and admin dashboard

components/
# Persian calendar, service cards, navigation, and shared UI components

layouts/
# Public website layout and admin dashboard layout

server/api/public/
# Booking, available time slots, and appointment tracking APIs

server/api/admin/
# Authentication, appointments, services, holidays, and settings APIs

server/utils/
# Database connection, validation, booking logic, and SMS utilities

database/schema.sql
# Database tables, overlap prevention, and initial services

scripts/setup.mjs
# Database initialization and admin account setup

scripts/reminders.mjs
# Cron-based SMS appointment reminders

public/images/
# Optimized placeholder images from the original project
```

## Future Improvements and Integration Opportunities

The project is designed to support future enhancements, including:

- Online Deposit Payments: Add payment orders, secure webhook handling, and payment verification before confirming appointments.
- Iranian SMS Provider Integration: Adapt the existing SMS integration to work with the API of the clinic's preferred local SMS provider.
- Progressive Web App (PWA): Add PWA functionality using a suitable Nuxt module, allowing public static assets to be cached while ensuring that sensitive patient information and admin dashboard data are never cached.
- Accessibility and Cross-Browser Improvements: Perform final mobile browser checks, screen-reader testing, and real-browser end-to-end testing before the public launch.

Overall, the project provides a solid foundation for a modern, Persian-language dental clinic website, featuring a functional appointment booking system, a secure admin dashboard, and a scalable architecture ready for further customization and production deployment.
