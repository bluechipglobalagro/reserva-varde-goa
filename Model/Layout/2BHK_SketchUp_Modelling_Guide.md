# SketchUp Modelling Guide — 2BHK Compact Modular Eco Estate

**Source plan:** `2BHK_FloorPlan_CAD_v2.dxf`
**Project:** Reserva Verde Goa — Reserve Varde
**Drawing No.:** RV-2BHK-FP-01 v2.0

This guide walks you through building an accurate 3D SketchUp model of the 2BHK from the cleaned 2D plan. Approximate build time: **8–12 hours for a presentation-quality model**, **20–30 hours for a fully-textured render-ready model**.

---

## 1. Import the DXF

1. Open SketchUp Pro (free / web version can import DXF only in Pro).
2. **File → Import** → choose `2BHK_FloorPlan_CAD_v2.dxf`.
3. In the import dialog:
   - **Units:** Millimeters
   - **Geometry:** ✔ Merge coplanar faces, ✔ Preserve drawing origin
   - **Scale:** 1.0
4. Click Import. Plan appears flat on the red-green axis (X-Y plane = ground plane). Container C1 sits at origin.

**Lock the imported plan as a reference**: select all imported geometry → right-click → Make Group → name it `_PLAN_REFERENCE` → right-click → Lock. This prevents accidental edits while you trace.

## 2. Set up the working environment

1. **Window → Model Info → Units** → Format: Decimal, Length: Millimeters, Precision: 0 mm.
2. **View → Toolbars** → enable: Large Tool Set, Views, Styles, Shadows.
3. Set **Camera → Standard Views → Top** and **Camera → Parallel Projection** for tracing.
4. **Window → Layers** (or Tags in SU 2020+) → create these tags:

   | Tag | Visible during tracing? |
   |---|---|
   | 00 - Reference Plan | ✓ |
   | 01 - Containers (Structure) | ✓ |
   | 02 - External Walls + Cladding | ✗ |
   | 03 - Internal Walls | ✗ |
   | 04 - Floors | ✗ |
   | 05 - Roof | ✗ |
   | 06 - Doors | ✗ |
   | 07 - Windows | ✗ |
   | 08 - Glass Corridors | ✗ |
   | 09 - Bathroom Fixtures | ✗ |
   | 10 - Kitchen | ✗ |
   | 11 - Furniture | ✗ |
   | 12 - Courtyard + Landscape | ✗ |
   | 13 - Verandah + Deck | ✗ |
   | 14 - Site + Terrain | ✗ |
   | 15 - Materials/Textures | ✗ |
   | 16 - Lighting (for render) | ✗ |

## 3. Build the container modules (C1 → C7)

Container dimensions (mm):
- **40 ft HC:** 12 192 long × 2 438 wide × 2 896 high (interior 2 697 due to corrugation depth).
- **20 ft STD:** 6 058 long × 2 438 wide × 2 591 high.

For the model use the simplified clean dimensions from the DXF: **12 200 × 2 440 × 2 900 mm** for 40 ft HC, **6 100 × 2 440 × 2 600 mm** for 20 ft.

### Process per container
1. Activate tag `01 - Containers (Structure)`.
2. Draw a rectangle on the ground (snap to corners of imported plan).
3. **Push/Pull** vertically by container height.
4. Right-click the box → **Make Group** → name e.g. `C1_Container`.
5. Optional: apply a *corten* or *standard container* texture for visual context. (Once cladded these won't be visible from outside.)

| Module | SW corner (X, Y, Z) | Size (L × W × H, mm) |
|---|---|---|
| C1 | (0, 0, 0) | 12200 × 2440 × 2900 |
| C2 | (0, 2440, 0) | 12200 × 2440 × 2900 |
| C3 | (0, 4880, 0) | 2440 × 12200 × 2900 |
| C4 | (2440, 4880, 0) | 2440 × 12200 × 2900 |
| C5 | (9760, 4880, 0) | 2440 × 12200 × 2900 |
| C6 | (7320, 4880, 0) | 2440 × 12200 × 2900 |
| C7 | (13700, 6880, 0) | 2440 × 6100 × 2600 |

Container floor level should sit **+450 mm above grade** (helical screw pile clearance). Move each container group up by 450 mm on Z once placed.

## 4. Cut the openings (doors + windows + glazed walls)

For each container group, **enter the group** (double-click) and use **Push/Pull** to cut openings.

### South face of C1 (Living → Verandah)
- Sliding door D10: 4500 mm wide × 2400 mm high, sill at 0 mm, centred at X=8100.
- Entry door D01: 1000 mm × 2100 mm, hinge at X=1500, swings into foyer.
- Window W08: 2800 mm × 1500 mm, sill 900 mm, in entry foyer wall.

### North face of C2 (into courtyard)
- Slider D11 (dining): 2400 × 2400 at X = 800–3200.
- Slider D12 (kitchen): 2900 × 2400 at X = 8500–11400.

### West face of C3 (Master BR)
- Window W01: 1100–6500 mm length tall window 1500 mm high at sill 900 mm.
- Window W03 (bath, frosted): smaller 600 mm × 1200 mm.
- Window W04 (master lounge): 1700 mm × 1500 mm.

### East face of C5 (BR2)
- Window W05: 2400 × 1500 mm.
- Window W06: 2200 × 1500 mm (courtyard-side).

### Courtyard-facing faces of C4 and C6
- Both have large glazed link panels — model these as **glass walls** (next step).

### East face of C7 (utility)
- Window W09: 3800 × 1500 mm.
- Door D09: 900 × 2100 mm.

> **Tip:** Use the imported plan's window/door tags (D01…D12, W01…W09) as visual references. Pull the cuts only **into** the wall thickness later; don't pull through the entire container.

## 5. External wall cladding

The container shell is the *structure*. Over it goes a 75 mm cladding + insulation layer.

1. Activate tag `02 - External Walls + Cladding`.
2. For each external face, draw a rectangle offset **75 mm outward** from the container face.
3. Push/Pull 75 mm thick.
4. Apply material:
   - **Recommended cladding finish for Reserve Varde:** vertical timber slats (charred-cedar / shou-sugi-ban) OR fibre-cement boards in dark forest green (#1A2F25) OR raw cor-ten steel (with rust patina).
   - For the courtyard-facing inside walls of the U-shape: lighter timber (teak) to reflect light inward.

## 6. Roof

The 2BHK uses a **shallow mono-pitch standing-seam metal roof** sloping 5° towards the courtyard for rainwater capture.

1. Activate tag `05 - Roof`.
2. Draw the U-shape footprint at top of containers (+2900 from grade for 40 ft, +2600 for C7).
3. Offset outward by **600 mm** for eaves overhang on outer perimeter, **300 mm** into courtyard.
4. Push/Pull 200 mm thick (roof build-up: deck + insulation + standing seam).
5. Rotate to introduce 5° pitch toward courtyard.
6. Apply material: dark grey metal seam texture or matte black.

Add a **clerestory band** along the inside courtyard edge — a 300 mm high glazed strip below the roof line for ventilation. This is what gives the U-shape its distinctive "lantern at night" look.

## 7. Internal partitions

Use tag `03 - Internal Walls`.

Reference the internal partition lines from the DXF reference. All internal partitions:
- Thickness 115 mm
- Height 2 600 mm (stops 300 mm below roof to allow cross-ventilation)
- Modeled as a single Group per container

Inside C4 (Master suite):
- Walk-in wardrobe partition at Y=9980
- Master bath partition at Y=11700
- Master lounge partition at Y=7500

Inside C6 (BR2 service):
- BR2 bath partition at Y=11200
- BR2 bath upper wall at Y=13680
- Powder partition at Y=8400

## 8. Glass corridors

Tag `08 - Glass Corridors`.

Two glazed link corridors connect the courtyard wings to the south body:

| Corridor | SW corner | Size (W × D × H) |
|---|---|---|
| West link | (4880, 12780, 0) | 1100 × 2100 × 2900 mm |
| East link | (6220, 12780, 0) | 1100 × 2100 × 2900 mm |

Build as: aluminium frame box (50 × 100 mm sections) + glass panels in 1 200 × 2 500 mm modules. Apply **clear glass with 80% transparency** material.

## 9. Doors and windows (3D)

Tag `06 - Doors` and `07 - Windows`.

### Doors
- All hinged doors: 45 mm thick solid timber leaf in 100 mm timber frame.
- Use SketchUp's built-in **Component Library → Architecture → Doors**, or build one component and copy.
- For each door:
  1. Insert frame component at opening.
  2. Rotate the leaf 90° (or whatever swing the plan shows).
  3. Make it a **dynamic component** if you want to demonstrate swing during animation.

### Windows
- Frame: 50 × 100 mm aluminium, dark bronze finish (#3A3328).
- Glass: 6 mm – 12 mm – 6 mm double-glazed unit.
- For tall vertical windows: divide into 3 horizontal panes with 50 mm mullions.

### Sliding doors
- Two leaves 50 mm thick × half the opening width each.
- Sliding track: 60 mm aluminium box section above + below.
- For animation, store sliding leaves as dynamic components with an X-axis movement attribute.

## 10. Bathroom fixtures

Tag `09 - Bathroom Fixtures`.

Use **3D Warehouse** (`Window → 3D Warehouse`) to download free models. Search for:
- "Wall-hung WC Geberit" (modern minimal)
- "Wall-hung basin counter 1000mm"
- "Walk-in shower stall 1200 × 900 + glass screen"

Place per the DXF positions:

| Fixture | Approx position (X, Y, Z) | Notes |
|---|---|---|
| Master WC | (2850, 10650, 450) | floor-fixed, against C3/C4 wall |
| Master vanity | (4225, 10400, 1300) | wall-mounted basin + mirror |
| Master shower | (3750, 11300, 0) | 2 100 × 800 mm walk-in |
| BR2 WC | (7600, 11600, 450) | wall-hung |
| BR2 vanity | (8875, 11550, 1300) | wall-mounted |
| BR2 shower | (8540, 12850, 0) | 2 150 × 1 300 mm walk-in |
| Powder WC | (7600, 7800, 450) | compact |
| Powder basin | (8800, 7850, 1300) | wall-mounted |

For each shower add: **drain crosshair** as a 50 mm thick stainless square inset into the floor, with floor slope modeled as 4 triangular faces sloping 1:80 toward the drain.

## 11. Kitchen

Tag `10 - Kitchen`.

L-shaped counter along north + east walls of C2 east half.

Build sequence:
1. **Base cabinets:** 720 mm high × 600 mm deep boxes. Length: 5 900 mm north run + 1 660 mm east run.
2. **Counter top:** 40 mm thick stone slab over base cabinets — extend 50 mm front overhang. Material: white quartz or honed black granite.
3. **Tall fridge unit:** 600 × 600 × 2 100 mm at SE corner (X=11400, Y=2640).
4. **Sink:** built into counter at X=7400–8700, Y=4380–4720 — use Warehouse "double bowl undermount sink".
5. **Hob:** 4-burner gas cooktop, 600 × 700 mm, X=9500–10800, Y=4380–4720.
6. **Extractor hood:** wall-mounted at ceiling height above hob.
7. **Island/breakfast bar:** 2 700 × 900 × 900 mm centred at (9150, 3450). Material: timber top + dark base.
8. **Overhead cabinets:** 720 × 350 deep at 1 500 mm above floor, along north wall above counter.

## 12. Bedroom furniture

Tag `11 - Furniture`.

### Master Bedroom (C3 north portion)
- **King bed** 1800 × 2000 × 600 mm at (250, 11900, 450) — headboard against south wall.
- **2 nightstands** 600 × 500 × 500 mm flanking bed.
- **Wardrobe** sliding doors, recessed 600 × 2200 × 2400 mm at south end of room (against m.lounge partition).
- **Pendant or reading lights** above nightstands (hung from ceiling).

### Bedroom 2 (C5 north portion)
- **Queen bed** 1600 × 2000 × 600 mm at (9950, 14500, 450).
- 2 nightstands.
- Built-in wardrobe at south end of room.

### Master Lounge / Reading Nook (C4 middle)
- Bench seat along south wall.
- 2 armchairs facing the courtyard window.
- Round side table.

### Family Lounge / Study (C6 middle)
- 2 100 × 700 mm desk against west wall.
- Office chair.
- Floor-to-ceiling bookshelf along west wall of study.

### Living Room (C1 east half)
- 3-seater sofa 2 100 × 900 mm facing TV.
- 2-seater sofa 1 600 × 900 mm perpendicular.
- 2 armchairs.
- Coffee table 1 800 × 900 × 400 mm.
- TV console 3 700 × 500 × 500 mm against north partition.
- 65" TV wall-mounted above console.

### Dining (C2 west half)
- Dining table 3 100 × 1 500 mm seating 8.
- 8 dining chairs.
- Sideboard against west wall (optional).

## 13. Courtyard + landscape

Tag `12 - Courtyard + Landscape`.

The courtyard is the heart of the design — **don't skimp on this**.

### Floor surface
- Brick paving in herringbone pattern.
- Use SketchUp's **Materials → Stone → Cobblestone** or a custom brick texture mapped at 200 × 100 mm.
- A 2440 × 12200 mm rectangle at Z=0 (or +50 mm relative to surrounding finished floor).

### Plunge pool (OPTIONAL)
- Rectangle 1 400 × 3 000 × 1 100 mm deep at (5380, 9000, -1100).
- Build as: subtract a box from the courtyard floor.
- Water material: pale aquamarine #B8DCE6 at 60% transparency.
- Coping: 100 mm wide stone edge raised 50 mm.
- Optional: cascade spout from west wall of C4.

### Trees (frangipani / plumeria)
- Use Warehouse "plumeria tree" 3D models.
- 2 specimens at (6700, 14500) and (5500, 7000).
- Crown radius ~1 500 mm, height 4–5 m.

### Stepping stones
- 12 stones of 160 × 500 × 50 mm running north-south down centre.
- Place between paver rows for organic walking line.

### Planters
- Built-in concrete planter strip 300 mm wide along inside face of C4 and C6 (courtyard side).
- Plant: ferns, philodendrons, ground orchids.

## 14. Verandah + forest deck

Tag `13 - Verandah + Deck`.

South verandah covers the front of the pavilion:
- **Footprint:** 15 200 × 2 400 mm (extends past C1 east and west by 1 500 mm each side).
- **Decking:** 140 × 25 mm timber boards (Burmese teak or composite ipé). Run boards perpendicular to the house.
- **Sub-frame:** 100 × 50 mm joists at 400 mm centres on helical screw piles.
- **Rooflet / extension of main roof:** main roof eaves overhang 600 mm provides partial cover; for full cover extend a 3 000 mm pergola/canopy.
- **Forest-facing deck:** optional further 4 000 × 8 000 mm deck extending south into the jungle, with low timber bench seating along the perimeter.

## 15. Site, terrain, jungle context

Tag `14 - Site + Terrain`.

For presentation renders, place the pavilion on:
- 1-acre square plot (63.6 × 63.6 m ≈ 63 600 × 63 600 mm).
- Centred or pulled to one corner for privacy.
- Use **Sandbox tools** to create gently undulating terrain (clearings around the home, dense jungle at the perimeter).
- Drop in **3D Warehouse trees** for jungle backdrop: mango, jackfruit, areca palm, banyan.
- Add a meandering 1.5 m wide gravel drive from plot edge to pavilion forecourt.

## 16. Lighting (for renderer)

Tag `16 - Lighting`.

If using a renderer like **V-Ray**, **Enscape**, **Twinmotion**, or **Lumion**:

| Light type | Where | Notes |
|---|---|---|
| Sun + sky | Global | Set Goa coordinates: 15.3°N, 73.9°E. Time: 17:00 IST for golden hour. |
| Linear LED strips | Under upper cabinets (kitchen); under bed (master); behind TV | Warm white 2700K, 8W/m |
| Recessed downlights | Living, dining, kitchen, bedrooms | 4-inch LED, 3000K |
| Pendant lights | Above dining table (3 pendants), above kitchen island (2 pendants) | Black & brass cluster |
| Wall-mounted exterior | Either side of entry door + at each verandah corner | Brass downlight |
| Submerged pool light | Plunge pool centre | White-blue LED |
| Path bollard lights | Stepping stones in courtyard | Solar, warm white |
| Tree uplighters | Base of frangipanis + perimeter jungle | Warm white spike spots |

## 17. Materials cheat sheet

| Surface | Material | Reference colour |
|---|---|---|
| External cladding | Charred cedar slats (shou-sugi-ban) | #1F1A14 |
| Roof | Standing seam dark grey metal | #2E2E2E |
| Window frames | Dark bronze aluminium | #3A3328 |
| Interior walls | Lime-wash white | #F2EDE2 |
| Interior floor | Wide oak planks | #B89870 |
| Verandah deck | Burmese teak | #8A5A38 |
| Courtyard paving | Reclaimed brick herringbone | #8C5B3F |
| Stone counters / bathroom | Honed black granite or white quartz | #2A2A2A / #ECEAE3 |
| Kitchen joinery | Smoked oak veneer | #4A3825 |
| Master bath wall | Travertine | #C8B894 |
| BR2 bath wall | White subway tile | #F4F4F4 |
| Soft furnishings (sofa, headboards) | Natural linen | #C7B89C |

## 18. Export & delivery

### Animations / fly-through
1. **Camera path:** Set up scenes (View → Animation → Add Scene) — exterior arrival, courtyard hero shot, living room, master bedroom, bathroom.
2. **Export:** File → Export → Animation → MP4. 30 fps, 1920×1080, 8s per scene.

### Static renders (presentation deck)
Recommended shots:
1. **Hero exterior**: south approach, golden hour, jungle backdrop.
2. **Courtyard centerpiece**: standing at south end looking through to north sky.
3. **Living room interior**: looking out through sliding doors to verandah / jungle.
4. **Master bedroom**: looking from headboard wall toward courtyard window.
5. **Kitchen + dining**: open-plan view from foyer.
6. **Aerial**: top-down showing U-shape and 1-acre context.

### 2D plan re-export
After modelling, use **File → Export → 2D Graphic → PDF / PNG** with top view + parallel projection + Hidden Line style — this gives you a clean B&W floor plan that matches the source DXF.

---

## Quick model checklist

- [ ] DXF imported, locked as reference
- [ ] All 7 containers built as groups, raised 450 mm
- [ ] External cladding added
- [ ] Roof with 5° pitch + clerestory
- [ ] All internal partitions
- [ ] All door + window openings cut
- [ ] Glass corridors modelled
- [ ] Bathroom fixtures placed
- [ ] Kitchen built
- [ ] Bedroom + living furniture in place
- [ ] Courtyard paved + plunge pool + trees
- [ ] Verandah deck + forest deck
- [ ] Site + jungle context
- [ ] Materials applied
- [ ] Scenes set up for renders / animation
- [ ] Final 2D plan re-exported (sanity check vs DXF)

---

## Compliance disclaimer

This SketchUp guide describes how to reconstruct the 2BHK concept design in 3D for presentation, marketing and design coordination. The resulting 3D model is **not a construction model**. Wall thicknesses, container dimensions, opening sizes and structural assumptions in the model are concept-stage figures and must be verified by licensed structural, MEP and architectural professionals before any construction documentation is produced. Plunge pool, forest deck and clerestory are optional design features subject to client confirmation, structural feasibility, and applicable Goa regulatory approvals.

---

*Reserve Varde Design Studio — May 2026*
