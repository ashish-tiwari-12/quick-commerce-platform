# Ashivo — Quick Commerce Platform ⚡

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Ashivo%20App-7C3AED?style=for-the-badge&logo=vercel&logoColor=white)](https://quick-commerce-platform-4ed7.vercel.app/)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg?style=for-the-badge)](https://opensource.org/licenses/ISC)

> **Live Application URL:** [https://quick-commerce-platform-4ed7.vercel.app/](https://quick-commerce-platform-4ed7.vercel.app/)

A full-stack instant grocery delivery quick-commerce web application built with the MERN stack (MongoDB, Express.js, React 19, Node.js). **Ashivo** provides an end-to-end e-commerce experience featuring 10-minute grocery delivery workflows, OTP-based secure email verification, category-wise catalog management, Stripe payments, and an administrative control panel.

---

## 🚀 Live Demo

Experience the live deployed application:
🔗 **[https://quick-commerce-platform-4ed7.vercel.app/](https://quick-commerce-platform-4ed7.vercel.app/)**

---

## ✨ Key Features

- **⚡ Instant Quick-Commerce Experience:** High-speed responsive UI with sub-second catalog browsing and instant cart management.
- **✉️ Secure 6-Digit OTP Email Verification:** Inline email verification via Nodemailer and branded Ashivo HTML email cards before account activation.
- **🛒 Shopping Cart & Dynamic Checkout:** Real-time quantity steppers, price breakdowns, and delivery address selection.
- **💳 Stripe Payment Gateway & Webhooks:** Secure online payments with asynchronous webhook reconciliation.
- **📦 Category & Product Discovery:** Multi-tiered categories, subcategories, search with live debounce, and infinite scrolling.
- **🛡️ Admin Dashboard:** Complete vendor and admin panel for managing product catalogs, categories, inventory, and user orders.
- **🔐 Double Token Authentication:** JWT Access Tokens and Refresh Tokens stored securely in HTTP-Only cookies with bcrypt password encryption.
- **☁️ Cloudinary Asset Pipeline:** Automatic image optimization and cloud storage for product and category assets.

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** React 19 / Vite
- **Styling:** Tailwind CSS V4
- **State Management:** Redux Toolkit
- **Routing:** React Router DOM
- **Forms & Validation:** React Hook Form
- **UI & Icons:** React Icons, React Hot Toast, SweetAlert2
- **Payments:** Stripe.js
- **Network Client:** Axios (with automatic token refresh interceptors)

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB & Mongoose (with automated TTL OTP index)
- **Authentication:** JSON Web Tokens (JWT) & bcryptjs
- **Security:** Helmet, CORS, Cookie Parser
- **File Uploads:** Multer & Cloudinary SDK
- **Email Service:** Nodemailer (with custom Ashivo card templates)
- **Payments:** Stripe API & Webhook handler

---

## 📂 Project Structure

```
quick-commerce-platform/
├── client/                 # React frontend application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Application views (Home, Login, Register, Cart, etc.)
│   │   ├── store/          # Redux Toolkit state slices
│   │   ├── common/         # API routes & configurations
│   │   └── utils/          # Helper utilities & Axios interceptors
│   └── package.json
│
├── server/                 # Express.js backend API
│   ├── config/             # Database & email configurations
│   ├── controllers/        # Route controllers (user, product, order, etc.)
│   ├── middleware/         # Auth, Multer, & validation middlewares
│   ├── models/             # Mongoose schemas (user, product, order, otp, etc.)
│   ├── routes/             # Express API endpoints
│   ├── utils/              # Email templates, OTP generators, & token helpers
│   └── package.json
└── README.md
```

---

## ⚙️ Installation & Local Setup

### 1. Clone the repository:
```bash
git clone https://github.com/ashish-tiwari-12/quick-commerce-platform.git
cd quick-commerce-platform
```

### 2. Install dependencies:
```bash
# Install root, server, and client dependencies
npm install
cd server && npm install
cd ../client && npm install
```

### 3. Configure Environment Variables:

Create a `.env` file in the `server` directory:
```env
PORT=8080
FRONTEND_URL=http://localhost:5173
mongodb_url=your_mongodb_connection_string
SECRET_KEY_ACCESS_TOKEN=your_access_token_secret
SECRET_KEY_REFRESH_TOKEN=your_refresh_token_secret

# Cloudinary
CLODINARY_CLOUD_NAME=your_cloud_name
CLODINARY_API_KEY=your_api_key
CLODINARY_API_SECRET_KEY=your_api_secret

# Email (Nodemailer)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password

# Stripe
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_ENDPOINT_WEBHOOK_SECRET_KEY=your_stripe_webhook_secret
```

Create a `.env` file in the `client` directory:
```env
VITE_APP_URL=http://localhost:8080
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
```

### 4. Run Locally:

**Start Backend Server:**
```bash
cd server
npm start
```

**Start Frontend Development Server:**
```bash
cd client
npm run dev
```

Visit `http://localhost:5173` in your browser.

---

## 📄 License

This project is licensed under the ISC License.
