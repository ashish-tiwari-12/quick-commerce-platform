# Quick Commerce Platform (Zomato Clone)

A full-stack quick commerce platform built with the MERN stack (MongoDB, Express, React, Node.js). This project provides a comprehensive solution for managing orders, products, and user accounts with a modern, responsive user interface.

## Tech Stack

### Frontend
- **Framework:** React 19 / Vite
- **Styling:** Tailwind CSS V4
- **State Management:** Redux Toolkit
- **Routing:** React Router DOM
- **Forms & Validation:** React Hook Form
- **UI Components:** React Icons, SweetAlert2, React Hot Toast
- **Payment & Integration:** Stripe.js
- **Other:** Axios, React Infinite Scroll Component, React Type Animation

### Backend
- **Runtime Environment:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB / Mongoose
- **Authentication:** JSON Web Tokens (JWT) & bcryptjs
- **Security:** Helmet, CORS
- **File Uploads:** Multer, Cloudinary
- **Email Services:** Resend, Nodemailer
- **Payments:** Stripe API
- **Logging:** Morgan

## Features

- **User Authentication:** Secure login and registration flows.
- **Product Management:** Complete catalog handling and display.
- **Shopping Cart & Checkout:** Seamless add-to-cart functionality.
- **Payment Integration:** Secure checkout process using Stripe.
- **Order Tracking:** Detailed order history and management.
- **Cloudinary Integration:** Efficient image hosting and optimization.
- **Email Notifications:** automated email delivery using Resend/Nodemailer.

## Prerequisites

- Node.js (v18 or above)
- MongoDB Connection URI
- Cloudinary Credentials
- Stripe API Keys
- Resend API Key

## Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone <your-repository-url>
   cd quick-commerce-platform
   ```

2. **Install dependencies:**
   From the root, navigate to both client and server:
   ```bash
   # In the root, server, and client directories:
   npm install
   ```

3. **Set up Environment Variables:**
   Create a `.env` file in the `server` directory and configure the necessary credentials:
   ```env
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   STRIPE_SECRET_KEY=your_stripe_secret
   RESEND_API_KEY=your_resend_key
   # Add other required environment variables
   ```
   Do the same for the `client` directory as needed (e.g., `VITE_STRIPE_PUBLIC_KEY`).

4. **Start the Development Servers:**
   
   **Server:**
   ```bash
   cd server
   npm run dev
   ```

   **Client:**
   ```bash
   cd client
   npm run dev
   ```

## License

This project is licensed under the ISC License.
