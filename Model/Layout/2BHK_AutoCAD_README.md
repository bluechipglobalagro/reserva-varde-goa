# 2BHK Floor Plan — AutoCAD DXF File

**Drawing:** `2BHK_FloorPlan_CAD.dxf`
**Format:** AutoCAD R2018 DXF (AC1032 — universal exchange format)
**Units:** millimetres
**Scale:** 1 : 100
**Drawing No.:** RV-2BHK-FP-01 v1.0

---

## How to open & convert to native AutoCAD (.dwg)

### AutoCAD (full version)
1. Launch AutoCAD.
2. **File → Open** → browse to `2BHK_FloorPlan_CAD.dxf` → Open.
3. **File → Save As** → Files of type: **AutoCAD 2018 Drawing (\*.dwg)** → Save.
4. The file is now a native `.dwg`.

### AutoCAD LT
Same steps as above — LT opens DXF natively.

### AutoCAD Web (free, browser)
1. Go to https://web.autocad.com → sign in.
2. **Open** → drag the `.dxf` in.
3. **Save As** → DWG.

### BricsCAD / DraftSight / ZWCAD / progeCAD (AutoCAD alternatives)
All open DXF directly with no conversion step.

### LibreCAD (free, open source)
Opens DXF natively. Save As → DWG (via DWGgateway plugin) or keep as DXF.

---

## Layer structure (26 layers)

| Layer | Purpose | Color | Linetype |
|---|---|---|---|
| `A-WALL-EXT` | External masonry walls 230 mm | White (7) | Continuous |
| `A-WALL-INT` | Internal partitions 115 mm | White (7) | Continuous |
| `A-CONT-MOD` | Container module outlines | Grey (8) | DASHED |
| `A-DOOR` | Doors + swing arcs | Yellow (2) | Continuous |
| `A-WINDOW` | Windows (3-line symbol) | Green (3) | Continuous |
| `A-GLAZE` | Glass corridors + sliding doors | Cyan (4) | Continuous |
| `A-FIX-WC` | Bathroom fixtures | Magenta (6) | Continuous |
| `A-FIX-KIT` | Kitchen counters / island / sink / hob | Magenta (6) | Continuous |
| `A-FURN` | Furniture (beds, sofas, dining, wardrobes) | Grey (9) | Continuous |
| `A-COURT` | Courtyard outline + planting symbols | Green (32) | Continuous |
| `A-DECK` | Verandah / decking | Tan (42) | Continuous |
| `A-WATER` | Reflective pool | Blue (141) | Continuous |
| `A-HATCH-WALL` | ANSI31 wall hatch | Grey (8) | Continuous |
| `A-HATCH-BATH` | Bath/kitchen floor hatch | Mauve (251) | Continuous |
| `A-HATCH-BED` | Bed surface NET hatch | Pink (253) | Continuous |
| `A-HATCH-DECK` | Deck timber pattern | Tan (43) | Continuous |
| `A-HATCH-COURT` | Courtyard brick paving | Tan (43) | Continuous |
| `A-DIM` | Dimensions | Red (1) | Continuous |
| `A-TEXT` | Room labels | White (7) | Continuous |
| `A-ANNO` | Area annotations + notes | White (7) | Continuous |
| `A-NORTH` | North arrow | White (7) | Continuous |
| `A-SCALE` | Scale bar | White (7) | Continuous |
| `A-TITLE` | Title block | White (7) | Continuous |

In AutoCAD you can toggle any layer on/off via **Layer Properties Manager** (`LA` shortcut).

---

## What's in the drawing

- **7 container modules** (6× 40 ft HC + 1× 20 ft) drawn as dashed outlines so you can see the modular grid behind the wall lines
- **Full exterior wall polyline** with hatched masonry band (ANSI31)
- **All interior partitions** dividing rooms
- **Doors** with 90° swing arcs (8 hinged doors + 3 sliders)
- **Windows** drawn as standard 3-line architectural symbols
- **Glass corridors** linking courtyard wings
- **Bathroom fixtures**: WC, basin, shower stalls (Master Bath, BR2 Bath, Powder)
- **Kitchen layout**: L-counter, island, sink, hob
- **Furniture blocks**: king/queen beds, sofas, armchairs, dining + chairs, wardrobes
- **Courtyard**: reflective pool, frangipani circles, stepping stones, brick-paved surround
- **South Verandah** with parquet hatch
- **Detached Utility C-7** (20 ft) with walkway pavers
- **Dimensions**: overall pavilion + per-container + courtyard + utility
- **Room labels** + area annotations (sq.ft) for every space
- **North arrow** (top right)
- **Scale bar** 0–5 m (bottom left)
- **Title block** (bottom right) — RV-2BHK-FP-01, Scale 1:100, v1.0, May 2026
- **General notes** panel (right side)

---

## Editing tips inside AutoCAD

- **Bring everything into your own template**: open your own A1 template, then `INSERT → DXF reference` and pick this file.
- **Audit before save**: type `AUDIT` → Yes — fixes any minor entity issues silently.
- **Purge unused styles**: `PURGE` → All → cleans the file before final delivery.
- **Convert to PDF**: `PLOT` → DWG To PDF.pc3 → Window → frame the title block.

---

## Companion files

- `2BHK_FloorPlan_CAD.svg` — the same plan rendered as a monochrome architectural SVG (for client preview / web)
- `2BHK_FloorPlan_CAD_Preview.html` — A1-frame HTML preview of the SVG
- `2BHK_FloorPlan_CAD_DXF_preview.png` — quick raster preview of the DXF (rendered via ezdxf + matplotlib)
- `2BHK_CAD_DraftingGuide.md` — the 14-section master specification this geometry was built from
- `../2BHK_CAD_Brief.md` — full 28-section architect handover document

---

*Reserve Varde — Concept Drawing. Subject to final approvals, structural engineering, and Goa regulatory compliance.*
