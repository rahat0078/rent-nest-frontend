# API Integration

This document maps the frontend features of **[RentNest](https://github.com/rahat0078/rent-nest-frontend)** to the backend REST API endpoints.

---

# Base URL

```text
https://rent-nest-topaz.vercel.app
```

---

# Authentication

| Feature | Method | Endpoint |
|---------|--------|----------|
| Register User | POST | `/auth/register` |
| Login User | POST | `/auth/login` |
| Get Current User | GET | `/auth/me` |

---

# Public APIs

## Categories

| Feature | Method | Endpoint |
|---------|--------|----------|
| Get All Categories | GET | `/category` |

## Properties

| Feature | Method | Endpoint |
|---------|--------|----------|
| Get All Properties | GET | `/properties?{query}` |
| Get Single Property | GET | `/properties/:id` |

---

# Admin Dashboard

## Users

| Feature | Method | Endpoint |
|---------|--------|----------|
| Get All Users | GET | `/admin/users` |
| Update User Status | PATCH | `/admin/users/:userId` |

## Properties

| Feature | Method | Endpoint |
|---------|--------|----------|
| Get All Properties | GET | `/admin/properties` |

## Rental Requests

| Feature | Method | Endpoint |
|---------|--------|----------|
| Get All Rental Requests | GET | `/admin/rentals` |

---

# Landlord Dashboard

## Property Management

| Feature | Method | Endpoint |
|---------|--------|----------|
| Create Property | POST | `/landlord/properties` |
| Get My Properties | GET | `/landlord/properties/me` |
| Update Property | PATCH | `/landlord/properties/:id` |

## Rental Requests

| Feature | Method | Endpoint |
|---------|--------|----------|
| Get Rental Requests | GET | `/landlord/rentals/requests` |
| Get Rental Request Details | GET | `/landlord/rentals/requests/:id` |
| Approve / Reject Rental Request | PATCH | `/landlord/rentals/requests/:id` |

---

# Tenant Dashboard

## Rental Requests

| Feature | Method | Endpoint |
|---------|--------|----------|
| Create Rental Request | POST | `/rentals` |
| Get My Rental Requests | GET | `/rentals/me` |
| Get Rental Request Statistics | GET | `/rentals/me/stats` |
| Get Rental Request Details | GET | `/rentals/me/:id` |

## Payments

| Feature | Method | Endpoint |
|---------|--------|----------|
| Create Payment Session | POST | `/payments/create` |
| Confirm Payment | POST | `/payments/confirm` |
| Get Payment History | GET | `/payments/me` |
| Get Payment Details | GET | `/payments/me/:id` |

## Reviews

| Feature | Method | Endpoint |
|---------|--------|----------|
| Create Review | POST | `/reviews` |

---

# Backend Repository

```text
https://github.com/rahat0078/rent-nest
```

---

# Frontend Integration Notes

- Authentication uses **JWT stored in HTTP-only cookies**.
- All protected API requests are sent with credentials.
- Role-based access is handled through **Next.js Middleware (proxy.ts)**.
- Stripe Checkout is used for payment redirection.
- API errors are displayed using toast notifications and inline validation messages.
- Forms are validated with **React Hook Form + Zod**.