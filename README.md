# LeadFlow CRM

<p align="center"><img src="./public//logo.png" alt="LeadFlow logo" width="120"></p>

A modern, full-stack CRM application for managing sales leads, tracking pipeline progress, and closing more deals.

## Project Structure

```
LeadFlow/
├── AGENTS.md                    # Agent customization rules
├── eslint.config.mjs            # ESLint configuration
├── LICENSE                      # Project license
├── next-env.d.ts                # Next.js type definitions
├── next.config.ts               # Next.js configuration
├── package.json                 # Node.js dependencies and scripts
├── postcss.config.mjs           # PostCSS configuration
├── prisma.config.ts             # Prisma configuration
├── README.md                    # This file
├── tsconfig.json                # TypeScript configuration
├── prisma/                      # Database schema and migrations
│   ├── schema.prisma            # Prisma schema definition
│   ├── seed.ts                  # Database seeding script
│   └── migrations/              # Database migration files
│       ├── migration_lock.toml
│       └── 20260505095807_init/
│           └── migration.sql
├── public/                      # Static assets
│   └── logo.png                 # Application logo
└── src/                         # Source code
    ├── proxy.ts                 # Next.js proxy middleware for auth
    └── app/                     # Next.js App Router pages and layouts
        ├── globals.css          # Global CSS styles
        ├── layout.tsx           # Root layout component
        ├── page.tsx             # Landing page
        ├── actions/             # Server actions
        │   ├── auth.ts          # Authentication actions
        │   └── leads.ts         # Lead management actions
        ├── api/                 # API routes
        │   └── auth/
        │       └── [...nextauth]/
        │           └── route.ts  # NextAuth.js API route
        ├── dashboard/           # Dashboard pages
        │   ├── layout.tsx       # Dashboard layout with sidebar
        │   ├── page.tsx         # Dashboard overview
        │   └── leads/           # Leads management pages
        │       ├── page.tsx     # Leads list
        │       ├── [id]/        # Dynamic lead detail page
        │       │   └── page.tsx
        │       └── new/         # New lead creation page
        │           └── page.tsx
        ├── login/               # Authentication pages
        │   └── page.tsx         # Login page
        ├── components/          # Reusable UI components
        │   ├── DeleteLeadButton.tsx
        │   ├── FormField.tsx
        │   ├── LeadBadge.tsx
        │   ├── LeadFilters.tsx
        │   ├── LeadForm.tsx
        │   ├── Sidebar.tsx
        │   ├── StatusUpdater.tsx
        │   └── providers.tsx    # Session provider wrapper
        ├── lib/                 # Utility libraries
        │   ├── auth.ts          # Authentication configuration
        │   ├── dashboard.ts     # Dashboard data fetching
        │   ├── leads.ts         # Lead data operations
        │   ├── prisma.ts        # Prisma client instance
        │   └── schemas/         # Zod validation schemas
        │       └── lead.ts
        └── types/               # TypeScript type definitions
            └── next-auth.d.ts   # NextAuth.js type extensions
```

---

## Tech Stack

| Area | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Database | Neon (PostgreSQL) |
| ORM | Prisma 7 |
| Authentication | Auth.js v5 (beta) |
| Form Validation | React Hook Form + Zod |
| Password Hashing | bcryptjs |
| Icons | Lucide React |
| Deployment | Vercel + Neon |

---

## Features Implemented

### Authentication
- Email and password login with bcrypt password hashing
- Sign up flow that auto signs in and redirects to dashboard
- JWT session management via Auth.js
- Route protection via Next.js proxy (all dashboard routes require login)

### Lead Management
- Create, view, edit, and delete leads
- Full lead detail page with all fields
- Inline status update without page reload
- Fields: name, company, email, phone, source, status, deal value, assigned salesperson, created date, last updated date

### Lead Notes
- Add notes to any lead
- Delete notes
- Notes show author name and timestamp
- Notes ordered by most recent first

### Dashboard
- Total leads count
- New leads count
- Qualified leads count
- Won leads count
- Lost leads count
- Total estimated deal value
- Total won deal value

### Search and Filtering
- Search by lead name, company, or email
- Filter by status
- Filter by lead source
- Filter by assigned salesperson
- Clear all filters button
- All filters work together simultaneously

### UI/UX
- Dark theme throughout
- Loading skeletons for dashboard and leads list
- Custom 404 page
- Global error boundary
- Responsive layout
- Empty state for leads list

---

## How to Run Locally

### Prerequisites
- Node.js v18 or higher
- A Neon account (free tier is sufficient)

### 1. Clone the repository

```bash
git clone https://github.com/hasaRanger/LeadFlow.git
cd LeadFlow
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root of the project:

```env
DATABASE_URL="your-neon-connection-string"
AUTH_SECRET="generate-with-npx-auth-secret"
AUTH_URL="http://localhost:3000"
```

To generate AUTH_SECRET:

```bash
npx auth secret
```

### 4. Set up the database

Run the Prisma migration to create all tables:

```bash
npx prisma migrate dev
```

### 5. Seed the database

```bash
npm run seed
```

### 6. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Environment Variables

| Variable | Description |
|---|---|
| `DATABASE_URL` | Neon PostgreSQL connection string |
| `AUTH_SECRET` | Secret key for Auth.js JWT signing |
| `AUTH_URL` | Base URL of the application |

---

## Test Login Credentials

| Field | Value |
|---|---|
| Email | admin@example.com |
| Password | password123 |

Additional seeded accounts:
- `sarah@example.com` / `password123`
- `marcus@example.com` / `password123`

You can also sign up with any new email and password directly from the login page.

---

## Database Setup

This project uses **Neon** (serverless PostgreSQL) with **Prisma 7** as the ORM.

### Schema overview

- `User` — stores salesperson and admin accounts with hashed passwords
- `Lead` — core CRM entity with status, source, deal value, and assignment
- `Note` — internal notes attached to leads
- `Account`, `Session`, `VerificationToken` — Auth.js required tables

### Running migrations

```bash
npx prisma migrate dev
```

### Viewing the database

```bash
npx prisma studio
```

---

## Known Limitations

- No role-based access control — all logged in users can see and edit all leads
- No pagination on the leads list — loads all leads at once
- No email notifications or reminders
- No file attachments on leads or notes
- No OTP or email verification on sign up — accounts are trusted immediately without confirming ownership of the email address
- Password reset flow not implemented
- No activity log / audit trail

---

## Reflection

Building LeadFlow was a genuinely enjoyable challenge. Here is what I learned and observed throughout the process.

**What went well:**
The Next.js App Router architecture made it natural to separate server and client concerns cleanly. Using server components for data fetching and server actions for mutations kept the codebase simple and reduced the need for complex API route management. Prisma made database interactions type-safe and straightforward once the Prisma 7 configuration was sorted out.

**What was challenging:**
Prisma 7 introduced significant breaking changes from previous versions — the `prisma.config.ts` approach, the removal of `url` from `schema.prisma`, and the new adapter pattern required careful research and debugging. Similarly, Next.js 16 renamed middleware to proxy with a different runtime model, which required understanding the new architecture before the Auth.js crypto error could be resolved.

**What I would improve with more time:**
- Add pagination and virtual scrolling for large lead lists
- Implement role-based permissions so managers see all leads and salespeople only see their own
- Add a Kanban board view alongside the table view for visual pipeline management
- Build email reminder automation for follow-up scheduling
- Add lead activity timeline showing all status changes and notes chronologically
- Implement CSV import and export for bulk lead management

**Independence and problem-solving:**
Every blocker encountered — from Prisma 7 config changes to Next.js 16 proxy migration to bcrypt hashing — was debugged by reading official documentation, understanding the root cause, and applying a targeted fix rather than working around the problem. This approach resulted in a clean, maintainable codebase without hacks or workarounds.

---

## Demo Video

[Link to be added after recording]

## Deployed Application

[Link to be added after Vercel deployment]