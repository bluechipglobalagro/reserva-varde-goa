const fs = require('fs');

const C = {
  forest: "#1F3A2E",
  forestDeep: "#16291F",
  gold: "#B08A3E",
  goldLight: "#D4B66A",
  ivory: "#FBF8F1",
  beige: "#F4EDDD",
  beigeWarm: "#E8DFC4",
  charcoal: "#2A2A2A",
  line: "#C7B97A",
  white: "#FFFFFF",
  plantation: "#2E5944",
  plantationLight: "#3F7257",
  water: "#7FA9C9",
  driveway: "#D9CDA8",
  path: "#E8DFC4",
  container: "#FBF8F1",
  containerStroke: "#1F3A2E",
  deck: "#C9B07A",
  pergola: "#8B6F3A"
};

function header(W,H){
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" font-family="Georgia, 'Times New Roman', serif">
<defs>
  <pattern id="plantHatch" patternUnits="userSpaceOnUse" width="14" height="14" patternTransform="rotate(45)">
    <rect width="14" height="14" fill="${C.plantation}"/>
    <line x1="0" y1="0" x2="0" y2="14" stroke="${C.plantationLight}" stroke-width="1.5" opacity="0.45"/>
  </pattern>
  <pattern id="plantHatch2" patternUnits="userSpaceOnUse" width="20" height="20">
    <rect width="20" height="20" fill="${C.plantation}"/>
    <circle cx="5" cy="5" r="2" fill="${C.plantationLight}" opacity="0.6"/>
    <circle cx="15" cy="15" r="2.5" fill="${C.plantationLight}" opacity="0.55"/>
    <circle cx="15" cy="5" r="1.6" fill="${C.plantationLight}" opacity="0.45"/>
    <circle cx="5" cy="15" r="1.6" fill="${C.plantationLight}" opacity="0.45"/>
  </pattern>
  <pattern id="drivewayPat" patternUnits="userSpaceOnUse" width="8" height="8">
    <rect width="8" height="8" fill="${C.driveway}"/>
    <circle cx="2" cy="2" r="0.6" fill="#A89870"/>
    <circle cx="6" cy="6" r="0.6" fill="#A89870"/>
  </pattern>
  <pattern id="bufferPat" patternUnits="userSpaceOnUse" width="22" height="22">
    <rect width="22" height="22" fill="${C.forest}"/>
    <circle cx="11" cy="11" r="6" fill="${C.plantationLight}" opacity="0.55"/>
    <circle cx="11" cy="11" r="3.5" fill="${C.forestDeep}" opacity="0.7"/>
  </pattern>
  <pattern id="waterPat" patternUnits="userSpaceOnUse" width="10" height="10">
    <rect width="10" height="10" fill="${C.water}"/>
    <path d="M0 5 Q 2.5 3, 5 5 T 10 5" stroke="${C.ivory}" stroke-width="0.6" fill="none" opacity="0.7"/>
  </pattern>
  <linearGradient id="cardShadow" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="${C.charcoal}" stop-opacity="0.18"/>
    <stop offset="1" stop-color="${C.charcoal}" stop-opacity="0"/>
  </linearGradient>
</defs>
`;
}

function rect(x,y,w,h,opts={}){
  const fill = opts.fill || "none";
  const stroke = opts.stroke || "none";
  const sw = opts.sw || 0;
  const rx = opts.rx || 0;
  const opa = opts.opacity != null ? ` opacity="${opts.opacity}"` : "";
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}" rx="${rx}"${opa}/>`;
}
function text(x,y,t,opts={}){
  const fill = opts.fill || C.charcoal;
  const size = opts.size || 12;
  const weight = opts.bold ? "700" : "400";
  const anchor = opts.anchor || "start";
  const italic = opts.italic ? ' font-style="italic"' : "";
  const letter = opts.letter || 0;
  return `<text x="${x}" y="${y}" fill="${fill}" font-size="${size}" font-weight="${weight}" text-anchor="${anchor}" letter-spacing="${letter}"${italic}>${t}</text>`;
}
function line(x1,y1,x2,y2,opts={}){
  const stroke = opts.stroke || C.charcoal;
  const sw = opts.sw || 1;
  const dash = opts.dash ? ` stroke-dasharray="${opts.dash}"` : "";
  return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${stroke}" stroke-width="${sw}"${dash}/>`;
}
function tree(cx, cy, r, opts={}){
  const f = opts.fill || C.plantationLight;
  const s = opts.stroke || C.forestDeep;
  return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${f}" stroke="${s}" stroke-width="0.6" opacity="0.85"/>`;
}
function dot(cx,cy,r,fill){ return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}"/>`; }

function northArrow(x,y){
  return `<g transform="translate(${x},${y})">
    <circle cx="0" cy="0" r="22" fill="${C.ivory}" stroke="${C.forest}" stroke-width="1.2"/>
    <polygon points="0,-18 6,8 0,3 -6,8" fill="${C.forest}"/>
    <polygon points="0,-18 0,3 -6,8" fill="${C.gold}"/>
    <text x="0" y="-26" text-anchor="middle" fill="${C.forest}" font-size="11" font-weight="700">N</text>
  </g>`;
}
function scaleBar(x,y,scale){
  // scale = px per ft; show 0, 20, 40, 60 ft
  const seg = 20 * scale;
  return `<g transform="translate(${x},${y})">
    <rect x="0" y="0" width="${seg}" height="6" fill="${C.forest}" stroke="${C.forest}"/>
    <rect x="${seg}" y="0" width="${seg}" height="6" fill="${C.ivory}" stroke="${C.forest}"/>
    <rect x="${2*seg}" y="0" width="${seg}" height="6" fill="${C.forest}" stroke="${C.forest}"/>
    <text x="0" y="22" fill="${C.charcoal}" font-size="10" text-anchor="middle">0</text>
    <text x="${seg}" y="22" fill="${C.charcoal}" font-size="10" text-anchor="middle">20</text>
    <text x="${2*seg}" y="22" fill="${C.charcoal}" font-size="10" text-anchor="middle">40</text>
    <text x="${3*seg}" y="22" fill="${C.charcoal}" font-size="10" text-anchor="middle">60 ft</text>
  </g>`;
}

function labelBlock(x, y, model, area){
  return `<g transform="translate(${x},${y})">
    <rect x="0" y="0" width="270" height="74" fill="${C.ivory}" stroke="${C.gold}" stroke-width="1.5" rx="4"/>
    <text x="14" y="22" fill="${C.forest}" font-size="13" font-weight="700" letter-spacing="2">RESERVA VERDE GOA</text>
    <line x1="14" y1="30" x2="256" y2="30" stroke="${C.gold}" stroke-width="0.8"/>
    <text x="14" y="48" fill="${C.charcoal}" font-size="12" font-weight="700">${model}</text>
    <text x="14" y="65" fill="${C.charcoal}" font-size="11" font-style="italic">${area}  ·  1 Acre Plantation Estate</text>
  </g>`;
}

function legend(x, y, items){
  let out = `<g transform="translate(${x},${y})">
    <rect x="0" y="0" width="200" height="${20 + items.length * 18}" fill="${C.ivory}" stroke="${C.gold}" stroke-width="1" rx="4" opacity="0.97"/>
    <text x="12" y="16" fill="${C.forest}" font-size="11" font-weight="700">LEGEND</text>`;
  items.forEach((it, i) => {
    const yy = 20 + 18 + i * 18 - 4;
    out += `<rect x="12" y="${yy - 10}" width="14" height="10" fill="${it.fill}" stroke="${it.stroke || C.charcoal}" stroke-width="0.6"/>`;
    out += `<text x="32" y="${yy - 1}" fill="${C.charcoal}" font-size="10">${it.label}</text>`;
  });
  out += `</g>`;
  return out;
}

// Common canvas
const W = 1200, H = 900;

// Plot area: 1 acre = ~208x208 ft. Use plotPx = 700, so 1 ft = 3.365 px.
const plotPx = 700;
const px0 = 80, py0 = 110;  // top-left of plot
const ftToPx = plotPx / 208;

function ft(v){ return v * ftToPx; }

function bufferAndPlantation(){
  // outer plot
  let out = "";
  // buffer band (12 ft wide green band inside boundary)
  const bufW = ft(12);
  // outer boundary
  out += rect(px0, py0, plotPx, plotPx, { fill: "url(#bufferPat)", stroke: C.forest, sw: 2.5 });
  // inner plantation area
  return out;
}

function plotChrome(modelName, areaLabel){
  return `
${rect(0,0,W,H, { fill: C.beige })}
${rect(20,20,W-40,H-40, { fill: C.ivory, stroke: C.line, sw: 1, rx: 8 })}
${text(W/2, 60, "RESERVA VERDE GOA · 1-ACRE SITE PLAN", { fill: C.forest, size: 18, bold: true, anchor:"middle", letter: 3 })}
${text(W/2, 82, modelName + "  ·  " + areaLabel + "  ·  1 Acre Eco-Plantation Estate", { fill: C.gold, size: 13, italic: true, anchor: "middle" })}
${line(60, 95, W-60, 95, { stroke: C.gold, sw: 0.6 })}
`;
}

function commonGate(plotCx){
  // gate + access road on south edge
  const py1 = py0 + plotPx;
  let out = "";
  // access road
  out += rect(40, py1 + 20, W - 80, 26, { fill: "#3A3A3A" });
  out += `<text x="${W/2}" y="${py1 + 38}" text-anchor="middle" fill="${C.ivory}" font-size="10" font-style="italic" letter-spacing="2">ACCESS ROAD</text>`;
  // gate
  const gateW = 60;
  out += rect(plotCx - gateW/2, py1 - 6, gateW, 12, { fill: C.gold, stroke: C.forest, sw: 1.5 });
  out += text(plotCx, py1 + 16, "GATE", { fill: C.forest, size: 11, bold: true, anchor: "middle", letter: 1 });
  return out;
}

// =================== 2BHK ===================
function svg2BHK(){
  let s = header(W,H);
  s += plotChrome("2BHK · Compact Luxury Modular Eco Estate", "2,500 Sq.Ft Built-up");

  const plotCx = px0 + plotPx/2;
  const plotCy = py0 + plotPx/2;

  // outer buffer (whole plot)
  s += rect(px0, py0, plotPx, plotPx, { fill: "url(#bufferPat)", stroke: C.forest, sw: 2.5, rx: 4 });

  // plantation (inset 28 ft from boundary)
  const inset = ft(28);
  s += rect(px0+inset, py0+inset, plotPx-2*inset, plotPx-2*inset, { fill: "url(#plantHatch2)", stroke: C.forestDeep, sw: 1.2 });
  s += text(px0 + plotPx - inset - 12, py0 + inset + 22, "PLANTATION  CASHEW · MANGO · COCONUT · SPICE", { fill: C.ivory, size: 11, bold: true, anchor: "end", letter: 1 });

  // driveway from gate
  const drivW = ft(12);
  const drivYStart = py0 + plotPx;
  s += rect(plotCx - drivW/2, drivYStart - ft(36), drivW, ft(36), { fill: "url(#drivewayPat)", stroke: C.beigeWarm, sw: 0.5 });
  // parking
  const parkX = plotCx + ft(8), parkY = drivYStart - ft(72);
  s += rect(parkX, parkY, ft(20), ft(36), { fill: C.driveway, stroke: C.charcoal, sw: 0.6 });
  s += text(parkX + ft(10), parkY + ft(18), "P", { fill: C.charcoal, size: 12, bold: true, anchor: "middle" });
  s += text(parkX + ft(10), parkY + ft(30), "2 cars", { fill: C.charcoal, size: 8, anchor: "middle" });

  // home: U-shape courtyard, 4 x 40ft + 2 x 20ft
  // Place home around plot center, slightly south
  const homeCx = plotCx;
  const homeCy = plotCy + ft(8);
  // 40ft container = 40 x 8 ft
  const C40W = ft(40), C40H = ft(8);
  const C20W = ft(20);
  const courtSide = ft(22);

  // Top container (E-W): living
  s += rect(homeCx - C40W/2, homeCy - courtSide/2 - C40H, C40W, C40H,
    { fill: C.container, stroke: C.containerStroke, sw: 1.4 });
  s += text(homeCx, homeCy - courtSide/2 - C40H/2 + 3, "LIVING (40 ft module)", { size:10, bold:true, anchor:"middle", fill: C.forest });

  // Left container (N-S): Master BR
  s += rect(homeCx - C40W/2 - C40H, homeCy - C40W/2, C40H, C40W,
    { fill: C.container, stroke: C.containerStroke, sw: 1.4 });
  s += `<g transform="translate(${homeCx - C40W/2 - C40H/2}, ${homeCy}) rotate(-90)"><text text-anchor="middle" font-size="10" font-weight="700" fill="${C.forest}">MASTER BR</text></g>`;

  // Right container (N-S): BR2 + Kitchen
  s += rect(homeCx + C40W/2, homeCy - C40W/2, C40H, C40W,
    { fill: C.container, stroke: C.containerStroke, sw: 1.4 });
  s += `<g transform="translate(${homeCx + C40W/2 + C40H/2}, ${homeCy - C40W/4}) rotate(-90)"><text text-anchor="middle" font-size="10" font-weight="700" fill="${C.forest}">BR 2</text></g>`;
  s += `<g transform="translate(${homeCx + C40W/2 + C40H/2}, ${homeCy + C40W/4}) rotate(-90)"><text text-anchor="middle" font-size="10" font-weight="700" fill="${C.forest}">KITCHEN</text></g>`;

  // Bottom container (E-W): Dining + family lounge
  s += rect(homeCx - C40W/2, homeCy + C40W/2 - C40H/2, C40W, C40H,
    { fill: C.container, stroke: C.containerStroke, sw: 1.4 });
  s += text(homeCx, homeCy + C40W/2 - C40H/2 + C40H/2 + 3, "DINING / FAMILY LOUNGE", { size:10, bold:true, anchor:"middle", fill: C.forest });

  // 20ft modules: utility + powder
  s += rect(homeCx - C40W/2 - C40H - C20W, homeCy - C40H/2, C20W, C40H, { fill: C.beigeWarm, stroke: C.containerStroke, sw: 1.2, opacity: 0.95 });
  s += text(homeCx - C40W/2 - C40H - C20W/2, homeCy + 4, "UTILITY", { size: 9, bold: true, anchor: "middle", fill: C.forest });
  s += rect(homeCx + C40W/2 + C40H, homeCy - C40H - C40H, C20W, C40H, { fill: C.beigeWarm, stroke: C.containerStroke, sw: 1.2, opacity: 0.95 });
  s += text(homeCx + C40W/2 + C40H + C20W/2, homeCy - C40H - C40H/2 + 3, "POWDER", { size: 9, bold: true, anchor: "middle", fill: C.forest });

  // Courtyard
  const courtW = C40W, courtH = C40W - 2*C40H;
  s += rect(homeCx - courtW/2, homeCy - courtH/2 + ft(0.5), courtW, courtH - ft(1),
    { fill: C.beigeWarm, stroke: C.gold, sw: 1, opacity: 0.9 });
  s += text(homeCx, homeCy + 2, "COURTYARD", { size: 10, bold: true, anchor: "middle", fill: C.gold, letter: 1 });
  // small water feature dot
  s += `<circle cx="${homeCx}" cy="${homeCy + 14}" r="8" fill="${C.water}" stroke="${C.forest}" stroke-width="0.6"/>`;

  // Verandah (front of home, facing south = front)
  s += rect(homeCx - C40W/2 - ft(2), homeCy + C40W/2 + C40H/2 + 1, C40W + ft(4), ft(8),
    { fill: C.deck, stroke: C.pergola, sw: 0.9, opacity: 0.9 });
  s += text(homeCx, homeCy + C40W/2 + C40H/2 + ft(5), "COVERED VERANDAH", { size: 9, bold: true, anchor: "middle", fill: C.charcoal, letter: 1 });

  // Outdoor sit-out / yoga lawn behind home (north)
  s += rect(homeCx - ft(28), homeCy - C40W/2 - C40H - ft(28), ft(56), ft(20),
    { fill: "#D4D8B6", stroke: C.plantationLight, sw: 0.8 });
  s += text(homeCx, homeCy - C40W/2 - C40H - ft(18), "YOGA LAWN · FIREPIT · SIT-OUT", { size: 10, bold: true, anchor: "middle", fill: C.forest, letter: 1 });

  // Sustainability icons (NE corner)
  // RWH tank
  s += `<circle cx="${px0 + plotPx - ft(20)}" cy="${py0 + ft(22)}" r="10" fill="${C.water}" stroke="${C.forest}" stroke-width="1"/>`;
  s += text(px0 + plotPx - ft(20), py0 + ft(34), "RWH", { size: 9, bold: true, anchor: "middle", fill: C.forest });
  // recharge pit
  s += `<rect x="${px0 + plotPx - ft(40)}" y="${py0 + ft(15)}" width="14" height="14" fill="${C.beigeWarm}" stroke="${C.forest}" stroke-width="1"/>`;
  s += text(px0 + plotPx - ft(40) + 7, py0 + ft(40), "RP", { size: 8, bold: true, anchor: "middle", fill: C.forest });
  // bio-septic
  s += `<rect x="${px0 + ft(15)}" y="${py0 + ft(15)}" width="18" height="12" fill="${C.beige}" stroke="${C.forest}" stroke-width="1"/>`;
  s += text(px0 + ft(15) + 9, py0 + ft(28), "BIO-SEPTIC", { size: 8, bold: true, anchor: "middle", fill: C.forest });
  // composting (SE)
  s += `<rect x="${px0 + ft(15)}" y="${py0 + plotPx - ft(30)}" width="20" height="12" fill="${C.gold}" opacity="0.7" stroke="${C.forest}" stroke-width="0.8"/>`;
  s += text(px0 + ft(15) + 10, py0 + plotPx - ft(20), "COMPOST", { size: 8, bold: true, anchor: "middle", fill: C.forest });
  // solar/utility shed (SW)
  s += `<rect x="${px0 + plotPx - ft(45)}" y="${py0 + plotPx - ft(35)}" width="28" height="14" fill="${C.beigeWarm}" stroke="${C.forest}" stroke-width="1"/>`;
  s += text(px0 + plotPx - ft(45) + 14, py0 + plotPx - ft(25), "SOLAR / UTIL", { size: 8, bold: true, anchor: "middle", fill: C.forest });

  // Walking path loop (dotted)
  const pathInset = ft(20);
  s += `<rect x="${px0+pathInset}" y="${py0+pathInset}" width="${plotPx-2*pathInset}" height="${plotPx-2*pathInset}" fill="none" stroke="${C.path}" stroke-width="3" stroke-dasharray="2,4" opacity="0.7"/>`;

  // commonGate
  s += commonGate(plotCx);

  // Drop a scatter of trees
  const trees = [];
  for (let i = 0; i < 28; i++){
    const tx = px0 + ft(20) + Math.random() * (plotPx - ft(40));
    const ty = py0 + ft(20) + Math.random() * (plotPx - ft(40));
    // avoid home rectangle
    if (tx > homeCx - ft(50) && tx < homeCx + ft(50) && ty > homeCy - ft(30) && ty < homeCy + ft(38)) continue;
    trees.push(tree(tx, ty, 5 + Math.random()*3));
  }
  s += trees.join("");

  // legend
  s += legend(W - 240, 110, [
    { fill: "url(#plantHatch2)", label: "Plantation zone (cashew/mango/coconut)" },
    { fill: "url(#bufferPat)", label: "Landscape buffer (privacy trees)" },
    { fill: C.container, stroke: C.forest, label: "Container module (40 ft / 20 ft)" },
    { fill: C.beigeWarm, label: "Courtyard / utility / sit-out" },
    { fill: C.deck, label: "Covered verandah / deck" },
    { fill: C.water, label: "Water feature / RWH" },
    { fill: "url(#drivewayPat)", label: "Driveway / parking" }
  ]);

  s += northArrow(W - 70, H - 100);
  s += scaleBar(70, H - 60, ftToPx);
  s += labelBlock(70, 110, "2BHK · 2 BR + 2 ATT + POWDER", "2,500 Sq.Ft");

  s += `</svg>`;
  return s;
}

// =================== 3BHK ===================
function svg3BHK(){
  let s = header(W,H);
  s += plotChrome("3BHK · Premium Modular Agro Estate", "3,500 Sq.Ft Built-up");

  const plotCx = px0 + plotPx/2;
  const plotCy = py0 + plotPx/2;

  s += rect(px0, py0, plotPx, plotPx, { fill: "url(#bufferPat)", stroke: C.forest, sw: 2.5, rx: 4 });
  const inset = ft(28);
  s += rect(px0+inset, py0+inset, plotPx-2*inset, plotPx-2*inset, { fill: "url(#plantHatch2)", stroke: C.forestDeep, sw: 1.2 });
  s += text(px0 + plotPx - inset - 12, py0 + inset + 22, "PLANTATION  PREMIUM MIX  MANGO · COCONUT · SPICE", { fill: C.ivory, size: 11, bold: true, anchor: "end", letter: 1 });

  // driveway
  const drivW = ft(13);
  s += rect(plotCx - drivW/2, py0 + plotPx - ft(50), drivW, ft(50), { fill: "url(#drivewayPat)", stroke: C.beigeWarm, sw: 0.5 });
  // parking
  s += rect(plotCx + ft(10), py0 + plotPx - ft(90), ft(28), ft(36), { fill: C.driveway, stroke: C.charcoal, sw: 0.6 });
  s += text(plotCx + ft(24), py0 + plotPx - ft(72), "P", { fill: C.charcoal, size: 12, bold: true, anchor: "middle" });
  s += text(plotCx + ft(24), py0 + plotPx - ft(60), "2-3 cars", { fill: C.charcoal, size: 8, anchor: "middle" });

  // L-shape home: 6 x 40ft + 2 x 20ft
  const C40W = ft(40), C40H = ft(8);
  const C20W = ft(20);

  const homeOriginX = plotCx - ft(50);
  const homeOriginY = plotCy - ft(15);

  // Bedroom wing (vertical) — 3 stacked 40ft modules running E-W in a horizontal row
  // Wing A (East-West row): BR1 (Master), BR2, BR3
  // Wing B (perpendicular): Living, Dining, Kitchen
  // L-shape with verandah at inner corner

  // Wing A — bedroom row (E-W)
  const wAx = homeOriginX, wAy = homeOriginY - ft(40);
  // M1 (master)
  s += rect(wAx,             wAy, C40W, C40H, { fill: C.container, stroke: C.containerStroke, sw: 1.4 });
  s += text(wAx + C40W/2, wAy + C40H/2 + 4, "MASTER BR", { size:10, bold:true, anchor:"middle", fill: C.forest });
  // M2
  s += rect(wAx + C40W,      wAy, C40W, C40H, { fill: C.container, stroke: C.containerStroke, sw: 1.4 });
  s += text(wAx + 1.5*C40W, wAy + C40H/2 + 4, "BEDROOM 2", { size:10, bold:true, anchor:"middle", fill: C.forest });
  // M3 (running south from end of wing)
  s += rect(wAx + 2*C40W,   wAy, C40H, C40W, { fill: C.container, stroke: C.containerStroke, sw: 1.4 });
  s += `<g transform="translate(${wAx + 2*C40W + C40H/2}, ${wAy + C40W/2}) rotate(-90)"><text text-anchor="middle" font-size="10" font-weight="700" fill="${C.forest}">BEDROOM 3</text></g>`;

  // Wing B — public (E-W) below bedroom wing, offset
  const wBx = wAx, wBy = wAy + C40H + ft(14);
  // Living (2 sections combined as 40ft + 40ft long bar)
  s += rect(wBx, wBy, C40W, C40H, { fill: C.container, stroke: C.containerStroke, sw: 1.4 });
  s += text(wBx + C40W/2, wBy + C40H/2 + 4, "LIVING", { size:10, bold:true, anchor:"middle", fill: C.forest });
  s += rect(wBx + C40W, wBy, C40W, C40H, { fill: C.container, stroke: C.containerStroke, sw: 1.4 });
  s += text(wBx + 1.5*C40W, wBy + C40H/2 + 4, "DINING / KITCHEN (40 ft)", { size:9, bold:true, anchor:"middle", fill: C.forest });

  // Family lounge wing (vertical, off the south)
  s += rect(wBx + 2*C40W, wBy, C40H, C40W, { fill: C.container, stroke: C.containerStroke, sw: 1.4 });
  s += `<g transform="translate(${wBx + 2*C40W + C40H/2}, ${wBy + C40W/2}) rotate(-90)"><text text-anchor="middle" font-size="10" font-weight="700" fill="${C.forest}">FAMILY LOUNGE</text></g>`;

  // 20ft utility + study modules
  s += rect(wBx - C20W, wBy, C20W, C40H, { fill: C.beigeWarm, stroke: C.containerStroke, sw: 1.2 });
  s += text(wBx - C20W/2, wBy + C40H/2 + 4, "UTILITY", { size: 9, bold: true, anchor: "middle", fill: C.forest });
  s += rect(wAx - C20W, wAy, C20W, C40H, { fill: C.beigeWarm, stroke: C.containerStroke, sw: 1.2 });
  s += text(wAx - C20W/2, wAy + C40H/2 + 4, "STUDY", { size: 9, bold: true, anchor: "middle", fill: C.forest });

  // Internal courtyard between the two wings
  s += rect(wAx + ft(6), wAy + C40H, 2*C40W - ft(12), ft(14),
    { fill: C.beigeWarm, stroke: C.gold, sw: 1 });
  s += text(wAx + C40W, wAy + C40H + ft(7) + 3, "COURTYARD / GLASS SPINE", { size: 10, bold: true, anchor: "middle", fill: C.gold, letter: 1 });

  // Verandah south of public wing
  s += rect(wBx - ft(2), wBy + C40H + 1, 2*C40W + ft(4), ft(10),
    { fill: C.deck, stroke: C.pergola, sw: 0.9 });
  s += text(wBx + C40W, wBy + C40H + ft(6) + 1, "COVERED VERANDAH + WELLNESS DECK", { size: 9, bold: true, anchor: "middle", fill: C.charcoal, letter: 1 });

  // Yoga lawn / firepit outside verandah
  s += rect(wBx - ft(5), wBy + C40H + ft(14), 2*C40W + ft(10), ft(20), { fill: "#D4D8B6", stroke: C.plantationLight, sw: 0.8 });
  s += text(wBx + C40W, wBy + C40H + ft(24), "YOGA LAWN · FIREPIT · OUTDOOR DINING", { size: 10, bold: true, anchor: "middle", fill: C.forest, letter: 1 });

  // Sustainability icons
  // RWH tank NE
  s += `<circle cx="${px0 + plotPx - ft(18)}" cy="${py0 + ft(22)}" r="11" fill="${C.water}" stroke="${C.forest}" stroke-width="1"/>`;
  s += text(px0 + plotPx - ft(18), py0 + ft(38), "RWH x2", { size: 9, bold: true, anchor: "middle", fill: C.forest });
  // greywater bed E
  s += `<rect x="${px0 + plotPx - ft(40)}" y="${py0 + plotPx/2 - ft(10)}" width="${ft(18)}" height="${ft(18)}" fill="${C.plantationLight}" stroke="${C.forest}" stroke-width="1"/>`;
  s += text(px0 + plotPx - ft(40) + ft(9), py0 + plotPx/2 + ft(14), "GREYWATER BED", { size: 8, bold: true, anchor: "middle", fill: C.forest });
  // composting S
  s += `<rect x="${px0 + ft(15)}" y="${py0 + plotPx - ft(35)}" width="${ft(18)}" height="${ft(10)}" fill="${C.gold}" opacity="0.7" stroke="${C.forest}" stroke-width="0.8"/>`;
  s += text(px0 + ft(15) + ft(9), py0 + plotPx - ft(20), "COMPOST", { size: 8, bold: true, anchor: "middle", fill: C.forest });
  // solar SW
  s += `<rect x="${px0 + plotPx - ft(50)}" y="${py0 + plotPx - ft(35)}" width="${ft(30)}" height="${ft(14)}" fill="${C.beigeWarm}" stroke="${C.forest}" stroke-width="1"/>`;
  s += text(px0 + plotPx - ft(50) + ft(15), py0 + plotPx - ft(25), "SOLAR / UTIL", { size: 8, bold: true, anchor: "middle", fill: C.forest });
  // bio-septic NW
  s += `<rect x="${px0 + ft(15)}" y="${py0 + ft(15)}" width="${ft(18)}" height="${ft(12)}" fill="${C.beige}" stroke="${C.forest}" stroke-width="1"/>`;
  s += text(px0 + ft(15) + ft(9), py0 + ft(34), "BIO-SEPTIC", { size: 8, bold: true, anchor: "middle", fill: C.forest });

  // walking path loop
  const pathInset = ft(20);
  s += `<rect x="${px0+pathInset}" y="${py0+pathInset}" width="${plotPx-2*pathInset}" height="${plotPx-2*pathInset}" fill="none" stroke="${C.path}" stroke-width="3" stroke-dasharray="2,4" opacity="0.7"/>`;

  s += commonGate(plotCx);

  // Trees scatter
  const trees = [];
  for (let i = 0; i < 36; i++){
    const tx = px0 + ft(20) + Math.random() * (plotPx - ft(40));
    const ty = py0 + ft(20) + Math.random() * (plotPx - ft(40));
    if (tx > wAx - ft(15) && tx < wAx + 2*C40W + C40H + ft(15) && ty > wAy - ft(8) && ty < wBy + C40H + ft(36)) continue;
    trees.push(tree(tx, ty, 5 + Math.random()*3));
  }
  s += trees.join("");

  s += legend(W - 240, 110, [
    { fill: "url(#plantHatch2)", label: "Plantation zone (premium mix)" },
    { fill: "url(#bufferPat)", label: "Landscape buffer" },
    { fill: C.container, stroke: C.forest, label: "Container module (40 / 20 ft)" },
    { fill: C.beigeWarm, label: "Courtyard / glass spine" },
    { fill: C.deck, label: "Covered verandah / wellness deck" },
    { fill: C.plantationLight, label: "Greywater reed bed" },
    { fill: C.water, label: "RWH / water feature" }
  ]);

  s += northArrow(W - 70, H - 100);
  s += scaleBar(70, H - 60, ftToPx);
  s += labelBlock(70, 110, "3BHK · 3 BR + 3 ATT + POWDER", "3,500 Sq.Ft");

  s += `</svg>`;
  return s;
}

// =================== 4BHK ===================
function svg4BHK(){
  let s = header(W,H);
  s += plotChrome("4BHK · Signature Ground-Level Modular Luxury Estate", "4,500 Sq.Ft Built-up");

  const plotCx = px0 + plotPx/2;
  const plotCy = py0 + plotPx/2;

  s += rect(px0, py0, plotPx, plotPx, { fill: "url(#bufferPat)", stroke: C.forest, sw: 2.5, rx: 4 });
  const inset = ft(26);
  s += rect(px0+inset, py0+inset, plotPx-2*inset, plotPx-2*inset, { fill: "url(#plantHatch2)", stroke: C.forestDeep, sw: 1.2 });
  s += text(px0 + plotPx - inset - 12, py0 + inset + 22, "PLANTATION  CURATED  MANGO · CASHEW · COCONUT · ORCHARD", { fill: C.ivory, size: 11, bold: true, anchor: "end", letter: 1 });

  // arrival forecourt
  const drivW = ft(14);
  s += rect(plotCx - drivW/2, py0 + plotPx - ft(60), drivW, ft(60), { fill: "url(#drivewayPat)", stroke: C.beigeWarm, sw: 0.5 });
  // forecourt larger
  s += rect(plotCx - ft(22), py0 + plotPx - ft(108), ft(44), ft(40), { fill: C.driveway, stroke: C.charcoal, sw: 0.6 });
  s += text(plotCx, py0 + plotPx - ft(88), "ARRIVAL", { size: 10, bold: true, anchor: "middle", fill: C.forest, letter: 1 });
  s += text(plotCx, py0 + plotPx - ft(75), "3 cars + cart", { size: 8, anchor: "middle", fill: C.charcoal });

  // 3-wing pavilion: 8 x 40ft + 3 x 20ft around central court with reflective pool
  const C40W = ft(40), C40H = ft(8);
  const C20W = ft(20);

  // Layout: central courtyard (with pool) at plot center; 3 wings around it
  // West wing: 2 x 40 ft (Master + master extension) vertical
  // North wing: 3 x 40 ft (BR2, BR3, BR4) running E-W
  // East wing: 2 x 40 ft (Living + Living ext.) vertical
  // South wing: 1 x 40 ft (formal dining), with kitchen pavilion as another 40ft + 20ft dirty kitchen

  const cCx = plotCx, cCy = plotCy - ft(2);
  const courtW = ft(46), courtH = ft(40);

  // Courtyard with reflective pool
  s += rect(cCx - courtW/2, cCy - courtH/2, courtW, courtH, { fill: C.beigeWarm, stroke: C.gold, sw: 1.2 });
  s += rect(cCx - ft(14), cCy - ft(10), ft(28), ft(20), { fill: "url(#waterPat)", stroke: C.forest, sw: 0.8 });
  s += text(cCx, cCy + 3, "REFLECTIVE", { size: 9, bold: true, anchor: "middle", fill: C.forest });
  s += text(cCx, cCy + 14, "POOL", { size: 9, bold: true, anchor: "middle", fill: C.forest });
  // canopy tree
  s += tree(cCx + ft(18), cCy - ft(15), 7, { fill: C.plantationLight });

  // West wing — master suite (running N-S, vertical orientation = 40ft tall)
  const wWx = cCx - courtW/2 - C40H - ft(3);
  s += rect(wWx, cCy - C40W/2, C40H, C40W, { fill: C.container, stroke: C.containerStroke, sw: 1.4 });
  s += `<g transform="translate(${wWx + C40H/2}, ${cCy - C40W/4}) rotate(-90)"><text text-anchor="middle" font-size="10" font-weight="700" fill="${C.forest}">MASTER SUITE</text></g>`;
  s += `<g transform="translate(${wWx + C40H/2}, ${cCy + C40W/4}) rotate(-90)"><text text-anchor="middle" font-size="9" font-weight="700" fill="${C.forest}">W/IN WARDROBE + BATH</text></g>`;
  // private garden court (west of master)
  s += rect(wWx - ft(20), cCy - C40W/2 - ft(2), ft(20), C40W + ft(4), { fill: "#E8E0BD", stroke: C.gold, sw: 0.9 });
  s += `<g transform="translate(${wWx - ft(10)}, ${cCy}) rotate(-90)"><text text-anchor="middle" font-size="9" font-weight="700" fill="${C.forest}">PRIVATE GARDEN COURT</text></g>`;

  // North wing — 3 bedrooms in a row (E-W)
  const wNx = cCx - 1.5*C40W;
  const wNy = cCy - courtH/2 - C40H - ft(3);
  s += rect(wNx,           wNy, C40W, C40H, { fill: C.container, stroke: C.containerStroke, sw: 1.4 });
  s += text(wNx + C40W/2, wNy + C40H/2 + 4, "BEDROOM 4", { size:10, bold:true, anchor:"middle", fill: C.forest });
  s += rect(wNx + C40W,    wNy, C40W, C40H, { fill: C.container, stroke: C.containerStroke, sw: 1.4 });
  s += text(wNx + 1.5*C40W, wNy + C40H/2 + 4, "BEDROOM 3", { size:10, bold:true, anchor:"middle", fill: C.forest });
  s += rect(wNx + 2*C40W,  wNy, C40W, C40H, { fill: C.container, stroke: C.containerStroke, sw: 1.4 });
  s += text(wNx + 2.5*C40W, wNy + C40H/2 + 4, "BEDROOM 2", { size:10, bold:true, anchor:"middle", fill: C.forest });

  // 20ft staff or study at NW end
  s += rect(wNx - C20W, wNy, C20W, C40H, { fill: C.beigeWarm, stroke: C.containerStroke, sw: 1.2 });
  s += text(wNx - C20W/2, wNy + C40H/2 + 4, "STUDY", { size: 9, bold: true, anchor: "middle", fill: C.forest });

  // East wing — Grand Living (2 x 40ft vertical)
  const wEx = cCx + courtW/2 + ft(3);
  s += rect(wEx, cCy - C40W/2, C40H, C40W/2, { fill: C.container, stroke: C.containerStroke, sw: 1.4 });
  s += `<g transform="translate(${wEx + C40H/2}, ${cCy - C40W*0.32}) rotate(-90)"><text text-anchor="middle" font-size="9" font-weight="700" fill="${C.forest}">FAMILY LOUNGE</text></g>`;
  s += rect(wEx, cCy, C40H, C40W/2, { fill: C.container, stroke: C.containerStroke, sw: 1.4 });
  s += `<g transform="translate(${wEx + C40H/2}, ${cCy + C40W*0.18}) rotate(-90)"><text text-anchor="middle" font-size="10" font-weight="700" fill="${C.forest}">GRAND LIVING</text></g>`;
  // 20ft service (powder + wardrobe)
  s += rect(wEx + C40H, cCy - C40W/2, C40H, C20W, { fill: C.beigeWarm, stroke: C.containerStroke, sw: 1.2 });
  s += `<g transform="translate(${wEx + C40H + C40H/2}, ${cCy - C40W/2 + C20W/2}) rotate(-90)"><text text-anchor="middle" font-size="8" font-weight="700" fill="${C.forest}">POWDER/STORAGE</text></g>`;

  // South wing — dining + kitchen + dirty kitchen
  const wSx = wNx;
  const wSy = cCy + courtH/2 + ft(3);
  s += rect(wSx + C40W/2, wSy, C40W, C40H, { fill: C.container, stroke: C.containerStroke, sw: 1.4 });
  s += text(wSx + C40W, wSy + C40H/2 + 4, "FORMAL DINING", { size:10, bold:true, anchor:"middle", fill: C.forest });
  s += rect(wSx + 1.5*C40W, wSy, C40W, C40H, { fill: C.container, stroke: C.containerStroke, sw: 1.4 });
  s += text(wSx + 2*C40W, wSy + C40H/2 + 4, "OPEN KITCHEN (40 ft)", { size:9, bold:true, anchor:"middle", fill: C.forest });
  // Dirty kitchen 20ft
  s += rect(wSx + 2.5*C40W, wSy, C20W, C40H, { fill: C.beigeWarm, stroke: C.containerStroke, sw: 1.2 });
  s += text(wSx + 2.5*C40W + C20W/2, wSy + C40H/2 + 4, "DIRTY KIT.", { size: 9, bold: true, anchor: "middle", fill: C.forest });

  // Glass-link spine lines connecting wings
  // (visual hint as dashed gold)
  s += `<line x1="${wWx + C40H}" y1="${cCy}" x2="${cCx - courtW/2}" y2="${cCy}" stroke="${C.gold}" stroke-width="1.5" stroke-dasharray="2,3"/>`;
  s += `<line x1="${cCx}" y1="${wNy + C40H}" x2="${cCx}" y2="${cCy - courtH/2}" stroke="${C.gold}" stroke-width="1.5" stroke-dasharray="2,3"/>`;
  s += `<line x1="${wEx}" y1="${cCy}" x2="${cCx + courtW/2}" y2="${cCy}" stroke="${C.gold}" stroke-width="1.5" stroke-dasharray="2,3"/>`;
  s += `<line x1="${cCx}" y1="${cCy + courtH/2}" x2="${cCx}" y2="${wSy}" stroke="${C.gold}" stroke-width="1.5" stroke-dasharray="2,3"/>`;

  // Wellness deck (along south outside dining)
  s += rect(wSx, wSy + C40H + 1, 3*C40W + C20W, ft(12), { fill: C.deck, stroke: C.pergola, sw: 0.9 });
  s += text(wSx + (3*C40W + C20W)/2, wSy + C40H + ft(7), "VERANDAH · YOGA / WELLNESS DECK · OUTDOOR DINING", { size: 9, bold: true, anchor: "middle", fill: C.charcoal, letter: 1 });

  // Optional swimming pool to the east of public wing
  s += rect(wEx + C40H*2 + ft(4), cCy - ft(12), ft(34), ft(14), { fill: "url(#waterPat)", stroke: C.forest, sw: 1 });
  s += text(wEx + C40H*2 + ft(4) + ft(17), cCy + 4, "POOL (opt.)", { size: 9, bold: true, anchor: "middle", fill: C.forest });

  // Outside lifestyle lawn south of wellness deck
  s += rect(wSx - ft(8), wSy + C40H + ft(14), 3*C40W + C20W + ft(16), ft(20),
    { fill: "#D4D8B6", stroke: C.plantationLight, sw: 0.8 });
  s += text(wSx + (3*C40W + C20W)/2, wSy + C40H + ft(24), "LAWN · FIREPIT · MEDITATION CORNER", { size: 10, bold: true, anchor: "middle", fill: C.forest, letter: 1 });

  // Sustainability icons
  s += `<circle cx="${px0 + plotPx - ft(18)}" cy="${py0 + ft(22)}" r="11" fill="${C.water}" stroke="${C.forest}" stroke-width="1"/>`;
  s += `<circle cx="${px0 + plotPx - ft(36)}" cy="${py0 + ft(22)}" r="9" fill="${C.water}" stroke="${C.forest}" stroke-width="1"/>`;
  s += text(px0 + plotPx - ft(28), py0 + ft(40), "RWH x2 (40k L)", { size: 9, bold: true, anchor: "middle", fill: C.forest });
  // greywater wetland
  s += `<rect x="${px0 + plotPx - ft(42)}" y="${py0 + plotPx/2 - ft(14)}" width="${ft(22)}" height="${ft(22)}" fill="${C.plantationLight}" stroke="${C.forest}" stroke-width="1"/>`;
  s += text(px0 + plotPx - ft(42) + ft(11), py0 + plotPx/2 + ft(15), "GREYWATER WETLAND", { size: 8, bold: true, anchor: "middle", fill: C.forest });
  // bio-septic NW
  s += `<rect x="${px0 + ft(15)}" y="${py0 + ft(15)}" width="${ft(22)}" height="${ft(14)}" fill="${C.beige}" stroke="${C.forest}" stroke-width="1"/>`;
  s += text(px0 + ft(15) + ft(11), py0 + ft(38), "BIO-SEPTIC + LEACH", { size: 8, bold: true, anchor: "middle", fill: C.forest });
  // composting S
  s += `<rect x="${px0 + ft(15)}" y="${py0 + plotPx - ft(40)}" width="${ft(22)}" height="${ft(12)}" fill="${C.gold}" opacity="0.7" stroke="${C.forest}" stroke-width="0.8"/>`;
  s += text(px0 + ft(15) + ft(11), py0 + plotPx - ft(24), "COMPOST", { size: 8, bold: true, anchor: "middle", fill: C.forest });
  // solar SW
  s += `<rect x="${px0 + plotPx - ft(50)}" y="${py0 + plotPx - ft(35)}" width="${ft(30)}" height="${ft(14)}" fill="${C.beigeWarm}" stroke="${C.forest}" stroke-width="1"/>`;
  s += text(px0 + plotPx - ft(50) + ft(15), py0 + plotPx - ft(25), "SOLAR + EV", { size: 8, bold: true, anchor: "middle", fill: C.forest });

  // walking path
  const pathInset = ft(20);
  s += `<rect x="${px0+pathInset}" y="${py0+pathInset}" width="${plotPx-2*pathInset}" height="${plotPx-2*pathInset}" fill="none" stroke="${C.path}" stroke-width="3" stroke-dasharray="2,4" opacity="0.7"/>`;

  s += commonGate(plotCx);

  // Trees
  const trees = [];
  for (let i = 0; i < 44; i++){
    const tx = px0 + ft(20) + Math.random() * (plotPx - ft(40));
    const ty = py0 + ft(20) + Math.random() * (plotPx - ft(40));
    if (tx > wWx - ft(25) && tx < wEx + ft(45) && ty > wNy - ft(10) && ty < wSy + C40H + ft(36)) continue;
    trees.push(tree(tx, ty, 5 + Math.random()*4));
  }
  s += trees.join("");

  s += legend(W - 240, 110, [
    { fill: "url(#plantHatch2)", label: "Plantation + orchard" },
    { fill: "url(#bufferPat)", label: "Landscape buffer" },
    { fill: C.container, stroke: C.forest, label: "Container module (40 / 20 ft)" },
    { fill: C.beigeWarm, label: "Courtyard / glass spine / service" },
    { fill: C.deck, label: "Wellness / outdoor dining deck" },
    { fill: "url(#waterPat)", label: "Reflective pool / swimming pool" },
    { fill: C.plantationLight, label: "Greywater wetland" },
    { fill: "#E8E0BD", label: "Private garden court" }
  ]);

  s += northArrow(W - 70, H - 100);
  s += scaleBar(70, H - 60, ftToPx);
  s += labelBlock(70, 110, "4BHK · 4 BR + 4 ATT + POWDER + STAFF", "4,500 Sq.Ft");

  s += `</svg>`;
  return s;
}

// =================== CUSTOMISABLE ===================
function svgCustom(){
  let s = header(W,H);
  s += plotChrome("Fully Customisable Ground-Level Modular Eco Estate", "Customisable Built-up · 1 Acre");

  const plotCx = px0 + plotPx/2;
  const plotCy = py0 + plotPx/2;

  s += rect(px0, py0, plotPx, plotPx, { fill: "url(#bufferPat)", stroke: C.forest, sw: 2.5, rx: 4 });
  const inset = ft(28);
  s += rect(px0+inset, py0+inset, plotPx-2*inset, plotPx-2*inset, { fill: "url(#plantHatch2)", stroke: C.forestDeep, sw: 1.2 });
  s += text(px0 + plotPx - inset - 12, py0 + inset + 22, "PLANTATION  BUYER-SELECTED PROFILE", { fill: C.ivory, size: 11, bold: true, anchor: "end", letter: 1 });

  // Show 5 ghost placement outlines and one solid hero
  const C40W = ft(40);
  const C40H = ft(8);
  const homeW = ft(80), homeH = ft(56);

  // Ghost: front
  s += rect(plotCx - homeW/2, py0 + ft(42), homeW, homeH, { fill: "none", stroke: C.gold, sw: 1.5, dash: "6,4" });
  s += text(plotCx, py0 + ft(42) + homeH + 14, "FRONT placement", { size: 9, anchor: "middle", fill: C.gold, italic: true });

  // Ghost: side (left)
  s += rect(px0 + ft(40), plotCy - homeH/2, homeW, homeH, { fill: "none", stroke: C.gold, sw: 1.5, dash: "6,4" });
  s += text(px0 + ft(40) + homeW/2, plotCy - homeH/2 - 8, "SIDE placement", { size: 9, anchor: "middle", fill: C.gold, italic: true });

  // Ghost: rear
  s += rect(plotCx - homeW/2, py0 + plotPx - ft(42) - homeH, homeW, homeH, { fill: "none", stroke: C.gold, sw: 1.5, dash: "6,4" });
  s += text(plotCx, py0 + plotPx - ft(42) - homeH - 8, "REAR placement", { size: 9, anchor: "middle", fill: C.gold, italic: true });

  // Ghost: courtyard-centric (slightly larger square)
  const ccx = plotCx + ft(40), ccy = plotCy + ft(30);
  s += rect(ccx - ft(40), ccy - ft(40), ft(80), ft(80), { fill: "none", stroke: C.gold, sw: 1.5, dash: "6,4" });
  s += text(ccx, ccy + ft(50), "COURTYARD-CENTRIC", { size: 9, anchor: "middle", fill: C.gold, italic: true });

  // HERO: centre placement — solid
  // Slightly L-shape solid form
  const hx = plotCx - homeW/2, hy = plotCy - homeH/2;
  s += rect(hx, hy, homeW, homeH, { fill: C.container, stroke: C.containerStroke, sw: 2 });
  // courtyard cut
  s += rect(hx + ft(22), hy + ft(20), ft(36), ft(20), { fill: C.beigeWarm, stroke: C.gold, sw: 1.2 });
  s += text(hx + homeW/2, hy + 18, "MODULAR ECO HOME — CENTRE PLACEMENT (hero variant)", { size: 11, bold: true, anchor: "middle", fill: C.forest, letter: 1 });
  s += text(hx + ft(40), hy + ft(31), "INTERIOR COURTYARD", { size: 10, bold: true, anchor: "middle", fill: C.gold });
  s += text(hx + homeW/2, hy + homeH - 8, "1–4 BHK · custom built-up · ground-level modular containers only", { size: 9, anchor: "middle", fill: C.charcoal, italic: true });

  // driveway from gate
  const drivW = ft(13);
  s += rect(plotCx - drivW/2, py0 + plotPx - ft(40), drivW, ft(40), { fill: "url(#drivewayPat)", stroke: C.beigeWarm, sw: 0.5 });

  // commonGate
  s += commonGate(plotCx);

  // Sustainability icons (same set)
  s += `<circle cx="${px0 + plotPx - ft(18)}" cy="${py0 + ft(22)}" r="11" fill="${C.water}" stroke="${C.forest}" stroke-width="1"/>`;
  s += text(px0 + plotPx - ft(18), py0 + ft(38), "RWH", { size: 9, bold: true, anchor: "middle", fill: C.forest });
  s += `<rect x="${px0 + plotPx - ft(40)}" y="${py0 + ft(15)}" width="${ft(14)}" height="${ft(14)}" fill="${C.beigeWarm}" stroke="${C.forest}" stroke-width="1"/>`;
  s += text(px0 + plotPx - ft(40) + ft(7), py0 + ft(40), "RP", { size: 8, bold: true, anchor: "middle", fill: C.forest });
  s += `<rect x="${px0 + ft(15)}" y="${py0 + ft(15)}" width="${ft(20)}" height="${ft(12)}" fill="${C.beige}" stroke="${C.forest}" stroke-width="1"/>`;
  s += text(px0 + ft(15) + ft(10), py0 + ft(36), "BIO-SEPTIC", { size: 8, bold: true, anchor: "middle", fill: C.forest });
  s += `<rect x="${px0 + plotPx - ft(50)}" y="${py0 + plotPx - ft(35)}" width="${ft(30)}" height="${ft(14)}" fill="${C.beigeWarm}" stroke="${C.forest}" stroke-width="1"/>`;
  s += text(px0 + plotPx - ft(50) + ft(15), py0 + plotPx - ft(25), "SOLAR / UTIL", { size: 8, bold: true, anchor: "middle", fill: C.forest });

  // walking path
  const pathInset = ft(20);
  s += `<rect x="${px0+pathInset}" y="${py0+pathInset}" width="${plotPx-2*pathInset}" height="${plotPx-2*pathInset}" fill="none" stroke="${C.path}" stroke-width="3" stroke-dasharray="2,4" opacity="0.7"/>`;

  // Trees scatter — keep more in plantation
  const trees = [];
  for (let i = 0; i < 40; i++){
    const tx = px0 + ft(20) + Math.random() * (plotPx - ft(40));
    const ty = py0 + ft(20) + Math.random() * (plotPx - ft(40));
    if (tx > hx - 5 && tx < hx + homeW + 5 && ty > hy - 5 && ty < hy + homeH + 5) continue;
    trees.push(tree(tx, ty, 5 + Math.random()*3));
  }
  s += trees.join("");

  s += legend(W - 240, 110, [
    { fill: "url(#plantHatch2)", label: "Plantation (buyer-selected)" },
    { fill: "url(#bufferPat)", label: "Landscape buffer" },
    { fill: C.container, stroke: C.forest, label: "HERO home (solid)" },
    { fill: "none", stroke: C.gold, label: "Ghost placement options (dashed)" },
    { fill: C.beigeWarm, label: "Courtyard / service" },
    { fill: C.water, label: "RWH / water features" }
  ]);

  s += northArrow(W - 70, H - 100);
  s += scaleBar(70, H - 60, ftToPx);
  s += labelBlock(70, 110, "CUSTOMISABLE  ·  BUYER-CONFIGURED", "1 Acre");

  s += `</svg>`;
  return s;
}

fs.writeFileSync("/sessions/relaxed-quirky-pasteur/mnt/outputs/Site_Plan_2BHK.svg", svg2BHK());
fs.writeFileSync("/sessions/relaxed-quirky-pasteur/mnt/outputs/Site_Plan_3BHK.svg", svg3BHK());
fs.writeFileSync("/sessions/relaxed-quirky-pasteur/mnt/outputs/Site_Plan_4BHK.svg", svg4BHK());
fs.writeFileSync("/sessions/relaxed-quirky-pasteur/mnt/outputs/Site_Plan_Customisable.svg", svgCustom());
console.log("All 4 SVGs written.");
