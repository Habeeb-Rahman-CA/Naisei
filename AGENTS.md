# Naisei Agent & Developer Rules

This document establishes the binding rules for all AI assistants and developers contributing to **Naisei**.

---

## 1. Core Principles
- **Paper-First Mindset**: The app must feel like opening a physical notebook. Do not clutter the interface with classic productivity app widgets, sidebar clutter, or invasive formatting bars.
- **Immediate Writing**: Opening the app must place the user on an active page with the cursor ready. No friction.
- **Local-First Always**: Never introduce an architecture where writing or saving requires network roundtrips. All edits commit immediately to Dexie (IndexedDB), with background sync to NestJS + PostgreSQL.
- **PWA Only (No Capacitor Initially)**: Do not add Capacitor or Cordova dependencies until the web PWA is thoroughly tested, refined, and approved.

---

## 2. Technical Stack Rules
- **Frontend**:
  - Angular 19+ with Standalone Components only (`NgModule` is strictly prohibited).
  - Use Angular Signals (`signal`, `computed`, `effect`) for state.
  - Modern control flow (`@if`, `@for`, `@switch`).
  - Tailwind CSS + Angular CDK for styling and UI primitives.
  - Tiptap + ProseMirror for the editor (store structured JSON, not raw unvalidated HTML).
- **Offline Storage**:
  - IndexedDB managed through Dexie.js.
  - Client-generated IDs using UUIDv7 (time-sortable).
- **Backend**:
  - NestJS with modular architecture.
  - PostgreSQL (Neon) with TypeORM.
  - JWT auth stored in HttpOnly, Secure cookies.
  - Cloudflare R2 / S3 for media uploads (presigned URLs; separate from journal text saves).

---

## 3. Sync & Conflict Handling Rules
- Sync endpoints must be strictly **idempotent**.
- Every record must have `client_updated_at` and a monotonic `revision` counter.
- User data must never be silently overwritten or deleted during sync conflicts; write conflict copies if divergent revisions occur.

---

## 4. Documentation References
- **[README.md](file:///c:/Users/habeebu/Desktop/Habeeb/Personal/Naisei/README.md)**: Product vision, tech stack summary, and overview.
- **[INSTRUCTIONS.md](file:///c:/Users/habeebu/Desktop/Habeeb/Personal/Naisei/INSTRUCTIONS.md)**: Full architecture specifications, UX rules, data flow, and phased roadmap.
