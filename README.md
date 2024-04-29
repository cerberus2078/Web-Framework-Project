# Web Framework Project: Sunny Side Sandcastle Hotel Booking System

Welcome to the Sunny Side Sandcastle Hotel Booking System! This project serves as the backend framework for a hotel booking website designed for a fictional company called "Sunny Side Sandcastle". With this website, customers can browse available rooms and services, register for their stay, and cancel reservations if needed. Additionally, users receive email notifications upon completing the registration process, facilitated by the Nodemailer library.

Admin users have special privileges, allowing them to log in and access a dashboard where they can manage bookings. Admins can view a list of all users who have booked rooms, update their data, or delete users as necessary. Admins can also sign up for accounts if they do not already have one in the database.

## Contributers

- [Paananen Sara-Sofia](https://github.com/cerberus2078)
- [Quashigah Edem](https://github.com/KoblaQ)
- [Duhhanina Marika](https://github.com/marikadu)

## Tools and Technologies

### Frameworks and Libraries

- **Express**: Used as the web framework for Node.js to handle HTTP requests and routes.
- **Express Handlebars**: Used for server-side rendering of HTML templates.
- **Mongoose**: MongoDB object modeling tool designed to work in an asynchronous environment, used for data modeling and validation.
- **Nodemailer**: Library for sending emails from Node.js applications.
- **Nodemailer Express Handlebars**: Plugin for Nodemailer to use Handlebars templates for email rendering.
- **Express Validator**: Middleware for Express.js used for input validation.

### Database

- **MongoDB**: A NoSQL database used for storing application data.
- **dotenv**: Used for loading environment variables from a `.env` file into `process.env`.

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd web-framework-project
   ```

2. Initialize npm and install dependencies:
   ```bash
   npm init
   npm install nodemon --save-dev
   npm install express
   npm install express-handlebars
   npm install body-parser
   npm install nodemailer
   npm install nodemailer-express-handlebars
   npm install express-validator
   npm install mongoose
   npm install mongodb
   npm install dotenv
   ```

## USAGE

### Development

Start the server in development mode with automatic restart using nodemon:

```bash
npm run dev
```

## Folder Structure

- **Controllers**: Contains controller logic for handling routes and business logic.
- **models**: Contains MongoDB schema definitions and database operations.
- **public**: Stores static files such as CSS, images, and client-side JavaScript.
- **routes**: Defines application routes and route handlers.
- **views**: Plugin for Nodemailer to use Handlebars templates for email rendering.

## Accesibility:

The project consists of additional accesibility features. That includes: high contrast mode, keyboard navigation.

---

### Friendly reminder of what not to forget. (┬┬﹏┬┬)

![nodeJS](https://github.com/cerberus2078/Web-Framework-Project/assets/113843309/aaeb28c4-e0db-44d4-9e56-7bcc190f22b9)
