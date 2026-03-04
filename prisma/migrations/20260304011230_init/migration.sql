-- CreateEnum
CREATE TYPE "Category" AS ENUM ('verbal', 'math_logic', 'spatial');

-- CreateEnum
CREATE TYPE "SessionStatus" AS ENUM ('active', 'completed', 'expired');

-- CreateTable
CREATE TABLE "Question" (
    "id" TEXT NOT NULL,
    "category" "Category" NOT NULL,
    "difficulty" INTEGER NOT NULL,
    "stem" TEXT NOT NULL,
    "correctOptionId" TEXT NOT NULL,
    "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Option" (
    "id" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "text" TEXT NOT NULL,

    CONSTRAINT "Option_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TestSession" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endsAt" TIMESTAMP(3) NOT NULL,
    "status" "SessionStatus" NOT NULL DEFAULT 'active',

    CONSTRAINT "TestSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestionInstance" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "userAnswerId" TEXT,
    "answeredAt" TIMESTAMP(3),

    CONSTRAINT "QuestionInstance_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "QuestionInstance_sessionId_questionId_key" ON "QuestionInstance"("sessionId", "questionId");

-- CreateIndex
CREATE UNIQUE INDEX "QuestionInstance_sessionId_order_key" ON "QuestionInstance"("sessionId", "order");

-- AddForeignKey
ALTER TABLE "Option" ADD CONSTRAINT "Option_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionInstance" ADD CONSTRAINT "QuestionInstance_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "TestSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionInstance" ADD CONSTRAINT "QuestionInstance_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
