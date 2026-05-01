type QuestionData = {
  category: "verbal" | "math_logic" | "spatial";
  difficulty: number;
  stem: string;
  options: { label: string; text: string }[];
  correctLabel: string;
  tags: string[];
};

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

export const spatialQuestions4: QuestionData[] = [
  // ═══════════════════════════════════════════════════════════════════════════
  // NEXT-IN-SERIES (30)
  // ═══════════════════════════════════════════════════════════════════════════

  // 1 – Squares growing in size
  { category: "spatial", difficulty: 1,
    stem: svg(400,80,`${S.rect(20,30,10,10)}${S.rect(85,25,20,20)}${S.rect(145,18,30,30)}${S.rect(205,10,40,40)}${qm(320,35)}`)+`<br/>What comes next?`,
    options:[
      {label:"A",text:svg(60,60,S.rect(5,5,50,50))},
      {label:"B",text:svg(60,60,S.rect(10,10,40,40))},
      {label:"C",text:svg(60,60,S.rect(15,15,30,30))},
      {label:"D",text:svg(60,60,S.circle(30,30,25))},
      {label:"E",text:svg(60,60,S.rect(20,20,20,20))},
    ], correctLabel:"A", tags:["sequence"] },

  // 2 – Triangles alternating fill
  { category: "spatial", difficulty: 1,
    stem: svg(400,80,`${S.tri(40,40,30,"#333")}${S.tri(110,40,30)}${S.tri(180,40,30,"#333")}${S.tri(250,40,30)}${qm(330,40)}`)+`<br/>What comes next?`,
    options:[
      {label:"A",text:svg(60,60,S.tri(30,30,30))},
      {label:"B",text:svg(60,60,S.tri(30,30,30,"#333"))},
      {label:"C",text:svg(60,60,S.circle(30,30,15,"#333"))},
      {label:"D",text:svg(60,60,S.diamond(30,30,30,"#333"))},
      {label:"E",text:svg(60,60,S.rect(10,10,40,40,"#333"))},
    ], correctLabel:"B", tags:["sequence"] },

  // 3 – Dots increasing: 1, 2, 3, 4, ?
  { category: "spatial", difficulty: 1,
    stem: svg(400,80,`${S.dot(40,40)}${S.dot(100,30)}${S.dot(100,50)}${S.dot(160,25)}${S.dot(160,40)}${S.dot(160,55)}${S.dot(220,20)}${S.dot(220,33)}${S.dot(220,46)}${S.dot(220,59)}${qm(310,40)}`)+`<br/>What comes next?`,
    options:[
      {label:"A",text:svg(60,60,`${S.dot(30,8)}${S.dot(30,21)}${S.dot(30,34)}${S.dot(30,47)}${S.dot(30,60)}`)},
      {label:"B",text:svg(60,60,`${S.dot(30,15)}${S.dot(30,30)}${S.dot(30,45)}${S.dot(30,60)}`)},
      {label:"C",text:svg(60,60,`${S.dot(20,30)}${S.dot(40,30)}${S.dot(30,15)}`)},
      {label:"D",text:svg(60,60,S.circle(30,30,20,"#333"))},
      {label:"E",text:svg(60,60,`${S.dot(15,15)}${S.dot(45,15)}${S.dot(15,45)}${S.dot(45,45)}${S.dot(30,30)}${S.dot(30,55)}`)},
    ], correctLabel:"A", tags:["sequence"] },

  // 4 – Arrow rotating 90° clockwise
  { category: "spatial", difficulty: 1,
    stem: svg(400,80,`${S.arrow(40,40,0)}${S.arrow(120,40,90)}${S.arrow(200,40,180)}${S.arrow(280,40,270)}${qm(360,40)}`)+`<br/>What comes next?`,
    options:[
      {label:"A",text:svg(60,60,S.arrow(30,30,0))},
      {label:"B",text:svg(60,60,S.arrow(30,30,90))},
      {label:"C",text:svg(60,60,S.arrow(30,30,180))},
      {label:"D",text:svg(60,60,S.arrow(30,30,270))},
      {label:"E",text:svg(60,60,S.arrow(30,30,45))},
    ], correctLabel:"A", tags:["sequence"] },

  // 5 – Shape progression: circle, square, triangle, circle, ?
  { category: "spatial", difficulty: 1,
    stem: svg(400,80,`${S.circle(40,40,18)}${S.rect(78,22,36,36)}${S.tri(150,40,36)}${S.circle(220,40,18)}${qm(310,40)}`)+`<br/>What comes next?`,
    options:[
      {label:"A",text:svg(60,60,S.circle(30,30,18))},
      {label:"B",text:svg(60,60,S.rect(12,12,36,36))},
      {label:"C",text:svg(60,60,S.tri(30,30,36))},
      {label:"D",text:svg(60,60,S.diamond(30,30,30))},
      {label:"E",text:svg(60,60,S.pentagon(30,30,18))},
    ], correctLabel:"B", tags:["sequence"] },

  // 6 – Hexagons with increasing dots inside
  { category: "spatial", difficulty: 2,
    stem: svg(400,80,`${S.hexagon(40,40,22)}${S.dot(40,40)}${S.hexagon(120,40,22)}${S.dot(112,40)}${S.dot(128,40)}${S.hexagon(200,40,22)}${S.dot(192,40)}${S.dot(200,32)}${S.dot(208,40)}${qm(310,40)}`)+`<br/>What comes next?`,
    options:[
      {label:"A",text:svg(60,60,`${S.hexagon(30,30,22)}${S.dot(22,30)}${S.dot(30,22)}${S.dot(38,30)}${S.dot(30,38)}`)},
      {label:"B",text:svg(60,60,`${S.hexagon(30,30,22)}${S.dot(22,30)}${S.dot(38,30)}`)},
      {label:"C",text:svg(60,60,`${S.hexagon(30,30,22)}${S.dot(30,30)}`)},
      {label:"D",text:svg(60,60,`${S.hexagon(30,30,22)}`)},
      {label:"E",text:svg(60,60,`${S.circle(30,30,22)}${S.dot(22,30)}${S.dot(30,22)}${S.dot(38,30)}${S.dot(30,38)}`)},
    ], correctLabel:"A", tags:["sequence"] },

  // 7 – Cross rotating 45° each step
  { category: "spatial", difficulty: 2,
    stem: svg(400,80,`<g transform="rotate(0,40,40)">${S.cross(40,40,15)}</g><g transform="rotate(45,120,40)">${S.cross(120,40,15)}</g><g transform="rotate(90,200,40)">${S.cross(200,40,15)}</g><g transform="rotate(135,280,40)">${S.cross(280,40,15)}</g>${qm(360,40)}`)+`<br/>What comes next?`,
    options:[
      {label:"A",text:svg(60,60,`<g transform="rotate(180,30,30)">${S.cross(30,30,15)}</g>`)},
      {label:"B",text:svg(60,60,`<g transform="rotate(90,30,30)">${S.cross(30,30,15)}</g>`)},
      {label:"C",text:svg(60,60,`<g transform="rotate(0,30,30)">${S.cross(30,30,15)}</g>`)},
      {label:"D",text:svg(60,60,`<g transform="rotate(225,30,30)">${S.cross(30,30,15)}</g>`)},
      {label:"E",text:svg(60,60,`<g transform="rotate(270,30,30)">${S.cross(30,30,15)}</g>`)},
    ], correctLabel:"A", tags:["sequence"] },

  // 8 – Circles with growing number of lines through center: 1, 2, 3, ?
  { category: "spatial", difficulty: 2,
    stem: svg(400,80,`${S.circle(50,40,20)}${S.line(50,20,50,60)}${S.circle(140,40,20)}${S.line(140,20,140,60)}${S.line(120,40,160,40)}${S.circle(230,40,20)}${S.line(230,20,230,60)}${S.line(210,40,250,40)}${S.line(216,26,244,54)}${qm(330,40)}`)+`<br/>What comes next?`,
    options:[
      {label:"A",text:svg(60,60,`${S.circle(30,30,20)}${S.line(30,10,30,50)}${S.line(10,30,50,30)}${S.line(16,16,44,44)}${S.line(44,16,16,44)}`)},
      {label:"B",text:svg(60,60,`${S.circle(30,30,20)}${S.line(30,10,30,50)}${S.line(10,30,50,30)}`)},
      {label:"C",text:svg(60,60,`${S.circle(30,30,20)}${S.line(30,10,30,50)}`)},
      {label:"D",text:svg(60,60,`${S.circle(30,30,20)}`)},
      {label:"E",text:svg(60,60,`${S.rect(10,10,40,40)}${S.line(30,10,30,50)}${S.line(10,30,50,30)}${S.line(10,10,50,50)}${S.line(50,10,10,50)}`)},
    ], correctLabel:"A", tags:["sequence"] },

  // 9 – Shapes: pentagon, hexagon, ?, (increasing sides)
  { category: "spatial", difficulty: 2,
    stem: svg(400,80,`${S.tri(40,40,30)}${S.rect(80,22,36,36)}${S.pentagon(170,40,20)}${S.hexagon(250,40,20)}${qm(340,40)}`)+`<br/>What comes next? (increasing number of sides)`,
    options:[
      {label:"A",text:"A shape with 7 sides (heptagon)"},
      {label:"B",text:svg(60,60,S.circle(30,30,20))},
      {label:"C",text:svg(60,60,S.pentagon(30,30,20))},
      {label:"D",text:svg(60,60,S.tri(30,30,30))},
      {label:"E",text:svg(60,60,S.star(30,30,20,10))},
    ], correctLabel:"A", tags:["sequence"] },

  // 10 – Rectangles alternating horizontal/vertical
  { category: "spatial", difficulty: 1,
    stem: svg(400,80,`${S.rect(15,25,40,20)}${S.rect(85,15,20,40)}${S.rect(135,25,40,20)}${S.rect(205,15,20,40)}${qm(300,35)}`)+`<br/>What comes next?`,
    options:[
      {label:"A",text:svg(60,60,S.rect(10,20,40,20))},
      {label:"B",text:svg(60,60,S.rect(20,10,20,40))},
      {label:"C",text:svg(60,60,S.rect(10,10,40,40))},
      {label:"D",text:svg(60,60,S.circle(30,30,20))},
      {label:"E",text:svg(60,60,S.diamond(30,30,30))},
    ], correctLabel:"A", tags:["sequence"] },

  // 11 – Stars: empty, filled, empty, filled, ?
  { category: "spatial", difficulty: 1,
    stem: svg(400,80,`${S.star(40,40,20,10)}${S.star(120,40,20,10,"#333")}${S.star(200,40,20,10)}${S.star(280,40,20,10,"#333")}${qm(360,40)}`)+`<br/>What comes next?`,
    options:[
      {label:"A",text:svg(60,60,S.star(30,30,20,10,"#333"))},
      {label:"B",text:svg(60,60,S.star(30,30,20,10))},
      {label:"C",text:svg(60,60,S.circle(30,30,18))},
      {label:"D",text:svg(60,60,S.star(30,30,25,12,"#333"))},
      {label:"E",text:svg(60,60,S.diamond(30,30,30,"#333"))},
    ], correctLabel:"B", tags:["sequence"] },

  // 12 – Circle + square: circle grows, square shrinks
  { category: "spatial", difficulty: 2,
    stem: svg(400,80,`${S.circle(40,40,8)}${S.rect(28,28,24,24)}${S.circle(120,40,12)}${S.rect(110,30,20,20)}${S.circle(200,40,16)}${S.rect(194,34,16,16)}${qm(310,40)}`)+`<br/>What comes next?`,
    options:[
      {label:"A",text:svg(60,60,`${S.circle(30,30,20)}${S.rect(24,24,12,12)}`)},
      {label:"B",text:svg(60,60,`${S.circle(30,30,12)}${S.rect(18,18,24,24)}`)},
      {label:"C",text:svg(60,60,`${S.circle(30,30,8)}${S.rect(22,22,16,16)}`)},
      {label:"D",text:svg(60,60,`${S.circle(30,30,20)}${S.rect(10,10,40,40)}`)},
      {label:"E",text:svg(60,60,`${S.circle(30,30,16)}${S.rect(22,22,16,16)}`)},
    ], correctLabel:"A", tags:["sequence"] },

  // 13 – Diamond rotating + color cycle: empty, gray, filled, empty...
  { category: "spatial", difficulty: 2,
    stem: svg(400,80,`${S.diamond(40,40,28)}${S.diamond(120,40,28,"#888")}${S.diamond(200,40,28,"#333")}${S.diamond(280,40,28)}${qm(360,40)}`)+`<br/>What comes next?`,
    options:[
      {label:"A",text:svg(60,60,S.diamond(30,30,28,"#888"))},
      {label:"B",text:svg(60,60,S.diamond(30,30,28,"#333"))},
      {label:"C",text:svg(60,60,S.diamond(30,30,28))},
      {label:"D",text:svg(60,60,S.circle(30,30,15,"#888"))},
      {label:"E",text:svg(60,60,S.tri(30,30,28,"#888"))},
    ], correctLabel:"A", tags:["sequence"] },

  // 14 – Nested shapes: 1 circle, 2 circles, 3 circles nested
  { category: "spatial", difficulty: 2,
    stem: svg(400,80,`${S.circle(50,40,18)}${S.circle(140,40,18)}${S.circle(140,40,10)}${S.circle(230,40,18)}${S.circle(230,40,12)}${S.circle(230,40,6)}${qm(340,40)}`)+`<br/>What comes next?`,
    options:[
      {label:"A",text:svg(60,60,`${S.circle(30,30,24)}${S.circle(30,30,17)}${S.circle(30,30,10)}${S.circle(30,30,4)}`)},
      {label:"B",text:svg(60,60,`${S.circle(30,30,18)}${S.circle(30,30,10)}`)},
      {label:"C",text:svg(60,60,`${S.circle(30,30,18)}`)},
      {label:"D",text:svg(60,60,`${S.rect(6,6,48,48)}${S.rect(12,12,36,36)}${S.rect(18,18,24,24)}${S.rect(24,24,12,12)}`)},
      {label:"E",text:svg(60,60,`${S.circle(30,30,24)}${S.circle(30,30,17)}${S.circle(30,30,10)}`)},
    ], correctLabel:"A", tags:["sequence"] },

  // 15 – Line segments increasing: 1, 2, 3, 4, ?
  { category: "spatial", difficulty: 1,
    stem: svg(400,80,`${S.line(30,60,30,20)}${S.line(100,60,100,20)}${S.line(115,60,115,20)}${S.line(170,60,170,20)}${S.line(185,60,185,20)}${S.line(200,60,200,20)}${S.line(240,60,240,20)}${S.line(255,60,255,20)}${S.line(270,60,270,20)}${S.line(285,60,285,20)}${qm(350,40)}`)+`<br/>What comes next?`,
    options:[
      {label:"A",text:svg(80,60,`${S.line(8,50,8,10)}${S.line(23,50,23,10)}${S.line(38,50,38,10)}${S.line(53,50,53,10)}${S.line(68,50,68,10)}`)},
      {label:"B",text:svg(80,60,`${S.line(10,50,10,10)}${S.line(25,50,25,10)}${S.line(40,50,40,10)}${S.line(55,50,55,10)}`)},
      {label:"C",text:svg(80,60,`${S.line(15,50,15,10)}${S.line(30,50,30,10)}${S.line(45,50,45,10)}`)},
      {label:"D",text:svg(80,60,`${S.line(20,50,20,10)}${S.line(40,50,40,10)}${S.line(60,50,60,10)}${S.line(20,50,60,50)}`)},
      {label:"E",text:svg(80,60,`${S.line(10,50,10,10)}${S.line(25,50,25,10)}${S.line(40,50,40,10)}${S.line(55,50,55,10)}${S.line(70,50,70,10)}${S.line(10,50,70,50)}`)},
    ], correctLabel:"A", tags:["sequence"] },

  // 16 – Arrow + shape: circle-up, square-right, triangle-down, circle-left, ?
  { category: "spatial", difficulty: 2,
    stem: svg(500,80,`${S.circle(30,40,14)}${S.arrow(30,40,0)}${S.rect(82,26,28,28)}${S.arrow(96,40,90)}${S.tri(170,40,28)}${S.arrow(170,40,180)}${S.circle(240,40,14)}${S.arrow(240,40,270)}${qm(340,40)}`)+`<br/>What comes next?`,
    options:[
      {label:"A",text:svg(60,60,`${S.rect(16,16,28,28)}${S.arrow(30,30,0)}`)},
      {label:"B",text:svg(60,60,`${S.rect(16,16,28,28)}${S.arrow(30,30,90)}`)},
      {label:"C",text:svg(60,60,`${S.tri(30,30,28)}${S.arrow(30,30,0)}`)},
      {label:"D",text:svg(60,60,`${S.circle(30,30,14)}${S.arrow(30,30,0)}`)},
      {label:"E",text:svg(60,60,`${S.rect(16,16,28,28)}${S.arrow(30,30,180)}`)},
    ], correctLabel:"A", tags:["sequence"] },

  // 17 – Growing L-shape: 1 block, 2-L, 3-L, ?
  { category: "spatial", difficulty: 2,
    stem: svg(400,80,`${S.rect(20,40,16,16,"#888")}${S.rect(90,24,16,16,"#888")}${S.rect(90,40,16,16,"#888")}${S.rect(160,8,16,16,"#888")}${S.rect(160,24,16,16,"#888")}${S.rect(160,40,16,16,"#888")}${qm(300,35)}`)+`<br/>What comes next?`,
    options:[
      {label:"A",text:svg(70,80,`${S.rect(10,4,16,16,"#888")}${S.rect(10,20,16,16,"#888")}${S.rect(10,36,16,16,"#888")}${S.rect(10,52,16,16,"#888")}`)},
      {label:"B",text:svg(70,80,`${S.rect(10,20,16,16,"#888")}${S.rect(10,36,16,16,"#888")}${S.rect(10,52,16,16,"#888")}`)},
      {label:"C",text:svg(70,80,`${S.rect(10,4,16,16,"#888")}${S.rect(10,20,16,16,"#888")}${S.rect(10,36,16,16,"#888")}${S.rect(10,52,16,16,"#888")}${S.rect(26,52,16,16,"#888")}`)},
      {label:"D",text:svg(70,80,`${S.rect(10,4,16,16)}${S.rect(10,20,16,16)}${S.rect(10,36,16,16)}${S.rect(10,52,16,16)}`)},
      {label:"E",text:svg(70,80,`${S.rect(10,20,16,16,"#888")}${S.rect(26,20,16,16,"#888")}${S.rect(10,36,16,16,"#888")}${S.rect(10,52,16,16,"#888")}`)},
    ], correctLabel:"A", tags:["sequence"] },

  // 18 – Diamond sizes decreasing
  { category: "spatial", difficulty: 1,
    stem: svg(400,80,`${S.diamond(50,40,40)}${S.diamond(130,40,32)}${S.diamond(200,40,24)}${S.diamond(260,40,16)}${qm(340,40)}`)+`<br/>What comes next?`,
    options:[
      {label:"A",text:svg(60,60,S.diamond(30,30,8))},
      {label:"B",text:svg(60,60,S.diamond(30,30,16))},
      {label:"C",text:svg(60,60,S.diamond(30,30,24))},
      {label:"D",text:svg(60,60,S.diamond(30,30,40))},
      {label:"E",text:svg(60,60,S.circle(30,30,4))},
    ], correctLabel:"A", tags:["sequence"] },

  // 19 – Circle with rotating dot (0°, 90°, 180°, ?)
  { category: "spatial", difficulty: 2,
    stem: svg(400,80,`${S.circle(50,40,20)}${S.dot(50,20)}${S.circle(140,40,20)}${S.dot(160,40)}${S.circle(230,40,20)}${S.dot(230,60)}${qm(340,40)}`)+`<br/>What comes next?`,
    options:[
      {label:"A",text:svg(60,60,`${S.circle(30,30,20)}${S.dot(10,30)}`)},
      {label:"B",text:svg(60,60,`${S.circle(30,30,20)}${S.dot(30,10)}`)},
      {label:"C",text:svg(60,60,`${S.circle(30,30,20)}${S.dot(50,30)}`)},
      {label:"D",text:svg(60,60,`${S.circle(30,30,20)}${S.dot(30,50)}`)},
      {label:"E",text:svg(60,60,`${S.circle(30,30,20)}${S.dot(30,30)}`)},
    ], correctLabel:"A", tags:["sequence"] },

  // 20 – Filled/empty alternating shapes: filled circle, empty square, filled triangle, empty diamond, ?
  { category: "spatial", difficulty: 2,
    stem: svg(450,80,`${S.circle(40,40,16,"#333")}${S.rect(78,24,32,32)}${S.tri(160,40,32,"#333")}${S.diamond(230,40,32)}${qm(330,40)}`)+`<br/>What comes next?`,
    options:[
      {label:"A",text:svg(60,60,S.pentagon(30,30,16,"#333"))},
      {label:"B",text:svg(60,60,S.pentagon(30,30,16))},
      {label:"C",text:svg(60,60,S.circle(30,30,16,"#333"))},
      {label:"D",text:svg(60,60,S.hexagon(30,30,16))},
      {label:"E",text:svg(60,60,S.star(30,30,16,8,"#333"))},
    ], correctLabel:"A", tags:["sequence"] },

  // 21 – Two arrows, both rotating 45° CW each step
  { category: "spatial", difficulty: 3,
    stem: svg(400,80,`${S.arrow(30,40,0)}${S.arrow(50,40,180)}${S.arrow(110,40,45)}${S.arrow(130,40,225)}${S.arrow(190,40,90)}${S.arrow(210,40,270)}${qm(320,40)}`)+`<br/>What comes next?`,
    options:[
      {label:"A",text:svg(60,60,`${S.arrow(20,30,135)}${S.arrow(40,30,315)}`)},
      {label:"B",text:svg(60,60,`${S.arrow(20,30,90)}${S.arrow(40,30,270)}`)},
      {label:"C",text:svg(60,60,`${S.arrow(20,30,180)}${S.arrow(40,30,0)}`)},
      {label:"D",text:svg(60,60,`${S.arrow(20,30,0)}${S.arrow(40,30,180)}`)},
      {label:"E",text:svg(60,60,`${S.arrow(20,30,45)}${S.arrow(40,30,225)}`)},
    ], correctLabel:"A", tags:["sequence"] },

  // 22 – Stacked shapes: circle alone, circle+square, circle+square+tri, ?
  { category: "spatial", difficulty: 2,
    stem: svg(400,100,`${S.circle(40,50,14)}${S.circle(120,60,14)}${S.rect(108,32,24,24)}${S.circle(220,70,14)}${S.rect(208,42,24,24)}${S.tri(220,25,24)}${qm(340,50)}`)+`<br/>What comes next?`,
    options:[
      {label:"A",text:svg(60,100,`${S.circle(30,80,14)}${S.rect(18,52,24,24)}${S.tri(30,35,24)}${S.diamond(30,12,18)}`)},
      {label:"B",text:svg(60,80,`${S.circle(30,60,14)}${S.rect(18,32,24,24)}`)},
      {label:"C",text:svg(60,80,`${S.circle(30,60,14)}${S.rect(18,32,24,24)}${S.tri(30,15,24)}${S.circle(30,5,6)}`)},
      {label:"D",text:svg(60,80,`${S.tri(30,40,40)}`)},
      {label:"E",text:svg(60,100,`${S.rect(10,70,40,20)}${S.rect(15,50,30,20)}${S.rect(20,30,20,20)}${S.rect(25,10,10,20)}`)},
    ], correctLabel:"A", tags:["sequence"] },

  // 23 – Checkerboard: 1×1, 2×2, 3×3, ? (4×4 pattern)
  { category: "spatial", difficulty: 3,
    stem: "A sequence of checkerboards: 1×1 (1 filled square), 2×2 (alternating), 3×3 (alternating). What is the number of filled squares in a 4×4 checkerboard?",
    options:[
      {label:"A",text:"6"},
      {label:"B",text:"7"},
      {label:"C",text:"8"},
      {label:"D",text:"9"},
      {label:"E",text:"10"},
    ], correctLabel:"C", tags:["sequence"] },

  // 24 – Hexagon + dot pattern: dot moves to next vertex
  { category: "spatial", difficulty: 3,
    stem: svg(400,80,`${S.hexagon(50,40,22)}${S.dot(50,18)}${S.hexagon(140,40,22)}${S.dot(159,29)}${S.hexagon(230,40,22)}${S.dot(249,40)}${qm(340,40)}`)+`<br/>What comes next? (dot moves clockwise around vertices)`,
    options:[
      {label:"A",text:svg(60,60,`${S.hexagon(30,30,22)}${S.dot(49,41)}`)},
      {label:"B",text:svg(60,60,`${S.hexagon(30,30,22)}${S.dot(30,52)}`)},
      {label:"C",text:svg(60,60,`${S.hexagon(30,30,22)}${S.dot(11,41)}`)},
      {label:"D",text:svg(60,60,`${S.hexagon(30,30,22)}${S.dot(30,8)}`)},
      {label:"E",text:svg(60,60,`${S.hexagon(30,30,22)}${S.dot(30,30)}`)},
    ], correctLabel:"A", tags:["sequence"] },

  // 25 – Square with corner dots: 1 corner, 2 corners, 3 corners, ?
  { category: "spatial", difficulty: 2,
    stem: svg(400,80,`${S.rect(15,15,40,40)}${S.dot(15,15)}${S.rect(85,15,40,40)}${S.dot(85,15)}${S.dot(125,15)}${S.rect(155,15,40,40)}${S.dot(155,15)}${S.dot(195,15)}${S.dot(195,55)}${qm(300,35)}`)+`<br/>What comes next?`,
    options:[
      {label:"A",text:svg(60,60,`${S.rect(5,5,50,50)}${S.dot(5,5)}${S.dot(55,5)}${S.dot(55,55)}${S.dot(5,55)}`)},
      {label:"B",text:svg(60,60,`${S.rect(5,5,50,50)}${S.dot(5,5)}${S.dot(55,5)}${S.dot(55,55)}`)},
      {label:"C",text:svg(60,60,`${S.rect(5,5,50,50)}${S.dot(5,5)}${S.dot(55,55)}`)},
      {label:"D",text:svg(60,60,`${S.rect(5,5,50,50)}`)},
      {label:"E",text:svg(60,60,`${S.circle(30,30,25)}${S.dot(5,30)}${S.dot(55,30)}${S.dot(30,5)}${S.dot(30,55)}`)},
    ], correctLabel:"A", tags:["sequence"] },

  // 26 – Triangle flipping: up, down, up, down, ?
  { category: "spatial", difficulty: 1,
    stem: svg(400,80,`${S.tri(40,40,30)}${S.tri(110,40,30,"none","#333")}${S.tri(180,40,30)}${S.tri(250,40,30,"none","#333")}${qm(330,40)}`)+`<br/>Pattern: up-triangle, down-triangle alternating.\nThe down-triangles are shown inverted. What comes next?`,
    options:[
      {label:"A",text:"Up-pointing triangle"},
      {label:"B",text:"Down-pointing triangle"},
      {label:"C",text:"Circle"},
      {label:"D",text:"Square"},
      {label:"E",text:"Diamond"},
    ], correctLabel:"A", tags:["sequence"] },

  // 27 – Concentric squares: 1, 2, 3, ?
  { category: "spatial", difficulty: 2,
    stem: svg(400,80,`${S.rect(20,20,30,30)}${S.rect(95,15,40,40)}${S.rect(101,21,28,28)}${S.rect(175,10,50,50)}${S.rect(183,18,34,34)}${S.rect(191,26,18,18)}${qm(320,35)}`)+`<br/>What comes next?`,
    options:[
      {label:"A",text:svg(70,70,`${S.rect(3,3,64,64)}${S.rect(12,12,46,46)}${S.rect(21,21,28,28)}${S.rect(29,29,12,12)}`)},
      {label:"B",text:svg(70,70,`${S.rect(10,10,50,50)}${S.rect(18,18,34,34)}${S.rect(26,26,18,18)}`)},
      {label:"C",text:svg(70,70,`${S.rect(10,10,50,50)}${S.rect(20,20,30,30)}`)},
      {label:"D",text:svg(70,70,`${S.circle(35,35,30)}${S.circle(35,35,22)}${S.circle(35,35,14)}${S.circle(35,35,6)}`)},
      {label:"E",text:svg(70,70,`${S.rect(5,5,60,60)}${S.rect(15,15,40,40)}${S.rect(25,25,20,20)}${S.rect(30,30,10,10)}${S.rect(33,33,4,4)}`)},
    ], correctLabel:"A", tags:["sequence"] },

  // 28 – Shapes with increasing line count inside
  { category: "spatial", difficulty: 3,
    stem: svg(400,80,`${S.rect(15,15,40,40)}${S.line(15,35,55,35)}${S.rect(85,15,40,40)}${S.line(85,27,125,27)}${S.line(85,42,125,42)}${S.rect(155,15,40,40)}${S.line(155,23,195,23)}${S.line(155,35,195,35)}${S.line(155,47,195,47)}${qm(280,35)}`)+`<br/>What comes next?`,
    options:[
      {label:"A",text:svg(60,60,`${S.rect(5,5,50,50)}${S.line(5,17,55,17)}${S.line(5,29,55,29)}${S.line(5,41,55,41)}${S.line(5,53,55,53)}`)},
      {label:"B",text:svg(60,60,`${S.rect(5,5,50,50)}${S.line(5,20,55,20)}${S.line(5,35,55,35)}${S.line(5,50,55,50)}`)},
      {label:"C",text:svg(60,60,`${S.rect(5,5,50,50)}${S.line(5,30,55,30)}`)},
      {label:"D",text:svg(60,60,`${S.circle(30,30,25)}${S.line(5,18,55,18)}${S.line(5,30,55,30)}${S.line(5,42,55,42)}${S.line(5,54,55,54)}`)},
      {label:"E",text:svg(60,60,`${S.rect(5,5,50,50)}${S.line(20,5,20,55)}${S.line(35,5,35,55)}${S.line(50,5,50,55)}${S.line(5,5,5,55)}`)},
    ], correctLabel:"A", tags:["sequence"] },

  // 29 – Circle + triangle alternating with size increase
  { category: "spatial", difficulty: 3,
    stem: svg(500,80,`${S.circle(30,40,8)}${S.tri(80,40,16)}${S.circle(130,40,12)}${S.tri(190,40,24)}${S.circle(250,40,16)}${qm(350,40)}`)+`<br/>What comes next?`,
    options:[
      {label:"A",text:svg(60,60,S.tri(30,30,32))},
      {label:"B",text:svg(60,60,S.circle(30,30,20))},
      {label:"C",text:svg(60,60,S.tri(30,30,24))},
      {label:"D",text:svg(60,60,S.diamond(30,30,32))},
      {label:"E",text:svg(60,60,S.circle(30,30,16))},
    ], correctLabel:"A", tags:["sequence"] },

  // 30 – Pentagon fill cycle: none, #888, #333, none, #888, ?
  { category: "spatial", difficulty: 2,
    stem: svg(500,80,`${S.pentagon(40,40,18)}${S.pentagon(110,40,18,"#888")}${S.pentagon(180,40,18,"#333")}${S.pentagon(250,40,18)}${S.pentagon(320,40,18,"#888")}${qm(400,40)}`)+`<br/>What comes next?`,
    options:[
      {label:"A",text:svg(60,60,S.pentagon(30,30,18,"#333"))},
      {label:"B",text:svg(60,60,S.pentagon(30,30,18,"#888"))},
      {label:"C",text:svg(60,60,S.pentagon(30,30,18))},
      {label:"D",text:svg(60,60,S.hexagon(30,30,18,"#333"))},
      {label:"E",text:svg(60,60,S.circle(30,30,18,"#333"))},
    ], correctLabel:"A", tags:["sequence"] },

  // ═══════════════════════════════════════════════════════════════════════════
  // ODD-ONE-OUT (20)
  // ═══════════════════════════════════════════════════════════════════════════

  // 31 – All circles except one square
  { category: "spatial", difficulty: 1,
    stem: "Which shape does not belong?",
    options:[
      {label:"A",text:svg(60,60,S.circle(30,30,18))},
      {label:"B",text:svg(60,60,S.circle(30,30,14))},
      {label:"C",text:svg(60,60,S.rect(12,12,36,36))},
      {label:"D",text:svg(60,60,S.circle(30,30,22))},
      {label:"E",text:svg(60,60,S.circle(30,30,10))},
    ], correctLabel:"C", tags:["odd-one-out"] },

  // 32 – All filled except one empty
  { category: "spatial", difficulty: 1,
    stem: "Which shape does not belong?",
    options:[
      {label:"A",text:svg(60,60,S.tri(30,30,30,"#333"))},
      {label:"B",text:svg(60,60,S.tri(30,30,30,"#333"))},
      {label:"C",text:svg(60,60,S.tri(30,30,30))},
      {label:"D",text:svg(60,60,S.tri(30,30,30,"#333"))},
      {label:"E",text:svg(60,60,S.tri(30,30,30,"#333"))},
    ], correctLabel:"C", tags:["odd-one-out"] },

  // 33 – All have even sides except triangle
  { category: "spatial", difficulty: 2,
    stem: "Which shape does not belong? (Consider the number of sides)",
    options:[
      {label:"A",text:svg(60,60,S.rect(12,12,36,36))},
      {label:"B",text:svg(60,60,S.hexagon(30,30,20))},
      {label:"C",text:svg(60,60,S.tri(30,30,30))},
      {label:"D",text:svg(60,60,S.diamond(30,30,30))},
      {label:"E",text:svg(60,60,S.rect(10,18,40,24))},
    ], correctLabel:"C", tags:["odd-one-out"] },

  // 34 – All symmetric around vertical axis except one
  { category: "spatial", difficulty: 2,
    stem: "Which figure does not have vertical symmetry?",
    options:[
      {label:"A",text:svg(60,60,S.circle(30,30,18))},
      {label:"B",text:svg(60,60,S.tri(30,30,30))},
      {label:"C",text:svg(60,60,`${S.rect(10,10,40,40)}${S.dot(20,20)}`)},
      {label:"D",text:svg(60,60,S.diamond(30,30,30))},
      {label:"E",text:svg(60,60,S.rect(15,10,30,40))},
    ], correctLabel:"C", tags:["odd-one-out"] },

  // 35 – All have one shape inside except one
  { category: "spatial", difficulty: 2,
    stem: "Which figure does not belong?",
    options:[
      {label:"A",text:svg(60,60,`${S.circle(30,30,22)}${S.dot(30,30)}`)},
      {label:"B",text:svg(60,60,`${S.rect(8,8,44,44)}${S.dot(30,30)}`)},
      {label:"C",text:svg(60,60,`${S.tri(30,30,40)}${S.dot(30,35)}`)},
      {label:"D",text:svg(60,60,`${S.diamond(30,30,36)}`)},
      {label:"E",text:svg(60,60,`${S.hexagon(30,30,22)}${S.dot(30,30)}`)},
    ], correctLabel:"D", tags:["odd-one-out"] },

  // 36 – All arrows point up except one
  { category: "spatial", difficulty: 1,
    stem: "Which arrow does not belong?",
    options:[
      {label:"A",text:svg(60,60,S.arrow(30,30,0))},
      {label:"B",text:svg(60,60,S.arrow(30,30,0))},
      {label:"C",text:svg(60,60,S.arrow(30,30,0))},
      {label:"D",text:svg(60,60,S.arrow(30,30,180))},
      {label:"E",text:svg(60,60,S.arrow(30,30,0))},
    ], correctLabel:"D", tags:["odd-one-out"] },

  // 37 – All have same number of shapes except one
  { category: "spatial", difficulty: 2,
    stem: "Which group does not belong?",
    options:[
      {label:"A",text:svg(60,60,`${S.circle(15,30,8)}${S.circle(35,30,8)}${S.circle(55,30,8)}`)},
      {label:"B",text:svg(60,60,`${S.rect(3,22,14,14)}${S.rect(23,22,14,14)}${S.rect(43,22,14,14)}`)},
      {label:"C",text:svg(60,60,`${S.tri(15,30,14)}${S.tri(35,30,14)}${S.tri(55,30,14)}`)},
      {label:"D",text:svg(60,60,`${S.diamond(15,30,14)}${S.diamond(45,30,14)}`)},
      {label:"E",text:svg(60,60,`${S.star(10,30,8,4)}${S.star(30,30,8,4)}${S.star(50,30,8,4)}`)},
    ], correctLabel:"D", tags:["odd-one-out"] },

  // 38 – All have curved edges except one
  { category: "spatial", difficulty: 1,
    stem: "Which shape does not have curved edges?",
    options:[
      {label:"A",text:svg(60,60,S.circle(30,30,18))},
      {label:"B",text:svg(60,60,S.circle(30,30,12))},
      {label:"C",text:svg(60,60,S.circle(30,30,22))},
      {label:"D",text:svg(60,60,S.hexagon(30,30,18))},
      {label:"E",text:svg(60,60,S.circle(30,30,8))},
    ], correctLabel:"D", tags:["odd-one-out"] },

  // 39 – All shapes have a cross inside except one has a dot
  { category: "spatial", difficulty: 2,
    stem: "Which figure does not belong?",
    options:[
      {label:"A",text:svg(60,60,`${S.rect(8,8,44,44)}${S.cross(30,30,12)}`)},
      {label:"B",text:svg(60,60,`${S.circle(30,30,22)}${S.cross(30,30,12)}`)},
      {label:"C",text:svg(60,60,`${S.tri(30,32,40)}${S.cross(30,36,10)}`)},
      {label:"D",text:svg(60,60,`${S.diamond(30,30,36)}${S.dot(30,30)}`)},
      {label:"E",text:svg(60,60,`${S.hexagon(30,30,22)}${S.cross(30,30,12)}`)},
    ], correctLabel:"D", tags:["odd-one-out"] },

  // 40 – All shading is #333 except one is #888
  { category: "spatial", difficulty: 1,
    stem: "Which shape does not belong?",
    options:[
      {label:"A",text:svg(60,60,S.rect(12,12,36,36,"#333"))},
      {label:"B",text:svg(60,60,S.circle(30,30,18,"#333"))},
      {label:"C",text:svg(60,60,S.tri(30,30,32,"#888"))},
      {label:"D",text:svg(60,60,S.diamond(30,30,30,"#333"))},
      {label:"E",text:svg(60,60,S.pentagon(30,30,16,"#333"))},
    ], correctLabel:"C", tags:["odd-one-out"] },

  // 41 – All have 2 shapes combined except one has 3
  { category: "spatial", difficulty: 2,
    stem: "Which figure does not belong?",
    options:[
      {label:"A",text:svg(60,60,`${S.circle(30,30,20)}${S.rect(22,22,16,16)}`)},
      {label:"B",text:svg(60,60,`${S.tri(30,30,36)}${S.circle(30,35,8)}`)},
      {label:"C",text:svg(60,60,`${S.rect(8,8,44,44)}${S.circle(30,30,12)}${S.dot(30,30)}`)},
      {label:"D",text:svg(60,60,`${S.hexagon(30,30,22)}${S.dot(30,30,6)}`)},
      {label:"E",text:svg(60,60,`${S.diamond(30,30,36)}${S.cross(30,30,8)}`)},
    ], correctLabel:"C", tags:["odd-one-out"] },

  // 42 – All rotations of same L-shape except one is mirrored
  { category: "spatial", difficulty: 3,
    stem: "Four of these L-shapes are rotations of the same piece. Which one is a mirror image?",
    options:[
      {label:"A",text:svg(60,60,`${S.rect(10,10,16,32,"#888")}${S.rect(26,26,16,16,"#888")}`)},
      {label:"B",text:svg(60,60,`${S.rect(10,10,32,16,"#888")}${S.rect(10,26,16,16,"#888")}`)},
      {label:"C",text:svg(60,60,`${S.rect(10,10,16,32,"#888")}${S.rect(26,10,16,16,"#888")}`)},
      {label:"D",text:svg(60,60,`${S.rect(18,10,32,16,"#888")}${S.rect(34,26,16,16,"#888")}`)},
      {label:"E",text:svg(60,60,`${S.rect(10,18,32,16,"#888")}${S.rect(10,34,16,16,"#888")}`)},
    ], correctLabel:"C", tags:["odd-one-out"] },

  // 43 – All have an odd number of sides except one
  { category: "spatial", difficulty: 2,
    stem: "Which shape does not belong? (Consider number of sides)",
    options:[
      {label:"A",text:svg(60,60,S.tri(30,30,30))},
      {label:"B",text:svg(60,60,S.pentagon(30,30,18))},
      {label:"C",text:svg(60,60,S.rect(12,12,36,36))},
      {label:"D",text:"A shape with 7 sides"},
      {label:"E",text:"A shape with 9 sides"},
    ], correctLabel:"C", tags:["odd-one-out"] },

  // 44 – All arrows point outward from center except one points inward
  { category: "spatial", difficulty: 2,
    stem: "Five arrows are arranged around a center point. Four point outward, one points inward. Which one?",
    options:[
      {label:"A",text:svg(60,60,S.arrow(30,10,0))},
      {label:"B",text:svg(60,60,S.arrow(50,30,90))},
      {label:"C",text:svg(60,60,S.arrow(30,50,180))},
      {label:"D",text:svg(60,60,S.arrow(10,30,0))},
      {label:"E",text:svg(60,60,S.arrow(10,30,270))},
    ], correctLabel:"D", tags:["odd-one-out"] },

  // 45 – All shapes contain exactly 2 dots except one
  { category: "spatial", difficulty: 2,
    stem: "Which figure does not belong?",
    options:[
      {label:"A",text:svg(60,60,`${S.circle(30,30,20)}${S.dot(22,30)}${S.dot(38,30)}`)},
      {label:"B",text:svg(60,60,`${S.rect(8,8,44,44)}${S.dot(20,30)}${S.dot(40,30)}`)},
      {label:"C",text:svg(60,60,`${S.tri(30,32,36)}${S.dot(24,38)}${S.dot(36,38)}`)},
      {label:"D",text:svg(60,60,`${S.hexagon(30,30,22)}${S.dot(22,30)}${S.dot(30,30)}${S.dot(38,30)}`)},
      {label:"E",text:svg(60,60,`${S.diamond(30,30,36)}${S.dot(24,30)}${S.dot(36,30)}`)},
    ], correctLabel:"D", tags:["odd-one-out"] },

  // 46 – All circles overlap except pair that doesn't
  { category: "spatial", difficulty: 3,
    stem: "Which pair of circles is different from the rest?",
    options:[
      {label:"A",text:svg(70,60,`${S.circle(22,30,16)}${S.circle(42,30,16)}`)},
      {label:"B",text:svg(70,60,`${S.circle(20,30,16)}${S.circle(44,30,16)}`)},
      {label:"C",text:svg(70,60,`${S.circle(24,30,16)}${S.circle(40,30,16)}`)},
      {label:"D",text:svg(70,60,`${S.circle(20,30,16)}${S.circle(50,30,16)}`)},
      {label:"E",text:svg(70,60,`${S.circle(22,30,16)}${S.circle(38,30,16)}`)},
    ], correctLabel:"D", tags:["odd-one-out"] },

  // 47 – All shapes are convex except one star
  { category: "spatial", difficulty: 2,
    stem: "Which shape is fundamentally different from the others?",
    options:[
      {label:"A",text:svg(60,60,S.circle(30,30,20))},
      {label:"B",text:svg(60,60,S.rect(10,10,40,40))},
      {label:"C",text:svg(60,60,S.star(30,30,22,10))},
      {label:"D",text:svg(60,60,S.hexagon(30,30,20))},
      {label:"E",text:svg(60,60,S.tri(30,30,36))},
    ], correctLabel:"C", tags:["odd-one-out"] },

  // 48 – Size: all same size except one is much bigger
  { category: "spatial", difficulty: 1,
    stem: "Which shape does not belong?",
    options:[
      {label:"A",text:svg(60,60,S.diamond(30,30,20))},
      {label:"B",text:svg(60,60,S.diamond(30,30,20))},
      {label:"C",text:svg(60,60,S.diamond(30,30,20))},
      {label:"D",text:svg(60,60,S.diamond(30,30,44))},
      {label:"E",text:svg(60,60,S.diamond(30,30,20))},
    ], correctLabel:"D", tags:["odd-one-out"] },

  // 49 – All have dashed outlines (simulated with dots) except one solid
  { category: "spatial", difficulty: 3,
    stem: "Four figures are made of small dots arranged in a circle pattern. One is a solid circle. Which is the odd one out?",
    options:[
      {label:"A",text:svg(60,60,`${S.dot(30,8)}${S.dot(45,15)}${S.dot(52,30)}${S.dot(45,45)}${S.dot(30,52)}${S.dot(15,45)}${S.dot(8,30)}${S.dot(15,15)}`)},
      {label:"B",text:svg(60,60,`${S.dot(30,6)}${S.dot(47,14)}${S.dot(54,30)}${S.dot(47,46)}${S.dot(30,54)}${S.dot(13,46)}${S.dot(6,30)}${S.dot(13,14)}`)},
      {label:"C",text:svg(60,60,S.circle(30,30,22,"#333"))},
      {label:"D",text:svg(60,60,`${S.dot(30,10)}${S.dot(44,16)}${S.dot(50,30)}${S.dot(44,44)}${S.dot(30,50)}${S.dot(16,44)}${S.dot(10,30)}${S.dot(16,16)}`)},
      {label:"E",text:svg(60,60,`${S.dot(30,7)}${S.dot(46,13)}${S.dot(53,30)}${S.dot(46,47)}${S.dot(30,53)}${S.dot(14,47)}${S.dot(7,30)}${S.dot(14,13)}`)},
    ], correctLabel:"C", tags:["odd-one-out"] },

  // 50 – All rectangles are taller than wide except one
  { category: "spatial", difficulty: 1,
    stem: "Which rectangle does not belong?",
    options:[
      {label:"A",text:svg(60,60,S.rect(18,8,24,44))},
      {label:"B",text:svg(60,60,S.rect(20,5,20,50))},
      {label:"C",text:svg(60,60,S.rect(8,18,44,24))},
      {label:"D",text:svg(60,60,S.rect(22,10,16,40))},
      {label:"E",text:svg(60,60,S.rect(16,6,28,48))},
    ], correctLabel:"C", tags:["odd-one-out"] },

  // ═══════════════════════════════════════════════════════════════════════════
  // MATRIX COMPLETION (20)
  // ═══════════════════════════════════════════════════════════════════════════

  // 51 – 2×2: shape changes across rows, fill changes down columns
  { category: "spatial", difficulty: 2,
    stem: svg(200,200,`${S.circle(50,50,20)}${S.rect(100,30,40,40)}${S.circle(50,150,20,"#333")}${qm(120,150)}`)+`<br/>Complete the 2×2 grid.`,
    options:[
      {label:"A",text:svg(60,60,S.rect(10,10,40,40,"#333"))},
      {label:"B",text:svg(60,60,S.rect(10,10,40,40))},
      {label:"C",text:svg(60,60,S.circle(30,30,20,"#333"))},
      {label:"D",text:svg(60,60,S.tri(30,30,30,"#333"))},
      {label:"E",text:svg(60,60,S.circle(30,30,20))},
    ], correctLabel:"A", tags:["matrix"] },

  // 52 – 2×2: size small→big across, shape circle→tri down
  { category: "spatial", difficulty: 2,
    stem: svg(200,200,`${S.circle(50,50,10)}${S.circle(150,50,22)}${S.tri(50,150,20)}${qm(150,150)}`)+`<br/>Complete the 2×2 grid.`,
    options:[
      {label:"A",text:svg(60,60,S.tri(30,30,40))},
      {label:"B",text:svg(60,60,S.tri(30,30,20))},
      {label:"C",text:svg(60,60,S.circle(30,30,22))},
      {label:"D",text:svg(60,60,S.rect(10,10,40,40))},
      {label:"E",text:svg(60,60,S.diamond(30,30,40))},
    ], correctLabel:"A", tags:["matrix"] },

  // 53 – 2×2: number of dots increases right, shape changes down
  { category: "spatial", difficulty: 2,
    stem: svg(200,200,`${S.circle(50,50,22)}${S.dot(50,50)}${S.circle(150,50,22)}${S.dot(142,50)}${S.dot(158,50)}${S.rect(28,128,44,44)}${S.dot(50,150)}${qm(150,150)}`)+`<br/>Complete the 2×2 grid.`,
    options:[
      {label:"A",text:svg(60,60,`${S.rect(8,8,44,44)}${S.dot(22,30)}${S.dot(38,30)}`)},
      {label:"B",text:svg(60,60,`${S.rect(8,8,44,44)}${S.dot(30,30)}`)},
      {label:"C",text:svg(60,60,`${S.circle(30,30,22)}${S.dot(22,30)}${S.dot(38,30)}`)},
      {label:"D",text:svg(60,60,`${S.rect(8,8,44,44)}${S.dot(20,30)}${S.dot(30,30)}${S.dot(40,30)}`)},
      {label:"E",text:svg(60,60,`${S.tri(30,30,40)}${S.dot(22,35)}${S.dot(38,35)}`)},
    ], correctLabel:"A", tags:["matrix"] },

  // 54 – 3×3: rows have circle, square, triangle; columns have empty, gray, filled
  { category: "spatial", difficulty: 3,
    stem: svg(250,250,`${S.circle(40,40,16)}${S.rect(100,24,32,32)}${S.tri(180,40,32)}${S.circle(40,120,16,"#888")}${S.rect(100,104,32,32,"#888")}${S.tri(180,120,32,"#888")}${S.circle(40,200,16,"#333")}${S.rect(100,184,32,32,"#333")}${qm(180,200)}`)+`<br/>Complete the 3×3 grid.`,
    options:[
      {label:"A",text:svg(60,60,S.tri(30,30,32,"#333"))},
      {label:"B",text:svg(60,60,S.tri(30,30,32,"#888"))},
      {label:"C",text:svg(60,60,S.tri(30,30,32))},
      {label:"D",text:svg(60,60,S.circle(30,30,16,"#333"))},
      {label:"E",text:svg(60,60,S.rect(14,14,32,32,"#333"))},
    ], correctLabel:"A", tags:["matrix"] },

  // 55 – 2×2: arrow direction + shape
  { category: "spatial", difficulty: 2,
    stem: svg(200,200,`${S.circle(50,50,20)}${S.arrow(50,50,0)}${S.circle(150,50,20)}${S.arrow(150,50,90)}${S.rect(28,128,44,44)}${S.arrow(50,150,0)}${qm(150,150)}`)+`<br/>Complete the grid. Shapes change down, arrows change across.`,
    options:[
      {label:"A",text:svg(60,60,`${S.rect(8,8,44,44)}${S.arrow(30,30,90)}`)},
      {label:"B",text:svg(60,60,`${S.rect(8,8,44,44)}${S.arrow(30,30,0)}`)},
      {label:"C",text:svg(60,60,`${S.circle(30,30,20)}${S.arrow(30,30,90)}`)},
      {label:"D",text:svg(60,60,`${S.rect(8,8,44,44)}${S.arrow(30,30,180)}`)},
      {label:"E",text:svg(60,60,`${S.tri(30,30,36)}${S.arrow(30,30,90)}`)},
    ], correctLabel:"A", tags:["matrix"] },

  // 56 – 2×2: stripe count increases across, shape changes down
  { category: "spatial", difficulty: 2,
    stem: svg(200,200,`${S.circle(50,50,22)}${S.line(50,28,50,72)}${S.circle(150,50,22)}${S.line(142,28,142,72)}${S.line(158,28,158,72)}${S.rect(28,128,44,44)}${S.line(50,128,50,172)}${qm(150,150)}`)+`<br/>Complete the 2×2 grid.`,
    options:[
      {label:"A",text:svg(60,60,`${S.rect(8,8,44,44)}${S.line(24,8,24,52)}${S.line(36,8,36,52)}`)},
      {label:"B",text:svg(60,60,`${S.rect(8,8,44,44)}${S.line(30,8,30,52)}`)},
      {label:"C",text:svg(60,60,`${S.circle(30,30,22)}${S.line(24,8,24,52)}${S.line(36,8,36,52)}`)},
      {label:"D",text:svg(60,60,`${S.rect(8,8,44,44)}${S.line(20,8,20,52)}${S.line(30,8,30,52)}${S.line(40,8,40,52)}`)},
      {label:"E",text:svg(60,60,`${S.tri(30,30,40)}${S.line(24,10,24,50)}${S.line(36,10,36,50)}`)},
    ], correctLabel:"A", tags:["matrix"] },

  // 57 – 3×3: each row has 3 different shapes, each col has 3 different fills
  { category: "spatial", difficulty: 3,
    stem: svg(250,250,`${S.circle(40,40,16)}${S.rect(100,24,32,32,"#888")}${S.tri(180,40,32,"#333")}${S.rect(18,104,32,32,"#333")}${S.tri(100,120,32)}${S.circle(180,120,16,"#888")}${S.tri(40,200,32,"#888")}${S.circle(120,200,16,"#333")}${qm(180,200)}`)+`<br/>Complete the 3×3 grid. Each row has 3 different shapes. Each column has 3 different fills.`,
    options:[
      {label:"A",text:svg(60,60,S.rect(14,14,32,32))},
      {label:"B",text:svg(60,60,S.rect(14,14,32,32,"#888"))},
      {label:"C",text:svg(60,60,S.rect(14,14,32,32,"#333"))},
      {label:"D",text:svg(60,60,S.circle(30,30,16))},
      {label:"E",text:svg(60,60,S.tri(30,30,32))},
    ], correctLabel:"A", tags:["matrix"] },

  // 58 – 2×2: rotation pattern
  { category: "spatial", difficulty: 2,
    stem: svg(200,200,`<g transform="rotate(0,50,50)">${S.tri(50,50,30)}</g><g transform="rotate(90,150,50)">${S.tri(150,50,30)}</g><g transform="rotate(180,50,150)">${S.tri(50,150,30)}</g>${qm(150,150)}`)+`<br/>Each cell rotates 90° clockwise. What goes in the missing cell?`,
    options:[
      {label:"A",text:svg(60,60,`<g transform="rotate(270,30,30)">${S.tri(30,30,30)}</g>`)},
      {label:"B",text:svg(60,60,`<g transform="rotate(180,30,30)">${S.tri(30,30,30)}</g>`)},
      {label:"C",text:svg(60,60,`<g transform="rotate(90,30,30)">${S.tri(30,30,30)}</g>`)},
      {label:"D",text:svg(60,60,`<g transform="rotate(0,30,30)">${S.tri(30,30,30)}</g>`)},
      {label:"E",text:svg(60,60,S.circle(30,30,15))},
    ], correctLabel:"A", tags:["matrix"] },

  // 59 – 2×2: shapes combine (union)
  { category: "spatial", difficulty: 3,
    stem: svg(200,200,`${S.circle(50,50,18)}${S.circle(50,50,8,"#333")}${S.rect(130,32,40,40)}${S.rect(140,42,20,20,"#333")}${S.tri(50,150,36)}${S.tri(50,150,18,"#333")}${qm(150,150)}`)+`<br/>Pattern: each cell has a large shape with a smaller filled version inside. What completes the grid?`,
    options:[
      {label:"A",text:svg(60,60,`${S.diamond(30,30,36)}${S.diamond(30,30,18,"#333")}`)},
      {label:"B",text:svg(60,60,`${S.hexagon(30,30,22)}${S.hexagon(30,30,12,"#333")}`)},
      {label:"C",text:svg(60,60,`${S.rect(8,8,44,44)}${S.circle(30,30,10,"#333")}`)},
      {label:"D",text:svg(60,60,`${S.diamond(30,30,36)}`)},
      {label:"E",text:svg(60,60,`${S.diamond(30,30,18,"#333")}`)},
    ], correctLabel:"A", tags:["matrix"] },

  // 60 – 3×3: dot count pattern (row sums = 6)
  { category: "spatial", difficulty: 3,
    stem: "In a 3×3 grid, each row's dot counts sum to 6.\nRow 1: 1, 2, 3\nRow 2: 3, 1, 2\nRow 3: 2, 3, ?\nWhat number fills the missing cell?",
    options:[
      {label:"A",text:"1"},
      {label:"B",text:"2"},
      {label:"C",text:"3"},
      {label:"D",text:"4"},
      {label:"E",text:"0"},
    ], correctLabel:"A", tags:["matrix"] },

  // 61 – 2×2 with nested shapes and rotation
  { category: "spatial", difficulty: 3,
    stem: svg(200,200,`${S.rect(28,28,44,44)}${S.circle(50,50,10)}${S.circle(128,28,22)}${S.rect(140,42,20,16)}${S.diamond(50,150,36)}${S.tri(50,150,16)}${qm(150,150)}`)+`<br/>Each cell: outer shape with different inner shape. Row 1: square→circle (outer), circle→rect (inner). Row 2: diamond→?, tri→? Complete it.`,
    options:[
      {label:"A",text:svg(60,60,`${S.tri(30,30,40)}${S.diamond(30,33,16)}`)},
      {label:"B",text:svg(60,60,`${S.circle(30,30,22)}${S.rect(22,22,16,16)}`)},
      {label:"C",text:svg(60,60,`${S.hexagon(30,30,22)}${S.circle(30,30,8)}`)},
      {label:"D",text:svg(60,60,`${S.tri(30,30,40)}${S.circle(30,33,8)}`)},
      {label:"E",text:svg(60,60,`${S.pentagon(30,30,20)}${S.tri(30,32,12)}`)},
    ], correctLabel:"A", tags:["matrix"] },

  // 62-70: more matrix questions
  { category: "spatial", difficulty: 2,
    stem: svg(200,200,`${S.dot(50,50)}${S.dot(140,40)}${S.dot(160,60)}${S.dot(40,140)}${S.dot(50,150)}${S.dot(60,140)}${qm(150,150)}`)+`<br/>2×2 grid. Top-left: 1 dot. Top-right: 2 dots. Bottom-left: 3 dots. Bottom-right: ?`,
    options:[
      {label:"A",text:svg(60,60,`${S.dot(20,20)}${S.dot(40,20)}${S.dot(20,40)}${S.dot(40,40)}`)},
      {label:"B",text:svg(60,60,`${S.dot(20,30)}${S.dot(30,30)}${S.dot(40,30)}`)},
      {label:"C",text:svg(60,60,`${S.dot(30,30)}`)},
      {label:"D",text:svg(60,60,`${S.dot(20,20)}${S.dot(40,20)}${S.dot(20,40)}${S.dot(40,40)}${S.dot(30,30)}`)},
      {label:"E",text:svg(60,60,`${S.dot(30,20)}${S.dot(30,40)}`)},
    ], correctLabel:"A", tags:["matrix"] },

  { category: "spatial", difficulty: 2,
    stem: svg(250,250,`${S.circle(40,40,16,"#333")}${S.circle(120,40,16,"#888")}${S.circle(200,40,16)}${S.rect(22,104,36,36,"#888")}${S.rect(102,104,36,36)}${S.rect(182,104,36,36,"#333")}${S.tri(40,200,32)}${S.tri(120,200,32,"#333")}${qm(200,200)}`)+`<br/>3×3 grid. Each row has three fills (black, gray, empty) applied to the same shape. What's missing?`,
    options:[
      {label:"A",text:svg(60,60,S.tri(30,30,32,"#888"))},
      {label:"B",text:svg(60,60,S.tri(30,30,32,"#333"))},
      {label:"C",text:svg(60,60,S.tri(30,30,32))},
      {label:"D",text:svg(60,60,S.rect(12,12,36,36,"#888"))},
      {label:"E",text:svg(60,60,S.circle(30,30,16,"#888"))},
    ], correctLabel:"A", tags:["matrix"] },

  { category: "spatial", difficulty: 3,
    stem: "3×3 grid pattern: each row has shapes with 3, 4, and 5 sides. Each column has fills: empty, half, full.\nRow 1: empty triangle, half square, full pentagon\nRow 2: half pentagon, full triangle, empty square\nRow 3: full square, empty pentagon, ?\nWhat completes the grid?",
    options:[
      {label:"A",text:"Half-filled triangle"},
      {label:"B",text:"Empty triangle"},
      {label:"C",text:"Full triangle"},
      {label:"D",text:"Half-filled square"},
      {label:"E",text:"Empty pentagon"},
    ], correctLabel:"A", tags:["matrix"] },

  { category: "spatial", difficulty: 2,
    stem: svg(200,200,`${S.star(50,50,18,9)}${S.star(150,50,18,9,"#888")}${S.star(50,150,18,9,"#333")}${qm(150,150)}`)+`<br/>2×2 grid. Top: empty star, gray star. Bottom: black star, ?`,
    options:[
      {label:"A",text:"The pattern is ambiguous"},
      {label:"B",text:svg(60,60,S.star(30,30,18,9,"#333"))},
      {label:"C",text:svg(60,60,S.star(30,30,18,9))},
      {label:"D",text:svg(60,60,S.star(30,30,18,9,"#888"))},
      {label:"E",text:svg(60,60,S.circle(30,30,18))},
    ], correctLabel:"A", tags:["matrix"] },

  { category: "spatial", difficulty: 3,
    stem: svg(250,250,`${S.rect(20,20,40,40)}${S.line(20,20,60,60)}${S.rect(100,20,40,40)}${S.line(140,20,100,60)}${S.tri(40,120,40)}${S.line(40,100,20,135)}${S.tri(120,120,40)}${S.line(120,100,140,135)}${S.circle(40,200,20)}${S.line(20,200,60,200)}${qm(120,200)}`)+`<br/>Pattern: each shape has one diagonal/line. What's the missing piece?`,
    options:[
      {label:"A",text:svg(60,60,`${S.circle(30,30,20)}${S.line(30,10,30,50)}`)},
      {label:"B",text:svg(60,60,`${S.circle(30,30,20)}${S.line(10,30,50,30)}`)},
      {label:"C",text:svg(60,60,`${S.circle(30,30,20)}${S.line(16,16,44,44)}`)},
      {label:"D",text:svg(60,60,`${S.circle(30,30,20)}`)},
      {label:"E",text:svg(60,60,`${S.rect(10,10,40,40)}${S.line(10,30,50,30)}`)},
    ], correctLabel:"A", tags:["matrix"] },

  { category: "spatial", difficulty: 2,
    stem: svg(200,200,`${S.hexagon(50,50,20)}${S.hexagon(150,50,20,"#888")}${S.hexagon(50,150,20,"#888")}${qm(150,150)}`)+`<br/>2×2 grid with hexagons. Top: empty, gray. Bottom: gray, ?`,
    options:[
      {label:"A",text:svg(60,60,S.hexagon(30,30,20,"#333"))},
      {label:"B",text:svg(60,60,S.hexagon(30,30,20,"#888"))},
      {label:"C",text:svg(60,60,S.hexagon(30,30,20))},
      {label:"D",text:svg(60,60,S.circle(30,30,20,"#333"))},
      {label:"E",text:svg(60,60,S.hexagon(30,30,14,"#333"))},
    ], correctLabel:"A", tags:["matrix"] },

  { category: "spatial", difficulty: 3,
    stem: "In a 3×3 matrix, each cell has a shape with 0, 1, or 2 internal lines.\nRow 1: circle(0), circle(1), circle(2)\nRow 2: square(0), square(1), square(2)\nRow 3: triangle(0), triangle(1), ?\nWhat completes the grid?",
    options:[
      {label:"A",text:"Triangle with 2 internal lines"},
      {label:"B",text:"Triangle with 1 internal line"},
      {label:"C",text:"Triangle with 0 internal lines"},
      {label:"D",text:"Circle with 2 internal lines"},
      {label:"E",text:"Square with 2 internal lines"},
    ], correctLabel:"A", tags:["matrix"] },

  { category: "spatial", difficulty: 2,
    stem: svg(200,200,`${S.diamond(50,50,30)}${S.diamond(150,50,20)}${S.diamond(50,150,20)}${qm(150,150)}`)+`<br/>2×2: sizes are big, medium, medium, ?`,
    options:[
      {label:"A",text:svg(60,60,S.diamond(30,30,12))},
      {label:"B",text:svg(60,60,S.diamond(30,30,20))},
      {label:"C",text:svg(60,60,S.diamond(30,30,30))},
      {label:"D",text:svg(60,60,S.diamond(30,30,40))},
      {label:"E",text:svg(60,60,S.circle(30,30,12))},
    ], correctLabel:"A", tags:["matrix"] },

  // ═══════════════════════════════════════════════════════════════════════════
  // ROTATION / MENTAL ROTATION (15)
  // ═══════════════════════════════════════════════════════════════════════════

  // 71
  { category: "spatial", difficulty: 1,
    stem: svg(80,80,`${S.rect(10,20,30,40)}${S.dot(18,28)}`)+`<br/>Which shows this figure rotated 90° clockwise?`,
    options:[
      {label:"A",text:svg(60,60,`${S.rect(10,15,40,30)}${S.dot(42,23)}`)},
      {label:"B",text:svg(60,60,`${S.rect(10,15,40,30)}${S.dot(18,23)}`)},
      {label:"C",text:svg(60,60,`${S.rect(10,20,30,40)}${S.dot(32,52)}`)},
      {label:"D",text:svg(60,60,`${S.rect(10,15,40,30)}${S.dot(42,37)}`)},
      {label:"E",text:svg(60,60,`${S.rect(15,10,30,40)}${S.dot(23,42)}`)},
    ], correctLabel:"A", tags:["rotation"] },

  // 72
  { category: "spatial", difficulty: 1,
    stem: svg(80,80,`${S.tri(40,40,40)}${S.dot(40,50)}`)+`<br/>Which shows this figure rotated 180°?`,
    options:[
      {label:"A",text:svg(60,60,`<g transform="rotate(180,30,30)">${S.tri(30,30,40)}${S.dot(30,40)}</g>`)},
      {label:"B",text:svg(60,60,`${S.tri(30,30,40)}${S.dot(30,20)}`)},
      {label:"C",text:svg(60,60,`${S.tri(30,30,40)}${S.dot(30,40)}`)},
      {label:"D",text:svg(60,60,`${S.rect(10,10,40,40)}${S.dot(30,40)}`)},
      {label:"E",text:svg(60,60,`<g transform="rotate(90,30,30)">${S.tri(30,30,40)}${S.dot(30,40)}</g>`)},
    ], correctLabel:"A", tags:["rotation"] },

  // 73
  { category: "spatial", difficulty: 2,
    stem: svg(80,80,`${S.rect(10,10,50,30)}${S.circle(25,25,8)}${S.dot(50,25)}`)+`<br/>Which shows this figure rotated 90° counterclockwise?`,
    options:[
      {label:"A",text:svg(60,80,`${S.rect(15,5,30,50)}${S.circle(30,20,8)}${S.dot(30,45)}`)},
      {label:"B",text:svg(60,80,`${S.rect(15,5,30,50)}${S.circle(30,40,8)}${S.dot(30,15)}`)},
      {label:"C",text:svg(60,80,`${S.rect(15,5,30,50)}${S.dot(30,20)}${S.circle(30,40,8)}`)},
      {label:"D",text:svg(60,80,`${S.rect(5,15,50,30)}${S.circle(35,30,8)}${S.dot(15,30)}`)},
      {label:"E",text:svg(60,80,`${S.rect(15,5,30,50)}${S.circle(30,30,8)}${S.dot(30,50)}`)},
    ], correctLabel:"A", tags:["rotation"] },

  // 74
  { category: "spatial", difficulty: 2,
    stem: svg(80,80,`${S.rect(10,10,60,60)}${S.line(10,10,70,70)}${S.dot(20,60)}`)+`<br/>Which shows this figure rotated 270° clockwise?`,
    options:[
      {label:"A",text:svg(60,60,`${S.rect(0,0,60,60)}${S.line(0,60,60,0)}${S.dot(50,50)}`)},
      {label:"B",text:svg(60,60,`${S.rect(0,0,60,60)}${S.line(0,0,60,60)}${S.dot(50,10)}`)},
      {label:"C",text:svg(60,60,`${S.rect(0,0,60,60)}${S.line(0,60,60,0)}${S.dot(10,10)}`)},
      {label:"D",text:svg(60,60,`${S.rect(0,0,60,60)}${S.line(0,0,60,60)}${S.dot(10,50)}`)},
      {label:"E",text:svg(60,60,`${S.rect(0,0,60,60)}${S.line(0,60,60,0)}${S.dot(10,50)}`)},
    ], correctLabel:"A", tags:["rotation"] },

  // 75
  { category: "spatial", difficulty: 2,
    stem: svg(80,80,`${S.hexagon(40,40,25)}${S.dot(40,15)}${S.line(40,40,65,40)}`)+`<br/>Which shows this figure rotated 60° clockwise?`,
    options:[
      {label:"A",text:svg(80,80,`${S.hexagon(40,40,25)}${S.dot(62,27)}${S.line(40,40,40,65)}`)},
      {label:"B",text:svg(80,80,`${S.hexagon(40,40,25)}${S.dot(40,15)}${S.line(40,40,15,40)}`)},
      {label:"C",text:svg(80,80,`${S.hexagon(40,40,25)}${S.dot(18,27)}${S.line(40,40,65,40)}`)},
      {label:"D",text:svg(80,80,`${S.hexagon(40,40,25)}${S.dot(62,53)}${S.line(40,40,18,27)}`)},
      {label:"E",text:svg(80,80,`${S.hexagon(40,40,25)}${S.dot(40,65)}${S.line(40,40,62,27)}`)},
    ], correctLabel:"A", tags:["rotation"] },

  // 76
  { category: "spatial", difficulty: 1,
    stem: svg(80,80,S.arrow(40,40,0))+`<br/>Which arrow is rotated 90° clockwise from the original?`,
    options:[
      {label:"A",text:svg(60,60,S.arrow(30,30,90))},
      {label:"B",text:svg(60,60,S.arrow(30,30,180))},
      {label:"C",text:svg(60,60,S.arrow(30,30,270))},
      {label:"D",text:svg(60,60,S.arrow(30,30,0))},
      {label:"E",text:svg(60,60,S.arrow(30,30,45))},
    ], correctLabel:"A", tags:["rotation"] },

  // 77
  { category: "spatial", difficulty: 3,
    stem: svg(80,80,`${S.rect(10,20,25,40)}${S.tri(47,40,25)}${S.dot(20,30)}`)+`<br/>This is a rectangle with an attached triangle. Which shows it rotated 180°?`,
    options:[
      {label:"A",text:svg(80,80,`${S.rect(45,20,25,40)}${S.tri(33,40,25)}${S.dot(60,50)}`)},
      {label:"B",text:svg(80,80,`${S.rect(10,20,25,40)}${S.tri(47,40,25)}${S.dot(60,50)}`)},
      {label:"C",text:svg(80,80,`${S.rect(45,20,25,40)}${S.tri(33,40,25)}${S.dot(20,30)}`)},
      {label:"D",text:svg(80,80,`${S.rect(10,20,25,40)}${S.tri(47,40,25)}${S.dot(20,30)}`)},
      {label:"E",text:svg(80,80,`${S.rect(20,10,40,25)}${S.tri(40,47,25)}${S.dot(30,20)}`)},
    ], correctLabel:"A", tags:["rotation"] },

  // 78
  { category: "spatial", difficulty: 2,
    stem: svg(80,80,`${S.diamond(40,40,30)}${S.dot(40,25)}${S.cross(40,48,6)}`)+`<br/>Which shows this figure rotated 90° clockwise?`,
    options:[
      {label:"A",text:svg(60,60,`${S.diamond(30,30,30)}${S.dot(45,30)}${S.cross(22,30,6)}`)},
      {label:"B",text:svg(60,60,`${S.diamond(30,30,30)}${S.dot(15,30)}${S.cross(38,30,6)}`)},
      {label:"C",text:svg(60,60,`${S.diamond(30,30,30)}${S.dot(30,45)}${S.cross(30,22,6)}`)},
      {label:"D",text:svg(60,60,`${S.diamond(30,30,30)}${S.dot(30,15)}${S.cross(30,38,6)}`)},
      {label:"E",text:svg(60,60,`${S.diamond(30,30,30)}${S.dot(45,30)}${S.cross(30,38,6)}`)},
    ], correctLabel:"A", tags:["rotation"] },

  // 79
  { category: "spatial", difficulty: 3,
    stem: svg(80,80,`${S.pentagon(40,40,22)}${S.dot(40,18)}${S.dot(55,32)}${S.line(25,50,40,40)}`)+`<br/>Which shows this figure rotated 144° clockwise (2 vertices of the pentagon)?`,
    options:[
      {label:"A",text:svg(80,80,`${S.pentagon(40,40,22)}${S.dot(55,50)}${S.dot(40,62)}${S.line(25,30,40,40)}`)},
      {label:"B",text:svg(80,80,`${S.pentagon(40,40,22)}${S.dot(40,18)}${S.dot(25,32)}${S.line(55,50,40,40)}`)},
      {label:"C",text:svg(80,80,`${S.pentagon(40,40,22)}${S.dot(25,50)}${S.dot(25,32)}${S.line(55,32,40,40)}`)},
      {label:"D",text:svg(80,80,`${S.pentagon(40,40,22)}${S.dot(55,32)}${S.dot(55,50)}${S.line(25,32,40,40)}`)},
      {label:"E",text:svg(80,80,`${S.pentagon(40,40,22)}${S.dot(40,62)}${S.dot(25,50)}${S.line(55,32,40,40)}`)},
    ], correctLabel:"A", tags:["rotation"] },

  // 80-85: more rotation
  { category: "spatial", difficulty: 1,
    stem: svg(60,60,`${S.rect(10,10,40,40)}${S.dot(15,15)}`)+`<br/>Rotate 90° clockwise. Where does the dot end up?`,
    options:[
      {label:"A",text:"Top-right corner"},
      {label:"B",text:"Top-left corner"},
      {label:"C",text:"Bottom-right corner"},
      {label:"D",text:"Bottom-left corner"},
      {label:"E",text:"Center"},
    ], correctLabel:"A", tags:["rotation"] },

  { category: "spatial", difficulty: 2,
    stem: svg(80,80,`${S.rect(10,10,60,40)}${S.circle(25,30,8,"#333")}${S.tri(55,30,14)}`)+`<br/>Which shows this figure rotated 180°?`,
    options:[
      {label:"A",text:svg(80,60,`${S.rect(10,10,60,40)}${S.circle(55,30,8,"#333")}${S.tri(25,30,14)}`)},
      {label:"B",text:svg(80,60,`${S.rect(10,10,60,40)}${S.circle(25,30,8,"#333")}${S.tri(55,30,14)}`)},
      {label:"C",text:svg(80,60,`${S.rect(10,10,60,40)}${S.tri(25,30,14,"#333")}${S.circle(55,30,8)}`)},
      {label:"D",text:svg(80,60,`${S.rect(10,10,40,60)}${S.circle(30,55,8,"#333")}${S.tri(30,25,14)}`)},
      {label:"E",text:svg(80,60,`${S.rect(10,10,60,40)}${S.circle(40,30,8,"#333")}${S.tri(40,30,14)}`)},
    ], correctLabel:"A", tags:["rotation"] },

  { category: "spatial", difficulty: 2,
    stem: "An L-shaped piece has a dot on its top-left corner. If rotated 90° clockwise, where is the dot?",
    options:[
      {label:"A",text:"Top-right"},
      {label:"B",text:"Bottom-left"},
      {label:"C",text:"Bottom-right"},
      {label:"D",text:"Top-left (same)"},
      {label:"E",text:"Center"},
    ], correctLabel:"A", tags:["rotation"] },

  { category: "spatial", difficulty: 3,
    stem: "A shape is rotated 90° clockwise three times. What is the total rotation from the original?",
    options:[
      {label:"A",text:"270° clockwise"},
      {label:"B",text:"180°"},
      {label:"C",text:"90° counterclockwise"},
      {label:"D",text:"Both A and C are correct"},
      {label:"E",text:"360°"},
    ], correctLabel:"D", tags:["rotation"] },

  { category: "spatial", difficulty: 3,
    stem: svg(80,80,`${S.star(40,40,22,10)}${S.dot(40,18)}${S.dot(58,32)}`)+`<br/>If this star is rotated 72° clockwise (one point), which dots match?`,
    options:[
      {label:"A",text:"Dots move to the next two star points clockwise"},
      {label:"B",text:"Dots stay in the same absolute position"},
      {label:"C",text:"Dots move counterclockwise"},
      {label:"D",text:"Only one dot moves"},
      {label:"E",text:"Dots swap positions"},
    ], correctLabel:"A", tags:["rotation"] },

  // ═══════════════════════════════════════════════════════════════════════════
  // REFLECTION / MIRROR (10)
  // ═══════════════════════════════════════════════════════════════════════════

  // 86
  { category: "spatial", difficulty: 1,
    stem: svg(80,80,`${S.rect(10,10,30,50)}${S.dot(18,20)}`)+`<br/>Which shows the mirror image (reflected horizontally)?`,
    options:[
      {label:"A",text:svg(60,70,`${S.rect(20,5,30,50)}${S.dot(42,15)}`)},
      {label:"B",text:svg(60,70,`${S.rect(20,5,30,50)}${S.dot(28,15)}`)},
      {label:"C",text:svg(60,70,`${S.rect(10,5,30,50)}${S.dot(18,15)}`)},
      {label:"D",text:svg(60,70,`${S.rect(20,5,30,50)}${S.dot(42,45)}`)},
      {label:"E",text:svg(60,70,`${S.rect(20,15,30,50)}${S.dot(28,55)}`)},
    ], correctLabel:"A", tags:["reflection"] },

  // 87
  { category: "spatial", difficulty: 1,
    stem: svg(60,60,S.arrow(30,30,0))+`<br/>What is the mirror image reflected across a vertical axis?`,
    options:[
      {label:"A",text:svg(60,60,S.arrow(30,30,0))},
      {label:"B",text:svg(60,60,S.arrow(30,30,180))},
      {label:"C",text:svg(60,60,S.arrow(30,30,90))},
      {label:"D",text:svg(60,60,S.arrow(30,30,270))},
      {label:"E",text:svg(60,60,S.arrow(30,30,45))},
    ], correctLabel:"A", tags:["reflection"] },

  // 88
  { category: "spatial", difficulty: 2,
    stem: svg(80,80,`${S.tri(30,40,40)}${S.dot(20,50)}${S.circle(55,30,8)}`)+`<br/>Which shows the horizontal mirror image?`,
    options:[
      {label:"A",text:svg(80,80,`${S.tri(50,40,40)}${S.dot(60,50)}${S.circle(25,30,8)}`)},
      {label:"B",text:svg(80,80,`${S.tri(30,40,40)}${S.dot(40,50)}${S.circle(55,30,8)}`)},
      {label:"C",text:svg(80,80,`${S.tri(30,40,40)}${S.dot(20,30)}${S.circle(55,50,8)}`)},
      {label:"D",text:svg(80,80,`${S.tri(50,40,40)}${S.dot(40,30)}${S.circle(25,50,8)}`)},
      {label:"E",text:svg(80,80,`${S.tri(50,40,40)}${S.dot(60,30)}${S.circle(25,50,8)}`)},
    ], correctLabel:"A", tags:["reflection"] },

  // 89
  { category: "spatial", difficulty: 2,
    stem: svg(80,80,`${S.rect(10,10,40,60)}${S.dot(18,20)}${S.cross(35,50,8)}`)+`<br/>Which shows the vertical mirror image (reflected across horizontal axis)?`,
    options:[
      {label:"A",text:svg(80,80,`${S.rect(10,10,40,60)}${S.dot(18,60)}${S.cross(35,20,8)}`)},
      {label:"B",text:svg(80,80,`${S.rect(10,10,40,60)}${S.dot(32,20)}${S.cross(15,50,8)}`)},
      {label:"C",text:svg(80,80,`${S.rect(10,10,40,60)}${S.dot(18,20)}${S.cross(35,50,8)}`)},
      {label:"D",text:svg(80,80,`${S.rect(30,10,40,60)}${S.dot(62,60)}${S.cross(45,20,8)}`)},
      {label:"E",text:svg(80,80,`${S.rect(10,10,60,40)}${S.dot(20,18)}${S.cross(50,35,8)}`)},
    ], correctLabel:"A", tags:["reflection"] },

  // 90
  { category: "spatial", difficulty: 2,
    stem: svg(80,80,`${S.diamond(40,40,36)}${S.dot(40,22)}${S.line(40,40,58,40)}`)+`<br/>Which shows the horizontal mirror image?`,
    options:[
      {label:"A",text:svg(80,80,`${S.diamond(40,40,36)}${S.dot(40,22)}${S.line(40,40,22,40)}`)},
      {label:"B",text:svg(80,80,`${S.diamond(40,40,36)}${S.dot(40,58)}${S.line(40,40,58,40)}`)},
      {label:"C",text:svg(80,80,`${S.diamond(40,40,36)}${S.dot(40,58)}${S.line(40,40,22,40)}`)},
      {label:"D",text:svg(80,80,`${S.diamond(40,40,36)}${S.dot(40,22)}${S.line(40,40,58,40)}`)},
      {label:"E",text:svg(80,80,`${S.diamond(40,40,36)}${S.dot(22,40)}${S.line(40,40,40,22)}`)},
    ], correctLabel:"A", tags:["reflection"] },

  // 91
  { category: "spatial", difficulty: 3,
    stem: svg(100,80,`${S.rect(10,10,40,60)}${S.tri(70,40,30,"#888")}${S.dot(20,20)}${S.dot(65,50)}`)+`<br/>Reflect this figure across a vertical axis at x=50.`,
    options:[
      {label:"A",text:svg(100,80,`${S.rect(50,10,40,60)}${S.tri(30,40,30,"#888")}${S.dot(80,20)}${S.dot(35,50)}`)},
      {label:"B",text:svg(100,80,`${S.rect(50,10,40,60)}${S.tri(30,40,30,"#888")}${S.dot(80,60)}${S.dot(35,30)}`)},
      {label:"C",text:svg(100,80,`${S.rect(10,10,40,60)}${S.tri(70,40,30,"#888")}${S.dot(80,20)}${S.dot(35,50)}`)},
      {label:"D",text:svg(100,80,`${S.tri(30,40,30,"#888")}${S.rect(50,10,40,60)}${S.dot(20,60)}${S.dot(85,30)}`)},
      {label:"E",text:svg(100,80,`${S.rect(50,10,40,60)}${S.tri(30,40,30)}${S.dot(80,20)}${S.dot(35,50)}`)},
    ], correctLabel:"A", tags:["reflection"] },

  // 92
  { category: "spatial", difficulty: 2,
    stem: "The letter 'b' reflected horizontally becomes which letter?",
    options:[
      {label:"A",text:"d"},
      {label:"B",text:"p"},
      {label:"C",text:"q"},
      {label:"D",text:"b"},
      {label:"E",text:"g"},
    ], correctLabel:"A", tags:["reflection"] },

  // 93
  { category: "spatial", difficulty: 3,
    stem: "If you reflect the letter 'R' across a horizontal axis, and then across a vertical axis, the result is the same as:",
    options:[
      {label:"A",text:"Rotating R by 180°"},
      {label:"B",text:"Reflecting R once horizontally"},
      {label:"C",text:"The original R"},
      {label:"D",text:"Reflecting R once vertically"},
      {label:"E",text:"Rotating R by 90°"},
    ], correctLabel:"A", tags:["reflection"] },

  // 94
  { category: "spatial", difficulty: 1,
    stem: "A circle with a dot at the top is reflected across a horizontal axis. Where is the dot?",
    options:[
      {label:"A",text:"At the bottom"},
      {label:"B",text:"At the top (same)"},
      {label:"C",text:"On the left"},
      {label:"D",text:"On the right"},
      {label:"E",text:"In the center"},
    ], correctLabel:"A", tags:["reflection"] },

  // 95
  { category: "spatial", difficulty: 3,
    stem: svg(100,80,`${S.rect(10,10,35,60)}${S.rect(45,10,35,30)}${S.dot(20,20)}${S.dot(60,20)}`)+`<br/>Reflect this L-like shape horizontally. Which is correct?`,
    options:[
      {label:"A",text:svg(100,80,`${S.rect(55,10,35,60)}${S.rect(20,10,35,30)}${S.dot(80,20)}${S.dot(40,20)}`)},
      {label:"B",text:svg(100,80,`${S.rect(55,10,35,60)}${S.rect(20,40,35,30)}${S.dot(80,50)}${S.dot(40,50)}`)},
      {label:"C",text:svg(100,80,`${S.rect(10,10,35,60)}${S.rect(45,40,35,30)}${S.dot(20,60)}${S.dot(60,60)}`)},
      {label:"D",text:svg(100,80,`${S.rect(55,10,35,60)}${S.rect(20,10,35,30)}${S.dot(80,60)}${S.dot(40,60)}`)},
      {label:"E",text:svg(100,80,`${S.rect(10,10,35,60)}${S.rect(45,10,35,30)}${S.dot(20,20)}${S.dot(60,20)}`)},
    ], correctLabel:"A", tags:["reflection"] },

  // ═══════════════════════════════════════════════════════════════════════════
  // SPATIAL REASONING (11)
  // ═══════════════════════════════════════════════════════════════════════════

  // 96 – Cube net
  { category: "spatial", difficulty: 2,
    stem: "A cross-shaped net (4 squares in a column, 1 square on the left of the 2nd row, 1 on the right of the 2nd row) is folded into a cube. The top face is white. What is on the bottom face?",
    options:[
      {label:"A",text:"The square that was 3 squares below the top in the column"},
      {label:"B",text:"The left square"},
      {label:"C",text:"The right square"},
      {label:"D",text:"The square directly below the top"},
      {label:"E",text:"Cannot be determined"},
    ], correctLabel:"A", tags:["spatial-reasoning"] },

  // 97 – Paper folding
  { category: "spatial", difficulty: 2,
    stem: "A square piece of paper is folded in half vertically (left over right), then a hole is punched in the center. When unfolded, how many holes are there?",
    options:[
      {label:"A",text:"2"},
      {label:"B",text:"1"},
      {label:"C",text:"3"},
      {label:"D",text:"4"},
      {label:"E",text:"0"},
    ], correctLabel:"A", tags:["spatial-reasoning"] },

  // 98 – Paper folding harder
  { category: "spatial", difficulty: 3,
    stem: "A square paper is folded in half (top to bottom), then in half again (left to right). A corner is cut from the folded corner (the one with 4 layers). When unfolded, what shape is the hole?",
    options:[
      {label:"A",text:"A diamond/square shape in the center"},
      {label:"B",text:"Four separate holes in corners"},
      {label:"C",text:"One hole in the center"},
      {label:"D",text:"Two holes"},
      {label:"E",text:"An L-shape"},
    ], correctLabel:"A", tags:["spatial-reasoning"] },

  // 99 – Counting faces
  { category: "spatial", difficulty: 1,
    stem: "How many faces does a cube have?",
    options:[
      {label:"A",text:"6"},
      {label:"B",text:"4"},
      {label:"C",text:"8"},
      {label:"D",text:"12"},
      {label:"E",text:"5"},
    ], correctLabel:"A", tags:["spatial-reasoning"] },

  // 100 – 3D visualization
  { category: "spatial", difficulty: 2,
    stem: "A stack of unit cubes forms a 2×2×2 arrangement. If the entire outside is painted, how many cubes have exactly 3 painted faces?",
    options:[
      {label:"A",text:"8"},
      {label:"B",text:"4"},
      {label:"C",text:"6"},
      {label:"D",text:"2"},
      {label:"E",text:"0"},
    ], correctLabel:"A", tags:["spatial-reasoning"] },

  // 101 – Counting regions
  { category: "spatial", difficulty: 2,
    stem: svg(120,120,`${S.circle(60,60,50)}${S.line(10,60,110,60)}${S.line(60,10,60,110)}`)+`<br/>How many regions is this circle divided into?`,
    options:[
      {label:"A",text:"4"},
      {label:"B",text:"2"},
      {label:"C",text:"3"},
      {label:"D",text:"6"},
      {label:"E",text:"8"},
    ], correctLabel:"A", tags:["spatial-reasoning"] },

  // 102 – Perspective / view
  { category: "spatial", difficulty: 2,
    stem: "You are looking at a cone from directly above. What shape do you see?",
    options:[
      {label:"A",text:"A circle"},
      {label:"B",text:"A triangle"},
      {label:"C",text:"A rectangle"},
      {label:"D",text:"A point"},
      {label:"E",text:"An oval"},
    ], correctLabel:"A", tags:["spatial-reasoning"] },

  // 103 – Cube net identification
  { category: "spatial", difficulty: 3,
    stem: "Which of these is NOT a valid net for a cube?",
    options:[
      {label:"A",text:"A 2×2 square with 1 square attached to the top-left and 1 to the bottom-right"},
      {label:"B",text:"A row of 4 squares with 1 square on top of the first and 1 on the bottom of the last"},
      {label:"C",text:"A T-shape: 3 in a row with 3 more below the middle one"},
      {label:"D",text:"A cross shape: 1 on top, 4 in a row, 1 on bottom of the second"},
      {label:"E",text:"A row of 4 with 1 above the second and 1 below the second"},
    ], correctLabel:"A", tags:["spatial-reasoning"] },

  // 104 – 3D block counting
  { category: "spatial", difficulty: 2,
    stem: "An L-shaped structure is made from unit cubes: a row of 3 cubes with 2 more stacked on the end cube. How many unit cubes are used?",
    options:[
      {label:"A",text:"5"},
      {label:"B",text:"4"},
      {label:"C",text:"6"},
      {label:"D",text:"7"},
      {label:"E",text:"3"},
    ], correctLabel:"A", tags:["spatial-reasoning"] },

  // 105 – Paper folding + hole
  { category: "spatial", difficulty: 3,
    stem: "A circular piece of paper is folded in half. A semicircular notch is cut from the folded edge. When unfolded, what shape is the hole?",
    options:[
      {label:"A",text:"A full circle"},
      {label:"B",text:"A semicircle"},
      {label:"C",text:"Two semicircles"},
      {label:"D",text:"An oval"},
      {label:"E",text:"A crescent"},
    ], correctLabel:"A", tags:["spatial-reasoning"] },

  // 106 – 3D perspective
  { category: "spatial", difficulty: 3,
    stem: "A cylinder is placed on top of a cube. Looking from the front, what is the silhouette?",
    options:[
      {label:"A",text:"A rectangle (cube) with a smaller rectangle (cylinder) on top"},
      {label:"B",text:"A square with a circle on top"},
      {label:"C",text:"A rectangle with a triangle on top"},
      {label:"D",text:"A square with a semicircle on top"},
      {label:"E",text:"Just a rectangle"},
    ], correctLabel:"A", tags:["spatial-reasoning"] },

  // 107 – Extra: counting edges
  { category: "spatial", difficulty: 1,
    stem: "How many edges does a triangular prism have?",
    options:[
      {label:"A",text:"9"},
      {label:"B",text:"6"},
      {label:"C",text:"8"},
      {label:"D",text:"12"},
      {label:"E",text:"5"},
    ], correctLabel:"A", tags:["spatial-reasoning"] },

  // 108 – Extra: top view
  { category: "spatial", difficulty: 2,
    stem: "A pyramid with a square base is viewed from directly above. What shape do you see?",
    options:[
      {label:"A",text:"A square with diagonals (an X inside a square)"},
      {label:"B",text:"A triangle"},
      {label:"C",text:"A square only"},
      {label:"D",text:"A circle"},
      {label:"E",text:"A diamond"},
    ], correctLabel:"A", tags:["spatial-reasoning"] },
];
