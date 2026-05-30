// EstateModelsSection.jsx
// Reserva Verde Goa — "Choose Your Ground-Level Modular Eco Estate" section.
// Drop-in React component. Uses Tailwind utility classes (or replace with your styles).
//
// Usage:
//   import EstateModelsSection, { estateModels } from "./EstateModelsSection";
//   <EstateModelsSection onView={id => ...} onDownload={id => ...} />

import React from "react";

// =============================================================================
// estateModels — the reusable data contract
// =============================================================================
export const estateModels = [
  {
    id: "2bhk",
    title: "2BHK Compact Luxury Modular Eco Estate",
    bedroomType: "2BHK",
    builtUpArea: "2500 Sq.Ft",
    estateSize: "1 Acre",
    assetType: "Ground-Level Modular Container Eco Home + Eco Plantation Estate",
    homeType: "Ground-level modular container eco-home",
    placementOptions: ["Front", "Centre", "Side", "Rear", "Courtyard-centric"],
    plantationOptions: ["Cashew", "Mango", "Coconut", "Spice", "Herbal", "Food forest"],
    description:
      "A precision-engineered ground-level container eco-home set inside a private 1-acre plantation estate — designed for couples, small families, NRIs and wellness buyers seeking a low-maintenance second home in Goa.",
    ecoFeatures: ["Solar-Ready", "RWH 15,000 L", "Greywater Reuse", "Bio-Septic", "Drip Irrigation", "Passive Cooling"],
    specifications: ["Ground-Level", "2BHK", "2500 Sq.Ft", "1 Acre", "4 × 40 ft + 2 × 20 ft modules", "Courtyard plan"],
    investmentHighlights: [
      "Low-footprint construction inside a plantation-backed estate",
      "Optional farm-stay rental readiness",
      "Integrated water + solar + waste systems",
      "Designed for couples, NRIs and eco-conscious second-home owners",
    ],
    image: "/images/site-plan-2bhk.svg",
    ctaLabel: "View Details",
    secondaryCtaLabel: "Download Specs",
  },
  {
    id: "3bhk",
    title: "3BHK Premium Modular Agro Estate",
    bedroomType: "3BHK",
    builtUpArea: "3500 Sq.Ft",
    estateSize: "1 Acre",
    assetType: "Ground-Level Modular Container Eco Home + Eco Plantation Estate",
    homeType: "Ground-level modular container eco-home",
    placementOptions: ["Centre", "Side", "Rear", "Courtyard-centric"],
    plantationOptions: ["Mango", "Coconut", "Cashew", "Teak + Pepper", "Spice", "Herbal", "Coffee/spice mix"],
    description:
      "A premium ground-level container eco-home in an L-shape pavilion configuration, set inside a private 1-acre plantation estate — designed for HNI families, NRIs and wellness buyers seeking a low-impact luxury second home with optional rental readiness.",
    ecoFeatures: ["Solar-Ready", "RWH 25,000 L", "Greywater Reed Bed", "Bio-Septic", "Drip Irrigation", "Green-roof option"],
    specifications: ["Ground-Level", "3BHK", "3500 Sq.Ft", "1 Acre", "6 × 40 ft + 2 × 20 ft modules", "L-shape pavilion"],
    investmentHighlights: [
      "Premium plantation-backed estate with curated agroforestry",
      "Scalable wellness deck + work-from-estate study",
      "Optional farm-stay readiness with rental-grade systems",
      "Designed for HNI families, NRIs and wellness buyers",
    ],
    image: "/images/site-plan-3bhk.svg",
    ctaLabel: "View Details",
    secondaryCtaLabel: "Download Specs",
  },
  {
    id: "4bhk",
    title: "4BHK Signature Ground-Level Modular Luxury Estate",
    bedroomType: "4BHK",
    builtUpArea: "4500 Sq.Ft",
    estateSize: "1 Acre",
    assetType: "Ground-Level Modular Container Eco Home + Eco Plantation Estate",
    homeType: "Ground-level modular container eco-home",
    placementOptions: ["Centre", "Rear", "Courtyard-centric"],
    plantationOptions: ["Mango", "Cashew", "Coconut", "Teak + Pepper", "Spice", "Orchard", "Food forest"],
    description:
      "A pavilion-style ground-level container eco-home arranged around a courtyard pool and three connected wings, set inside a private 1-acre plantation estate — designed for HNI families, retreat operators and hospitality-focused owners seeking a flagship Goa second home with rental readiness.",
    ecoFeatures: [
      "Solar-Ready 12–15 kWp",
      "RWH 40,000 L",
      "Greywater Wetland",
      "Bio-Septic + Filter Pond",
      "Passive Cooling Courtyard",
      "EV-charge ready",
    ],
    specifications: [
      "Ground-Level",
      "4BHK",
      "4500 Sq.Ft",
      "1 Acre",
      "8 × 40 ft + 3 × 20 ft modules",
      "Three-wing pavilion",
      "Reflective pool court",
    ],
    investmentHighlights: [
      "Flagship pavilion plan with courtyard-pool architecture",
      "Plantation-backed luxury estate with orchard accent",
      "Optional retreat / hospitality operation",
      "Integrated solar + water + waste + EV infrastructure",
    ],
    image: "/images/site-plan-4bhk.svg",
    ctaLabel: "View Details",
    secondaryCtaLabel: "Download Specs",
  },
  {
    id: "custom",
    title: "Fully Customisable Modular Eco Estate",
    bedroomType: "Customisable",
    builtUpArea: "Customisable (1,500 – 6,000 Sq.Ft)",
    estateSize: "1 Acre",
    assetType: "Ground-Level Modular Container Eco Home + Eco Plantation Estate",
    homeType: "Custom ground-level modular container eco-home",
    placementOptions: ["Front", "Centre", "Side", "Rear", "Courtyard-centric"],
    plantationOptions: [
      "Cashew",
      "Mango",
      "Coconut",
      "Teak + Pepper",
      "Spice",
      "Herbal",
      "Coffee/spice mix",
      "Food forest",
      "Mixed organic farming",
    ],
    description:
      "A flexible 1-acre estate where buyers customise the layout, built-up area, plantation model, outdoor programme, and rental readiness — all within the eco-sensitive development guidelines of Reserva Verde Goa. Strictly ground-level, strictly modular.",
    ecoFeatures: [
      "Solar-Ready (sized to design)",
      "RWH (sized to design)",
      "Greywater Reuse",
      "Bio-Septic",
      "Drip Irrigation",
      "Passive Cooling",
    ],
    specifications: ["Ground-Level", "1–4 BHK", "Customisable area", "1 Acre", "Modular Container", "Buyer-configured"],
    investmentHighlights: [
      "Bedroom count, placement, plantation profile fully buyer-selected",
      "Layout intents: wellness retreat · farm-stay · NRI home · plantation-focused · hospitality",
      "Same eco-sensitive guardrails as fixed models",
      "Designed by Reserva Verde studio under the masterplan brief",
    ],
    image: "/images/site-plan-custom.svg",
    ctaLabel: "Request Masterplan",
    secondaryCtaLabel: "View Details",
  },
];

// =============================================================================
// UI tokens — exposed for theming
// =============================================================================
export const rvTokens = {
  forest: "#1F3A2E",
  forestDeep: "#16291F",
  gold: "#B08A3E",
  ivory: "#FBF8F1",
  beige: "#F4EDDD",
  charcoal: "#2A2A2A",
  line: "#C7B97A",
};

// =============================================================================
// Component
// =============================================================================
export default function EstateModelsSection({ onView, onDownload }) {
  return (
    <section
      id="estate-models"
      style={{
        background: rvTokens.beige,
        padding: "96px 24px 120px",
        fontFamily: "Inter, system-ui, sans-serif",
        color: rvTokens.charcoal,
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <Eyebrow>Reserva Verde Goa · Estate Catalogue</Eyebrow>
        <h2
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "clamp(36px, 5vw, 56px)",
            fontWeight: 500,
            color: rvTokens.forest,
            lineHeight: 1.1,
            letterSpacing: "-0.5px",
            maxWidth: 900,
            margin: 0,
          }}
        >
          Choose Your Ground-Level Modular Eco Estate
        </h2>
        <p
          style={{
            fontSize: 17,
            lineHeight: 1.6,
            color: rvTokens.charcoal,
            maxWidth: 760,
            marginTop: 20,
          }}
        >
          Select from 2BHK, 3BHK, 4BHK, or fully customisable ground-level modular container estate models,
          each planned within a private 1-acre eco-sensitive plantation estate.
        </p>
        <div style={{ width: 60, height: 2, background: rvTokens.gold, margin: "28px 0 56px" }} />

        <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
          {estateModels.map((m) => (
            <EstateCard key={m.id} model={m} onView={onView} onDownload={onDownload} />
          ))}
        </div>

        <p
          style={{
            marginTop: 48,
            textAlign: "center",
            fontSize: 12,
            color: "#6B6B6B",
            fontStyle: "italic",
            maxWidth: 720,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          All figures are concept-stage. Layouts subject to final architectural planning, statutory approvals,
          and Reserva Verde Goa eco-sensitive development guidelines. No yield, return, or appreciation
          projections are made or implied.
        </p>
      </div>
    </section>
  );
}

// =============================================================================
// Subcomponents
// =============================================================================
function Eyebrow({ children }) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        fontSize: 12,
        letterSpacing: 4,
        fontWeight: 600,
        color: rvTokens.gold,
        textTransform: "uppercase",
        marginBottom: 16,
      }}
    >
      <span style={{ width: 32, height: 1, background: rvTokens.gold }} />
      {children}
      <span style={{ width: 32, height: 1, background: rvTokens.gold }} />
    </div>
  );
}

function EstateCard({ model, onView, onDownload }) {
  const tag = model.bedroomType === "Customisable" ? "CUSTOMISABLE" : model.builtUpArea;

  return (
    <article
      style={{
        background: rvTokens.ivory,
        borderRadius: 28,
        overflow: "hidden",
        boxShadow:
          "0 30px 60px -30px rgba(31,58,46,0.18), 0 4px 14px -8px rgba(31,58,46,0.12)",
        display: "grid",
        gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)",
        border: "1px solid rgba(199,185,122,0.35)",
      }}
      className="rv-card-grid"
    >
      <div
        style={{
          background: `linear-gradient(135deg, ${rvTokens.forest} 0%, ${rvTokens.forestDeep} 100%)`,
          position: "relative",
          minHeight: 460,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 24,
            left: 24,
            background: rvTokens.gold,
            color: rvTokens.ivory,
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: 2,
            textTransform: "uppercase",
            padding: "8px 16px",
            borderRadius: 999,
          }}
        >
          {tag}
        </div>
        {model.image ? (
          <img
            src={model.image}
            alt={`${model.title} site plan`}
            style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
          />
        ) : (
          <Placeholder color={rvTokens.ivory} />
        )}
      </div>

      <div style={{ padding: "44px 44px 36px", display: "flex", flexDirection: "column", gap: 18 }}>
        <header style={{ borderBottom: "1px solid rgba(199,185,122,0.5)", paddingBottom: 18 }}>
          <h3
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 32,
              fontWeight: 600,
              color: rvTokens.forest,
              lineHeight: 1.15,
              margin: 0,
            }}
          >
            {model.title}
          </h3>
          <div
            style={{
              fontSize: 12,
              letterSpacing: 1.5,
              textTransform: "uppercase",
              color: rvTokens.gold,
              marginTop: 8,
              fontWeight: 600,
            }}
          >
            {model.assetType}
          </div>
        </header>

        <Badges
          items={[model.bedroomType, model.builtUpArea, model.estateSize, "Ground-Level Only"]}
          highlightFirst
        />

        <p style={{ fontSize: 14.5, lineHeight: 1.65, color: rvTokens.charcoal, margin: 0 }}>{model.description}</p>

        <Group label="Plantation Options" items={model.plantationOptions.slice(0, 6)} chip />
        <Group label="Eco Features" items={model.ecoFeatures} chip />

        <div>
          <SectionLabel>Investment Highlights</SectionLabel>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 4 }}>
            {model.investmentHighlights.map((h, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 10,
                  fontSize: 13,
                  color: rvTokens.charcoal,
                  lineHeight: 1.45,
                }}
              >
                <span
                  style={{
                    flexShrink: 0,
                    marginTop: 5,
                    width: 6,
                    height: 6,
                    background: rvTokens.gold,
                    borderRadius: "50%",
                  }}
                />
                {h}
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
          <Button kind="primary" onClick={() => onView?.(model.id)}>
            {model.ctaLabel}
          </Button>
          <Button kind="secondary" onClick={() => onDownload?.(model.id)}>
            {model.secondaryCtaLabel}
          </Button>
        </div>
      </div>
    </article>
  );
}

function Badges({ items, highlightFirst }) {
  return (
    <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
      {items.map((t, i) => {
        const solid = highlightFirst && i === 0;
        return (
          <span
            key={i}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              background: solid ? rvTokens.forest : rvTokens.beige,
              color: solid ? rvTokens.ivory : rvTokens.forest,
              border: `1px solid ${solid ? rvTokens.forest : rvTokens.line}`,
              fontSize: 11.5,
              fontWeight: 600,
              letterSpacing: 0.5,
              padding: "6px 12px",
              borderRadius: 999,
            }}
          >
            {t}
          </span>
        );
      })}
    </div>
  );
}

function Group({ label, items, chip }) {
  return (
    <div>
      <SectionLabel>{label}</SectionLabel>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 6 }}>
        {items.map((t, i) => (
          <span
            key={i}
            style={{
              fontSize: 11.5,
              padding: "5px 11px",
              borderRadius: 999,
              background: "rgba(176,138,62,0.1)",
              color: rvTokens.forest,
              border: "1px solid rgba(176,138,62,0.3)",
              fontWeight: 500,
            }}
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

function SectionLabel({ children }) {
  return (
    <div
      style={{
        fontSize: 10,
        letterSpacing: 2.5,
        fontWeight: 700,
        color: "#6B6B6B",
        textTransform: "uppercase",
      }}
    >
      {children}
    </div>
  );
}

function Button({ kind, children, onClick }) {
  const base = {
    flex: 1,
    padding: "14px 22px",
    borderRadius: 999,
    fontSize: 13.5,
    fontWeight: 600,
    letterSpacing: 0.8,
    cursor: "pointer",
    transition: "all 0.25s ease",
    fontFamily: "inherit",
    border: "none",
  };
  const styles =
    kind === "primary"
      ? { ...base, background: rvTokens.forest, color: rvTokens.ivory }
      : {
          ...base,
          background: "transparent",
          color: rvTokens.forest,
          border: `1.5px solid ${rvTokens.forest}`,
        };
  return (
    <button type="button" onClick={onClick} style={styles}>
      {children}
    </button>
  );
}

function Placeholder({ color }) {
  return (
    <div
      style={{
        color,
        fontFamily: "'Cormorant Garamond', Georgia, serif",
        fontSize: 22,
        opacity: 0.5,
      }}
    >
      Site plan
    </div>
  );
}
