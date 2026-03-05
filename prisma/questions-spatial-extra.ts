type QuestionData = {
  category: "verbal" | "math_logic" | "spatial";
  difficulty: number;
  stem: string;
  options: { label: string; text: string }[];
  correctLabel: string;
  tags: string[];
};

// Helper to wrap SVG content
function svg(w: number, h: number, content: string): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">${content}</svg>`;
}

const S = {
  circle: (cx: number, cy: number, r: number, fill = "none", stroke = "#333") =>
    `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" stroke="${stroke}" stroke-width="2"/>`,
  rect: (x: number, y: number, w: number, h: number, fill = "none", stroke = "#333") =>
    `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" stroke="${stroke}" stroke-width="2"/>`,
  tri: (cx: number, cy: number, sz: number, fill = "none", stroke = "#333") => {
    const h = sz * 0.866;
    return `<polygon points="${cx},${cy - h / 2} ${cx - sz / 2},${cy + h / 2} ${cx + sz / 2},${cy + h / 2}" fill="${fill}" stroke="${stroke}" stroke-width="2"/>`;
  },
  diamond: (cx: number, cy: number, sz: number, fill = "none", stroke = "#333") =>
    `<polygon points="${cx},${cy - sz / 2} ${cx + sz / 2},${cy} ${cx},${cy + sz / 2} ${cx - sz / 2},${cy}" fill="${fill}" stroke="${stroke}" stroke-width="2"/>`,
  pentagon: (cx: number, cy: number, r: number, fill = "none", stroke = "#333") => {
    const pts = Array.from({ length: 5 }, (_, i) => {
      const a = (i * 72 - 90) * Math.PI / 180;
      return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`;
    }).join(" ");
    return `<polygon points="${pts}" fill="${fill}" stroke="${stroke}" stroke-width="2"/>`;
  },
  hexagon: (cx: number, cy: number, r: number, fill = "none", stroke = "#333") => {
    const pts = Array.from({ length: 6 }, (_, i) => {
      const a = (i * 60 - 90) * Math.PI / 180;
      return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`;
    }).join(" ");
    return `<polygon points="${pts}" fill="${fill}" stroke="${stroke}" stroke-width="2"/>`;
  },
  star: (cx: number, cy: number, outerR: number, innerR: number, fill = "none", stroke = "#333") => {
    const pts = Array.from({ length: 10 }, (_, i) => {
      const r = i % 2 === 0 ? outerR : innerR;
      const a = (i * 36 - 90) * Math.PI / 180;
      return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`;
    }).join(" ");
    return `<polygon points="${pts}" fill="${fill}" stroke="${stroke}" stroke-width="2"/>`;
  },
  arrow: (cx: number, cy: number, rot: number, stroke = "#333") =>
    `<g transform="rotate(${rot},${cx},${cy})"><line x1="${cx}" y1="${cy + 12}" x2="${cx}" y2="${cy - 12}" stroke="${stroke}" stroke-width="2"/><polyline points="${cx - 6},${cy - 6} ${cx},${cy - 12} ${cx + 6},${cy - 6}" fill="none" stroke="${stroke}" stroke-width="2"/></g>`,
  cross: (cx: number, cy: number, sz: number, stroke = "#333") =>
    `<line x1="${cx - sz}" y1="${cy}" x2="${cx + sz}" y2="${cy}" stroke="${stroke}" stroke-width="2"/><line x1="${cx}" y1="${cy - sz}" x2="${cx}" y2="${cy + sz}" stroke="${stroke}" stroke-width="2"/>`,
  dot: (cx: number, cy: number, r = 4, fill = "#333") =>
    `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}"/>`,
  line: (x1: number, y1: number, x2: number, y2: number, stroke = "#333") =>
    `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${stroke}" stroke-width="2"/>`,
};

const qm = (cx: number, cy: number) =>
  `<text x="${cx}" y="${cy}" text-anchor="middle" dominant-baseline="central" font-size="24" font-weight="bold" fill="#999">?</text>`;

export const spatialQuestionsExtra: QuestionData[] = [
  // ===================== EASY (28) =====================

  // E1: Alternating shapes — circle, square, circle, square, circle, ?
  {
    category: "spatial", difficulty: 1,
    stem: svg(400, 80, `${S.circle(40, 40, 16)}${S.rect(74, 24, 32, 32)}${S.circle(140, 40, 16)}${S.rect(174, 24, 32, 32)}${S.circle(240, 40, 16)}${qm(310, 40)}`)+`<br/>What comes next?`,
    options: [
      { label: "A", text: svg(60, 60, S.rect(14, 14, 32, 32)) },
      { label: "B", text: svg(60, 60, S.circle(30, 30, 16)) },
      { label: "C", text: svg(60, 60, S.tri(30, 30, 32)) },
      { label: "D", text: svg(60, 60, S.diamond(30, 30, 32)) },
    ],
    correctLabel: "A", tags: ["next-in-series"],
  },

  // E2: Growing dots — 1, 2, 3, ?
  {
    category: "spatial", difficulty: 1,
    stem: svg(320, 80, `${S.dot(40, 40)}${S.dot(110, 35)}${S.dot(110, 50)}${S.dot(175, 30)}${S.dot(175, 45)}${S.dot(175, 60)}${qm(260, 40)}`)+`<br/>What comes next?`,
    options: [
      { label: "A", text: svg(60, 60, `${S.dot(30, 15)}${S.dot(30, 30)}${S.dot(30, 45)}${S.dot(30, 60)}`) },
      { label: "B", text: svg(60, 60, `${S.dot(20, 30)}${S.dot(40, 30)}`) },
      { label: "C", text: svg(60, 60, `${S.dot(30, 30)}`) },
      { label: "D", text: svg(60, 60, `${S.dot(15, 20)}${S.dot(30, 20)}${S.dot(45, 20)}${S.dot(22, 40)}${S.dot(38, 40)}`) },
    ],
    correctLabel: "A", tags: ["next-in-series"],
  },

  // E3: All filled circles except one empty — odd one out
  {
    category: "spatial", difficulty: 1,
    stem: `Which shape does NOT belong?`,
    options: [
      { label: "A", text: svg(60, 60, S.circle(30, 30, 16, "#333")) },
      { label: "B", text: svg(60, 60, S.circle(30, 30, 16, "#333")) },
      { label: "C", text: svg(60, 60, S.circle(30, 30, 16)) },
      { label: "D", text: svg(60, 60, S.circle(30, 30, 16, "#333")) },
      { label: "E", text: svg(60, 60, S.circle(30, 30, 16, "#333")) },
    ],
    correctLabel: "C", tags: ["odd-one-out"],
  },

  // E4: Size progression — small, medium, large squares
  {
    category: "spatial", difficulty: 1,
    stem: svg(320, 80, `${S.rect(25, 30, 16, 16)}${S.rect(85, 22, 28, 28)}${S.rect(145, 14, 40, 40)}${qm(250, 40)}`)+`<br/>What comes next?`,
    options: [
      { label: "A", text: svg(60, 60, S.rect(5, 5, 52, 52)) },
      { label: "B", text: svg(60, 60, S.rect(20, 20, 20, 20)) },
      { label: "C", text: svg(60, 60, S.circle(30, 30, 20)) },
      { label: "D", text: svg(60, 60, S.rect(15, 15, 30, 30)) },
    ],
    correctLabel: "A", tags: ["next-in-series"],
  },

  // E5: Arrows all point up except one points down
  {
    category: "spatial", difficulty: 1,
    stem: `Which shape does NOT belong?`,
    options: [
      { label: "A", text: svg(60, 60, S.arrow(30, 30, 0)) },
      { label: "B", text: svg(60, 60, S.arrow(30, 30, 0)) },
      { label: "C", text: svg(60, 60, S.arrow(30, 30, 180)) },
      { label: "D", text: svg(60, 60, S.arrow(30, 30, 0)) },
      { label: "E", text: svg(60, 60, S.arrow(30, 30, 0)) },
    ],
    correctLabel: "C", tags: ["odd-one-out"],
  },

  // E6: Triangle, square, pentagon, hexagon, ?
  {
    category: "spatial", difficulty: 1,
    stem: svg(400, 80, `${S.tri(40, 40, 30)}${S.rect(80, 22, 32, 32)}${S.pentagon(160, 40, 16)}${S.hexagon(220, 40, 16)}${qm(300, 40)}`)+`<br/>What comes next? (shapes gain one side each step)`,
    options: [
      { label: "A", text: svg(60, 60, S.circle(30, 30, 16)) },
      { label: "B", text: svg(60, 60, S.tri(30, 30, 30)) },
      { label: "C", text: svg(60, 60, S.star(30, 30, 18, 9)) },
      { label: "D", text: svg(60, 60, `<polygon points="30,12 43,22 39,38 21,38 17,22" fill="none" stroke="#333" stroke-width="2"/>`) },
    ],
    correctLabel: "A", tags: ["next-in-series"],
  },

  // E7: Alternating filled triangle and empty triangle
  {
    category: "spatial", difficulty: 1,
    stem: svg(400, 80, `${S.tri(40, 40, 30, "#333")}${S.tri(100, 40, 30)}${S.tri(160, 40, 30, "#333")}${S.tri(220, 40, 30)}${qm(300, 40)}`)+`<br/>What comes next?`,
    options: [
      { label: "A", text: svg(60, 60, S.tri(30, 30, 30)) },
      { label: "B", text: svg(60, 60, S.tri(30, 30, 30, "#333")) },
      { label: "C", text: svg(60, 60, S.rect(14, 14, 32, 32, "#333")) },
      { label: "D", text: svg(60, 60, S.circle(30, 30, 16, "#333")) },
    ],
    correctLabel: "B", tags: ["next-in-series"],
  },

  // E8: All squares except one triangle
  {
    category: "spatial", difficulty: 1,
    stem: `Which shape does NOT belong?`,
    options: [
      { label: "A", text: svg(60, 60, S.rect(14, 14, 32, 32)) },
      { label: "B", text: svg(60, 60, S.rect(14, 14, 32, 32)) },
      { label: "C", text: svg(60, 60, S.rect(14, 14, 32, 32)) },
      { label: "D", text: svg(60, 60, S.tri(30, 30, 32)) },
      { label: "E", text: svg(60, 60, S.rect(14, 14, 32, 32)) },
    ],
    correctLabel: "D", tags: ["odd-one-out"],
  },

  // E9: Cross rotation 0, 45, 90, ?
  {
    category: "spatial", difficulty: 1,
    stem: svg(320, 80, `<g transform="rotate(0,40,40)">${S.cross(40, 40, 14)}</g><g transform="rotate(45,120,40)">${S.cross(120, 40, 14)}</g><g transform="rotate(90,200,40)">${S.cross(200, 40, 14)}</g>${qm(270, 40)}`)+`<br/>What comes next?`,
    options: [
      { label: "A", text: svg(60, 60, `<g transform="rotate(135,30,30)">${S.cross(30, 30, 14)}</g>`) },
      { label: "B", text: svg(60, 60, `<g transform="rotate(0,30,30)">${S.cross(30, 30, 14)}</g>`) },
      { label: "C", text: svg(60, 60, `<g transform="rotate(180,30,30)">${S.cross(30, 30, 14)}</g>`) },
      { label: "D", text: svg(60, 60, `<g transform="rotate(90,30,30)">${S.cross(30, 30, 14)}</g>`) },
    ],
    correctLabel: "A", tags: ["next-in-series"],
  },

  // E10: Dot inside circle, dot inside square, dot inside triangle, ?
  {
    category: "spatial", difficulty: 1,
    stem: svg(320, 80, `${S.circle(40, 40, 18)}${S.dot(40, 40)}${S.rect(74, 22, 36, 36)}${S.dot(92, 40)}${S.tri(160, 40, 36)}${S.dot(160, 40)}${qm(240, 40)}`)+`<br/>What comes next?`,
    options: [
      { label: "A", text: svg(60, 60, `${S.diamond(30, 30, 36)}${S.dot(30, 30)}`) },
      { label: "B", text: svg(60, 60, S.circle(30, 30, 18)) },
      { label: "C", text: svg(60, 60, S.dot(30, 30)) },
      { label: "D", text: svg(60, 60, `${S.rect(14, 14, 32, 32)}${S.dot(30, 30)}`) },
    ],
    correctLabel: "A", tags: ["next-in-series"],
  },

  // E11: Horizontal lines 1, 2, 3, ?
  {
    category: "spatial", difficulty: 1,
    stem: svg(320, 80, `${S.line(20, 40, 50, 40)}${S.line(80, 35, 110, 35)}${S.line(80, 50, 110, 50)}${S.line(140, 30, 170, 30)}${S.line(140, 42, 170, 42)}${S.line(140, 54, 170, 54)}${qm(240, 40)}`)+`<br/>What comes next?`,
    options: [
      { label: "A", text: svg(60, 60, `${S.line(10, 15, 50, 15)}${S.line(10, 27, 50, 27)}${S.line(10, 39, 50, 39)}${S.line(10, 51, 50, 51)}`) },
      { label: "B", text: svg(60, 60, `${S.line(10, 20, 50, 20)}${S.line(10, 40, 50, 40)}`) },
      { label: "C", text: svg(60, 60, `${S.line(10, 30, 50, 30)}`) },
      { label: "D", text: svg(60, 60, `${S.line(10, 15, 50, 15)}${S.line(10, 27, 50, 27)}${S.line(10, 39, 50, 39)}${S.line(10, 51, 50, 51)}${S.line(10, 58, 50, 58)}`) },
    ],
    correctLabel: "A", tags: ["next-in-series"],
  },

  // E12: All diamonds except one hexagon
  {
    category: "spatial", difficulty: 1,
    stem: `Which shape does NOT belong?`,
    options: [
      { label: "A", text: svg(60, 60, S.diamond(30, 30, 28)) },
      { label: "B", text: svg(60, 60, S.hexagon(30, 30, 16)) },
      { label: "C", text: svg(60, 60, S.diamond(30, 30, 28)) },
      { label: "D", text: svg(60, 60, S.diamond(30, 30, 28)) },
      { label: "E", text: svg(60, 60, S.diamond(30, 30, 28)) },
    ],
    correctLabel: "B", tags: ["odd-one-out"],
  },

  // E13: Alternating colors — gray, white, gray, white, ?
  {
    category: "spatial", difficulty: 1,
    stem: svg(400, 80, `${S.rect(14, 20, 36, 36, "#999")}${S.rect(74, 20, 36, 36)}${S.rect(134, 20, 36, 36, "#999")}${S.rect(194, 20, 36, 36)}${qm(300, 40)}`)+`<br/>What comes next?`,
    options: [
      { label: "A", text: svg(60, 60, S.rect(14, 14, 32, 32, "#999")) },
      { label: "B", text: svg(60, 60, S.rect(14, 14, 32, 32)) },
      { label: "C", text: svg(60, 60, S.circle(30, 30, 16, "#999")) },
      { label: "D", text: svg(60, 60, S.rect(14, 14, 32, 32, "#333")) },
    ],
    correctLabel: "A", tags: ["next-in-series"],
  },

  // E14: Star, circle, star, circle, star, ?
  {
    category: "spatial", difficulty: 1,
    stem: svg(420, 80, `${S.star(40, 40, 18, 9)}${S.circle(100, 40, 16)}${S.star(160, 40, 18, 9)}${S.circle(220, 40, 16)}${S.star(280, 40, 18, 9)}${qm(350, 40)}`)+`<br/>What comes next?`,
    options: [
      { label: "A", text: svg(60, 60, S.star(30, 30, 18, 9)) },
      { label: "B", text: svg(60, 60, S.circle(30, 30, 16)) },
      { label: "C", text: svg(60, 60, S.tri(30, 30, 30)) },
      { label: "D", text: svg(60, 60, S.diamond(30, 30, 28)) },
    ],
    correctLabel: "B", tags: ["next-in-series"],
  },

  // E15: 4 circles with dots, 1 circle without dot
  {
    category: "spatial", difficulty: 1,
    stem: `Which shape does NOT belong?`,
    options: [
      { label: "A", text: svg(60, 60, `${S.circle(30, 30, 18)}${S.dot(30, 30)}`) },
      { label: "B", text: svg(60, 60, `${S.circle(30, 30, 18)}${S.dot(30, 30)}`) },
      { label: "C", text: svg(60, 60, `${S.circle(30, 30, 18)}`) },
      { label: "D", text: svg(60, 60, `${S.circle(30, 30, 18)}${S.dot(30, 30)}`) },
      { label: "E", text: svg(60, 60, `${S.circle(30, 30, 18)}${S.dot(30, 30)}`) },
    ],
    correctLabel: "C", tags: ["odd-one-out"],
  },

  // E16: Arrow right, arrow right, arrow right... one arrow left
  {
    category: "spatial", difficulty: 1,
    stem: `Which shape does NOT belong?`,
    options: [
      { label: "A", text: svg(60, 60, S.arrow(30, 30, 90)) },
      { label: "B", text: svg(60, 60, S.arrow(30, 30, 90)) },
      { label: "C", text: svg(60, 60, S.arrow(30, 30, 90)) },
      { label: "D", text: svg(60, 60, S.arrow(30, 30, 270)) },
      { label: "E", text: svg(60, 60, S.arrow(30, 30, 90)) },
    ],
    correctLabel: "D", tags: ["odd-one-out"],
  },

  // E17: Nested shapes — circle in square, circle in square, circle in square, ? (all same)
  {
    category: "spatial", difficulty: 1,
    stem: svg(320, 80, `${S.rect(16, 16, 40, 40)}${S.circle(36, 36, 14)}${S.rect(86, 16, 40, 40)}${S.circle(106, 36, 14)}${qm(200, 40)}`)+`<br/>What comes next?`,
    options: [
      { label: "A", text: svg(60, 60, `${S.rect(12, 12, 36, 36)}${S.circle(30, 30, 12)}`) },
      { label: "B", text: svg(60, 60, `${S.circle(30, 30, 18)}${S.rect(22, 22, 16, 16)}`) },
      { label: "C", text: svg(60, 60, S.circle(30, 30, 16)) },
      { label: "D", text: svg(60, 60, S.rect(14, 14, 32, 32)) },
    ],
    correctLabel: "A", tags: ["next-in-series"],
  },

  // E18: Growing circles
  {
    category: "spatial", difficulty: 1,
    stem: svg(320, 80, `${S.circle(40, 40, 8)}${S.circle(110, 40, 14)}${S.circle(190, 40, 20)}${qm(270, 40)}`)+`<br/>What comes next?`,
    options: [
      { label: "A", text: svg(60, 60, S.circle(30, 30, 26)) },
      { label: "B", text: svg(60, 60, S.circle(30, 30, 8)) },
      { label: "C", text: svg(60, 60, S.circle(30, 30, 14)) },
      { label: "D", text: svg(60, 60, S.circle(30, 30, 20)) },
    ],
    correctLabel: "A", tags: ["next-in-series"],
  },

  // E19: All pentagons except one star
  {
    category: "spatial", difficulty: 1,
    stem: `Which shape does NOT belong?`,
    options: [
      { label: "A", text: svg(60, 60, S.pentagon(30, 30, 16)) },
      { label: "B", text: svg(60, 60, S.pentagon(30, 30, 16)) },
      { label: "C", text: svg(60, 60, S.star(30, 30, 18, 9)) },
      { label: "D", text: svg(60, 60, S.pentagon(30, 30, 16)) },
      { label: "E", text: svg(60, 60, S.pentagon(30, 30, 16)) },
    ],
    correctLabel: "C", tags: ["odd-one-out"],
  },

  // E20: Filled square, empty circle, filled square, empty circle, ?
  {
    category: "spatial", difficulty: 1,
    stem: svg(380, 80, `${S.rect(14, 20, 32, 32, "#333")}${S.circle(80, 36, 16)}${S.rect(104, 20, 32, 32, "#333")}${S.circle(170, 36, 16)}${qm(240, 40)}`)+`<br/>What comes next?`,
    options: [
      { label: "A", text: svg(60, 60, S.rect(14, 14, 32, 32, "#333")) },
      { label: "B", text: svg(60, 60, S.circle(30, 30, 16)) },
      { label: "C", text: svg(60, 60, S.circle(30, 30, 16, "#333")) },
      { label: "D", text: svg(60, 60, S.rect(14, 14, 32, 32)) },
    ],
    correctLabel: "A", tags: ["next-in-series"],
  },

  // E21: Shrinking triangles
  {
    category: "spatial", difficulty: 1,
    stem: svg(320, 80, `${S.tri(50, 40, 40)}${S.tri(130, 40, 30)}${S.tri(200, 40, 20)}${qm(270, 40)}`)+`<br/>What comes next?`,
    options: [
      { label: "A", text: svg(60, 60, S.tri(30, 30, 10)) },
      { label: "B", text: svg(60, 60, S.tri(30, 30, 40)) },
      { label: "C", text: svg(60, 60, S.tri(30, 30, 30)) },
      { label: "D", text: svg(60, 60, S.tri(30, 30, 50)) },
    ],
    correctLabel: "A", tags: ["next-in-series"],
  },

  // E22: All hexagons same size except one smaller
  {
    category: "spatial", difficulty: 1,
    stem: `Which shape does NOT belong?`,
    options: [
      { label: "A", text: svg(60, 60, S.hexagon(30, 30, 18)) },
      { label: "B", text: svg(60, 60, S.hexagon(30, 30, 18)) },
      { label: "C", text: svg(60, 60, S.hexagon(30, 30, 10)) },
      { label: "D", text: svg(60, 60, S.hexagon(30, 30, 18)) },
      { label: "E", text: svg(60, 60, S.hexagon(30, 30, 18)) },
    ],
    correctLabel: "C", tags: ["odd-one-out"],
  },

  // E23: Arrow rotating 90° each step: up, right, down, ?
  {
    category: "spatial", difficulty: 1,
    stem: svg(300, 80, `${S.arrow(40, 40, 0)}${S.arrow(110, 40, 90)}${S.arrow(180, 40, 180)}${qm(250, 40)}`)+`<br/>What comes next?`,
    options: [
      { label: "A", text: svg(60, 60, S.arrow(30, 30, 270)) },
      { label: "B", text: svg(60, 60, S.arrow(30, 30, 0)) },
      { label: "C", text: svg(60, 60, S.arrow(30, 30, 180)) },
      { label: "D", text: svg(60, 60, S.arrow(30, 30, 90)) },
    ],
    correctLabel: "A", tags: ["next-in-series"],
  },

  // E24: Two dots, three dots, four dots, ?
  {
    category: "spatial", difficulty: 1,
    stem: svg(320, 80, `${S.dot(35, 35)}${S.dot(50, 50)}${S.dot(100, 30)}${S.dot(115, 45)}${S.dot(100, 55)}${S.dot(170, 25)}${S.dot(185, 38)}${S.dot(170, 50)}${S.dot(185, 58)}${qm(260, 40)}`)+`<br/>What comes next?`,
    options: [
      { label: "A", text: svg(60, 60, `${S.dot(15, 15)}${S.dot(30, 28)}${S.dot(15, 38)}${S.dot(30, 48)}${S.dot(15, 55)}`) },
      { label: "B", text: svg(60, 60, `${S.dot(20, 30)}${S.dot(40, 30)}${S.dot(30, 45)}`) },
      { label: "C", text: svg(60, 60, `${S.dot(30, 30)}`) },
      { label: "D", text: svg(60, 60, `${S.dot(20, 20)}${S.dot(40, 20)}${S.dot(20, 40)}${S.dot(40, 40)}`) },
    ],
    correctLabel: "A", tags: ["next-in-series"],
  },

  // E25: All circles except one oval (ellipse)
  {
    category: "spatial", difficulty: 1,
    stem: `Which shape does NOT belong?`,
    options: [
      { label: "A", text: svg(60, 60, S.circle(30, 30, 16)) },
      { label: "B", text: svg(60, 60, S.circle(30, 30, 16)) },
      { label: "C", text: svg(60, 60, `<ellipse cx="30" cy="30" rx="20" ry="12" fill="none" stroke="#333" stroke-width="2"/>`) },
      { label: "D", text: svg(60, 60, S.circle(30, 30, 16)) },
      { label: "E", text: svg(60, 60, S.circle(30, 30, 16)) },
    ],
    correctLabel: "C", tags: ["odd-one-out"],
  },

  // E26: Diamond, diamond, diamond with three filled, one empty
  {
    category: "spatial", difficulty: 1,
    stem: `Which shape does NOT belong?`,
    options: [
      { label: "A", text: svg(60, 60, S.diamond(30, 30, 28, "#333")) },
      { label: "B", text: svg(60, 60, S.diamond(30, 30, 28, "#333")) },
      { label: "C", text: svg(60, 60, S.diamond(30, 30, 28, "#333")) },
      { label: "D", text: svg(60, 60, S.diamond(30, 30, 28)) },
      { label: "E", text: svg(60, 60, S.diamond(30, 30, 28, "#333")) },
    ],
    correctLabel: "D", tags: ["odd-one-out"],
  },

  // E27: Square, circle, triangle repeating pattern
  {
    category: "spatial", difficulty: 1,
    stem: svg(420, 80, `${S.rect(14, 22, 32, 32)}${S.circle(80, 38, 16)}${S.tri(130, 38, 30)}${S.rect(164, 22, 32, 32)}${S.circle(230, 38, 16)}${qm(300, 40)}`)+`<br/>What comes next?`,
    options: [
      { label: "A", text: svg(60, 60, S.tri(30, 30, 30)) },
      { label: "B", text: svg(60, 60, S.rect(14, 14, 32, 32)) },
      { label: "C", text: svg(60, 60, S.circle(30, 30, 16)) },
      { label: "D", text: svg(60, 60, S.diamond(30, 30, 28)) },
    ],
    correctLabel: "A", tags: ["next-in-series"],
  },

  // E28: All stars except one cross
  {
    category: "spatial", difficulty: 1,
    stem: `Which shape does NOT belong?`,
    options: [
      { label: "A", text: svg(60, 60, S.star(30, 30, 18, 9)) },
      { label: "B", text: svg(60, 60, S.star(30, 30, 18, 9)) },
      { label: "C", text: svg(60, 60, S.star(30, 30, 18, 9)) },
      { label: "D", text: svg(60, 60, S.cross(30, 30, 14)) },
      { label: "E", text: svg(60, 60, S.star(30, 30, 18, 9)) },
    ],
    correctLabel: "D", tags: ["odd-one-out"],
  },

  // ===================== MEDIUM (48) =====================

  // M1: Shape + fill alternating pattern
  {
    category: "spatial", difficulty: 2,
    stem: svg(420, 80, `${S.circle(35, 40, 16, "#333")}${S.rect(64, 24, 32, 32)}${S.circle(130, 40, 16)}${S.rect(154, 24, 32, 32, "#333")}${S.circle(225, 40, 16, "#333")}${qm(310, 40)}`)+`<br/>What comes next?`,
    options: [
      { label: "A", text: svg(60, 60, S.rect(14, 14, 32, 32)) },
      { label: "B", text: svg(60, 60, S.rect(14, 14, 32, 32, "#333")) },
      { label: "C", text: svg(60, 60, S.circle(30, 30, 16)) },
      { label: "D", text: svg(60, 60, S.circle(30, 30, 16, "#333")) },
    ],
    correctLabel: "A", tags: ["next-in-series"],
  },

  // M2: Two nested shapes — outer changes, inner same
  {
    category: "spatial", difficulty: 2,
    stem: svg(320, 80, `${S.circle(40, 40, 20)}${S.dot(40, 40)}${S.rect(72, 20, 36, 36)}${S.dot(90, 38)}${S.tri(155, 40, 38)}${S.dot(155, 40)}${qm(240, 40)}`)+`<br/>What comes next?`,
    options: [
      { label: "A", text: svg(60, 60, `${S.diamond(30, 30, 36)}${S.dot(30, 30)}`) },
      { label: "B", text: svg(60, 60, `${S.circle(30, 30, 18)}${S.dot(30, 30)}`) },
      { label: "C", text: svg(60, 60, S.dot(30, 30)) },
      { label: "D", text: svg(60, 60, `${S.pentagon(30, 30, 18)}${S.dot(30, 30)}`) },
    ],
    correctLabel: "A", tags: ["next-in-series"],
  },

  // M3: 3x3 matrix — row pattern: circle, square, triangle
  {
    category: "spatial", difficulty: 2,
    stem: svg(200, 200, `${S.circle(35, 35, 14)}${S.rect(68, 22, 28, 28)}${S.tri(130, 35, 28)}${S.circle(35, 100, 14)}${S.rect(68, 87, 28, 28)}${S.tri(130, 100, 28)}${S.circle(35, 165, 14)}${S.rect(68, 152, 28, 28)}${qm(130, 165)}`)+`<br/>What completes the grid?`,
    options: [
      { label: "A", text: svg(60, 60, S.tri(30, 30, 28)) },
      { label: "B", text: svg(60, 60, S.circle(30, 30, 14)) },
      { label: "C", text: svg(60, 60, S.rect(16, 16, 28, 28)) },
      { label: "D", text: svg(60, 60, S.diamond(30, 30, 28)) },
    ],
    correctLabel: "A", tags: ["matrix"],
  },

  // M4: Rotation + shape change
  {
    category: "spatial", difficulty: 2,
    stem: svg(320, 80, `${S.arrow(40, 40, 0)}${S.arrow(110, 40, 45)}${S.arrow(180, 40, 90)}${S.arrow(250, 40, 135)}${qm(310, 40)}`)+`<br/>What comes next?`,
    options: [
      { label: "A", text: svg(60, 60, S.arrow(30, 30, 180)) },
      { label: "B", text: svg(60, 60, S.arrow(30, 30, 225)) },
      { label: "C", text: svg(60, 60, S.arrow(30, 30, 270)) },
      { label: "D", text: svg(60, 60, S.arrow(30, 30, 0)) },
    ],
    correctLabel: "A", tags: ["next-in-series"],
  },

  // M5: Odd one out — all have 2 shapes nested, one has 3
  {
    category: "spatial", difficulty: 2,
    stem: `Which shape does NOT belong?`,
    options: [
      { label: "A", text: svg(60, 60, `${S.rect(10, 10, 40, 40)}${S.circle(30, 30, 12)}`) },
      { label: "B", text: svg(60, 60, `${S.circle(30, 30, 22)}${S.rect(20, 20, 20, 20)}`) },
      { label: "C", text: svg(60, 60, `${S.tri(30, 30, 40)}${S.circle(30, 34, 10)}`) },
      { label: "D", text: svg(60, 60, `${S.rect(8, 8, 44, 44)}${S.circle(30, 30, 14)}${S.dot(30, 30)}`) },
      { label: "E", text: svg(60, 60, `${S.diamond(30, 30, 38)}${S.rect(22, 22, 16, 16)}`) },
    ],
    correctLabel: "D", tags: ["odd-one-out"],
  },

  // M6: Size + fill pattern
  {
    category: "spatial", difficulty: 2,
    stem: svg(360, 80, `${S.circle(35, 40, 10, "#333")}${S.circle(90, 40, 15)}${S.circle(155, 40, 20, "#333")}${S.circle(225, 40, 25)}${qm(300, 40)}`)+`<br/>What comes next?`,
    options: [
      { label: "A", text: svg(60, 60, S.circle(30, 30, 28, "#333")) },
      { label: "B", text: svg(60, 60, S.circle(30, 30, 28)) },
      { label: "C", text: svg(60, 60, S.circle(30, 30, 10, "#333")) },
      { label: "D", text: svg(60, 60, S.rect(10, 10, 40, 40, "#333")) },
    ],
    correctLabel: "A", tags: ["next-in-series"],
  },

  // M7: 3x3 matrix — fill pattern: row1 all filled, row2 all empty, row3 ?
  {
    category: "spatial", difficulty: 2,
    stem: svg(200, 200, `${S.circle(35, 35, 14, "#333")}${S.circle(100, 35, 14, "#333")}${S.circle(165, 35, 14, "#333")}${S.circle(35, 100, 14)}${S.circle(100, 100, 14)}${S.circle(165, 100, 14)}${S.circle(35, 165, 14, "#999")}${S.circle(100, 165, 14, "#999")}${qm(165, 165)}`)+`<br/>What completes the grid?`,
    options: [
      { label: "A", text: svg(60, 60, S.circle(30, 30, 14, "#999")) },
      { label: "B", text: svg(60, 60, S.circle(30, 30, 14, "#333")) },
      { label: "C", text: svg(60, 60, S.circle(30, 30, 14)) },
      { label: "D", text: svg(60, 60, S.rect(16, 16, 28, 28, "#999")) },
    ],
    correctLabel: "A", tags: ["matrix"],
  },

  // M8: Dots increasing inside shapes
  {
    category: "spatial", difficulty: 2,
    stem: svg(320, 80, `${S.rect(14, 14, 40, 40)}${S.dot(34, 34)}${S.rect(84, 14, 40, 40)}${S.dot(98, 28)}${S.dot(110, 42)}${S.rect(154, 14, 40, 40)}${S.dot(166, 26)}${S.dot(178, 34)}${S.dot(170, 46)}${qm(260, 40)}`)+`<br/>What comes next?`,
    options: [
      { label: "A", text: svg(60, 60, `${S.rect(10, 10, 40, 40)}${S.dot(22, 22)}${S.dot(38, 22)}${S.dot(22, 38)}${S.dot(38, 38)}`) },
      { label: "B", text: svg(60, 60, `${S.rect(10, 10, 40, 40)}${S.dot(30, 30)}`) },
      { label: "C", text: svg(60, 60, `${S.rect(10, 10, 40, 40)}`) },
      { label: "D", text: svg(60, 60, `${S.rect(10, 10, 40, 40)}${S.dot(22, 22)}${S.dot(38, 38)}`) },
    ],
    correctLabel: "A", tags: ["next-in-series"],
  },

  // M9: Odd one out — all shapes have even number of sides except one
  {
    category: "spatial", difficulty: 2,
    stem: `Which shape does NOT belong?`,
    options: [
      { label: "A", text: svg(60, 60, S.rect(14, 14, 32, 32)) },
      { label: "B", text: svg(60, 60, S.hexagon(30, 30, 16)) },
      { label: "C", text: svg(60, 60, S.tri(30, 30, 32)) },
      { label: "D", text: svg(60, 60, S.rect(10, 20, 40, 20)) },
      { label: "E", text: svg(60, 60, S.diamond(30, 30, 28)) },
    ],
    correctLabel: "C", tags: ["odd-one-out"],
  },

  // M10: Alternating nested shapes
  {
    category: "spatial", difficulty: 2,
    stem: svg(320, 80, `${S.circle(40, 40, 20)}${S.rect(28, 28, 24, 24)}${S.rect(80, 18, 40, 40)}${S.circle(100, 38, 12)}${S.circle(160, 40, 20)}${S.rect(148, 28, 24, 24)}${qm(240, 40)}`)+`<br/>What comes next?`,
    options: [
      { label: "A", text: svg(60, 60, `${S.rect(10, 10, 40, 40)}${S.circle(30, 30, 12)}`) },
      { label: "B", text: svg(60, 60, `${S.circle(30, 30, 20)}${S.rect(18, 18, 24, 24)}`) },
      { label: "C", text: svg(60, 60, S.circle(30, 30, 20)) },
      { label: "D", text: svg(60, 60, S.rect(10, 10, 40, 40)) },
    ],
    correctLabel: "A", tags: ["next-in-series"],
  },

  // M11-M15: More matrix patterns
  {
    category: "spatial", difficulty: 2,
    stem: svg(200, 200, `${S.tri(35, 35, 28)}${S.rect(85, 22, 28, 28)}${S.circle(165, 35, 14)}${S.rect(22, 87, 28, 28)}${S.circle(100, 100, 14)}${S.tri(165, 100, 28)}${S.circle(35, 165, 14)}${S.tri(100, 165, 28)}${qm(165, 165)}`)+`<br/>What completes the grid?`,
    options: [
      { label: "A", text: svg(60, 60, S.rect(16, 16, 28, 28)) },
      { label: "B", text: svg(60, 60, S.circle(30, 30, 14)) },
      { label: "C", text: svg(60, 60, S.tri(30, 30, 28)) },
      { label: "D", text: svg(60, 60, S.diamond(30, 30, 28)) },
    ],
    correctLabel: "A", tags: ["matrix"],
  },

  // M12: Color gradient pattern
  {
    category: "spatial", difficulty: 2,
    stem: svg(360, 80, `${S.rect(14, 20, 32, 32, "#eee")}${S.rect(64, 20, 32, 32, "#ccc")}${S.rect(114, 20, 32, 32, "#999")}${S.rect(164, 20, 32, 32, "#666")}${qm(260, 40)}`)+`<br/>What comes next?`,
    options: [
      { label: "A", text: svg(60, 60, S.rect(14, 14, 32, 32, "#333")) },
      { label: "B", text: svg(60, 60, S.rect(14, 14, 32, 32, "#eee")) },
      { label: "C", text: svg(60, 60, S.rect(14, 14, 32, 32, "#999")) },
      { label: "D", text: svg(60, 60, S.rect(14, 14, 32, 32)) },
    ],
    correctLabel: "A", tags: ["next-in-series"],
  },

  // M13: Odd-one-out — all curved shapes except one angular
  {
    category: "spatial", difficulty: 2,
    stem: `Which shape does NOT belong?`,
    options: [
      { label: "A", text: svg(60, 60, S.circle(30, 30, 16)) },
      { label: "B", text: svg(60, 60, `<ellipse cx="30" cy="30" rx="20" ry="14" fill="none" stroke="#333" stroke-width="2"/>`) },
      { label: "C", text: svg(60, 60, S.circle(30, 30, 10)) },
      { label: "D", text: svg(60, 60, S.rect(14, 14, 32, 32)) },
      { label: "E", text: svg(60, 60, `<ellipse cx="30" cy="30" rx="14" ry="20" fill="none" stroke="#333" stroke-width="2"/>`) },
    ],
    correctLabel: "D", tags: ["odd-one-out"],
  },

  // M14: Shape count increasing per frame
  {
    category: "spatial", difficulty: 2,
    stem: svg(360, 80, `${S.circle(30, 40, 10)}${S.circle(90, 30, 10)}${S.circle(110, 50, 10)}${S.circle(160, 25, 10)}${S.circle(180, 40, 10)}${S.circle(170, 55, 10)}${qm(260, 40)}`)+`<br/>1 circle, 2 circles, 3 circles... What comes next?`,
    options: [
      { label: "A", text: svg(60, 60, `${S.circle(15, 15, 8)}${S.circle(40, 15, 8)}${S.circle(15, 40, 8)}${S.circle(40, 40, 8)}`) },
      { label: "B", text: svg(60, 60, `${S.circle(20, 30, 10)}${S.circle(40, 30, 10)}`) },
      { label: "C", text: svg(60, 60, S.circle(30, 30, 10)) },
      { label: "D", text: svg(60, 60, `${S.circle(15, 15, 8)}${S.circle(40, 15, 8)}${S.circle(15, 40, 8)}${S.circle(40, 40, 8)}${S.circle(28, 28, 8)}`) },
    ],
    correctLabel: "A", tags: ["next-in-series"],
  },

  // M15-M48: Additional medium questions with various patterns
  // M15: Diamond rotation sequence
  {
    category: "spatial", difficulty: 2,
    stem: svg(360, 80, `<g transform="rotate(0,40,40)">${S.diamond(40, 40, 24)}</g><g transform="rotate(30,120,40)">${S.diamond(120, 40, 24)}</g><g transform="rotate(60,200,40)">${S.diamond(200, 40, 24)}</g>${qm(290, 40)}`)+`<br/>What comes next?`,
    options: [
      { label: "A", text: svg(60, 60, `<g transform="rotate(90,30,30)">${S.diamond(30, 30, 24)}</g>`) },
      { label: "B", text: svg(60, 60, `<g transform="rotate(0,30,30)">${S.diamond(30, 30, 24)}</g>`) },
      { label: "C", text: svg(60, 60, `<g transform="rotate(45,30,30)">${S.diamond(30, 30, 24)}</g>`) },
      { label: "D", text: svg(60, 60, `<g transform="rotate(120,30,30)">${S.diamond(30, 30, 24)}</g>`) },
    ],
    correctLabel: "A", tags: ["next-in-series"],
  },

  // M16: Odd one out — different internal element
  {
    category: "spatial", difficulty: 2,
    stem: `Which shape does NOT belong?`,
    options: [
      { label: "A", text: svg(60, 60, `${S.rect(10, 10, 40, 40)}${S.cross(30, 30, 10)}`) },
      { label: "B", text: svg(60, 60, `${S.rect(10, 10, 40, 40)}${S.cross(30, 30, 10)}`) },
      { label: "C", text: svg(60, 60, `${S.rect(10, 10, 40, 40)}${S.line(15, 15, 45, 45)}`) },
      { label: "D", text: svg(60, 60, `${S.rect(10, 10, 40, 40)}${S.cross(30, 30, 10)}`) },
      { label: "E", text: svg(60, 60, `${S.rect(10, 10, 40, 40)}${S.cross(30, 30, 10)}`) },
    ],
    correctLabel: "C", tags: ["odd-one-out"],
  },

  // M17: Matrix — shapes and fills
  {
    category: "spatial", difficulty: 2,
    stem: svg(200, 200, `${S.circle(35, 35, 14, "#333")}${S.rect(85, 22, 28, 28, "#333")}${S.tri(165, 35, 28, "#333")}${S.circle(35, 100, 14, "#999")}${S.rect(85, 87, 28, 28, "#999")}${S.tri(165, 100, 28, "#999")}${S.circle(35, 165, 14)}${S.rect(85, 152, 28, 28)}${qm(165, 165)}`)+`<br/>What completes the grid?`,
    options: [
      { label: "A", text: svg(60, 60, S.tri(30, 30, 28)) },
      { label: "B", text: svg(60, 60, S.tri(30, 30, 28, "#333")) },
      { label: "C", text: svg(60, 60, S.tri(30, 30, 28, "#999")) },
      { label: "D", text: svg(60, 60, S.circle(30, 30, 14)) },
    ],
    correctLabel: "A", tags: ["matrix"],
  },

  // M18: Mirrored shapes
  {
    category: "spatial", difficulty: 2,
    stem: svg(320, 80, `${S.tri(40, 40, 30)}${S.tri(40, 40, 30)}${S.line(80, 10, 80, 70)}${'<g transform="scale(-1,1) translate(-200,0)">'}${S.tri(120, 40, 30)}</g>${S.line(160, 10, 160, 70)}${S.rect(180, 22, 30, 30)}${S.line(230, 10, 230, 70)}${qm(270, 40)}`)+`<br/>Each shape is mirrored. What comes next?`,
    options: [
      { label: "A", text: svg(60, 60, `<g transform="scale(-1,1) translate(-60,0)">${S.rect(15, 15, 30, 30)}</g>`) },
      { label: "B", text: svg(60, 60, S.rect(15, 15, 30, 30)) },
      { label: "C", text: svg(60, 60, S.tri(30, 30, 30)) },
      { label: "D", text: svg(60, 60, S.circle(30, 30, 15)) },
    ],
    correctLabel: "A", tags: ["next-in-series"],
  },

  // M19-M28: More variety
  {
    category: "spatial", difficulty: 2,
    stem: svg(360, 80, `${S.circle(30, 40, 8)}${S.rect(60, 30, 20, 20)}${S.circle(100, 40, 12)}${S.rect(130, 26, 28, 28)}${S.circle(180, 40, 16)}${qm(240, 40)}`)+`<br/>Circles grow, squares grow. What comes next?`,
    options: [
      { label: "A", text: svg(60, 60, S.rect(10, 10, 36, 36)) },
      { label: "B", text: svg(60, 60, S.circle(30, 30, 20)) },
      { label: "C", text: svg(60, 60, S.rect(14, 14, 32, 32)) },
      { label: "D", text: svg(60, 60, S.tri(30, 30, 36)) },
    ],
    correctLabel: "A", tags: ["next-in-series"],
  },

  // M20: Odd one out — rotational symmetry
  {
    category: "spatial", difficulty: 2,
    stem: `Which shape does NOT belong?`,
    options: [
      { label: "A", text: svg(60, 60, S.circle(30, 30, 16)) },
      { label: "B", text: svg(60, 60, S.rect(14, 14, 32, 32)) },
      { label: "C", text: svg(60, 60, S.hexagon(30, 30, 16)) },
      { label: "D", text: svg(60, 60, `${S.line(10, 10, 50, 50)}${S.line(10, 50, 50, 10)}`) },
      { label: "E", text: svg(60, 60, `${S.tri(30, 20, 20)}${S.line(20, 40, 40, 40)}`) },
    ],
    correctLabel: "E", tags: ["odd-one-out"],
  },

  // M21: Matrix with size variation
  {
    category: "spatial", difficulty: 2,
    stem: svg(200, 200, `${S.circle(35, 35, 8)}${S.circle(100, 35, 14)}${S.circle(165, 35, 20)}${S.rect(27, 92, 16, 16)}${S.rect(86, 86, 28, 28)}${S.rect(145, 80, 40, 40)}${S.tri(35, 165, 16)}${S.tri(100, 165, 28)}${qm(165, 165)}`)+`<br/>What completes the grid?`,
    options: [
      { label: "A", text: svg(60, 60, S.tri(30, 30, 40)) },
      { label: "B", text: svg(60, 60, S.tri(30, 30, 16)) },
      { label: "C", text: svg(60, 60, S.tri(30, 30, 28)) },
      { label: "D", text: svg(60, 60, S.circle(30, 30, 20)) },
    ],
    correctLabel: "A", tags: ["matrix"],
  },

  // M22: Shape + line pattern
  {
    category: "spatial", difficulty: 2,
    stem: svg(360, 80, `${S.circle(30, 40, 14)}${S.line(50, 40, 70, 40)}${S.rect(80, 26, 28, 28)}${S.line(115, 40, 135, 40)}${S.tri(155, 40, 28)}${S.line(175, 40, 195, 40)}${qm(230, 40)}`)+`<br/>What comes next?`,
    options: [
      { label: "A", text: svg(60, 60, S.diamond(30, 30, 28)) },
      { label: "B", text: svg(60, 60, S.circle(30, 30, 14)) },
      { label: "C", text: svg(60, 60, S.tri(30, 30, 28)) },
      { label: "D", text: svg(60, 60, S.pentagon(30, 30, 14)) },
    ],
    correctLabel: "A", tags: ["next-in-series"],
  },

  // M23: Odd one out — all have line inside, one doesn't
  {
    category: "spatial", difficulty: 2,
    stem: `Which shape does NOT belong?`,
    options: [
      { label: "A", text: svg(60, 60, `${S.circle(30, 30, 18)}${S.line(20, 30, 40, 30)}`) },
      { label: "B", text: svg(60, 60, `${S.rect(12, 12, 36, 36)}${S.line(12, 30, 48, 30)}`) },
      { label: "C", text: svg(60, 60, `${S.tri(30, 28, 36)}${S.line(18, 38, 42, 38)}`) },
      { label: "D", text: svg(60, 60, `${S.diamond(30, 30, 32)}`) },
      { label: "E", text: svg(60, 60, `${S.hexagon(30, 30, 18)}${S.line(16, 30, 44, 30)}`) },
    ],
    correctLabel: "D", tags: ["odd-one-out"],
  },

  // M24: Arrow + shape combo pattern
  {
    category: "spatial", difficulty: 2,
    stem: svg(360, 80, `${S.arrow(25, 40, 0)}${S.circle(50, 40, 10)}${S.arrow(90, 40, 90)}${S.rect(108, 30, 20, 20)}${S.arrow(155, 40, 180)}${S.tri(180, 40, 20)}${qm(240, 40)}`)+`<br/>What comes next?`,
    options: [
      { label: "A", text: svg(60, 60, `${S.arrow(20, 30, 270)}${S.diamond(42, 30, 20)}`) },
      { label: "B", text: svg(60, 60, `${S.arrow(20, 30, 270)}${S.circle(42, 30, 10)}`) },
      { label: "C", text: svg(60, 60, `${S.arrow(20, 30, 0)}${S.diamond(42, 30, 20)}`) },
      { label: "D", text: svg(60, 60, `${S.arrow(20, 30, 90)}${S.rect(35, 22, 18, 18)}`) },
    ],
    correctLabel: "A", tags: ["next-in-series"],
  },

  // M25-M30: More matrices
  {
    category: "spatial", difficulty: 2,
    stem: svg(200, 200, `${S.circle(35, 35, 14)}${S.circle(100, 35, 14)}${S.rect(152, 22, 28, 28)}${S.circle(35, 100, 14)}${S.rect(86, 86, 28, 28)}${S.circle(165, 100, 14)}${S.rect(22, 152, 28, 28)}${S.circle(100, 165, 14)}${qm(165, 165)}`)+`<br/>What completes the grid?`,
    options: [
      { label: "A", text: svg(60, 60, S.circle(30, 30, 14)) },
      { label: "B", text: svg(60, 60, S.rect(16, 16, 28, 28)) },
      { label: "C", text: svg(60, 60, S.tri(30, 30, 28)) },
      { label: "D", text: svg(60, 60, S.diamond(30, 30, 28)) },
    ],
    correctLabel: "A", tags: ["matrix"],
  },

  // M26: Double shape sequence
  {
    category: "spatial", difficulty: 2,
    stem: svg(400, 80, `${S.circle(25, 30, 10)}${S.circle(25, 55, 10)}${S.rect(55, 20, 20, 20)}${S.rect(55, 45, 20, 20)}${S.tri(100, 30, 20)}${S.tri(100, 55, 20)}${qm(160, 40)}`)+`<br/>What comes next?`,
    options: [
      { label: "A", text: svg(60, 60, `${S.diamond(30, 18, 20)}${S.diamond(30, 45, 20)}`) },
      { label: "B", text: svg(60, 60, `${S.circle(30, 18, 10)}${S.circle(30, 45, 10)}`) },
      { label: "C", text: svg(60, 60, S.diamond(30, 30, 28)) },
      { label: "D", text: svg(60, 60, `${S.rect(15, 15, 30, 30)}`) },
    ],
    correctLabel: "A", tags: ["next-in-series"],
  },

  // M27: Odd one out — one shape has different stroke
  {
    category: "spatial", difficulty: 2,
    stem: `Which shape does NOT belong?`,
    options: [
      { label: "A", text: svg(60, 60, S.circle(30, 30, 16, "none", "#333")) },
      { label: "B", text: svg(60, 60, S.circle(30, 30, 16, "none", "#333")) },
      { label: "C", text: svg(60, 60, `<circle cx="30" cy="30" r="16" fill="none" stroke="#333" stroke-width="2" stroke-dasharray="5,3"/>`) },
      { label: "D", text: svg(60, 60, S.circle(30, 30, 16, "none", "#333")) },
      { label: "E", text: svg(60, 60, S.circle(30, 30, 16, "none", "#333")) },
    ],
    correctLabel: "C", tags: ["odd-one-out"],
  },

  // M28: Matrix — arrows pointing different directions
  {
    category: "spatial", difficulty: 2,
    stem: svg(200, 200, `${S.arrow(35, 35, 0)}${S.arrow(100, 35, 90)}${S.arrow(165, 35, 180)}${S.arrow(35, 100, 90)}${S.arrow(100, 100, 180)}${S.arrow(165, 100, 270)}${S.arrow(35, 165, 180)}${S.arrow(100, 165, 270)}${qm(165, 165)}`)+`<br/>What completes the grid?`,
    options: [
      { label: "A", text: svg(60, 60, S.arrow(30, 30, 0)) },
      { label: "B", text: svg(60, 60, S.arrow(30, 30, 90)) },
      { label: "C", text: svg(60, 60, S.arrow(30, 30, 270)) },
      { label: "D", text: svg(60, 60, S.arrow(30, 30, 180)) },
    ],
    correctLabel: "A", tags: ["matrix"],
  },

  // M29: Growing shape with dots
  {
    category: "spatial", difficulty: 2,
    stem: svg(360, 80, `${S.rect(16, 22, 28, 28)}${S.dot(30, 36)}${S.rect(66, 18, 36, 36)}${S.dot(78, 30)}${S.dot(90, 42)}${S.rect(120, 14, 44, 44)}${S.dot(132, 28)}${S.dot(148, 28)}${S.dot(140, 44)}${qm(260, 40)}`)+`<br/>What comes next?`,
    options: [
      { label: "A", text: svg(80, 80, `${S.rect(8, 8, 52, 52)}${S.dot(22, 22)}${S.dot(42, 22)}${S.dot(22, 42)}${S.dot(42, 42)}`) },
      { label: "B", text: svg(60, 60, `${S.rect(10, 10, 40, 40)}${S.dot(30, 30)}`) },
      { label: "C", text: svg(60, 60, `${S.rect(10, 10, 40, 40)}`) },
      { label: "D", text: svg(60, 60, `${S.circle(30, 30, 20)}${S.dot(20, 25)}${S.dot(40, 25)}${S.dot(20, 38)}${S.dot(40, 38)}`) },
    ],
    correctLabel: "A", tags: ["next-in-series"],
  },

  // M30: Odd one out — all have same orientation except one
  {
    category: "spatial", difficulty: 2,
    stem: `Which shape does NOT belong?`,
    options: [
      { label: "A", text: svg(60, 60, S.tri(30, 30, 30)) },
      { label: "B", text: svg(60, 60, S.tri(30, 30, 30)) },
      { label: "C", text: svg(60, 60, `<polygon points="30,42 17,18 43,18" fill="none" stroke="#333" stroke-width="2"/>`) },
      { label: "D", text: svg(60, 60, S.tri(30, 30, 30)) },
      { label: "E", text: svg(60, 60, S.tri(30, 30, 30)) },
    ],
    correctLabel: "C", tags: ["odd-one-out"],
  },

  // M31-M48: Additional medium patterns
  { category: "spatial", difficulty: 2, stem: svg(320, 80, `${S.star(40, 40, 12, 6)}${S.star(110, 40, 16, 8)}${S.star(190, 40, 20, 10)}${qm(270, 40)}`)+`<br/>What comes next?`, options: [{ label: "A", text: svg(60, 60, S.star(30, 30, 24, 12)) }, { label: "B", text: svg(60, 60, S.star(30, 30, 12, 6)) }, { label: "C", text: svg(60, 60, S.star(30, 30, 20, 10)) }, { label: "D", text: svg(60, 60, S.circle(30, 30, 20)) }], correctLabel: "A", tags: ["next-in-series"] },

  { category: "spatial", difficulty: 2, stem: `Which shape does NOT belong?`, options: [{ label: "A", text: svg(60, 60, `${S.circle(30, 30, 18)}${S.tri(30, 30, 18)}`) }, { label: "B", text: svg(60, 60, `${S.circle(30, 30, 18)}${S.tri(30, 30, 18)}`) }, { label: "C", text: svg(60, 60, `${S.circle(30, 30, 18)}${S.rect(22, 22, 16, 16)}`) }, { label: "D", text: svg(60, 60, `${S.circle(30, 30, 18)}${S.tri(30, 30, 18)}`) }, { label: "E", text: svg(60, 60, `${S.circle(30, 30, 18)}${S.tri(30, 30, 18)}`) }], correctLabel: "C", tags: ["odd-one-out"] },

  { category: "spatial", difficulty: 2, stem: svg(200, 200, `${S.diamond(35, 35, 24, "#333")}${S.diamond(100, 35, 24)}${S.diamond(165, 35, 24, "#333")}${S.diamond(35, 100, 24)}${S.diamond(100, 100, 24, "#333")}${S.diamond(165, 100, 24)}${S.diamond(35, 165, 24, "#333")}${S.diamond(100, 165, 24)}${qm(165, 165)}`)+`<br/>What completes the grid?`, options: [{ label: "A", text: svg(60, 60, S.diamond(30, 30, 24, "#333")) }, { label: "B", text: svg(60, 60, S.diamond(30, 30, 24)) }, { label: "C", text: svg(60, 60, S.circle(30, 30, 14, "#333")) }, { label: "D", text: svg(60, 60, S.rect(16, 16, 28, 28)) }], correctLabel: "A", tags: ["matrix"] },

  { category: "spatial", difficulty: 2, stem: svg(360, 80, `${S.hexagon(40, 40, 14)}${S.pentagon(110, 40, 14)}${S.rect(154, 24, 28, 28)}${S.tri(230, 40, 28)}${qm(300, 40)}`)+`<br/>Sides decrease: 6, 5, 4, 3... What comes next?`, options: [{ label: "A", text: svg(60, 60, S.line(15, 30, 45, 30)) }, { label: "B", text: svg(60, 60, S.circle(30, 30, 14)) }, { label: "C", text: svg(60, 60, S.diamond(30, 30, 24)) }, { label: "D", text: svg(60, 60, S.tri(30, 30, 28)) }], correctLabel: "A", tags: ["next-in-series"] },

  { category: "spatial", difficulty: 2, stem: `Which shape does NOT belong?`, options: [{ label: "A", text: svg(60, 60, `${S.rect(10, 10, 40, 40)}${S.line(10, 10, 50, 50)}`) }, { label: "B", text: svg(60, 60, `${S.rect(10, 10, 40, 40)}${S.line(10, 10, 50, 50)}`) }, { label: "C", text: svg(60, 60, `${S.rect(10, 10, 40, 40)}${S.line(50, 10, 10, 50)}`) }, { label: "D", text: svg(60, 60, `${S.rect(10, 10, 40, 40)}${S.line(10, 10, 50, 50)}`) }, { label: "E", text: svg(60, 60, `${S.rect(10, 10, 40, 40)}${S.line(10, 10, 50, 50)}`) }], correctLabel: "C", tags: ["odd-one-out"] },

  { category: "spatial", difficulty: 2, stem: svg(200, 200, `${S.dot(35, 35)}${S.dot(100, 35)}${S.dot(165, 35)}${S.dot(100, 100)}${S.dot(35, 100)}${S.dot(35, 165)}${qm(100, 165)}`)+`<br/>Row 1: 1,1,1 dots. Row 2: 1,1,0 dots. Row 3: 1,?,0. What goes in ???`, options: [{ label: "A", text: svg(60, 60, S.dot(30, 30, 6)) }, { label: "B", text: svg(60, 60, `${S.dot(20, 30, 6)}${S.dot(40, 30, 6)}`) }, { label: "C", text: svg(60, 60, "") }, { label: "D", text: svg(60, 60, `${S.dot(20, 20, 6)}${S.dot(40, 20, 6)}${S.dot(30, 40, 6)}`) }], correctLabel: "A", tags: ["matrix"] },

  { category: "spatial", difficulty: 2, stem: svg(360, 80, `${S.circle(30, 40, 12, "#333")}${S.circle(70, 40, 12)}${S.circle(110, 40, 12, "#666")}${S.circle(150, 40, 12, "#333")}${S.circle(190, 40, 12)}${S.circle(230, 40, 12, "#666")}${S.circle(270, 40, 12, "#333")}${qm(320, 40)}`)+`<br/>What comes next?`, options: [{ label: "A", text: svg(60, 60, S.circle(30, 30, 12)) }, { label: "B", text: svg(60, 60, S.circle(30, 30, 12, "#333")) }, { label: "C", text: svg(60, 60, S.circle(30, 30, 12, "#666")) }, { label: "D", text: svg(60, 60, S.circle(30, 30, 12, "#999")) }], correctLabel: "A", tags: ["next-in-series"] },

  { category: "spatial", difficulty: 2, stem: `Which shape does NOT belong?`, options: [{ label: "A", text: svg(60, 60, `${S.rect(10, 10, 40, 40)}${S.dot(20, 20)}${S.dot(40, 40)}`) }, { label: "B", text: svg(60, 60, `${S.rect(10, 10, 40, 40)}${S.dot(20, 20)}${S.dot(40, 40)}`) }, { label: "C", text: svg(60, 60, `${S.rect(10, 10, 40, 40)}${S.dot(40, 20)}${S.dot(20, 40)}`) }, { label: "D", text: svg(60, 60, `${S.rect(10, 10, 40, 40)}${S.dot(20, 20)}${S.dot(40, 40)}`) }, { label: "E", text: svg(60, 60, `${S.rect(10, 10, 40, 40)}${S.dot(20, 20)}${S.dot(40, 40)}`) }], correctLabel: "C", tags: ["odd-one-out"] },

  { category: "spatial", difficulty: 2, stem: svg(200, 200, `${S.rect(18, 18, 32, 32)}${S.circle(100, 35, 16)}${S.tri(165, 35, 32)}${S.circle(35, 100, 16)}${S.tri(100, 100, 32)}${S.rect(148, 84, 32, 32)}${S.tri(35, 165, 32)}${S.rect(84, 148, 32, 32)}${qm(165, 165)}`)+`<br/>What completes the grid?`, options: [{ label: "A", text: svg(60, 60, S.circle(30, 30, 16)) }, { label: "B", text: svg(60, 60, S.tri(30, 30, 32)) }, { label: "C", text: svg(60, 60, S.rect(14, 14, 32, 32)) }, { label: "D", text: svg(60, 60, S.diamond(30, 30, 28)) }], correctLabel: "A", tags: ["matrix"] },

  { category: "spatial", difficulty: 2, stem: svg(320, 80, `${S.rect(14, 14, 32, 32)}${S.circle(30, 30, 8, "#333")}${S.rect(64, 14, 32, 32)}${S.circle(80, 30, 12, "#333")}${S.rect(114, 14, 32, 32)}${S.circle(130, 30, 16, "#333")}${qm(210, 40)}`)+`<br/>What comes next?`, options: [{ label: "A", text: svg(60, 60, `${S.rect(10, 10, 40, 40)}${S.circle(30, 30, 20, "#333")}`) }, { label: "B", text: svg(60, 60, `${S.rect(10, 10, 40, 40)}${S.circle(30, 30, 8, "#333")}`) }, { label: "C", text: svg(60, 60, `${S.rect(10, 10, 40, 40)}`) }, { label: "D", text: svg(60, 60, `${S.circle(30, 30, 20)}${S.rect(18, 18, 24, 24, "#333")}`) }], correctLabel: "A", tags: ["next-in-series"] },

  { category: "spatial", difficulty: 2, stem: `Which shape does NOT belong?`, options: [{ label: "A", text: svg(60, 60, `${S.tri(30, 25, 24)}${S.circle(30, 42, 8)}`) }, { label: "B", text: svg(60, 60, `${S.tri(30, 25, 24)}${S.circle(30, 42, 8)}`) }, { label: "C", text: svg(60, 60, `${S.tri(30, 25, 24)}${S.circle(30, 42, 8)}`) }, { label: "D", text: svg(60, 60, `${S.tri(30, 25, 24)}${S.rect(24, 38, 12, 12)}`) }, { label: "E", text: svg(60, 60, `${S.tri(30, 25, 24)}${S.circle(30, 42, 8)}`) }], correctLabel: "D", tags: ["odd-one-out"] },

  { category: "spatial", difficulty: 2, stem: svg(360, 80, `${S.pentagon(40, 40, 14, "#333")}${S.pentagon(100, 40, 14)}${S.pentagon(160, 40, 14, "#666")}${S.pentagon(220, 40, 14, "#333")}${S.pentagon(280, 40, 14)}${qm(340, 40)}`)+`<br/>What comes next?`, options: [{ label: "A", text: svg(60, 60, S.pentagon(30, 30, 14, "#666")) }, { label: "B", text: svg(60, 60, S.pentagon(30, 30, 14, "#333")) }, { label: "C", text: svg(60, 60, S.pentagon(30, 30, 14)) }, { label: "D", text: svg(60, 60, S.hexagon(30, 30, 14, "#666")) }], correctLabel: "A", tags: ["next-in-series"] },

  { category: "spatial", difficulty: 2, stem: svg(200, 200, `${S.star(35, 35, 14, 7, "#333")}${S.star(100, 35, 14, 7)}${S.star(165, 35, 14, 7, "#999")}${S.star(35, 100, 14, 7)}${S.star(100, 100, 14, 7, "#999")}${S.star(165, 100, 14, 7, "#333")}${S.star(35, 165, 14, 7, "#999")}${S.star(100, 165, 14, 7, "#333")}${qm(165, 165)}`)+`<br/>What completes the grid?`, options: [{ label: "A", text: svg(60, 60, S.star(30, 30, 14, 7)) }, { label: "B", text: svg(60, 60, S.star(30, 30, 14, 7, "#333")) }, { label: "C", text: svg(60, 60, S.star(30, 30, 14, 7, "#999")) }, { label: "D", text: svg(60, 60, S.star(30, 30, 14, 7, "#666")) }], correctLabel: "A", tags: ["matrix"] },

  // ===================== HARD (19) =====================

  // H1: Multi-rule matrix
  {
    category: "spatial", difficulty: 3,
    stem: svg(200, 200, `${S.circle(35, 35, 14, "#333")}${S.rect(86, 22, 28, 28)}${S.tri(165, 35, 28, "#999")}${S.rect(22, 86, 28, 28, "#999")}${S.tri(100, 100, 28, "#333")}${S.circle(165, 100, 14)}${S.tri(35, 165, 28)}${S.circle(100, 165, 14, "#999")}${qm(165, 165)}`)+`<br/>What completes the grid?`,
    options: [
      { label: "A", text: svg(60, 60, S.rect(16, 16, 28, 28, "#333")) },
      { label: "B", text: svg(60, 60, S.rect(16, 16, 28, 28)) },
      { label: "C", text: svg(60, 60, S.rect(16, 16, 28, 28, "#999")) },
      { label: "D", text: svg(60, 60, S.circle(30, 30, 14, "#333")) },
    ],
    correctLabel: "A", tags: ["matrix"],
  },

  // H2: Complex rotation pattern
  {
    category: "spatial", difficulty: 3,
    stem: svg(400, 80, `${S.arrow(35, 40, 0)}${S.arrow(50, 40, 120)}${S.arrow(100, 40, 120)}${S.arrow(115, 40, 240)}${S.arrow(170, 40, 240)}${S.arrow(185, 40, 0)}${S.arrow(240, 40, 0)}${S.arrow(255, 40, 120)}${qm(330, 40)}`)+`<br/>Each pair rotates 120°. What comes next as a pair?`,
    options: [
      { label: "A", text: svg(60, 60, `${S.arrow(20, 30, 120)}${S.arrow(40, 30, 240)}`) },
      { label: "B", text: svg(60, 60, `${S.arrow(20, 30, 0)}${S.arrow(40, 30, 120)}`) },
      { label: "C", text: svg(60, 60, `${S.arrow(20, 30, 240)}${S.arrow(40, 30, 0)}`) },
      { label: "D", text: svg(60, 60, `${S.arrow(20, 30, 120)}${S.arrow(40, 30, 0)}`) },
    ],
    correctLabel: "A", tags: ["next-in-series"],
  },

  // H3: Odd one out with compound rules
  {
    category: "spatial", difficulty: 3,
    stem: `Which shape does NOT belong? (Consider both shape AND internal pattern)`,
    options: [
      { label: "A", text: svg(60, 60, `${S.circle(30, 30, 20)}${S.line(15, 30, 45, 30)}${S.dot(30, 18)}`) },
      { label: "B", text: svg(60, 60, `${S.rect(10, 10, 40, 40)}${S.line(10, 30, 50, 30)}${S.dot(30, 18)}`) },
      { label: "C", text: svg(60, 60, `${S.tri(30, 28, 38)}${S.line(14, 38, 46, 38)}${S.dot(30, 22)}`) },
      { label: "D", text: svg(60, 60, `${S.diamond(30, 30, 34)}${S.line(16, 30, 44, 30)}${S.dot(30, 42)}`) },
      { label: "E", text: svg(60, 60, `${S.hexagon(30, 30, 20)}${S.line(14, 30, 46, 30)}${S.dot(30, 18)}`) },
    ],
    correctLabel: "D", tags: ["odd-one-out"],
  },

  // H4: Complex matrix with size + shape + fill
  {
    category: "spatial", difficulty: 3,
    stem: svg(200, 200, `${S.circle(35, 35, 8, "#333")}${S.circle(100, 35, 14, "#333")}${S.circle(165, 35, 20, "#333")}${S.rect(27, 92, 16, 16)}${S.rect(86, 86, 28, 28)}${S.rect(145, 80, 40, 40)}${S.tri(35, 165, 16, "#999")}${S.tri(100, 165, 28, "#999")}${qm(165, 165)}`)+`<br/>What completes the grid?`,
    options: [
      { label: "A", text: svg(60, 60, S.tri(30, 30, 40, "#999")) },
      { label: "B", text: svg(60, 60, S.tri(30, 30, 40, "#333")) },
      { label: "C", text: svg(60, 60, S.tri(30, 30, 40)) },
      { label: "D", text: svg(60, 60, S.circle(30, 30, 20, "#999")) },
    ],
    correctLabel: "A", tags: ["matrix"],
  },

  // H5: Triple transformation pattern
  {
    category: "spatial", difficulty: 3,
    stem: svg(400, 100, `${S.circle(30, 50, 10)}${S.dot(30, 50)}${S.rect(60, 38, 24, 24)}${S.dot(72, 50)}${S.dot(72, 42)}${S.tri(120, 50, 24)}${S.dot(120, 50)}${S.dot(114, 42)}${S.dot(126, 42)}${qm(200, 50)}`)+`<br/>Shape gains sides AND dot count increases. What's next?`,
    options: [
      { label: "A", text: svg(60, 60, `${S.diamond(30, 30, 28)}${S.dot(22, 24)}${S.dot(38, 24)}${S.dot(22, 36)}${S.dot(38, 36)}`) },
      { label: "B", text: svg(60, 60, `${S.diamond(30, 30, 28)}${S.dot(30, 30)}`) },
      { label: "C", text: svg(60, 60, `${S.pentagon(30, 30, 14)}${S.dot(22, 24)}${S.dot(38, 24)}${S.dot(22, 36)}${S.dot(38, 36)}`) },
      { label: "D", text: svg(60, 60, `${S.circle(30, 30, 14)}${S.dot(22, 24)}${S.dot(38, 24)}${S.dot(22, 36)}${S.dot(38, 36)}`) },
    ],
    correctLabel: "A", tags: ["next-in-series"],
  },

  // H6-H19: More hard patterns
  { category: "spatial", difficulty: 3, stem: svg(200, 200, `${S.circle(35, 35, 14)}${S.dot(35, 35)}${S.rect(86, 22, 28, 28)}${S.dot(100, 28)}${S.dot(100, 43)}${S.tri(165, 35, 28)}${S.dot(158, 35)}${S.dot(165, 28)}${S.dot(172, 35)}${S.rect(22, 86, 28, 28)}${S.dot(36, 93)}${S.dot(36, 107)}${S.tri(100, 100, 28)}${S.dot(93, 100)}${S.dot(100, 93)}${S.dot(107, 100)}${S.circle(165, 100, 14)}${S.dot(158, 94)}${S.dot(172, 94)}${S.dot(158, 106)}${S.dot(172, 106)}${S.tri(35, 165, 28)}${S.dot(28, 165)}${S.dot(35, 158)}${S.dot(42, 165)}${S.circle(100, 165, 14)}${S.dot(93, 159)}${S.dot(107, 159)}${S.dot(93, 171)}${S.dot(107, 171)}${qm(165, 165)}`)+`<br/>What completes the grid?`, options: [{ label: "A", text: svg(60, 60, `${S.rect(14, 14, 32, 32)}${S.dot(22, 22)}${S.dot(38, 22)}${S.dot(22, 38)}${S.dot(38, 38)}${S.dot(30, 30)}`) }, { label: "B", text: svg(60, 60, `${S.rect(14, 14, 32, 32)}${S.dot(30, 30)}`) }, { label: "C", text: svg(60, 60, `${S.rect(14, 14, 32, 32)}${S.dot(22, 22)}${S.dot(38, 22)}${S.dot(22, 38)}${S.dot(38, 38)}`) }, { label: "D", text: svg(60, 60, `${S.tri(30, 30, 28)}${S.dot(30, 30)}`) }], correctLabel: "A", tags: ["matrix"] },

  { category: "spatial", difficulty: 3, stem: svg(400, 80, `<g transform="rotate(0,40,40)">${S.tri(40, 40, 24)}${S.dot(40, 40)}</g><g transform="rotate(60,120,40)">${S.tri(120, 40, 24)}${S.dot(120, 40)}</g><g transform="rotate(120,200,40)">${S.tri(200, 40, 24)}${S.dot(200, 40)}</g><g transform="rotate(180,280,40)">${S.tri(280, 40, 24)}${S.dot(280, 40)}</g>${qm(350, 40)}`)+`<br/>What comes next?`, options: [{ label: "A", text: svg(60, 60, `<g transform="rotate(240,30,30)">${S.tri(30, 30, 24)}${S.dot(30, 30)}</g>`) }, { label: "B", text: svg(60, 60, `<g transform="rotate(0,30,30)">${S.tri(30, 30, 24)}${S.dot(30, 30)}</g>`) }, { label: "C", text: svg(60, 60, `<g transform="rotate(300,30,30)">${S.tri(30, 30, 24)}${S.dot(30, 30)}</g>`) }, { label: "D", text: svg(60, 60, `<g transform="rotate(180,30,30)">${S.tri(30, 30, 24)}${S.dot(30, 30)}</g>`) }], correctLabel: "A", tags: ["next-in-series"] },

  { category: "spatial", difficulty: 3, stem: `Which does NOT belong? (Consider symmetry)`, options: [{ label: "A", text: svg(60, 60, `${S.rect(10, 10, 40, 40)}${S.line(10, 10, 50, 50)}${S.line(50, 10, 10, 50)}`) }, { label: "B", text: svg(60, 60, `${S.circle(30, 30, 20)}${S.line(30, 10, 30, 50)}${S.line(10, 30, 50, 30)}`) }, { label: "C", text: svg(60, 60, `${S.diamond(30, 30, 36)}${S.line(30, 12, 30, 48)}${S.line(12, 30, 48, 30)}`) }, { label: "D", text: svg(60, 60, `${S.tri(30, 28, 38)}${S.line(11, 46, 49, 46)}${S.line(30, 10, 30, 46)}`) }, { label: "E", text: svg(60, 60, `${S.hexagon(30, 30, 20)}${S.line(30, 10, 30, 50)}${S.line(10, 30, 50, 30)}`) }], correctLabel: "D", tags: ["odd-one-out"] },

  { category: "spatial", difficulty: 3, stem: svg(200, 200, `${S.circle(35, 35, 14)}${S.rect(86, 22, 28, 28, "#666")}${S.tri(165, 35, 28, "#333")}${S.rect(22, 86, 28, 28, "#333")}${S.tri(100, 100, 28)}${S.circle(165, 100, 14, "#666")}${S.tri(35, 165, 28, "#666")}${S.circle(100, 165, 14, "#333")}${qm(165, 165)}`)+`<br/>What completes the grid?`, options: [{ label: "A", text: svg(60, 60, S.rect(16, 16, 28, 28)) }, { label: "B", text: svg(60, 60, S.rect(16, 16, 28, 28, "#333")) }, { label: "C", text: svg(60, 60, S.rect(16, 16, 28, 28, "#666")) }, { label: "D", text: svg(60, 60, S.tri(30, 30, 28)) }], correctLabel: "A", tags: ["matrix"] },

  { category: "spatial", difficulty: 3, stem: svg(360, 100, `${S.rect(10, 20, 40, 40)}${S.circle(30, 40, 12)}${S.arrow(30, 60, 0)}${S.circle(100, 40, 20)}${S.rect(90, 30, 20, 20)}${S.arrow(100, 60, 90)}${S.tri(180, 40, 40)}${S.dot(180, 40)}${S.arrow(180, 65, 180)}${qm(260, 40)}`)+`<br/>What comes next?`, options: [{ label: "A", text: svg(80, 80, `${S.diamond(40, 35, 36)}${S.cross(40, 35, 8)}${S.arrow(40, 60, 270)}`) }, { label: "B", text: svg(80, 80, `${S.diamond(40, 35, 36)}${S.dot(40, 35)}${S.arrow(40, 60, 270)}`) }, { label: "C", text: svg(80, 80, `${S.rect(20, 15, 40, 40)}${S.circle(40, 35, 12)}${S.arrow(40, 60, 270)}`) }, { label: "D", text: svg(80, 80, `${S.circle(40, 35, 20)}${S.tri(40, 35, 20)}${S.arrow(40, 60, 0)}`) }], correctLabel: "A", tags: ["next-in-series"] },

  { category: "spatial", difficulty: 3, stem: `Which does NOT belong?`, options: [{ label: "A", text: svg(60, 60, `${S.circle(30, 30, 20)}${S.tri(30, 30, 20)}${S.dot(30, 30)}`) }, { label: "B", text: svg(60, 60, `${S.rect(10, 10, 40, 40)}${S.diamond(30, 30, 24)}${S.dot(30, 30)}`) }, { label: "C", text: svg(60, 60, `${S.tri(30, 28, 38)}${S.circle(30, 34, 8)}${S.dot(30, 34)}`) }, { label: "D", text: svg(60, 60, `${S.hexagon(30, 30, 20)}${S.rect(22, 22, 16, 16)}${S.dot(30, 30)}`) }, { label: "E", text: svg(60, 60, `${S.diamond(30, 30, 36)}${S.circle(30, 30, 8)}`) }], correctLabel: "E", tags: ["odd-one-out"] },

  { category: "spatial", difficulty: 3, stem: svg(200, 200, `${S.circle(35, 35, 14, "#333")}${S.rect(86, 22, 28, 28)}${S.diamond(165, 35, 28, "#666")}${S.diamond(35, 100, 28, "#333")}${S.circle(100, 100, 14)}${S.rect(152, 87, 28, 28, "#666")}${S.rect(22, 152, 28, 28, "#333")}${S.diamond(100, 165, 28)}${qm(165, 165)}`)+`<br/>What completes the grid?`, options: [{ label: "A", text: svg(60, 60, S.circle(30, 30, 14, "#666")) }, { label: "B", text: svg(60, 60, S.circle(30, 30, 14, "#333")) }, { label: "C", text: svg(60, 60, S.circle(30, 30, 14)) }, { label: "D", text: svg(60, 60, S.rect(16, 16, 28, 28, "#666")) }], correctLabel: "A", tags: ["matrix"] },

  { category: "spatial", difficulty: 3, stem: svg(400, 80, `${S.rect(10, 20, 20, 20)}${S.dot(20, 30)}${S.rect(40, 15, 30, 30)}${S.dot(50, 25)}${S.dot(60, 35)}${S.rect(80, 10, 40, 40)}${S.dot(92, 22)}${S.dot(106, 22)}${S.dot(99, 38)}${qm(180, 40)}`)+`<br/>What comes next?`, options: [{ label: "A", text: svg(80, 80, `${S.rect(10, 10, 50, 50)}${S.dot(24, 22)}${S.dot(44, 22)}${S.dot(24, 42)}${S.dot(44, 42)}`) }, { label: "B", text: svg(60, 60, `${S.rect(5, 5, 50, 50)}${S.dot(30, 30)}`) }, { label: "C", text: svg(60, 60, `${S.rect(5, 5, 50, 50)}${S.dot(18, 18)}${S.dot(42, 42)}`) }, { label: "D", text: svg(80, 80, `${S.rect(10, 10, 50, 50)}${S.dot(24, 22)}${S.dot(44, 22)}${S.dot(24, 42)}${S.dot(44, 42)}${S.dot(34, 32)}`) }], correctLabel: "A", tags: ["next-in-series"] },

  { category: "spatial", difficulty: 3, stem: `Which does NOT belong? (Count internal elements)`, options: [{ label: "A", text: svg(60, 60, `${S.circle(30, 30, 22)}${S.line(12, 30, 48, 30)}${S.line(30, 12, 30, 48)}`) }, { label: "B", text: svg(60, 60, `${S.rect(8, 8, 44, 44)}${S.line(8, 8, 52, 52)}${S.line(52, 8, 8, 52)}`) }, { label: "C", text: svg(60, 60, `${S.diamond(30, 30, 36)}${S.line(30, 12, 30, 48)}${S.line(12, 30, 48, 30)}`) }, { label: "D", text: svg(60, 60, `${S.hexagon(30, 30, 22)}${S.line(12, 30, 48, 30)}`) }, { label: "E", text: svg(60, 60, `${S.tri(30, 26, 40)}${S.line(12, 44, 48, 44)}${S.line(30, 8, 30, 44)}`) }], correctLabel: "D", tags: ["odd-one-out"] },

  { category: "spatial", difficulty: 3, stem: svg(200, 200, `${S.circle(35, 35, 14)}${S.line(21, 35, 49, 35)}${S.rect(86, 22, 28, 28)}${S.line(86, 22, 114, 50)}${S.tri(165, 35, 28)}${S.line(151, 48, 179, 48)}${S.rect(22, 86, 28, 28)}${S.line(22, 86, 50, 114)}${S.tri(100, 100, 28)}${S.line(86, 113, 114, 113)}${S.circle(165, 100, 14)}${S.line(151, 100, 179, 100)}${S.tri(35, 165, 28)}${S.line(21, 178, 49, 178)}${S.circle(100, 165, 14)}${S.line(86, 165, 114, 165)}${qm(165, 165)}`)+`<br/>What completes the grid?`, options: [{ label: "A", text: svg(60, 60, `${S.rect(14, 14, 32, 32)}${S.line(14, 14, 46, 46)}`) }, { label: "B", text: svg(60, 60, `${S.rect(14, 14, 32, 32)}${S.line(14, 30, 46, 30)}`) }, { label: "C", text: svg(60, 60, `${S.rect(14, 14, 32, 32)}${S.line(14, 46, 46, 14)}`) }, { label: "D", text: svg(60, 60, `${S.circle(30, 30, 14)}${S.line(16, 30, 44, 30)}`) }], correctLabel: "A", tags: ["matrix"] },

  { category: "spatial", difficulty: 3, stem: svg(380, 80, `${S.circle(30, 40, 14, "#eee")}${S.circle(30, 40, 8, "#999")}${S.circle(90, 40, 14, "#ccc")}${S.circle(90, 40, 8, "#666")}${S.circle(150, 40, 14, "#999")}${S.circle(150, 40, 8, "#333")}${qm(240, 40)}`)+`<br/>Both rings get darker. What comes next?`, options: [{ label: "A", text: svg(60, 60, `${S.circle(30, 30, 14, "#666")}${S.circle(30, 30, 8, "#000")}`) }, { label: "B", text: svg(60, 60, `${S.circle(30, 30, 14, "#eee")}${S.circle(30, 30, 8, "#999")}`) }, { label: "C", text: svg(60, 60, `${S.circle(30, 30, 14, "#333")}${S.circle(30, 30, 8, "#eee")}`) }, { label: "D", text: svg(60, 60, `${S.circle(30, 30, 14, "#999")}${S.circle(30, 30, 8, "#999")}`) }], correctLabel: "A", tags: ["next-in-series"] },

  { category: "spatial", difficulty: 3, stem: `Which does NOT belong?`, options: [{ label: "A", text: svg(60, 60, `${S.rect(10, 10, 40, 40)}${S.circle(20, 20, 6, "#333")}${S.circle(40, 40, 6, "#333")}`) }, { label: "B", text: svg(60, 60, `${S.circle(30, 30, 22)}${S.rect(18, 18, 8, 8, "#333")}${S.rect(34, 34, 8, 8, "#333")}`) }, { label: "C", text: svg(60, 60, `${S.tri(30, 28, 40)}${S.dot(24, 38, 5, "#333")}${S.dot(36, 38, 5, "#333")}`) }, { label: "D", text: svg(60, 60, `${S.diamond(30, 30, 38)}${S.dot(22, 30, 5, "#333")}${S.dot(38, 30, 5, "#333")}`) }, { label: "E", text: svg(60, 60, `${S.hexagon(30, 30, 22)}${S.dot(20, 30, 5, "#333")}${S.dot(40, 30, 5, "#333")}${S.dot(30, 20, 5, "#333")}`) }], correctLabel: "E", tags: ["odd-one-out"] },

  { category: "spatial", difficulty: 3, stem: svg(200, 200, `${S.rect(18, 18, 32, 32, "#333")}${S.circle(100, 35, 16)}${S.tri(165, 35, 32, "#999")}${S.tri(35, 100, 32)}${S.rect(84, 84, 32, 32, "#999")}${S.circle(165, 100, 16, "#333")}${S.circle(35, 165, 16, "#999")}${S.tri(100, 165, 32, "#333")}${qm(165, 165)}`)+`<br/>What completes the grid?`, options: [{ label: "A", text: svg(60, 60, S.rect(14, 14, 32, 32)) }, { label: "B", text: svg(60, 60, S.rect(14, 14, 32, 32, "#333")) }, { label: "C", text: svg(60, 60, S.rect(14, 14, 32, 32, "#999")) }, { label: "D", text: svg(60, 60, S.circle(30, 30, 16)) }], correctLabel: "A", tags: ["matrix"] },

  // Extra to reach 141+
  { category: "spatial", difficulty: 1, stem: svg(320, 80, `${S.diamond(40, 40, 24, "#333")}${S.diamond(110, 40, 24)}${S.diamond(180, 40, 24, "#333")}${qm(250, 40)}`)+`<br/>What comes next?`, options: [{ label: "A", text: svg(60, 60, S.diamond(30, 30, 24)) }, { label: "B", text: svg(60, 60, S.diamond(30, 30, 24, "#333")) }, { label: "C", text: svg(60, 60, S.circle(30, 30, 16)) }, { label: "D", text: svg(60, 60, S.rect(14, 14, 32, 32)) }], correctLabel: "A", tags: ["next-in-series"] },
];
