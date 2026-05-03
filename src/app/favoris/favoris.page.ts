import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-favoris',
  templateUrl: './favoris.page.html',
  styleUrls: ['./favoris.page.scss'],
  standalone: false,
})
export class FavorisPage implements OnInit {
  paysFavoris: any[] = [];

  ngOnInit() {
    this.chargerFavoris();
  }

  chargerFavoris() {
    try {
      this.paysFavoris = JSON.parse(localStorage.getItem('favoris') || '[]');
    } catch (error) {
      console.error('Erreur lors du chargement des favoris:', error);
      this.paysFavoris = [];
    }
  }

  supprimerFavori(paysId: string) {
    this.paysFavoris = this.paysFavoris.filter(pays => pays.id !== paysId);
    localStorage.setItem('favoris', JSON.stringify(this.paysFavoris));
  }
}