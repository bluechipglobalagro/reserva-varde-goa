# Next Steps After Handover Checklist
**Document Ref:** RVG-2BHK-NSAH-1.0  
**Status:** Handover Action Checklist  
**Project:** Reserva Varde Goa / Reserva Verde Goa  
**Villa Name:** 2BHK Compact Modular Eco Estate  
**Developer:** Bluechip Global Agro  

This action-oriented checklist outlines the immediate, step-by-step next steps for the Bluechip Global Agro developer, 3D visualization, marketing, and local architectural teams upon receiving the finalized 2BHK Handover Package.

---

## 📋 Post-Handover Action Checklist

Follow these steps systematically to initiate the digital pre-sales campaign and engineering clearances:

### 🟩 Step 1: Open SketchUp Model & Verify Scenes
* **Responsible:** Developer / Project Lead
* **Action:** Open `Reserve_Varde_2BHK_Upgraded_Model.skp` inside **SketchUp 2023+**. Click through the pre-saved camera scene tabs (**Scene 1 to Scene 10**) at the top of the interface. Verify that the modular villa wings, decks, contours, courtyard plunge pool, and background forest trees align perfectly and display no floating objects or reversed faces.

### 🟩 Step 2: Import the 3D Mesh into Lumion 12+
* **Responsible:** 3D Visualization Artist / Render Team
* **Action:** Open **Lumion 12+**. Create a new project environment using the **Tropical / Forest Hills** template. Import the high-fidelity Collada mesh `Reserva_Varde_2BHK_Lumion_Export.dae` (located in subfolder `03`). Set XYZ coordinates to `[0, 0, 0]` and scale to exactly **1.0** to align with the landscape heightmaps.

### 🟩 Step 3: Replace SketchUp Materials with Lumion 3D Presets
* **Responsible:** 3D Visualization Artist
* **Action:** Enter Lumion's Material Editor. Double-click the material channels prefixed with `RV_` and replace them with high-end Lumion 3D presets (e.g. **Teak Wood 3D** for `RV_Teak_Timber_Cladding`, **Rough Sandstone** with moss for `RV_Laterite_Stone`, **Outdoor Decking** for `RV_Deck_Timber`, and **Pure Glass** for `RV_Glass_Dark_Reflective`). Refer to the exact slider specifications in `Lumion_Material_Map.md` to calibrate glossiness, reflectivity, and weathering.

### 🟩 Step 4: Configure Reflection Planes (Critical)
* **Responsible:** 3D Visualization Artist
* **Action:** Go to the Photo view settings and apply the **Reflection Effect**. Add manual reflection planes to the courtyard plunge pool (`RV_Water_PlungePool`), the long concrete reflecting water channel, the main living room sliding glass doors facade, and the bedroom glazed sliders. This is critical for achieving photo-realistic global illumination and glassy water reflections.

### 🟩 Step 5: Replace foliage Placeholders with Realistic 3D Trees
* **Responsible:** 3D Visualization Artist
* **Action:** Replace the boundary plant placeholder shapes (`RV_Landscape_Shrubs`) with high-fidelity 3D assets from Lumion’s library. Plant dense clusters of **Coconut Palms**, **Areca Palms**, and **Banana plants** along the east and west borders, tall **Teak** and **Ficus** trees along the north boundary, and cluster broad-leaf **Sword Ferns** and **Elephant Ears** around the laterite plinth bases. Place a beautiful Plumeria tree in the courtyard planter.

### 🟩 Step 6: Render High-Resolution Marketing Images
* **Responsible:** 3D Visualization Artist
* **Action:** Configure the 8 pre-saved scenes according to the recommended effect stacks in `Lumion_Render_Scene_Guide.md` (Real Skies, Hyperlight at 75%, Soft Shadows, 2-Point Perspective, and subtle Depth of Field). Export the renders at **Poster / Print (3840 x 2160 - 4K)** resolution as lossless **PNG** files:
  * Render **Scene 1** for the Website Hero Wide Banner.
  * Render **Scene 8** for the physical Brochure Cover.
  * Render **Scene 3** for the opening layout slide of the Investor Deck.
  * Render **Scene 2, 4, 5, 6, 7** for the sales gallery.

### 🟩 Step 7: Send DXF Drawings for Geotechnical & Soil Audits
* **Responsible:** Developer / Local Goan Architect
* **Action:** Submit `2BHK_FloorPlan_CAD_v2.dxf` (located in subfolder `01`) and the engineering checklist `2BHK_Model_Quality_Checklist.md` (located in subfolder `09`) to your licensed local Goan structural engineers of record. Task them with calculating bored concrete foundation piles to anchor the laterite plinths through Goan clay forest soils, and securing CRZ Forest Department boundary setbacks.

### 🟩 Step 8: Deploy Website Configurator & Copy
* **Responsible:** Web Development / Digital Marketing Team
* **Action:** Provide `2BHK_Website_Final_Content.md` (located in subfolder `04`) to your frontend web developers. Integrate the copywriting grids, tab content, and technical parameters into the online 2BHK villa configurator. Update the homepage with the new, rendered golden hour website hero wide banner.

### 🟩 Step 9: Design and Print the Deluxe Pre-Sales Brochure
* **Responsible:** Graphic Designer / Marketing Agency
* **Action:** Design the physical sales brochure layout using the page-by-page editorial copy in `2BHK_Brochure_Final_Content.md` (located in subfolder `05`). Pair the copy with the finalized, printed Lumion renders (Dusk Arrival, Courtyard pool, Forest deck, and Solar roof views). Set the cover text using the high-impact brochure cover render and embossed gold foil.

### 🟩 Step 10: Broadcast Broker WhatsApp Messages & Launch Pitching
* **Responsible:** Broker Relations / HNW Sales Directors
* **Action:** Distribute the structured sales outreach message `2BHK_WhatsApp_Sales_Message.md` to HNW client contacts and luxury real estate brokers to generate immediate organic pre-sales leads. Assemble the slides using the copy, metrics, and detailed speaker notes inside `2BHK_Investor_Presentation_Content.md` for virtual land development meetings.
