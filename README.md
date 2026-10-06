# Naisei (内省)

> **A quiet digital space for your thoughts.**  
> *Open. Write. Close. Remember.*

---

## 🧭 Core Product Principle

Every feature, interface element, and architectural decision in Naisei is judged against one fundamental question:

> **"Does this make Naisei feel more like writing in a real journal?"**  
> • If **yes** → Consider it.  
> • If **no** → Keep it minimal or discard it.

---

## 1. Visual Identity & Atmosphere

- **Product Name**: **Naisei (内省)** — Personal, calm, minimal, and reflective.
- **Positioning**: A quiet digital space for your thoughts.
- **Style**: Minimal · Warm · Personal · Calm · Paper-like.
- **The Anti-Productivity Aesthetic**:
  - ❌ No excessive cards or widget grids
  - ❌ No strong gradients or vibrant neon colors
  - ❌ No crowded dashboards or analytics tickers
  - ❌ No cluttered icon bars or intimidating formatting palettes
  - 🌿 Closer to: *Opening a beautiful personal notebook on a wooden desk.*

### Color Palette

| Token | Light Mode (Warm Paper) | Dark Mode (Night Stationery) | Description |
| :--- | :--- | :--- | :--- |
| **Primary Background** | `#F5F1E8` | `#1C1C1A` | Warm ivory paper / Deep slate desk |
| **Surface** | `#FAF7F0` | `#252522` | Raised page surface |
| **Primary Text** | `#292824` | `#E8E4DA` | Soft black ink / Warm cream text |
| **Secondary Text** | `#77736B` | `#9A978F` | Muted graphite for dates, page numbers |
| **Accent** | `#6F6A9A` | `#8D88C7` | Muted lavender/indigo (used very sparingly) |

### Typography
- **UI Elements**: Clean, unobtrusive sans-serif (`Inter`, `Geist`).
- **Journal Writing**: Literary, editorial serifs (`Lora`, `Literata`, `Cormorant Garamond`).  
  *Reading journal text should feel like reading a personal diary, not an application.*

---

## 2. The Paper Metaphor

The paper metaphor is the physical and emotional heart of Naisei:
- **MVP Paper Styles**:
  1. **Lined (Default)**: Horizontal ruled lines precisely aligned to writing line-heights.
  2. **Blank**: Unconstrained canvas for free-form reflection.
  3. **Dotted**: Subtle dot-matrix for structured planning, lists, and sketches.
  *(Grid paper reserved for future releases).*
- **Tactile Paper Details**:
  - Warm paper tone with subtle fiber grain/texture (not a generic repeating CSS pattern).
  - Comfortable, authentic margins and soft page depth shadows.
  - Page number and entry date naturally placed on the leaf.
  - The cursor rests directly on the baseline, just like ink touching paper.
- **Page Turning Interaction**:
  - **Desktop**: Clickable page edges / buttons (`← Previous page` / `Next page →`) or arrow keys.
  - **Mobile**: Natural horizontal swipe gestures (`Swipe ←` / `→ Swipe`).
  - **Reduced Motion**: Automatically falls back to a gentle opacity fade/slide for users with motion sensitivity.
  - *Goal*: "I am turning the page of my journal", never an exaggerated 3D gimmick.

---

## 3. Primary User Journey

```
OPEN ──> TODAY'S PAGE ──> WRITE ──> AUTOSAVE ──> CLOSE ──> RETURN ──> BROWSE ──> REFLECT
```

### The Immediate Opening
No loading dashboards or setup barriers. The user launches Naisei and immediately sees:

```
┌──────────────────────────────────────────────┐
│                                              │
│               October 6, 2026                │
│                                              │
│   What is on your mind today?                │
│                                              │
│   |                                          │
│   | Start writing...                         │
│   |                                          │
│                                              │
│                                  Page 24     │
└──────────────────────────────────────────────┘
```

- **Autosave**: Invisible persistence. No loud "Save" buttons.
  - Status indicator in the periphery: `Saved`, `Saving...`, or `Offline`.
- **Browsing**: Navigate seamlessly via page turns, Calendar view, Entry list, Search, or Tags.
- **Reflecting**: Month-in-review retrospectives and reflection prompts are designed for post-MVP maturation.

---

## 4. MVP Scope Definition

### ✅ Must Have (MVP Core)

- **Writing**:
  - Create, edit, and delete journal entries
  - Title & rich-text editing (bold, italic, lists, quotes, headings)
  - Date and timestamp display
  - Continuous local autosave & undo/redo
  - Minimal contextual formatting (bubble menu / markdown shortcuts)
  - Ruled lined paper surface
- **Organization**:
  - Chronological entry list
  - Interactive calendar view
  - Fast search & tag filtering
  - Favorites & Trash (with restore support)
- **Offline & Local-First**:
  - 100% offline writing capability via IndexedDB (Dexie)
  - Local-first autosave (zero network lag)
  - Installable PWA shell with caching
  - Automatic background synchronization when connectivity resumes
- **Account & Security**:
  - User signup, login, and logout
  - Isolated multi-tenant user data
  - HttpOnly secure cookie-based JWT sessions
- **UI / UX**:
  - Authentic paper surface with responsive layout (Desktop & Mobile)
  - Light mode & Dark mode
  - Comprehensive keyboard shortcuts
  - Accessible page turn navigation
- **Data Ownership**:
  - Full journal export (Markdown & JSON)
  - Individual entry export
  - Permanent account deletion with complete data purge

### 🚫 Strictly Postponed (Do Not Build for MVP)
To keep Naisei pure, calm, and distraction-free, the following are explicitly excluded from the MVP:
- ❌ AI writing assistants, AI summaries, or sentiment bots
- ❌ Social sharing feeds, public links, or collaborative journals
- ❌ Comments, reactions, or likes
- ❌ Voice journal transcription
- ❌ Complex analytics, mood graphs, or streak gamification
- ❌ Paywalls, subscriptions, or payment flows
- ❌ Native app store wrappers (focus purely on PWA excellence)
- ❌ Elaborate 3D skeuomorphic notebook animations
- ❌ Complex multi-tier media management

---

## 5. Desktop & Mobile Wireframe Model

### Desktop View
A three-column foundation where the **Paper Page visually dominates**. The navigation and entry sidebar tuck away into **Focus Mode** when typing begins:

```
┌──────┬──────────────┬────────────────────────────────────────┐
│      │              │                                        │
│ Nav  │ Entries      │               Paper Page               │
│      │              │                                        │
│      │              │            October 6, 2026             │
│      │              │                                        │
│      │              │            Dear diary...               │
│      │              │          ────────────────────          │
│      │              │            Today I started...          │
│      │              │          ────────────────────          │
│      │              │                                Page 24 │
└──────┴──────────────┴────────────────────────────────────────┘
```

### Mobile PWA View
A focused, distraction-free single-page notebook view with thumb-accessible controls:

```
┌──────────────────────────────────────┐
│  ←              Naisei             ⋯ │
├──────────────────────────────────────┤
│                                      │
│           October 6, 2026            │
│                                      │
│   Dear diary,                        │
│                                      │
│   Today I finally finished the       │
│   first chapter...                   │
│                                      │
│                                      │
│                                 24   │
├──────────────────────────────────────┤
│    [Entries]        (+)   [Calendar] │
└──────────────────────────────────────┘
```

- **Mobile Gestures**:
  - `Swipe Left` → Next page
  - `Swipe Right` → Previous page
  - `Long Press` → Text selection & contextual actions
  - `Pull Down` → Trigger sync status refresh
  - Viewport zoom prevention during writing while keeping OS accessibility intact.

---

## 6. Accessibility & Keyboard Shortcuts

Targeting **WCAG 2.2 AA** conformance:
- Full keyboard navigation with visible, high-contrast focus rings.
- Minimum 44×44px touch targets.
- Accessible semantic markup for screen readers.
- Respect for `prefers-reduced-motion` across page turns.
- Never relying solely on color to convey status.

| Shortcut | Action |
| :--- | :--- |
| `Ctrl / Cmd + N` | New journal entry |
| `Ctrl / Cmd + S` | Force save / trigger sync |
| `Ctrl / Cmd + K` | Global search |
| `Ctrl / Cmd + F` | Find in page |
| `Ctrl / Cmd + Z` | Undo |
| `Ctrl / Cmd + Shift + Z` | Redo |
| `←` / `→` | Previous page / Next page |
| `Esc` | Exit focus mode / close drawers |

---

## 7. Data Ownership & Privacy

> **"Your thoughts belong to you."**

- **Full Export**: Export entire journal or single entries as clean **Markdown** or structured **JSON**. (Formatted PDF export styled like a real Naisei notebook planned post-MVP).
- **Data Deletion**: Complete, permanent erasure of entries, tags, media, and user accounts upon request.
- **Privacy Standard**:
  - Secure transport via HTTPS.
  - Password hashing (Argon2 / bcrypt).
  - HttpOnly, Secure, SameSite cookies.
  - **Zero Logging of Journal Text**: Server logs must **never** record entry content, titles, or user writing payloads.

---

## 8. Technology Stack Summary

- **Frontend**: Angular 19+ (Standalone, Signals, Control Flow)
- **UI & Styling**: Tailwind CSS + Angular CDK
- **Editor**: Tiptap + ProseMirror
- **Local Storage**: IndexedDB via Dexie.js
- **PWA**: Angular Service Worker (`@angular/pwa`)
- **Backend API**: NestJS
- **Database**: PostgreSQL (Neon) with TypeORM
- **Authentication**: JWT in HttpOnly Secure cookies
- **Media**: Cloudflare R2 (presigned URLs)
- **Testing**: Vitest / Jest + Playwright
- **CI/CD**: GitHub Actions

For implementation rules and developer instructions, see **[INSTRUCTIONS.md](file:///c:/Users/habeebu/Desktop/Habeeb/Personal/Naisei/INSTRUCTIONS.md)**.
