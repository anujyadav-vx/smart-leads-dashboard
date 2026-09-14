# 🚀 SmartLeads Dashboard — Enterprise CRM

> A production-ready **full-stack CRM dashboard** for managing leads, tracking pipeline performance, and exporting sales data — built with React, TypeScript, Node.js, Express, and MongoDB.

---

## 📸 Overview

| Feature | Details |
|---|---|
| **Auth** | JWT-based login/register with role-based access (admin / sales) |
| **Dashboard** | KPI cards, pipeline funnel, acquisition channels, recent leads |
| **Leads** | Full CRUD, search, filter by status/source, sort, pagination |
| **Export** | CSV export with active filter support |
| **Dark Mode** | Persistent dark/light theme toggle |
| **Design** | Glassmorphism, gradients, micro-animations, Tailwind CSS v4 |

---

## 🛠 Tech Stack

### Frontend (`/client`)
- **React 19** + **TypeScript 6**
- **Vite 8** (dev server + bundler)
- **Tailwind CSS v4** (utility-first styling)
- **React Hook Form** + **Zod** (form validation)
- **React Router v7** (client-side routing)
- **Axios** (HTTP client with interceptors)
- **Lucide React** (icon library)
- **React Hot Toast** (notifications)

### Backend (`/server`)
- **Node.js** + **TypeScript**
- **Express 5** (REST API)
- **MongoDB** + **Mongoose 9** (data persistence)
- **JWT** (authentication)
- **Bcryptjs** (password hashing)
- **Zod** (request validation)
- **json2csv** (CSV export)
- **ts-node-dev** (hot-reload dev server)

---

## ⚡ Quick Start

### Prerequisites
- **Node.js** >= 18
- **MongoDB** running locally at `mongodb://127.0.0.1:27017`

### 1. Install Dependencies

```bash
# Backend
cd server
npm install

# Frontend
cd ../client
npm install
```

### 2. Seed the Database

Run the seed script to populate demo users and sample leads:

```bash
cd server
npx ts-node src/scripts/seed.ts
```

This creates:
- **Admin user:** `admin@crm.com` / `password123`
- **Sales user:** `sales@crm.com` / `password123`
- **12 sample leads** across various statuses and sources

### 3. Start Dev Servers

**Terminal 1 — Backend (port 5000):**
```bash
cd server
npm run dev
```

**Terminal 2 — Frontend (port 5173):**
```bash
cd client
npm run dev
```

Then open **http://localhost:5173** in your browser.

---

## 🔑 Demo Credentials

| Role | Email | Password |
|---|---|---|
| Admin | `admin@crm.com` | `password123` |
| Sales | `sales@crm.com` | `password123` |

> The login page has **one-click demo buttons** that fill in these credentials automatically.

---

## 📁 Project Structure

```
smart-leads-dashboard/
├── client/                    # React frontend
│   └── src/
│       ├── api/               # Axios instance + interceptors
│       ├── components/
│       │   ├── forms/         # LeadForm (create/edit)
│       │   ├── layout/        # Sidebar navigation
│       │   └── ui/            # Button, Input, Modal
│       ├── hooks/             # useDebounce
│       ├── layouts/           # DashboardLayout
│       ├── pages/
│       │   ├── auth/          # LoginPage, RegisterPage
│       │   └── dashboard/     # DashboardPage, LeadsPage
│       ├── routes/            # AppRoutes, ProtectedRoute
│       ├── services/          # auth.service, lead.service
│       ├── store/             # AuthContext (JWT + user state)
│       ├── types/             # auth.types, lead.types
│       └── validations/       # Zod schemas
│
├── server/                    # Express backend
│   └── src/
│       ├── config/            # Database connection
│       ├── controllers/       # auth.controller, lead.controller
│       ├── interfaces/        # TypeScript interfaces
│       ├── middlewares/       # auth, role, error middleware
│       ├── models/            # Lead, User Mongoose models
│       ├── routes/            # auth.routes, lead.routes
│       ├── scripts/           # seed.ts
│       ├── services/          # auth.service, lead.service
│       ├── utils/             # asyncHandler, hashPassword, jwt
│       ├── validations/       # Zod schemas
│       ├── app.ts             # Express app setup + CORS
│       └── server.ts          # Entry point
│
├── docker-compose.yml
└── README.md
```

---

## 🌐 API Reference

### Auth Routes (`/api/auth`)

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/register` | Register new user |
| `POST` | `/api/auth/login` | Login + receive JWT |

### Lead Routes (`/api/leads`) — Protected

| Method | Endpoint | Role | Description |
|---|---|---|---|
| `GET` | `/api/leads` | All | Get leads with pagination, filter, sort |
| `POST` | `/api/leads` | All | Create a new lead |
| `GET` | `/api/leads/stats` | All | Dashboard KPI stats |
| `GET` | `/api/leads/export/csv` | All | Export filtered leads as CSV |
| `GET` | `/api/leads/:id` | All | Get single lead |
| `PUT` | `/api/leads/:id` | All | Update lead |
| `DELETE` | `/api/leads/:id` | Admin | Delete lead |

### Query Parameters for `GET /api/leads`

| Param | Type | Description |
|---|---|---|
| `page` | number | Page number (default: 1) |
| `limit` | number | Results per page (default: 10) |
| `search` | string | Search name or email |
| `status` | string | `New`, `Contacted`, `Qualified`, `Lost` |
| `source` | string | `Website`, `LinkedIn`, `Instagram`, etc. |
| `sort` | string | `latest`, `oldest`, `value-high`, `value-low` |

---

## 🐳 Docker Deployment

```bash
docker-compose up --build
```

Services:
- `client` — React frontend at port **3000**
- `server` — Express API at port **5000**
- `mongodb` — MongoDB at port **27017**
