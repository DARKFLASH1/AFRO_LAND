import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Pays {
  id: string;
  nom: string;
}

@Component({
  selector: 'app-afrique',
  templateUrl: './afrique.page.html',
  styleUrls: ['./afrique.page.scss'],
  standalone: false,
})
export class AfriquePage implements OnInit {
  showSearchbar = false;
  searchValue = '';
  filtrerPays: Pays[] = [];

  paysAfrique: Pays[] = [
    // Afrique du Nord
    { id: 'algerie', nom: 'Algérie' },
    { id: 'egypte', nom: 'Égypte' },
    { id: 'libye', nom: 'Libye' },
    { id: 'maroc', nom: 'Maroc' },
    { id: 'soudan', nom: 'Soudan' },
    { id: 'tunisie', nom: 'Tunisie' },
    { id: 'mauritanie', nom: 'Mauritanie' },
    // Afrique de l'Ouest
    { id: 'benin', nom: 'Bénin' },
    { id: 'burkina', nom: 'Burkina Faso' },
    { id: 'cap-vert', nom: 'Cap-Vert' },
    { id: 'cote-ivoire', nom: 'Côte d\'Ivoire' },
    { id: 'gambie', nom: 'Gambie' },
    { id: 'ghana', nom: 'Ghana' },
    { id: 'guinee', nom: 'Guinée' },
    { id: 'guinee-bissau', nom: 'Guinée-Bissau' },
    { id: 'liberia', nom: 'Liberia' },
    { id: 'mali', nom: 'Mali' },
    { id: 'niger', nom: 'Niger' },
    { id: 'nigeria', nom: 'Nigéria' },
    { id: 'senegal', nom: 'Sénégal' },
    { id: 'sierra-leone', nom: 'Sierra Leone' },
    { id: 'togo', nom: 'Togo' },
    // Afrique Centrale
    { id: 'cameroun', nom: 'Cameroun' },
    { id: 'centrafrique', nom: 'République Centrafricaine' },
    { id: 'tchad', nom: 'Tchad' },
    { id: 'congo-brazzaville', nom: 'Congo (Brazzaville)' },
    { id: 'congo-kinshasa', nom: 'République Démocratique du Congo' },
    { id: 'guinee-equatoriale', nom: 'Guinée Équatoriale' },
    { id: 'gabon', nom: 'Gabon' },
    { id: 'saotome', nom: 'Sao Tomé-et-Principe' },
    // Afrique de l'Est
    { id: 'burundi', nom: 'Burundi' },
    { id: 'rwanda', nom: 'Rwanda' },
    { id: 'djibouti', nom: 'Djibouti' },
    { id: 'erythree', nom: 'Érythrée' },
    { id: 'ethiopie', nom: 'Éthiopie' },
    { id: 'kenya', nom: 'Kenya' },
    { id: 'somalie', nom: 'Somalie' },
    { id: 'soudan-du-sud', nom: 'Soudan du Sud' },
    { id: 'tanzanie', nom: 'Tanzanie' },
    { id: 'ouganda', nom: 'Ouganda' },
    { id: 'comores', nom: 'Comores' },
    { id: 'madagascar', nom: 'Madagascar' },
    { id: 'maurice', nom: 'Maurice' },
    { id: 'seychelles', nom: 'Seychelles' },
    // Afrique Australe
    { id: 'angola', nom: 'Angola' },
    { id: 'botswana', nom: 'Botswana' },
    { id: 'eswatini', nom: 'Eswatini' },
    { id: 'lesotho', nom: 'Lesotho' },
    { id: 'malawi', nom: 'Malawi' },
    { id: 'mozambique', nom: 'Mozambique' },
    { id: 'namibie', nom: 'Namibie' },
    { id: 'afrique-sud', nom: 'Afrique du Sud' },
    { id: 'zambie', nom: 'Zambie' },
    { id: 'zimbabwe', nom: 'Zimbabwe' }
  ];

  constructor(private router: Router) {}

  ngOnInit() {}

  /**
   * Normalise une chaîne en supprimant les accents pour une recherche insensible aux accents
   */
  private normaliser(texte: string): string {
    return texte
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();
  }

  toggleSearchbar() {
    this.showSearchbar = !this.showSearchbar;
    if (!this.showSearchbar) {
      this.searchValue = '';
      this.filtrerPays = [];
    }
  }

  onSearchChange(event: any) {
    const value = (event.detail.value || '').trim();
    this.searchValue = value;

    if (value === '') {
      this.filtrerPays = [];
      return;
    }

    const termeRecherche = this.normaliser(value);
    
    // Filtrage et tri intelligent
    this.filtrerPays = this.paysAfrique
      .filter(pays => this.normaliser(pays.nom).includes(termeRecherche))
      .sort((a, b) => {
        const nomA = this.normaliser(a.nom);
        const nomB = this.normaliser(b.nom);
        
        const commenceA = nomA.startsWith(termeRecherche);
        const commenceB = nomB.startsWith(termeRecherche);

        // Priorité aux pays qui commencent par la recherche
        if (commenceA && !commenceB) return -1;
        if (!commenceA && commenceB) return 1;

        // Puis tri alphabétique
        return nomA.localeCompare(nomB);
      });
  }

  /**
   * Filtre les pays à partir d'une chaîne de recherche
   */
  rechercherPays(terme: string): Pays[] {
    if (!terme || terme.trim() === '') {
      return [];
    }
    const termeNormalise = this.normaliser(terme.trim());
    return this.paysAfrique.filter(pays =>
      this.normaliser(pays.nom).includes(termeNormalise)
    );
  }

  ouvrirPays(paysId: string) {
    this.router.navigate(['/pays', paysId]);
  }
}
