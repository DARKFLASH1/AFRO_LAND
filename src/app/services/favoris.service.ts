// ─── AFRO_LAND — FavorisService ──────────────────────────────────────────────
// Étape 5 : Gestion des favoris via Capacitor Preferences (natif iOS/Android)
// ─────────────────────────────────────────────────────────────────────────────
import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { FavoriItem } from '../models/pays.model';

@Injectable({ providedIn: 'root' })
export class FavorisService {

  private readonly CLE = 'favoris_pays';

  // ── Lecture ────────────────────────────────────────────────────────────────

  /** Retourne la liste complète des favoris stockés */
  async getFavoris(): Promise<FavoriItem[]> {
    try {
      const { value } = await Preferences.get({ key: this.CLE });
      return value ? JSON.parse(value) : [];
    } catch (err) {
      console.error('[FavorisService] Erreur lecture favoris :', err);
      return [];
    }
  }

  /** Vérifie si un pays est déjà dans les favoris */
  async estFavori(paysId: string): Promise<boolean> {
    const favoris = await this.getFavoris();
    return favoris.some(f => f.id === paysId);
  }

  // ── Écriture ───────────────────────────────────────────────────────────────

  /**
   * Ajoute ou supprime un pays des favoris (toggle).
   * @returns true si le pays vient d'être ajouté, false s'il a été supprimé.
   */
  async toggleFavori(item: FavoriItem): Promise<boolean> {
    const favoris = await this.getFavoris();
    const index = favoris.findIndex(f => f.id === item.id);

    if (index > -1) {
      // Déjà favori → on supprime
      favoris.splice(index, 1);
      await this.sauvegarder(favoris);
      return false;
    }

    // Pas encore favori → on ajoute
    favoris.push(item);
    await this.sauvegarder(favoris);
    return true;
  }

  /** Supprime un favori par son identifiant */
  async supprimerFavori(paysId: string): Promise<void> {
    const favoris = (await this.getFavoris()).filter(f => f.id !== paysId);
    await this.sauvegarder(favoris);
  }

  /** Supprime tous les favoris */
  async toutEffacer(): Promise<void> {
    try {
      await Preferences.remove({ key: this.CLE });
    } catch (err) {
      console.error('[FavorisService] Erreur effacement :', err);
    }
  }

  // ── Privé ──────────────────────────────────────────────────────────────────

  private async sauvegarder(favoris: FavoriItem[]): Promise<void> {
    try {
      await Preferences.set({ key: this.CLE, value: JSON.stringify(favoris) });
    } catch (err) {
      console.error('[FavorisService] Erreur sauvegarde :', err);
    }
  }
}
