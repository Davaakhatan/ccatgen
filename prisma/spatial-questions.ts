// SVG helper functions for generating spatial reasoning questions
// All SVGs are 120x120 by default for stems and 80x80 for options

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

// Shape primitives
const shapes = {
  circle: (cx: number, cy: number, r: number, fill = "none", stroke = "#333") =>
    `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" stroke="${stroke}" stroke-width="2"/>`,
  rect: (x: number, y: number, w: number, h: number, fill = "none", stroke = "#333") =>
    `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" stroke="${stroke}" stroke-width="2"/>`,
  triangle: (cx: number, cy: number, size: number, fill = "none", stroke = "#333") => {
    const h = size * 0.866;
    return `<polygon points="${cx},${cy - h / 2} ${cx - size / 2},${cy + h / 2} ${cx + size / 2},${cy + h / 2}" fill="${fill}" stroke="${stroke}" stroke-width="2"/>`;
  },
  diamond: (cx: number, cy: number, size: number, fill = "none", stroke = "#333") =>
    `<polygon points="${cx},${cy - size / 2} ${cx + size / 2},${cy} ${cx},${cy + size / 2} ${cx - size / 2},${cy}" fill="${fill}" stroke="${stroke}" stroke-width="2"/>`,
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
  arrow: (cx: number, cy: number, rotation: number, stroke = "#333") =>
    `<g transform="rotate(${rotation},${cx},${cy})"><line x1="${cx}" y1="${cy + 12}" x2="${cx}" y2="${cy - 12}" stroke="${stroke}" stroke-width="2"/><polyline points="${cx - 6},${cy - 6} ${cx},${cy - 12} ${cx + 6},${cy - 6}" fill="none" stroke="${stroke}" stroke-width="2"/></g>`,
  cross: (cx: number, cy: number, size: number, stroke = "#333") =>
    `<line x1="${cx - size}" y1="${cy}" x2="${cx + size}" y2="${cy}" stroke="${stroke}" stroke-width="2"/><line x1="${cx}" y1="${cy - size}" x2="${cx}" y2="${cy + size}" stroke="${stroke}" stroke-width="2"/>`,
  line: (x1: number, y1: number, x2: number, y2: number, stroke = "#333") =>
    `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${stroke}" stroke-width="2"/>`,
};

// Separator line for sequences
const sep = (x: number) => `<line x1="${x}" y1="5" x2="${x}" y2="75" stroke="#ccc" stroke-width="1" stroke-dasharray="4"/>`;

// Question mark placeholder
const qmark = (cx: number, cy: number) =>
  `<text x="${cx}" y="${cy}" text-anchor="middle" dominant-baseline="central" font-size="24" font-weight="bold" fill="#999">?</text>`;

// ---------------------------------------------------------------------------
// SPATIAL REASONING QUESTIONS (30) — SVG-based
// ---------------------------------------------------------------------------
export const spatialQuestions: QuestionData[] = [
  // ===================== EASY (9) =====================

  // E1: Next in series — alternating black/white circles
  {
    category: "spatial", difficulty: 1,
    stem: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 80" width="400" height="80">
      ${shapes.circle(40, 40, 16, "#333")}${shapes.circle(100, 40, 16, "none")}${shapes.circle(160, 40, 16, "#333")}${shapes.circle(220, 40, 16, "none")}${shapes.circle(280, 40, 16, "#333")}${qmark(340, 40)}
    </svg><br/>What comes next in the pattern?`,
    options: [
      { label: "A", text: svg(60, 60, shapes.circle(30, 30, 16, "#333")) },
      { label: "B", text: svg(60, 60, shapes.circle(30, 30, 16, "none")) },
      { label: "C", text: svg(60, 60, shapes.triangle(30, 30, 32, "#333")) },
      { label: "D", text: svg(60, 60, shapes.rect(14, 14, 32, 32, "#333")) },
    ],
    correctLabel: "B", tags: ["next-in-series"],
  },

  // E2: Next in series — rotating arrow (0, 90, 180, ?)
  {
    category: "spatial", difficulty: 1,
    stem: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 80" width="320" height="80">
      ${shapes.arrow(40, 40, 0)}${shapes.arrow(120, 40, 90)}${shapes.arrow(200, 40, 180)}${qmark(280, 40)}
    </svg><br/>What comes next?`,
    options: [
      { label: "A", text: svg(60, 60, shapes.arrow(30, 30, 0)) },
      { label: "B", text: svg(60, 60, shapes.arrow(30, 30, 90)) },
      { label: "C", text: svg(60, 60, shapes.arrow(30, 30, 270)) },
      { label: "D", text: svg(60, 60, shapes.arrow(30, 30, 180)) },
    ],
    correctLabel: "C", tags: ["next-in-series"],
  },

  // E3: Next in series — shapes: triangle, square, pentagon, ?
  {
    category: "spatial", difficulty: 1,
    stem: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 80" width="320" height="80">
      ${shapes.triangle(40, 40, 32)}${shapes.rect(64, 24, 32, 32)}${shapes.pentagon(200, 40, 18)}${qmark(280, 40)}
    </svg><br/>Each shape adds one side. What comes next?`,
    options: [
      { label: "A", text: svg(60, 60, shapes.circle(30, 30, 16)) },
      { label: "B", text: svg(60, 60, shapes.hexagon(30, 30, 18)) },
      { label: "C", text: svg(60, 60, shapes.triangle(30, 30, 32)) },
      { label: "D", text: svg(60, 60, shapes.star(30, 30, 18, 9)) },
    ],
    correctLabel: "B", tags: ["next-in-series"],
  },

  // E4: Next in series — growing dots: 1, 2, 3, ?
  {
    category: "spatial", difficulty: 1,
    stem: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 80" width="340" height="80">
      ${sep(80)}${sep(160)}${sep(240)}
      ${shapes.circle(40, 40, 6, "#333")}
      ${shapes.circle(108, 34, 6, "#333")}${shapes.circle(132, 46, 6, "#333")}
      ${shapes.circle(180, 30, 6, "#333")}${shapes.circle(200, 50, 6, "#333")}${shapes.circle(220, 30, 6, "#333")}
      ${qmark(290, 40)}
    </svg><br/>How many dots come next?`,
    options: [
      { label: "A", text: "3" },
      { label: "B", text: "4" },
      { label: "C", text: "5" },
      { label: "D", text: "2" },
    ],
    correctLabel: "B", tags: ["next-in-series"],
  },

  // E5: Odd one out — four circles, one triangle
  {
    category: "spatial", difficulty: 1,
    stem: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 80" width="400" height="80">
      <text x="10" y="14" font-size="11" fill="#666">1</text>${shapes.circle(40, 45, 16)}
      <text x="90" y="14" font-size="11" fill="#666">2</text>${shapes.circle(120, 45, 16)}
      <text x="170" y="14" font-size="11" fill="#666">3</text>${shapes.triangle(200, 45, 32)}
      <text x="250" y="14" font-size="11" fill="#666">4</text>${shapes.circle(280, 45, 16)}
      <text x="330" y="14" font-size="11" fill="#666">5</text>${shapes.circle(360, 45, 16)}
    </svg><br/>Which figure is the odd one out?`,
    options: [
      { label: "A", text: "Figure 1" },
      { label: "B", text: "Figure 2" },
      { label: "C", text: "Figure 3" },
      { label: "D", text: "Figure 5" },
    ],
    correctLabel: "C", tags: ["odd-one-out"],
  },

  // E6: Next in series — alternating filled triangle / empty square
  {
    category: "spatial", difficulty: 1,
    stem: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 80" width="400" height="80">
      ${shapes.triangle(40, 40, 32, "#333")}${shapes.rect(64, 24, 32, 32)}${shapes.triangle(160, 40, 32, "#333")}${shapes.rect(184, 24, 32, 32)}${shapes.triangle(280, 40, 32, "#333")}${qmark(350, 40)}
    </svg><br/>What comes next?`,
    options: [
      { label: "A", text: svg(60, 60, shapes.triangle(30, 30, 32, "#333")) },
      { label: "B", text: svg(60, 60, shapes.rect(14, 14, 32, 32)) },
      { label: "C", text: svg(60, 60, shapes.circle(30, 30, 16)) },
      { label: "D", text: svg(60, 60, shapes.diamond(30, 30, 32, "#333")) },
    ],
    correctLabel: "B", tags: ["next-in-series"],
  },

  // E7: Mirror — which is the mirror reflection?
  {
    category: "spatial", difficulty: 1,
    stem: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 100" width="200" height="100">
      <text x="60" y="15" text-anchor="middle" font-size="12" fill="#666">Original</text>
      <rect x="20" y="25" width="30" height="50" fill="none" stroke="#333" stroke-width="2"/>
      <circle cx="35" cy="40" r="6" fill="#333"/>
      <line x1="100" y1="20" x2="100" y2="85" stroke="#999" stroke-width="1" stroke-dasharray="4"/>
      <text x="140" y="15" text-anchor="middle" font-size="12" fill="#666">Mirror</text>
      ${qmark(150, 55)}
    </svg><br/>Which shows the mirror reflection across the vertical axis?`,
    options: [
      { label: "A", text: svg(80, 70, `<rect x="25" y="10" width="30" height="50" fill="none" stroke="#333" stroke-width="2"/><circle cx="40" cy="25" r="6" fill="#333"/>`) },
      { label: "B", text: svg(80, 70, `<rect x="25" y="10" width="30" height="50" fill="none" stroke="#333" stroke-width="2"/><circle cx="40" cy="45" r="6" fill="#333"/>`) },
      { label: "C", text: svg(80, 70, `<rect x="25" y="10" width="30" height="50" fill="none" stroke="#333" stroke-width="2"/><circle cx="42" cy="25" r="6" fill="#333"/>`) },
      { label: "D", text: svg(80, 70, `<rect x="25" y="10" width="50" height="30" fill="none" stroke="#333" stroke-width="2"/><circle cx="40" cy="25" r="6" fill="#333"/>`) },
    ],
    correctLabel: "A", tags: ["mirror"],
  },

  // E8: Odd one out — four filled shapes, one empty
  {
    category: "spatial", difficulty: 1,
    stem: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 80" width="400" height="80">
      <text x="10" y="14" font-size="11" fill="#666">1</text>${shapes.rect(20, 24, 32, 32, "#333")}
      <text x="90" y="14" font-size="11" fill="#666">2</text>${shapes.rect(100, 24, 32, 32, "#333")}
      <text x="170" y="14" font-size="11" fill="#666">3</text>${shapes.rect(180, 24, 32, 32)}
      <text x="250" y="14" font-size="11" fill="#666">4</text>${shapes.rect(260, 24, 32, 32, "#333")}
      <text x="330" y="14" font-size="11" fill="#666">5</text>${shapes.rect(340, 24, 32, 32, "#333")}
    </svg><br/>Which figure is the odd one out?`,
    options: [
      { label: "A", text: "Figure 1" },
      { label: "B", text: "Figure 3" },
      { label: "C", text: "Figure 4" },
      { label: "D", text: "Figure 5" },
    ],
    correctLabel: "B", tags: ["odd-one-out"],
  },

  // E9: Next in series — circle grows bigger
  {
    category: "spatial", difficulty: 1,
    stem: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 80" width="340" height="80">
      ${sep(80)}${sep(160)}${sep(240)}
      ${shapes.circle(40, 40, 8)}${shapes.circle(120, 40, 14)}${shapes.circle(200, 40, 20)}${qmark(290, 40)}
    </svg><br/>What comes next?`,
    options: [
      { label: "A", text: svg(60, 60, shapes.circle(30, 30, 20)) },
      { label: "B", text: svg(60, 60, shapes.circle(30, 30, 26)) },
      { label: "C", text: svg(60, 60, shapes.circle(30, 30, 14)) },
      { label: "D", text: svg(60, 60, shapes.circle(30, 30, 8)) },
    ],
    correctLabel: "B", tags: ["next-in-series"],
  },

  // ===================== MEDIUM (15) =====================

  // M1: 3×3 matrix — shapes change per row, fill changes per column
  {
    category: "spatial", difficulty: 2,
    stem: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" width="240" height="240">
      <rect x="0" y="0" width="240" height="240" fill="#fafafa" stroke="#ddd" stroke-width="1"/>
      <line x1="80" y1="0" x2="80" y2="240" stroke="#ddd" stroke-width="1"/>
      <line x1="160" y1="0" x2="160" y2="240" stroke="#ddd" stroke-width="1"/>
      <line x1="0" y1="80" x2="240" y2="80" stroke="#ddd" stroke-width="1"/>
      <line x1="0" y1="160" x2="240" y2="160" stroke="#ddd" stroke-width="1"/>
      ${shapes.circle(40, 40, 18)}${shapes.circle(120, 40, 18, "#aaa")}${shapes.circle(200, 40, 18, "#333")}
      ${shapes.rect(22, 102, 36, 36)}${shapes.rect(102, 102, 36, 36, "#aaa")}${shapes.rect(182, 102, 36, 36, "#333")}
      ${shapes.triangle(40, 200, 38)}${shapes.triangle(120, 200, 38, "#aaa")}${qmark(200, 200)}
    </svg><br/>What goes in the missing cell?`,
    options: [
      { label: "A", text: svg(60, 60, shapes.triangle(30, 30, 32, "#333")) },
      { label: "B", text: svg(60, 60, shapes.triangle(30, 30, 32, "#aaa")) },
      { label: "C", text: svg(60, 60, shapes.circle(30, 30, 16, "#333")) },
      { label: "D", text: svg(60, 60, shapes.rect(14, 14, 32, 32, "#333")) },
    ],
    correctLabel: "A", tags: ["matrix"],
  },

  // M2: Odd one out — rotation direction
  {
    category: "spatial", difficulty: 2,
    stem: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 90" width="400" height="90">
      <text x="10" y="14" font-size="11" fill="#666">1</text>
      <rect x="15" y="25" width="40" height="40" fill="none" stroke="#333" stroke-width="2"/>
      <circle cx="28" cy="38" r="5" fill="#333"/>
      <text x="90" y="14" font-size="11" fill="#666">2</text>
      <rect x="95" y="25" width="40" height="40" fill="none" stroke="#333" stroke-width="2"/>
      <circle cx="122" cy="38" r="5" fill="#333"/>
      <text x="170" y="14" font-size="11" fill="#666">3</text>
      <rect x="175" y="25" width="40" height="40" fill="none" stroke="#333" stroke-width="2"/>
      <circle cx="202" cy="52" r="5" fill="#333"/>
      <text x="250" y="14" font-size="11" fill="#666">4</text>
      <rect x="255" y="25" width="40" height="40" fill="none" stroke="#333" stroke-width="2"/>
      <circle cx="282" cy="52" r="5" fill="#333"/>
      <text x="330" y="14" font-size="11" fill="#666">5</text>
      <rect x="335" y="25" width="40" height="40" fill="none" stroke="#333" stroke-width="2"/>
      <circle cx="348" cy="38" r="5" fill="#333"/>
    </svg><br/>Figures 1,2,5 have the dot in the top half. Which is the odd one out?`,
    options: [
      { label: "A", text: "Figure 1" },
      { label: "B", text: "Figure 3" },
      { label: "C", text: "Figure 4" },
      { label: "D", text: "Figure 5" },
    ],
    correctLabel: "B", tags: ["odd-one-out"],
  },

  // M3: Next in series — shape inside shape, swapping
  {
    category: "spatial", difficulty: 2,
    stem: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 80" width="340" height="80">
      ${sep(80)}${sep(160)}${sep(240)}
      ${shapes.circle(40, 40, 24)}${shapes.rect(28, 32, 24, 16, "#333")}
      ${shapes.rect(98, 18, 48, 48)}${shapes.circle(120, 40, 12, "#333")}
      ${shapes.circle(200, 40, 24)}${shapes.rect(188, 32, 24, 16, "#333")}
      ${qmark(290, 40)}
    </svg><br/>The outer and inner shapes alternate. What comes next?`,
    options: [
      { label: "A", text: svg(70, 70, `${shapes.rect(11, 11, 48, 48)}${shapes.circle(35, 35, 12, "#333")}`) },
      { label: "B", text: svg(70, 70, `${shapes.circle(35, 35, 24)}${shapes.rect(23, 27, 24, 16, "#333")}`) },
      { label: "C", text: svg(70, 70, `${shapes.rect(11, 11, 48, 48, "#333")}`) },
      { label: "D", text: svg(70, 70, `${shapes.triangle(35, 35, 40)}${shapes.circle(35, 35, 10, "#333")}`) },
    ],
    correctLabel: "A", tags: ["next-in-series"],
  },

  // M4: Next in series — shape rotates 45 degrees each step
  {
    category: "spatial", difficulty: 2,
    stem: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 80" width="340" height="80">
      ${sep(80)}${sep(160)}${sep(240)}
      <g transform="rotate(0,40,40)">${shapes.rect(24, 28, 32, 24)}</g>
      <g transform="rotate(45,120,40)">${shapes.rect(104, 28, 32, 24)}</g>
      <g transform="rotate(90,200,40)">${shapes.rect(184, 28, 32, 24)}</g>
      ${qmark(290, 40)}
    </svg><br/>The rectangle rotates 45° each step. What comes next?`,
    options: [
      { label: "A", text: svg(60, 60, `<g transform="rotate(135,30,30)">${shapes.rect(14, 18, 32, 24)}</g>`) },
      { label: "B", text: svg(60, 60, `<g transform="rotate(180,30,30)">${shapes.rect(14, 18, 32, 24)}</g>`) },
      { label: "C", text: svg(60, 60, `<g transform="rotate(90,30,30)">${shapes.rect(14, 18, 32, 24)}</g>`) },
      { label: "D", text: svg(60, 60, `<g transform="rotate(0,30,30)">${shapes.rect(14, 18, 32, 24)}</g>`) },
    ],
    correctLabel: "A", tags: ["next-in-series"],
  },

  // M5: Matrix — number of sides increases across rows, fill changes down columns
  {
    category: "spatial", difficulty: 2,
    stem: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" width="240" height="240">
      <rect x="0" y="0" width="240" height="240" fill="#fafafa" stroke="#ddd"/>
      <line x1="80" y1="0" x2="80" y2="240" stroke="#ddd"/><line x1="160" y1="0" x2="160" y2="240" stroke="#ddd"/>
      <line x1="0" y1="80" x2="240" y2="80" stroke="#ddd"/><line x1="0" y1="160" x2="240" y2="160" stroke="#ddd"/>
      ${shapes.triangle(40, 40, 36)}${shapes.rect(102, 22, 36, 36)}${shapes.pentagon(200, 40, 18)}
      ${shapes.triangle(40, 120, 36, "#aaa")}${shapes.rect(102, 102, 36, 36, "#aaa")}${shapes.pentagon(200, 120, 18, "#aaa")}
      ${shapes.triangle(40, 200, 36, "#333")}${qmark(120, 200)}${shapes.pentagon(200, 200, 18, "#333")}
    </svg><br/>What goes in the missing cell?`,
    options: [
      { label: "A", text: svg(60, 60, shapes.rect(14, 14, 32, 32)) },
      { label: "B", text: svg(60, 60, shapes.rect(14, 14, 32, 32, "#333")) },
      { label: "C", text: svg(60, 60, shapes.rect(14, 14, 32, 32, "#aaa")) },
      { label: "D", text: svg(60, 60, shapes.circle(30, 30, 16, "#333")) },
    ],
    correctLabel: "B", tags: ["matrix"],
  },

  // M6: Odd one out — all have inner circle except one has inner square
  {
    category: "spatial", difficulty: 2,
    stem: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 90" width="400" height="90">
      <text x="10" y="14" font-size="11" fill="#666">1</text>
      ${shapes.triangle(40, 50, 44)}${shapes.circle(40, 52, 8, "#333")}
      <text x="90" y="14" font-size="11" fill="#666">2</text>
      ${shapes.rect(100, 28, 44, 44)}${shapes.circle(122, 50, 8, "#333")}
      <text x="170" y="14" font-size="11" fill="#666">3</text>
      ${shapes.pentagon(200, 50, 22)}${shapes.rect(192, 44, 16, 16, "#333")}
      <text x="250" y="14" font-size="11" fill="#666">4</text>
      ${shapes.circle(280, 50, 22)}${shapes.circle(280, 50, 8, "#333")}
      <text x="330" y="14" font-size="11" fill="#666">5</text>
      ${shapes.hexagon(360, 50, 22)}${shapes.circle(360, 50, 8, "#333")}
    </svg><br/>Which figure is the odd one out?`,
    options: [
      { label: "A", text: "Figure 1" },
      { label: "B", text: "Figure 2" },
      { label: "C", text: "Figure 3" },
      { label: "D", text: "Figure 5" },
    ],
    correctLabel: "C", tags: ["odd-one-out"],
  },

  // M7: Next in series — dot moves clockwise around square corners
  {
    category: "spatial", difficulty: 2,
    stem: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 80" width="340" height="80">
      ${sep(80)}${sep(160)}${sep(240)}
      ${shapes.rect(16, 16, 48, 48)}<circle cx="22" cy="22" r="5" fill="#333"/>
      ${shapes.rect(96, 16, 48, 48)}<circle cx="138" cy="22" r="5" fill="#333"/>
      ${shapes.rect(176, 16, 48, 48)}<circle cx="218" cy="58" r="5" fill="#333"/>
      ${qmark(290, 40)}
    </svg><br/>The dot moves clockwise around corners. What comes next?`,
    options: [
      { label: "A", text: svg(60, 60, `${shapes.rect(6, 6, 48, 48)}<circle cx="12" cy="12" r="5" fill="#333"/>`) },
      { label: "B", text: svg(60, 60, `${shapes.rect(6, 6, 48, 48)}<circle cx="12" cy="48" r="5" fill="#333"/>`) },
      { label: "C", text: svg(60, 60, `${shapes.rect(6, 6, 48, 48)}<circle cx="48" cy="48" r="5" fill="#333"/>`) },
      { label: "D", text: svg(60, 60, `${shapes.rect(6, 6, 48, 48)}<circle cx="48" cy="12" r="5" fill="#333"/>`) },
    ],
    correctLabel: "B", tags: ["next-in-series"],
  },

  // M8: Next in series — shapes accumulate: 1 circle, 1 circle + 1 square, etc.
  {
    category: "spatial", difficulty: 2,
    stem: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 80" width="340" height="80">
      ${sep(80)}${sep(160)}${sep(240)}
      ${shapes.circle(40, 40, 12)}
      ${shapes.circle(100, 30, 12)}${shapes.rect(108, 40, 20, 20)}
      ${shapes.circle(170, 25, 12)}${shapes.rect(178, 30, 20, 20)}${shapes.triangle(200, 65, 24)}
      ${qmark(290, 40)}
    </svg><br/>Each step adds a new shape. What comes next?`,
    options: [
      { label: "A", text: "4 shapes: circle, square, triangle, diamond" },
      { label: "B", text: "3 shapes: circle, square, triangle" },
      { label: "C", text: "4 shapes: circle, square, triangle, circle" },
      { label: "D", text: "2 shapes: circle, square" },
    ],
    correctLabel: "A", tags: ["next-in-series"],
  },

  // M9: Matrix — dot position shifts
  {
    category: "spatial", difficulty: 2,
    stem: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" width="240" height="240">
      <rect x="0" y="0" width="240" height="240" fill="#fafafa" stroke="#ddd"/>
      <line x1="80" y1="0" x2="80" y2="240" stroke="#ddd"/><line x1="160" y1="0" x2="160" y2="240" stroke="#ddd"/>
      <line x1="0" y1="80" x2="240" y2="80" stroke="#ddd"/><line x1="0" y1="160" x2="240" y2="160" stroke="#ddd"/>
      <circle cx="20" cy="20" r="6" fill="#333"/><circle cx="60" cy="60" r="6" fill="#333"/>
      <circle cx="120" cy="20" r="6" fill="#333"/><circle cx="120" cy="60" r="6" fill="#333"/>
      <circle cx="220" cy="20" r="6" fill="#333"/><circle cx="180" cy="60" r="6" fill="#333"/>
      <circle cx="20" cy="100" r="6" fill="#333"/><circle cx="60" cy="140" r="6" fill="#333"/>
      <circle cx="120" cy="100" r="6" fill="#333"/><circle cx="120" cy="140" r="6" fill="#333"/>
      <circle cx="220" cy="100" r="6" fill="#333"/><circle cx="180" cy="140" r="6" fill="#333"/>
      <circle cx="20" cy="180" r="6" fill="#333"/><circle cx="60" cy="220" r="6" fill="#333"/>
      <circle cx="120" cy="180" r="6" fill="#333"/><circle cx="120" cy="220" r="6" fill="#333"/>
      ${qmark(200, 200)}
    </svg><br/>What goes in the missing cell?`,
    options: [
      { label: "A", text: svg(60, 60, `<circle cx="50" cy="10" r="6" fill="#333"/><circle cx="10" cy="50" r="6" fill="#333"/>`) },
      { label: "B", text: svg(60, 60, `<circle cx="10" cy="10" r="6" fill="#333"/><circle cx="50" cy="50" r="6" fill="#333"/>`) },
      { label: "C", text: svg(60, 60, `<circle cx="30" cy="10" r="6" fill="#333"/><circle cx="30" cy="50" r="6" fill="#333"/>`) },
      { label: "D", text: svg(60, 60, `<circle cx="10" cy="30" r="6" fill="#333"/><circle cx="50" cy="30" r="6" fill="#333"/>`) },
    ],
    correctLabel: "A", tags: ["matrix"],
  },

  // M10: Odd one out — all symmetrical except one
  {
    category: "spatial", difficulty: 2,
    stem: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 90" width="400" height="90">
      <text x="10" y="14" font-size="11" fill="#666">1</text>
      ${shapes.rect(15, 22, 50, 50)}${shapes.line(40, 22, 40, 72)}
      <text x="90" y="14" font-size="11" fill="#666">2</text>
      ${shapes.circle(122, 47, 25)}${shapes.line(122, 22, 122, 72)}
      <text x="170" y="14" font-size="11" fill="#666">3</text>
      ${shapes.triangle(200, 47, 50)}${shapes.line(200, 20, 200, 72)}
      <text x="250" y="14" font-size="11" fill="#666">4</text>
      <polygon points="265,25 295,25 305,72 255,72" fill="none" stroke="#333" stroke-width="2"/>
      <text x="330" y="14" font-size="11" fill="#666">5</text>
      ${shapes.diamond(360, 47, 48)}${shapes.line(360, 23, 360, 71)}
    </svg><br/>All figures are vertically symmetric except one. Which is the odd one out?`,
    options: [
      { label: "A", text: "Figure 2" },
      { label: "B", text: "Figure 3" },
      { label: "C", text: "Figure 4" },
      { label: "D", text: "Figure 5" },
    ],
    correctLabel: "C", tags: ["odd-one-out"],
  },

  // M11: Next in series — number of inner lines increases
  {
    category: "spatial", difficulty: 2,
    stem: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 80" width="340" height="80">
      ${sep(80)}${sep(160)}${sep(240)}
      ${shapes.circle(40, 40, 22)}${shapes.line(40, 18, 40, 62)}
      ${shapes.circle(120, 40, 22)}${shapes.line(120, 18, 120, 62)}${shapes.line(98, 40, 142, 40)}
      ${shapes.circle(200, 40, 22)}${shapes.line(200, 18, 200, 62)}${shapes.line(178, 40, 222, 40)}${shapes.line(184, 24, 216, 56)}
      ${qmark(290, 40)}
    </svg><br/>Each step adds one line inside the circle. How many lines in the next?`,
    options: [
      { label: "A", text: "3" },
      { label: "B", text: "4" },
      { label: "C", text: "5" },
      { label: "D", text: "2" },
    ],
    correctLabel: "B", tags: ["next-in-series"],
  },

  // M12: Next in series — alternating color and shape (circle-black, triangle-white, circle-black, triangle-white, ?)
  {
    category: "spatial", difficulty: 2,
    stem: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 80" width="400" height="80">
      ${shapes.circle(40, 40, 18, "#333")}${shapes.triangle(110, 40, 36)}${shapes.circle(180, 40, 18, "#333")}${shapes.triangle(250, 40, 36)}${qmark(340, 40)}
    </svg><br/>What comes next?`,
    options: [
      { label: "A", text: svg(60, 60, shapes.triangle(30, 30, 32, "#333")) },
      { label: "B", text: svg(60, 60, shapes.circle(30, 30, 18, "#333")) },
      { label: "C", text: svg(60, 60, shapes.circle(30, 30, 18)) },
      { label: "D", text: svg(60, 60, shapes.triangle(30, 30, 32)) },
    ],
    correctLabel: "B", tags: ["next-in-series"],
  },

  // M13: Next in series — nested shapes: 1 layer, 2 layers, 3 layers, ?
  {
    category: "spatial", difficulty: 2,
    stem: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 80" width="340" height="80">
      ${sep(80)}${sep(160)}${sep(240)}
      ${shapes.circle(40, 40, 20)}
      ${shapes.circle(120, 40, 24)}${shapes.circle(120, 40, 12)}
      ${shapes.circle(200, 40, 28)}${shapes.circle(200, 40, 18)}${shapes.circle(200, 40, 8)}
      ${qmark(290, 40)}
    </svg><br/>What comes next?`,
    options: [
      { label: "A", text: svg(70, 70, `${shapes.circle(35, 35, 32)}${shapes.circle(35, 35, 22)}${shapes.circle(35, 35, 12)}${shapes.circle(35, 35, 4)}`) },
      { label: "B", text: svg(70, 70, `${shapes.circle(35, 35, 28)}${shapes.circle(35, 35, 18)}`) },
      { label: "C", text: svg(70, 70, `${shapes.circle(35, 35, 32)}${shapes.circle(35, 35, 16)}`) },
      { label: "D", text: svg(70, 70, shapes.circle(35, 35, 32)) },
    ],
    correctLabel: "A", tags: ["next-in-series"],
  },

  // M14: Odd one out — four have 2 shapes, one has 3
  {
    category: "spatial", difficulty: 2,
    stem: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 90" width="400" height="90">
      <text x="10" y="14" font-size="11" fill="#666">1</text>
      ${shapes.circle(30, 40, 10)}${shapes.rect(45, 30, 20, 20)}
      <text x="90" y="14" font-size="11" fill="#666">2</text>
      ${shapes.triangle(110, 40, 24)}${shapes.circle(135, 40, 10)}
      <text x="170" y="14" font-size="11" fill="#666">3</text>
      ${shapes.rect(180, 30, 16, 16)}${shapes.circle(205, 35, 8)}${shapes.triangle(225, 45, 18)}
      <text x="250" y="14" font-size="11" fill="#666">4</text>
      ${shapes.diamond(270, 40, 24)}${shapes.rect(285, 32, 16, 16)}
      <text x="330" y="14" font-size="11" fill="#666">5</text>
      ${shapes.circle(350, 40, 10, "#333")}${shapes.circle(370, 40, 10)}
    </svg><br/>Which figure is the odd one out?`,
    options: [
      { label: "A", text: "Figure 1" },
      { label: "B", text: "Figure 2" },
      { label: "C", text: "Figure 3" },
      { label: "D", text: "Figure 4" },
    ],
    correctLabel: "C", tags: ["odd-one-out"],
  },

  // M15: Next in series — diamond rotates and gains a dot each step
  {
    category: "spatial", difficulty: 2,
    stem: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 80" width="340" height="80">
      ${sep(80)}${sep(160)}${sep(240)}
      ${shapes.diamond(40, 40, 36)}<circle cx="40" cy="22" r="4" fill="#333"/>
      ${shapes.diamond(120, 40, 36)}<circle cx="138" cy="40" r="4" fill="#333"/><circle cx="120" cy="22" r="4" fill="#333"/>
      ${shapes.diamond(200, 40, 36)}<circle cx="200" cy="58" r="4" fill="#333"/><circle cx="218" cy="40" r="4" fill="#333"/><circle cx="200" cy="22" r="4" fill="#333"/>
      ${qmark(290, 40)}
    </svg><br/>Each step adds a dot at the next corner clockwise. What comes next?`,
    options: [
      { label: "A", text: "Diamond with dots at all 4 corners" },
      { label: "B", text: "Diamond with dots at 3 corners" },
      { label: "C", text: "Diamond with 2 dots" },
      { label: "D", text: "Square with 4 dots" },
    ],
    correctLabel: "A", tags: ["next-in-series"],
  },

  // ===================== HARD (6) =====================

  // H1: Complex matrix — shape + fill + size all vary
  {
    category: "spatial", difficulty: 3,
    stem: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 270 270" width="270" height="270">
      <rect x="0" y="0" width="270" height="270" fill="#fafafa" stroke="#ddd"/>
      <line x1="90" y1="0" x2="90" y2="270" stroke="#ddd"/><line x1="180" y1="0" x2="180" y2="270" stroke="#ddd"/>
      <line x1="0" y1="90" x2="270" y2="90" stroke="#ddd"/><line x1="0" y1="180" x2="270" y2="180" stroke="#ddd"/>
      ${shapes.circle(45, 45, 12)}${shapes.rect(120, 30, 30, 30, "#aaa")}${shapes.triangle(225, 45, 28, "#333")}
      ${shapes.rect(25, 120, 40, 40)}${shapes.triangle(135, 135, 36, "#aaa")}${shapes.circle(225, 135, 18, "#333")}
      ${shapes.triangle(45, 225, 32)}${shapes.circle(135, 225, 14, "#aaa")}${qmark(225, 225)}
    </svg><br/>Each row has circle, square, triangle (different order). Each row has empty, gray, black. What goes in the missing cell?`,
    options: [
      { label: "A", text: svg(60, 60, shapes.rect(14, 14, 32, 32, "#333")) },
      { label: "B", text: svg(60, 60, shapes.triangle(30, 30, 32, "#333")) },
      { label: "C", text: svg(60, 60, shapes.rect(14, 14, 32, 32, "#aaa")) },
      { label: "D", text: svg(60, 60, shapes.circle(30, 30, 16, "#333")) },
    ],
    correctLabel: "A", tags: ["matrix"],
  },

  // H2: Complex odd one out — rotational symmetry analysis
  {
    category: "spatial", difficulty: 3,
    stem: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 100" width="420" height="100">
      <text x="10" y="14" font-size="11" fill="#666">1</text>
      ${shapes.rect(15, 25, 45, 45)}${shapes.line(15, 25, 60, 70)}${shapes.line(60, 25, 15, 70)}
      <text x="90" y="14" font-size="11" fill="#666">2</text>
      ${shapes.circle(117, 48, 22)}${shapes.line(95, 48, 139, 48)}${shapes.line(117, 26, 117, 70)}
      <text x="175" y="14" font-size="11" fill="#666">3</text>
      ${shapes.diamond(200, 48, 44)}${shapes.line(200, 26, 200, 70)}${shapes.line(178, 48, 222, 48)}
      <text x="260" y="14" font-size="11" fill="#666">4</text>
      ${shapes.triangle(285, 48, 46)}${shapes.line(285, 22, 285, 70)}
      <text x="340" y="14" font-size="11" fill="#666">5</text>
      ${shapes.hexagon(370, 48, 22)}${shapes.line(348, 48, 392, 48)}${shapes.line(370, 26, 370, 70)}
    </svg><br/>Which figure has different symmetry properties from the others?`,
    options: [
      { label: "A", text: "Figure 1" },
      { label: "B", text: "Figure 3" },
      { label: "C", text: "Figure 4" },
      { label: "D", text: "Figure 5" },
    ],
    correctLabel: "C", tags: ["odd-one-out"],
  },

  // H3: Complex next in series — compound transformation
  {
    category: "spatial", difficulty: 3,
    stem: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 100" width="400" height="100">
      ${sep(100)}${sep(200)}${sep(300)}
      <g transform="translate(10,10)">
        ${shapes.rect(10, 10, 30, 30)}${shapes.circle(25, 25, 6, "#333")}
        <circle cx="55" cy="25" r="4" fill="#333"/>
      </g>
      <g transform="translate(110,10)">
        ${shapes.rect(10, 10, 30, 30)}${shapes.circle(25, 25, 6)}
        <circle cx="25" cy="55" r="4" fill="#333"/><circle cx="55" cy="25" r="4" fill="#333"/>
      </g>
      <g transform="translate(210,10)">
        ${shapes.rect(10, 10, 30, 30)}${shapes.circle(25, 25, 6, "#333")}
        <circle cx="25" cy="55" r="4" fill="#333"/><circle cx="55" cy="25" r="4" fill="#333"/><circle cx="55" cy="55" r="4" fill="#333"/>
      </g>
      ${qmark(350, 50)}
    </svg><br/>The inner circle fill alternates, and outer dots accumulate clockwise. What comes next?`,
    options: [
      { label: "A", text: "Empty inner circle, 4 outer dots" },
      { label: "B", text: "Filled inner circle, 4 outer dots" },
      { label: "C", text: "Empty inner circle, 3 outer dots" },
      { label: "D", text: "Filled inner circle, 3 outer dots" },
    ],
    correctLabel: "A", tags: ["next-in-series"],
  },

  // H4: Die/cube net folding
  {
    category: "spatial", difficulty: 3,
    stem: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 200" width="260" height="200">
      <text x="5" y="15" font-size="12" fill="#666">Which cube can be made from this net?</text>
      <rect x="70" y="30" width="40" height="40" fill="none" stroke="#333" stroke-width="2"/>
      <circle cx="90" cy="50" r="6" fill="#333"/>
      <rect x="30" y="70" width="40" height="40" fill="none" stroke="#333" stroke-width="2"/>
      ${shapes.cross(50, 90, 10)}
      <rect x="70" y="70" width="40" height="40" fill="none" stroke="#333" stroke-width="2"/>
      ${shapes.triangle(90, 90, 24, "#333")}
      <rect x="110" y="70" width="40" height="40" fill="none" stroke="#333" stroke-width="2"/>
      <rect x="120" y="80" width="20" height="20" fill="#333"/>
      <rect x="150" y="70" width="40" height="40" fill="none" stroke="#333" stroke-width="2"/>
      ${shapes.line(155, 75, 185, 105)}
      <rect x="70" y="110" width="40" height="40" fill="none" stroke="#333" stroke-width="2"/>
      ${shapes.diamond(90, 130, 24, "#333")}
    </svg>`,
    options: [
      { label: "A", text: "Top: circle, Front: triangle, Right: square" },
      { label: "B", text: "Top: circle, Front: cross, Right: triangle" },
      { label: "C", text: "Top: circle, Front: triangle, Right: line" },
      { label: "D", text: "Top: diamond, Front: triangle, Right: circle" },
    ],
    correctLabel: "C", tags: ["spatial-manipulation"],
  },

  // H5: Complex matrix with multiple rules
  {
    category: "spatial", difficulty: 3,
    stem: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 270 270" width="270" height="270">
      <rect x="0" y="0" width="270" height="270" fill="#fafafa" stroke="#ddd"/>
      <line x1="90" y1="0" x2="90" y2="270" stroke="#ddd"/><line x1="180" y1="0" x2="180" y2="270" stroke="#ddd"/>
      <line x1="0" y1="90" x2="270" y2="90" stroke="#ddd"/><line x1="0" y1="180" x2="270" y2="180" stroke="#ddd"/>
      <circle cx="25" cy="25" r="8" fill="#333"/><circle cx="55" cy="25" r="8" fill="#333"/><circle cx="40" cy="55" r="8" fill="#333"/>
      <circle cx="115" cy="25" r="8" fill="#333"/><circle cx="145" cy="25" r="8" fill="#333"/><circle cx="115" cy="55" r="8" fill="#333"/><circle cx="145" cy="55" r="8" fill="#333"/>
      <circle cx="205" cy="25" r="8" fill="#333"/><circle cx="235" cy="25" r="8" fill="#333"/><circle cx="220" cy="45" r="8" fill="#333"/><circle cx="205" cy="65" r="8" fill="#333"/><circle cx="235" cy="65" r="8" fill="#333"/>
      <circle cx="25" cy="115" r="8" fill="none" stroke="#333" stroke-width="2"/><circle cx="55" cy="115" r="8" fill="none" stroke="#333" stroke-width="2"/><circle cx="40" cy="145" r="8" fill="none" stroke="#333" stroke-width="2"/>
      <circle cx="115" cy="115" r="8" fill="none" stroke="#333" stroke-width="2"/><circle cx="145" cy="115" r="8" fill="none" stroke="#333" stroke-width="2"/><circle cx="115" cy="145" r="8" fill="none" stroke="#333" stroke-width="2"/><circle cx="145" cy="145" r="8" fill="none" stroke="#333" stroke-width="2"/>
      <circle cx="205" cy="115" r="8" fill="none" stroke="#333" stroke-width="2"/><circle cx="235" cy="115" r="8" fill="none" stroke="#333" stroke-width="2"/><circle cx="220" cy="135" r="8" fill="none" stroke="#333" stroke-width="2"/><circle cx="205" cy="155" r="8" fill="none" stroke="#333" stroke-width="2"/><circle cx="235" cy="155" r="8" fill="none" stroke="#333" stroke-width="2"/>
      <circle cx="25" cy="205" r="8" fill="#aaa"/><circle cx="55" cy="205" r="8" fill="#aaa"/><circle cx="40" cy="235" r="8" fill="#aaa"/>
      <circle cx="115" cy="205" r="8" fill="#aaa"/><circle cx="145" cy="205" r="8" fill="#aaa"/><circle cx="115" cy="235" r="8" fill="#aaa"/><circle cx="145" cy="235" r="8" fill="#aaa"/>
      ${qmark(220, 225)}
    </svg><br/>Row pattern: dots change from 3 → 4 → 5. Column pattern: fill changes from filled → empty → gray. What goes in the missing cell?`,
    options: [
      { label: "A", text: "5 gray dots in same arrangement as row 1 col 3" },
      { label: "B", text: "4 gray dots" },
      { label: "C", text: "5 filled dots" },
      { label: "D", text: "3 gray dots" },
    ],
    correctLabel: "A", tags: ["matrix"],
  },

  // H6: Complex next in series — overlay/XOR pattern
  {
    category: "spatial", difficulty: 3,
    stem: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 100" width="400" height="100">
      ${sep(100)}${sep(200)}${sep(300)}
      <g transform="translate(10,10)">
        ${shapes.rect(10, 10, 60, 60)}<circle cx="25" cy="25" r="8" fill="#333"/><circle cx="55" cy="55" r="8" fill="#333"/>
      </g>
      <g transform="translate(110,10)">
        ${shapes.rect(10, 10, 60, 60)}<circle cx="55" cy="25" r="8" fill="#333"/><circle cx="25" cy="55" r="8" fill="#333"/>
      </g>
      <g transform="translate(210,10)">
        ${shapes.rect(10, 10, 60, 60)}<circle cx="25" cy="25" r="8" fill="#333"/><circle cx="55" cy="25" r="8" fill="#333"/><circle cx="25" cy="55" r="8" fill="#333"/><circle cx="55" cy="55" r="8" fill="#333"/>
      </g>
      ${qmark(350, 50)}
    </svg><br/>The third figure combines the dots from figures 1 and 2. If figure 4 has a dot at top-left only, and figure 5 has dots at top-right and bottom-left, what does figure 6 look like?`,
    options: [
      { label: "A", text: "Dots at all three positions: top-left, top-right, bottom-left" },
      { label: "B", text: "Dots at top-right and bottom-left only" },
      { label: "C", text: "Dots at all four corners" },
      { label: "D", text: "Dot at top-left only" },
    ],
    correctLabel: "A", tags: ["next-in-series"],
  },

  // ===================== ADDITIONAL 20 QUESTIONS =====================

  // A1: Next in series — shapes shrink
  {
    category: "spatial", difficulty: 1,
    stem: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 80" width="340" height="80">
      ${sep(80)}${sep(160)}${sep(240)}
      ${shapes.rect(10, 10, 60, 60)}${shapes.rect(90, 15, 50, 50)}${shapes.rect(170, 20, 40, 40)}${qmark(290, 40)}
    </svg><br/>The square gets smaller each step. What comes next?`,
    options: [
      { label: "A", text: svg(60, 60, shapes.rect(15, 15, 30, 30)) },
      { label: "B", text: svg(60, 60, shapes.rect(5, 5, 50, 50)) },
      { label: "C", text: svg(60, 60, shapes.rect(20, 20, 20, 20)) },
      { label: "D", text: svg(60, 60, shapes.circle(30, 30, 15)) },
    ],
    correctLabel: "A", tags: ["next-in-series"],
  },

  // A2: Odd one out — four have stripes, one is solid
  {
    category: "spatial", difficulty: 1,
    stem: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 80" width="400" height="80">
      <text x="10" y="14" font-size="11" fill="#666">1</text>
      ${shapes.circle(40, 45, 18)}${shapes.line(22, 45, 58, 45)}
      <text x="90" y="14" font-size="11" fill="#666">2</text>
      ${shapes.circle(120, 45, 18)}${shapes.line(102, 45, 138, 45)}
      <text x="170" y="14" font-size="11" fill="#666">3</text>
      ${shapes.circle(200, 45, 18, "#333")}
      <text x="250" y="14" font-size="11" fill="#666">4</text>
      ${shapes.circle(280, 45, 18)}${shapes.line(262, 45, 298, 45)}
      <text x="330" y="14" font-size="11" fill="#666">5</text>
      ${shapes.circle(360, 45, 18)}${shapes.line(342, 45, 378, 45)}
    </svg><br/>Which figure is the odd one out?`,
    options: [
      { label: "A", text: "Figure 1" },
      { label: "B", text: "Figure 3" },
      { label: "C", text: "Figure 4" },
      { label: "D", text: "Figure 5" },
    ],
    correctLabel: "B", tags: ["odd-one-out"],
  },

  // A3: Next in series — triangle flips each step
  {
    category: "spatial", difficulty: 1,
    stem: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 80" width="340" height="80">
      ${sep(80)}${sep(160)}${sep(240)}
      <polygon points="40,20 20,60 60,60" fill="none" stroke="#333" stroke-width="2"/>
      <polygon points="100,60 120,20 140,60" fill="none" stroke="#333" stroke-width="2"/>
      <polygon points="200,20 180,60 220,60" fill="none" stroke="#333" stroke-width="2"/>
      ${qmark(290, 40)}
    </svg><br/>The triangle flips up and down. What comes next?`,
    options: [
      { label: "A", text: svg(60, 60, `<polygon points="30,50 10,10 50,10" fill="none" stroke="#333" stroke-width="2"/>`) },
      { label: "B", text: svg(60, 60, `<polygon points="30,10 10,50 50,50" fill="none" stroke="#333" stroke-width="2"/>`) },
      { label: "C", text: svg(60, 60, shapes.rect(14, 14, 32, 32)) },
      { label: "D", text: svg(60, 60, shapes.circle(30, 30, 18)) },
    ],
    correctLabel: "A", tags: ["next-in-series"],
  },

  // A4: Next in series — alternating fill: empty, half, full
  {
    category: "spatial", difficulty: 2,
    stem: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 80" width="400" height="80">
      ${sep(80)}${sep(160)}${sep(240)}${sep(320)}
      ${shapes.rect(16, 16, 48, 48)}
      <rect x="96" y="16" width="48" height="48" fill="none" stroke="#333" stroke-width="2"/><rect x="96" y="40" width="48" height="24" fill="#333"/>
      ${shapes.rect(176, 16, 48, 48, "#333")}
      ${shapes.rect(256, 16, 48, 48)}
      ${qmark(360, 40)}
    </svg><br/>Pattern: empty, half-filled, full, empty, ___. What comes next?`,
    options: [
      { label: "A", text: "Full square" },
      { label: "B", text: "Half-filled square" },
      { label: "C", text: "Empty square" },
      { label: "D", text: "Quarter-filled square" },
    ],
    correctLabel: "B", tags: ["next-in-series"],
  },

  // A5: Matrix — size changes
  {
    category: "spatial", difficulty: 2,
    stem: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" width="240" height="240">
      <rect x="0" y="0" width="240" height="240" fill="#fafafa" stroke="#ddd"/>
      <line x1="80" y1="0" x2="80" y2="240" stroke="#ddd"/><line x1="160" y1="0" x2="160" y2="240" stroke="#ddd"/>
      <line x1="0" y1="80" x2="240" y2="80" stroke="#ddd"/><line x1="0" y1="160" x2="240" y2="160" stroke="#ddd"/>
      ${shapes.circle(40, 40, 10)}${shapes.circle(120, 40, 18)}${shapes.circle(200, 40, 26)}
      ${shapes.rect(28, 108, 24, 24)}${shapes.rect(100, 100, 40, 40)}${shapes.rect(172, 92, 56, 56)}
      ${shapes.triangle(40, 200, 24)}${shapes.triangle(120, 200, 40)}${qmark(200, 200)}
    </svg><br/>Each row shows shapes getting bigger left to right. What goes in the missing cell?`,
    options: [
      { label: "A", text: svg(60, 60, shapes.triangle(30, 30, 52)) },
      { label: "B", text: svg(60, 60, shapes.triangle(30, 30, 32)) },
      { label: "C", text: svg(60, 60, shapes.circle(30, 30, 26)) },
      { label: "D", text: svg(60, 60, shapes.triangle(30, 30, 24)) },
    ],
    correctLabel: "A", tags: ["matrix"],
  },

  // A6: Next in series — two shapes swap positions
  {
    category: "spatial", difficulty: 2,
    stem: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 80" width="340" height="80">
      ${sep(80)}${sep(160)}${sep(240)}
      ${shapes.circle(25, 40, 12, "#333")}${shapes.rect(45, 28, 24, 24)}
      ${shapes.rect(92, 28, 24, 24, "#333")}${shapes.circle(135, 40, 12)}
      ${shapes.circle(185, 40, 12, "#333")}${shapes.rect(205, 28, 24, 24)}
      ${qmark(290, 40)}
    </svg><br/>The circle and square swap positions and fills each step. What comes next?`,
    options: [
      { label: "A", text: svg(60, 60, `${shapes.rect(6, 18, 24, 24, "#333")}${shapes.circle(48, 30, 12)}`) },
      { label: "B", text: svg(60, 60, `${shapes.circle(18, 30, 12, "#333")}${shapes.rect(30, 18, 24, 24)}`) },
      { label: "C", text: svg(60, 60, `${shapes.rect(6, 18, 24, 24)}${shapes.circle(48, 30, 12, "#333")}`) },
      { label: "D", text: svg(60, 60, `${shapes.circle(18, 30, 12)}${shapes.rect(30, 18, 24, 24, "#333")}`) },
    ],
    correctLabel: "A", tags: ["next-in-series"],
  },

  // A7: Odd one out — different number of dots
  {
    category: "spatial", difficulty: 2,
    stem: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 90" width="400" height="90">
      <text x="10" y="14" font-size="11" fill="#666">1</text>
      ${shapes.rect(15, 25, 50, 50)}<circle cx="28" cy="38" r="4" fill="#333"/><circle cx="52" cy="38" r="4" fill="#333"/><circle cx="40" cy="58" r="4" fill="#333"/>
      <text x="90" y="14" font-size="11" fill="#666">2</text>
      ${shapes.rect(95, 25, 50, 50)}<circle cx="108" cy="38" r="4" fill="#333"/><circle cx="132" cy="38" r="4" fill="#333"/><circle cx="120" cy="58" r="4" fill="#333"/>
      <text x="170" y="14" font-size="11" fill="#666">3</text>
      ${shapes.rect(175, 25, 50, 50)}<circle cx="188" cy="38" r="4" fill="#333"/><circle cx="212" cy="38" r="4" fill="#333"/>
      <text x="250" y="14" font-size="11" fill="#666">4</text>
      ${shapes.rect(255, 25, 50, 50)}<circle cx="268" cy="38" r="4" fill="#333"/><circle cx="292" cy="38" r="4" fill="#333"/><circle cx="280" cy="58" r="4" fill="#333"/>
      <text x="330" y="14" font-size="11" fill="#666">5</text>
      ${shapes.rect(335, 25, 50, 50)}<circle cx="348" cy="38" r="4" fill="#333"/><circle cx="372" cy="38" r="4" fill="#333"/><circle cx="360" cy="58" r="4" fill="#333"/>
    </svg><br/>Which figure is the odd one out?`,
    options: [
      { label: "A", text: "Figure 1" },
      { label: "B", text: "Figure 2" },
      { label: "C", text: "Figure 3" },
      { label: "D", text: "Figure 5" },
    ],
    correctLabel: "C", tags: ["odd-one-out"],
  },

  // A8: Next in series — shape morphing circle→oval→rectangle
  {
    category: "spatial", difficulty: 1,
    stem: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 80" width="340" height="80">
      ${sep(80)}${sep(160)}${sep(240)}
      <circle cx="40" cy="40" r="20" fill="none" stroke="#333" stroke-width="2"/>
      <ellipse cx="120" cy="40" rx="26" ry="16" fill="none" stroke="#333" stroke-width="2"/>
      ${shapes.rect(176, 24, 48, 32)}
      ${qmark(290, 40)}
    </svg><br/>Circle becomes oval becomes rectangle. What shape is most different from this pattern?`,
    options: [
      { label: "A", text: "Square" },
      { label: "B", text: "Triangle" },
      { label: "C", text: "Wider rectangle" },
      { label: "D", text: "Narrow rectangle" },
    ],
    correctLabel: "B", tags: ["next-in-series"],
  },

  // A9: Next in series — arrow rotates 60° each step
  {
    category: "spatial", difficulty: 2,
    stem: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 80" width="400" height="80">
      ${sep(80)}${sep(160)}${sep(240)}${sep(320)}
      ${shapes.arrow(40, 40, 0)}${shapes.arrow(120, 40, 60)}${shapes.arrow(200, 40, 120)}${shapes.arrow(280, 40, 180)}${qmark(360, 40)}
    </svg><br/>The arrow rotates 60° each step. What comes next?`,
    options: [
      { label: "A", text: svg(60, 60, shapes.arrow(30, 30, 240)) },
      { label: "B", text: svg(60, 60, shapes.arrow(30, 30, 270)) },
      { label: "C", text: svg(60, 60, shapes.arrow(30, 30, 200)) },
      { label: "D", text: svg(60, 60, shapes.arrow(30, 30, 300)) },
    ],
    correctLabel: "A", tags: ["next-in-series"],
  },

  // A10: Matrix — rotation pattern
  {
    category: "spatial", difficulty: 3,
    stem: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" width="240" height="240">
      <rect x="0" y="0" width="240" height="240" fill="#fafafa" stroke="#ddd"/>
      <line x1="80" y1="0" x2="80" y2="240" stroke="#ddd"/><line x1="160" y1="0" x2="160" y2="240" stroke="#ddd"/>
      <line x1="0" y1="80" x2="240" y2="80" stroke="#ddd"/><line x1="0" y1="160" x2="240" y2="160" stroke="#ddd"/>
      ${shapes.arrow(40, 40, 0)}${shapes.arrow(120, 40, 90)}${shapes.arrow(200, 40, 180)}
      ${shapes.arrow(40, 120, 90)}${shapes.arrow(120, 120, 180)}${shapes.arrow(200, 120, 270)}
      ${shapes.arrow(40, 200, 180)}${shapes.arrow(120, 200, 270)}${qmark(200, 200)}
    </svg><br/>Each row rotates 90° more. What goes in the missing cell?`,
    options: [
      { label: "A", text: svg(60, 60, shapes.arrow(30, 30, 0)) },
      { label: "B", text: svg(60, 60, shapes.arrow(30, 30, 360)) },
      { label: "C", text: svg(60, 60, shapes.arrow(30, 30, 270)) },
      { label: "D", text: svg(60, 60, shapes.arrow(30, 30, 90)) },
    ],
    correctLabel: "A", tags: ["matrix"],
  },

  // A11: Odd one out — four have even sides, one odd
  {
    category: "spatial", difficulty: 1,
    stem: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 80" width="400" height="80">
      <text x="10" y="14" font-size="11" fill="#666">1</text>${shapes.rect(18, 22, 36, 36)}
      <text x="90" y="14" font-size="11" fill="#666">2</text>${shapes.hexagon(120, 45, 20)}
      <text x="170" y="14" font-size="11" fill="#666">3</text>${shapes.rect(180, 22, 36, 36)}
      <text x="250" y="14" font-size="11" fill="#666">4</text>${shapes.triangle(280, 45, 38)}
      <text x="330" y="14" font-size="11" fill="#666">5</text>${shapes.rect(340, 22, 36, 36)}
    </svg><br/>Which figure has a different number of sides from the majority?`,
    options: [
      { label: "A", text: "Figure 2" },
      { label: "B", text: "Figure 3" },
      { label: "C", text: "Figure 4" },
      { label: "D", text: "Figure 5" },
    ],
    correctLabel: "C", tags: ["odd-one-out"],
  },

  // A12: Next in series — dots increase in triangle pattern
  {
    category: "spatial", difficulty: 2,
    stem: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 80" width="400" height="80">
      ${sep(80)}${sep(160)}${sep(240)}${sep(320)}
      <circle cx="40" cy="40" r="6" fill="#333"/>
      <circle cx="110" cy="30" r="6" fill="#333"/><circle cx="130" cy="30" r="6" fill="#333"/><circle cx="120" cy="50" r="6" fill="#333"/>
      <circle cx="170" cy="20" r="6" fill="#333"/><circle cx="190" cy="20" r="6" fill="#333"/><circle cx="210" cy="20" r="6" fill="#333"/><circle cx="180" cy="40" r="6" fill="#333"/><circle cx="200" cy="40" r="6" fill="#333"/><circle cx="190" cy="60" r="6" fill="#333"/>
      ${qmark(290, 40)}
    </svg><br/>The dots form triangle numbers: 1, 3, 6, ___. How many dots come next?`,
    options: [
      { label: "A", text: "8" },
      { label: "B", text: "9" },
      { label: "C", text: "10" },
      { label: "D", text: "12" },
    ],
    correctLabel: "C", tags: ["next-in-series"],
  },

  // A13: Next in series — shape gains one more side each step (all filled)
  {
    category: "spatial", difficulty: 1,
    stem: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 80" width="340" height="80">
      ${sep(80)}${sep(160)}${sep(240)}
      ${shapes.triangle(40, 40, 36, "#333")}${shapes.rect(98, 18, 44, 44, "#333")}${shapes.pentagon(200, 40, 22, "#333")}${qmark(290, 40)}
    </svg><br/>Each shape adds one more side and is filled. What comes next?`,
    options: [
      { label: "A", text: svg(60, 60, shapes.hexagon(30, 30, 20, "#333")) },
      { label: "B", text: svg(60, 60, shapes.circle(30, 30, 20, "#333")) },
      { label: "C", text: svg(60, 60, shapes.hexagon(30, 30, 20)) },
      { label: "D", text: svg(60, 60, shapes.star(30, 30, 20, 10, "#333")) },
    ],
    correctLabel: "A", tags: ["next-in-series"],
  },

  // A14: Odd one out — different rotation direction
  {
    category: "spatial", difficulty: 2,
    stem: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 90" width="400" height="90">
      <text x="10" y="14" font-size="11" fill="#666">1</text>
      <g transform="translate(15,20)">${shapes.rect(0, 0, 50, 50)}${shapes.line(0, 0, 50, 50)}</g>
      <text x="90" y="14" font-size="11" fill="#666">2</text>
      <g transform="translate(95,20)">${shapes.rect(0, 0, 50, 50)}${shapes.line(0, 0, 50, 50)}</g>
      <text x="170" y="14" font-size="11" fill="#666">3</text>
      <g transform="translate(175,20)">${shapes.rect(0, 0, 50, 50)}${shapes.line(50, 0, 0, 50)}</g>
      <text x="250" y="14" font-size="11" fill="#666">4</text>
      <g transform="translate(255,20)">${shapes.rect(0, 0, 50, 50)}${shapes.line(0, 0, 50, 50)}</g>
      <text x="330" y="14" font-size="11" fill="#666">5</text>
      <g transform="translate(335,20)">${shapes.rect(0, 0, 50, 50)}${shapes.line(0, 0, 50, 50)}</g>
    </svg><br/>Which figure has the diagonal line going in a different direction?`,
    options: [
      { label: "A", text: "Figure 1" },
      { label: "B", text: "Figure 2" },
      { label: "C", text: "Figure 3" },
      { label: "D", text: "Figure 4" },
    ],
    correctLabel: "C", tags: ["odd-one-out"],
  },

  // A15: Next in series — shapes double each step
  {
    category: "spatial", difficulty: 2,
    stem: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 80" width="400" height="80">
      ${sep(100)}${sep(200)}${sep(300)}
      <circle cx="50" cy="40" r="10" fill="#333"/>
      <circle cx="130" cy="30" r="10" fill="#333"/><circle cx="170" cy="50" r="10" fill="#333"/>
      <circle cx="210" cy="25" r="10" fill="#333"/><circle cx="240" cy="25" r="10" fill="#333"/><circle cx="210" cy="55" r="10" fill="#333"/><circle cx="240" cy="55" r="10" fill="#333"/>
      ${qmark(350, 40)}
    </svg><br/>The number of dots doubles each step: 1, 2, 4, ___. How many next?`,
    options: [
      { label: "A", text: "6" },
      { label: "B", text: "8" },
      { label: "C", text: "5" },
      { label: "D", text: "10" },
    ],
    correctLabel: "B", tags: ["next-in-series"],
  },

  // A16: Complex matrix — shape + orientation
  {
    category: "spatial", difficulty: 3,
    stem: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" width="240" height="240">
      <rect x="0" y="0" width="240" height="240" fill="#fafafa" stroke="#ddd"/>
      <line x1="80" y1="0" x2="80" y2="240" stroke="#ddd"/><line x1="160" y1="0" x2="160" y2="240" stroke="#ddd"/>
      <line x1="0" y1="80" x2="240" y2="80" stroke="#ddd"/><line x1="0" y1="160" x2="240" y2="160" stroke="#ddd"/>
      ${shapes.circle(40, 40, 16)}<circle cx="40" cy="28" r="4" fill="#333"/>
      ${shapes.circle(120, 40, 16)}<circle cx="132" cy="40" r="4" fill="#333"/>
      ${shapes.circle(200, 40, 16)}<circle cx="200" cy="52" r="4" fill="#333"/>
      ${shapes.rect(22, 102, 36, 36)}<circle cx="40" cy="108" r="4" fill="#333"/>
      ${shapes.rect(102, 102, 36, 36)}<circle cx="132" cy="120" r="4" fill="#333"/>
      ${shapes.rect(182, 102, 36, 36)}<circle cx="200" cy="132" r="4" fill="#333"/>
      ${shapes.triangle(40, 200, 36)}<circle cx="40" cy="188" r="4" fill="#333"/>
      ${shapes.triangle(120, 200, 36)}<circle cx="132" cy="200" r="4" fill="#333"/>
      ${qmark(200, 200)}
    </svg><br/>The dot rotates clockwise around each shape. What goes in the missing cell?`,
    options: [
      { label: "A", text: "Triangle with dot at bottom" },
      { label: "B", text: "Triangle with dot at right" },
      { label: "C", text: "Triangle with dot at left" },
      { label: "D", text: "Circle with dot at bottom" },
    ],
    correctLabel: "A", tags: ["matrix"],
  },

  // A17: Next in series — cross rotates 45°
  {
    category: "spatial", difficulty: 1,
    stem: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 80" width="340" height="80">
      ${sep(80)}${sep(160)}${sep(240)}
      <g transform="rotate(0,40,40)">${shapes.cross(40, 40, 16)}</g>
      <g transform="rotate(45,120,40)">${shapes.cross(120, 40, 16)}</g>
      <g transform="rotate(0,200,40)">${shapes.cross(200, 40, 16)}</g>
      ${qmark(290, 40)}
    </svg><br/>The cross alternates between upright and tilted 45°. What comes next?`,
    options: [
      { label: "A", text: "Tilted 45° cross" },
      { label: "B", text: "Upright cross" },
      { label: "C", text: "Tilted 90° cross" },
      { label: "D", text: "Circle" },
    ],
    correctLabel: "A", tags: ["next-in-series"],
  },

  // A18: Odd one out — one is a different size
  {
    category: "spatial", difficulty: 1,
    stem: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 80" width="400" height="80">
      <text x="10" y="14" font-size="11" fill="#666">1</text>${shapes.circle(40, 45, 18)}
      <text x="90" y="14" font-size="11" fill="#666">2</text>${shapes.circle(120, 45, 18)}
      <text x="170" y="14" font-size="11" fill="#666">3</text>${shapes.circle(200, 45, 18)}
      <text x="250" y="14" font-size="11" fill="#666">4</text>${shapes.circle(280, 45, 10)}
      <text x="330" y="14" font-size="11" fill="#666">5</text>${shapes.circle(360, 45, 18)}
    </svg><br/>Which figure is the odd one out?`,
    options: [
      { label: "A", text: "Figure 1" },
      { label: "B", text: "Figure 2" },
      { label: "C", text: "Figure 4" },
      { label: "D", text: "Figure 5" },
    ],
    correctLabel: "C", tags: ["odd-one-out"],
  },

  // A19: Complex odd one out — all have same area except one
  {
    category: "spatial", difficulty: 3,
    stem: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 100" width="420" height="100">
      <text x="10" y="14" font-size="11" fill="#666">1</text>
      ${shapes.rect(15, 25, 40, 40, "#333")}
      <text x="90" y="14" font-size="11" fill="#666">2</text>
      ${shapes.rect(95, 25, 20, 80, "#333")}
      <text x="170" y="14" font-size="11" fill="#666">3</text>
      ${shapes.rect(175, 25, 80, 20, "#333")}
      <text x="260" y="14" font-size="11" fill="#666">4</text>
      ${shapes.rect(265, 25, 50, 30, "#333")}
      <text x="345" y="14" font-size="11" fill="#666">5</text>
      ${shapes.rect(350, 25, 32, 50, "#333")}
    </svg><br/>All rectangles have the same area (1600 sq units) except one. Which is different?`,
    options: [
      { label: "A", text: "Figure 2" },
      { label: "B", text: "Figure 3" },
      { label: "C", text: "Figure 4" },
      { label: "D", text: "Figure 5" },
    ],
    correctLabel: "C", tags: ["odd-one-out"],
  },

  // A20: Complex next in series — shapes combine
  {
    category: "spatial", difficulty: 3,
    stem: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 100" width="400" height="100">
      ${sep(100)}${sep(200)}${sep(300)}
      <g transform="translate(10,10)">
        ${shapes.circle(40, 40, 24)}
      </g>
      <g transform="translate(110,10)">
        ${shapes.circle(40, 40, 24)}${shapes.rect(28, 28, 24, 24)}
      </g>
      <g transform="translate(210,10)">
        ${shapes.circle(40, 40, 24)}${shapes.rect(28, 28, 24, 24)}${shapes.triangle(40, 40, 20, "#333")}
      </g>
      ${qmark(350, 50)}
    </svg><br/>Each step adds a shape inside: circle → circle+square → circle+square+filled triangle. What comes next?`,
    options: [
      { label: "A", text: "Circle + square + filled triangle + filled diamond" },
      { label: "B", text: "Circle + square + filled triangle + circle" },
      { label: "C", text: "Circle + square only" },
      { label: "D", text: "Circle + filled triangle + diamond" },
    ],
    correctLabel: "A", tags: ["next-in-series"],
  },
];
