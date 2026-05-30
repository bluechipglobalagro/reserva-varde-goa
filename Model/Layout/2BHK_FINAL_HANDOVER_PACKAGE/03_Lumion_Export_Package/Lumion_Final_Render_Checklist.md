# Lumion Final Render Quality Checklist — Reserva Varde Goa
**Document Ref:** RVG-2BHK-LFRC-1.0  
**Status:** Completed & Ready for Production  
**Project:** 2BHK Compact Modular Eco Estate  

This checklist ensures that all steps of the Lumion import, material assignment, lighting configuration, and final photo exports are systematically verified for a world-class, premium resort result.

---

## 📋 Pre-Import Model Cleaning Checklist (SketchUp)

```
[x] 1. All geometry cleaned of loose edges, stray lines, and duplicate groups.
[x] 2. Model purged of all unused definitions, layers, and materials.
[x] 3. Unit system locked to Millimeters (no rounding errors or scale gaps).
[x] 4. All 3D faces inspected; reversed faces resolved (material assigned to both sides).
[x] 5. Separation achieved: glass, roofs, decks, paths, pools, and landscape are isolated.
[x] 6. Material names unified and prefixed with RV_ (e.g. RV_Teak_Timber_Cladding).
[x] 7. Export files generated cleanly in the package folder:
       - Reserva_Varde_2BHK_Lumion_Ready.skp (Cleaned 3D SketchUp Model)
       - Reserva_Varde_2BHK_Lumion_Export.dae (High-fidelity Collada DAE)
```

---

## 🛠️ Step-by-Step Lumion Production Checklist

### 1. Import Setup & Calibration
* **[ ] Import File:** Import `Reserva_Varde_2BHK_Lumion_Export.dae` or use the Lumion LiveSync plugin on `Reserva_Varde_2BHK_Lumion_Ready.skp`.
* **[ ] Scale & Origin:** Confirm model coordinates align with Lumion’s origin point. Keep scale multiplier at exactly **1.0**.
* **[ ] Landscape Alignment:** Align the Low, Mid, and High terraces with Lumion’s natural ground level.

### 2. Material Mapping & Texture Customization
* **[ ] Glass & Glazing:** Assign **Pure Glass** to `RV_Glass_Dark_Reflective`. Add a deep slate-blue tint colorization, set transparency to 0.65, glossiness to 0.90, and enable double-sided rendering.
* **[ ] Timber Facades:** Map **Teak Wood 3D** to `RV_Teak_Timber_Cladding`. Scale the grain texture to fit the vertical slats perfectly. Add soft weathering.
* **[ ] Goan Laterite Stone:** Map a rough, coarse brick/stone masonry texture to `RV_Laterite_Stone`. Set relief displacement to 0.90 to bring out the porous laterite texture. Add moss aging at the plinth joints.
* **[ ] Teak Deck & Veranda:** Map **Outdoor Decking Planks** to `RV_Deck_Timber`. Align texture grain horizontally with the long veranda planks.
* **[ ] Gravel Driveway & Drains:** Map **Fine Gravel** to `RV_Path_Gravel`. Set relief to 0.75 for physical pebble texture.
* **[ ] Plunge Pool & Channel:** Map **Clear Swimming Pool Water** to `RV_Water_PlungePool`. Adjust wave scale to 0.15 for soft ripples.
* **[ ] Solar Panels:** Map **Glossy Dark Metal** to `RV_Solar_Panel`. Set color to deep indigo navy, glossiness to 0.90, and reflectivity to 0.85.
* **[ ] 3D Grass:** Map **3D Wild Grass** to `RV_Terrain_Grass`. Enable small stones, weeds, and varying grass heights.
* **[ ] Emissive Path Lights:** Map **Standard Emissive Material** to `RV_Emissive_Light`. Set emissive power to **20.0** and color to warm golden yellow.

### 3. Lighting & Spotlights Configuration
* **[ ] Interior Warm Spotlights:** Place spotlights ($2700\text{K}$) inside C1, C2, C3, and C5 ceilings pointing downward. Set brightness to a soft, realistic intensity (prevent over-exposure).
* **[ ] Exterior Uplights:** Place landscape uplights pointing up the trunks of the boundary coconut palms and broadleaf trees to create dramatic evening shadows.
* **[ ] Firepit Glow:** Place a warm orange omni-light inside the firepit base to illuminate the meditator logs.
* **[ ] Active Path Lights:** Verify that path light heads (`RV_Emissive_Light`) cast a soft yellow glow.

### 4. Photo Scenes & Effects Calibration
* **[ ] 2-Point Perspective:** Ensure 2-Point Perspective is **ON** in all architectural camera scenes to prevent converging vertical lines.
* **[ ] Reflection Planes:** Place manual **Reflection Planes** on the plunge pool, the reflecting water channel, and the C1 living room glass facade.
* **[ ] Real Skies:** Match Day, Night, and Monsoon Real Skies to the scene guide recommendations.
* **[ ] Hyperlight & Skylight:** Verify Hyperlight is set to **75%** and Skylight is locked to **Ultra/High** for all day renders.
* **[ ] Depth of Field:** Set target focal points on the foreground architecture or deck furniture. Keep aperture mild (F/8) for realistic resort depth.

### 5. Landscape & Context Detailing
* **[ ] Boundary Palm/Forest:** Replace `RV_Landscape_Shrubs` with Lumion's high-fidelity **Coconut Palms**, **Areca Palms**, and **Broadleaf jungle canopies**.
* **[ ] Plinth Understory:** Place ferns, elephant ears, and tropical flowers clustered thick against the laterite plinth bases.
* **[ ] Courtyard Plumeria:** Place a high-end Plumeria tree in the courtyard planter. Add floating leaf/petal decals in the reflecting water channel.
* **[ ] Rock Clusters:** Replace rock boxes with high-quality Lumion mossy granite boulders.

---

## 📸 Final Rendering & Export Checklist

* **[ ] Resolution:** Export all 8 views at **Poster / Print (3840 x 2160 - 4K)** or **Desktop (1920 x 1080 - Full HD)** resolution for physical printing and web placement.
* **[ ] Format:** Save as lossless **PNG** format to preserve soft evening shadows and reflections.
* **[ ] Naming Standards:** Systematically name exports:
  * `reserva_varde_2bhk_lumion_hero_wide.png` (Website Hero)
  * `reserva_varde_2bhk_lumion_arrival_dusk.png` (Arrival View)
  * `reserva_varde_2bhk_lumion_aerial_estate.png` (Aerial View)
  * `reserva_varde_2bhk_lumion_courtyard_pool.png` (Courtyard View)
  * `reserva_varde_2bhk_lumion_forest_deck.png` (Forest Deck View)
  * `reserva_varde_2bhk_lumion_roof_solar.png` (Solar View)
  * `reserva_varde_2bhk_lumion_night_resort.png` (Night View)
  * `reserva_varde_2bhk_lumion_brochure_cover.png` (Brochure Cover)
