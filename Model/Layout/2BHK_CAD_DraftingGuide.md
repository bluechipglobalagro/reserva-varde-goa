# 2BHK Floor Plan — AutoCAD Drafting Guide
**Reserve Varde · Drawing RV-2BHK-FP-01 · v1.0**

> This document walks an AutoCAD drafter through recreating the `2BHK_FloorPlan_CAD.svg` as a native DWG. Hand this + the SVG to your drafter and they can deliver a coordinated A1 plot in one working day.

---

## 1. Drawing setup

| Setting | Value |
|---|---|
| Units | Millimetres (mm) |
| Drawing limits | `0,0` to `25000,18000` (covers building + dimensions + margins) |
| Drawing scale (model space) | 1:1 (mm) |
| Plotted scale | **1:100** on A1 (594 × 841 mm, landscape) |
| Plot style table | RV-MONO.ctb (provided separately) — maps colours to lineweights |
| File format | DWG 2018 |
| Title block | RV-A1-LANDSCAPE.dwg (insert as Xref) |

Open AutoCAD → `NEW` → `acadiso.dwt` template → save as `RV-2BHK-FP-01.dwg`.

---

## 2. Layer setup

Create the following layers (`LA` → New Layer). Colour numbers match the standard ACAD palette.

| Layer | Colour | Lineweight | Linetype | Purpose |
|---|---|---|---|---|
| `A-WALL-EXT` | 7 (white) | 0.50 mm | CONTINUOUS | Thick external container walls |
| `A-WALL-INT` | 7 (white) | 0.25 mm | CONTINUOUS | Internal partition walls |
| `A-CONT-MOD` | 8 (grey) | 0.18 mm | DASHED | Container module outlines (C-1 to C-7) |
| `A-DOOR` | 6 (magenta) | 0.18 mm | CONTINUOUS | Door swing arcs + leaves |
| `A-WINDOW` | 4 (cyan) | 0.18 mm | CONTINUOUS | Window openings (3-line symbol) |
| `A-GLAZE` | 4 (cyan) | 0.25 mm | CONTINUOUS | Sliding glass doors |
| `A-FIX-WC` | 7 (white) | 0.15 mm | CONTINUOUS | WC, basin, shower, bathtub fixtures |
| `A-FIX-KIT` | 7 (white) | 0.15 mm | CONTINUOUS | Kitchen counter, sink, hob, island |
| `A-FURN` | 9 (grey) | 0.13 mm | CONTINUOUS | Furniture (sofa, bed, dining, wardrobe) |
| `A-COURT` | 41 (sand) | 0.18 mm | CONTINUOUS | Courtyard slab + water channel |
| `A-DECK` | 34 (brown) | 0.18 mm | CONTINUOUS | Forest deck + outdoor dining + pool |
| `A-HATCH-BATH` | 252 | 0.13 mm | CONTINUOUS | Bathroom floor tile hatch |
| `A-HATCH-BED` | 252 | 0.13 mm | CONTINUOUS | Bed mattress hatch |
| `A-HATCH-DECK` | 252 | 0.13 mm | CONTINUOUS | Deck timber-plank hatch |
| `A-HATCH-COURT` | 252 | 0.13 mm | CONTINUOUS | Courtyard stone-paver hatch |
| `A-HATCH-WATER` | 14 (cyan) | 0.13 mm | CONTINUOUS | Pool / water-channel hatch |
| `A-DIM` | 5 (blue) | 0.18 mm | CONTINUOUS | All dimensions |
| `A-TEXT` | 7 (white) | 0.18 mm | CONTINUOUS | Room names, areas, container IDs |
| `A-ANNO` | 2 (yellow) | 0.13 mm | CONTINUOUS | Door tags, window tags, annotations |
| `A-NORTH` | 7 (white) | 0.25 mm | CONTINUOUS | North arrow block |
| `A-SCALE` | 7 (white) | 0.20 mm | CONTINUOUS | Scale bar |
| `A-TITLE` | 7 (white) | 0.30 mm | CONTINUOUS | Title block + sheet border |

---

## 3. Building geometry (mm, building origin = 0,0)

### 3.1 Container outlines (Layer `A-CONT-MOD`, DASHED)

| Container | Rectangle | Corner (X, Y) | Size |
|---|---|---|---|
| C-1 (40 ft HC) | Entry + Living | `(0, 0)` | 12,200 × 2,440 |
| C-2 (40 ft HC) | Dining + Kitchen | `(0, 2440)` | 12,200 × 2,440 |
| C-3 (40 ft HC) | Master Bedroom | `(0, 4880)` | 2,440 × 12,200 |
| C-4 (40 ft HC) | M.WR + M.Bath + M.Lounge | `(2440, 4880)` | 2,440 × 12,200 |
| C-5 (40 ft HC) | Bedroom 2 | `(9760, 4880)` | 2,440 × 12,200 |
| C-6 (40 ft HC) | BR2 Bath + Study + Powder | `(7320, 4880)` | 2,440 × 12,200 |
| C-7 (20 ft) | Utility + Store | `(13700, 6880)` | 2,440 × 6,100 |

### 3.2 External wall outline (Layer `A-WALL-EXT`)

Trace the U-shape perimeter with a `PLINE` at 200 mm offset inside the container outlines. Vertices in mm (drawn CCW from top-left):

```
(0, 0) → (12200, 0) → (12200, 17080) → (9760, 17080)
→ (9760, 4880) → (2440, 4880) → (2440, 17080) → (0, 17080) → (0, 0)
```

Then `OFFSET` 200 mm to the inside → that's the **inner face** of the external wall (`A-WALL-INT` for visual reference, or you can keep both lines on `A-WALL-EXT` for a "cavity wall" look).

### 3.3 Internal partitions (Layer `A-WALL-INT`)

```
Entry Foyer / Living partition:   (3000, 0)  to  (3000, 2440)
Master / M.Bath suite partition:  (2440, 4880) to (2440, 17080)
M.WR – M.Bath partition:          (2440, 7930) to (4880, 7930)
M.Bath – M.Lounge partition:      (2440, 11590) to (4880, 11590)
BR2 / BR2 Bath suite partition:   (9760, 4880) to (9760, 17080)
BR2 Bath – Study partition:       (7320, 8540) to (9760, 8540)
Study – Powder partition:         (7320, 14040) to (9760, 14040)
C-7 Utility – Store partition:    (13700, 9880) to (16140, 9880)
```

Wall thickness on internals: 100 mm. Draw partitions as **single lines** at 100 mm thickness (or as 2 parallel lines if your house style uses cavity-wall hatching).

### 3.4 Door openings (Layer `A-DOOR`)

Use a custom block `RV-DOOR` (door leaf line + 1/4-circle arc). Insert at hinge points:

| Door | Hinge (X, Y) | Width | Direction |
|---|---|---|---|
| D-01 main entry | `(1800, 2440)` | 1050 | swings into living room (N) |
| D-02 foyer → living | `(3000, 1700)` | 900 | swings into living (E) |
| D-03 master entry (from glass spine) | `(2440, 4880)` then in-spine | 900 | swings into bedroom (W) |
| D-04 master → WR | `(2440, 6500)` | 800 | swings into WR (E) |
| D-05 WR → bath | `(3700, 7930)` | 800 | swings into bath (S) |
| D-06 bath → lounge | `(3700, 11590)` | 800 | swings into lounge (S) |
| D-07 BR2 entry | `(9760, 4880)` | 900 | swings into BR2 (E) |
| D-08 BR2 → bath | `(8500, 8540)` | 800 | swings into bath (N) |
| D-09 bath → study | `(8500, 8540)` | 750 | (same partition, opposite sides) |
| D-10 study → powder | `(8500, 14040)` | 750 | swings into powder (N) |
| D-13 utility service | `(13700, 7380)` | 900 | swings out of utility (W) |

For each door, after inserting the `RV-DOOR` block, `ROTATE` to the correct quadrant.

### 3.5 Window openings (Layer `A-WINDOW`)

Use a custom block `RV-WIN` (3 parallel lines spanning the opening, 80 mm offsets). Place along the external wall at:

| Window | Centre (X, Y) | Width | Wall |
|---|---|---|---|
| W-01 living west | `(3000, 0)` mid | 1500 | north wall of C-1 |
| W-02 living north | `(8000, 0)` | 1500 | north wall of C-1 |
| W-03 kitchen east | `(12200, 5500)` | 1800 | east wall of C-2 |
| W-04 master west | `(0, 3750)` | 1800 | west wall of C-3 |
| W-05 master north | `(1500, 4880)` | 1500 | north-west wall of C-3 |
| W-06 master bath west | `(0, 6800)` | 600 | west wall of C-4 |
| W-07 BR2 east | `(12200, 7500)` | 1800 | east wall of C-5 |
| W-08 BR2 bath east | `(12200, 6800)` | 600 | east wall of C-6 |
| W-09 study east | `(12200, 11000)` | 1500 | east wall of C-6 |
| W-10 utility north | `(14800, 6880)` | 1200 | north wall of C-7 |

### 3.6 Sliding glass doors (Layer `A-GLAZE`)

Use a custom block `RV-SLD` (2 parallel offset lines + track + overlap marker at midpoint).

| Slider | From (X,Y) | To (X,Y) | Width | Wall |
|---|---|---|---|---|
| SD-01 living south | `(7000, 0)` | `(9400, 0)` | 2400 | north wall of C-1 |
| SD-02 dining → courtyard | `(4000, 4880)` | `(6400, 4880)` | 2400 | south wall of C-2 |
| SD-04 master → courtyard | `(2440, 12380)` | `(2440, 14380)` | 2000 | east wall of C-3 |
| SD-05 BR2 → courtyard | `(9760, 12380)` | `(9760, 14380)` | 2000 | west wall of C-5 |
| SD-06 master south → deck | `(2740, 17080)` | `(4240, 17080)` | 1500 | south wall of C-4 |
| SD-07 BR2 south → deck | `(7960, 17080)` | `(9460, 17080)` | 1500 | south wall of C-6 |

---

## 4. Fixtures, furniture, and hatches

### 4.1 Bathroom fixtures (Layer `A-FIX-WC`)

Use these standard block sizes (insert from `RV-FIX` library):

| Fixture | Block name | Size (mm) |
|---|---|---|
| WC (wall-hung) | `WC-WALL` | 380 × 600 |
| Wash basin (counter-top) | `BSN-CTR` | 600 × 450 |
| Shower (walk-in) | `SHW-WLK` | 900 × 900 (or 1200 × 900 for master) |
| Soaking nook (master) | `TUB-SOK` | 1400 × 700 |
| Floor drain | `DRN-FLR` | 100 × 100 |

Place per the room layout. Apply `A-HATCH-BATH` (ANSI31 at 50 mm scale) to bathroom floors.

### 4.2 Kitchen (Layer `A-FIX-KIT`)

| Element | Block | Size |
|---|---|---|
| Kitchen counter (L-shape) | `KIT-CTR` | 600 mm deep |
| Breakfast island | `KIT-ISL` | 1800 × 900 |
| Sink (single bowl) | `KIT-SNK` | 500 × 400 |
| Gas hob (4-burner) | `KIT-HOB` | 600 × 500 |
| Refrigerator | `KIT-REF` | 700 × 700 |
| Microwave wall-mount | `KIT-MIC` | 500 × 350 (dashed, above counter) |

### 4.3 Furniture (Layer `A-FURN`)

| Item | Block | Size (mm) |
|---|---|---|
| King bed | `FURN-BED-K` | 1800 × 2000 |
| Queen bed | `FURN-BED-Q` | 1500 × 2000 |
| Bedside table | `FURN-BST` | 500 × 450 |
| Wardrobe (master) | `FURN-WR-2M` | 2000 × 700 |
| Wardrobe (BR2) | `FURN-WR-S` | 2400 × 600 |
| Sofa (3-seat) | `FURN-SOFA-3` | 3000 × 900 |
| Lounge chair | `FURN-CHR-L` | 900 × 800 |
| Coffee table | `FURN-CTBL` | 1800 × 700 |
| Dining table (6-seater) | `FURN-DIN-6` | 2400 × 1000 |
| Dining chair | `FURN-CHR-D` | 420 × 420 |
| Study desk | `FURN-DSK` | 1800 × 700 |
| Task chair | `FURN-CHR-T` | 600 × 600 |

### 4.4 Hatches

| Surface | Pattern | Scale | Angle | Layer |
|---|---|---|---|---|
| Bathroom floor | ANSI31 | 50 mm | 45° | `A-HATCH-BATH` |
| Bed mattress | NET | 80 mm | 0° | `A-HATCH-BED` |
| Deck (timber planks) | AR-PARQ1 | 145 mm | 90° | `A-HATCH-DECK` |
| Courtyard (stone pavers) | AR-BRSTD | 600 mm | 0° | `A-HATCH-COURT` |
| Water (channel, pool) | WAVE | 200 mm | 0° | `A-HATCH-WATER` |

---

## 5. Container module outlines

On layer `A-CONT-MOD` (DASHED, 0.18 mm), draw 7 rectangles per Section 3.1. Add a small block tag at the top-left corner of each:

- Tag style: `40 × 16 mm` filled black rectangle with white text 10 mm height
- Labels: `C-1`, `C-2`, `C-3`, `C-4`, `C-5`, `C-6`, `C-7`

---

## 6. Courtyard, deck, pool

| Element | Coordinates (mm) | Layer |
|---|---|---|
| Courtyard | `(4880, 4880)` to `(7320, 17080)` minus the south arms... actually courtyard rectangle: `(4880, 4880)` to `(7320, 13380)` | `A-COURT` |
| Stone water channel inside courtyard | `(5500, 8300)` to `(6700, 9700)` | `A-COURT` + water hatch |
| Plumeria tree (top view disc) | Circle Ø 1400 mm at `(6500, 5800)` | `A-COURT` |
| Forest deck (covered south) | `(2440, 17480)` to `(9760, 20480)` (200 mm setback + 3000 deep) | `A-DECK` + deck hatch |
| Outdoor dining pergola | `(2940, 21080)` to `(7940, 23580)` | `A-DECK` + deck hatch (dashed pergola line) |
| Plunge pool (optional) | `(7500, 21080)` to `(13500, 23580)` — dashed outline | `A-DECK` + water hatch |

---

## 7. Dimensions (Layer `A-DIM`)

Set dimension style `RV-DIM`:
- Text height: 250 mm (renders at 2.5 mm on A1 at 1:100)
- Arrowhead: 250 mm closed-filled
- Extension line offset: 150 mm
- Extension line extension: 150 mm
- Text style: ARIAL 250 mm

Dimension lines to add:
1. **Overall E-W** (top of building, offset 1500 mm above): 12,200 mm
2. **Overall N-S** (left of building, offset 1500 mm): 17,080 mm
3. **Per-container 40 ft length**: 12,200 mm — on north arm and on each vertical arm
4. **Per-container 8 ft width**: 2,440 mm — on each container
5. **Courtyard E-W**: 7,320 mm
6. **Courtyard N-S**: 12,200 mm (or actual)
7. **Deck overall**: 7,320 × 3,000 mm
8. **All door widths**: 1,050 / 900 / 800 / 750 mm
9. **All window widths**: 1,800 / 1,500 / 1,200 / 600 mm
10. **All sliding door widths**: 2,400 / 2,000 / 1,500 mm

---

## 8. Text and annotation

### Room labels (Layer `A-TEXT`)

Text style `RV-ROOM`: ARIAL, 350 mm height, uppercase, letter-spacing 50 mm.

Per room, place 2 lines:
- Line 1: room name (350 mm)
- Line 2: area (250 mm, e.g. "280 sq.ft")

### Container ID badges

Black-filled rectangle at the top-left corner of each container module:
- Size: 1,400 × 600 mm
- Text: white, 400 mm, bold, e.g. "C-1"

### Door / window tags (Layer `A-ANNO`)

400 mm text with bubble (Ø 600 mm) at each opening — codes D-01..D-13, W-01..W-10, SD-01..SD-07.

---

## 9. North arrow, scale bar, title block

### North arrow

Insert block `RV-NORTH` at top-left of sheet (outside building). Circle Ø 800 mm, arrow pointing north, "N" label.

### Scale bar

Block `RV-SCALEBAR-1-100`:
- Five segments × 1,000 mm each (so 5 m total)
- Alternating black / white fills
- Labels: 0, 1m, 2m, 3m, 4m, 5m
- Centre label: "SCALE 1:100"

### Title block

Block `RV-TITLE-A1`. Place bottom-right. Contains:
- Project: Reserve Varde
- Model: 2BHK Compact Modular Eco Estate
- Sub: 2500 sq.ft Ground-Level Container Home
- Container schedule: 6 × 40 ft HC + 1 × 20 ft Service Module
- Layout: U-Shape Courtyard Plan · Concept Floor Plan
- Scale: 1:100 · Sheet: 04 of 26
- Drawing No: RV-2BHK-FP-01
- Revision: v1.0
- Date: (today)
- Drawn by: (architect name)
- Checked by: (senior architect)
- Approved by: (project lead)

---

## 10. Plot setup

| Setting | Value |
|---|---|
| Paper size | A1 (594 × 841 mm) |
| Orientation | Landscape |
| Plot scale | 1:100 |
| Plot style | RV-MONO.ctb |
| Lineweights | as per Section 2 layer table |
| Margins | 10 mm all sides |

`PLOT` → preview → check that all dimensions, annotations, and the title block render correctly → plot to PDF.

---

## 11. Quality checklist before handover

- [ ] All 7 container outlines visible and labelled C-1 to C-7
- [ ] External walls drawn as continuous PLINE, 200 mm wall thickness
- [ ] Internal partitions at 100 mm thickness
- [ ] All doors have swing arc + door leaf, tagged D-01 to D-13
- [ ] All windows tagged W-01 to W-10 with proper 3-line symbol
- [ ] All sliding doors tagged SD-01 to SD-07
- [ ] Bathroom fixtures (WC + basin + shower) placed in all 3 bathrooms (master, BR2, powder)
- [ ] Kitchen counter + island + sink + hob in C-2
- [ ] Bed + bedside tables in master and BR2
- [ ] Sofa + coffee table in living room
- [ ] Dining table + 6 chairs in dining area
- [ ] Wardrobe in master WR and BR2
- [ ] Study desk + chair in study area
- [ ] All hatches applied at correct scale (bathroom, bed, deck, courtyard, water)
- [ ] All dimensions: overall, container, room, door, window, slider, courtyard, deck
- [ ] Room name + area annotation in every room
- [ ] North arrow + scale bar + title block placed
- [ ] Sheet number 04 of 26 in title block
- [ ] Drawing number RV-2BHK-FP-01
- [ ] Revision v1.0 marked
- [ ] Concept-stage disclaimer present

---

## 12. Importing the reference SVG into AutoCAD

You can use the provided `2BHK_FloorPlan_CAD.svg` as a **reference background** while drafting:

1. In AutoCAD, type `IMAGEATTACH` and select the SVG → AutoCAD will convert via Inkscape if available; otherwise rasterise to PNG first.
2. **Recommended:** open the SVG in **Inkscape** → `Save As` → DXF → import the DXF as a reference layer in your DWG.
3. Lock the reference layer (`A-REF`) and draft your clean DWG geometry on top.

The provided SVG is at 1:100 equivalent (1 unit ≈ 0.07 mm scaled). When importing, scale the reference up by **14.3×** to land at 1:1 mm (or recalculate from the dimensions shown on the SVG).

---

## 13. Block library suggested (RV-BLOCKS.dwg)

Save a separate file `RV-BLOCKS.dwg` containing all reusable blocks. Subsequent project drawings (3BHK, 4BHK, custom) reuse the same library:

```
RV-BLOCKS.dwg
├── Doors
│   ├── RV-DOOR-1050
│   ├── RV-DOOR-900
│   ├── RV-DOOR-800
│   └── RV-DOOR-750
├── Windows
│   ├── RV-WIN-1800
│   ├── RV-WIN-1500
│   ├── RV-WIN-1200
│   └── RV-WIN-600
├── Sliding doors
│   ├── RV-SLD-2400
│   ├── RV-SLD-2000
│   └── RV-SLD-1500
├── Fixtures
│   ├── WC-WALL
│   ├── BSN-CTR
│   ├── SHW-WLK
│   ├── TUB-SOK
│   ├── KIT-CTR
│   ├── KIT-ISL
│   ├── KIT-SNK
│   └── KIT-HOB
├── Furniture
│   ├── FURN-BED-K
│   ├── FURN-BED-Q
│   ├── FURN-SOFA-3
│   ├── FURN-CTBL
│   ├── FURN-DIN-6
│   ├── FURN-CHR-D
│   ├── FURN-WR-2M
│   ├── FURN-DSK
│   └── FURN-CHR-T
├── Annotation
│   ├── RV-NORTH
│   ├── RV-SCALEBAR-1-100
│   ├── RV-TITLE-A1
│   └── RV-DIM-STYLE
└── Container tags
    ├── RV-CID-40
    └── RV-CID-20
```

Once the library is built, the 3BHK and 4BHK plans take **half the time** to draft because all blocks are reused.

---

## 14. Architect verification required before construction

The drafter prepares the DWG; the **licensed architect** must verify before any construction or RERA filing:

| Item | Who verifies |
|---|---|
| Final floor plan compliance with Goa TCP / Panchayat rules | Licensed Goa-registered architect |
| Structural design of container shells + cutouts | Licensed structural engineer (IS 875 wind, IS 1893 seismic, IS 800 steel) |
| Foundation (helical pile) design | Geotechnical engineer + structural engineer |
| MEP: electrical load, single/3-phase, earthing | Licensed electrical consultant |
| MEP: plumbing, drainage, water, hot-water | Licensed plumbing consultant |
| Bio-septic + greywater design | Environmental consultant + CGWB norms |
| Fire safety + escape (if used as retreat/rental) | NBC 2016 fire consultant |
| Environmental / forest / wildlife clearance (if applicable) | Environmental consultant + competent authority |
| Tree census + tree-preservation plan | Arborist before site clearance |
| Drainage design for Goa monsoon (~2500 mm/yr) | Drainage / civil engineer |
| RERA registration if sold as a phased product | Project legal team |

---

*Concept-stage CAD drafting guide · subject to revision · Reserve Varde Goa · Bluechip Global Agro · v1.0*
