// ─── AFRO_LAND — Modèle de données ──────────────────────────────────────────
// Étape 1 : Types dont tout le reste dépend
// ─────────────────────────────────────────────────────────────────────────────

export interface PaysGeography {
  position: string;
  climate: string;
}

export interface PaysHistory {
  independence: string;
  colonisateur?: string;
}

export interface PaysCulture {
  cuisine: string[];
  languages: string[];
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
  flag: string;          // URL CDN : https://flagcdn.com/w160/{iso2}.png
  drapeaux?: string[];   // ← compatibilité rétro avec pays.page.ts existant
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
