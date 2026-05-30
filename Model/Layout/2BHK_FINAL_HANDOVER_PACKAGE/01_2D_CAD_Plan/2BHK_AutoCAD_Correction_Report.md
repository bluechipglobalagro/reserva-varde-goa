# AutoCAD Correction Report — 2BHK Floor Plan

**Drawing:** `2BHK_FloorPlan_CAD_v2.dxf`
**Replaces:** `2BHK_FloorPlan_CAD.dxf` (v1.0)
**Revision:** v2.0 (cleaned)
**Project:** Reserva Verde Goa — 2BHK Compact Modular Eco Estate
**Sheet:** RV-2BHK-FP-01 — Concept Floor Plan @ 1 : 100
**Date:** May 2026

---

## 1. Audit of v1.0 (input file)

| Property | Value |
|---|---|
| DXF version | AC1032 (R2018) |
| Modelspace entities | 262 |
| Layers | 26 |
| Audit errors | 0 |
| Audit fixes | 0 |
| Extents | 34 241 × 24 794 mm |
| Format integrity | Clean |

The file was structurally valid but visually "first-pass" — colours assigned per-layer in AutoCAD Color Index (ACI), single-line walls without masonry hatch, simple door arcs, no door/window tags, partial dimensions, courtyard rendered colourful, no sheet frame, no general notes panel, no area schedule.

## 2. Corrections applied in v2.0

### Drawing style — converted to professional B&W architectural standard
- **All 30 layers** forced to AutoCAD colour 7 (white in modelspace = prints black). Visual hierarchy now driven entirely by **lineweights** (0.09 → 0.60 mm), as per ISO/CAD-standard practice.
- Background defaults to white; no more dark-blue ACAD modelspace look.

### Walls
- External walls re-drawn as **double-line wall band 230 mm thick** with proper masonry **ANSI31 (45° diagonal) hatch** between outer and inner faces.
- Inter-container partition walls (C1/C2, C3/C4, C5/C6) drawn at **172 mm** with double-line technique.
- Internal room partitions drawn at **115 mm** double-line.
- Detached utility module C7 receives the same double-wall + hatch treatment.

### Doors & openings
- All 9 hinged doors keep proper **swing arc + leaf line** symbol.
- 3 sliding doors (Living → Verandah, Dining → Courtyard, Kitchen → Courtyard) drawn with full **track + dual leaf + direction-of-slide arrow** notation.
- Every door now carries a **D-01 … D-12 circular tag**.

### Windows
- Replaced single 3-line glass marks with proper **architectural window symbols**: outer wall break + 3 glass lines + sill line outside.
- 9 windows (W-01 … W-09) tagged with circular tags.

### Container module labels
- Added **boxed C1 … C7 labels** placed inside each container (was: C-1…C-7 dotted text without box).

### Fixtures
- **Toilet (WC):** tank rectangle + ellipsoidal bowl polyline (was: plain rectangle).
- **Basin/vanity:** counter rectangle + inset sink bowl + faucet circle.
- **Shower:** stall outline + drain crosshair circle at centre + slope-to-drain lines from 4 corners + showerhead circle on far wall.
- **Kitchen sink:** double-bowl with drain circles.
- **Hob:** 4-burner cooktop with circular burner symbols.
- **Fridge slot** added (with door swing line).
- **Washing machine** drum + sink in utility C7.

### Furniture
- **Beds:** mattress rectangle + headboard line + pillow rectangles + nightstands (was: solid filled rectangle).
- **Wardrobes:** vertical hatching showing partition lines.
- **Sofa set:** 3-seater + 2-seater + 2 armchairs + coffee table + TV console.
- **Dining set:** 6-seater table + individual chair symbols (8 chair positions).
- **Study desk:** desk + chair + bookcase with shelf lines.
- **Master lounge:** bench seat + 2 armchairs.

### Courtyard & landscape
- Courtyard hatched with **AR-BRSTD (brick paving)** instead of solid colour.
- **Optional plunge pool** drawn as dashed outline (DASHED linetype) with **WAVE water hatch**, labelled "OPTIONAL · 1.4 × 3.0 m".
- 2 frangipani tree symbols (concentric circle technique).
- Stepping stones along central N-S spine.

### Verandah & deck
- South verandah hatched with **AR-PARQ1 (parquet)** for timber deck appearance.
- Service walkway pavers added between pavilion and utility C7.

### Glass corridors
- 2 glazed link corridors between courtyard wings, with **mullion lines** showing aluminium frame divisions.

### Dimensions
- Complete **external dimension strings** on all 4 sides: overall (12 200 mm wide × 17 080 mm deep) + per-bay breakdowns.
- **Internal dimensions**: courtyard width 2440 mm, courtyard depth 12 200 mm, utility C7 footprint 2440 × 6100 mm.
- Architectural tick marks (DIMBLK = ARCHTICK) replacing arrowheads — matches standard practice.

### Annotation & Tags
- Door tags **D-01 to D-12** (circled).
- Window tags **W-01 to W-09** (circled).
- Boxed container module labels **C1 to C7**.
- Room names + square-footage areas under each label.

### North arrow
- Upgraded from single arrow → **compass-style north arrow** (outer circle + 4 cardinal ticks + filled half-arrow indicating north + "N" label).

### Scale bar
- 0–5 m scale bar with alternating filled/open segments at 1 m each.
- Labelled "SCALE 1 : 100 (metres)".

### Sheet frame & title block
- Added **A1 landscape sheet frame** (841 × 594 mm) with inner border.
- Title block rebuilt as a **12-row key/value table** with header band: PROJECT, MODEL, BUILT-UP AREA, FOOTPRINT, PLAN TYPE, DRAWING, DRAWING NO., SCALE, REVISION, DATE, DRAWN BY, STATUS.
- **Area Schedule table** (16 rooms + total + open spaces) placed above title block.
- **General Notes panel** (10 items) covering dimensions, container specs, foundation, walls, glazing, roof, wet area waterproofing, north orientation, sheet size, status.
- **Container Module Key** legend below the plan listing C1–C7 with container size and function.

### Layer system
| Family | Layers |
|---|---|
| Walls | A-WALL-EXT, A-WALL-INT, A-CONT-MOD |
| Openings | A-DOOR, A-WINDOW, A-GLAZE |
| Fixtures | A-FIX-WC, A-FIX-KIT |
| Furniture | A-FURN |
| Landscape | A-COURT, A-DECK, A-WATER |
| Hatches | A-HATCH-WALL, A-HATCH-BATH, A-HATCH-DECK, A-HATCH-COURT, A-HATCH-KIT |
| Annotation | A-DIM, A-TEXT-LRG, A-TEXT-MED, A-TEXT-SML, A-ANNO, A-TAG |
| Drawing furniture | A-NORTH, A-SCALE, A-TITLE, A-SHEET, A-GRID |

Total: **30 layers** (was 26).

### Final audit
```
DXF version : AC1032 (R2018)
Modelspace entities : 608  (was 262 — 2.3× more detail)
Layers : 30
Audit errors : 0
Audit fixes : 0
File size : 180 KB
```

## 3. Compliance with brief

| Brief item | Status |
|---|---|
| 2500 sq.ft built-up area | ✅ confirmed — see Area Schedule (totals to 2 500 sq.ft) |
| Ground-level only — no stacking | ✅ all 7 containers placed on a single Y-UP plane; no Z-coordinate stacking; verified in DXF |
| 6 × 40 ft HC containers | ✅ C1–C6 each drawn at 12 200 × 2 440 mm (= 40 ft HC) |
| 1 × 20 ft service module | ✅ C7 drawn at 6 100 × 2 440 mm (= 20 ft STD), detached |
| U-shape courtyard | ✅ courtyard 2 440 × 12 200 mm preserved between C4 and C6 wings |
| No hotel-pod layout | ✅ each container houses a complete residential function (foyer/living, kitchen, master suite, BR2 suite, etc.) |
| All rooms in brief | ✅ entry foyer, living, dining, kitchen, master BR, master WR, master bath, BR2, BR2 bath, study/family lounge, powder toilet, utility, store, glass corridors, courtyard, verandah, forest deck, optional plunge pool, service access |

## 4. What still needs architect / structural verification

These are **concept-stage decisions** that require licensed-professional sign-off before construction:

1. **Structural** — helical screw pile spacing, bearing capacity tests on actual Goa lateritic soil, container reinforcement frames at wide openings (especially the south face of C1/C2 where the living/dining/kitchen line is almost fully glazed).
2. **Cyclone & seismic loading** — Goa lies in Wind Zone 1 (Vb = 33 m/s) and Seismic Zone III; uplift connections and lateral bracing for containers must be designed by a registered structural engineer.
3. **Waterproofing & monsoon detailing** — drip flashing, courtyard drainage gradient, plunge pool overflow, glass corridor flashing details.
4. **MEP coordination** — plumbing rises, electrical load calculation, AC compressor placement, septic system / STP sizing per Goa State Pollution Control Board, rainwater harvesting tank capacity.
5. **Regulatory** — coverage % within the 1-acre plot, FAR/FSI per Goa Land Revenue Code, forest department NOC if jungle land, GCZMA clearance if within CRZ, Town & Country Planning Department permission.
6. **Fire egress** — ensure each bedroom has at least one openable window meeting NBC 2016 rescue dimensions (clear opening ≥ 0.6 m × 0.6 m).
7. **Accessibility** — verandah / deck step height and width per Harmonised Guidelines if any unit is intended as accessible.
8. **Container sourcing** — confirm origin, certification, and decontamination of ISO containers (history of cargo, especially Category-A chemicals).
9. **Acoustic separation** — between BR2 and bathroom; between master BR and master bath plumbing chase.
10. **Final dimensions** — internal partition layouts inside C4 and C6 may require minor adjustment for door swing clearances once joinery suppliers are confirmed.

## 5. Compliance disclaimer (mandatory)

> This drawing is a **CONCEPT** issued for design coordination only. It is not a construction drawing. All dimensions, materials, structural assumptions, environmental performance figures and area calculations are indicative and **subject to final approvals**, licensed structural engineering, MEP design, and Goa regulatory compliance (Town & Country Planning, GCZMA where applicable, forest department NOC where applicable, and Goa State Pollution Control Board). Nothing in this drawing constitutes a guarantee of yield, appreciation, or returns. All container homes are designed strictly as ground-level single-storey units; no stacking or upper-floor extension is intended or permitted under this concept.

---

*Reserve Varde Design Studio — May 2026*
