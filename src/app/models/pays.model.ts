// ─── AFRO_LAND — Modèle de données ──────────────────────────────────────────
// Étape 1 : Types dont tout le reste dépend
// Mis à jour (Partie 7) : champs enrichis superficie, pib, hdi, religion, wikipedia
// ─────────────────────────────────────────────────────────────────────────────

export interface PaysGeography {
  position: string;
  climate: string;
  neighbors?: string[];
  highestPoint?: string;
  coastline?: string;
}

export interface PaysHistory {
  independence: string;
  colonisateur?: string;
  precolonial?: string;
  colonial?: string;
  historicalFigures?: string[];
}

export interface PaysCulture {
  cuisine: string[];
  languages: string[];
  religions?: string[];
  arts?: string[];
  music?: string[];
}

export interface PaysEconomy {
  mainSectors: string[];
  exports: string[];
}

export interface Pays {
  name: string;
  capital: string;
  population: string;
  currency: string;
  region: string;
  flag: string;           // URL CDN : https://flagcdn.com/w160/{iso2}.png
  drapeaux?: string[];    // ← compatibilité rétro (à supprimer après migration complète)
  motto?: string;
  area?: string;
  president?: string;
  timezone?: string;

  // ── Champs enrichis (Partie 7) ──────────────────────────────────────────
  superficie?: number;    // en km²
  pib?: number;           // PIB en milliards USD (données ~2023)
  hdi?: number;           // Indice de développement humain (0–1, données ~2022)
  religion?: string;      // Religion majoritaire
  wikipedia?: string;     // URL Wikipedia francophone du pays

  geography: PaysGeography;
  history: PaysHistory;
  culture: PaysCulture;
  economy: PaysEconomy;
  highlights: string[];
}

export interface PaysMap {
  [id: string]: Pays;
}

// Résultat de recherche renvoyé par PaysService.rechercherPays()
export interface PaysResultat {
  id: string;
  pays: Pays;
}

// Item minimal stocké dans les favoris (Capacitor Preferences)
export interface FavoriItem {
  id: string;
  name: string;
  capital: string;
  region: string;
  flag: string;
}
