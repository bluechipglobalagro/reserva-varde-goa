# Lumion Import & Production Instructions — Reserva Varde Goa
**Document Ref:** RVG-2BHK-LII-1.0  
**Status:** Completed & Optimized for Lumion 12+  
**Target:** 3D Artists & Architectural Visualizers  

This document outlines the step-by-step production workflow to import and render the **Reserva Varde Goa** 2BHK Compact Modular Eco Estate inside Lumion, achieving a world-class, photorealistic, resort-grade presentation.

---

## 📂 1. Source Package Selection
Navigate to the [Lumion_Export_Package/](file:///C:/Users/INTEL/Desktop/GOA/WEBSITE/Model/Layout/Lumion_Export_Package) directory. You have two import options:

1. **Option A: Collada DAE Import (Highly Recommended):**
   * Use **`Reserva_Varde_2BHK_Lumion_Export.dae`** (5.14 MB).
   * This Collada format is structurally lightweight and handles volumetric meshes and curves perfectly.
2. **Option B: SketchUp Model Import / LiveSync:**
   * Use **`Reserva_Varde_2BHK_Lumion_Ready.skp`** (754 KB).
   * Perfect if you are running the Lumion LiveSync plugin inside SketchUp 2023 for real-time model edits.

---

## 🛠️ 2. Step-by-Step Lumion Production Workflow

### Step 1: Model Import & Positioning
1. Open Lumion. Create a new project. Select the **Tropical Environment** or **Forest / Hills** template.
2. Click the **Import** button (`green plus icon`).
3. Browse and select `Reserva_Varde_2BHK_Lumion_Export.dae`.
4. Check import options:
   * *Import Animations:* **OFF**
   * *Import Edges / Lines:* **OFF**
   * *Make Library Folder:* Name it `Reserva_Varde`
5. Place the model on the terrain. Set its XYZ coordinates to `[0, 0, 0]` in the properties panel to align it perfectly with Lumion's coordinate grid. Keep the scale multiplier locked at **1.0**.

### Step 2: Landscape Contours Alignment
1. The imported model features three terraced levels of terrain (Low, Mid, High). Use Lumion’s **Landscape -> Height -> Flatten** tool.
2. Adjust the natural Lumion grass levels to merge seamlessly with the edges of `RV_Terrain_Grass`.
3. Apply a matching forest grass texture to the surrounding Lumion terrain.

### Step 3: Material Assignments & Calibration
Reference your [Lumion_Material_Map.md](file:///C:/Users/INTEL/Desktop/GOA/WEBSITE/Model/Layout/Lumion_Export_Package/Lumion_Material_Map.md) table for exact slider configurations. 

1. **Pure Reflective Glass (Corridors & Facades):**
   * Double-click `RV_Glass_Dark_Reflective` in Lumion.
   * Select **Pure Glass** (Indoor -> Glass).
   * Set colorization tint to soft Slate Blue.
   * Adjust **Transparency to 0.65** and **Reflectivity/Glossiness to 0.90**.
   * Enable **Double-Sided** rendering.
2. **Sugi-ban & Teak Facades:**
   * Assign **Teak Wood 3D** (Outdoor -> Wood) to `RV_Teak_Timber_Cladding`. Scale the grain texture vertically. Add soft wood weathering (**0.25**).
   * Assign **Charred Shou Sugi Ban** or rough black composite wood texture to `RV_Service_Utility`. Set relief bump high.
3. **Goan Laterite Stone Plinths:**
   * Assign rough sandstone or brick masonry to `RV_Laterite_Stone`. Set relief displacement to **0.90** to bring out physical pores. Enable **Stone Weathering** to create organic dark corners and moss where it meets the grass.
4. **Forest Deck Floor:**
   * Assign **Outdoor Decking Planks** to `RV_Deck_Timber`. Align planks horizontally.

### Step 4: Reflection Planes Assignment (Critical)
Lumion will not calculate correct raytraced reflections unless planes are manually placed.
1. Enter the **Utility** mode or the **Photo / Video** settings.
2. Click the **Reflection Effect** panel.
3. Select **Edit -> Add Reflection Plane**.
4. Click to assign planes on:
   * The courtyard plunge pool surface (`RV_Water_PlungePool`)
   * The long concrete reflecting channel
   * The main living room glass facade (`RV_Glass_Dark_Reflective`)
   * The bedroom sliding glass doors

### Step 5: Advanced Lighting & Emissives
1. **Spotlights:** Place warm ceiling spot lights ($2700\text{K}$) inside C1 (Living), C2 (Dining), and C3 (Bedroom) modules. Adjust cone angle and brightness so they highlight interior details without washing them out.
2. **Emissive Path Lights:** Double-click the glowing heads of the path lights (`RV_Emissive_Light`). Apply standard material, and set **Emissive Power to 20.0**. This will instantly light up the organic welcome path.
3. **Meditation Firepit:** Place a warm orange omnidirectional light inside the firepit circle. Set the light to flicker slightly if rendering a video scene.

### Step 6: Context Planting & Forest Dressing
Replace the placeholder tree models (`RV_Landscape_Shrubs`) with Lumion’s extensive library of high-fidelity plants:

1. **Palm Forest Boundary:** Along the left and right plot borders, place alternating clusters of Lumion's **Areca Palms**, **Coconut Palms**, and **Banana Plants**.
2. **Broadleaf jungle Canopies:** Along the northern rear boundary, place dense groups of tall **Indian Laurel (Ficus)** and **Teak trees** to block empty horizons and create a deep jungle wall.
3. **Plaster & Plinth Understory:** Cluster thick groups of **Sword Ferns**, **Alocasia (Elephant Ears)**, and **Canna Lilies** along the base of the laterite retaining walls and plinths. This covers harsh architectural joints and grounds the building.
4. **Reflecting Water Petals:** Add floating leaf decals or Plumeria petal details on the courtyard channel water to enhance realism.

### Step 7: Effects Stack Selection & Export
1. Set up the camera scenes according to your [Lumion_Render_Scene_Guide.md](file:///C:/Users/INTEL/Desktop/GOA/WEBSITE/Model/Layout/Lumion_Export_Package/Lumion_Render_Scene_Guide.md) file.
2. Apply the recommended effects stack (Real Skies, Hyperlight at 75%, Soft Shadows, 2-Point Perspective, and subtle Depth of Field).
3. Export at **Poster / Print (3840 x 2160 - 4K)** or **Desktop (1920 x 1080 - Full HD)** resolution, saving as lossless **PNG**.
