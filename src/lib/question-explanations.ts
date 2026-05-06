type QuestionForReview = {
  category: "verbal" | "math_logic" | "spatial";
  tags: string[];
  options: { id: string; label: string; text: string }[];
  correctOptionId: string;
};

function categoryLabel(category: QuestionForReview["category"]) {
  if (category === "verbal") return "Verbal";
  if (category === "math_logic") return "Math & Logic";
  return "Spatial";
}

function fastMethod(question: QuestionForReview) {
  const tags = new Set(question.tags);

  if (question.category === "spatial") {
    if (tags.has("matrix")) {
      return "Fast method: scan one completed row and one completed column, name the changing attributes, then choose the option that satisfies both directions.";
    }
    if (tags.has("odd-one-out")) {
      return "Fast method: count and compare one visual attribute at a time: shape, fill, position, orientation, symmetry, and internal marks. The odd figure breaks the shared rule.";
    }
    return "Fast method: compare each figure to the next and track only one attribute at a time: rotation, fill, position, count, size, or shape type.";
  }

  if (question.category === "verbal") {
    if (tags.has("attention-to-detail")) {
      return "Fast method: lock onto one character group at a time, scan left to right, and check confusing pairs such as 0/O, 1/I, 8/B, missing punctuation, and transposed digits.";
    }
    if (tags.has("analogy")) {
      return "Fast method: name the relationship before reading choices, then reject pairs with the wrong relationship direction.";
    }
    if (tags.has("antonym")) {
      return "Fast method: turn the word into a plain meaning, eliminate same-direction choices, and pick the strongest opposite.";
    }
    return "Fast method: predict the missing meaning from the sentence tone before checking choices.";
  }

  if (tags.has("ordering-logic")) {
    return "Fast method: draw numbered slots, place fixed/immediate clues first, then test only the choices against those forced positions.";
  }
  if (tags.has("true-false-uncertain") || tags.has("syllogism") || tags.has("logical-deduction")) {
    return "Fast method: treat the statements as law, avoid outside knowledge, and only accept conclusions forced by the given statements.";
  }
  if (tags.has("number-sequence") || tags.has("number-series") || tags.has("letter-series")) {
    return "Fast method: check differences, alternating positions, multiplication, and letter-position movement before doing long work.";
  }
  if (tags.has("data-interpretation") || tags.has("graph-interpretation")) {
    return "Fast method: read the question first, find only the needed row or column, then calculate the requested comparison.";
  }

  return "Fast method: translate the stem into one short equation or ratio, estimate first, then use answer choices to avoid unnecessary arithmetic.";
}

function correctReason(question: QuestionForReview, correctLabel: string) {
  const tags = new Set(question.tags);

  if (question.category === "spatial") {
    if (tags.has("matrix")) {
      return `Option ${correctLabel} is correct because it is the only choice that completes the row rule and the column rule at the same time.`;
    }
    if (tags.has("odd-one-out")) {
      return `Option ${correctLabel} is correct because that figure is the only one that breaks the shared visual property.`;
    }
    return `Option ${correctLabel} is correct because it continues the visual change without switching to a different attribute.`;
  }

  if (question.category === "verbal") {
    if (tags.has("attention-to-detail")) {
      return `Option ${correctLabel} is correct because it is the only choice that exactly matches the target or breaks the stated detail pattern.`;
    }
    return `Option ${correctLabel} is correct because it best matches the required meaning or relationship in the stem.`;
  }

  return `Option ${correctLabel} is correct because it is the only choice consistent with the calculation or logical conclusion forced by the stem.`;
}

function eliminationReason(question: QuestionForReview, label: string, correctLabel: string) {
  const tags = new Set(question.tags);

  if (question.category === "spatial") {
    if (tags.has("matrix")) {
      return `Eliminate ${label}: it may match one direction, but it fails the full row-and-column pattern that ${correctLabel} satisfies.`;
    }
    if (tags.has("odd-one-out")) {
      return `Eliminate ${label}: this figure still shares the main visual property with the group; ${correctLabel} is the outlier.`;
    }
    return `Eliminate ${label}: it changes the wrong visual attribute or skips the next step in the sequence.`;
  }

  if (question.category === "verbal") {
    if (tags.has("attention-to-detail")) {
      return `Eliminate ${label}: it has a character, punctuation, order, or pattern mismatch that ${correctLabel} avoids.`;
    }
    if (tags.has("analogy")) {
      return `Eliminate ${label}: the word pair does not preserve the same relationship direction as the stem.`;
    }
    if (tags.has("antonym")) {
      return `Eliminate ${label}: it is not the strongest opposite of the target meaning.`;
    }
    return `Eliminate ${label}: it does not fit the sentence logic, tone, or grammar as tightly as ${correctLabel}.`;
  }

  if (tags.has("ordering-logic")) {
    return `Eliminate ${label}: it violates at least one ordering clue or immediate-neighbor constraint.`;
  }
  if (tags.has("true-false-uncertain") || tags.has("syllogism") || tags.has("logical-deduction")) {
    return `Eliminate ${label}: the conclusion is not forced by the statements, or it reverses a condition.`;
  }
  if (tags.has("number-sequence") || tags.has("number-series") || tags.has("letter-series")) {
    return `Eliminate ${label}: it breaks the step pattern between terms.`;
  }

  return `Eliminate ${label}: plugging it back into the stem does not satisfy the required value or relationship.`;
}

export function buildQuestionReview(question: QuestionForReview, userAnswerId: string | null) {
  const correctOption = question.options.find((option) => option.id === question.correctOptionId);
  const selectedOption = userAnswerId ? question.options.find((option) => option.id === userAnswerId) : null;
  const correctLabel = correctOption?.label ?? "?";

  return {
    categoryLabel: categoryLabel(question.category),
    correctOptionId: question.correctOptionId,
    correctLabel,
    correctText: correctOption?.text ?? "",
    selectedLabel: selectedOption?.label ?? null,
    selectedText: selectedOption?.text ?? null,
    isCorrect: userAnswerId === question.correctOptionId,
    fastMethod: fastMethod(question),
    correctReason: correctReason(question, correctLabel),
    optionReviews: question.options.map((option) => ({
      id: option.id,
      label: option.label,
      text: option.text,
      isCorrect: option.id === question.correctOptionId,
      isSelected: option.id === userAnswerId,
      reason:
        option.id === question.correctOptionId
          ? correctReason(question, option.label)
          : eliminationReason(question, option.label, correctLabel),
    })),
  };
}
