# Maatram Volunteer Quest 🌟

[![React](https://img.shields.io/badge/React-19.0-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.1-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![TanStack Router](https://img.shields.io/badge/TanStack%20Router-1.80-FF4154)](https://tanstack.com/router)
[![Tests](https://img.shields.io/badge/Tests-16%20Passed-22C55E?logo=vitest&logoColor=white)](https://vitest.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-F59E0B.svg)](LICENSE)

> A modern, mobile-first volunteer engagement and field operations platform designed for **Maatram Foundation**. Built as a pixel-accurate, zero-backend frontend application featuring end-to-end Student and Admin operational workflows.

---

## 📌 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
  - [Student & Volunteer Experience](#1-student--volunteer-experience)
  - [Admin Community & Event Operations](#2-admin-community--event-operations)
- [Design System & UI Architecture](#-design-system--ui-architecture)
- [Project Structure](#-project-structure)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Testing & Quality Assurance](#-testing--quality-assurance)
- [Offline & Mock Data Strategy](#-offline--mock-data-strategy)
- [License](#-license)

---

## 📖 Overview

**Maatram Volunteer Quest** empowers scholars and volunteers to discover community drives, track field attendance via geofencing, capture GPS-verified proof photos, and collaborate via real-time community chat.

The platform provides a unified application experience split into two specialized interfaces:
1. **Student / Volunteer Portal** (`/`): Personalized dashboard, event registration, live camera geotagging, hours tracking, and peer collaboration.
2. **Admin Operations Hub** (`/admin`): Real-time event command center, volunteer verification, attendance auditing with spreadsheet export, proof inspection, fund disbursements, and analytics reporting.

---

## 🚀 Key Features

### 1. Student & Volunteer Experience

- **Interactive Dashboard:**
  - Real-time verified volunteer status badge and blast welcome celebration modal.
  - Active volunteering opportunities list with geofenced distance calculations.
  - Digital Volunteer ID Card with scannable QR verification mockup.
- **WhatsApp-Inspired Community Chat (`/community/:id/chat`):**
  - Instant conversation view with system announcements, volunteer messages, and coordinator tags.
  - **Live Device Camera Integration:** Real-time camera feed (`getUserMedia`), front/rear camera flip, shutter flash, and instant photo messaging.
  - **Real-Time Voice Notes:** Hardware microphone recording (`MediaRecorder`), live timer, animated equalizer waveform, and interactive playable audio bubbles.
  - **Card-Style Attachment Sheet:**
    - 📷 **Media:** Share field images and documents.
    - 📍 **Submit Proof:** One-tap navigation into the Geotag Proof flow.
    - 💰 **Fund Request:** Seamless request workflow for volunteer travel and meal allowances.
    - 🗺️ **Location Share:** Broadcasts event coordinates to peers.
- **Action Centre & Live Hours Dial:**
  - Animated luxury countdown timer displaying cumulative volunteer hours (`12h 30m 49s`).
  - Interactive onboarding tour spotlight guiding first-time volunteers through key shortcuts.
  - Quick action shortcuts (Mark Attendance, Upload Proof, Request Funding, Submit Incident Report).
- **Official Geotag Proof Submission:**
  - Live viewfinder with real-time GPS coordinates, reverse-geocoded address, and accuracy radius indicator.
  - Automated watermark baking onto HTML5 canvas with official Maatram Foundation seal and mini map preview.
  - Multi-photo upload queue with warning confirmation and celebratory submission feedback.
- **Impact Arena & Leaderboards:**
  - Tiered volunteer badges (10h, 50h, Eco Warrior, Education Champion).
  - Searchable community leaderboard with contribution hours and peer rankings.

---

### 2. Admin Community & Event Operations

- **Admin Operations Desk (`/admin`):**
  - Executive overview cards: Active Communities, Managed Drives, and Registered Scholars.
  - Real-time notifications bell popover with active operations alerts.
  - Quick navigation across Events, Communities, Volunteers, and Reports.
- **Manage Communities (`/admin/communities`):**
  - Comprehensive community taskforce directory with category filters:
    - *School Visits*, *Admissions Support*, *BGV*, *Mock Interviews*, and *Admission Panel Interviews*.
  - Search by community name, drive keywords, or coordinator tags.
- **Community Command Center (`/admin/community/:id`):**
  - **Branded Top Header:** Official crest badge, breadcrumb navigation, and interactive admin profile quick card.
  - **Top Action Dock:** Integrated Walkie-Talkie simulator with synthesized dual-tone audio squelch sound effects.
  - **Two Primary Tabs:**
    - **Chats Tab:** WhatsApp-style administrator composer, real-time voice notes, live camera capture, and admin attachment tiles (*Create Poll*, *Schedule Meeting*, *Location Share*, *Media*).
    - **Event Management Tab:** Dedicated event control center divided into five operational pillars.
- **Event Management Pillars:**
  1. **Attendance Review:**
     - Turnout statistics (Total Scholars, Marked vs Not Marked, Attendance Percentage).
     - Individual volunteer cards with marked time and hours contributed.
     - **Export Attendance G-Sheet:** Generates a strict RFC 4180-compliant, UTF-8 BOM CSV compatible with Microsoft Excel and Google Sheets.
  2. **Proof Verification:**
     - Multi-tab auditing queue (Pending, Approved, Rejected).
     - **Multi-Photo Swipable Carousel:** Allows reviewing multiple photos submitted by a volunteer with carousel navigation arrows and thumbnail selector strip.
     - **Exact Geotag Watermark Verification:** Displays the mini map thumbnail, exact coordinates, timestamp, and geofence radius check.
     - One-click Approve & Reject actions with customizable rejection feedback notes.
  3. **Requested Funds:**
     - Review volunteer travel and meal expense claims with reason, receipts, and bank verification.
     - Instant status approval and rejection workflows.
  4. **Feedback Review:**
     - Scholar feedback inbox with star ratings and coordinator reply threads.
  5. **Thank Note Automation:**
     - Automatic qualification rules: Volunteers who completed both marked attendance **and** approved GPS proof photos are unlocked for certificates.
     - Live preview and batch dispatch of official Maatram Foundation Appreciation Certificates.
- **Volunteer Directory (`/admin/volunteers`):**
  - Verification queue, Active volunteers directory, and Tier management.
  - Comprehensive volunteer export to spreadsheet.
- **Reports & Analytics (`/admin/reports`):**
  - High-resolution SVG volunteer contribution trend charts (July – November).
  - Top contributors and alumni impact metrics.
  - One-click PDF generation and instant download of Maatram Analytics Reports.

---

## 🎨 Design System & UI Architecture

The application strictly adheres to the Maatram Foundation Design System, built with modular, scoped CSS architecture to prevent style collisions:

| File | Purpose | Scope |
| :--- | :--- | :--- |
| `src/styles/tokens.css` | Color palette, font tokens, borders, shadows | Global root tokens |
| `src/styles/components.css` | Buttons, form capsules, status pills, sheets | Base UI primitives |
| `src/styles/screens.css` | Primary 9 core volunteer application views | Student screens |
| `src/styles/additional.css` | Action Centre, Geotag flow, Impact Arena, Tour | Extended student UI (`ma-*`) |
| `src/styles/admin.css` | Admin dashboard, reports, KPIs, shared shell | Admin screens (`ad-*`) |
| `src/styles/volunteers.css` | Volunteer directory and profile verification | Volunteer management (`vl-*`) |
| `src/styles/admin-community.css` | Community management, attendance, proof audit | Admin community (`adc-*`) |

### Responsive Design
- The user interface is optimized for a **480px mobile viewport frame**, automatically centered on tablet and desktop screens with soft ambient backgrounds.
- All floating controls (FAB plus buttons, composers, bottom action bars) are anchored strictly within the viewport card container.

---

## 📁 Project Structure

```text
maatram-volunteer-app/
├── public/
│   └── assets/                     # Static media, icons, brand marks & photos
│       ├── admin/                  # Admin avatars, badges, illustrations
│       ├── brand/                  # Official Maatram Foundation logos
│       ├── communities/            # Community badges & thumbnails
│       ├── impact/                 # Hero banners, dials, trophy graphics
│       └── volunteers/             # Volunteer portraits & verify icons
├── src/
│   ├── assets/                     # Bundled SVG icons & brand assets
│   ├── components/                 # Reusable UI component modules
│   │   ├── admin/                  # Admin frames, navigation & headers
│   │   │   ├── community/          # Admin Community & Event Management modules
│   │   │   │   ├── AdminCommunityChat.tsx
│   │   │   │   ├── AdminCommunityDashboard.tsx
│   │   │   │   ├── AdminCommunityList.tsx
│   │   │   │   ├── AdminCommunityModals.tsx
│   │   │   │   ├── AdminCommunityState.tsx
│   │   │   │   ├── AdminEventManagement.tsx
│   │   │   │   ├── AdminProofVerification.tsx
│   │   │   │   └── AdminThankNote.tsx
│   │   │   └── volunteers.tsx      # Volunteer directory components
│   │   ├── additional-shared.tsx   # Reusable student UI helpers
│   │   ├── chat-media-capture.tsx  # Shared Live Camera & Audio Recorder
│   │   ├── chat-screen.tsx         # Student WhatsApp chat & Action Centre
│   │   ├── geotag-proof-flow.tsx   # GPS Geotag live camera & watermark canvas
│   │   ├── impact-screen.tsx       # Leaderboards & impact badges
│   │   └── MaatramState.tsx        # Central student session context
│   ├── data/                       # Frontend-only mock datasets
│   │   ├── admin-community-mock.ts # Communities, attendance, proofs & chats
│   │   ├── admin-mock.ts           # Admin dashboard metrics & reports
│   │   ├── mock.ts                 # Student opportunities & notifications
│   │   └── volunteers-mock.ts      # Volunteer records & verification queue
│   ├── routes/                     # TanStack Router file-based route definitions
│   │   ├── __root.tsx              # Root HTML shell & meta configuration
│   │   ├── index.tsx               # Student portal redirect
│   │   ├── dashboard.tsx           # Student home dashboard
│   │   ├── community_.$communityId_.chat.tsx # Student community chat
│   │   ├── admin.index.tsx         # Admin dashboard overview
│   │   ├── admin.communities.tsx  # Admin community listing
│   │   ├── admin.community._communityId.tsx # Admin community dashboard
│   │   ├── admin.volunteers.index.tsx       # Admin volunteer directory
│   │   └── admin.reports.tsx       # Admin analytics & report generator
│   ├── styles/                     # CSS stylesheets & design system tokens
│   └── test/                       # Vitest rule enforcement & routing tests
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## 🛠️ Tech Stack

- **Framework:** [React 19](https://react.dev/)
- **Routing:** [TanStack Router](https://tanstack.com/router) with strict type safety and file-based route tree generation
- **Build Tool:** [Vite 8.1](https://vitejs.dev/) & [Nitro Engine](https://nitro.unjs.io/)
- **Language:** [TypeScript 5.7](https://www.typescriptlang.org/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Document & Spreadsheet Export:**
  - [pdf-lib](https://pdf-lib.js.org/) & [jsPDF](https://github.com/parallax/jsPDF) — Custom PDF report rendering
  - RFC 4180 UTF-8 BOM CSV engine — Direct Excel and Google Sheets export
- **Hardware Integration:** Web APIs (`navigator.mediaDevices.getUserMedia`, `MediaRecorder`, `navigator.geolocation`, HTML5 Canvas)
- **Testing:** [Vitest 4](https://vitest.dev/) with DOM matchers

---

## 🏁 Getting Started

### Prerequisites

- **Node.js:** v18.0.0 or higher
- **Package Manager:** npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/maatram-volunteer-quest.git
   cd maatram-volunteer-quest
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   Navigate to [http://localhost:8081](http://localhost:8081).
   - Student Dashboard: `http://localhost:8081/dashboard`
   - Student Community Chat: `http://localhost:8081/community/sangamam/chat`
   - Admin Command Center: `http://localhost:8081/admin`
   - Admin Community Management: `http://localhost:8081/admin/communities`

---

## 🧪 Testing & Quality Assurance

The codebase includes automated tests validating rule compliance, design system constraints, and route integrity:

```bash
# Run the complete test suite
npm test

# Run tests with UI watcher
npx vitest

# Build for production
npm run build
```

---

## 🔒 Offline & Mock Data Strategy

This project is built strictly as a **frontend UI prototype**:
- **No Backend APIs or Databases:** All communications, proof audits, attendance logs, and reports operate on client-side state providers (`MaatramState`, `AdminCommunityState`, `AdminState`).
- **Session Persistence:** Changes made during the session (such as approving proofs, sending voice notes, or marking attendance) update live across the dashboard during runtime without persistent server overhead.
- **Realistic Seed Data:** Pre-populated with realistic Tamil Nadu college names, volunteer photos, GPS lake bund coordinates, and timestamps.

---

## 📄 License

Distributed under the MIT License. See [LICENSE](LICENSE) for more details.

---

<p align="center">
  Made with ❤️ for <b>Maatram Foundation</b> — <i>Together for a Better Tomorrow</i>
</p>
