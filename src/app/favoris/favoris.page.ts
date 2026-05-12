// ─── AFRO_LAND — FavorisPage ──────────────────────────────────────────────────
// Partie 2 : ionViewWillEnter + FavorisService + bouton "Tout effacer" avec
//            confirmation AlertController + animation par index
// ─────────────────────────────────────────────────────────────────────────────
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
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
  chargement  = false;

  constructor(
    private favorisService: FavorisService,
    private router: Router,
    private alertCtrl: AlertController
  ) {}

  /**
   * ionViewWillEnter : se déclenche à CHAQUE retour sur la page,
   * contrairement à ngOnInit qui ne s'exécute qu'une seule fois.
   */
  async ionViewWillEnter() {
    await this.chargerFavoris();
  }

  async chargerFavoris() {
    this.chargement  = true;
    this.paysFavoris = await this.favorisService.getFavoris();
    this.chargement  = false;
  }

  async supprimerFavori(paysId: string) {
    await this.favorisService.supprimerFavori(paysId);
    // Mise à jour locale immédiate (sans rechargement complet)
    this.paysFavoris = this.paysFavoris.filter(p => p.id !== paysId);
  }

  /** Confirmation puis suppression de tous les favoris */
  async toutEffacer() {
    const alert = await this.alertCtrl.create({
      header  : 'Effacer les favoris',
      message : 'Supprimer les <strong>' + this.paysFavoris.length + '</strong> pays de ta liste de favoris ?',
      buttons : [
        { text: 'Annuler', role: 'cancel' },
        {
          text    : 'Tout effacer',
          role    : 'destructive',
          cssClass: 'alert-btn-danger',
          handler : async () => {
            await this.favorisService.toutEffacer();
            this.paysFavoris = [];
          }
        }
      ],
      cssClass: 'afro-alert'
    });
    await alert.present();
  }

  ouvrirPays(paysId: string) {
    this.router.navigate(['/pays', paysId]);
  }

  explorerAfrique() {
    this.router.navigate(['/afrique']);
  }
}
