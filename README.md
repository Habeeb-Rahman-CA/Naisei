# Naisei (内省)

> **A tactile, distraction-free digital journal designed to feel like opening a real notebook.**  
> *Open → Notebook / Page → Cursor Ready → Write.*

---

## 📖 Vision & Philosophy

Most modern note-taking apps feel like relational databases, productivity suites, or endless markdown filing cabinets. They demand categorization, tags, and formatting before you even begin thinking.

**Naisei (内省 - self-examination, introspection)** is built with a different philosophy:
- **Writing First**: The primary interaction is pen to paper. Navigation, organization, search, tags, and settings exist solely to support writing, never to compete with it.
- **Physical Notebook Metaphor**:
  - Paper-like visual surface with subtle texture, ruling lines, margins, and tangible page depth.
  - Page turning and swipe gestures that reinforce the physical notebook feel.
  - Minimalistic, calm UI: formatting and editing controls stay invisible until explicitly summoned.
- **Instant Readiness**: Zero latency on launch. Open the app, and you are immediately on your page with the cursor blinking and ready.
- **True Offline-First**: Writing never waits for a server response. You own your words locally first, synced quietly in the background.
- **PWA Excellence**: Designed to look and feel native on mobile and desktop without packaging bloat.

---

## 🛠️ Technology Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend Framework** | **Angular 19+** | Modern standalone components, Signals-based reactive state, new control flow syntax |
| **Styling & Primitives** | **Tailwind CSS + Angular CDK** | Paper aesthetics, tactile gestures, accessibility primitives, dialogs, responsive layout |
| **Rich-Text Engine** | **Tiptap + ProseMirror** | Extensible headless rich-text editing styled to look like paper typography |
| **Local / Offline Store** | **IndexedDB + Dexie.js** | Client-side reactive database, drafts, sync queue, and instant local persistence |
| **PWA & Caching** | **Angular Service Worker** (`@angular/pwa`) | Offline asset caching, installable shell, and background sync support |
| **Backend Framework** | **NestJS** | Modular TypeScript REST API, authentication, sync engine, and business logic |
| **Database** | **PostgreSQL (Neon)** | Serverless Postgres with branching, JSONB support for blocks, and scalable storage |
| **ORM** | **TypeORM** | Strongly-typed entity mappings, migrations, and transactional updates |
| **Authentication** | **JWT (HttpOnly Secure Cookies)** | Access & refresh token rotation with CSRF protection |
| **File / Media Storage**| **Cloudflare R2** (or S3-compatible) | Fast, egress-free object storage for photos and future attachments |
| **Validation** | **class-validator & class-transformer** | Strict DTO validation and sanitization across all API endpoints |
| **API Documentation** | **Swagger / OpenAPI** | Interactive API exploration and client generation contracts |
| **Testing** | **Vitest / Jest + Playwright** | Fast unit tests and realistic cross-platform end-to-end user journey tests |
| **CI/CD** | **GitHub Actions** | Automated linting, test runs, Docker builds, and deployment pipelines |
| **Monitoring** | **Sentry + Structured Logging** | Real-time crash analytics and production diagnostics |

> 📌 **Architectural Decision**: We deliberately focus on creating a world-class **PWA** first. Capacitor is deferred until app-store distribution or native OS APIs are strictly required.

---

## 🏛️ Local-First Architecture

Naisei adheres strictly to the **Local-First principle**:  
*The journal must never depend on an active network connection or successful API response to save what the user is typing.*

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

### Core Data Integrity Rules:
1. **Client-Generated IDs**: Every notebook, page, entry, and tag receives a globally unique, collision-resistant ID (e.g. UUIDv7) generated on the client before saving.
2. **Deterministic Revisions**: Every modification updates a local timestamp and incremental revision counter (`client_updated_at`, `revision`).
3. **Idempotent Sync**: Synchronization requests are idempotent. Retried network calls will never duplicate entries or corrupt states.
4. **Separation of Concerns**: Journal textual content and media attachments are decoupled. Text is stored in structured blocks/JSON, while media is uploaded out-of-band to Cloudflare R2 and referenced via immutable asset IDs.
5. **Conflict Resolution**: Designed for deterministic reconciliation (Last-Write-Wins with field-level tracking and conflict flagging) before multi-device live sync is enabled.

---

## 📂 Proposed Workspace Structure

```
naisei/
├── apps/
│   ├── web/                    # Angular 19+ PWA Frontend
│   │   ├── src/
│   │   │   ├── app/
│   │   │   │   ├── core/       # Dexie DB, Sync service, Auth state, PWA worker
│   │   │   │   ├── features/   # Notebook, Page, Editor, Search, Settings
│   │   │   │   ├── shared/     # Paper-feel UI components, icons, dialogs
│   │   │   │   └── styles/     # Paper textures, typography, dark/sepia themes
│   │   │   └── manifest.webmanifest
│   │   ├── project.json / angular.json
│   │   └── tailwind.config.ts
│   │
│   └── api/                    # NestJS Backend Application
│       ├── src/
│       │   ├── auth/           # Cookie-based JWT auth, guard & strategies
│       │   ├── journals/       # Journals & pages REST resources
│       │   ├── sync/           # Idempotent batch sync engine
│       │   ├── storage/        # Cloudflare R2 presigned URL generator
│       │   ├── database/       # TypeORM configuration & migrations
│       │   └── common/         # Filters, interceptors, middleware
│       └── test/
│
├── libs/
│   └── shared-types/           # Shared TypeScript DTOs, Enums, Models & Schemas
│
├── .github/
│   └── workflows/              # CI/CD workflows for test & deploy
├── INSTRUCTIONS.md             # Developer & AI implementation rules
└── README.md                   # Project overview and specifications
```

---

## 🗺️ Project Roadmap

- [ ] **Phase 1: Architecture & Local Store** (Dexie schemas, shared models, client ID generation)
- [ ] **Phase 2: Tactile Editor & Paper UI** (Tiptap configuration, paper styling, lines, page navigation)
- [ ] **Phase 3: PWA & Offline Engine** (Service Worker, install prompts, offline asset caching)
- [ ] **Phase 4: NestJS Backend & Auth** (PostgreSQL/TypeORM, cookie JWT auth, secure sessions)
- [ ] **Phase 5: Background Sync & Conflict Engine** (Idempotent sync protocol, queueing, retry logic)
- [ ] **Phase 6: Media & Polish** (R2 direct uploads, gesture page flips, sound/haptic subtleties)

---

## 📜 Documentation & Guidelines

For exhaustive development guidelines, architectural contracts, UI rules, and coding standards, refer to:
👉 **[INSTRUCTIONS.md](file:///c:/Users/habeebu/Desktop/Habeeb/Personal/Naisei/INSTRUCTIONS.md)**
