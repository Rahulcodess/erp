# ERP System

A full-stack ERP (Enterprise Resource Planning) and CRM Operations Portal developed as part of a Full Stack Developer case study. The application demonstrates secure authentication, role-based authorization, customer management, product management, inventory tracking, and a clean administrative dashboard using a modern TypeScript-based technology stack.

---

# Overview

This project simulates the day-to-day workflow of a small wholesale and distribution company by providing modules for customer management, product management, inventory operations, and role-based access control.

The application is designed with a RESTful backend architecture, a responsive frontend, and a PostgreSQL database managed through Prisma ORM.

---

# Features

## Authentication

- JWT-based Authentication
- Secure Login
- Protected API Routes
- Role-Based Authorization

### Supported Roles

- Admin
- Sales
- Warehouse

Each role has access only to the operations permitted by the system.

---

## Dashboard

- Administrative dashboard
- Quick navigation cards
- Responsive layout
- Logout functionality

---

## Customer Management

Implemented Features

- Add Customer
- Edit Customer
- Delete Customer
- View Customer List

Customer Information

- Customer Name
- Business Name
- Mobile Number
- Email
- GST Number
- Address
- Customer Type
- Customer Status

Role Restrictions

| Role | Access |
|------|--------|
| Admin | Full Access |
| Sales | View, Create, Edit |
| Warehouse | View Only |

---

## Product Management

Implemented Features

- Add Product
- Edit Product
- Delete Product
- View Product List

Product Information

- Product Name
- SKU
- Category
- Unit Price
- Current Stock
- Minimum Stock
- Warehouse Location

Role Restrictions

| Role | Access |
|------|--------|
| Admin | Full Access |
| Sales | View Only |
| Warehouse | View Only |

---

## Inventory Management

Implemented Features

### Stock In

- Select Product
- Update Quantity
- Reason for Stock Movement

### Stock Out

- Remove Stock
- Prevent Invalid Quantities
- Record Movement Reason

### Stock History

Tracks

- Product
- SKU
- Movement Type
- Quantity
- Reason
- Timestamp

Role Restrictions

| Role | Access |
|------|--------|
| Admin | Full Access |
| Warehouse | Full Access |
| Sales | View Only |

---

## Sales Challans

A placeholder module has been created.

The complete Sales Challan workflow described in the assignment has not yet been implemented.

---

# Technology Stack

## Frontend

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- Axios

## Backend

- Next.js API Routes
- Prisma ORM
- JWT Authentication
- REST API Architecture

## Database

- PostgreSQL
- Neon Database

---


# Installation

Clone the repository

```bash
git clone https://github.com/Rahulcodess/erp.git
```

Navigate to the project

```bash
cd erp
```

Install dependencies

```bash
npm install
```

Configure environment variables

Create a `.env` file in the project root and provide the required values.

Example

```env
DATABASE_URL=
JWT_SECRET=
```

Generate Prisma Client

```bash
npx prisma generate
```

Push the database schema

```bash
npx prisma db push
```

Run the application

```bash
npm run dev
```

Live link

```
https://erp-gray-psi.vercel.app
```

---


# Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@test.com | admin123 |
| Sales | sales@test.com | sales123 |
| Warehouse | warehouse@test.com | warehouse123 |
| Accounts | accounts@test.com | accounts123 |

# Architecture

- Frontend: Next.js App Router, React, Tailwind CSS , SchadCn
- Backend: Next.js API Routes
- Database: PostgreSQL (Neon)
- ORM: Prisma
- Authentication: JWT

---

# Assumptions

- JWT tokens are stored on the client after successful login.
- Role-based authorization is enforced on protected API endpoints.
- Inventory movements are recorded whenever stock is added or removed.
- Sales Challan module is currently a placeholder page.
- API Docs are present in ERP API.postman_collection
---

# Known Limitations

The following assignment requirements are not fully implemented:

- Sales Challan workflow
- Customer search
- Customer detail page
- Follow-up notes
- Pagination
- Product search/filter
- Deployment


# Author

**Sai Rahul**

Built as part of a Full Stack Developer assessment for Funds web  to demonstrate full-stack application development using Next.js, TypeScript, Prisma, PostgreSQL, and JWT-based authentication.
