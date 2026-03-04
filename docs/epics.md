# Epics, Tracks & Tasks — CCAT Cognitive Test Engine (MVP)

---

## Epic 1: Project Foundation & Data Layer

> Set up the project infrastructure, database schema, and seed data.

### Track 1.1: Project Setup

- [ ] Initialize Next.js 14 project with TypeScript
- [ ] Configure Tailwind CSS
- [ ] Set up project folder structure (`app/`, `lib/`, `components/`, `types/`)
- [ ] Configure ESLint and Prettier
- [ ] Set up environment variables (`.env.local`)

### Track 1.2: Database & Schema

- [ ] Set up PostgreSQL (or Supabase) database
- [ ] Define `Question` table (id, category, difficulty, stem, correctOptionId, metadata/tags)
- [ ] Define `Option` table (id, questionId, label, text)
- [ ] Define `TestSession` table (id, userId, startedAt, endsAt, status)
- [ ] Define `QuestionInstance` table (questionId, sessionId, order, userAnswerId, answeredAt)
- [ ] Create migrations and run them
- [ ] Add database client/ORM setup (Prisma or Drizzle)

### Track 1.3: Seed Data

- [ ] Create 30 Verbal questions (analogies, antonyms, sentence completion) across easy/medium/hard
- [ ] Create 30 Math & Logic questions (arithmetic, sequences, deduction) across easy/medium/hard
- [ ] Create 30 Spatial Reasoning questions (pattern continuation, matrix, rotation) using text/ASCII/SVG
- [ ] Write seed script to populate the database
- [ ] Validate seed data covers difficulty distribution (30% easy, 50% medium, 20% hard)

---

## Epic 2: Test Generation Engine

> Build the backend logic that assembles balanced, randomized test sessions.

### Track 2.1: Question Bank Query Layer

- [ ] Create data access functions to query questions by category
- [ ] Create data access functions to query questions by difficulty
- [ ] Add random sampling utility with category/difficulty constraints

### Track 2.2: Test Session Generator

- [ ] Implement generator algorithm: select 17 verbal + 17 math/logic + 16 spatial
- [ ] Apply difficulty distribution (30% easy, 50% medium, 20% hard) within each category
- [ ] Shuffle selected questions into random order
- [ ] Create `TestSession` record with `endsAt = startedAt + 15 min`
- [ ] Create associated `QuestionInstance` records with order
- [ ] Write unit tests for generator balance and constraints

---

## Epic 3: API Endpoints

> Expose RESTful API routes for the test lifecycle.

### Track 3.1: Session Management APIs

- [ ] `POST /api/test-sessions` — create a new test session, return session ID + questions + endsAt
- [ ] `POST /api/test-sessions/:id/answer` — submit an answer (questionId, selectedOptionId), validate session is active
- [ ] `POST /api/test-sessions/:id/finish` — mark session as completed
- [ ] Auto-expire sessions past `endsAt` (set status to "expired")

### Track 3.2: Results API

- [ ] `GET /api/test-sessions/:id/result` — calculate and return raw score, category breakdown, percentile band
- [ ] Implement scoring logic: count correct answers overall and per category
- [ ] Implement percentile banding (0–15 Below Average, 16–30 Average, 31–40 Above Average, 41–50 Exceptional)

### Track 3.3: Security & Validation

- [ ] Strip correct answers from question data sent to the frontend
- [ ] Validate session ownership on all endpoints
- [ ] Prevent duplicate answer submissions for the same question
- [ ] Prevent finishing an already-completed/expired session
- [ ] Add rate limiting on `POST /api/test-sessions` (optional)

---

## Epic 4: Test Runner UI

> Build the user-facing test experience — landing, instructions, test, and results.

### Track 4.1: Landing Page

- [ ] Build landing page with test description (50 questions, 15 minutes, 3 categories)
- [ ] Add "Start Test" CTA button
- [ ] Style with Tailwind CSS — clean, minimal design

### Track 4.2: Instructions Screen

- [ ] Display test rules (15-min limit, skipping allowed, no calculators)
- [ ] "Begin Test" button that calls `POST /api/test-sessions` and navigates to test runner

### Track 4.3: Test Runner Screen

- [ ] Top bar: countdown timer (mm:ss) + question progress (e.g., "12 / 50")
- [ ] Question panel: render question stem + 4 multiple-choice options
- [ ] Handle option selection and submit answer to API
- [ ] Navigation controls: Previous, Next, Skip buttons
- [ ] "Finish Test" button with confirmation dialog
- [ ] Auto-submit when timer hits 00:00
- [ ] Visual indicator for answered vs unanswered questions
- [ ] Handle spatial reasoning questions with SVG/ASCII rendering

### Track 4.4: Results Screen

- [ ] Display total score (e.g., "32 out of 50")
- [ ] Display performance band (Below Average / Average / Above Average / Exceptional)
- [ ] Display category breakdown (Verbal: X/17, Math & Logic: X/17, Spatial: X/16)
- [ ] Add "Take Another Test" / "Return Home" actions

---

## Epic 5: Timer System

> Implement the global countdown timer with auto-finish behavior.

### Track 5.1: Timer Logic

- [ ] Create timer hook/component that counts down from 15:00
- [ ] Sync timer with server-side `endsAt` timestamp (prevent client-side cheating)
- [ ] Auto-call finish endpoint when timer reaches zero
- [ ] Persist remaining time across page refreshes (derive from `endsAt`)
- [ ] Display timer prominently in top bar with visual warning at < 2 minutes

---

## Epic 6: Admin Question Management

> Build admin tooling to create, edit, and manage the question bank.

### Track 6.1: Admin Dashboard UI

- [ ] Create `/admin/questions` page with question list table
- [ ] Add filters: by category (verbal, math_logic, spatial) and difficulty (1, 2, 3)
- [ ] Display question count per category

### Track 6.2: Question CRUD

- [ ] Create question form (stem, category, difficulty, 4 options, correct answer, tags)
- [ ] Edit existing question
- [ ] Delete question with confirmation
- [ ] Validate all required fields before saving

### Track 6.3: Admin APIs

- [ ] `GET /api/admin/questions` — list questions with filtering
- [ ] `POST /api/admin/questions` — create a question
- [ ] `PUT /api/admin/questions/:id` — update a question
- [ ] `DELETE /api/admin/questions/:id` — delete a question
- [ ] Add basic admin auth/protection for admin routes

---

## Epic 7: Polish & Deployment

> Final QA, performance checks, and deployment.

### Track 7.1: Testing & QA

- [ ] End-to-end test: full test session flow (start → answer → finish → results)
- [ ] Verify test loads under 1 second
- [ ] Verify result calculation under 100ms
- [ ] Verify balanced test generation (category and difficulty distribution)
- [ ] Test edge cases: timer expiry, skipped questions, rapid navigation, double-submit

### Track 7.2: Deployment

- [ ] Configure Vercel project
- [ ] Set up production database (Supabase or managed Postgres)
- [ ] Configure environment variables in Vercel
- [ ] Run seed script on production database
- [ ] Deploy and smoke test

---

## Summary

| Epic | Description                  | Tracks | Tasks |
| ---- | ---------------------------- | ------ | ----- |
| 1    | Foundation & Data Layer      | 3      | 17    |
| 2    | Test Generation Engine       | 2      | 8     |
| 3    | API Endpoints                | 3      | 11    |
| 4    | Test Runner UI               | 4      | 15    |
| 5    | Timer System                 | 1      | 5     |
| 6    | Admin Question Management    | 3      | 11    |
| 7    | Polish & Deployment          | 2      | 9     |
| **Total** |                         | **18** | **76** |
