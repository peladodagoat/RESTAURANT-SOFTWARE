# RESTAURANT-SOFTWARE
This is a software for restaurants in order to generate an automation in their order process
# 🍽️ RestaurantOS — Automated Order Management System

> A full-stack restaurant automation platform that streamlines the entire order lifecycle — from customer selection to chef fulfillment — with real-time updates, smart analytics, and seamless payment integration.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [Pages & Modules](#pages--modules)
  - [User Page — Customer Menu Interface](#user-page--customer-menu-interface)
  - [Admin Page — Chef & Operations Dashboard](#admin-page--chef--operations-dashboard)
- [Order Flow](#order-flow)
- [Payment Integration](#payment-integration)
- [Analytics & Reporting](#analytics--reporting)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Folder Structure](#folder-structure)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

**RestaurantOS** is a modern, real-time restaurant management system designed to eliminate paper menus, reduce order errors, and give chefs complete visibility over every table — all from a single, unified platform.

Customers browse the menu, build their order, and pay digitally or at the counter. Orders appear instantly on the Chef Admin Dashboard, where staff can track status, monitor revenue, and identify the most popular dishes — all in real time.

---

## Features

### 👤 Customer-Facing (User Page)
- 📖 Interactive digital menu with categories, descriptions, and images
- ➕ Add/remove items with a live order summary
- 💬 Special instructions per item
- 💳 Pay via **Apple Pay** or choose **Pay at Counter**
- ✅ Order confirmation screen with estimated wait time

### 👨‍🍳 Chef & Admin Dashboard (Admin Page)
- 🗂️ Live view of all active table orders
- 🔴🟡🟢 Order status tracking: `Pending` → `In Progress` → `Delivered`
- 📊 Revenue dashboard: **Daily**, **Weekly**, **Monthly**
- 🏆 Most-ordered menu items leaderboard
- 🔔 Real-time notifications for new incoming orders

---

## Architecture

```
┌─────────────────────┐          ┌──────────────────────────┐
│   USER PAGE         │          │   ADMIN / CHEF PAGE      │
│  (Customer Device)  │          │  (Kitchen / Manager)     │
│                     │          │                          │
│  ┌───────────────┐  │  Order   │  ┌────────────────────┐  │
│  │  Digital Menu │──┼─────────►│  │  Live Orders Board │  │
│  └───────────────┘  │          │  └────────────────────┘  │
│  ┌───────────────┐  │          │  ┌────────────────────┐  │
│  │  Cart / Order │  │          │  │  Revenue Dashboard │  │
│  │  Builder      │  │          │  └────────────────────┘  │
│  └───────────────┘  │          │  ┌────────────────────┐  │
│  ┌───────────────┐  │          │  │  Menu Analytics    │  │
│  │  Payment      │  │          │  └────────────────────┘  │
│  │  (Apple Pay / │  │          │                          │
│  │   Counter)    │  │          │                          │
│  └───────────────┘  │          │                          │
└─────────────────────┘          └──────────────────────────┘
            │                                 ▲
            └──────────── REST API / WebSocket ┘
                         (Backend Server)
```

---

## Pages & Modules

### User Page — Customer Menu Interface

**Route:** `/menu?table=<table_id>`

The customer lands on this page by scanning a QR code placed on their table. The URL contains a `table_id` parameter that ties every order to a specific table automatically.

#### Sections:

| Section | Description |
|---|---|
| **Menu Display** | Full restaurant menu grouped by category (Starters, Mains, Desserts, Drinks) |
| **Item Cards** | Each item shows name, description, price, allergens, and a photo |
| **Order Cart** | Floating cart that updates in real-time as the customer adds items |
| **Order Summary** | Final review screen before payment — shows all items, quantities, and total |
| **Payment Screen** | Choose between Apple Pay or Pay at Counter |
| **Confirmation** | Order receipt with order number and estimated preparation time |

#### User Flow:

```
Scan QR Code
     │
     ▼
Browse Menu by Category
     │
     ▼
Add Items to Cart
     │
     ▼
Review Order Summary
     │
     ▼
Choose Payment Method
  ┌──┴──────────────┐
  │                 │
Apple Pay     Pay at Counter
  │                 │
  ▼                 ▼
Payment         Order Sent
Processed       to Kitchen
  │                 │
  └──────┬──────────┘
         ▼
  Order Confirmation
  Screen + Order ID
```

---

### Admin Page — Chef & Operations Dashboard

**Route:** `/admin`  
**Access:** Password-protected. Restricted to restaurant staff only.

#### Modules:

---

#### 1. 🗂️ Live Orders Board

Displays all active orders grouped by table number.

| Column | Description |
|---|---|
| **Table** | Table number the order belongs to |
| **Order ID** | Unique order identifier |
| **Items** | List of ordered items with quantities |
| **Time** | Time the order was placed |
| **Payment** | `Apple Pay` or `Counter` |
| **Status** | `Pending` / `In Progress` / `Delivered` |
| **Action** | Buttons to update order status |

Status lifecycle:

```
[Pending] ──► [In Progress] ──► [Delivered]
```

- **Pending** — Order received, not yet started
- **In Progress** — Chef is actively preparing the order
- **Delivered** — Order has been served to the table

---

#### 2. 📊 Revenue Dashboard

Tracks the restaurant's financial performance across three time windows:

| Period | Metrics Shown |
|---|---|
| **Daily** | Today's total revenue, number of orders, average order value |
| **Weekly** | Revenue per day of the week (bar chart), weekly total |
| **Monthly** | Revenue per week of the month, monthly total, comparison to previous month |

---

#### 3. 🏆 Most-Ordered Items

A real-time leaderboard showing which menu items are most popular.

| # | Item Name | Category | Orders | Revenue Generated |
|---|---|---|---|---|
| 1 | Margherita Pizza | Mains | 142 | €1,136 |
| 2 | Caesar Salad | Starters | 98 | €784 |
| 3 | Tiramisu | Desserts | 76 | €380 |

This data helps management make informed decisions about:
- Restocking high-demand ingredients
- Promoting top-sellers
- Retiring underperforming items

---

## Order Flow

```
Customer Places Order
        │
        ▼
Order Created in Database
(status: "pending", table_id assigned)
        │
        ▼
Real-time WebSocket Event Fired
        │
        ▼
Admin Dashboard Receives New Order
(appears at top of Live Orders Board)
        │
        ▼
Chef Updates Status → "In Progress"
        │
        ▼
Chef Updates Status → "Delivered"
        │
        ▼
Order Archived + Revenue Logged
```

---

## Payment Integration

### Apple Pay
- Integrated via the **Web Payments API** and **Apple Pay JS SDK**
- Payment is processed before the order is confirmed
- On successful payment, order is automatically submitted to the kitchen

### Pay at Counter
- Order is submitted to the kitchen immediately
- Customer settles the bill at the counter upon delivery
- Admin dashboard flags these orders with a `Counter` payment badge

---

## Analytics & Reporting

All analytics data is computed from the orders database and served via dedicated API endpoints.

| Metric | Endpoint | Description |
|---|---|---|
| Daily Revenue | `GET /api/analytics/revenue?period=day` | Total revenue for today |
| Weekly Revenue | `GET /api/analytics/revenue?period=week` | Revenue broken down by day |
| Monthly Revenue | `GET /api/analytics/revenue?period=month` | Revenue broken down by week |
| Top Items | `GET /api/analytics/top-items` | Most ordered items ranked |
| Order Count | `GET /api/analytics/orders?period=day` | Number of orders per period |

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Frontend (User)** | React.js, Tailwind CSS |
| **Frontend (Admin)** | React.js, Recharts, Tailwind CSS |
| **Backend** | Node.js, Express.js |
| **Real-time** | WebSockets (Socket.io) |
| **Database** | PostgreSQL |
| **ORM** | Prisma |
| **Authentication** | JWT (Admin) |
| **Payments** | Apple Pay JS / Web Payments API |
| **Hosting** | Vercel (Frontend), Railway / Render (Backend) |

---

## Getting Started

### Prerequisites

- Node.js `v18+`
- PostgreSQL database
- Apple Pay merchant account (for payment integration)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/restaurant-os.git
cd restaurant-os

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your database URL, secrets, and API keys

# Run database migrations
npx prisma migrate dev

# Seed the menu data
npm run seed

# Start the development server
npm run dev
```

The app will be available at:
- **User Page:** `http://localhost:3000/menu?table=1`
- **Admin Dashboard:** `http://localhost:3000/admin`

---

## Environment Variables

Create a `.env` file in the root of your project:

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/restaurantos

# Authentication
JWT_SECRET=your_super_secret_jwt_key
ADMIN_PASSWORD=your_admin_password

# Apple Pay
APPLE_PAY_MERCHANT_ID=merchant.com.yourrestaurant
APPLE_PAY_DOMAIN_VERIFICATION=your_verification_string

# Server
PORT=4000
NODE_ENV=development
```

---

## Folder Structure

```
restaurant-os/
├── client/
│   ├── user/                  # Customer-facing menu app
│   │   ├── components/
│   │   │   ├── Menu.jsx
│   │   │   ├── MenuItem.jsx
│   │   │   ├── Cart.jsx
│   │   │   ├── OrderSummary.jsx
│   │   │   └── PaymentScreen.jsx
│   │   └── pages/
│   │       └── MenuPage.jsx
│   └── admin/                 # Chef & admin dashboard
│       ├── components/
│       │   ├── OrdersBoard.jsx
│       │   ├── OrderCard.jsx
│       │   ├── RevenueChart.jsx
│       │   └── TopItemsTable.jsx
│       └── pages/
│           └── AdminDashboard.jsx
├── server/
│   ├── routes/
│   │   ├── orders.js
│   │   ├── menu.js
│   │   └── analytics.js
│   ├── controllers/
│   ├── middleware/
│   ├── sockets/               # WebSocket event handlers
│   └── index.js
├── prisma/
│   ├── schema.prisma
│   └── seed.js
├── .env.example
├── package.json
└── README.md
```

---

## API Endpoints

### Orders

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/orders` | Place a new order |
| `GET` | `/api/orders` | Get all active orders (Admin) |
| `GET` | `/api/orders/:id` | Get a specific order |
| `PATCH` | `/api/orders/:id/status` | Update order status |

### Menu

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/menu` | Get full menu |
| `GET` | `/api/menu/:category` | Get items by category |

### Analytics

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/analytics/revenue` | Get revenue data (`?period=day/week/month`) |
| `GET` | `/api/analytics/top-items` | Get most-ordered items |
| `GET` | `/api/analytics/orders` | Get order count stats |

---

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

Please make sure your code follows the existing code style and includes relevant tests.

---

## License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">
  Built with ❤️ for restaurants that want to work smarter, not harder.
</div>
