import { IMAGIN_MAKE, MODEL_FAMILY, COLOR_PAINT } from '../data';

// ─── IMAGIN.STUDIO CAR IMAGE URL ──────────────────────────────────────────────
const IMAGIN_BASE = "https://cdn.imagin.studio/getimage";

/**
 * imagin.studio returns HTTP 500 for unsupported make/model/paint combos.
 * Strategy: strip problematic params one by one to widen compatibility.
 *
 * Tier 1 — full request  (make + modelFamily + year + paint + angle)
 * Tier 2 — no paint      (some models lack paint support)
 * Tier 3 — no year       (older models may not have year data)
 * Tier 4 — angle=23 only (fallback to safest front angle)
 *
 * The CarImage component works through these tiers automatically on 500/error.
 */

// Paint codes confirmed working broadly across imagin.studio makes
const SAFE_PAINTS = {
  "Obsidian Black":  "black",
  "Polar White":     "white",
  "Iridium Silver":  "silver",
  "Selenite Grey":   "grey",
  "Cavansite Blue":  "blue",
  "Cardinal Red":    "red",
  "Mojave Beige":    "beige",
  "Citrine Brown":   "brown",
};

/**
 * Build URL for a specific fallback tier.
 * tier 0 = full params
 * tier 1 = no paintDescription
 * tier 2 = no paintDescription + no modelYear
 * tier 3 = no paintDescription + no modelYear + angle forced to "23"
 */
export function getCarImageUrl(brand, model, year = 2024, color = "Obsidian Black", angle = "23", tier = 0) {
  const make        = IMAGIN_MAKE[brand] || brand;
  const modelFamily = MODEL_FAMILY[model]
    || model.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
  const paintDesc   = SAFE_PAINTS[color] || COLOR_PAINT[color] || "black";
  const safeAngle   = tier >= 3 ? "23" : angle;

  const params = {
    customer:   "img",
    make,
    modelFamily,
    zoomType:   "fullscreen",
    angle:      safeAngle,
  };

  // Tier 0: include year + paint
  if (tier === 0) {
    params.modelYear        = String(year);
    params.paintDescription = paintDesc;
  }
  // Tier 1: year only, no paint
  else if (tier === 1) {
    params.modelYear = String(year);
  }
  // Tier 2+: neither year nor paint

  return `${IMAGIN_BASE}?${new URLSearchParams(params).toString()}`;
}

/** Returns all fallback tiers for a given car as an ordered array of URLs. */
export function getCarImageFallbacks(brand, model, year, color, angle) {
  return [0, 1, 2, 3].map((tier) =>
    getCarImageUrl(brand, model, year, color, angle, tier)
  );
}

/** Ultimate placeholder when all tiers fail. */
export function getPlaceholderUrl(model, brand) {
  const label = encodeURIComponent(`${model || brand}`);
  return `https://placehold.co/600x380/0d0d1a/C0A060?text=${label}`;
}

// ─── LOCAL STORAGE ────────────────────────────────────────────────────────────
export const ls = {
  get: (key, fallback) => {
    try {
      const val = localStorage.getItem(key);
      return val ? JSON.parse(val) : fallback;
    } catch {
      return fallback;
    }
  },
  set: (key, value) => {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
  },
};

// ─── NUMBER FORMATTING ────────────────────────────────────────────────────────
export const formatPrice = (n) => `${n.toLocaleString()} EGP`;
