type QuestionData = {
  category: "verbal" | "math_logic" | "spatial";
  difficulty: number;
  stem: string;
  options: { label: string; text: string }[];
  correctLabel: string;
  tags: string[];
};

const stroke = "#202938";
const light = "#cbd5e1";
const dark = "#111827";

function svg(w: number, h: number, content: string) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">${content}</svg>`;
}

function frame(x: number, y: number, w = 68, h = 68) {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="4" fill="#fff" stroke="#d7dee8" stroke-width="1.5"/>`;
}

function grid3() {
  return `<rect x="0" y="0" width="240" height="240" fill="#fff" stroke="#d7dee8"/>
  <line x1="80" y1="0" x2="80" y2="240" stroke="#d7dee8"/><line x1="160" y1="0" x2="160" y2="240" stroke="#d7dee8"/>
  <line x1="0" y1="80" x2="240" y2="80" stroke="#d7dee8"/><line x1="0" y1="160" x2="240" y2="160" stroke="#d7dee8"/>`;
}

function qmark(cx: number, cy: number) {
  return `<text x="${cx}" y="${cy}" text-anchor="middle" dominant-baseline="middle" font-size="28" font-weight="700" fill="#94a3b8">?</text>`;
}

function label(n: number, x: number) {
  return `<text x="${x}" y="16" text-anchor="middle" font-size="12" font-weight="700" fill="#64748b">${n}</text>`;
}

function circle(cx: number, cy: number, r: number, fill = "none") {
  return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" stroke="${stroke}" stroke-width="2.3"/>`;
}

function rect(cx: number, cy: number, size: number, fill = "none", rot = 0) {
  const x = cx - size / 2;
  const y = cy - size / 2;
  return `<rect x="${x}" y="${y}" width="${size}" height="${size}" fill="${fill}" stroke="${stroke}" stroke-width="2.3" transform="rotate(${rot},${cx},${cy})"/>`;
}

function triangle(cx: number, cy: number, size: number, fill = "none", rot = 0) {
  const h = size * 0.866;
  const pts = `${cx},${cy - h / 2} ${cx - size / 2},${cy + h / 2} ${cx + size / 2},${cy + h / 2}`;
  return `<polygon points="${pts}" fill="${fill}" stroke="${stroke}" stroke-width="2.3" transform="rotate(${rot},${cx},${cy})"/>`;
}

function diamond(cx: number, cy: number, size: number, fill = "none") {
  return `<polygon points="${cx},${cy - size / 2} ${cx + size / 2},${cy} ${cx},${cy + size / 2} ${cx - size / 2},${cy}" fill="${fill}" stroke="${stroke}" stroke-width="2.3"/>`;
}

function polygon(cx: number, cy: number, sides: number, r: number, fill = "none", rot = -90) {
  const points = Array.from({ length: sides }, (_, i) => {
    const angle = ((i * 360) / sides + rot) * Math.PI / 180;
    return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`;
  }).join(" ");
  return `<polygon points="${points}" fill="${fill}" stroke="${stroke}" stroke-width="2.3"/>`;
}

function arrow(cx: number, cy: number, rot: number, fill = "none") {
  return `<g transform="rotate(${rot},${cx},${cy})"><path d="M ${cx} ${cy - 24} L ${cx + 14} ${cy - 6} H ${cx + 6} V ${cy + 24} H ${cx - 6} V ${cy - 6} H ${cx - 14} Z" fill="${fill}" stroke="${stroke}" stroke-width="2.3"/></g>`;
}

function slashBox(cx: number, cy: number, rot: number, fill = "none") {
  return `<g transform="rotate(${rot},${cx},${cy})">${rect(cx, cy, 42, fill)}<line x1="${cx - 16}" y1="${cy + 16}" x2="${cx + 16}" y2="${cy - 16}" stroke="${stroke}" stroke-width="2.3"/></g>`;
}

function card(content: string) {
  return svg(72, 72, `${frame(2, 2)}${content}`);
}

function seriesStem(cells: string[]) {
  const xs = [42, 122, 202, 282, 362];
  return `${svg(410, 84, cells.map((cell, i) => `${frame(xs[i] - 34, 8)}${cell}`).join(""))}<br/>Which figure completes the series?`;
}

function matrixStem(cells: string[]) {
  const centers = [
    [40, 40], [120, 40], [200, 40],
    [40, 120], [120, 120], [200, 120],
    [40, 200], [120, 200], [200, 200],
  ];
  return `${svg(240, 240, `${grid3()}${cells.map((cell, i) => cell.replaceAll("$x", String(centers[i][0])).replaceAll("$y", String(centers[i][1]))).join("")}`)}<br/>Which figure completes the matrix?`;
}

function oddStem(cells: string[]) {
  const xs = [42, 122, 202, 282, 362];
  return `${svg(410, 92, cells.map((cell, i) => `${label(i + 1, xs[i])}${frame(xs[i] - 34, 18)}${cell}`).join(""))}<br/>Which figure is the odd one out?`;
}

const figureOptions = [
  { label: "A", text: "Figure 1" },
  { label: "B", text: "Figure 2" },
  { label: "C", text: "Figure 3" },
  { label: "D", text: "Figure 4" },
  { label: "E", text: "Figure 5" },
];

export const ccatSpatialQuestions: QuestionData[] = [
  {
    category: "spatial", difficulty: 2,
    stem: seriesStem([arrow(42, 42, 0), arrow(122, 42, 90), arrow(202, 42, 180), arrow(282, 42, 270), qmark(362, 42)]),
    options: [
      { label: "A", text: card(arrow(36, 36, 270)) },
      { label: "B", text: card(arrow(36, 36, 180)) },
      { label: "C", text: card(arrow(36, 36, 0)) },
      { label: "D", text: card(arrow(36, 36, 90)) },
      { label: "E", text: card(rect(36, 36, 38)) },
    ],
    correctLabel: "C", tags: ["next-in-series", "rotation"],
  },
  {
    category: "spatial", difficulty: 2,
    stem: seriesStem([triangle(42, 42, 44), polygon(122, 42, 4, 24), polygon(202, 42, 5, 24), polygon(282, 42, 6, 24), qmark(362, 42)]),
    options: [
      { label: "A", text: card(polygon(36, 36, 6, 24)) },
      { label: "B", text: card(polygon(36, 36, 7, 24)) },
      { label: "C", text: card(circle(36, 36, 22)) },
      { label: "D", text: card(polygon(36, 36, 5, 24)) },
      { label: "E", text: card(triangle(36, 36, 44)) },
    ],
    correctLabel: "B", tags: ["next-in-series", "sequence"],
  },
  {
    category: "spatial", difficulty: 2,
    stem: seriesStem([rect(42, 42, 42), rect(122, 42, 42, dark), rect(202, 42, 42), rect(282, 42, 42, dark), qmark(362, 42)]),
    options: [
      { label: "A", text: card(rect(36, 36, 42, dark)) },
      { label: "B", text: card(circle(36, 36, 21)) },
      { label: "C", text: card(rect(36, 36, 42)) },
      { label: "D", text: card(diamond(36, 36, 42)) },
      { label: "E", text: card(rect(36, 36, 30)) },
    ],
    correctLabel: "C", tags: ["next-in-series", "sequence"],
  },
  {
    category: "spatial", difficulty: 2,
    stem: seriesStem([`${circle(42, 42, 25)}${rect(42, 42, 16, dark)}`, `${rect(122, 42, 46)}${circle(122, 42, 9, dark)}`, `${circle(202, 42, 25)}${rect(202, 42, 16, dark)}`, `${rect(282, 42, 46)}${circle(282, 42, 9, dark)}`, qmark(362, 42)]),
    options: [
      { label: "A", text: card(`${rect(36, 36, 46)}${circle(36, 36, 9, dark)}`) },
      { label: "B", text: card(`${circle(36, 36, 25)}${rect(36, 36, 16, dark)}`) },
      { label: "C", text: card(`${triangle(36, 36, 44)}${circle(36, 36, 9, dark)}`) },
      { label: "D", text: card(`${rect(36, 36, 46, dark)}${circle(36, 36, 9)}`) },
      { label: "E", text: card(`${circle(36, 36, 25)}${circle(36, 36, 9, dark)}`) },
    ],
    correctLabel: "B", tags: ["next-in-series", "sequence"],
  },
  {
    category: "spatial", difficulty: 2,
    stem: seriesStem([`${rect(42, 42, 48)}<circle cx="28" cy="28" r="5" fill="${dark}"/>`, `${rect(122, 42, 48)}<circle cx="136" cy="28" r="5" fill="${dark}"/>`, `${rect(202, 42, 48)}<circle cx="216" cy="56" r="5" fill="${dark}"/>`, `${rect(282, 42, 48)}<circle cx="268" cy="56" r="5" fill="${dark}"/>`, qmark(362, 42)]),
    options: [
      { label: "A", text: card(`${rect(36, 36, 48)}<circle cx="22" cy="22" r="5" fill="${dark}"/>`) },
      { label: "B", text: card(`${rect(36, 36, 48)}<circle cx="50" cy="22" r="5" fill="${dark}"/>`) },
      { label: "C", text: card(`${rect(36, 36, 48)}<circle cx="50" cy="50" r="5" fill="${dark}"/>`) },
      { label: "D", text: card(`${rect(36, 36, 48)}<circle cx="22" cy="50" r="5" fill="${dark}"/>`) },
      { label: "E", text: card(rect(36, 36, 48)) },
    ],
    correctLabel: "A", tags: ["next-in-series", "sequence"],
  },
  {
    category: "spatial", difficulty: 3,
    stem: seriesStem([slashBox(42, 42, 0), slashBox(122, 42, 45, light), slashBox(202, 42, 90), slashBox(282, 42, 135, light), qmark(362, 42)]),
    options: [
      { label: "A", text: card(slashBox(36, 36, 180)) },
      { label: "B", text: card(slashBox(36, 36, 135, light)) },
      { label: "C", text: card(slashBox(36, 36, 90)) },
      { label: "D", text: card(slashBox(36, 36, 180, light)) },
      { label: "E", text: card(rect(36, 36, 42)) },
    ],
    correctLabel: "A", tags: ["next-in-series", "rotation"],
  },
  {
    category: "spatial", difficulty: 3,
    stem: seriesStem([`${circle(42, 42, 25)}${triangle(42, 42, 26, dark, 0)}`, `${circle(122, 42, 25)}${triangle(122, 42, 26, dark, 90)}`, `${circle(202, 42, 25)}${triangle(202, 42, 26, dark, 180)}`, `${circle(282, 42, 25)}${triangle(282, 42, 26, dark, 270)}`, qmark(362, 42)]),
    options: [
      { label: "A", text: card(`${circle(36, 36, 25)}${triangle(36, 36, 26, dark, 90)}`) },
      { label: "B", text: card(`${circle(36, 36, 25)}${triangle(36, 36, 26, dark, 0)}`) },
      { label: "C", text: card(`${circle(36, 36, 25)}${triangle(36, 36, 26, dark, 180)}`) },
      { label: "D", text: card(`${circle(36, 36, 25)}${triangle(36, 36, 26, dark, 270)}`) },
      { label: "E", text: card(`${rect(36, 36, 44)}${triangle(36, 36, 26, dark)}`) },
    ],
    correctLabel: "B", tags: ["next-in-series", "rotation"],
  },
  {
    category: "spatial", difficulty: 3,
    stem: seriesStem([`${rect(42, 42, 46)}<circle cx="42" cy="24" r="5" fill="${dark}"/><circle cx="42" cy="60" r="5" fill="${dark}"/>`, `${rect(122, 42, 46)}<circle cx="104" cy="42" r="5" fill="${dark}"/><circle cx="140" cy="42" r="5" fill="${dark}"/>`, `${rect(202, 42, 46)}<circle cx="202" cy="24" r="5" fill="${dark}"/><circle cx="202" cy="60" r="5" fill="${dark}"/>`, `${rect(282, 42, 46)}<circle cx="264" cy="42" r="5" fill="${dark}"/><circle cx="300" cy="42" r="5" fill="${dark}"/>`, qmark(362, 42)]),
    options: [
      { label: "A", text: card(`${rect(36, 36, 46)}<circle cx="18" cy="36" r="5" fill="${dark}"/><circle cx="54" cy="36" r="5" fill="${dark}"/>`) },
      { label: "B", text: card(`${rect(36, 36, 46)}<circle cx="36" cy="18" r="5" fill="${dark}"/><circle cx="36" cy="54" r="5" fill="${dark}"/>`) },
      { label: "C", text: card(`${rect(36, 36, 46)}<circle cx="18" cy="18" r="5" fill="${dark}"/><circle cx="54" cy="54" r="5" fill="${dark}"/>`) },
      { label: "D", text: card(`${rect(36, 36, 46)}<circle cx="36" cy="36" r="5" fill="${dark}"/>`) },
      { label: "E", text: card(rect(36, 36, 46, dark)) },
    ],
    correctLabel: "B", tags: ["next-in-series", "sequence"],
  },
  {
    category: "spatial", difficulty: 3,
    stem: matrixStem([circle("$x" as unknown as number, "$y" as unknown as number, 22), circle("$x" as unknown as number, "$y" as unknown as number, 22, light), circle("$x" as unknown as number, "$y" as unknown as number, 22, dark), rect("$x" as unknown as number, "$y" as unknown as number, 42), rect("$x" as unknown as number, "$y" as unknown as number, 42, light), rect("$x" as unknown as number, "$y" as unknown as number, 42, dark), triangle("$x" as unknown as number, "$y" as unknown as number, 44), triangle("$x" as unknown as number, "$y" as unknown as number, 44, light), qmark(200, 200)]),
    options: [
      { label: "A", text: card(triangle(36, 36, 44, light)) },
      { label: "B", text: card(triangle(36, 36, 44, dark)) },
      { label: "C", text: card(rect(36, 36, 42, dark)) },
      { label: "D", text: card(circle(36, 36, 22, dark)) },
      { label: "E", text: card(triangle(36, 36, 44)) },
    ],
    correctLabel: "B", tags: ["matrix"],
  },
  {
    category: "spatial", difficulty: 3,
    stem: matrixStem([triangle("$x" as unknown as number, "$y" as unknown as number, 42), polygon("$x" as unknown as number, "$y" as unknown as number, 4, 23), polygon("$x" as unknown as number, "$y" as unknown as number, 5, 23), triangle("$x" as unknown as number, "$y" as unknown as number, 42, light), polygon("$x" as unknown as number, "$y" as unknown as number, 4, 23, light), polygon("$x" as unknown as number, "$y" as unknown as number, 5, 23, light), triangle("$x" as unknown as number, "$y" as unknown as number, 42, dark), qmark(120, 200), polygon("$x" as unknown as number, "$y" as unknown as number, 5, 23, dark)]),
    options: [
      { label: "A", text: card(polygon(36, 36, 4, 23, light)) },
      { label: "B", text: card(polygon(36, 36, 4, 23)) },
      { label: "C", text: card(polygon(36, 36, 4, 23, dark)) },
      { label: "D", text: card(triangle(36, 36, 42, dark)) },
      { label: "E", text: card(polygon(36, 36, 5, 23, dark)) },
    ],
    correctLabel: "C", tags: ["matrix"],
  },
  {
    category: "spatial", difficulty: 3,
    stem: matrixStem([`${circle("$x" as unknown as number, "$y" as unknown as number, 23)}<circle cx="$x" cy="$y" r="6" fill="${dark}"/>`, rect("$x" as unknown as number, "$y" as unknown as number, 44), `${circle("$x" as unknown as number, "$y" as unknown as number, 23)}${rect("$x" as unknown as number, "$y" as unknown as number, 16, dark)}`, `${rect("$x" as unknown as number, "$y" as unknown as number, 44)}<circle cx="$x" cy="$y" r="6" fill="${dark}"/>`, triangle("$x" as unknown as number, "$y" as unknown as number, 44), `${rect("$x" as unknown as number, "$y" as unknown as number, 44)}${triangle("$x" as unknown as number, "$y" as unknown as number, 18, dark)}`, `${diamond("$x" as unknown as number, "$y" as unknown as number, 44)}<circle cx="$x" cy="$y" r="6" fill="${dark}"/>`, polygon("$x" as unknown as number, "$y" as unknown as number, 5, 23), qmark(200, 200)]),
    options: [
      { label: "A", text: card(`${diamond(36, 36, 44)}${polygon(36, 36, 5, 12, dark)}`) },
      { label: "B", text: card(`${polygon(36, 36, 5, 23)}${diamond(36, 36, 18, dark)}`) },
      { label: "C", text: card(`${diamond(36, 36, 44)}<circle cx="36" cy="36" r="6" fill="${dark}"/>`) },
      { label: "D", text: card(polygon(36, 36, 5, 23)) },
      { label: "E", text: card(`${circle(36, 36, 23)}${polygon(36, 36, 5, 12, dark)}`) },
    ],
    correctLabel: "A", tags: ["matrix"],
  },
  {
    category: "spatial", difficulty: 2,
    stem: oddStem([circle(42, 54, 22), circle(122, 54, 22, light), circle(202, 54, 22, dark), rect(282, 54, 42), circle(362, 54, 22)]),
    options: figureOptions,
    correctLabel: "D", tags: ["odd-one-out"],
  },
  {
    category: "spatial", difficulty: 2,
    stem: oddStem([`${rect(42, 54, 42)}${circle(42, 54, 7, dark)}`, `${triangle(122, 54, 44)}${circle(122, 54, 7, dark)}`, `${diamond(202, 54, 44)}${circle(202, 54, 7, dark)}`, `${polygon(282, 54, 5, 23)}${rect(282, 54, 12, dark)}`, `${circle(362, 54, 22)}${circle(362, 54, 7, dark)}`]),
    options: figureOptions,
    correctLabel: "D", tags: ["odd-one-out"],
  },
  {
    category: "spatial", difficulty: 3,
    stem: oddStem([slashBox(42, 54, 0), slashBox(122, 54, 90), slashBox(202, 54, 180), slashBox(282, 54, 270), slashBox(362, 54, 0, light)]),
    options: figureOptions,
    correctLabel: "E", tags: ["odd-one-out", "rotation"],
  },
  {
    category: "spatial", difficulty: 3,
    stem: oddStem([`${rect(42, 54, 44)}<circle cx="28" cy="40" r="5" fill="${dark}"/>`, `${rect(122, 54, 44)}<circle cx="136" cy="40" r="5" fill="${dark}"/>`, `${rect(202, 54, 44)}<circle cx="216" cy="68" r="5" fill="${dark}"/>`, `${rect(282, 54, 44)}<circle cx="268" cy="68" r="5" fill="${dark}"/>`, `${rect(362, 54, 44)}<circle cx="362" cy="54" r="5" fill="${dark}"/>`]),
    options: figureOptions,
    correctLabel: "E", tags: ["odd-one-out"],
  },
];
