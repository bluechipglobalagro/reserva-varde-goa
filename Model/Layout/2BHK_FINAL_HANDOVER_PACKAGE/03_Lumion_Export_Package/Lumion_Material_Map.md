# Lumion Material Mapping Guide — Reserva Varde Goa 2BHK
**Document Ref:** RVG-2BHK-LMM-1.0  
**Status:** Completed & Ready for Lumion 12/2023+  
**Target Model:** `Reserva_Varde_2BHK_Lumion_Ready.skp`  

This guide provides the exact material mapping parameters to translate the cleaned, grouped SketchUp model into a photo-realistic, cinematic Lumion render. All materials in the model have been prefixed with `RV_` to ensure they isolate perfectly upon import.

---

## 🎨 Professional Material Mapping Matrix

Apply the following specific high-end Lumion materials and slider settings to the corresponding SketchUp import slots:

| SketchUp Material Name | Recommended Lumion Material | Colorization / Texture | Glossiness | Reflectivity | Relief / Normal Map | Weathering / Age | Notes & Advanced Settings |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **`RV_Charcoal_Metal`** | **Aluminium / Dark Steel** (Outdoor Category) | Charcoal / Matte Black (`rgb(38,43,49)`) | **0.25** | **0.40** | None (Smooth) | **0.15** (Steel - clean edges) | Sits on outer container frames, structural support columns, gutters, downpipes, and solar mount rails. |
| **`RV_Teak_Timber_Cladding`** | **Teak Wood 3D** (Outdoor -> Wood) | Natural Gold-Brown Teak grain | **0.35** | **0.20** | **0.60** (High depth relief) | **0.25** (Wood - tropical monsoon aging) | Applied to the fine vertical facade cladding slats and the 2.2m tall utility privacy screens. |
| **`RV_Laterite_Stone`** | **Rough Masonry / Sandstone** (Outdoor -> Stone) | Import custom Red Laterite normal map or use Lumion's Rough Red Sandstone | **0.05** (Matte) | **0.05** | **0.90** (Very high relief) | **0.40** (Stone - moss growth at base) | Sits on the multi-level terrace retaining walls, container plinth blocks, entry piers, and firepit stone base. |
| **`RV_Glass_Dark_Reflective`** | **Pure Glass** (Indoor -> Glass) | Slate Blue tint (`rgb(100,149,162)`) | **0.95** | **0.95** (High) | Double glass thickness on | **0.00** (Clean) | Applies to large sliding doors, widescreen bedroom glazing, and forest deck glass railings. Add reflection planes in Lumion! |
| **`RV_Deck_Timber`** | **Outdoor Decking Planks** (Outdoor -> Wood) | Warm Teak Wood (`rgb(175,115,60)`) | **0.45** (Slight satin) | **0.30** | **0.50** (Medium grain relief) | **0.30** (Wood - weatherized) | Applied to the expansive forest deck and south verandah floor boards, pergolas, and louvres. |
| **`RV_Roof_Matte_Black`** | **Roofing Metal / Shingles** (Outdoor -> Roof) | Charcoal Matte (`rgb(46,48,51)`) | **0.15** | **0.15** | **0.30** (Grooved seams) | **0.20** (Iron) | Sits on the standing seam sloped roofs of all container wings. |
| **`RV_Path_Gravel`** | **Gravel Fine** (Outdoor -> Soil) | Warm Light Gray / Beige gravel | **0.10** | **0.10** | **0.75** (Crunchy relief) | **0.10** (Soil) | Applied to the winding entry driveway, parking court, and the Z=0 plinth base gravel drainage bands. |
| **`RV_Terrain_Grass`** | **3D Grass / Landscape** (Outdoor) | Use Lumion's **3D Grass - Wild Grass** style | **-** | **-** | **-** | **-** | Applied to the Low, Mid, and High terraces. Add small stones and weed variations in Lumion landscape editor. |
| **`RV_Water_PlungePool`** | **Water - Swimming Pool** (Outdoor -> Water) | Turquoise Clear (`rgb(62,163,179)`) | **0.95** | **0.90** | Wave scale: **0.15** Wave speed: **0.05** | **-** | Applies to the courtyard plunge pool and the concrete reflecting water channel. Add reflection planes! |
| **`RV_Solar_Panel`** | **Glossy Metal / Custom Glass** | Deep Indigo Navy (`rgb(16,25,45)`) | **0.90** | **0.85** | None (Flat) | **0.05** | Applied to the 6 monocrystalline solar panels on the West Wing roof. |
| **`RV_Interior_Warm_Floor`** | **Indoor Teak Wood / Parquet** (Indoor -> Wood) | Golden Warm Teak (`rgb(168,122,82)`) | **0.50** (Satin polish) | **0.40** | **0.20** (Smooth) | **0.05** | Applied to internal container floor boards, sofa frames, and dining table surfaces. |
| **`RV_Landscape_Shrubs`** | **Foliage Leaves** (Outdoor -> Leaves) | Lush Tropical Green (`rgb(26,54,34)`) | **0.20** | **0.10** | **0.40** | **-** | Sits on broadleaf tree canopies, bamboo leaf blocks, and coconut palm fronds. Can be replaced with Lumion 3D plants! |
| **`RV_Service_Utility`** | **Charred Shou Sugi Ban / Plaster** | Dark Matte Coal (`rgb(24,24,24)`) | **0.10** | **0.10** | **0.70** (Cracked relief) | **0.20** | Applies to the Bio-Digester STP box, rainwater harvesting cylinders, and background service sheds. |
| **`RV_Pebble_Swale`** | **River Stones / Cobble** (Outdoor -> Stone) | Mixed River Pebbles | **0.60** (Wet gloss) | **0.50** | **0.80** (Volumetric pebbles) | **0.30** (Wet/Mossy) | Applied to the pebble-bed bioswale and rain garden boundaries. |
| **`RV_Emissive_Light`** | **Standard / Emissive** (Material -> Emissive) | Warm Yellow / Gold (`rgb(255,204,102)`) | **-** | **-** | **-** | **-** | Applied to the lighting heads of the garden path light pillars and the firepit glowing logs. Set Emissive Power to **15.0 - 25.0** for night renders! |
| **`RV_Furniture_Canvas`** | **Fabric / Canvas** (Indoor -> Fabric) | Sand / Light Beige Canvas | **0.00** | **0.00** | **0.40** (Soft weave relief) | **0.10** (Fabric) | Applies to the courtyard cushion beds, forest deck loungers, and dining chairs cushions. |

---

## 💡 Advanced Lumion Setup Tips

1. **Reflection Planes (Critical):**
   Lumion does not calculate realistic glass or water reflections unless you manually assign **Reflection Planes**. Add a reflection plane to:
   * The courtyard plunge pool surface (`RV_Water_PlungePool`)
   * The main living room glass facade (`RV_Glass_Dark_Reflective`)
   * The bedroom widescreen glazing panels
2. **Glass Transparency Settings:**
   For `RV_Glass_Dark_Reflective`, enable **Double-Sided Glass** in the Lumion material properties. Set transparency to **0.65** and internal glossiness to **0.90** to allow the warm interior furniture, teak wood backdrops, and soft spotlighting to be visible from the forest deck.
3. **Monsoon Wetness (Monsoon Mood Scene):**
   If rendering the **Monsoon Mood Scene**, do not change the materials. Instead, add Lumion's **Rain Effect** in the photo scene, which will automatically apply a wet specular glaze to `RV_Deck_Timber`, `RV_Laterite_Stone`, and `RV_Path_Gravel`, creating gorgeous reflection pools on the stone pathway steps!
4. **Weathering Calibration:**
   Apply soft **weathering (Stone/Wood)** in Lumion to the retaining walls and timber cladding. This introduces subtle dirt under the roof overhangs and soft moss on the laterite masonry where it touches the grass, making the villa feel authentically embedded in a South Goan forest.
