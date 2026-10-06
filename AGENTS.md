# Naisei Agent & Developer Rules

This document establishes the binding rules for all AI assistants and developers contributing to **Naisei**.

---

## 1. Core Principle & The Acid Test

Every design, feature, and architectural decision must be evaluated against this single question:

> **"Does this make Naisei feel more like writing in a real journal?"**  
> • If **yes** → Consider and refine it.  
> • If **no** → Keep it minimal or discard it.

---

## 2. Non-Negotiable UX & Visual Rules

- **Paper-First Mindset**: The app must feel like opening a physical notebook on a desk. Do not clutter the interface with classic productivity app widgets, sidebar clutter, card grids, or invasive formatting bars.
- **Immediate Writing**: Opening the app must place the user on an active page with the cursor ready immediately. No friction, zero splash modals.
- **Color System**:
  - Light Mode: Background `#F5F1E8`, Surface `#FAF7F0`, Primary Text `#292824`, Secondary Text `#77736B`, Accent `#6F6A9A` (used sparingly).
  - Dark Mode: Background `#1C1C1A`, Surface `#252522`, Primary Text `#E8E4DA`, Secondary Text `#9A978F`, Accent `#8D88C7`.
- **Typography**:
  - UI: `Inter` or `Geist`.
  - Journal Content: `Lora`, `Literata`, or `Cormorant Garamond` (must feel like reading a personal diary).
- **Paper Metaphor**:
  - MVP paper types: Lined (default), Blank, Dotted.
  - Page turns: Subtle horizontal swipe on mobile, arrow keys / edge buttons on desktop.
  - Respect `prefers-reduced-motion` (fallback to gentle slide/fade).

---

## 3. Scope Boundaries — Strictly Postponed (Do Not Build for MVP)

Do NOT introduce or propose any of the following features during MVP:

- ❌ AI writing assistants, AI summaries, or sentiment analysis
- ❌ Social sharing, public profiles, collaboration, or comments
- ❌ Voice journaling or audio transcription
- ❌ Gamification, streak counts, or complex mood analytics
- ❌ Native mobile wrappers (Capacitor/Cordova) — PWA only
- ❌ Elaborate 3D skeuomorphic notebook animations

---

## 4. Technical Architecture Rules

- **Frontend**:
  - Angular 19+ with Standalone Components only (`NgModule` is strictly prohibited).
  - Angular Signals (`signal`, `computed`, `effect`) for reactive state.
  - Modern control flow (`@if`, `@for`, `@switch`, `@defer`).
  - Tailwind CSS + Angular CDK.
  - Tiptap + ProseMirror for the editor (store structured JSON, not raw unvalidated HTML).
- **Local-First & Offline Storage**:
  - IndexedDB managed through Dexie.js.
  - Writes commit locally first (<5ms). Never block typing on network calls.
  - Client-generated IDs using UUIDv7 (time-sortable).
- **Backend & Database**:
  - NestJS modular architecture.
  - PostgreSQL (Neon) with TypeORM.
  - JWT auth stored in HttpOnly, Secure, SameSite cookies.
  - Cloudflare R2 / S3 for media uploads (presigned URLs; decoupled from text saves).
- **Privacy & Security**:
  - **Zero Logging of Journal Text**: Server logs and error reporting must never capture entry content, titles, or user writing.

---

## 5. Sync & Conflict Handling Rules

- Sync endpoints must be strictly **idempotent**.
- Every record must have `client_updated_at` and a monotonic `revision` counter.
- User data must never be silently overwritten or deleted during sync conflicts; write conflict copies if divergent revisions occur.

---

## 6. Documentation References

- **[README.md](file:///c:/Users/habeebu/Desktop/Habeeb/Personal/Naisei/README.md)**: Product vision, tech stack summary, visual identity, and overview.
- **[INSTRUCTIONS.md](file:///c:/Users/habeebu/Desktop/Habeeb/Personal/Naisei/INSTRUCTIONS.md)**: Full architecture specifications, UX rules, data flow, tokens, and phased roadmap.
