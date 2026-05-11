// ─── AFRO_LAND — PaysPage (refactorisé) ─────────────────────────────────────
// Étape 4 : Plus de données hardcodées — tout passe par PaysService
// ─────────────────────────────────────────────────────────────────────────────
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Share } from '@capacitor/share';
import { PaysService } from '../services/pays.service';
import { FavorisService } from '../services/favoris.service';
import { Pays } from '../models/pays.model';

@Component({
  selector: 'app-pays',
  templateUrl: './pays.page.html',
  styleUrls: ['./pays.page.scss'],
  standalone: false,
})
export class PaysPage implements OnInit {

  paysId: string = '';
  pays: Pays | undefined;
  chargement: boolean = true;
  isFavoris: boolean = false;

  // Modal image
  selectedImage: string | null = null;
  isImageModalOpen: boolean = false;

  // Onglets
  activeSegment: string = 'general';

  constructor(
    private route: ActivatedRoute,
    private paysService: PaysService,
    private favorisService: FavorisService
  ) {}

  ngOnInit() {
    this.paysId = this.route.snapshot.paramMap.get('id')!;
    this.chargerInfosPays();
  }

  // ── Chargement ─────────────────────────────────────────────────────────────

  chargerInfosPays() {
    this.chargement = true;
    this.paysService.getPaysById(this.paysId).subscribe({
      next: async (pays) => {
        this.pays = pays;
        this.chargement = false;
        if (this.paysId) {
          this.isFavoris = await this.favorisService.estFavori(this.paysId);
        }
      },
      error: () => {
        this.chargement = false;
      }
    });
  }

  // ── Favoris ────────────────────────────────────────────────────────────────

  async ajouterFavoris() {
    if (!this.pays || !this.paysId) return;

    const estAjouté = await this.favorisService.toggleFavori({
      id: this.paysId,
      name: this.pays.name,
      capital: this.pays.capital,
      region: this.pays.region,
      flag: this.pays.flag
    });

    this.isFavoris = estAjouté;
  }

  // ── Partage ────────────────────────────────────────────────────────────────

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
      navigator.clipboard.writeText(message);
    }
  }

  // ── Utilitaires UI ─────────────────────────────────────────────────────────

  getImagePrincipale(): string {
    return this.pays?.flag || 'assets/default-pays.jpg';
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

  defilerVersSection(s: string) {
    const el = document.getElementById(s);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // ── Utilitaires highlights ──────────────────────────────────────────────────

  getTitreSite(s: string): string {
    return s.split(' - ')[0];
  }

  getDescriptionSite(s: string): string {
    const parts = s.split(' - ');
    return parts.length > 1 ? parts[1] : '';
  }

  getImageSite(index: number): string {
    if (!this.pays || !this.pays.name) return 'assets/default-pays.jpg';
    const nomFichier = this.pays.name.toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, '-');
    return `assets/images/${nomFichier}${index + 1}.jpeg`;
  }

  // ── Modal image ────────────────────────────────────────────────────────────

  openImage(url: string) {
    this.selectedImage = url;
    this.isImageModalOpen = true;
  }

  closeImage() {
    this.isImageModalOpen = false;
    setTimeout(() => (this.selectedImage = null), 300);
  }
}
