// ─── AFRO_LAND — PaysPage ────────────────────────────────────────────────────
// Partie 1 (fin) : Skeletons, navigation région précédent/suivant
// Partie 2       : Branché sur FavorisService (Capacitor Preferences)
// ─────────────────────────────────────────────────────────────────────────────
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Share } from '@capacitor/share';
import { PaysService } from '../services/pays.service';
import { FavorisService } from '../services/favoris.service';
import { Pays, PaysResultat } from '../models/pays.model';

@Component({
  selector: 'app-pays',
  templateUrl: './pays.page.html',
  styleUrls: ['./pays.page.scss'],
  standalone: false,
})
export class PaysPage implements OnInit {

  paysId: string    = '';
  pays: Pays | undefined;
  chargement        = true;
  isFavoris         = false;
  erreurBanniere    = false;   // fallback si l'image locale est absente

  // ── Navigation dans la région ───────────────────────────────────────────
  paysRegion: PaysResultat[] = [];   // liste ordonnée des pays de la même région
  indexRegion: number = -1;          // position actuelle dans la liste

  get paysRegionLabel(): string {
    if (this.indexRegion < 0 || this.paysRegion.length === 0) return '';
    return `${this.indexRegion + 1} / ${this.paysRegion.length}`;
  }
  get paysPrec(): PaysResultat | null {
    return this.indexRegion > 0 ? this.paysRegion[this.indexRegion - 1] : null;
  }
  get paysSuiv(): PaysResultat | null {
    return this.indexRegion < this.paysRegion.length - 1
      ? this.paysRegion[this.indexRegion + 1] : null;
  }

  // ── Modal image ──────────────────────────────────────────────────────────
  selectedImage: string | null  = null;
  isImageModalOpen              = false;

  // ── Onglets ──────────────────────────────────────────────────────────────
  activeSegment = 'general';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private paysService: PaysService,
    private favorisService: FavorisService
  ) {}

  ngOnInit() {
    // Réagit aussi aux changements de paramètre (navigation précédent/suivant)
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id && id !== this.paysId) {
        this.paysId         = id;
        this.erreurBanniere = false;
        this.activeSegment  = 'general';
        this.chargerInfosPays();
      }
    });
  }

  // ── Chargement ─────────────────────────────────────────────────────────

  chargerInfosPays() {
    this.chargement = true;
    this.pays       = undefined;

    this.paysService.getPaysById(this.paysId).subscribe({
      next: async (pays) => {
        this.pays      = pays;
        this.chargement = false;

        if (pays) {
          // Statut favori
          this.isFavoris = await this.favorisService.estFavori(this.paysId);
          // Charger les voisins de région pour la navigation
          this.chargerRegion(pays.region);
        }
      },
      error: () => { this.chargement = false; }
    });
  }

  chargerRegion(region: string) {
    this.paysService.getPaysParRegion(region).subscribe(liste => {
      this.paysRegion  = liste;
      this.indexRegion = liste.findIndex(r => r.id === this.paysId);
    });
  }

  // ── Navigation région ──────────────────────────────────────────────────

  allerAuPays(id: string) {
    this.router.navigate(['/pays', id]);
  }

  // ── Favoris ────────────────────────────────────────────────────────────

  async ajouterFavoris() {
    if (!this.pays || !this.paysId) return;
    this.isFavoris = await this.favorisService.toggleFavori({
      id      : this.paysId,
      name    : this.pays.name,
      capital : this.pays.capital,
      region  : this.pays.region,
      flag    : this.pays.flag
    });
  }

  // ── Partage ────────────────────────────────────────────────────────────

  async partager() {
    if (!this.pays) return;

    const highlights = Array.isArray(this.pays.highlights)
      ? this.pays.highlights.slice(0, 3).map(x => `• ${x}`).join('\n')
      : '';

    const message =
      `🌍 Découvrez ${this.pays.name} !\n\n` +
      `📌 Capitale : ${this.pays.capital}\n` +
      `👥 Population : ${this.pays.population}\n` +
      `📍 Région : ${this.pays.region}\n\n` +
      `🏆 Incontournables :\n${highlights}`;

    try {
      await Share.share({ title: `${this.pays.name} - Infos`, text: message });
    } catch {
      navigator.clipboard?.writeText(message);
    }
  }

  // ── Utilitaires UI ──────────────────────────────────────────────────────

  /** Retourne l'image bannière locale ; si absente le fallback affiche le drapeau CDN */
  getImagePrincipale(): string {
    if (this.erreurBanniere || !this.pays?.name) {
      return this.pays?.flag || 'assets/images/afrique-1024x685-1.jpg';
    }
    const nomFichier = this.pays.name
      .toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, '-');
    return `assets/images/${nomFichier}.jpg`;
  }

  onErreurBanniere() {
    // L'image .jpg n'existe pas → on bascule sur le drapeau CDN
    if (!this.erreurBanniere) {
      this.erreurBanniere = true;
    }
  }

  formaterLangues(): string {
    if (!this.pays?.culture?.languages) return 'Non spécifié';
    return Array.isArray(this.pays.culture.languages)
      ? this.pays.culture.languages.join(', ')
      : (this.pays.culture.languages as string);
  }

  onSegmentChange(e: any) {
    this.activeSegment = e.detail.value;
  }

  // ── Utilitaires highlights ──────────────────────────────────────────────

  getTitreSite(s: string): string { return s.split(' - ')[0]; }

  getDescriptionSite(s: string): string {
    const parts = s.split(' - ');
    return parts.length > 1 ? parts[1] : '';
  }

  getImageSite(index: number): string {
    if (!this.pays?.name) return 'assets/images/afrique-1024x685-1.jpg';
    const nomFichier = this.pays.name
      .toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, '-');
    return `assets/images/${nomFichier}${index + 1}.jpeg`;
  }

  // ── Modal image ─────────────────────────────────────────────────────────

  openImage(url: string) {
    this.selectedImage    = url;
    this.isImageModalOpen = true;
  }

  closeImage() {
    this.isImageModalOpen = false;
    setTimeout(() => (this.selectedImage = null), 300);
  }
}
