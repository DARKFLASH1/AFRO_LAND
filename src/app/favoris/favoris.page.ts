// ─── AFRO_LAND — FavorisPage (refactorisé) ──────────────────────────────────
// Étape 6 : ionViewWillEnter + FavorisService (Capacitor Preferences)
// ─────────────────────────────────────────────────────────────────────────────
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FavorisService } from '../services/favoris.service';
import { FavoriItem } from '../models/pays.model';

@Component({
  selector: 'app-favoris',
  templateUrl: './favoris.page.html',
  styleUrls: ['./favoris.page.scss'],
  standalone: false,
})
export class FavorisPage {

  paysFavoris: FavoriItem[] = [];
  chargement: boolean = false;

  constructor(
    private favorisService: FavorisService,
    private router: Router
  ) {}

  /**
   * ionViewWillEnter : se déclenche à CHAQUE retour sur la page,
   * contrairement à ngOnInit qui ne s'exécute qu'une seule fois.
   */
  async ionViewWillEnter() {
    await this.chargerFavoris();
  }

  async chargerFavoris() {
    this.chargement = true;
    this.paysFavoris = await this.favorisService.getFavoris();
    this.chargement = false;
  }

  async supprimerFavori(paysId: string) {
    await this.favorisService.supprimerFavori(paysId);
    // Rafraîchir la liste localement sans recharger tout
    this.paysFavoris = this.paysFavoris.filter(p => p.id !== paysId);
  }

  ouvrirPays(paysId: string) {
    this.router.navigate(['/pays', paysId]);
  }

  explorerAfrique() {
    this.router.navigate(['/afrique']);
  }
}
