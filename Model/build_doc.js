// Reserva Verde Goa — Modular Eco Estate concept document builder
const fs = require('fs');
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, LevelFormat,
  HeadingLevel, BorderStyle, WidthType, ShadingType, PageNumber,
  PageBreak, TabStopType, TabStopPosition
} = require('docx');

const FOREST = "1F3A2E", GOLD = "B08A3E", BEIGE = "F4EDDD";
const IVORY = "FBF8F1", CHAR = "2A2A2A", LINE = "C7B97A";

const border = { style: BorderStyle.SINGLE, size: 4, color: "C9C2A8" };
const borders = { top: border, bottom: border, left: border, right: border };

function h1(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    children: [new TextRun({ text, bold: true, color: FOREST, size: 36 })],
    spacing: { before: 360, after: 180 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 8, color: GOLD, space: 4 } }
  });
}
function h2(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    children: [new TextRun({ text, bold: true, color: FOREST, size: 28 })],
    spacing: { before: 240, after: 120 }
  });
}
function h3(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_3,
    children: [new TextRun({ text, bold: true, color: GOLD, size: 24 })],
    spacing: { before: 160, after: 80 }
  });
}
function bullet(text, level = 0) {
  return new Paragraph({
    numbering: { reference: "bullets", level },
    children: [new TextRun({ text, size: 22, color: CHAR })],
    spacing: { before: 30, after: 30 }
  });
}
function body(text) {
  return new Paragraph({
    children: [new TextRun({ text, size: 22, color: CHAR })],
    spacing: { before: 60, after: 60 },
    alignment: AlignmentType.JUSTIFIED
  });
}
function caption(text) {
  return new Paragraph({
    children: [new TextRun({ text, italics: true, size: 20, color: "6B6B6B" })],
    alignment: AlignmentType.CENTER,
    spacing: { before: 40, after: 160 }
  });
}
function mono(text) {
  return text.split("\n").map(line =>
    new Paragraph({
      children: [new TextRun({ text: line || " ", font: "Courier New", size: 18, color: CHAR })],
      spacing: { before: 0, after: 0 }
    })
  );
}
function tbl(rows, colWidths) {
  const totalW = colWidths.reduce((a, b) => a + b, 0);
  const trs = rows.map((row, rIdx) => {
    const isHeader = rIdx === 0;
    return new TableRow({
      tableHeader: isHeader,
      children: row.map((cell, cIdx) => {
        const text = typeof cell === "string" ? cell : cell.text;
        const fill = isHeader ? FOREST : (rIdx % 2 === 0 ? IVORY : "FFFFFF");
        const color = isHeader ? "FFFFFF" : CHAR;
        return new TableCell({
          borders,
          width: { size: colWidths[cIdx], type: WidthType.DXA },
          shading: { fill, type: ShadingType.CLEAR },
          margins: { top: 100, bottom: 100, left: 140, right: 140 },
          children: [new Paragraph({
            children: [new TextRun({
              text, size: isHeader ? 22 : 20,
              bold: isHeader, color
            })]
          })]
        });
      })
    });
  });
  return new Table({
    width: { size: totalW, type: WidthType.DXA },
    columnWidths: colWidths,
    rows: trs
  });
}
function spacer() { return new Paragraph({ children: [new TextRun(" ")], spacing: { before: 60, after: 60 } }); }
function pageBreak() { return new Paragraph({ children: [new PageBreak()] }); }
function p(runs) { return new Paragraph({ children: runs, spacing: { before: 60, after: 60 } }); }

// ROOM SCHEDULES
const schedule2BHK = [
  ["Room / Space", "Area (sq.ft)", "Function", "Notes"],
  ["Living Room", "320", "Public lounge", "40 ft module, plantation view"],
  ["Dining Area", "180", "Family dining", "Open to living"],
  ["Kitchen", "180", "Cooking + prep", "20 ft module with island"],
  ["Family Lounge / Study", "160", "Reading / WFH", "Convertible space"],
  ["Master Bedroom", "260", "Primary suite", "40 ft module, garden-facing"],
  ["Master Toilet", "70", "Attached bath", "Walk-in shower, skylight"],
  ["Bedroom 2", "220", "Guest / family", "40 ft module"],
  ["Bedroom 2 Toilet", "60", "Attached bath", "Compact wet zone"],
  ["Powder Toilet", "35", "Guest WC", "Off entry foyer"],
  ["Utility / Laundry", "70", "Service", "Greywater point"],
  ["Storage", "55", "Pantry + general", "Walk-in, ventilated"],
  ["Internal Courtyard", "260", "Open-to-sky core", "Microclimate cooling"],
  ["Covered Deck / Verandah", "320", "Outdoor living", "Pergola roof"],
  ["Outdoor Sit-Out", "180", "Garden lounge", "Stone deck"],
  ["Corridor / Connector", "100", "Glass link", "Shaded spine"],
  ["Service Zone", "40", "Bins / gas / panel", "Concealed louvres"],
  ["TOTAL", "2,505", "—", "Approx. ±2% tolerance"]
];
const schedule3BHK = [
  ["Room / Space", "Area (sq.ft)", "Function", "Notes"],
  ["Living Room", "380", "Grand lounge", "Two 40 ft modules linked"],
  ["Dining Area", "220", "8–10 seater", "Plantation-facing glass wall"],
  ["Large Kitchen", "220", "Open island + prep", "40 ft module"],
  ["Family Lounge", "200", "Second living", "Slides to courtyard"],
  ["Study / WFH Room", "160", "Work-from-estate", "Acoustic insulation"],
  ["Master Bedroom", "300", "Primary suite", "Walk-in wardrobe alcove"],
  ["Master Toilet", "90", "Spa-style", "Twin vanity, rain shower"],
  ["Bedroom 2", "240", "Guest / kids", "40 ft module"],
  ["Bedroom 2 Toilet", "70", "Attached", "Compact wet zone"],
  ["Bedroom 3", "240", "Guest / family", "40 ft module"],
  ["Bedroom 3 Toilet", "70", "Attached", "Compact wet zone"],
  ["Powder Toilet", "40", "Guest WC", "Off foyer"],
  ["Utility / Laundry", "90", "Service", "Greywater + washing"],
  ["Storage / Pantry", "80", "Walk-in", "Mosquito-screened"],
  ["Internal Courtyard", "340", "Open-to-sky", "Water channel + planting"],
  ["Covered Verandah", "300", "Shaded outdoor", "Pergola + bamboo screen"],
  ["Outdoor Deck", "220", "Wellness / dining", "Timber on stilts"],
  ["Plantation Sit-Out", "150", "Quiet corner", "Hammock zone"],
  ["Corridor / Connector", "140", "Glass spine", "Connects wings"],
  ["Service Zone", "50", "Bins / gas / panel", "Side service yard"],
  ["TOTAL", "3,500", "—", "Approx. ±2% tolerance"]
];
const schedule4BHK = [
  ["Room / Space", "Area (sq.ft)", "Function", "Notes"],
  ["Grand Living Room", "460", "Pavilion lounge", "Two 40 ft + glass extension"],
  ["Formal Dining", "260", "10–12 seater", "Adj. dirty kitchen"],
  ["Open Kitchen", "220", "Show kitchen + island", "40 ft module"],
  ["Dirty / Service Kitchen", "140", "Heavy cooking", "20 ft module"],
  ["Family Lounge", "240", "Casual TV", "Connects wellness deck"],
  ["Study / Office", "180", "WFH / library", "Sound-insulated"],
  ["Master Suite", "340", "King suite + nook", "40 ft + extension"],
  ["Master Walk-in WR", "120", "Dressing", "Ventilated"],
  ["Master Toilet", "120", "Spa bath", "Twin vanity, soaking tub"],
  ["Bedroom 2", "260", "Guest suite", "40 ft module"],
  ["Bedroom 2 Toilet", "80", "Attached", "Walk-in shower"],
  ["Bedroom 3", "260", "Family bedroom", "40 ft module"],
  ["Bedroom 3 Toilet", "80", "Attached", "Walk-in shower"],
  ["Bedroom 4", "240", "Family / kids", "40 ft module"],
  ["Bedroom 4 Toilet", "70", "Attached", "Compact wet zone"],
  ["Powder Toilet", "45", "Guest WC", "Off foyer"],
  ["Utility / Laundry", "120", "Service", "Drying yard"],
  ["Storage / Pantry", "100", "Walk-in", "Climate-controlled"],
  ["Staff Room (optional)", "140", "Caretaker", "Separate entry"],
  ["Central Courtyard", "420", "Open-to-sky", "Reflective pool"],
  ["Covered Deck", "320", "Entertainment", "Outdoor kitchen counter"],
  ["Yoga / Wellness Deck", "200", "Meditation", "Sunrise-facing"],
  ["Outdoor Dining Pavilion", "180", "Al fresco", "Pergola roof"],
  ["Private Garden Court", "200", "Master-suite garden", "Walled"],
  ["Corridor / Connector", "170", "Glass spine", "Connects 3 wings"],
  ["Service Zone", "60", "Bins / gas / panel", "Concealed yard"],
  ["TOTAL", "4,525", "—", "Approx. ±2% tolerance"]
];

// CONTAINER MODULES
const cont2 = [
  ["Module", "Size", "Qty", "Use", "Footprint (sq.ft)"],
  ["40 ft HC container", "40 x 8 ft", "4", "Living, Master, BR2, Kitchen+Dining", "1,280"],
  ["20 ft container", "20 x 8 ft", "2", "Utility / Storage / Powder", "320"],
  ["Glass connector corridor", "Custom", "—", "Shaded spine", "100"],
  ["Roofed deck + verandah", "Custom", "—", "Covered outdoor built-up", "800"],
  ["TOTAL BUILT-UP", "—", "—", "—", "2,500"]
];
const cont3 = [
  ["Module", "Size", "Qty", "Use", "Footprint (sq.ft)"],
  ["40 ft HC container", "40 x 8 ft", "6", "Living+Dining, Kitchen, Master, BR2, BR3, Lounge", "1,920"],
  ["20 ft container", "20 x 8 ft", "2", "Study / Utility / Storage", "320"],
  ["Glass connector corridor", "Custom", "—", "L-spine + courtyard link", "140"],
  ["Roofed deck + verandah", "Custom", "—", "Pergola decks + sit-out", "1,120"],
  ["TOTAL BUILT-UP", "—", "—", "—", "3,500"]
];
const cont4 = [
  ["Module", "Size", "Qty", "Use", "Footprint (sq.ft)"],
  ["40 ft HC container", "40 x 8 ft", "8", "Grand Living x2, Master, BR2, BR3, BR4, Kitchen, Family", "2,560"],
  ["20 ft container", "20 x 8 ft", "3", "Dirty Kitchen / Study / Staff", "480"],
  ["Glass connector corridor", "Custom", "—", "Pavilion spine x 3 wings", "170"],
  ["Roofed deck + verandah", "Custom", "—", "Wellness deck, outdoor dining, court roof", "1,315"],
  ["TOTAL BUILT-UP", "—", "—", "—", "4,525"]
];

// SITE ZONING
const zoning2 = [
  ["Zone", "Allocation (sq.ft)", "% of 1 Acre", "Notes"],
  ["Entry & Arrival", "2,200", "5%", "Driveway + paver, 2-car parking"],
  ["Container Home (built-up)", "2,500", "5.7%", "4–6 modules, courtyard plan"],
  ["Outdoor Lifestyle", "3,800", "8.7%", "Deck, plunge pool optional"],
  ["Plantation Zone", "27,500", "63%", "Cashew / mango / coconut / spice"],
  ["Water & Sustainability", "1,800", "4.1%", "RWH, recharge, bio-septic"],
  ["Utility Zone", "900", "2.1%", "Solar, inverter, composting"],
  ["Landscape Buffer + Path", "4,860", "11.2%", "Privacy + bird-friendly"],
  ["TOTAL", "43,560", "100%", "1 acre"]
];
const zoning3 = [
  ["Zone", "Allocation (sq.ft)", "% of 1 Acre", "Notes"],
  ["Entry & Arrival", "2,600", "6%", "Driveway, 2–3 car parking"],
  ["Container Home (built-up)", "3,500", "8%", "6–8 modules, L-shape / court"],
  ["Outdoor Lifestyle", "4,600", "10.5%", "Deck, wellness, firepit, yoga"],
  ["Plantation Zone", "25,000", "57.4%", "Premium plantation mix"],
  ["Water & Sustainability", "2,000", "4.6%", "RWH, recharge, greywater bed"],
  ["Utility Zone", "1,200", "2.8%", "Solar, inverter, composting"],
  ["Landscape Buffer + Path", "4,660", "10.7%", "Biodiversity corridor"],
  ["TOTAL", "43,560", "100%", "1 acre"]
];
const zoning4 = [
  ["Zone", "Allocation (sq.ft)", "% of 1 Acre", "Notes"],
  ["Entry & Arrival Court", "3,200", "7.3%", "Forecourt, 3-car, guard pavilion"],
  ["Container Home (built-up)", "4,500", "10.3%", "8–10 modules, pavilion plan"],
  ["Outdoor Lifestyle", "5,800", "13.3%", "Pool, deck, wellness, dining"],
  ["Plantation Zone", "22,000", "50.5%", "Curated plantation + orchard"],
  ["Water & Sustainability", "2,200", "5.1%", "RWH, bio-septic, wetland"],
  ["Utility Zone", "1,500", "3.4%", "Solar, inverter, composting"],
  ["Landscape Buffer + Path", "4,360", "10%", "Biodiversity corridor"],
  ["TOTAL", "43,560", "100%", "1 acre"]
];

// ASCII
const ascii2BHK = [
"+----------------------------------------------------------+",
"| LANDSCAPE BUFFER  (privacy trees - bird-friendly belt)   |",
"|                                                          |",
"|   +------------------ PLANTATION ZONE -----------------+ |",
"|   | cashew / mango / coconut / spice intercrop         | |",
"|   |                                                    | |",
"|   |     +-------- COURTYARD ECO HOME --------+         | |",
"|   |     |  [BR1]----[living]----[BR2]        |         | |",
"|   |     |    |     [court yard]   |          |         | |",
"|   |     |  [util]---[kitch]----[deck]        |         | |",
"|   |     +------------------------------------+         | |",
"|   |        |  covered verandah / sit-out               | |",
"|   |    --- yoga lawn --- firepit --- garden ---        | |",
"|   |                                                    | |",
"|   +----------------------------------------------------+ |",
"|         [drip irrigation grid - RWH tank @ NE]           |",
"|                                                          |",
"|  ::driveway::  [parking 2 cars]  [solar/utility shed]    |",
"|  =====GATE=================== access road ===============|",
"+----------------------------------------------------------+"
].join("\n");

const ascii3BHK = [
"+------------------------------------------------------------+",
"|  LANDSCAPE BUFFER  (privacy trees - food forest edge)      |",
"|                                                            |",
"|   +---------------- PLANTATION ZONE ----------------+      |",
"|   | premium plantation - intercropped               |      |",
"|   |                                                 |      |",
"|   |   +---- L-SHAPED PAVILION ECO HOME ----+        |      |",
"|   |   |  [BR1]---[BR2]---[BR3]             |        |      |",
"|   |   |    |    glass corridor (spine)     |        |      |",
"|   |   |  [study]                           |        |      |",
"|   |   |  [living]----[court]----[dining]   |        |      |",
"|   |   |     |          |           |       |        |      |",
"|   |   |  [verandah] [kitchen] [utility]    |        |      |",
"|   |   +------------------------------------+        |      |",
"|   |       [wellness deck] [yoga lawn] [firepit]     |      |",
"|   |                                                 |      |",
"|   +-------------------------------------------------+      |",
"|       [RWH tank NE] [greywater bed E] [composting S]       |",
"|                                                            |",
"|   ::driveway::  [parking 2-3 cars]  [solar / utility]      |",
"|  =====GATE================== access road ==================|",
"+------------------------------------------------------------+"
].join("\n");

const ascii4BHK = [
"+--------------------------------------------------------------+",
"|   LANDSCAPE BUFFER  (privacy trees - biodiversity corridor)  |",
"|                                                              |",
"|   +----------------- PLANTATION ZONE ------------------+     |",
"|   | curated plantation + orchard                       |     |",
"|   |                                                    |     |",
"|   |   +-------- PAVILION RESORT ECO HOME --------+     |     |",
"|   |   |  [BR4]   [BR3]   [Master Suite]          |     |     |",
"|   |   |    \\____|____/  (private garden court)   |     |     |",
"|   |   |     [glass-link spine corridor]          |     |     |",
"|   |   |  [study] [family lounge] [BR2]           |     |     |",
"|   |   |    |        |              |             |     |     |",
"|   |   |  [grand living]----[central courtyard]   |     |     |",
"|   |   |     |              |  reflective pool    |     |     |",
"|   |   |  [formal dining]--[open kitchen]--[dirty]|     |     |",
"|   |   +------------------------------------------+     |     |",
"|   |     [pool / wellness deck]  [outdoor dining]       |     |",
"|   |     [yoga deck]  [firepit]  [meditation corner]    |     |",
"|   |                                                    |     |",
"|   +----------------------------------------------------+     |",
"|        [RWH tank] [greywater wetland] [bio-septic]           |",
"|        [composting] [solar PV array on roof + utility]       |",
"|                                                              |",
"|  ::arrival court::  [parking 3 cars + golf cart]             |",
"|  =====GATE====================== access road ================|",
"+--------------------------------------------------------------+"
].join("\n");

const children = [];

// COVER
children.push(new Paragraph({ children: [new TextRun({ text: " ", size: 12 })], spacing: { before: 1200 } }));
children.push(new Paragraph({
  alignment: AlignmentType.CENTER,
  children: [new TextRun({ text: "RESERVA VERDE GOA", bold: true, size: 56, color: FOREST })],
  spacing: { before: 200, after: 100 }
}));
children.push(new Paragraph({
  alignment: AlignmentType.CENTER,
  children: [new TextRun({ text: "by Bluechip Global Agro", size: 28, color: GOLD, italics: true })],
  spacing: { after: 600 }
}));
children.push(new Paragraph({
  alignment: AlignmentType.CENTER,
  children: [new TextRun({ text: "Ground-Level Modular Container Eco Estates", size: 32, color: CHAR })],
  spacing: { after: 80 }
}));
children.push(new Paragraph({
  alignment: AlignmentType.CENTER,
  children: [new TextRun({ text: "Architectural Concept, Layouts, Specifications & Drawing Brief", size: 24, color: CHAR })],
  spacing: { after: 600 }
}));
children.push(new Paragraph({
  alignment: AlignmentType.CENTER,
  children: [new TextRun({ text: "1000-Acre Eco-Sensitive Agri-Luxury Estate · Goa, India", size: 22, color: "6B6B6B", italics: true })],
  spacing: { after: 1600 }
}));
children.push(new Paragraph({
  alignment: AlignmentType.CENTER,
  children: [new TextRun({ text: "2BHK · 3BHK · 4BHK · Fully Customisable", size: 22, color: GOLD, bold: true })]
}));
children.push(pageBreak());

// 1. EXECUTIVE SUMMARY
children.push(h1("1. Executive Concept Summary"));
children.push(body("Reserva Verde Goa is a 1000-acre eco-sensitive agri-luxury estate masterplanned as a community of approximately 900 private 1-acre estate units. Each unit is conceived as a self-sufficient micro-estate combining a ground-level modular container eco-home with a private plantation, outdoor lifestyle zones, integrated water and energy systems, and a landscape buffer that protects privacy and biodiversity."));
children.push(body("The architectural language is deliberately horizontal. Every home is single-storey, ground-level, and modular. There is no stacking, no vertical container structure, no hotel-pod typology, and no urban container lodging. The container is a precision-engineered chassis — clad, insulated, glazed, and connected with bamboo, timber, stone, lime plaster, CSEB, and energy-efficient glass — to read as a contemporary eco-luxury estate residence."));
children.push(body("Three fixed product types are offered — 2BHK / 2500 sq.ft, 3BHK / 3500 sq.ft, 4BHK / 4500 sq.ft — plus a fully customisable estate. All four share one asset type: Ground-Level Modular Container Eco Home + Eco Plantation Estate. All four sit inside a private 1-acre plot, all four follow the same eco-sensitive development guidelines, and all four are positioned for second-home, NRI, wellness, and farm-stay use, with optional rental readiness."));
children.push(spacer());
children.push(h2("Project headline numbers"));
children.push(tbl([
  ["Item", "Value"],
  ["Estate area", "~1000 acres"],
  ["Approximate units", "~900 x 1-acre estates"],
  ["Per-estate area", "1 acre / 43,560 sq.ft"],
  ["Home typology", "Ground-level modular container eco-home"],
  ["Storeys", "G only — strictly no stacking"],
  ["Standard module", "40 ft high-cube container (40 x 8 ft / 320 sq.ft)"],
  ["Secondary module", "20 ft container for toilets / utility / connectors"],
  ["Built-up range", "2,500 – 4,500 sq.ft (plus customisable)"],
  ["Plantation coverage", "50–63% of plot area"],
  ["Water strategy", "RWH + recharge + greywater reuse + drip irrigation"],
  ["Energy strategy", "Solar-ready roof + inverter + LED + passive cooling"],
  ["Sanitation", "Bio-septic + greywater filtering"]
], [3200, 6160]));
children.push(pageBreak());

// 2. ZONING
children.push(h1("2. 1-Acre Estate Zoning Strategy"));
children.push(body("Each 1-acre estate is organised into seven functional zones. The home is not locked to a fixed position. Placement is decided plot-by-plot based on road access, view corridors, privacy, plantation logic, sun path (E-W long axis preferred for living-room glazing), prevailing SW monsoon wind, slope, water flow lines, and Vaastu-friendly orientation where feasible."));
children.push(h2("Recommended placement options"));
[
  "Front placement — home 30–40 ft from gate, maximises rear plantation depth, easiest access.",
  "Centre placement — home centred, full plantation buffer all around, premium estate feel.",
  "Side placement — home shifted to one boundary, consolidates plantation as a deep zone.",
  "Rear placement — home tucked at back, full plantation frontage, maximum privacy.",
  "Courtyard-centric — home wraps a central court, resort-style with plantation on four sides."
].forEach(t => children.push(bullet(t)));
children.push(h2("Seven zones — typical % allocation of a 1-acre plot"));
children.push(tbl([
  ["Zone", "Typical Share", "Function"],
  ["1. Entry & Arrival", "5–7%", "Private gate, driveway, visitor parking, optional security kiosk"],
  ["2. Ground-Level Container Home", "6–10%", "2/3/4 BHK + connectors + verandahs"],
  ["3. Plantation Zone", "50–63%", "Cashew, mango, coconut, teak+pepper, spice, herbal, food forest, organic mix"],
  ["4. Outdoor Lifestyle", "9–13%", "Deck, sit-out, yoga lawn, firepit, outdoor dining, meditation, garden"],
  ["5. Water & Sustainability", "4–5%", "RWH, recharge, drip irrigation, greywater reuse, bio-septic"],
  ["6. Utility Zone", "2–3%", "Solar inverter, battery, storage, pump, service, composting"],
  ["7. Landscape Buffer", "10–11%", "Privacy trees, green boundary, biodiversity, walking path"]
], [3600, 1800, 4000]));
children.push(body("Each plot reads as: a small habitable footprint nested inside a large productive landscape, framed by a protective buffer. The container home is the figure; the plantation is the ground."));
children.push(pageBreak());

// MODEL TEMPLATE
function modelSection(out, title, num, builtUp, beds, schedule, modules, zoning, ascii, blocks) {
  out.push(h1(num + ". " + title));
  out.push(p([
    new TextRun({ text: "Asset type: ", bold: true, color: FOREST, size: 22 }),
    new TextRun({ text: "Ground-Level Modular Container Eco Home + Eco Plantation Estate", size: 22, color: CHAR })
  ]));
  out.push(p([
    new TextRun({ text: "Built-up: ", bold: true, color: FOREST, size: 22 }),
    new TextRun({ text: builtUp + " sq.ft", size: 22, color: CHAR }),
    new TextRun({ text: "   •   Estate: ", bold: true, color: FOREST, size: 22 }),
    new TextRun({ text: "1 Acre (43,560 sq.ft)", size: 22, color: CHAR }),
    new TextRun({ text: "   •   Bedrooms: ", bold: true, color: FOREST, size: 22 }),
    new TextRun({ text: beds, size: 22, color: CHAR })
  ]));
  out.push(spacer());
  for (const b of blocks) {
    if (b.h2) out.push(h2(b.h2));
    if (b.h3) out.push(h3(b.h3));
    if (b.body) out.push(body(b.body));
    if (b.bullets) b.bullets.forEach(x => out.push(bullet(x)));
  }
  out.push(h2("Room area schedule"));
  out.push(tbl(schedule, [2900, 1400, 2900, 2160]));
  out.push(spacer());
  out.push(h2("Container module strategy"));
  out.push(tbl(modules, [2400, 1400, 800, 3760, 1000]));
  out.push(spacer());
  out.push(h2("1-acre site zoning"));
  out.push(tbl(zoning, [3600, 1800, 1400, 2560]));
  out.push(spacer());
  out.push(h2("Top-view ASCII layout"));
  mono(ascii).forEach(p => out.push(p));
  out.push(caption("Schematic top-view zoning diagram — " + title));
}

// MODEL 1
modelSection(children, "2BHK Compact Luxury Modular Eco Estate", "3", "2,500",
  "2 BR + 2 attached + powder", schedule2BHK, cont2, zoning2, ascii2BHK, [
  { h2: "Concept narrative" },
  { body: "Four to six container modules arrange themselves around a central open-to-sky courtyard, generating a cooled microclimate, cross-ventilation through every habitable room, and an immediate visual connection to the surrounding plantation. The plan is deliberately tight — every container has a purpose — but the verandah, deck, and courtyard expand perceived living area to feel like a 4,000+ sq.ft residence." },
  { h2: "Suggested layout" },
  { bullets: [
    "2 bedrooms with attached toilets, both garden- or courtyard-facing",
    "Living room (40 ft module) opening on both long sides — verandah front, courtyard back",
    "Open dining flowing into kitchen with a 20 ft service module (utility / storage)",
    "Family lounge / study set off the living room as a convertible space",
    "Powder toilet at entry foyer",
    "Covered deck / verandah running the plantation-facing edge",
    "Internal courtyard with stone water feature; optional plunge pool extension",
    "Service zone concealed behind a louvred screen at the rear-side"
  ]},
  { h2: "Functional zoning" },
  { bullets: [
    "Public: living + dining + verandah deck",
    "Private: 2 bedrooms separated by the wet-zone buffer",
    "Service: kitchen + utility + storage + powder",
    "Outdoor: courtyard + sit-out + lawn + plantation access"
  ]},
  { h2: "Recommended placement on the 1-acre plot" },
  { body: "Front-to-centre with 25–30 ft setback from the gate. Long axis E–W so the verandah faces N for stable shaded light. Plantation wraps rear and one side; the other side carries the driveway and utility yard." },
  { h2: "Eco features (model-specific)" },
  { bullets: [
    "Solar-ready roof sized for 5–7 kWp",
    "Rainwater harvesting tank ~15,000 L + recharge pit",
    "Greywater reuse bed for plantation drip irrigation",
    "Bio-septic chamber with leach field outside plantation root zone",
    "Cross-ventilation through every habitable room (jaali / louvre on the cool face)"
  ]},
  { h2: "Material specification (model-specific)" },
  { bullets: [
    "External cladding: bamboo battens + lime-plaster on insulated container faces; charred-timber feature wall on the entry elevation",
    "Roof: standing-seam metal with under-deck PIR; deep verandah overhang for shade",
    "Windows: powder-coated aluminium frames + double-glazed low-E on W/S; single-glazed on N",
    "Floors: micro-topping concrete + IPE / kapur timber deck + Kota stone (utility)",
    "Interiors: low-VOC paint, lime-wash, oiled bamboo wardrobes"
  ]},
  { h2: "Landscape zone" },
  { bullets: [
    "Front: gravel + paver driveway, 2-car porch, native ornamental trees",
    "Rear: yoga lawn + firepit + outdoor dining pergola",
    "Sides: shaded gravel walking path; herbal garden on the kitchen side",
    "Boundary: privacy hedge + tall native canopy"
  ]},
  { h2: "Plantation allocation (default)" },
  { bullets: [
    "60% main plantation (buyer-selected — cashew / mango / coconut / teak+pepper / spice)",
    "15% food forest / mixed organic",
    "10% herbal + medicinal garden",
    "10% fruit orchard accent",
    "5% biodiversity strip"
  ]},
  { h2: "Drawing description" },
  { body: "Site plan reads as a single ivory courtyard-form within a deep green plantation field; the home is a U or O shape framing the courtyard. The floor plan shows four 40 ft modules forming three sides of a square with a glass-link corridor on the fourth side; two 20 ft modules tuck behind the kitchen for utility and storage. Elevation is a low horizontal silhouette — long pergola, deep overhang, bamboo cladding, generous glass." },
  { h2: "Website card content" },
  { bullets: [
    "Title: 2BHK Compact Luxury Modular Eco Estate",
    "Short description: A precision-engineered ground-level container eco-home set inside a private 1-acre plantation estate — designed for couples, small families, NRIs, and wellness buyers seeking a low-maintenance second home in Goa.",
    "Asset type: Ground-Level Modular Container Eco Home + Eco Plantation Estate",
    "Investment highlights: low-footprint construction, plantation-backed estate, optional farm-stay rental readiness, solar-ready, integrated water systems",
    "Spec tags: Ground-Level · 2BHK · 2500 Sq.Ft · 1 Acre · Modular Container · Solar-Ready · RWH · Bio-Septic · Plantation",
    "CTA: View Details · Download Specs · Request Masterplan"
  ]}
]);
children.push(pageBreak());

// MODEL 2
modelSection(children, "3BHK Premium Modular Agro Estate", "4", "3,500",
  "3 BR + 3 attached + powder", schedule3BHK, cont3, zoning3, ascii3BHK, [
  { h2: "Concept narrative" },
  { body: "Six to eight container modules form an L-shape or courtyard pavilion. One leg of the L houses the bedroom wing; the other carries the public living + kitchen wing. A glass-link spine connects them and frames an open-to-sky internal courtyard, while the long plantation-facing edge becomes a deep covered verandah. The home reads as a discreet, low-slung agro-estate residence — premium but not ostentatious." },
  { h2: "Suggested layout" },
  { bullets: [
    "3 bedrooms with attached toilets — master + two equal bedrooms",
    "Living + dining flowing into a large open kitchen (40 ft module)",
    "Family lounge as a second living adjacent to the courtyard",
    "Dedicated study / WFH room with acoustic insulation",
    "Powder toilet near foyer",
    "Utility + storage in a 20 ft service module",
    "Covered verandah + outdoor wellness deck",
    "Plantation-facing sit-out (hammock zone) at the rear corner"
  ]},
  { h2: "Functional zoning" },
  { bullets: [
    "Arrival zone with porch + visitor seat",
    "Public living zone: living + dining + verandah",
    "Bedroom wing: 3 BR clustered with shared corridor",
    "Work / study zone — acoustically separated",
    "Kitchen + service wing with separate utility entry",
    "Outdoor lifestyle deck + plantation-facing sit-out"
  ]},
  { h2: "Recommended placement on the 1-acre plot" },
  { body: "Centre-set with a 40 ft setback from gate. Long axis E–W for solar control. Courtyard placed to the leeward side so prevailing SW monsoon wind washes through the spine corridor without driving rain into the open court." },
  { h2: "Eco features (model-specific)" },
  { bullets: [
    "Solar-ready roof sized for 8–10 kWp",
    "RWH tank ~25,000 L + dual recharge pits",
    "Greywater reed bed feeding the herbal garden drip line",
    "Twin-chamber bio-septic with planted leach field",
    "Pergola-covered verandah with operable louvres for monsoon",
    "Optional green-roof patch over the family lounge"
  ]},
  { h2: "Material specification (model-specific)" },
  { bullets: [
    "External cladding: vertical timber battens + lime-plaster + selective laterite stone feature walls",
    "Roof: insulated standing-seam metal + optional green-roof module over family lounge",
    "Windows: full-height aluminium-clad timber frames with low-E DGU; jaali screen on W elevation",
    "Floors: micro-cement + IPE deck + Kota stone (utility)",
    "Interiors: lime-wash, oiled hardwood joinery, handmade tile accents"
  ]},
  { h2: "Landscape zone" },
  { bullets: [
    "Front: forecourt with native canopy + drip-irrigated lawn ribbon",
    "Rear: deep plantation-facing deck + yoga lawn + firepit",
    "Sides: shaded walking trail looping the plantation",
    "Boundary: bamboo grove + flowering native canopy"
  ]},
  { h2: "Plantation allocation (default)" },
  { bullets: [
    "55% main plantation",
    "15% spice + medicinal mix",
    "10% food forest",
    "10% fruit orchard",
    "10% biodiversity / bird-friendly strip"
  ]},
  { h2: "Drawing description" },
  { body: "Site plan reads as an L-shape footprint with the inner corner forming a deep verandah court, plantation wrapping three sides, driveway and utility on the fourth. Floor plan shows six 40 ft modules in two parallel rows linked by a glass spine; two 20 ft modules tuck into the service wing. Elevation is a long, low pavilion with deep eaves, vertical timber rhythm, and a ground-anchored stone base." },
  { h2: "Website card content" },
  { bullets: [
    "Title: 3BHK Premium Modular Agro Estate",
    "Short description: A premium ground-level container eco-home in an L-shape pavilion configuration, set inside a private 1-acre plantation estate — designed for HNI families, NRIs and wellness buyers seeking a low-impact luxury second home with optional rental readiness.",
    "Asset type: Ground-Level Modular Container Eco Home + Eco Plantation Estate",
    "Investment highlights: premium plantation-backed estate, scalable wellness deck, optional farm-stay readiness, integrated solar + water systems, biodiversity-positive landscape",
    "Spec tags: Ground-Level · 3BHK · 3500 Sq.Ft · 1 Acre · Modular Container · Solar-Ready · RWH · Greywater · Bio-Septic · Plantation",
    "CTA: View Details · Download Specs · Request Masterplan"
  ]}
]);
children.push(pageBreak());

// MODEL 3
modelSection(children, "4BHK Signature Ground-Level Modular Luxury Estate", "5", "4,500",
  "4 BR + 4 attached + powder + opt. staff", schedule4BHK, cont4, zoning4, ascii4BHK, [
  { h2: "Concept narrative" },
  { body: "Eight to ten container modules organise into a three-wing pavilion plan around a central courtyard with a reflective water pool. The wings are: (a) public living + kitchen, (b) master suite + private garden court, (c) family / guest bedrooms with a wellness deck on the long edge. All wings connect via a single glass-link spine corridor and an open-to-sky landscaped courtyard. The home reads as a contemporary luxury resort villa anchored to the plantation." },
  { h2: "Suggested layout" },
  { bullets: [
    "4 bedrooms with attached spa-style toilets, including a master suite with walk-in wardrobe and soaking tub",
    "Grand living room (two 40 ft modules + glass-link extension)",
    "Formal dining adjacent to open show kitchen + 20 ft dirty / service kitchen",
    "Family lounge connecting to the wellness deck",
    "Study / office in an acoustically separated module",
    "Powder toilet at arrival foyer",
    "Utility / laundry + walk-in pantry + optional staff room (20 ft module with separate entry)",
    "Central courtyard with reflective pool + canopy tree",
    "Wellness deck, outdoor dining pavilion, and a private master-suite garden court",
    "Optional swimming pool in the outdoor lifestyle zone"
  ]},
  { h2: "Functional zoning" },
  { bullets: [
    "Arrival court + porch + powder + foyer",
    "Grand public living zone (living + dining + open kitchen)",
    "Master suite wing with private garden court",
    "Guest / family bedroom wing",
    "Kitchen + dirty kitchen + utility + pantry + optional staff",
    "Outdoor entertainment + wellness deck + outdoor dining",
    "Plantation zone wrapping the rear and one side"
  ]},
  { h2: "Recommended placement on the 1-acre plot" },
  { body: "Rear-of-centre with a 60 ft setback from the gate to create a generous arrival sequence. Three wings spread around the courtyard; master suite faces N–E with a private walled garden; public living faces N with the deep verandah; bedrooms face N–W with deep eaves." },
  { h2: "Eco features (model-specific)" },
  { bullets: [
    "Solar-ready roof sized for 12–15 kWp + battery bank provision",
    "RWH tanks (twin) ~40,000 L + dual recharge pits",
    "Greywater wetland feeding the orchard and herbal garden",
    "Twin-chamber bio-septic with planted leach field; greywater filtering pond",
    "Passive cooling: cross-ventilation, courtyard stack effect, evaporative pool surface",
    "Optional green-roof patches over selected modules",
    "Optional EV charging point + golf-cart parking"
  ]},
  { h2: "Material specification (model-specific)" },
  { bullets: [
    "External cladding: charred-timber accents + lime-plaster + laterite stone base course",
    "Roof: insulated standing-seam metal with deep overhangs + pergola layer + optional green-roof",
    "Windows: full-height aluminium-clad timber + low-E DGU + operable timber louvres",
    "Floors: large-format Kota / Kadappa stone (public), oak engineered timber (master), micro-cement (other), IPE deck (outdoor)",
    "Interiors: lime-wash, hand-finished plaster, brass + oxidised-bronze hardware, oiled hardwood joinery, low-VOC paint throughout"
  ]},
  { h2: "Landscape zone" },
  { bullets: [
    "Arrival forecourt with native canopy + stone-bordered driveway",
    "Reflective pool in central courtyard with a single shade tree",
    "Wellness deck + yoga pavilion at the plantation-facing edge",
    "Outdoor dining pavilion + firepit + meditation corner",
    "Walled private garden off the master suite",
    "Looped walking trail through the plantation",
    "Optional swimming pool in the outdoor lifestyle zone"
  ]},
  { h2: "Plantation allocation (default)" },
  { bullets: [
    "50% main plantation (curated mix — mango / cashew / coconut / teak+pepper accent)",
    "15% orchard (signature fruit varieties)",
    "10% spice + medicinal garden",
    "10% food forest",
    "10% biodiversity / butterfly garden",
    "5% ornamental + private garden"
  ]},
  { h2: "Drawing description" },
  { body: "Site plan reads as a tripartite pavilion within a horseshoe of plantation, with a forecourt to the south and the reflective pool courtyard at the geometric heart. Floor plan shows eight 40 ft modules and three 20 ft modules in three wings connected by a glass-link spine and a roofed pergola. Elevation is a calm horizontal layering: stone base, lime-plaster mid, charred-timber and bamboo accents, deep eaves, standing-seam roof." },
  { h2: "Website card content" },
  { bullets: [
    "Title: 4BHK Signature Ground-Level Modular Luxury Estate",
    "Short description: A pavilion-style ground-level container eco-home arranged around a courtyard pool and three connected wings, set inside a private 1-acre plantation estate — designed for HNI families, retreat operators and hospitality-focused owners seeking a flagship Goa second home with rental readiness.",
    "Asset type: Ground-Level Modular Container Eco Home + Eco Plantation Estate",
    "Investment highlights: flagship pavilion plan, courtyard-pool architecture, plantation-backed luxury estate, optional retreat operation, integrated solar + water + waste systems",
    "Spec tags: Ground-Level · 4BHK · 4500 Sq.Ft · 1 Acre · Modular Container · Pavilion · Courtyard · Solar-Ready · RWH · Greywater Wetland · Bio-Septic · Plantation",
    "CTA: View Details · Download Specs · Request Masterplan"
  ]}
]);
children.push(pageBreak());

// MODEL 4: CUSTOMISABLE
children.push(h1("6. Fully Customisable Ground-Level Modular Eco Estate"));
children.push(p([
  new TextRun({ text: "Asset type: ", bold: true, color: FOREST, size: 22 }),
  new TextRun({ text: "Ground-Level Modular Container Eco Home + Eco Plantation Estate", size: 22, color: CHAR })
]));
children.push(p([
  new TextRun({ text: "Built-up: ", bold: true, color: FOREST, size: 22 }),
  new TextRun({ text: "Customisable (typical 1,500 – 6,000 sq.ft)", size: 22, color: CHAR }),
  new TextRun({ text: "   •   Estate: ", bold: true, color: FOREST, size: 22 }),
  new TextRun({ text: "1 Acre", size: 22, color: CHAR })
]));
children.push(h2("Concept narrative"));
children.push(body("The Customisable model is a flexible framework. The buyer selects bedroom count, built-up area, home placement, plantation model, outdoor programme, wellness intensity, and rental readiness — and the design team responds with a tailored layout that still respects the eco-sensitive development guidelines. All homes remain strictly ground-level and modular."));
children.push(h2("Customisation options"));
children.push(tbl([
  ["Choice axis", "Options"],
  ["Bedroom count", "1BHK retreat · 2BHK compact · 3BHK family · 4BHK luxury"],
  ["Layout intent", "Wellness retreat · Farm-stay rental · NRI second-home · Plantation-focused · Hospitality-focused"],
  ["Home placement", "Front · Centre · Side · Rear · Courtyard-centric"],
  ["Plantation type", "Cashew · Mango · Coconut · Teak + Pepper · Spice · Herbal · Coffee/Spice · Food forest · Mixed organic"],
  ["Outdoor programme", "Plunge pool · Swimming pool · Wellness deck · Yoga pavilion · Outdoor kitchen · Firepit · Meditation"],
  ["Module mix", "40 ft HC + 20 ft + glass-link corridors + custom decks"],
  ["Rental readiness", "Off · Light farm-stay · Full retreat operation"],
  ["Interior package", "Eco-essential · Premium · Signature"]
], [3000, 6360]));
children.push(h2("Customisation guardrails (non-negotiable)"));
[
  "All structures remain single-storey / ground-level — no stacking.",
  "Built-up footprint capped at ≤10% of plot area (≤4,356 sq.ft hard footprint; covered decks subject to review).",
  "Minimum plantation coverage: 45% of plot area.",
  "Mandatory: RWH, recharge pit, bio-septic, drip irrigation, solar-ready roof.",
  "Eco-sensitive material palette + low-impact foundations across all customisations."
].forEach(t => children.push(bullet(t)));
children.push(h2("Website card content"));
[
  "Title: Fully Customisable Ground-Level Modular Eco Estate",
  "Short description: A flexible 1-acre estate where buyers customise the layout, built-up area, plantation model, outdoor programme, and rental readiness within the eco-sensitive development guidelines of Reserva Verde Goa — all ground-level, all modular.",
  "CTA: Request Masterplan · View Details · Download Specs"
].forEach(t => children.push(bullet(t)));
children.push(pageBreak());

// 7. CONSOLIDATED SCHEDULES
children.push(h1("7. Room Area Schedules (consolidated)"));
children.push(body("Each model's detailed schedule sits within its model section. The consolidated comparison below is for quick reference."));
children.push(spacer());
children.push(h2("Schedule summary"));
children.push(tbl([
  ["Group", "2BHK (sq.ft)", "3BHK (sq.ft)", "4BHK (sq.ft)"],
  ["Public — living, dining, kitchen, lounge", "840", "1,020", "1,180"],
  ["Private — bedrooms + attached baths", "610", "910", "1,450"],
  ["Service — utility, storage, powder, staff", "200", "210", "405"],
  ["Outdoor built-up — court, deck, sit-out, verandah", "760", "1,010", "1,320"],
  ["Circulation — corridor / connector + service", "140", "190", "230"],
  ["Sub-total built-up", "2,550", "3,340", "4,585"],
  ["Tolerance / wall thickness adjustment", "-45", "+160", "-60"],
  ["TOTAL APPROX. BUILT-UP", "2,505", "3,500", "4,525"]
], [2800, 2200, 2200, 2160]));
children.push(body("Notes: figures are concept-stage and will refine during DAR and statutory approvals. ±2% tolerance allowed for wall thickness, module joint tolerance, and final detailing."));
children.push(pageBreak());

// 8. CONTAINER STRATEGY
children.push(h1("8. Container Module Strategy"));
children.push(body("All three fixed models use 40 ft high-cube ISO containers as the primary habitable module (40 x 8 ft footprint, 320 sq.ft, ~8'10\" internal clear height after insulation). 20 ft modules serve as service / wet / connector elements. Built-up area = container footprint + insulated extensions + glass-link connectors + roofed verandah/deck where architecturally enclosed. Pergolas and uncovered decks do not count towards built-up area."));
children.push(h2("Module logic (consolidated)"));
children.push(tbl([
  ["Model", "40 ft HC modules", "20 ft modules", "Connectors / decks", "Approx. built-up"],
  ["2BHK / 2,500 sq.ft", "4", "2", "Glass spine + verandah + deck (~900)", "2,500"],
  ["3BHK / 3,500 sq.ft", "6", "2", "L-spine + verandah + deck (~1,260)", "3,500"],
  ["4BHK / 4,500 sq.ft", "8", "3", "Spine + pavilion deck + court roof (~1,485)", "4,500"],
  ["Customisable", "1–12", "0–6", "Tailored", "1,500 – 6,000"]
], [2400, 1900, 1700, 2400, 960]));
children.push(h2("Why this module arrangement works"));
[
  "40 ft HC offers 320 sq.ft of column-free interior — ideal for bedrooms, living, kitchen, lounge.",
  "20 ft containers absorb wet zones and service zones — concentrating plumbing.",
  "Glass-link connectors turn a row of containers into a single architectural composition while doubling as circulation and ventilation channels.",
  "Roofed pergolas + insulated extensions add cost-effective built-up area where full container enclosure is not needed.",
  "Ground-only construction means low-impact pad / pier foundations, faster build, minimal site disturbance, and easier end-of-life reversal."
].forEach(t => children.push(bullet(t)));
children.push(h2("Module placement patterns"));
[
  "Linear bar — modules in a single row; best for narrow plots or strong view orientation.",
  "L-shape — two perpendicular wings forming an outdoor court; default for 3BHK.",
  "U-shape / courtyard — three sides around a central court; default for 2BHK and key 4BHK variant.",
  "Three-wing pavilion — three wings linked by a spine corridor; default for 4BHK.",
  "Cluster — multiple small wings on a larger plot; used for customisable retreat / wellness layouts."
].forEach(t => children.push(bullet(t)));
children.push(pageBreak());

// 9. ECO SPECS
children.push(h1("9. Eco-Sensitive Specifications (applies to all models)"));
const ecoSections = [
  ["Construction", [
    "Ground-level modular container — strictly single-storey, no stacking.",
    "Low-impact foundation (concrete pad / pier or screw piles) to minimise excavation.",
    "Insulated walls (PIR / rockwool / cellulose) and insulated roof; thermally broken from primary steel.",
    "Natural cladding — bamboo, charred timber, lime plaster, laterite stone, CSEB.",
    "Recycled steel reused wherever architecturally valid.",
    "Low-VOC paints, water-based finishes, oiled / waxed timber.",
    "Energy-efficient glass — double-glazed low-E on E/W/S, single-glazed on N where shaded."
  ]],
  ["Roof", [
    "Solar-ready: structural capacity, conduits, inverter wall, and roof penetrations pre-engineered.",
    "Heat-reflective standing-seam metal with high-SRI coating + under-deck insulation.",
    "Single-slope or low-pitched gable engineered for RWH routing.",
    "Generous shaded overhangs (900–1500 mm) + secondary pergola layer.",
    "Optional green-roof patches over selected modules."
  ]],
  ["Water", [
    "Rainwater harvesting tank sized to model (15k / 25k / 40k L).",
    "Groundwater recharge pit (single or dual based on percolation).",
    "Greywater reuse — kitchen + bath greywater filtered through reed bed and routed to drip irrigation.",
    "Drip irrigation grid for plantation, herbal garden, orchard.",
    "Low-flow fixtures throughout."
  ]],
  ["Energy", [
    "Solar-ready electrical design — DC conduit, inverter wall, AC/DC breaker, net-meter provision.",
    "LED lighting throughout (warm 3000 K interior, 2700 K outdoor).",
    "Passive cooling: cross-ventilation, courtyard stack effect, deep overhangs, shaded verandah.",
    "Inverter + battery provision sized to model; backup generator on customisable / hospitality only."
  ]],
  ["Waste", [
    "On-site composting (twin-chamber or rotary composter).",
    "Organic / dry / recyclable segregation at the utility yard.",
    "Bio-septic with planted leach field — no soak pit into groundwater.",
    "Greywater filtering via reed bed / wetland.",
    "Minimal plastic use; circular sourcing on interiors."
  ]],
  ["Landscape", [
    "Native trees forming a privacy buffer along boundary.",
    "Food forest option (multi-storey perennial system).",
    "Fruit orchard accent zone.",
    "Herbal + medicinal garden adjacent to kitchen.",
    "Spice plantation strip (pepper, turmeric, cardamom where microclimate permits).",
    "Butterfly + bird-friendly planting — flowering natives, nectar plants, low-toxicity environment."
  ]]
];
for (const [title, items] of ecoSections) {
  children.push(h2(title));
  items.forEach(t => children.push(bullet(t)));
}
children.push(pageBreak());

// 10. PLANTATION OPTIONS
children.push(h1("10. Plantation Options"));
children.push(body("Each buyer selects one of the following plantation profiles. The plantation zone occupies 50–63% of the 1-acre plot and is professionally installed and maintained for the first three years under the Reserva Verde plantation program."));
children.push(tbl([
  ["Profile", "Primary trees / crops", "Yield / use", "Climate fit"],
  ["Cashew estate", "Cashew + cover crops", "Cashew nut + apple", "Excellent — Goa native"],
  ["Mango estate", "Alphonso / Mankurad / Hilsa", "Premium mango", "Excellent"],
  ["Coconut estate", "Coconut + black pepper on trunks", "Coconut + pepper", "Excellent"],
  ["Teak + pepper", "Teak with pepper vine", "Long-cycle timber + pepper", "Good"],
  ["Spice garden", "Pepper, turmeric, cardamom, nutmeg", "Spice", "Good (microclimate)"],
  ["Herbal garden", "Tulsi, ashwagandha, lemongrass, vetiver", "Herbal / medicinal", "Excellent"],
  ["Coffee / spice mix", "Robusta + pepper + nutmeg", "Coffee + spice", "Good — shaded blocks"],
  ["Food forest", "Multi-storey perennial system", "Self-sufficiency", "Excellent"],
  ["Mixed organic farming", "Seasonal vegetables + perennials", "Diversified", "Excellent"]
], [2000, 2500, 2400, 2460]));
children.push(body("All plantations are managed organically, with composted manure, drip irrigation, and biodiversity-positive ground cover. No synthetic herbicides; integrated pest management only. Plantation yields, where mentioned, are positioned as potential and subject to standard agricultural variability."));
children.push(pageBreak());

// 11. DRAWING DESCRIPTIONS
children.push(h1("11. Drawing Descriptions (7 sheets per model)"));
children.push(body("Each model is documented through a seven-sheet drawing set. The following describes the intent and content of each sheet so any architect, CAD draftsperson, or visualiser can develop working drawings."));
const drawings = [
  ["Sheet 1 — 1-Acre Site Plan",
    "1:200 top-view of the full 1-acre plot showing estate boundary, gate, driveway, parking, home footprint, plantation zone, garden, outdoor deck, RWH tank, recharge pit, utility zone, walking path, privacy buffer, service access, north arrow, scale bar, contours, and tree planting plan key."],
  ["Sheet 2 — Ground-Level Floor Plan",
    "1:100 floor plan showing every container module outline, room names, bedroom and bathroom positions, living and dining, kitchen and dirty kitchen, utility, all decks, courtyards, glass-link corridors, service zones, plumbing risers, electrical panel position, door and window positions, and floor finish key."],
  ["Sheet 3 — Container Module Plan",
    "Diagrammatic plan showing the exact number of 40 ft and 20 ft containers, their orientation arrows, joining edges, glass-link connector geometry, covered decks, roof canopy outline, and module IDs (M1–Mn). Includes a schedule of modules with internal dimensions and intended use."],
  ["Sheet 4 — Elevation Concept",
    "Front and side elevations at 1:100 showing the long horizontal silhouette, container cladding pattern (bamboo / lime plaster / charred timber / laterite stone), pergola layer, large operable windows, sloped or flat roof, solar PV array indication, natural material finish key, and material legends."],
  ["Sheet 5 — Section Concept",
    "Longitudinal and cross section at 1:50/1:100 showing floor level, roof level, ceiling height, wall and roof build-up with insulation layers, ventilation flow arrows, deck connection detail, rainwater flow from roof to RWH tank, and the shaded roof / verandah strategy."],
  ["Sheet 6 — Landscape Plan",
    "1:200 landscape plan showing plantation allocation, lawn, herbal garden, fruit trees, privacy trees, walking trail, water body, composting zone, drip irrigation grid, and a plant species schedule with quantities and spacing."],
  ["Sheet 7 — Sustainability Diagram",
    "Single-sheet schematic showing solar panels, RWH flow, recharge pit, greywater reuse loop, drip irrigation, composting, passive ventilation arrows, shaded outdoor spaces, bio-septic chain, and an annual water / energy balance summary."]
];
for (const [name, desc] of drawings) {
  children.push(h3(name));
  children.push(body(desc));
}
children.push(pageBreak());

// 12. ASCII CONSOLIDATED
children.push(h1("12. ASCII Layout Concepts (consolidated)"));
children.push(body("Quick presentation-friendly top-views of all three fixed models — useful for early-stage stakeholder reviews and brochures."));
children.push(h2("12.1 — 2BHK courtyard plan"));
mono(ascii2BHK).forEach(p => children.push(p));
children.push(h2("12.2 — 3BHK L-shape pavilion plan"));
mono(ascii3BHK).forEach(p => children.push(p));
children.push(h2("12.3 — 4BHK three-wing pavilion plan"));
mono(ascii4BHK).forEach(p => children.push(p));
children.push(pageBreak());

// 13. SVG PROMPTS
children.push(h1("13. SVG Drawing Prompts (for CAD / SVG generation)"));
children.push(body("Use the prompts below to generate 2D site-plan SVGs (presentation grade). They are written so a developer or AI illustrator can produce clean, scalable, colour-coded drawings."));
children.push(h2("13.1 — 2BHK site plan SVG prompt"));
children.push(body("Generate a 1200x900 px top-view site plan SVG of a 1-acre square plot (~208 x 208 ft) for the 2BHK 2,500 sq.ft model. Palette: forest #1F3A2E, ivory #FBF8F1, gold #B08A3E, beige #F4EDDD, charcoal #2A2A2A. Include outer boundary with 12 ft landscape buffer, private gate on south edge with 10 ft driveway to a 2-car parking pad, courtyard-style home footprint near front-centre formed by four 40x8 ft container modules around an open court, covered verandah on the plantation-facing side, outdoor sit-out + yoga lawn behind the home, plantation zone (~27,500 sq.ft) wrapping rear and sides labelled 'PLANTATION — Cashew / Mango / Coconut / Spice', RWH tank at NE corner, recharge pit and bio-septic icon, composting zone icon, shaded walking path looping the plot, north arrow, scale bar, label block top-right: 'RESERVA VERDE GOA · 2BHK · 2500 SQ.FT · 1 ACRE'. 1.5 pt strokes, hatching for plantation, hairline grid for paving."));
children.push(h2("13.2 — 3BHK site plan SVG prompt"));
children.push(body("Same canvas/palette. Plot 208x208 ft. L-shape pavilion of six 40x8 ft containers + two 20 ft service modules linked by a glass spine, centrally placed with 40 ft setback. Arrival forecourt + 2–3 car pad, covered verandah on inner L, internal courtyard at L corner, wellness deck + yoga lawn + firepit at rear, plantation (~25,000 sq.ft) wrapping three sides labelled 'PLANTATION — Premium mix', dual RWH tanks at NE, greywater reed bed at E, composting at S, biodiversity walking trail. Label block: 'RESERVA VERDE GOA · 3BHK · 3500 SQ.FT · 1 ACRE'."));
children.push(h2("13.3 — 4BHK site plan SVG prompt"));
children.push(body("Same canvas/palette. Three-wing pavilion of eight 40x8 ft containers + three 20 ft modules around a central courtyard with a reflective pool — rear-of-centre, 60 ft arrival sequence. Arrival court with 3-car + golf-cart bay, grand verandah on public-living wing, private walled garden at master-suite wing, wellness deck on family-wing long edge, outdoor dining pavilion with pergola, optional swimming pool in lifestyle zone, plantation (~22,000 sq.ft) wrapping rear, twin RWH tanks, greywater wetland, bio-septic + leach field, composting, EV charge point, biodiversity walking trail. Label block: 'RESERVA VERDE GOA · 4BHK · 4500 SQ.FT · 1 ACRE'."));
children.push(h2("13.4 — Customisable site plan SVG prompt"));
children.push(body("Same canvas/palette. Show plot with a flexible 'design zone' rectangle in the buildable area (front, centre, side, rear, courtyard-centric as five faint ghost outlines), and a single highlighted home outline wherever the buyer selects. Plantation, water, utility, and buffer zones fixed in extent. Label block: 'RESERVA VERDE GOA · CUSTOMISABLE MODULAR ECO ESTATE · 1 ACRE'."));
children.push(pageBreak());

// 14. 3D RENDER PROMPTS
children.push(h1("14. 3D Render / Aerial-View Prompts"));
children.push(body("Use these prompts in any photoreal AI image generator or with a 3D visualiser. They are tuned for premium institutional real-estate marketing."));
children.push(h3("14.1 — 2BHK aerial render"));
children.push(body("Photoreal aerial render, golden-hour, drone perspective at 45 degree elevation, of a single 1-acre eco-estate in coastal Goa. Show a low-slung U-shape modular container eco-home with bamboo-batten cladding, deep timber verandah, standing-seam metal roof with discreet solar panels, lime-plaster gables, set around a central open-to-sky courtyard with a reflective stone pond. Plantation of cashew and mango trees wraps the rear and sides; a yoga lawn, firepit circle, and shaded sit-out sit behind the home. A gravel driveway sweeps from a private gate to a 2-car porch. Native canopy trees form a privacy buffer along the boundary. Cinematic warm light, soft mist over the plantation, no people, no clutter, no logos. Style: contemporary tropical luxury — calm, premium, eco-sensitive."));
children.push(h3("14.2 — 3BHK aerial render"));
children.push(body("Same setting and style as 14.1 but show an L-shape pavilion of six 40 ft containers with a glass-link spine and a deep verandah along the inner L. Add a wellness deck, hammock corner, and an outdoor dining pergola in the rear lifestyle zone. Plantation is a premium mix — mango, coconut, with a spice/herbal strip near the kitchen wing. Include a discreet RWH tank screened by hedges at the NE corner and a small reed-bed wetland. Lighting: golden hour, soft shadows, lush biodiversity."));
children.push(h3("14.3 — 4BHK aerial render"));
children.push(body("Same setting and style. Three-wing pavilion plan around a central courtyard with a reflective pool and a single canopy tree. Charred-timber accents + lime plaster + laterite stone base + standing-seam metal roof with PV array. A walled private master-suite garden court, a yoga / wellness deck on the long edge, an outdoor dining pavilion, and an optional 12x4 m swimming pool in the outdoor lifestyle zone. Plantation wraps the rear and one side; an arrival forecourt with a stone-bordered driveway, a guard pavilion, and 3-car parking sits in front. Golden hour, cinematic, no people, no logos."));
children.push(h3("14.4 — Customisable aerial render"));
children.push(body("Same setting. Show three subtle ghost-outline variants of home placement (centre / side / rear) overlaid on the 1-acre plot to communicate flexibility, with one variant fully rendered in solid form as a hero option. Palette, plantation, water, utility, buffer all identical to other models."));
children.push(pageBreak());

// 15. CAD PROMPTS
children.push(h1("15. AutoCAD / SketchUp Instruction Prompts"));
children.push(h2("15.1 — AutoCAD prompt (2D site + floor plan)"));
children.push(body("Set up an AutoCAD drawing in metric units (mm). Create a 63,400 x 63,400 mm boundary representing 1 acre (~208 x 208 ft). Set up layers: 00-BOUNDARY, 01-DRIVEWAY, 02-CONTAINER, 03-CONNECTOR, 04-VERANDAH, 05-DECK, 06-COURTYARD, 07-WATER, 08-PLANTATION, 09-PATH, 10-UTILITY, 11-LABELS, 12-TREES. Lineweights 0.50 for boundaries, 0.35 for built-up, 0.18 for landscape. Draw the home footprint per the relevant model: for 2BHK, four 12,200 x 2,440 mm rectangles for 40 ft containers in a U-shape, and two 6,100 x 2,440 mm rectangles for 20 ft modules. For 3BHK, six 40 ft modules in an L-shape with two 20 ft modules in the service wing. For 4BHK, eight 40 ft modules in a three-wing pavilion plus three 20 ft modules. Hatch plantation with ANSI31 at 1500 mm scale; hatch driveway with AR-CONC. Insert a north arrow block, scale bar, title block in lower-right with project name, model, area, scale, drawing number. Dimension styles RV-100 and RV-200. Text styles RV-TITLE (3.5 mm) and RV-NOTE (2.5 mm). Save as DWG 2018."));
children.push(h2("15.2 — SketchUp prompt (3D massing)"));
children.push(body("Open a new SketchUp model — Architectural Design Meters template. Flat ground rectangle 63.4 x 63.4 m on Layer GROUND. Set geolocation to Goa (15.30 N, 73.98 E), time 17:30 IST. Create a component for the 40 ft HC container: 12.19 x 2.44 x 2.90 m volume with chamfered corners and a thin cap roof. Create a 20 ft component: 6.10 x 2.44 x 2.90 m. Place containers per the selected model pattern (U / L / three-wing pavilion). Add a connector spine — 2.2 m wide x 3.0 m high glass-walled corridor. Pergola structures over verandahs as horizontal slat arrays at 3.5 m height. Materials: bamboo batten cladding, lime-plaster off-white, charred-timber dark, laterite stone red-brown, standing-seam metal mid-grey, IPE timber deck. Place native canopy trees (Mangifera indica, Cocos nucifera, Anacardium occidentale) — minimum 30 for 2BHK, 45 for 3BHK, 60 for 4BHK. Add a reflective rectangular water feature inside the courtyard for 4BHK. Drop a low-poly car in the porch and a golf cart for 4BHK. Save as .skp and export a 4000-px PNG of the aerial isometric, plus a 3-view sheet (plan, front elevation, side elevation)."));
children.push(h2("15.3 — Revit alternative note"));
children.push(body("If working in Revit, treat each container as a structural framing component with insulated wall type W-CNT-INS (container + 50 mm PIR + bamboo batten) and roof type R-MTL-INS (steel deck + 75 mm PIR + standing-seam). Mass the connector spine using a generic curtain wall family. Apply the shared parameter set: RV_ModelType, RV_Bedrooms, RV_BuiltUpSqFt, RV_Acres, RV_Plantation, RV_RWH_Liters, RV_Solar_kWp."));
children.push(pageBreak());

// 16. WEBSITE PROMPT
children.push(h1("16. Website Update Prompt"));
children.push(body("Use the prompt below to update the Reserva Verde Goa website. Replace the current 'Upcoming Locations' section with this new 'Choose Your Ground-Level Modular Eco Estate' section."));
children.push(h2("Section copy"));
children.push(p([
  new TextRun({ text: "Section title: ", bold: true, color: FOREST, size: 22 }),
  new TextRun({ text: "Choose Your Ground-Level Modular Eco Estate", size: 22, color: CHAR })
]));
children.push(p([
  new TextRun({ text: "Subtitle: ", bold: true, color: FOREST, size: 22 }),
  new TextRun({ text: "Select from 2BHK, 3BHK, 4BHK, or fully customisable ground-level modular container estate models, each planned within a private 1-acre eco-sensitive plantation estate.", size: 22, color: CHAR })
]));
children.push(h2("Data array contract (estateModels)"));
children.push(body("Each card binds to one object in the estateModels array. The fields below are stable contracts; UI must not hard-code copy."));
children.push(tbl([
  ["Field", "Type", "Example / Notes"],
  ["id", "string", "'2bhk' | '3bhk' | '4bhk' | 'custom'"],
  ["title", "string", "'2BHK Compact Luxury Modular Eco Estate'"],
  ["bedroomType", "string", "'2BHK' | '3BHK' | '4BHK' | 'Customisable'"],
  ["builtUpArea", "string", "'2500 Sq.Ft' | 'Customisable'"],
  ["estateSize", "string", "'1 Acre'"],
  ["assetType", "string", "'Ground-Level Modular Container Eco Home + Eco Plantation Estate'"],
  ["homeType", "string", "'Ground-level modular container eco-home'"],
  ["placementOptions", "string[]", "['Front','Centre','Side','Rear','Courtyard-centric']"],
  ["plantationOptions", "string[]", "['Cashew','Mango','Coconut','Teak + Pepper',...]"],
  ["description", "string", "premium short description"],
  ["ecoFeatures", "string[]", "['Solar-Ready','RWH','Greywater Reuse','Bio-Septic',...]"],
  ["specifications", "string[]", "['Ground-Level','2BHK','2500 Sq.Ft','1 Acre','Modular Container',...]"],
  ["investmentHighlights", "string[]", "['Plantation-Backed Estate','Optional Farm-Stay','Wellness-Ready',...]"],
  ["image", "string", "URL to model card image"],
  ["ctaLabel", "string", "'View Details'"],
  ["secondaryCtaLabel", "string", "'Download Specs'"]
], [2400, 1400, 5560]));
children.push(h2("Card layout brief"));
[
  "Large rounded card (24–32 px radius).",
  "Left side (50%): illustration / site plan SVG / aerial render.",
  "Right side (50%): title, bedroom + built-up badges, short description, plantation chips, eco-feature chips, investment highlights, primary CTA + secondary CTA.",
  "Mobile: stack vertically (image on top, content below)."
].forEach(t => children.push(bullet(t)));
children.push(h2("Visual language"));
children.push(tbl([
  ["Token", "Value", "Use"],
  ["--rv-forest", "#1F3A2E", "Headings, primary buttons, dark backgrounds"],
  ["--rv-gold", "#B08A3E", "Accents, dividers, badge borders, hover states"],
  ["--rv-ivory", "#FBF8F1", "Card surface, light backgrounds"],
  ["--rv-beige", "#F4EDDD", "Section background, secondary surface"],
  ["--rv-charcoal", "#2A2A2A", "Body text"],
  ["--rv-line", "#C7B97A", "Hairline dividers"]
], [2400, 1800, 5160]));
children.push(h2("Tone guardrails"));
[
  "Use phrases: designed for, positioned for, optional, potential, subject to final architectural planning, eco-sensitive development guidelines.",
  "Avoid: guaranteed returns, risk-free, cheap, unrealistic promises, overhype."
].forEach(t => children.push(bullet(t)));
children.push(pageBreak());

// 17. FINAL SPECS MATRIX
children.push(h1("17. Final Specifications Matrix"));
children.push(body("Single reference matrix for sales decks, brochures, and the website specifications module."));
children.push(tbl([
  ["Attribute", "2BHK", "3BHK", "4BHK", "Customisable"],
  ["Asset type", "GL Modular Container Eco Home + Plantation", "GL Modular Container Eco Home + Plantation", "GL Modular Container Eco Home + Plantation", "GL Modular Container Eco Home + Plantation"],
  ["Built-up area", "2,500 sq.ft", "3,500 sq.ft", "4,500 sq.ft", "Customisable (1,500–6,000)"],
  ["Estate size", "1 acre", "1 acre", "1 acre", "1 acre"],
  ["Storeys", "G only", "G only", "G only", "G only"],
  ["Bedrooms", "2 + powder", "3 + powder", "4 + powder + opt. staff", "1–4 + powder"],
  ["Bathrooms", "2 + powder", "3 + powder", "4 + powder", "Matched to BR count"],
  ["40 ft modules", "4", "6", "8", "1–12"],
  ["20 ft modules", "2", "2", "3", "0–6"],
  ["Layout intent", "Courtyard", "L-shape pavilion", "Three-wing pavilion", "Buyer-selected"],
  ["Recommended placement", "Front-to-centre", "Centre", "Rear-of-centre", "Any"],
  ["Plantation share of plot", "~63%", "~57%", "~50%", "≥45%"],
  ["RWH capacity", "~15,000 L", "~25,000 L", "~40,000 L", "Sized to design"],
  ["Solar-ready kWp", "5–7", "8–10", "12–15", "Sized to design"],
  ["Greywater reuse", "Yes", "Yes (reed bed)", "Yes (wetland)", "Yes"],
  ["Bio-septic", "Single chamber", "Twin chamber", "Twin + filter pond", "Sized to design"],
  ["Pool option", "Plunge", "Plunge / lap", "Swimming pool", "Buyer-selected"],
  ["Rental readiness", "Optional", "Optional", "Optional", "Off / Light / Full"],
  ["Ideal buyer", "Couples, NRIs, eco buyers", "HNI families, NRIs, wellness", "HNIs, retreat ops, hospitality", "Any persona"]
], [1800, 2000, 2000, 2000, 1560]));
children.push(spacer());
children.push(body("All figures are concept-stage and subject to final architectural planning, statutory approvals, and Reserva Verde Goa eco-sensitive development guidelines. No yield, return, or appreciation projections are made or implied."));
children.push(spacer());
children.push(new Paragraph({
  alignment: AlignmentType.CENTER,
  children: [new TextRun({ text: "— End of concept document —", italics: true, color: GOLD, size: 22 })]
}));

// DOC
const doc = new Document({
  creator: "Reserva Verde Goa Design Studio",
  title: "Reserva Verde Goa — Ground-Level Modular Eco Estates Concept",
  description: "Architectural concept, layouts, specifications, drawing brief, and website update for Reserva Verde Goa.",
  styles: {
    default: { document: { run: { font: "Calibri", size: 22, color: CHAR } } },
    paragraphStyles: [
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 36, bold: true, color: FOREST, font: "Calibri" },
        paragraph: { spacing: { before: 360, after: 180 }, outlineLevel: 0 } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 28, bold: true, color: FOREST, font: "Calibri" },
        paragraph: { spacing: { before: 240, after: 120 }, outlineLevel: 1 } },
      { id: "Heading3", name: "Heading 3", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 24, bold: true, color: GOLD, font: "Calibri" },
        paragraph: { spacing: { before: 160, after: 80 }, outlineLevel: 2 } }
    ]
  },
  numbering: {
    config: [{
      reference: "bullets",
      levels: [
        { level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } },
        { level: 1, format: LevelFormat.BULLET, text: "◦", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 1080, hanging: 360 } } } }
      ]
    }]
  },
  sections: [{
    properties: {
      page: {
        size: { width: 12240, height: 15840 },
        margin: { top: 1080, right: 1080, bottom: 1080, left: 1080 }
      }
    },
    headers: {
      default: new Header({
        children: [new Paragraph({
          children: [
            new TextRun({ text: "Reserva Verde Goa", bold: true, color: FOREST, size: 18 }),
            new TextRun({ text: "\tGround-Level Modular Eco Estates · Concept Document", color: "777777", size: 18 })
          ],
          tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
          border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: LINE, space: 4 } }
        })]
      })
    },
    footers: {
      default: new Footer({
        children: [new Paragraph({
          children: [
            new TextRun({ text: "Bluechip Global Agro", color: "777777", size: 18 }),
            new TextRun({ text: "\tPage ", color: "777777", size: 18 }),
            new TextRun({ children: [PageNumber.CURRENT], color: "777777", size: 18 }),
            new TextRun({ text: " of ", color: "777777", size: 18 }),
            new TextRun({ children: [PageNumber.TOTAL_PAGES], color: "777777", size: 18 })
          ],
          tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }]
        })]
      })
    },
    children
  }]
});

Packer.toBuffer(doc).then(buf => {
  fs.writeFileSync("/sessions/relaxed-quirky-pasteur/mnt/outputs/Reserva_Verde_Goa_Concept.docx", buf);
  console.log("OK wrote Reserva_Verde_Goa_Concept.docx", buf.length, "bytes");
});
