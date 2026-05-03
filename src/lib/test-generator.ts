import { prisma } from "@/lib/prisma";
import { Category } from "@/generated/prisma/client";
import {
  CCAT_CATEGORY_DISTRIBUTIONS,
  CCAT_SECTION_BLUEPRINT,
  CCAT_STYLE_TAGS,
  ccatStemKey,
  isCcatStyleQuestion,
} from "@/lib/ccat-question-policy";

const TEST_DURATION_MINUTES = 15;
const CATEGORY_PRACTICE_QUESTIONS = 20;
const CATEGORY_PRACTICE_MINUTES = 6;

function shuffle<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function sampleRandom<T>(array: T[], count: number): T[] {
  return shuffle(array).slice(0, count);
}

type CandidateQuestion = {
  id: string;
  category: Category;
  difficulty: number;
  stem: string;
  tags: string[];
  correctOptionId: string;
  options: { id: string; label: string; text: string }[];
};

function isRuntimeCcatStyleQuestion(q: CandidateQuestion) {
  const correctOption = q.options.find((option) => option.id === q.correctOptionId);
  return isCcatStyleQuestion({
    category: q.category,
    stem: q.stem,
    options: q.options,
    correctLabel: correctOption?.label,
    difficulty: q.difficulty,
    tags: q.tags,
  });
}

async function getEligibleCandidates(category: Category, tags: string[]) {
  const candidates = await prisma.question.findMany({
    where: {
      category,
      tags: { hasSome: tags },
    },
    select: {
      id: true,
      category: true,
      difficulty: true,
      stem: true,
      tags: true,
      correctOptionId: true,
      options: { select: { id: true, label: true, text: true } },
    },
  });

  return candidates.filter(isRuntimeCcatStyleQuestion);
}

export async function generateTest(userId?: string) {
  const selectedQuestionIds: string[] = [];
  const selectedQuestions: CandidateQuestion[] = [];
  const selectedIds = new Set<string>();
  const selectedStemKeys = new Set<string>();
  const selectedCategoryCounts: Record<Category, number> = {
    verbal: 0,
    math_logic: 0,
    spatial: 0,
  };

  for (const section of CCAT_SECTION_BLUEPRINT) {
    const candidates = await getEligibleCandidates(section.category, [...section.tags]);
    const available = candidates.filter((q) => !selectedIds.has(q.id) && !selectedStemKeys.has(ccatStemKey(q)));
    const selected = sampleRandom(available, section.total);

    if (selected.length < section.total) {
      const fallbackCandidates = await getEligibleCandidates(section.category, [...CCAT_STYLE_TAGS[section.category]]);
      const selectedSectionIds = new Set(selected.map((q) => q.id));
      const selectedSectionStemKeys = new Set(selected.map((q) => ccatStemKey(q)));
      const fallback = sampleRandom(
        fallbackCandidates.filter(
          (q) =>
            !selectedIds.has(q.id) &&
            !selectedSectionIds.has(q.id) &&
            !selectedStemKeys.has(ccatStemKey(q)) &&
            !selectedSectionStemKeys.has(ccatStemKey(q))
        ),
        section.total - selected.length
      );
      selected.push(...fallback);
    }

    if (selected.length < section.total) {
      throw new Error(`Not enough ${section.category} questions for CCAT section ${section.tags.join("/")}: need ${section.total}, found ${selected.length}`);
    }

    for (const q of selected) {
      selectedQuestionIds.push(q.id);
      selectedQuestions.push(q);
      selectedIds.add(q.id);
      selectedStemKeys.add(ccatStemKey(q));
      selectedCategoryCounts[q.category] += 1;
    }
  }

  for (const { category, total } of CCAT_CATEGORY_DISTRIBUTIONS) {
    const missing = total - selectedCategoryCounts[category];
    if (missing <= 0) continue;

    const candidates = await getEligibleCandidates(category, [...CCAT_STYLE_TAGS[category]]);
    const filler = sampleRandom(
      candidates.filter((q) => !selectedIds.has(q.id) && !selectedStemKeys.has(ccatStemKey(q))),
      missing
    );

    if (filler.length < missing) {
      throw new Error(`Not enough ${category} CCAT-style questions to generate a test: need ${total}, found ${selectedCategoryCounts[category] + filler.length}`);
    }

    for (const q of filler) {
      selectedQuestionIds.push(q.id);
      selectedQuestions.push(q);
      selectedIds.add(q.id);
      selectedStemKeys.add(ccatStemKey(q));
      selectedCategoryCounts[q.category] += 1;
    }
  }

  const orderedIds = [1, 2, 3]
    .flatMap((difficulty) => shuffle(selectedQuestions.filter((q) => q.difficulty === difficulty)))
    .map((q) => q.id);
  const shuffledIds = orderedIds.length === selectedQuestionIds.length ? orderedIds : shuffle(selectedQuestionIds);
  const now = new Date();
  const endsAt = new Date(now.getTime() + TEST_DURATION_MINUTES * 60 * 1000);

  const session = await prisma.testSession.create({
    data: {
      userId: userId ?? null,
      startedAt: now,
      endsAt,
      status: "active",
      questions: {
        create: shuffledIds.map((questionId, index) => ({
          questionId,
          order: index + 1,
        })),
      },
    },
    include: {
      questions: {
        orderBy: { order: "asc" },
        include: {
          question: {
            include: {
              options: { select: { id: true, label: true, text: true } },
            },
          },
        },
      },
    },
  });

  return {
    sessionId: session.id,
    endsAt: session.endsAt,
    questions: session.questions.map((qi) => ({
      instanceId: qi.id,
      order: qi.order,
      questionId: qi.questionId,
      category: qi.question.category,
      stem: qi.question.stem,
      options: qi.question.options,
    })),
  };
}

export async function generateCategoryPractice(category: Category, userId?: string) {
  const candidates = await getEligibleCandidates(category, [...CCAT_STYLE_TAGS[category]]);
  const selected = [1, 2, 3]
    .flatMap((difficulty) => sampleRandom(candidates.filter((q) => q.difficulty === difficulty), Math.ceil(CATEGORY_PRACTICE_QUESTIONS / 3)))
    .slice(0, CATEGORY_PRACTICE_QUESTIONS);

  if (selected.length < CATEGORY_PRACTICE_QUESTIONS) {
    const selectedIds = new Set(selected.map((q) => q.id));
    selected.push(
      ...sampleRandom(
        candidates.filter((q) => !selectedIds.has(q.id)),
        CATEGORY_PRACTICE_QUESTIONS - selected.length
      )
    );
  }

  if (selected.length < CATEGORY_PRACTICE_QUESTIONS) {
    throw new Error(`Not enough ${category} CCAT-style questions for category practice: need ${CATEGORY_PRACTICE_QUESTIONS}, found ${selected.length}`);
  }

  const now = new Date();
  const endsAt = new Date(now.getTime() + CATEGORY_PRACTICE_MINUTES * 60 * 1000);

  const session = await prisma.testSession.create({
    data: {
      userId: userId ?? null,
      startedAt: now,
      endsAt,
      status: "active",
      questions: {
        create: selected.map((question, index) => ({
          questionId: question.id,
          order: index + 1,
        })),
      },
    },
    include: {
      questions: {
        orderBy: { order: "asc" },
        include: {
          question: {
            include: {
              options: { select: { id: true, label: true, text: true } },
            },
          },
        },
      },
    },
  });

  return {
    sessionId: session.id,
    endsAt: session.endsAt,
    questions: session.questions.map((qi) => ({
      instanceId: qi.id,
      order: qi.order,
      questionId: qi.questionId,
      category: qi.question.category,
      stem: qi.question.stem,
      options: qi.question.options,
    })),
  };
}
