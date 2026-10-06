# Naisei (内省) — Engineering & Architecture Instructions

> **Document Status**: Active Specification & Guidelines (Phase 0 Complete)  
> **Target Audience**: Developers, Tech Leads, and AI Pair Programmers  
> **Scope**: Product Identity, UX/UI Laws, Paper Metaphor, Architecture, Data Flow, Coding Standards, and Roadmaps

---

## 1. Product Definition & Core Philosophy

### 1.1 The Guiding Principle
Every architectural decision, feature request, and interface element must pass the **Naisei Core Test**:
> **"Does this make Naisei feel more like writing in a real journal?"**  
> • If **yes** → Consider and refine it.  
> • If **no** → Keep it minimal or discard it.

### 1.2 Visual Identity & Aesthetics
Naisei is designed as: **Minimal · Warm · Personal · Calm · Paper-like**.
- **Avoid Productivity Clutter**:
  - No card-heavy dashboards, no bright gradients, no crowded metrics, and no complex persistent editor toolbars.
  - The sensation must replicate opening a clean, handcrafted notebook on your desk.

### 1.3 Design System Tokens

```css
:root {
  /* Light Mode (Warm Paper) */
  --color-paper-bg: #F5F1E8;         /* Warm background paper */
  --color-paper-surface: #FAF7F0;    /* Elevated notebook page */
  --color-text-primary: #292824;     /* Soft black ink */
  --color-text-secondary: #77736B;   /* Muted graphite */
  --color-accent: #6F6A9A;           /* Muted lavender/indigo (used sparingly) */
  --color-line-ruled: rgba(119, 115, 107, 0.18); /* Subtle horizontal ruled lines */
  --color-line-dotted: rgba(119, 115, 107, 0.25);/* Subtle dot matrix */
  --shadow-page: 0 4px 20px -2px rgba(41, 40, 36, 0.06), 0 1px 3px rgba(41, 40, 36, 0.04);
}

.dark {
  /* Dark Mode (Night Stationery) */
  --color-paper-bg: #1C1C1A;         /* Deep slate desk */
  --color-paper-surface: #252522;    /* Dark stationery leaf */
  --color-text-primary: #E8E4DA;     /* Warm cream text */
  --color-text-secondary: #9A978F;   /* Soft slate secondary */
  --color-accent: #8D88C7;           /* Soft muted indigo */
  --color-line-ruled: rgba(154, 151, 143, 0.14);
  --color-line-dotted: rgba(154, 151, 143, 0.20);
  --shadow-page: 0 4px 24px -2px rgba(0, 0, 0, 0.4);
}
```

### 1.4 Typography Standards
- **UI Elements**: Unobtrusive, readable modern sans-serifs (`Inter`, `Geist`).
- **Journal Writing Content**: Literary, elegant serifs (`Lora`, `Literata`, `Cormorant Garamond`).
  - *The reading and writing experience must feel like a personal diary, not an application UI.*

---

## 2. The Paper Metaphor & Interaction Laws

### 2.1 Paper Styles (MVP)
1. **Lined Paper (Default)**:
   - Subtle horizontal lines spaced proportionally to font size and line height.
   - Text baselines must visually snap/align with ruled guides.
2. **Blank Paper**:
   - Clean, open page for free-form reflection without guides.
3. **Dotted Paper**:
   - Subtle, delicate dot grid for structured notes, sketches, and planning.

### 2.2 Paper Details
- **Warm Texture**: Very subtle organic grain/fiber texture (SVG filter or subtle image overlay), avoiding harsh repeating patterns.
- **Natural Margins**: Generous, comfortable left and right margins that preserve page breathing room across desktop and mobile.
- **Page Elements**: Date and page number subtly embedded at the top/bottom of the page in secondary ink.
- **Page Shadow & Spine**: Gentle page depth shadow evoking stacked paper leaves.

### 2.3 Page Turning
- **Desktop**: Subtle page navigation buttons (`← Previous page` / `Next page →`) or keyboard arrow keys (`←`, `→`).
- **Mobile Gestures**:
  - `Swipe Left` → Next page.
  - `Swipe Right` → Previous page.
  - `Long Press` → Contextual selection.
  - `Pull Down` → Refresh sync status.
- **Reduced Motion**: If the user or OS has `prefers-reduced-motion` enabled, animate via simple opacity slide/fade rather than spatial page turning.

---

## 3. Product Scope & Boundary Rules

### 3.1 MVP Must-Haves
- **Writing**:
  - Instant focus on active page on app launch.
  - Create, view, edit, and delete entries.
  - Tiptap rich text (bold, italic, lists, quotes, headings) styled with editorial serif typography.
  - Transparent autosave (no explicit "Save" button required). Status indicator: `Saved`, `Saving...`, `Offline`.
  - Undo and redo history.
- **Organization**:
  - Chronological entry list.
  - Calendar picker & date navigator.
  - Fast search by title/content and tag filtering.
  - Favorites and Trash (with restore support).
- **Offline & Local-First**:
  - IndexedDB storage via Dexie.js.
  - Seamless background synchronization when online.
  - Service Worker offline PWA caching.
- **Account & Security**:
  - User signup, login, logout.
  - Isolated user journals with HttpOnly Secure cookies.
- **Data Ownership**:
  - Markdown and JSON export for all or individual entries.
  - Full account and data deletion.

### 3.2 Explicitly Postponed (Forbidden for MVP)
To maintain focus and avoid feature bloat, do NOT implement:
- 🚫 AI assistants, summaries, auto-completions, or sentiment analysis.
- 🚫 Social feeds, public sharing, or collaborative multi-user editing.
- 🚫 Comments, likes, or social reactions.
- 🚫 Voice recording or audio transcription.
- 🚫 Gamification, streak badges, or complex analytics.
- 🚫 Paywalls, subscriptions, or Stripe integration.
- 🚫 Native app store wrappers (Capacitor/Cordova) — prioritize PWA first.
- 🚫 Heavy 3D skeuomorphic page turns or complex media asset management.

---

## 4. Accessibility & Keyboard Shortcuts

Target: **WCAG 2.2 AA Compliance**.
- All interactive controls must have accessible names and visible focus states.
- Color alone must never convey state (e.g. sync status indicators must include accessible text or icons).
- Minimum touch target: 44×44px.
- Text contrast must exceed 4.5:1 for normal text and 3:1 for large/graphical elements.

### Keyboard Shortcuts Table
| Shortcut | Action |
| :--- | :--- |
| `Ctrl / Cmd + N` | Create new entry |
| `Ctrl / Cmd + S` | Force save / trigger sync |
| `Ctrl / Cmd + K` | Global search dialog |
| `Ctrl / Cmd + F` | Find in current page |
| `Ctrl / Cmd + Z` | Undo |
| `Ctrl / Cmd + Shift + Z` | Redo |
| `←` (Arrow Left) | Previous page |
| `→` (Arrow Right) | Next page |
| `Esc` | Exit focus mode / close drawers |

---

## 5. Architecture & Data Integrity Rules

```
┌────────────────────────────────────────────────────────┐
│                      Client Layer                      │
│                                                        │
│   [ User Typing ] ──> [ Tiptap Editor State ]          │
│                                │                       │
│                                ▼                       │
│                  [ Dexie / IndexedDB Store ]           │
│                 (Immediate local save, <5ms)           │
│                                │                       │
│                                ▼                       │
│                     [ Sync Queue Engine ]              │
└───────────────────────────────┬────────────────────────┘
                                │ (Background HTTP/Sync)
                                ▼
┌────────────────────────────────────────────────────────┐
│                      Server Layer                      │
│                                                        │
│                  [ NestJS Sync Controller ]            │
│                                │                       │
│                                ▼                       │
│                [ Idempotent Conflict Resolver ]        │
│                                │                       │
│                                ▼                       │
│                 [ PostgreSQL (Neon) Database ]         │
└────────────────────────────────────────────────────────┘
```

### 5.1 Local-First Principles
- **Zero Save Latency**: Writing commits directly to Dexie.js (IndexedDB). No network call can ever block keystrokes or UI responsiveness.
- **Client-Generated IDs**: Entity IDs are generated client-side using **UUIDv7** (time-sortable, globally unique).
- **Monotonic Revisions**: Every edit increments `revision` and updates `client_updated_at`.
- **Idempotent Sync Protocol**: Sync batches must be re-runnable without duplicate records or side effects.
- **Conflict Handling**: Never overwrite user writing silently. If revisions diverge on the server, a local "conflict copy" entry is preserved.
- **Decoupled Media**: Text saves are independent of attachments. Cloudflare R2 presigned URLs handle binary media out-of-band.

---

## 6. Privacy & Security Rules

1. **Zero Journal Content in Logs**:
   - Backend logging middleware must **never log request bodies** or database content containing journal titles, body content, or user reflections.
   - Sentry error monitoring must sanitize and redact all user text blocks.
2. **Cookie-Based Authentication**:
   - JWT Access (15m) and Refresh (7d) tokens must reside in `HttpOnly`, `Secure`, `SameSite=Strict` cookies.
   - Never store auth tokens in `localStorage` or `sessionStorage`.
3. **Data Erasure**:
   - Account deletion must trigger cascading hard-deletes of all journals, pages, tags, and associated media files in R2.

---

## 7. Phased Implementation Roadmap

- [ ] **Phase 0: Product Definition & Documentation** *(Completed)*
- [ ] **Phase 1: Architecture, Shared Contracts & Dexie Setup**
  - Monorepo structure, shared TypeScript DTOs, Dexie database schemas, UUIDv7 utilities.
- [ ] **Phase 2: Tactile Paper UI & Tiptap Editor**
  - Angular 19 standalone setup, Tailwind paper design tokens, serif typography, Tiptap paper configuration, instant autofocus.
- [ ] **Phase 3: PWA Shell, Gestures & Offline Engine**
  - Service Worker configuration, touch swipe gestures, keyboard shortcuts, reduced-motion fallback.
- [ ] **Phase 4: NestJS Backend, PostgreSQL & Auth**
  - Neon PostgreSQL setup, TypeORM entities/migrations, cookie JWT auth, zero-log middleware, Swagger docs.
- [ ] **Phase 5: Background Sync & Conflict Engine**
  - Client sync queue, server idempotent batch processor, conflict copy preservation.
- [ ] **Phase 6: Data Export, Media & Polish**
  - Markdown/JSON export, Cloudflare R2 uploads, account deletion workflow, tactile visual polish.
