# 🏡 RentNest Frontend

RentNest is a modern house rental platform built with **Next.js 16**, allowing tenants to discover rental properties, landlords to manage listings, and administrators to oversee the platform. This frontend application integrates with a RESTful backend API and provides role-based dashboards, authentication, payment integration, and a responsive user experience.

## 🚀 Live Demo

* **Frontend:** https://rent-nest-frontend-nu.vercel.app
* **Backend API:** https://rent-nest-topaz.vercel.app

---

## ✨ Features

### 🔐 Authentication

* User Registration & Login
* JWT Cookie Authentication
* Protected Routes
* Role-based Dashboard Redirection
* Secure Logout

### 🏠 Public Features

* Browse Rental Properties
* Property Details
* Search & Filtering
* Category Browsing
* Responsive UI
* Loading Skeletons

### 👤 Tenant Features

* Submit Rental Requests
* View Rental Request History
* Payment Integration (Stripe Checkout)
* Payment History
* Submit Property Reviews
* Tenant Dashboard

### 🏡 Landlord Features

* Dashboard Overview
* Create Property
* Update Property
* Manage Property Listings
* View Incoming Rental Requests
* Approve / Reject Rental Requests

### 🛠️ Admin Features

* Dashboard Overview
* Manage Users
* Ban / Activate Users
* Manage Property Categories

---

## 🛠️ Tech Stack

### Frontend

* Next.js 16 (App Router)
* TypeScript
* Tailwind CSS
* shadcn/ui
* React Hook Form
* Zod
* Native Fetch API
* Server Actions

### Backend

* Node.js
* Express.js
* Prisma ORM
* PostgreSQL
* JWT Authentication
* Stripe Payment

---

## 📂 Project Structure

```text
src/
│
├── app/
├── components/
├── lib/
├── providers/
├── schemas/
├── services/
├── types/
├── utils/
└── proxy.ts
```

---

## 🔒 Role-based Access

### Tenant

* Browse Properties
* Send Rental Requests
* Make Payments
* Submit Reviews

### Landlord

* Manage Properties
* Create & Update Listings
* Approve / Reject Rental Requests

### Admin

* Manage Users
* Manage Categories
* Monitor Platform

---

## 💳 Payment

The application integrates **Stripe Checkout** for secure online rental payments.

---

## ⚙️ Installation

Clone the repository:

```bash
git clone <repository-url>
```

Navigate to the project:

```bash
cd rentnest-frontend
```

Install dependencies:

```bash
npm install
```

Create a `.env.local` file and configure the required environment variables.

Run the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Start production server:

```bash
npm start
```

---

## 🌐 Environment Variables

Create a `.env.local` file and add the required variables.

Example:

```env
NEXT_PUBLIC_BASE_API=your_backend_api_url
```

---

## 📱 Responsive Design

The application is fully responsive and optimized for:

* Desktop
* Tablet
* Mobile

---

## ✅ Implemented Functionalities

* Authentication
* Role-based Authorization
* Protected Routes
* Property Management
* Rental Requests
* Stripe Payment Integration
* Reviews
* Dashboard for All Roles
* Form Validation
* Toast Notifications
* Error Handling
* Loading States

---

## 📖 API Integration

All frontend modules communicate with the backend using REST APIs.

> Detailed endpoint mapping is available in **[API_INTEGRATION.md](./API_INTEGRATION.md)**.

---

## 👨‍💻 Author

**Ruhul Amin Rahat**

---

## 📄 License

This project was developed for academic purposes as part of the Programming Hero Level-2 Web Development course.
