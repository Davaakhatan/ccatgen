# PRD — CCAT-Style Cognitive Test Engine (MVP)

## 1. Product Overview

### Product Name

CCAT-Style Cognitive Assessment Engine (MVP)

### Product Vision

Build a fast, simple web application that simulates a **CCAT-style cognitive ability test** experience. The system generates timed mixed-category assessments (verbal, math & logic, spatial reasoning) and provides immediate performance feedback using approximate percentile bands.

The goal is to allow users to practice **high-speed cognitive reasoning tests commonly used in hiring assessments**.

This is **not an official CCAT product** and does not use proprietary question banks or scoring norms.

### Objectives

* Provide a **15-minute timed cognitive test**
* Automatically generate **50 mixed questions per session**
* Support **verbal, math/logic, and spatial reasoning**
* Deliver **instant results with score breakdown**
* Create a **reusable question engine** for generating future tests

### Success Metrics (MVP)

* User completes a test session successfully
* Test loads under **1 second**
* Result calculation under **100ms**
* Question generator produces **balanced tests**
* ≥90% of users reach the results page without errors

---

# 2. Target Users

### Primary Users

Job seekers preparing for cognitive assessments such as:

* CCAT
* Wonderlic
* cognitive aptitude hiring tests

### Secondary Users

* Students training for aptitude exams
* Candidates practicing reasoning speed

### User Needs

Users want to:

* Practice under **realistic time pressure**
* Experience **mixed reasoning questions**
* See **immediate performance feedback**
* Identify strengths and weaknesses by category

---

# 3. Product Scope

## MVP Features

### Test Engine

* 50 multiple-choice questions
* 3 categories:

  * Verbal
  * Math & Logic
  * Spatial Reasoning

### Timer

* Global **15 minute countdown**
* Auto-finish when time expires

### Question Navigation

Users can:

* Move **Next / Previous**
* **Skip questions**
* Return to unanswered questions

### Scoring

Score is based on:

```
Raw Score = Number of Correct Answers
```

Results include:

* Total correct answers
* Category breakdown
* Percentile band estimate

Example banding:

| Raw Score | Band          |
| --------- | ------------- |
| 0–15      | Below Average |
| 16–30     | Average       |
| 31–40     | Above Average |
| 41–50     | Exceptional   |

These bands are **approximate and not real CCAT norms**.

---

# 4. Question Categories

## 4.1 Verbal Reasoning

Measures language understanding and word relationships.

Example Types:

* Analogies
* Antonyms
* Sentence completion

Example Question:

**Stem**

```
Bright is to Dim as Hot is to:
```

Options:

A. Cold
B. Warm
C. Fire
D. Sun

Correct: **A**

---

## 4.2 Math & Logic

Measures numerical reasoning and logical thinking.

Example Types:

* Arithmetic word problems
* Number sequences
* Logical deduction

Example Question:

```
A cashier processes 15 customers per hour.
How many customers can be processed in 8 hours?
```

Options:

A. 60
B. 90
C. 120
D. 150

Correct: **C**

---

## 4.3 Spatial Reasoning

Measures visual pattern recognition and mental rotation.

Example Types:

* Rotated shapes
* Pattern continuation
* Matrix reasoning

For MVP, spatial questions use:

* **SVG shapes**
* **ASCII diagrams**

Example:

```
[□] → [■] → [□] → ?
```

Options:

A. □
B. ■
C. △
D. ○

---

# 5. Test Generation System

Each test session is dynamically generated.

## Test Composition

Target distribution:

| Category     | Percentage |
| ------------ | ---------- |
| Verbal       | 33%        |
| Math & Logic | 33%        |
| Spatial      | 33%        |

Total Questions:

```
50 per session
```

Difficulty distribution:

| Difficulty | Percentage |
| ---------- | ---------- |
| Easy       | 30%        |
| Medium     | 50%        |
| Hard       | 20%        |

## Generator Algorithm

Steps:

1. Query question bank
2. Filter by category and difficulty
3. Random sample with constraints
4. Shuffle question order
5. Store in TestSession

Pseudo-logic:

```
select questions where category = verbal limit 17
select questions where category = math_logic limit 17
select questions where category = spatial limit 16

shuffle(allQuestions)
create session
```

---

# 6. Data Model

## Question

```
Question {
  id: string
  category: "verbal" | "math_logic" | "spatial"
  difficulty: 1 | 2 | 3
  stem: string
  options: Option[]
  correctOptionId: string
  metadata: {
    tags: string[]
  }
}
```

## Option

```
Option {
  id: string
  label: string
  text: string
}
```

## TestSession

```
TestSession {
  id: string
  userId?: string
  startedAt: datetime
  endsAt: datetime
  status: "active" | "completed" | "expired"
  questions: QuestionInstance[]
}
```

## QuestionInstance

```
QuestionInstance {
  questionId: string
  order: number
  userAnswerId?: string
  answeredAt?: datetime
}
```

---

# 7. System Architecture

## Tech Stack (Recommended)

Frontend
Next.js 14
TypeScript
Tailwind CSS

Backend
Next.js API Routes
Node.js

Database
PostgreSQL (or Supabase)

Deployment
Vercel

---

## High Level Architecture

```
User Browser
     |
     v
Next.js Frontend
     |
     v
API Routes
     |
     v
Database (Postgres)
```

---

# 8. API Design

## Create Test Session

POST

```
/api/test-sessions
```

Response:

```
{
  sessionId,
  questions[],
  endsAt
}
```

---

## Submit Answer

POST

```
/api/test-sessions/:id/answer
```

Payload:

```
{
  questionId,
  selectedOptionId
}
```

---

## Finish Test

POST

```
/api/test-sessions/:id/finish
```

---

## Get Results

GET

```
/api/test-sessions/:id/result
```

Response:

```
{
  rawScore,
  categoryBreakdown,
  percentileBand
}
```

---

# 9. User Experience Flow

## Landing Page

Text:

```
CCAT-Style Cognitive Test

50 questions
15 minutes
Verbal, Math & Logic, Spatial Reasoning
```

CTA:

```
Start Test
```

---

## Instructions Screen

Explain:

* 15 minute limit
* Most people don't finish all questions
* You may skip and return
* No calculators

Button:

```
Begin Test
```

---

## Test Runner

UI Elements:

Top Bar:

```
Timer: 14:59
Question: 1 / 50
```

Question Panel:

* Question stem
* Multiple choice options

Controls:

```
Previous
Next
Skip
Finish Test
```

Auto-submit when timer reaches zero.

---

## Results Screen

Displays:

### Score

```
You answered 32 out of 50 correctly.
```

### Band

```
Performance Band: Above Average
```

### Category Breakdown

Example:

Verbal
10 / 17

Math & Logic
12 / 17

Spatial
10 / 16

---

# 10. Admin Question Tool

Admin dashboard:

```
/admin/questions
```

Functions:

* Create question
* Edit question
* Delete question
* Filter by category
* Filter by difficulty

Minimum seed size:

```
90 questions
30 per category
```

Future target:

```
500+ questions
```

---

# 11. Security Considerations

* Prevent answer exposure in frontend
* Validate session ownership
* Prevent multiple test submissions
* Protect API endpoints

Optional:

Rate limit test creation.

---

# 12. Future Improvements

## Phase 2

* AI generated question bank
* Adaptive difficulty
* Question analytics
* Speed metrics
* Leaderboard

## Phase 3

* Real percentile modeling
* Skill diagnostics
* Practice mode
* Mobile optimized UI

---

# 13. Risks

| Risk                    | Mitigation                     |
| ----------------------- | ------------------------------ |
| Question repetition     | Expand question bank           |
| Users gaming answers    | Randomized question sets       |
| Poor percentile mapping | Clearly label as approximation |

---

# 14. Milestones

| Phase                | Timeline |
| -------------------- | -------- |
| Question schema + DB | Day 1    |
| API endpoints        | Day 2    |
| Test runner UI       | Day 3    |
| Timer + navigation   | Day 4    |
| Results engine       | Day 5    |
| Admin question tool  | Day 6    |

Target MVP delivery:

**~1 week**
