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

export const spatialQuestions3: QuestionData[] = [
  // ===== EASY (1-17) =====
  // 1 - Circle size increase
  { category: "spatial", difficulty: 1,
    stem: svg(400,80,`${S.circle(40,40,8)}${S.circle(110,40,14)}${S.circle(180,40,20)}${S.circle(250,40,26)}${qm(330,40)}`)+`<br/>What comes next?`,
    options:[
      {label:"A",text:svg(60,60,S.circle(30,30,32))},
      {label:"B",text:svg(60,60,S.circle(30,30,20))},
      {label:"C",text:svg(60,60,S.circle(30,30,14))},
      {label:"D",text:svg(60,60,S.rect(10,10,40,40))},
      {label:"E",text:svg(60,60,S.circle(30,30,8))},
    ], correctLabel:"A", tags:["sequence"] },
  // 2 - Alternating diamond fill
  { category: "spatial", difficulty: 1,
    stem: svg(400,80,`${S.diamond(40,40,30,"#333")}${S.diamond(110,40,30)}${S.diamond(180,40,30,"#333")}${S.diamond(250,40,30)}${qm(330,40)}`)+`<br/>What comes next?`,
    options:[
      {label:"A",text:svg(60,60,S.diamond(30,30,30))},
      {label:"B",text:svg(60,60,S.diamond(30,30,30,"#333"))},
      {label:"C",text:svg(60,60,S.circle(30,30,16,"#333"))},
      {label:"D",text:svg(60,60,S.tri(30,30,30,"#333"))},
      {label:"E",text:svg(60,60,S.rect(10,10,40,40,"#333"))},
    ], correctLabel:"B", tags:["sequence"] },
  // 3 - Dot count increasing
  { category: "spatial", difficulty: 1,
    stem: svg(400,80,`${S.dot(40,40)}${S.dot(100,30)}${S.dot(110,50)}${S.dot(170,25)}${S.dot(180,40)}${S.dot(170,55)}${S.dot(240,20)}${S.dot(250,35)}${S.dot(240,50)}${S.dot(250,65)}${qm(330,40)}`)+`<br/>1 dot, 2 dots, 3 dots, 4 dots, ... What comes next?`,
    options:[
      {label:"A",text:svg(60,60,`${S.dot(20,10)}${S.dot(40,10)}${S.dot(10,30)}${S.dot(30,30)}${S.dot(50,30)}`)},
      {label:"B",text:svg(60,60,`${S.dot(20,20)}${S.dot(40,20)}${S.dot(20,40)}${S.dot(40,40)}`)},
      {label:"C",text:svg(60,60,`${S.dot(15,15)}${S.dot(30,15)}${S.dot(45,15)}${S.dot(15,40)}${S.dot(30,40)}${S.dot(45,40)}`)},
      {label:"D",text:svg(60,60,`${S.dot(30,15)}${S.dot(30,30)}${S.dot(30,45)}`)},
      {label:"E",text:svg(60,60,S.dot(30,30,10))},
    ], correctLabel:"A", tags:["sequence"] },
  // 4 - Shape repeating: circle, square, triangle pattern
  { category: "spatial", difficulty: 1,
    stem: svg(450,80,`${S.circle(35,40,14)}${S.rect(75,25,28,28)}${S.tri(120,40,28)}${S.circle(165,40,14)}${S.rect(205,25,28,28)}${S.tri(250,40,28)}${S.circle(295,40,14)}${S.rect(335,25,28,28)}${qm(400,40)}`)+`<br/>What comes next?`,
    options:[
      {label:"A",text:svg(60,60,S.circle(30,30,14))},
      {label:"B",text:svg(60,60,S.rect(15,15,30,30))},
      {label:"C",text:svg(60,60,S.tri(30,30,28))},
      {label:"D",text:svg(60,60,S.diamond(30,30,28))},
      {label:"E",text:svg(60,60,S.hexagon(30,30,16))},
    ], correctLabel:"C", tags:["sequence"] },
  // 5 - Odd one out: all circles except one square
  { category: "spatial", difficulty: 1,
    stem: svg(400,80,`${S.circle(40,40,18)}${S.circle(110,40,18)}${S.rect(162,22,36,36)}${S.circle(250,40,18)}${S.circle(320,40,18)}`)+`<br/>Which shape does not belong?`,
    options:[
      {label:"A",text:"1st shape"},
      {label:"B",text:"2nd shape"},
      {label:"C",text:"3rd shape"},
      {label:"D",text:"4th shape"},
      {label:"E",text:"5th shape"},
    ], correctLabel:"C", tags:["odd-one-out"] },
  // 6 - Arrow rotation sequence (0, 90, 180, 270, ?)
  { category: "spatial", difficulty: 1,
    stem: svg(400,80,`${S.arrow(40,40,0)}${S.arrow(110,40,90)}${S.arrow(180,40,180)}${S.arrow(250,40,270)}${qm(330,40)}`)+`<br/>What comes next?`,
    options:[
      {label:"A",text:svg(60,60,S.arrow(30,30,0))},
      {label:"B",text:svg(60,60,S.arrow(30,30,90))},
      {label:"C",text:svg(60,60,S.arrow(30,30,180))},
      {label:"D",text:svg(60,60,S.arrow(30,30,270))},
      {label:"E",text:svg(60,60,S.arrow(30,30,45))},
    ], correctLabel:"A", tags:["sequence","rotation"] },
  // 7 - Hexagon vs pentagon: odd one out
  { category: "spatial", difficulty: 1,
    stem: svg(400,80,`${S.hexagon(40,40,18)}${S.hexagon(110,40,18)}${S.pentagon(180,40,18)}${S.hexagon(250,40,18)}${S.hexagon(320,40,18)}`)+`<br/>Which shape does not belong?`,
    options:[
      {label:"A",text:"1st shape"},
      {label:"B",text:"2nd shape"},
      {label:"C",text:"3rd shape"},
      {label:"D",text:"4th shape"},
      {label:"E",text:"5th shape"},
    ], correctLabel:"C", tags:["odd-one-out"] },
  // 8 - Alternating shapes: star, circle, star, circle, ?
  { category: "spatial", difficulty: 1,
    stem: svg(400,80,`${S.star(40,40,18,8)}${S.circle(110,40,16)}${S.star(180,40,18,8)}${S.circle(250,40,16)}${qm(330,40)}`)+`<br/>What comes next?`,
    options:[
      {label:"A",text:svg(60,60,S.star(30,30,18,8))},
      {label:"B",text:svg(60,60,S.circle(30,30,16))},
      {label:"C",text:svg(60,60,S.tri(30,30,30))},
      {label:"D",text:svg(60,60,S.rect(10,10,40,40))},
      {label:"E",text:svg(60,60,S.diamond(30,30,28))},
    ], correctLabel:"A", tags:["sequence"] },
  // 9 - Line count increasing: 1, 2, 3, 4, ?
  { category: "spatial", difficulty: 1,
    stem: svg(400,80,`${S.line(30,20,30,60)}${S.line(90,20,90,60)}${S.line(105,20,105,60)}${S.line(160,20,160,60)}${S.line(175,20,175,60)}${S.line(190,20,190,60)}${S.line(230,20,230,60)}${S.line(245,20,245,60)}${S.line(260,20,260,60)}${S.line(275,20,275,60)}${qm(340,40)}`)+`<br/>What comes next?`,
    options:[
      {label:"A",text:svg(80,60,`${S.line(10,10,10,50)}${S.line(25,10,25,50)}${S.line(40,10,40,50)}${S.line(55,10,55,50)}${S.line(70,10,70,50)}`)},
      {label:"B",text:svg(60,60,`${S.line(15,10,15,50)}${S.line(30,10,30,50)}${S.line(45,10,45,50)}`)},
      {label:"C",text:svg(60,60,`${S.line(15,10,15,50)}${S.line(30,10,30,50)}${S.line(45,10,45,50)}${S.line(60,10,60,50)}`)},
      {label:"D",text:svg(60,60,S.line(30,10,30,50))},
      {label:"E",text:svg(60,60,`${S.line(20,10,20,50)}${S.line(40,10,40,50)}`)},
    ], correctLabel:"A", tags:["sequence"] },
  // 10 - All filled except one: odd one out
  { category: "spatial", difficulty: 1,
    stem: svg(400,80,`${S.circle(40,40,16,"#333")}${S.circle(110,40,16,"#333")}${S.circle(180,40,16)}${S.circle(250,40,16,"#333")}${S.circle(320,40,16,"#333")}`)+`<br/>Which shape does not belong?`,
    options:[
      {label:"A",text:"1st shape"},
      {label:"B",text:"2nd shape"},
      {label:"C",text:"3rd shape"},
      {label:"D",text:"4th shape"},
      {label:"E",text:"5th shape"},
    ], correctLabel:"C", tags:["odd-one-out"] },
  // 11 - Size decreasing: big to small rectangles
  { category: "spatial", difficulty: 1,
    stem: svg(400,80,`${S.rect(5,5,50,50)}${S.rect(80,12,40,40)}${S.rect(145,18,32,32)}${S.rect(205,23,26,26)}${qm(280,40)}`)+`<br/>What comes next?`,
    options:[
      {label:"A",text:svg(60,60,S.rect(17,17,20,20))},
      {label:"B",text:svg(60,60,S.rect(5,5,50,50))},
      {label:"C",text:svg(60,60,S.rect(10,10,40,40))},
      {label:"D",text:svg(60,60,S.rect(15,15,30,30))},
      {label:"E",text:svg(60,60,S.circle(30,30,10))},
    ], correctLabel:"A", tags:["sequence"] },
  // 12 - Cross inside shapes: circle, square, circle, square, ?
  { category: "spatial", difficulty: 1,
    stem: svg(400,80,`${S.circle(40,40,20)}${S.cross(40,40,12)}${S.rect(80,20,40,40)}${S.cross(100,40,12)}${S.circle(160,40,20)}${S.cross(160,40,12)}${S.rect(200,20,40,40)}${S.cross(220,40,12)}${qm(300,40)}`)+`<br/>What comes next?`,
    options:[
      {label:"A",text:svg(60,60,`${S.circle(30,30,20)}${S.cross(30,30,12)}`)},
      {label:"B",text:svg(60,60,`${S.rect(10,10,40,40)}${S.cross(30,30,12)}`)},
      {label:"C",text:svg(60,60,S.cross(30,30,12))},
      {label:"D",text:svg(60,60,`${S.tri(30,30,30)}${S.cross(30,30,12)}`)},
      {label:"E",text:svg(60,60,S.circle(30,30,20))},
    ], correctLabel:"A", tags:["sequence"] },
  // 13 - Triangle rotation: up, right, down, left, ?
  { category: "spatial", difficulty: 1,
    stem: svg(400,100,`<g transform="rotate(0,40,50)">${S.tri(40,50,28)}</g><g transform="rotate(90,120,50)">${S.tri(120,50,28)}</g><g transform="rotate(180,200,50)">${S.tri(200,50,28)}</g><g transform="rotate(270,280,50)">${S.tri(280,50,28)}</g>${qm(360,50)}`)+`<br/>What comes next?`,
    options:[
      {label:"A",text:svg(60,60,`<g transform="rotate(0,30,30)">${S.tri(30,30,28)}</g>`)},
      {label:"B",text:svg(60,60,`<g transform="rotate(90,30,30)">${S.tri(30,30,28)}</g>`)},
      {label:"C",text:svg(60,60,`<g transform="rotate(180,30,30)">${S.tri(30,30,28)}</g>`)},
      {label:"D",text:svg(60,60,`<g transform="rotate(270,30,30)">${S.tri(30,30,28)}</g>`)},
      {label:"E",text:svg(60,60,`<g transform="rotate(45,30,30)">${S.tri(30,30,28)}</g>`)},
    ], correctLabel:"A", tags:["sequence","rotation"] },
  // 14 - Nested shapes: inner shape changes
  { category: "spatial", difficulty: 1,
    stem: svg(400,80,`${S.rect(10,10,60,60)}${S.circle(40,40,10)}${S.rect(90,10,60,60)}${S.rect(108,28,24,24)}${S.rect(170,10,60,60)}${S.tri(200,40,20)}${S.rect(250,10,60,60)}${qm(280,40)}`)+`<br/>Which shape goes inside the 4th square?`,
    options:[
      {label:"A",text:svg(60,60,S.diamond(30,30,20))},
      {label:"B",text:svg(60,60,S.circle(30,30,10))},
      {label:"C",text:svg(60,60,S.rect(20,20,20,20))},
      {label:"D",text:svg(60,60,S.tri(30,30,20))},
      {label:"E",text:svg(60,60,S.star(30,30,14,6))},
    ], correctLabel:"A", tags:["sequence"] },
  // 15 - Simple mirror/reflection
  { category: "spatial", difficulty: 1,
    stem: svg(400,80,`${S.circle(30,40,12)}${S.rect(55,28,24,24)}${S.line(110,10,110,70,"#999")}${qm(160,40)}${S.circle(200,40,12)}`)+`<br/>The pattern is reflected. What goes in the ? position?`,
    options:[
      {label:"A",text:svg(60,60,S.rect(18,18,24,24))},
      {label:"B",text:svg(60,60,S.circle(30,30,12))},
      {label:"C",text:svg(60,60,S.tri(30,30,24))},
      {label:"D",text:svg(60,60,S.diamond(30,30,24))},
      {label:"E",text:svg(60,60,S.hexagon(30,30,14))},
    ], correctLabel:"A", tags:["reflection"] },
  // 16 - Shape sides increasing: 3, 4, 5, 6, ?
  { category: "spatial", difficulty: 1,
    stem: svg(400,80,`${S.tri(40,40,28)}${S.rect(90,22,36,36)}${S.pentagon(180,40,18)}${S.hexagon(250,40,18)}${qm(330,40)}`)+`<br/>The number of sides increases. What comes next?`,
    options:[
      {label:"A",text:"7-sided shape"},
      {label:"B",text:"Circle"},
      {label:"C",text:"Triangle"},
      {label:"D",text:"Square"},
      {label:"E",text:"Pentagon"},
    ], correctLabel:"A", tags:["sequence"] },
  // 17 - Alternating size: big small big small ?
  { category: "spatial", difficulty: 1,
    stem: svg(400,80,`${S.circle(35,40,22)}${S.circle(90,40,10)}${S.circle(140,40,22)}${S.circle(195,40,10)}${qm(260,40)}`)+`<br/>What comes next?`,
    options:[
      {label:"A",text:svg(60,60,S.circle(30,30,22))},
      {label:"B",text:svg(60,60,S.circle(30,30,10))},
      {label:"C",text:svg(60,60,S.circle(30,30,16))},
      {label:"D",text:svg(60,60,S.rect(10,10,40,40))},
      {label:"E",text:svg(60,60,S.circle(30,30,28))},
    ], correctLabel:"A", tags:["sequence"] },

  // ===== MEDIUM (18-39) =====
  // 18 - Shape + fill both change
  { category: "spatial", difficulty: 2,
    stem: svg(400,80,`${S.circle(40,40,16,"#333")}${S.rect(82,24,32,32)}${S.tri(160,40,32,"#333")}${S.diamond(230,40,32)}${qm(310,40)}`)+`<br/>Shape changes and fill alternates. What comes next?`,
    options:[
      {label:"A",text:svg(60,60,S.pentagon(30,30,16,"#333"))},
      {label:"B",text:svg(60,60,S.pentagon(30,30,16))},
      {label:"C",text:svg(60,60,S.circle(30,30,16,"#333"))},
      {label:"D",text:svg(60,60,S.hexagon(30,30,16,"#333"))},
      {label:"E",text:svg(60,60,S.rect(10,10,40,40,"#333"))},
    ], correctLabel:"A", tags:["sequence"] },
  // 19 - 2x2 matrix: shape varies by row, fill varies by column
  { category: "spatial", difficulty: 2,
    stem: svg(200,200,`${S.rect(5,5,80,80,"#eee","#ccc")}${S.circle(45,45,18,"#333")}${S.rect(105,5,80,80,"#eee","#ccc")}${S.circle(145,45,18)}${S.rect(5,105,80,80,"#eee","#ccc")}${S.rect(20,120,50,50,"#333")}${S.rect(105,105,80,80,"#eee","#ccc")}${qm(145,145)}`)+`<br/>Complete the grid.`,
    options:[
      {label:"A",text:svg(60,60,S.rect(10,10,40,40))},
      {label:"B",text:svg(60,60,S.rect(10,10,40,40,"#333"))},
      {label:"C",text:svg(60,60,S.circle(30,30,18))},
      {label:"D",text:svg(60,60,S.circle(30,30,18,"#333"))},
      {label:"E",text:svg(60,60,S.tri(30,30,40))},
    ], correctLabel:"A", tags:["matrix"] },
  // 20 - Rotation + size change
  { category: "spatial", difficulty: 2,
    stem: svg(400,100,`<g transform="rotate(0,50,50)">${S.rect(30,30,40,40)}</g><g transform="rotate(30,140,50)">${S.rect(125,35,30,30)}</g><g transform="rotate(60,230,50)">${S.rect(218,38,24,24)}</g>${qm(320,50)}`)+`<br/>The square rotates 30° and shrinks each step. What comes next?`,
    options:[
      {label:"A",text:svg(60,60,`<g transform="rotate(90,30,30)">${S.rect(20,20,20,20)}</g>`)},
      {label:"B",text:svg(60,60,`<g transform="rotate(60,30,30)">${S.rect(15,15,30,30)}</g>`)},
      {label:"C",text:svg(60,60,`<g transform="rotate(90,30,30)">${S.rect(10,10,40,40)}</g>`)},
      {label:"D",text:svg(60,60,`<g transform="rotate(45,30,30)">${S.rect(20,20,20,20)}</g>`)},
      {label:"E",text:svg(60,60,S.circle(30,30,10))},
    ], correctLabel:"A", tags:["sequence","rotation"] },
  // 21 - Odd one out: symmetry axis
  { category: "spatial", difficulty: 2,
    stem: svg(500,80,`<g>${S.rect(5,15,50,50)}${S.line(30,15,30,65)}</g><g>${S.circle(110,40,25)}${S.line(110,15,110,65)}</g><g>${S.tri(190,40,50)}${S.line(190,15,190,65)}</g><g>${S.diamond(270,40,50)}${S.line(280,15,260,65)}</g><g>${S.hexagon(360,40,25)}${S.line(360,15,360,65)}</g>`)+`<br/>Each shape has a line through it. Which one's line is NOT a line of symmetry?`,
    options:[
      {label:"A",text:"1st shape"},
      {label:"B",text:"2nd shape"},
      {label:"C",text:"3rd shape"},
      {label:"D",text:"4th shape"},
      {label:"E",text:"5th shape"},
    ], correctLabel:"D", tags:["odd-one-out","symmetry"] },
  // 22 - Dots inside shapes: 1, 2, 3 pattern
  { category: "spatial", difficulty: 2,
    stem: svg(400,100,`${S.circle(50,50,30)}${S.dot(50,50)}${S.circle(140,50,30)}${S.dot(132,45)}${S.dot(148,55)}${S.circle(230,50,30)}${S.dot(222,40)}${S.dot(238,40)}${S.dot(230,55)}${S.circle(320,50,30)}${qm(320,50)}`)+`<br/>How many dots go inside the last circle?`,
    options:[
      {label:"A",text:"2"},
      {label:"B",text:"3"},
      {label:"C",text:"4"},
      {label:"D",text:"5"},
      {label:"E",text:"1"},
    ], correctLabel:"C", tags:["sequence"] },
  // 23 - 3x3 matrix: rows have same shape, columns have same fill
  { category: "spatial", difficulty: 2,
    stem: svg(240,240,`${S.rect(5,5,70,70,"#eee","#ccc")}${S.circle(40,40,14,"#333")}${S.rect(85,5,70,70,"#eee","#ccc")}${S.circle(120,40,14,"#888")}${S.rect(165,5,70,70,"#eee","#ccc")}${S.circle(200,40,14)}${S.rect(5,85,70,70,"#eee","#ccc")}${S.rect(18,98,44,44,"#333")}${S.rect(85,85,70,70,"#eee","#ccc")}${S.rect(98,98,44,44,"#888")}${S.rect(165,85,70,70,"#eee","#ccc")}${S.rect(178,98,44,44)}${S.rect(5,165,70,70,"#eee","#ccc")}${S.tri(40,200,32,"#333")}${S.rect(85,165,70,70,"#eee","#ccc")}${S.tri(120,200,32,"#888")}${S.rect(165,165,70,70,"#eee","#ccc")}${qm(200,200)}`)+`<br/>Complete the grid.`,
    options:[
      {label:"A",text:svg(60,60,S.tri(30,30,32))},
      {label:"B",text:svg(60,60,S.tri(30,30,32,"#333"))},
      {label:"C",text:svg(60,60,S.tri(30,30,32,"#888"))},
      {label:"D",text:svg(60,60,S.circle(30,30,14))},
      {label:"E",text:svg(60,60,S.rect(10,10,40,40))},
    ], correctLabel:"A", tags:["matrix"] },
  // 24 - Shape folding: which shape folds into a cube
  { category: "spatial", difficulty: 2,
    stem: `Which of these patterns can be folded into an open-top box?<br/>`+svg(250,100,`${S.rect(10,30,40,40)}${S.rect(50,30,40,40)}${S.rect(90,30,40,40)}${S.rect(50,70,40,40,"#ddd")}${S.rect(50,-10,40,40,"#ddd")}`),
    options:[
      {label:"A",text:"Yes, it can form an open-top box"},
      {label:"B",text:"No, it would have overlapping sides"},
      {label:"C",text:"No, it's missing a side"},
      {label:"D",text:"No, the proportions are wrong"},
      {label:"E",text:"It forms a closed box, not open-top"},
    ], correctLabel:"A", tags:["spatial-reasoning"] },
  // 25 - Counting enclosed regions
  { category: "spatial", difficulty: 2,
    stem: svg(200,200,`${S.circle(100,100,80)}${S.line(20,100,180,100)}${S.line(100,20,100,180)}${S.line(30,30,170,170)}`)+`<br/>How many enclosed regions are there?`,
    options:[
      {label:"A",text:"4"},
      {label:"B",text:"6"},
      {label:"C",text:"8"},
      {label:"D",text:"5"},
      {label:"E",text:"7"},
    ], correctLabel:"B", tags:["counting"] },
  // 26 - Double alternation: shape + size
  { category: "spatial", difficulty: 2,
    stem: svg(450,80,`${S.circle(35,40,20)}${S.rect(70,28,24,24)}${S.circle(115,40,14)}${S.rect(145,32,16,16)}${S.circle(185,40,20)}${S.rect(220,28,24,24)}${S.circle(265,40,14)}${S.rect(295,32,16,16)}${qm(360,40)}`)+`<br/>What comes next?`,
    options:[
      {label:"A",text:svg(60,60,S.circle(30,30,20))},
      {label:"B",text:svg(60,60,S.circle(30,30,14))},
      {label:"C",text:svg(60,60,S.rect(15,15,30,30))},
      {label:"D",text:svg(60,60,S.rect(18,18,24,24))},
      {label:"E",text:svg(60,60,S.tri(30,30,20))},
    ], correctLabel:"A", tags:["sequence"] },
  // 27 - Odd one out: all have even sides except triangle
  { category: "spatial", difficulty: 2,
    stem: svg(400,80,`${S.rect(10,15,50,50)}${S.hexagon(120,40,25)}${S.diamond(200,40,45)}${S.tri(280,40,45)}${S.rect(330,15,50,50)}`)+`<br/>Which shape does not belong based on number of sides?`,
    options:[
      {label:"A",text:"1st (square)"},
      {label:"B",text:"2nd (hexagon)"},
      {label:"C",text:"3rd (diamond)"},
      {label:"D",text:"4th (triangle)"},
      {label:"E",text:"5th (square)"},
    ], correctLabel:"D", tags:["odd-one-out"] },
  // 28 - Rotation sequence: 45° increments
  { category: "spatial", difficulty: 2,
    stem: svg(400,100,`<g transform="rotate(0,50,50)">${S.rect(30,25,40,10,"#333")}</g><g transform="rotate(45,130,50)">${S.rect(110,45,40,10,"#333")}</g><g transform="rotate(90,210,50)">${S.rect(190,45,40,10,"#333")}</g><g transform="rotate(135,290,50)">${S.rect(270,45,40,10,"#333")}</g>${qm(370,50)}`)+`<br/>What comes next?`,
    options:[
      {label:"A",text:svg(60,60,`<g transform="rotate(180,30,30)">${S.rect(10,25,40,10,"#333")}</g>`)},
      {label:"B",text:svg(60,60,`<g transform="rotate(225,30,30)">${S.rect(10,25,40,10,"#333")}</g>`)},
      {label:"C",text:svg(60,60,`<g transform="rotate(90,30,30)">${S.rect(10,25,40,10,"#333")}</g>`)},
      {label:"D",text:svg(60,60,`<g transform="rotate(0,30,30)">${S.rect(10,25,40,10,"#333")}</g>`)},
      {label:"E",text:svg(60,60,`<g transform="rotate(270,30,30)">${S.rect(10,25,40,10,"#333")}</g>`)},
    ], correctLabel:"A", tags:["sequence","rotation"] },
  // 29 - 2x2 matrix with inner/outer shape combo
  { category: "spatial", difficulty: 2,
    stem: svg(200,200,`${S.rect(5,5,80,80,"#eee","#ccc")}${S.rect(20,20,50,50)}${S.circle(45,45,10,"#333")}${S.rect(105,5,80,80,"#eee","#ccc")}${S.circle(145,45,25)}${S.rect(132,32,26,26,"#333")}${S.rect(5,105,80,80,"#eee","#ccc")}${S.tri(45,145,50)}${S.diamond(45,145,20,"#333")}${S.rect(105,105,80,80,"#eee","#ccc")}${qm(145,145)}`)+`<br/>In each cell, the inner and outer shapes swap. Complete the grid.`,
    options:[
      {label:"A",text:svg(60,60,`${S.diamond(30,30,30)}${S.tri(30,30,14,"#333")}`)},
      {label:"B",text:svg(60,60,`${S.tri(30,30,30)}${S.diamond(30,30,14,"#333")}`)},
      {label:"C",text:svg(60,60,`${S.diamond(30,30,30,"#333")}`)},
      {label:"D",text:svg(60,60,`${S.circle(30,30,20)}${S.rect(20,20,20,20,"#333")}`)},
      {label:"E",text:svg(60,60,`${S.rect(10,10,40,40)}${S.circle(30,30,8,"#333")}`)},
    ], correctLabel:"A", tags:["matrix"] },
  // 30 - Shading pattern: quarter filled progressing
  { category: "spatial", difficulty: 2,
    stem: svg(400,100,`${S.circle(50,50,25)}${`<path d="M50,50 L50,25 A25,25 0 0,1 75,50 Z" fill="#333"/>`}${S.circle(140,50,25)}${`<path d="M140,50 L140,25 A25,25 0 0,1 165,50 Z" fill="#333"/><path d="M140,50 L165,50 A25,25 0 0,1 140,75 Z" fill="#333"/>`}${S.circle(230,50,25)}${`<path d="M230,50 L230,25 A25,25 0 0,1 255,50 Z" fill="#333"/><path d="M230,50 L255,50 A25,25 0 0,1 230,75 Z" fill="#333"/><path d="M230,50 L230,75 A25,25 0 0,1 205,50 Z" fill="#333"/>`}${S.circle(320,50,25)}${qm(320,50)}`)+`<br/>The filled portion increases by one quarter each step. What does the 4th circle look like?`,
    options:[
      {label:"A",text:"Fully filled circle"},
      {label:"B",text:"Three-quarters filled"},
      {label:"C",text:"Half filled"},
      {label:"D",text:"One-quarter filled"},
      {label:"E",text:"Empty circle"},
    ], correctLabel:"A", tags:["sequence"] },
  // 31 - Arrow pointing at shapes: pattern
  { category: "spatial", difficulty: 2,
    stem: svg(400,100,`${S.arrow(40,30,180)}${S.circle(40,65,12)}${S.arrow(120,30,180)}${S.rect(108,55,24,24)}${S.arrow(200,30,180)}${S.tri(200,70,24)}${S.arrow(280,30,180)}${qm(280,70)}`)+`<br/>Each arrow points to a shape. Shapes cycle: circle, square, triangle, ... What comes next?`,
    options:[
      {label:"A",text:svg(60,60,S.circle(30,30,12))},
      {label:"B",text:svg(60,60,S.rect(18,18,24,24))},
      {label:"C",text:svg(60,60,S.tri(30,30,24))},
      {label:"D",text:svg(60,60,S.diamond(30,30,24))},
      {label:"E",text:svg(60,60,S.star(30,30,14,6))},
    ], correctLabel:"A", tags:["sequence"] },
  // 32 - Overlapping shapes count
  { category: "spatial", difficulty: 2,
    stem: svg(200,200,`${S.circle(80,80,50)}${S.circle(120,80,50)}${S.circle(100,120,50)}`)+`<br/>Three circles overlap. How many distinct regions are created?`,
    options:[
      {label:"A",text:"5"},
      {label:"B",text:"6"},
      {label:"C",text:"7"},
      {label:"D",text:"4"},
      {label:"E",text:"8"},
    ], correctLabel:"C", tags:["counting"] },
  // 33 - Sequence: shape gains one more inner element
  { category: "spatial", difficulty: 2,
    stem: svg(400,100,`${S.rect(10,10,70,70)}${S.cross(45,45,15)}${S.rect(100,10,70,70)}${S.cross(125,35,10)}${S.cross(145,55,10)}${S.rect(190,10,70,70)}${S.cross(210,30,8)}${S.cross(230,45,8)}${S.cross(215,60,8)}${S.rect(280,10,70,70)}${qm(315,45)}`)+`<br/>Each square has one more cross than the previous. How many crosses in the 4th square?`,
    options:[
      {label:"A",text:"3"},
      {label:"B",text:"4"},
      {label:"C",text:"5"},
      {label:"D",text:"2"},
      {label:"E",text:"6"},
    ], correctLabel:"B", tags:["sequence","counting"] },
  // 34 - Mirror image selection
  { category: "spatial", difficulty: 2,
    stem: svg(120,100,`${S.rect(10,10,40,80)}${S.circle(30,35,10,"#333")}${S.tri(30,70,16)}`)+`<br/>Which option is the mirror image of this figure?`,
    options:[
      {label:"A",text:svg(80,100,`${S.rect(30,10,40,80)}${S.circle(50,35,10,"#333")}${S.tri(50,70,16)}`)},
      {label:"B",text:svg(80,100,`${S.rect(30,10,40,80)}${S.circle(50,65,10,"#333")}${S.tri(50,30,16)}`)},
      {label:"C",text:svg(80,100,`${S.rect(30,10,40,80)}${S.circle(50,35,10)}${S.tri(50,70,16,"#333")}`)},
      {label:"D",text:svg(80,100,`<g transform="scale(-1,1) translate(-80,0)">${S.rect(10,10,40,80)}${S.circle(30,35,10,"#333")}${S.tri(30,70,16)}</g>`)},
      {label:"E",text:svg(80,100,`<g transform="rotate(180,40,50)">${S.rect(10,10,40,80)}${S.circle(30,35,10,"#333")}${S.tri(30,70,16)}</g>`)},
    ], correctLabel:"D", tags:["reflection"] },
  // 35 - Nested shapes: 3 levels deep changing
  { category: "spatial", difficulty: 2,
    stem: svg(400,100,`${S.circle(50,50,35)}${S.rect(30,30,40,40)}${S.circle(50,50,10,"#333")}${S.rect(125,15,70,70)}${S.circle(160,50,25)}${S.rect(145,35,30,30,"#333")}${S.circle(280,50,35)}${S.rect(260,30,40,40)}${qm(280,50)}`)+`<br/>Pattern: outer, middle, inner shapes cycle. What fills the innermost position?`,
    options:[
      {label:"A",text:svg(60,60,S.circle(30,30,10,"#333"))},
      {label:"B",text:svg(60,60,S.rect(20,20,20,20,"#333"))},
      {label:"C",text:svg(60,60,S.tri(30,30,16,"#333"))},
      {label:"D",text:svg(60,60,S.diamond(30,30,16,"#333"))},
      {label:"E",text:svg(60,60,S.circle(30,30,10))},
    ], correctLabel:"A", tags:["sequence"] },
  // 36 - Shape subtraction
  { category: "spatial", difficulty: 2,
    stem: `If you cut a circle out of the center of a square, how many edges does the remaining shape have?`,
    options:[
      {label:"A",text:"4 straight edges and 1 curved edge"},
      {label:"B",text:"5 edges"},
      {label:"C",text:"4 edges"},
      {label:"D",text:"8 edges"},
      {label:"E",text:"No edges"},
    ], correctLabel:"A", tags:["spatial-reasoning"] },
  // 37 - Increasing complexity: shapes gain elements
  { category: "spatial", difficulty: 2,
    stem: svg(400,100,`${S.circle(50,50,30)}${S.circle(140,50,30)}${S.dot(140,50)}${S.circle(230,50,30)}${S.dot(222,42)}${S.dot(238,58)}${S.circle(320,50,30)}${qm(320,50)}`)+`<br/>Each circle gains one more dot. How many dots in the last circle?`,
    options:[
      {label:"A",text:"2"},
      {label:"B",text:"3"},
      {label:"C",text:"4"},
      {label:"D",text:"1"},
      {label:"E",text:"0"},
    ], correctLabel:"B", tags:["sequence"] },
  // 38 - Odd one out: curved vs straight edges
  { category: "spatial", difficulty: 2,
    stem: svg(400,80,`${S.rect(10,15,50,50)}${S.tri(120,40,45)}${S.diamond(200,40,45)}${S.circle(280,40,25)}${S.pentagon(360,40,25)}`)+`<br/>Which shape does not belong based on edge type?`,
    options:[
      {label:"A",text:"1st (square)"},
      {label:"B",text:"2nd (triangle)"},
      {label:"C",text:"3rd (diamond)"},
      {label:"D",text:"4th (circle)"},
      {label:"E",text:"5th (pentagon)"},
    ], correctLabel:"D", tags:["odd-one-out"] },
  // 39 - Pattern: shapes split into halves
  { category: "spatial", difficulty: 2,
    stem: svg(400,100,`${S.circle(50,50,25,"#333")}${S.circle(140,50,25)}${`<path d="M140,25 A25,25 0 0,1 140,75" fill="#333"/>`}${S.circle(230,50,25)}${`<path d="M230,25 A25,25 0 0,1 230,75" fill="#333"/><path d="M230,25 A25,25 0 0,0 230,75" fill="#666"/>`}${qm(320,50)}`)+`<br/>The circle is progressively split. What happens next?`,
    options:[
      {label:"A",text:"Circle split into 3 equal sections with different shading"},
      {label:"B",text:"Circle split into 4 equal sections"},
      {label:"C",text:"Fully empty circle"},
      {label:"D",text:"Circle with a dot in center"},
      {label:"E",text:"Two separate semicircles"},
    ], correctLabel:"A", tags:["sequence"] },

  // ===== HARD (40-55) =====
  // 40 - 3x3 matrix: two rules (shape + fill + size)
  { category: "spatial", difficulty: 3,
    stem: svg(270,270,`${S.rect(5,5,80,80,"#eee","#ccc")}${S.circle(45,45,25,"#333")}${S.rect(95,5,80,80,"#eee","#ccc")}${S.circle(135,45,18,"#888")}${S.rect(185,5,80,80,"#eee","#ccc")}${S.circle(225,45,12)}${S.rect(5,95,80,80,"#eee","#ccc")}${S.rect(15,105,50,50,"#333")}${S.rect(95,95,80,80,"#eee","#ccc")}${S.rect(110,110,36,36,"#888")}${S.rect(185,95,80,80,"#eee","#ccc")}${S.rect(200,120,24,24)}${S.rect(5,185,80,80,"#eee","#ccc")}${S.tri(45,225,50,"#333")}${S.rect(95,185,80,80,"#eee","#ccc")}${S.tri(135,225,36,"#888")}${S.rect(185,185,80,80,"#eee","#ccc")}${qm(225,225)}`)+`<br/>Complete the 3×3 grid.`,
    options:[
      {label:"A",text:svg(60,60,S.tri(30,35,24))},
      {label:"B",text:svg(60,60,S.tri(30,35,24,"#333"))},
      {label:"C",text:svg(60,60,S.tri(30,35,24,"#888"))},
      {label:"D",text:svg(60,60,S.circle(30,30,12))},
      {label:"E",text:svg(60,60,S.rect(15,15,30,30))},
    ], correctLabel:"A", tags:["matrix"] },
  // 41 - Complex rotation: two elements rotate independently
  { category: "spatial", difficulty: 3,
    stem: svg(400,100,`${S.circle(50,50,30)}${S.dot(50,25)}${S.line(50,50,75,50)}${S.circle(150,50,30)}${S.dot(75,50)}${S.line(150,50,150,75)}${S.circle(250,50,30)}${S.dot(250,75)}${S.line(250,50,225,50)}${S.circle(350,50,30)}${qm(350,50)}`)+`<br/>The dot rotates 90° clockwise. The line rotates 90° clockwise. What does the 4th look like?`,
    options:[
      {label:"A",text:svg(80,80,`${S.circle(40,40,30)}${S.dot(25,40)}${S.line(40,40,40,15)}`)},
      {label:"B",text:svg(80,80,`${S.circle(40,40,30)}${S.dot(40,15)}${S.line(40,40,65,40)}`)},
      {label:"C",text:svg(80,80,`${S.circle(40,40,30)}${S.dot(55,40)}${S.line(40,40,40,65)}`)},
      {label:"D",text:svg(80,80,`${S.circle(40,40,30)}${S.dot(40,65)}${S.line(40,40,15,40)}`)},
      {label:"E",text:svg(80,80,`${S.circle(40,40,30)}${S.dot(25,40)}${S.line(40,40,40,65)}`)},
    ], correctLabel:"A", tags:["sequence","rotation"] },
  // 42 - Compound transformation: reflect + rotate
  { category: "spatial", difficulty: 3,
    stem: svg(100,100,`${S.rect(10,10,80,80)}${S.tri(30,30,20,"#333")}${S.circle(65,65,10)}`)+`<br/>If this figure is reflected horizontally and then rotated 90° clockwise, what does it look like?`,
    options:[
      {label:"A",text:svg(80,80,`${S.rect(5,5,70,70)}${S.tri(55,25,20,"#333")}${S.circle(20,55,10)}`)},
      {label:"B",text:svg(80,80,`${S.rect(5,5,70,70)}${S.tri(25,55,20,"#333")}${S.circle(55,20,10)}`)},
      {label:"C",text:svg(80,80,`${S.rect(5,5,70,70)}${S.tri(55,55,20,"#333")}${S.circle(20,20,10)}`)},
      {label:"D",text:svg(80,80,`${S.rect(5,5,70,70)}${S.tri(25,25,20,"#333")}${S.circle(55,55,10)}`)},
      {label:"E",text:svg(80,80,`${S.rect(5,5,70,70)}${S.circle(25,55,10,"#333")}${S.tri(55,25,20)}`)},
    ], correctLabel:"B", tags:["transformation"] },
  // 43 - 3x3 matrix: XOR fill pattern
  { category: "spatial", difficulty: 3,
    stem: svg(270,270,`${S.rect(5,5,80,80,"#eee","#ccc")}${S.circle(45,30,10,"#333")}${S.circle(45,60,10)}${S.rect(95,5,80,80,"#eee","#ccc")}${S.circle(135,30,10)}${S.circle(135,60,10,"#333")}${S.rect(185,5,80,80,"#eee","#ccc")}${S.circle(225,30,10,"#333")}${S.circle(225,60,10,"#333")}${S.rect(5,95,80,80,"#eee","#ccc")}${S.circle(45,120,10)}${S.circle(45,150,10,"#333")}${S.rect(95,95,80,80,"#eee","#ccc")}${S.circle(135,120,10,"#333")}${S.circle(135,150,10)}${S.rect(185,95,80,80,"#eee","#ccc")}${S.circle(225,120,10,"#333")}${S.circle(225,150,10,"#333")}${S.rect(5,185,80,80,"#eee","#ccc")}${S.circle(45,210,10,"#333")}${S.circle(45,240,10,"#333")}${S.rect(95,185,80,80,"#eee","#ccc")}${S.circle(135,210,10,"#333")}${S.circle(135,240,10,"#333")}${S.rect(185,185,80,80,"#eee","#ccc")}${qm(225,225)}`)+`<br/>Each row: if two circles in column share fill, the third differs. Complete the grid.`,
    options:[
      {label:"A",text:svg(60,60,`${S.circle(30,20,10)}${S.circle(30,45,10)}`)},
      {label:"B",text:svg(60,60,`${S.circle(30,20,10,"#333")}${S.circle(30,45,10)}`)},
      {label:"C",text:svg(60,60,`${S.circle(30,20,10)}${S.circle(30,45,10,"#333")}`)},
      {label:"D",text:svg(60,60,`${S.circle(30,20,10,"#333")}${S.circle(30,45,10,"#333")}`)},
      {label:"E",text:svg(60,60,S.circle(30,30,10,"#333"))},
    ], correctLabel:"A", tags:["matrix"] },
  // 44 - Cube net identification
  { category: "spatial", difficulty: 3,
    stem: `A cube has these faces: top=star, bottom=circle, front=square, back=triangle, left=diamond, right=hexagon. If you look at the cube from the front-right-top corner, which three faces do you see?`,
    options:[
      {label:"A",text:"Square, hexagon, star"},
      {label:"B",text:"Square, diamond, star"},
      {label:"C",text:"Triangle, hexagon, circle"},
      {label:"D",text:"Square, hexagon, circle"},
      {label:"E",text:"Triangle, diamond, star"},
    ], correctLabel:"A", tags:["spatial-reasoning"] },
  // 45 - Series with two changing variables
  { category: "spatial", difficulty: 3,
    stem: svg(450,100,`${S.circle(40,50,15)}${S.dot(40,50)}${S.rect(80,35,30,30)}${S.dot(95,42)}${S.dot(95,58)}${S.tri(155,50,30)}${S.dot(148,48)}${S.dot(162,48)}${S.dot(155,60)}${S.diamond(225,50,30)}${S.dot(215,45)}${S.dot(235,45)}${S.dot(215,55)}${S.dot(235,55)}${qm(310,50)}`)+`<br/>Shape sides increase by 1, dots increase by 1. What comes next?`,
    options:[
      {label:"A",text:svg(60,60,`${S.pentagon(30,30,18)}${S.dot(22,22)}${S.dot(38,22)}${S.dot(18,35)}${S.dot(42,35)}${S.dot(30,45)}`)},
      {label:"B",text:svg(60,60,`${S.pentagon(30,30,18)}${S.dot(22,22)}${S.dot(38,22)}${S.dot(22,38)}${S.dot(38,38)}`)},
      {label:"C",text:svg(60,60,`${S.hexagon(30,30,18)}${S.dot(22,22)}${S.dot(38,22)}${S.dot(18,35)}${S.dot(42,35)}${S.dot(30,45)}`)},
      {label:"D",text:svg(60,60,`${S.circle(30,30,18)}${S.dot(22,22)}${S.dot(38,22)}${S.dot(18,35)}${S.dot(42,35)}${S.dot(30,45)}`)},
      {label:"E",text:svg(60,60,`${S.pentagon(30,30,18)}${S.dot(30,30)}`)},
    ], correctLabel:"A", tags:["sequence"] },
  // 46 - Paper folding: punch hole
  { category: "spatial", difficulty: 3,
    stem: `A square paper is folded in half vertically (left side folds onto right), then a hole is punched through the center of the folded paper. When unfolded, how many holes are there and where?`,
    options:[
      {label:"A",text:"2 holes, symmetric about the vertical center line"},
      {label:"B",text:"1 hole in the center"},
      {label:"C",text:"2 holes, symmetric about the horizontal center line"},
      {label:"D",text:"4 holes, one in each quadrant"},
      {label:"E",text:"2 holes, both on the right side"},
    ], correctLabel:"A", tags:["spatial-reasoning"] },
  // 47 - Complex odd one out: rotation symmetry
  { category: "spatial", difficulty: 3,
    stem: svg(500,100,`${S.rect(5,10,70,70)}${S.dot(25,30)}${S.dot(55,60)}${S.rect(95,10,70,70)}${S.dot(115,30)}${S.dot(145,60)}${S.rect(185,10,70,70)}${S.dot(205,60)}${S.dot(235,30)}${S.rect(275,10,70,70)}${S.dot(295,30)}${S.dot(325,60)}${S.rect(365,10,70,70)}${S.dot(385,35)}${S.dot(415,55)}`)+`<br/>Four squares have 180° rotational symmetry with their dots. One does not. Which one?`,
    options:[
      {label:"A",text:"1st"},
      {label:"B",text:"2nd"},
      {label:"C",text:"3rd"},
      {label:"D",text:"4th"},
      {label:"E",text:"5th"},
    ], correctLabel:"E", tags:["odd-one-out","symmetry"] },
  // 48 - 3x3 matrix: count elements per cell
  { category: "spatial", difficulty: 3,
    stem: svg(270,270,`${S.rect(5,5,80,80,"#eee","#ccc")}${S.dot(25,30)}${S.dot(45,30)}${S.dot(65,30)}${S.rect(95,5,80,80,"#eee","#ccc")}${S.dot(135,30)}${S.rect(185,5,80,80,"#eee","#ccc")}${S.dot(205,30)}${S.dot(225,30)}${S.rect(5,95,80,80,"#eee","#ccc")}${S.dot(45,120)}${S.rect(95,95,80,80,"#eee","#ccc")}${S.dot(125,120)}${S.dot(145,120)}${S.rect(185,95,80,80,"#eee","#ccc")}${S.dot(215,120)}${S.dot(225,130)}${S.dot(205,130)}${S.rect(5,185,80,80,"#eee","#ccc")}${S.dot(25,210)}${S.dot(45,210)}${S.rect(95,185,80,80,"#eee","#ccc")}${S.dot(125,210)}${S.dot(135,220)}${S.dot(145,210)}${S.rect(185,185,80,80,"#eee","#ccc")}${qm(225,225)}`)+`<br/>Each row sums to 6 dots. How many dots in the missing cell?`,
    options:[
      {label:"A",text:"1"},
      {label:"B",text:"2"},
      {label:"C",text:"3"},
      {label:"D",text:"4"},
      {label:"E",text:"0"},
    ], correctLabel:"A", tags:["matrix","counting"] },
  // 49 - Perspective: top view identification
  { category: "spatial", difficulty: 3,
    stem: `Three cubes are stacked: two on the ground side by side, one on top of the left cube. What does the arrangement look like from directly above?`,
    options:[
      {label:"A",text:"Two squares side by side (the top cube is hidden behind the left one from above)"},
      {label:"B",text:"Three squares in an L shape"},
      {label:"C",text:"Two squares side by side (top cube aligns with left square from above)"},
      {label:"D",text:"Three squares in a row"},
      {label:"E",text:"One large square"},
    ], correctLabel:"C", tags:["spatial-reasoning"] },
  // 50 - Double rotation sequence: inner and outer
  { category: "spatial", difficulty: 3,
    stem: svg(400,100,`${S.rect(15,15,60,60)}${S.dot(25,25)}${S.rect(110,15,60,60)}${S.dot(160,25)}${S.rect(210,15,60,60)}${S.dot(260,65)}${S.rect(310,15,60,60)}${qm(335,45)}`)+`<br/>The dot moves clockwise to the next corner. Where is the dot in the 4th square?`,
    options:[
      {label:"A",text:"Bottom-left corner"},
      {label:"B",text:"Top-left corner"},
      {label:"C",text:"Top-right corner"},
      {label:"D",text:"Bottom-right corner"},
      {label:"E",text:"Center"},
    ], correctLabel:"A", tags:["sequence","rotation"] },
  // 51 - Complex matrix: 3 independent rules
  { category: "spatial", difficulty: 3,
    stem: svg(270,270,`${S.rect(5,5,80,80,"#eee","#ccc")}${S.circle(45,45,20,"#333")}${S.line(25,25,65,65)}${S.rect(95,5,80,80,"#eee","#ccc")}${S.rect(115,25,40,40)}${S.line(135,25,135,65)}${S.rect(185,5,80,80,"#eee","#ccc")}${S.tri(225,45,40,"#888")}${S.line(205,65,245,25)}${S.rect(5,95,80,80,"#eee","#ccc")}${S.rect(15,115,40,40,"#333")}${S.line(35,105,35,165)}${S.rect(95,95,80,80,"#eee","#ccc")}${S.tri(135,135,40)}${S.line(115,155,155,115)}${S.rect(185,95,80,80,"#eee","#ccc")}${S.circle(225,135,20,"#888")}${S.line(205,115,245,155)}${S.rect(5,185,80,80,"#eee","#ccc")}${S.tri(45,225,40,"#333")}${S.line(25,245,65,205)}${S.rect(95,185,80,80,"#eee","#ccc")}${S.circle(135,225,20)}${S.line(115,205,155,245)}${S.rect(185,185,80,80,"#eee","#ccc")}${qm(225,225)}`)+`<br/>3 rules: shape cycles (circle→square→triangle), fill cycles (dark→outline→gray), line direction cycles. Complete the grid.`,
    options:[
      {label:"A",text:svg(60,60,`${S.rect(10,10,40,40,"#888")}${S.line(10,50,50,10)}`)},
      {label:"B",text:svg(60,60,`${S.rect(10,10,40,40,"#333")}${S.line(10,10,50,50)}`)},
      {label:"C",text:svg(60,60,`${S.tri(30,30,40,"#888")}${S.line(10,50,50,10)}`)},
      {label:"D",text:svg(60,60,`${S.rect(10,10,40,40)}${S.line(30,10,30,50)}`)},
      {label:"E",text:svg(60,60,`${S.circle(30,30,20,"#888")}${S.line(10,10,50,50)}`)},
    ], correctLabel:"A", tags:["matrix"] },
  // 52 - Hidden pattern: which piece completes the puzzle
  { category: "spatial", difficulty: 3,
    stem: svg(200,200,`${S.rect(5,5,190,190)}${S.line(100,5,100,195)}${S.line(5,100,195,100)}${S.circle(50,50,30,"#333")}${S.tri(150,50,50)}${S.rect(20,120,60,60,"#888")}${qm(150,150)}`)+`<br/>Top-left: filled circle. Top-right: outline triangle. Bottom-left: gray square. What goes in bottom-right?`,
    options:[
      {label:"A",text:svg(60,60,S.diamond(30,30,40))},
      {label:"B",text:svg(60,60,S.diamond(30,30,40,"#333"))},
      {label:"C",text:svg(60,60,S.tri(30,30,40,"#888"))},
      {label:"D",text:svg(60,60,S.circle(30,30,20))},
      {label:"E",text:svg(60,60,S.rect(10,10,40,40,"#333"))},
    ], correctLabel:"A", tags:["matrix"] },
  // 53 - Paper folding complex
  { category: "spatial", difficulty: 3,
    stem: `A square paper is folded in half horizontally (top folds down), then in half vertically (left folds right). A corner is cut from the bottom-right of the folded piece. When fully unfolded, what shape is cut out?`,
    options:[
      {label:"A",text:"A diamond/rhombus shape in the center"},
      {label:"B",text:"Four triangles, one in each corner"},
      {label:"C",text:"Four triangles, one in the center of each edge"},
      {label:"D",text:"One triangle in the bottom-right corner only"},
      {label:"E",text:"A square hole in the center"},
    ], correctLabel:"A", tags:["spatial-reasoning"] },
  // 54 - Sequence: 3 properties change simultaneously
  { category: "spatial", difficulty: 3,
    stem: svg(450,100,`${S.circle(40,50,12)}${S.circle(40,50,22)}${S.dot(40,28)}${S.rect(95,30,30,30)}${S.rect(85,20,50,50)}${S.dot(110,20)}${S.dot(110,70)}${S.tri(190,50,30)}${S.tri(190,50,50)}${S.dot(190,25)}${S.dot(175,65)}${S.dot(205,65)}${qm(300,50)}`)+`<br/>Outer shape changes (3→4→5 sides), inner mirrors outer, dots = shape number - 2. What comes next?`,
    options:[
      {label:"A",text:svg(80,80,`${S.diamond(40,40,20)}${S.diamond(40,40,35)}${S.dot(40,15)}${S.dot(20,40)}${S.dot(60,40)}${S.dot(40,65)}`)},
      {label:"B",text:svg(80,80,`${S.diamond(40,40,20)}${S.diamond(40,40,35)}${S.dot(40,15)}${S.dot(40,65)}`)},
      {label:"C",text:svg(80,80,`${S.pentagon(40,40,15)}${S.pentagon(40,40,25)}${S.dot(30,20)}${S.dot(50,20)}${S.dot(20,45)}`)},
      {label:"D",text:svg(80,80,`${S.rect(20,20,40,40)}${S.rect(10,10,60,60)}${S.dot(40,10)}${S.dot(40,70)}`)},
      {label:"E",text:svg(80,80,`${S.diamond(40,40,20)}${S.diamond(40,40,35)}${S.dot(40,15)}${S.dot(20,40)}`)},
    ], correctLabel:"B", tags:["sequence"] },
  // 55 - Mental rotation: which is the same shape rotated
  { category: "spatial", difficulty: 3,
    stem: svg(120,120,`${S.rect(10,30,40,60)}${S.tri(70,30,30,"#333")}${S.dot(30,45)}`)+`<br/>Which option shows this same figure rotated 180°?`,
    options:[
      {label:"A",text:svg(120,120,`${S.rect(70,30,40,60)}${S.tri(50,90,30,"#333")}${S.dot(90,75)}`)},
      {label:"B",text:svg(120,120,`${S.rect(70,30,40,60)}${S.tri(50,30,30,"#333")}${S.dot(90,45)}`)},
      {label:"C",text:svg(120,120,`<g transform="rotate(180,60,60)">${S.rect(10,30,40,60)}${S.tri(70,30,30,"#333")}${S.dot(30,45)}</g>`)},
      {label:"D",text:svg(120,120,`${S.rect(10,30,40,60)}${S.tri(70,90,30,"#333")}${S.dot(30,75)}`)},
      {label:"E",text:svg(120,120,`${S.circle(60,60,30)}${S.tri(60,30,30,"#333")}${S.dot(60,70)}`)},
    ], correctLabel:"C", tags:["rotation"] },
];
