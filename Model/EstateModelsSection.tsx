"use client";

import React, { useState, useCallback } from "react";

/* ============================================================================
   Reserva Verde Goa — Ground-Level Modular Eco Estate Models
   Premium 1-acre estate section. Drop-in replacement for the old
   "Upcoming Locations in India" / pod-layout carousel.

   - TypeScript + Tailwind CSS
   - Uses plain <img> for SVG site plans (safe in Next.js & plain React)
   - Self-contained "View Details" modal, no external UI deps
   - All copy/data lives in the `estateModels` array below
   ========================================================================== */

export interface EstateModel {
  id: string;
  title: string;
  bedroomType: string;
  builtUpArea: string;
  estateSize: string;
  assetType: string;
  homeType: string;
  placementOptions: string;
  plantationOptions: string;
  description: string;
  ecoFeatures: string[];
  specifications: string[];
  investmentHighlights: string[];
  image: string;
  ctaLabel: string;
  secondaryCtaLabel: string;
  downloadUrl: string;
  scheduleUrl: string;
}

export interface EstateModelsSectionProps {
  /** Where "Request Masterplan" / "Speak to Advisor" should point. */
  contactHref?: string;
  /** Concept doc download path. */
  conceptUrl?: string;
  /** Schedules xlsx download path. */
  scheduleUrl?: string;
}

const CONCEPT_URL = "/downloads/Reserva_Verde_Goa_Concept.docx";
const SCHEDULE_URL = "/downloads/Reserva_Verde_Goa_Schedules.xlsx";

export const estateModels: EstateModel[] = [
  {
    id: "estate-2bhk",
    title: "2BHK Compact Modular Eco Estate",
    bedroomType: "2BHK",
    builtUpArea: "2500 sq.ft",
    estateSize: "1 Acre",
    assetType: "Ground-Level Modular Container Eco Home + Eco Plantation Estate",
    homeType: "Premium 2BHK ground-level modular container eco-home",
    placementOptions:
      "Can be placed near the front for easy access, toward one side to maximise plantation area, or around a courtyard for private estate-style living.",
    plantationOptions:
      "Cashew, mango, coconut, pepper, spices, herbal garden, food forest, or mixed organic farming.",
    description:
      "A refined 1-acre modular eco estate with a 2500 sq.ft ground-level container home, designed for efficient luxury living, managed agriculture, private outdoor lifestyle, and long-term land-backed value.",
    ecoFeatures: [
      "Solar-ready roofing",
      "Rainwater harvesting",
      "Drip irrigation",
      "Natural ventilation",
      "Low-impact foundation",
      "Organic waste provision",
      "Permeable pathways",
    ],
    specifications: [
      "1-acre private estate",
      "2500 sq.ft built-up",
      "2 bedrooms",
      "Attached bathrooms",
      "Living & dining zone",
      "Kitchen + utility",
      "Private deck",
      "Courtyard & garden",
      "Plantation zone",
      "Water storage",
      "Optional rental management",
    ],
    investmentHighlights: [
      "Lower built-up footprint with a higher open-land ratio",
      "Strong lifestyle value, well suited for farm-stay use",
      "Easy maintenance",
      "Positioned for long-term asset appreciation",
    ],
    image: "/images/estates/site-plan-2bhk.svg",
    ctaLabel: "View Details",
    secondaryCtaLabel: "Download Specs",
    downloadUrl: CONCEPT_URL,
    scheduleUrl: SCHEDULE_URL,
  },
  {
    id: "estate-3bhk",
    title: "3BHK Premium Modular Agro Estate",
    bedroomType: "3BHK",
    builtUpArea: "3500 sq.ft",
    estateSize: "1 Acre",
    assetType: "Ground-Level Modular Container Eco Home + Eco Plantation Estate",
    homeType:
      "Premium 3BHK ground-level modular container eco-home with expanded living and outdoor deck zones",
    placementOptions:
      "Can be placed in an L-shaped courtyard format, near the centre for estate presence, or toward one side to create a larger plantation block.",
    plantationOptions:
      "Cashew, mango, coconut, teak with pepper, spice garden, herbal garden, or mixed plantation model.",
    description:
      "A balanced 1-acre modular estate with a 3500 sq.ft ground-level container home, larger family spaces, plantation-facing decks, and managed agriculture potential.",
    ecoFeatures: [
      "Modular low-impact construction",
      "Solar-ready roof",
      "Water harvesting",
      "Smart irrigation",
      "Composting provision",
      "Energy-efficient lighting",
      "Native plantation integration",
    ],
    specifications: [
      "1-acre private estate",
      "3500 sq.ft built-up",
      "3 bedrooms",
      "3 bathrooms",
      "Living & dining",
      "Kitchen",
      "Family lounge",
      "Study",
      "Verandah",
      "Outdoor deck",
      "Private garden",
      "Plantation block",
      "Utility zone",
    ],
    investmentHighlights: [
      "Balanced luxury and open land with strong family usage value",
      "Better rental appeal and premium resale positioning",
      "Plantation income potential",
      "Suitable for NRI and HNI buyers",
    ],
    image: "/images/estates/site-plan-3bhk.svg",
    ctaLabel: "View Details",
    secondaryCtaLabel: "Download Specs",
    downloadUrl: CONCEPT_URL,
    scheduleUrl: SCHEDULE_URL,
  },
  {
    id: "estate-4bhk",
    title: "4BHK Signature Modular Luxury Estate",
    bedroomType: "4BHK",
    builtUpArea: "4500 sq.ft",
    estateSize: "1 Acre",
    assetType: "Ground-Level Modular Container Eco Home + Eco Plantation Estate",
    homeType:
      "Large 4BHK premium ground-level modular container eco-home with luxury retreat-style planning",
    placementOptions:
      "Can be designed as a pavilion-style layout around a central courtyard, placed at the rear for privacy, or positioned centrally for a luxury estate arrival experience.",
    plantationOptions:
      "Teak, black pepper, mango, coconut, spices, medicinal herbs, coffee, or customised agro plan.",
    description:
      "The flagship 1-acre modular luxury estate with a 4500 sq.ft ground-level container home, private landscaped zones, curated plantation, wellness-focused outdoor areas, and premium retreat potential.",
    ecoFeatures: [
      "Premium modular container architecture",
      "Reduced site disturbance",
      "Solar-ready infrastructure",
      "Rainwater harvesting",
      "Passive cooling",
      "Eco-sanitation provision",
      "Biodiversity planning",
    ],
    specifications: [
      "1-acre private estate",
      "4500 sq.ft built-up",
      "4 bedrooms",
      "Attached bathrooms",
      "Grand living room",
      "Formal dining",
      "Open kitchen",
      "Service kitchen",
      "Study",
      "Family lounge",
      "Staff / service provision",
      "Large deck",
      "Wellness garden",
      "Private parking",
    ],
    investmentHighlights: [
      "Highest luxury positioning with strong premium rental potential",
      "Ideal for private retreats with strong HNI appeal",
      "Suitable for branded farm-stay or wellness retreat use",
    ],
    image: "/images/estates/site-plan-4bhk.svg",
    ctaLabel: "View Details",
    secondaryCtaLabel: "Download Specs",
    downloadUrl: CONCEPT_URL,
    scheduleUrl: SCHEDULE_URL,
  },
  {
    id: "estate-custom",
    title: "Fully Customisable Modular Eco Estate",
    bedroomType: "Customisable",
    builtUpArea: "Customisable",
    estateSize: "1 Acre",
    assetType: "Ground-Level Modular Container Eco Home + Eco Plantation Estate",
    homeType: "Fully customisable ground-level modular container eco-home",
    placementOptions:
      "Can be placed near the entry, at the centre, toward the rear, on one side, or around a courtyard depending on buyer preference, slope, views, privacy, and plantation planning.",
    plantationOptions:
      "Buyer-choice plantation, herbal garden, food forest, spice plantation, fruit orchard, timber plantation, or mixed agro model.",
    description:
      "A fully flexible 1-acre estate where the buyer can customise the modular container home layout, built-up area, bedroom count, plantation model, outdoor zones, and rental-readiness while following eco-sensitive development guidelines.",
    ecoFeatures: [
      "Expandable modular layout",
      "Lower environmental footprint",
      "Faster execution timeline",
      "Solar-ready roof",
      "Rainwater harvesting",
      "Bio-septic option",
      "Low-impact foundation",
      "Reusable, adaptable structure",
    ],
    specifications: [
      "1-acre estate",
      "Custom built-up area",
      "Custom bedroom count",
      "Ground-level container design",
      "Expandable modules",
      "Outdoor deck",
      "Firepit / sit-out zone",
      "Plantation zone",
      "Rental-ready layout",
      "Buyer-choice interiors",
    ],
    investmentHighlights: [
      "Flexible cost structure with a faster delivery option",
      "Eco-sensitive construction with strong visual appeal for tourism",
      "Ideal for retreat rental",
      "Strong differentiation from conventional real estate",
    ],
    image: "/images/estates/site-plan-customisable.svg",
    ctaLabel: "View Details",
    secondaryCtaLabel: "Download Specs",
    downloadUrl: CONCEPT_URL,
    scheduleUrl: SCHEDULE_URL,
  },
];

const PROJECT_STATS: { label: string; value: string }[] = [
  { label: "Total Project Area", value: "1000 Acres" },
  { label: "Planned Estate Units", value: "900" },
  { label: "Estate Size", value: "1 Acre Each" },
  { label: "Home Models", value: "2500 / 3500 / 4500 Sq.Ft / Custom" },
  { label: "Asset Type", value: "Ground-Level Modular Eco Estate" },
  { label: "Positioning", value: "Premium Eco-Agri Masterplan" },
];

/* ---------- Small presentational helpers ---------- */

function Badge({ children, gold = false }: { children: React.ReactNode; gold?: boolean }) {
  return (
    <span
      className={
        "inline-block rounded-full px-3 py-1 text-xs font-medium tracking-wide " +
        (gold
          ? "bg-[#F2E7C9] text-[#7A5E1E] ring-1 ring-[#D8BE78]"
          : "bg-[#EAF0E6] text-[#22432D] ring-1 ring-[#CBDCC0]")
      }
    >
      {children}
    </span>
  );
}

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0">
      <dt className="text-[11px] uppercase tracking-[0.14em] text-[#9A8E70]">{label}</dt>
      <dd className="mt-0.5 break-words text-sm font-semibold text-[#2C2A26]">{value}</dd>
    </div>
  );
}

/* ---------- Detail modal ---------- */

function DetailModal({
  model,
  onClose,
}: {
  model: EstateModel;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-[#1B2A1F]/70 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={model.title}
      onClick={onClose}
    >
      <div
        className="relative max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-t-3xl bg-[#FBF7EE] shadow-2xl sm:rounded-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-[#1F3D2B] text-[#FBF7EE] transition hover:bg-[#2E5339]"
        >
          ✕
        </button>

        <div className="grid gap-0 sm:grid-cols-2">
          <div className="bg-[#F1ECDB] p-5 sm:p-7">
            <img
              src={model.image}
              alt={`${model.title} — 1-acre ground-level modular eco estate site plan`}
              className="w-full rounded-2xl ring-1 ring-[#E0D6BB]"
              loading="lazy"
            />
          </div>

          <div className="p-6 sm:p-8">
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#B8924A]">
              {model.bedroomType} · {model.estateSize}
            </p>
            <h3 className="mt-1 font-serif text-2xl leading-snug text-[#1F3D2B]">
              {model.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-[#5A5644]">
              {model.description}
            </p>

            <dl className="mt-5 grid grid-cols-2 gap-4">
              <MetaItem label="Bedroom Type" value={model.bedroomType} />
              <MetaItem label="Built-up Area" value={model.builtUpArea} />
              <MetaItem label="Estate Size" value={model.estateSize} />
              <MetaItem label="Home Type" value={model.homeType} />
            </dl>

            <p className="mt-5 text-[11px] uppercase tracking-[0.14em] text-[#9A8E70]">
              Asset Type
            </p>
            <p className="text-sm font-semibold text-[#2C2A26]">{model.assetType}</p>
          </div>
        </div>

        <div className="grid gap-7 px-6 pb-8 sm:grid-cols-2 sm:px-8">
          <div>
            <h4 className="font-serif text-lg text-[#1F3D2B]">Placement Options</h4>
            <p className="mt-2 text-sm leading-relaxed text-[#5A5644]">
              {model.placementOptions}
            </p>
            <h4 className="mt-5 font-serif text-lg text-[#1F3D2B]">Plantation Options</h4>
            <p className="mt-2 text-sm leading-relaxed text-[#5A5644]">
              {model.plantationOptions}
            </p>
            <h4 className="mt-5 font-serif text-lg text-[#1F3D2B]">Eco Features</h4>
            <div className="mt-3 flex flex-wrap gap-2">
              {model.ecoFeatures.map((f) => (
                <Badge key={f}>{f}</Badge>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-serif text-lg text-[#1F3D2B]">Specifications</h4>
            <div className="mt-3 flex flex-wrap gap-2">
              {model.specifications.map((s) => (
                <Badge key={s} gold>
                  {s}
                </Badge>
              ))}
            </div>
            <h4 className="mt-5 font-serif text-lg text-[#1F3D2B]">
              Investment Highlights
            </h4>
            <ul className="mt-3 space-y-2">
              {model.investmentHighlights.map((h) => (
                <li key={h} className="flex gap-2 text-sm text-[#5A5644]">
                  <span className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-[#B8924A]" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 border-t border-[#E5DCC4] bg-[#F4EEDD] px-6 py-5 sm:px-8">
          <a
            href={model.downloadUrl}
            download
            className="rounded-full bg-[#1F3D2B] px-6 py-3 text-sm font-semibold text-[#FBF7EE] transition hover:bg-[#2E5339]"
          >
            Download Specs
          </a>
          <a
            href={model.scheduleUrl}
            download
            className="rounded-full px-6 py-3 text-sm font-semibold text-[#1F3D2B] underline decoration-[#B8924A] underline-offset-4 transition hover:text-[#2E5339]"
          >
            Download Schedule
          </a>
        </div>
      </div>
    </div>
  );
}

/* ---------- Estate card ---------- */

function EstateCard({
  model,
  onView,
}: {
  model: EstateModel;
  onView: (m: EstateModel) => void;
}) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl bg-[#FBF7EE] shadow-[0_18px_50px_-22px_rgba(31,61,43,0.5)] ring-1 ring-[#EAE0C7] transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_60px_-20px_rgba(31,61,43,0.55)] md:flex-row">
      <div className="relative md:w-[44%]">
        <div className="h-full bg-[#F1ECDB] p-4 sm:p-6">
          <img
            src={model.image}
            alt={`${model.title} — 1-acre ground-level modular container eco estate site plan`}
            className="h-full w-full rounded-2xl object-cover ring-1 ring-[#E2D8BD]"
            loading="lazy"
          />
        </div>
        <span className="absolute left-6 top-6 rounded-full bg-[#1F3D2B] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-[#F0E8CF]">
          {model.bedroomType}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-8">
        <p className="text-[11px] uppercase tracking-[0.2em] text-[#B8924A]">
          {model.estateSize} · Ground-Level Modular Eco Estate
        </p>
        <h3 className="mt-1.5 font-serif text-2xl leading-snug text-[#1F3D2B]">
          {model.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-[#5A5644]">
          {model.description}
        </p>

        <dl className="mt-5 grid grid-cols-2 gap-4 border-y border-[#EAE0C7] py-4 sm:grid-cols-4">
          <MetaItem label="Bedrooms" value={model.bedroomType} />
          <MetaItem label="Built-up" value={model.builtUpArea} />
          <MetaItem label="Estate" value={model.estateSize} />
          <MetaItem label="Asset" value="Eco Estate" />
        </dl>

        <div className="mt-4">
          <p className="text-[11px] uppercase tracking-[0.14em] text-[#9A8E70]">
            Placement
          </p>
          <p className="mt-1 line-clamp-2 text-sm text-[#5A5644]">
            {model.placementOptions}
          </p>
        </div>

        <div className="mt-3">
          <p className="text-[11px] uppercase tracking-[0.14em] text-[#9A8E70]">
            Plantation
          </p>
          <p className="mt-1 line-clamp-2 text-sm text-[#5A5644]">
            {model.plantationOptions}
          </p>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {model.ecoFeatures.slice(0, 4).map((f) => (
            <Badge key={f}>{f}</Badge>
          ))}
          {model.specifications.slice(0, 3).map((s) => (
            <Badge key={s} gold>
              {s}
            </Badge>
          ))}
        </div>

        <ul className="mt-4 space-y-1.5">
          {model.investmentHighlights.slice(0, 3).map((h) => (
            <li key={h} className="flex gap-2 text-sm text-[#5A5644]">
              <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-[#B8924A]" />
              <span>{h}</span>
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-wrap items-center gap-3 pt-6">
          <button
            onClick={() => onView(model)}
            className="rounded-full bg-[#1F3D2B] px-6 py-3 text-sm font-semibold text-[#FBF7EE] transition hover:bg-[#2E5339]"
          >
            {model.ctaLabel}
          </button>
          <a
            href={model.downloadUrl}
            download
            className="rounded-full px-5 py-3 text-sm font-semibold text-[#1F3D2B] ring-1 ring-[#C9B889] transition hover:bg-[#F2E7C9]"
          >
            {model.secondaryCtaLabel}
          </a>
          <a
            href={model.scheduleUrl}
            download
            className="text-sm font-medium text-[#7A6A45] underline decoration-[#C9A227] underline-offset-4 transition hover:text-[#1F3D2B]"
          >
            Download Schedule
          </a>
        </div>
      </div>
    </article>
  );
}

/* ---------- Main section ---------- */

export default function EstateModelsSection({
  contactHref = "/contact",
  conceptUrl = CONCEPT_URL,
}: EstateModelsSectionProps) {
  const [active, setActive] = useState<EstateModel | null>(null);
  const close = useCallback(() => setActive(null), []);

  return (
    <section
      id="estate-models"
      className="relative overflow-hidden bg-[#F4EEDD] py-20 sm:py-28"
    >
      {/* atmosphere */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        style={{
          background:
            "radial-gradient(60% 50% at 80% 0%, rgba(184,146,74,0.18), transparent 60%), radial-gradient(50% 45% at 0% 100%, rgba(31,61,43,0.12), transparent 60%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        {/* header */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[12px] font-semibold uppercase tracking-[0.32em] text-[#B8924A]">
            Reserva Verde Goa · Bluechip Global Agro
          </p>
          <h2 className="mt-4 font-serif text-3xl leading-tight text-[#1F3D2B] sm:text-5xl">
            Choose Your Ground-Level Modular Eco Estate
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[#5A5644]">
            Select from 2BHK, 3BHK, 4BHK, or a fully customisable ground-level
            modular container estate model, each planned within a private 1-acre
            eco-sensitive plantation estate.
          </p>
        </div>

        {/* stats strip */}
        <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-[#DCCFA8] ring-1 ring-[#DCCFA8] sm:grid-cols-3 lg:grid-cols-6">
          {PROJECT_STATS.map((s) => (
            <div key={s.label} className="bg-[#1F3D2B] px-5 py-6 text-center">
              <p className="text-sm font-bold text-[#F0E8CF] sm:text-base">
                {s.value}
              </p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.16em] text-[#9DB29C]">
                {s.label}
              </p>
            </div>
          ))}
        </div>

        {/* cards */}
        <div className="mt-14 grid gap-8">
          {estateModels.map((m) => (
            <EstateCard key={m.id} model={m} onView={setActive} />
          ))}
        </div>

        {/* CTA block */}
        <div className="mt-16 overflow-hidden rounded-3xl bg-[#1F3D2B] px-6 py-12 text-center shadow-2xl sm:px-12 sm:py-16">
          <p className="text-[12px] font-semibold uppercase tracking-[0.3em] text-[#C9A227]">
            1000-Acre Masterplanned Destination
          </p>
          <h3 className="mx-auto mt-4 max-w-3xl font-serif text-2xl leading-snug text-[#FBF7EE] sm:text-4xl">
            Reserve Your 1-Acre Modular Eco Estate at Reserva Verde Goa
          </h3>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-[#CFDBC8] sm:text-base">
            Choose from premium ground-level modular estate models designed for
            eco-sensitive living, managed agriculture, wellness tourism
            potential, and long-term land-backed value inside a 1000-acre
            masterplanned destination.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <a
              href={contactHref}
              className="rounded-full bg-[#C9A227] px-7 py-3.5 text-sm font-bold text-[#1F3D2B] transition hover:bg-[#D8B947]"
            >
              Request Masterplan
            </a>
            <a
              href={contactHref}
              className="rounded-full px-7 py-3.5 text-sm font-bold text-[#FBF7EE] ring-1 ring-[#6E8470] transition hover:bg-[#2E5339]"
            >
              Speak to Advisor
            </a>
            <a
              href={conceptUrl}
              download
              className="text-sm font-semibold text-[#E7D9AE] underline decoration-[#C9A227] underline-offset-4 transition hover:text-[#FBF7EE]"
            >
              Download Estate Options
            </a>
          </div>
        </div>
      </div>

      {active && <DetailModal model={active} onClose={close} />}
    </section>
  );
}
