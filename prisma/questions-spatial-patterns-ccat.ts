type QuestionData = {
  category: "verbal" | "math_logic" | "spatial";
  difficulty: number;
  stem: string;
  options: { label: string; text: string }[];
  correctLabel: string;
  tags: string[];
};

const ink = "#1f2937";
const gray = "#d1d5db";
const fill = "#111827";
const original = "ccat-original";
const solution = (text: string) => `solution:${text}`;

function svg(w: number, h: number, content: string) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">${content}</svg>`;
}

function box(x: number, y: number, w = 72, h = 72) {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="white" stroke="${ink}" stroke-width="2"/>`;
}

function optBox(content: string) {
  return svg(92, 92, `${box(10, 6)}${content}`);
}

function circle(cx: number, cy: number, r: number, f = "none") {
  return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${f}" stroke="${ink}" stroke-width="2"/>`;
}

function square(cx: number, cy: number, s: number, f = "none") {
  return `<rect x="${cx - s / 2}" y="${cy - s / 2}" width="${s}" height="${s}" fill="${f}" stroke="${ink}" stroke-width="2"/>`;
}

function tri(cx: number, cy: number, s: number, f = "none") {
  const h = s * 0.866;
  return `<polygon points="${cx},${cy - h / 2} ${cx - s / 2},${cy + h / 2} ${cx + s / 2},${cy + h / 2}" fill="${f}" stroke="${ink}" stroke-width="2"/>`;
}

function hex(cx: number, cy: number, r: number, f = "none") {
  const pts = Array.from({ length: 6 }, (_, i) => {
    const a = (i * 60 + 30) * Math.PI / 180;
    return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`;
  }).join(" ");
  return `<polygon points="${pts}" fill="${f}" stroke="${ink}" stroke-width="2"/>`;
}

function star(cx: number, cy: number, r = 13, f = "none") {
  const pts = Array.from({ length: 10 }, (_, i) => {
    const rr = i % 2 === 0 ? r : r * 0.45;
    const a = (i * 36 - 90) * Math.PI / 180;
    return `${cx + rr * Math.cos(a)},${cy + rr * Math.sin(a)}`;
  }).join(" ");
  return `<polygon points="${pts}" fill="${f}" stroke="${ink}" stroke-width="1.7"/>`;
}

function plus(cx: number, cy: number, f = fill) {
  return `<path d="M ${cx - 8} ${cy - 18} H ${cx + 8} V ${cy - 8} H ${cx + 18} V ${cy + 8} H ${cx + 8} V ${cy + 18} H ${cx - 8} V ${cy + 8} H ${cx - 18} V ${cy - 8} H ${cx - 8} Z" fill="${f}" stroke="${ink}" stroke-width="1.5"/>`;
}

function xmark(cx: number, cy: number) {
  return `<line x1="${cx - 9}" y1="${cy - 9}" x2="${cx + 9}" y2="${cy + 9}" stroke="${ink}" stroke-width="2"/><line x1="${cx + 9}" y1="${cy - 9}" x2="${cx - 9}" y2="${cy + 9}" stroke="${ink}" stroke-width="2"/>`;
}

function minus(cx: number, cy: number) {
  return `<line x1="${cx - 10}" y1="${cy}" x2="${cx + 10}" y2="${cy}" stroke="${ink}" stroke-width="2"/>`;
}

function chevron(cx: number, cy: number, dir: "right" | "down" | "left" | "up") {
  const rotation = { right: 0, down: 90, left: 180, up: 270 }[dir];
  return `<g transform="rotate(${rotation},${cx},${cy})"><path d="M ${cx - 12} ${cy - 18} L ${cx + 8} ${cy} L ${cx - 12} ${cy + 18} L ${cx + 2} ${cy + 18} L ${cx + 22} ${cy} L ${cx + 2} ${cy - 18} Z" fill="${fill}"/></g>`;
}

function nested(outer: "square" | "circle" | "tri" | "hex", middle: "square" | "circle" | "tri" | "hex", inner: "square" | "circle" | "tri" | "hex", x: number, y: number) {
  const draw = {
    square: (cx: number, cy: number, size: number) => square(cx, cy, size),
    circle: (cx: number, cy: number, size: number) => circle(cx, cy, size / 2),
    tri: (cx: number, cy: number, size: number) => tri(cx, cy + 4, size),
    hex: (cx: number, cy: number, size: number) => hex(cx, cy, size / 2),
  };
  return `${draw[outer](x, y, 54)}${draw[middle](x, y, 34)}${draw[inner](x, y, 18)}`;
}

function symbolCell(x: number, y: number, positions: Record<"tl" | "tr" | "bl" | "br", string>) {
  const p = { tl: [x + 18, y + 18], tr: [x + 54, y + 18], bl: [x + 18, y + 54], br: [x + 54, y + 54] } as const;
  const draw = (name: string, cx: number, cy: number) => {
    if (name === "circle") return circle(cx, cy, 9);
    if (name === "square") return square(cx, cy, 16, fill);
    if (name === "x") return xmark(cx, cy);
    return minus(cx, cy);
  };
  return `${box(x, y)}${Object.entries(positions).map(([k, v]) => draw(v, p[k as keyof typeof p][0], p[k as keyof typeof p][1])).join("")}`;
}

function dotCell(x: number, y: number, count: number, darkCount: number, shape: "circle" | "star") {
  const spots = [[x + 22, y + 22], [x + 50, y + 22], [x + 22, y + 50], [x + 50, y + 50], [x + 36, y + 36]];
  return `${box(x, y)}${spots.slice(0, count).map(([cx, cy], i) => shape === "circle" ? circle(cx, cy, 7, i < darkCount ? fill : "white") : star(cx, cy, 8, i < darkCount ? fill : "white")).join("")}`;
}

function seriesStem(cells: string[]) {
  return `${svg(430, 96, cells.map((cell, i) => `<g transform="translate(${i * 84},0)">${cell}</g>`).join(""))}<br/>Which figure completes the series?`;
}

function optionRow(options: string[]) {
  return options.map((content, i) => ({ label: String.fromCharCode(65 + i), text: optBox(content) }));
}

export const ccatSpatialPatternQuestions: QuestionData[] = [
  {
    category: "spatial", difficulty: 2,
    stem: `${svg(470, 110, [
      nested("square", "circle", "tri", 48, 52),
      nested("circle", "square", "square", 138, 52),
      nested("circle", "tri", "square", 228, 52),
      nested("square", "tri", "circle", 318, 52),
      nested("square", "circle", "tri", 408, 52),
    ].map((c, i) => `<g>${c}<text x="${48 + i * 90}" y="104" text-anchor="middle" font-size="18" font-weight="700">${String.fromCharCode(65 + i)}</text></g>`).join(""))}<br/>Which figure does not belong?`,
    options: [
      { label: "A", text: "A" },
      { label: "B", text: "B" },
      { label: "C", text: "C" },
      { label: "D", text: "D" },
      { label: "E", text: "E" },
    ],
    correctLabel: "C",
    tags: ["odd-one-out", original, solution("A, B, D, and E all contain at least one circle and at least one square as nested shapes. C is the only figure with no outer or middle square; it has circle, triangle, square in a different role pattern.")],
  },
  {
    category: "spatial", difficulty: 3,
    stem: seriesStem([
      symbolCell(6, 10, { tl: "circle", tr: "square", bl: "minus", br: "x" }),
      symbolCell(6, 10, { tl: "minus", tr: "circle", bl: "x", br: "square" }),
      symbolCell(6, 10, { tl: "x", tr: "minus", bl: "circle", br: "square" }),
      symbolCell(6, 10, { tl: "square", tr: "x", bl: "circle", br: "minus" }),
      `<rect x="6" y="10" width="72" height="72" fill="white" stroke="${gray}" stroke-width="2"/><text x="42" y="48" text-anchor="middle" dominant-baseline="middle" font-size="30" fill="#9ca3af">?</text>`,
    ]),
    options: optionRow([
      `${circle(28, 28, 9)}${minus(62, 28)}${square(28, 62, 16, fill)}${xmark(62, 62)}`,
      `${xmark(28, 28)}${circle(62, 28, 9)}${square(28, 62, 16, fill)}${minus(62, 62)}`,
      `${square(28, 28, 16, fill)}${minus(62, 28)}${circle(28, 62, 9)}${xmark(62, 62)}`,
      `${square(28, 28, 16, fill)}${xmark(62, 28)}${circle(28, 62, 9)}${minus(62, 62)}`,
      `${square(28, 28, 16, fill)}${xmark(62, 28)}${minus(28, 62)}${circle(62, 62, 9)}`,
    ]),
    correctLabel: "D",
    tags: ["next-in-series", "sequence", original, solution("Track each symbol separately. From the fourth cell, the black square and X stay in the top row, while the circle and minus stay in the bottom row. The next figure keeps square top-left, X top-right, circle bottom-left, minus bottom-right.")],
  },
  {
    category: "spatial", difficulty: 3,
    stem: `${svg(250, 250, `${dotCell(0, 0, 2, 0, "star")}${dotCell(86, 0, 2, 0, "star")}${dotCell(172, 0, 2, 1, "circle")}${dotCell(0, 86, 4, 0, "star")}<rect x="86" y="86" width="72" height="72" fill="white" stroke="${gray}" stroke-width="2"/><text x="122" y="124" text-anchor="middle" font-size="28" fill="#9ca3af">?</text>${dotCell(172, 86, 4, 1, "circle")}${dotCell(0, 172, 5, 0, "star")}${dotCell(86, 172, 5, 0, "star")}${dotCell(172, 172, 5, 2, "circle")}`)}<br/>Which figure completes the matrix?`,
    options: optionRow([
      dotCell(10, 6, 5, 0, "star").replace(/^<rect[^>]+>/, ""),
      dotCell(10, 6, 4, 0, "star").replace(/^<rect[^>]+>/, ""),
      dotCell(10, 6, 4, 2, "star").replace(/^<rect[^>]+>/, ""),
      dotCell(10, 6, 5, 1, "circle").replace(/^<rect[^>]+>/, ""),
      dotCell(10, 6, 4, 2, "circle").replace(/^<rect[^>]+>/, ""),
    ]),
    correctLabel: "B",
    tags: ["matrix", original, solution("Rows increase the number of symbols: 2, then 4, then 5. Columns keep the symbol family: the first two columns use stars, the third uses circles. The missing middle cell needs four unfilled stars.")],
  },
  {
    category: "spatial", difficulty: 3,
    stem: seriesStem([
      `${box(6, 10)}${chevron(24, 28, "right")}${tri(42, 44, 22)}${tri(62, 44, 22)}${tri(42, 66, 22)}${tri(62, 66, 22)}`,
      `${box(6, 10)}${chevron(60, 28, "down")}${tri(32, 44, 22)}${tri(52, 44, 22)}${tri(32, 66, 22)}${tri(52, 66, 22, fill)}`,
      `${box(6, 10)}${chevron(24, 28, "left")}${tri(42, 44, 22)}${tri(62, 44, 22)}${tri(42, 66, 22, fill)}${tri(62, 66, 22, fill)}`,
      `${box(6, 10)}${chevron(60, 28, "up")}${tri(32, 44, 22)}${tri(52, 44, 22, fill)}${tri(32, 66, 22, fill)}${tri(52, 66, 22, fill)}`,
      `<rect x="6" y="10" width="72" height="72" fill="white" stroke="${gray}" stroke-width="2"/><text x="42" y="48" text-anchor="middle" dominant-baseline="middle" font-size="30" fill="#9ca3af">?</text>`,
    ]),
    options: optionRow([
      `${chevron(24, 28, "right")}${tri(32, 44, 22, fill)}${tri(52, 44, 22, fill)}${tri(32, 66, 22, fill)}${tri(52, 66, 22, fill)}`,
      `${chevron(60, 28, "down")}${tri(32, 44, 22)}${tri(52, 44, 22, fill)}${tri(32, 66, 22, fill)}${tri(52, 66, 22, fill)}`,
      `${chevron(24, 28, "right")}${tri(32, 44, 22)}${tri(52, 44, 22, fill)}${tri(32, 66, 22, fill)}${tri(52, 66, 22, fill)}`,
      `${chevron(60, 28, "right")}${tri(32, 44, 22, fill)}${tri(52, 44, 22, fill)}${tri(32, 66, 22, fill)}${tri(52, 66, 22, fill)}`,
      `${chevron(60, 28, "up")}${tri(32, 44, 22)}${tri(52, 44, 22)}${tri(32, 66, 22, fill)}${tri(52, 66, 22, fill)}`,
    ]),
    correctLabel: "A",
    tags: ["next-in-series", "sequence", original, solution("One additional triangle fills each step, moving from bottom-right to bottom-left to top-right to top-left. The chevron alternates side and rotates right, down, left, up, so the next is right again. The next cell has all four triangles filled with the chevron pointing right.")],
  },
  {
    category: "spatial", difficulty: 2,
    stem: `${svg(460, 110, [
      `${plus(48, 35)}${square(88, 35, 22)}${star(128, 35)}${circle(48, 75, 14)}${tri(88, 77, 28, fill)}${hex(128, 75, 16)}`,
      `${plus(48, 35)}${square(88, 35, 22)}${star(128, 35)}${circle(48, 75, 14)}${hex(88, 75, 16)}${tri(128, 77, 28, fill)}`,
      `${plus(48, 35)}${star(88, 35)}${square(128, 35, 22)}${circle(48, 75, 14)}${tri(88, 77, 28, fill)}${hex(128, 75, 16)}`,
      `${plus(48, 35)}${square(88, 35, 22)}${star(128, 35)}${circle(48, 75, 14, fill)}${tri(88, 77, 28, fill)}${hex(128, 75, 16)}`,
      `${star(48, 35)}${square(88, 35, 22)}${plus(128, 35)}${hex(48, 75, 16)}${tri(88, 77, 28, fill)}${circle(128, 75, 14)}`,
    ].map((c, i) => `<g transform="translate(${i * 90},0)">${box(10, 8)}${c}<text x="46" y="104" text-anchor="middle" font-size="18" font-weight="700">${String.fromCharCode(65 + i)}</text></g>`).join(""))}<br/>Which figure does not belong?`,
    options: [{ label: "A", text: "A" }, { label: "B", text: "B" }, { label: "C", text: "C" }, { label: "D", text: "D" }, { label: "E", text: "E" }],
    correctLabel: "E",
    tags: ["odd-one-out", original, solution("A through D keep the plus in the top-left and the triangle in the bottom-middle. E moves the plus and swaps the outside bottom shapes, so it breaks the shared layout.")],
  },
  {
    category: "spatial", difficulty: 2,
    stem: `${svg(470, 102, [
      nested("square", "hex", "circle", 48, 46),
      nested("square", "hex", "circle", 138, 46),
      nested("square", "hex", "circle", 228, 46),
      nested("hex", "square", "circle", 318, 46),
      nested("square", "hex", "circle", 408, 46),
    ].map((c, i) => `<g>${c}<text x="${48 + i * 90}" y="96" text-anchor="middle" font-size="18" font-weight="700">${String.fromCharCode(65 + i)}</text></g>`).join(""))}<br/>Which figure does not belong?`,
    options: [{ label: "A", text: "A" }, { label: "B", text: "B" }, { label: "C", text: "C" }, { label: "D", text: "D" }, { label: "E", text: "E" }],
    correctLabel: "D",
    tags: ["odd-one-out", original, solution("A, B, C, and E have square outside, hexagon middle, circle inside. D swaps the outer and middle shapes, so it does not match the nesting order.")],
  },
];
