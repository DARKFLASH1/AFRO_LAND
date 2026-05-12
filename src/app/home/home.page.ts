// ─── AFRO_LAND — HomePage ─────────────────────────────────────────────────────
// Partie 3 : Recherche globale (pays, capitale, langue)
// Partie 9 : Pays du jour
// ─────────────────────────────────────────────────────────────────────────────
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaysService } from '../services/pays.service';
import { PaysResultat } from '../models/pays.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {

  // ── Recherche ──────────────────────────────────────────────────────────────
  afficherRecherche = false;
  termeRecherche    = '';
  resultatsRecherche: PaysResultat[] = [];
  rechercheEnCours  = false;

  // ── Pays du jour ───────────────────────────────────────────────────────────
  paysduJour: PaysResultat | null = null;
  chargementPaysJour = true;

  constructor(
    private router: Router,
    private paysService: PaysService
  ) {}

  ngOnInit() {
    this.chargerPaysduJour();
  }

  // ── Pays du jour ───────────────────────────────────────────────────────────

  chargerPaysduJour(): void {
    this.chargementPaysJour = true;
    this.paysService.getPaysduJour().subscribe({
      next: resultat => {
        this.paysduJour = resultat;
        this.chargementPaysJour = false;
      },
      error: () => { this.chargementPaysJour = false; }
    });
  }

  ouvrirPaysduJour(): void {
    if (this.paysduJour) {
      this.router.navigate(['/pays', this.paysduJour.id]);
    }
  }

  // ── Recherche ──────────────────────────────────────────────────────────────

  toggleRecherche(): void {
    this.afficherRecherche = !this.afficherRecherche;
    if (!this.afficherRecherche) {
      this.fermerRecherche();
    }
  }

  onRecherche(event: any): void {
    const terme = (event?.detail?.value ?? '').trim();
    this.termeRecherche = terme;

    if (terme.length < 2) {
      this.resultatsRecherche = [];
      return;
    }

    this.rechercheEnCours = true;
    this.paysService.rechercherPays(terme).subscribe({
      next: resultats => {
        this.resultatsRecherche = resultats.slice(0, 8);
        this.rechercheEnCours = false;
      },
      error: () => { this.rechercheEnCours = false; }
    });
  }

  fermerRecherche(): void {
    this.afficherRecherche  = false;
    this.termeRecherche     = '';
    this.resultatsRecherche = [];
  }

  ouvrirPays(id: string): void {
    this.fermerRecherche();
    this.router.navigate(['/pays', id]);
  }
}
