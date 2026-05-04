import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Share } from '@capacitor/share';

@Component({
  selector: 'app-pays',
  templateUrl: './pays.page.html',
  styleUrls: ['./pays.page.scss'],
  standalone: false,
})
export class PaysPage implements OnInit {
  paysId: string = '';
  pays: any;
  chargement: boolean = true;
  isFavoris: boolean = false;
  selectedImage: string | null = null;
  isImageModalOpen: boolean = false;

  private infosPays: { [key: string]: any } = {

    // ─── AFRIQUE DU NORD ───────────────────────────────────────────────────────
    'algerie': {
      name: 'Algérie', capital: 'Alger', population: '47M', currency: 'DZD',
      region: 'Afrique du Nord',
      geography: { position: 'Nord de l\'Afrique, côte méditerranéenne', climate: 'Méditerranéen au nord, Désertique (Sahara) au sud' },
      history: { independence: '1962', colonisateur: 'France' },
      culture: { cuisine: ['Couscous', 'Tajine', 'Chorba', 'Méchoui'], languages: ['Arabe', 'Tamazight', 'Français'] },
      economy: { mainSectors: ['Hydrocarbures', 'Agriculture', 'BTP'], exports: ['Pétrole', 'Gaz naturel'] },
      highlights: ['Parc national du Tassili n\'Ajjer (UNESCO)', 'Casbah d\'Alger (UNESCO)', 'Ghardaïa (UNESCO)', 'Tipaza (ruines romaines)'],
      drapeaux: ['assets/images/algerie1.jpeg']
    },
    'egypte': {
      name: 'Égypte', capital: 'Le Caire', population: '115M', currency: 'EGP',
      region: 'Afrique du Nord',
      geography: { position: 'Nord-Est de l\'Afrique, bordé par la Méditerranée et la mer Rouge', climate: 'Aride désertique' },
      history: { independence: '1953', colonisateur: 'Royaume-Uni' },
      culture: { cuisine: ['Koshary', 'Falafel', 'Ful medames', 'Molokhiya'], languages: ['Arabe'] },
      economy: { mainSectors: ['Tourisme', 'Canal de Suez', 'Agriculture', 'Pétrole'], exports: ['Pétrole', 'Gaz', 'Textiles'] },
      highlights: ['Pyramides de Gizeh (UNESCO)', 'Louxor et Karnak', 'Vallée des Rois', 'Abu Simbel', 'Mer Rouge (plongée)'],
      drapeaux: ['assets/images/egypte1.jpeg']
    },
    'libye': {
      name: 'Libye', capital: 'Tripoli', population: '7.4M', currency: 'LYD',
      region: 'Afrique du Nord',
      geography: { position: 'Nord de l\'Afrique, côte méditerranéenne', climate: 'Méditerranéen sur la côte, Désertique à l\'intérieur' },
      history: { independence: '1951', colonisateur: 'Italie' },
      culture: { cuisine: ['Bazeen', 'Shorba', 'Makarouna'], languages: ['Arabe'] },
      economy: { mainSectors: ['Pétrole & gaz'], exports: ['Pétrole'] },
      highlights: ['Sites archéologiques romains (Leptis Magna, Sabratha)', 'Côtes méditerranéennes', 'Désert du Sahara'],
      drapeaux: ['assets/images/libye1.jpeg']
    },
    'maroc': {
      name: 'Maroc', capital: 'Rabat', population: '38M', currency: 'MAD',
      region: 'Afrique du Nord',
      geography: { position: 'Nord-Ouest de l\'Afrique, façades Atlantique et Méditerranée', climate: 'Méditerranéen, semi-aride au sud' },
      history: { independence: '1956', colonisateur: 'France / Espagne' },
      culture: { cuisine: ['Tajine', 'Pastilla', 'Couscous', 'Harira'], languages: ['Arabe', 'Tamazight', 'Français'] },
      economy: { mainSectors: ['Phosphates', 'Tourisme', 'Agriculture', 'Industrie automobile'], exports: ['Phosphates', 'Voitures', 'Agrumes'] },
      highlights: ['Médina de Fès (UNESCO)', 'Médina de Marrakech (UNESCO)', 'Aït Benhaddou (UNESCO)', 'Désert de Merzouga', 'Essaouira'],
      drapeaux: ['assets/images/maroc1.jpeg']
    },
    'soudan': {
      name: 'Soudan', capital: 'Khartoum', population: '48M', currency: 'SDG',
      region: 'Afrique du Nord',
      geography: { position: 'Nord-Est de l\'Afrique, vallée du Nil', climate: 'Aride au nord, semi-aride au sud' },
      history: { independence: '1956', colonisateur: 'Royaume-Uni / Égypte' },
      culture: { cuisine: ['Ful medames', 'Kisra', 'Aseeda'], languages: ['Arabe', 'Nubien'] },
      economy: { mainSectors: ['Agriculture', 'Élevage', 'Or'], exports: ['Or', 'Pétrole', 'Coton'] },
      highlights: ['Pyramides de Méroé (UNESCO)', 'Vallée du Nil', 'Jebel Barkal (UNESCO)'],
      drapeaux: ['assets/images/soudan1.jpeg']
    },
    'tunisie': {
      name: 'Tunisie', capital: 'Tunis', population: '12.5M', currency: 'TND',
      region: 'Afrique du Nord',
      geography: { position: 'Nord de l\'Afrique, côte méditerranéenne', climate: 'Méditerranéen au nord, semi-aride au centre, aride au sud' },
      history: { independence: '1956', colonisateur: 'France' },
      culture: { cuisine: ['Couscous', 'Brik', 'Lablabi', 'Harissa'], languages: ['Arabe', 'Français'] },
      economy: { mainSectors: ['Tourisme', 'Phosphates', 'Textile', 'Agriculture'], exports: ['Phosphates', 'Huile d\'olive', 'Textiles'] },
      highlights: ['Médina de Tunis (UNESCO)', 'Carthage (UNESCO)', 'El Djem (UNESCO)', 'Sidi Bou Saïd', 'Sahara tunisien'],
      drapeaux: ['assets/images/tunisie1.jpeg']
    },
    'mauritanie': {
      name: 'Mauritanie', capital: 'Nouakchott', population: '4.8M', currency: 'MRU',
      region: 'Afrique du Nord',
      geography: { position: 'Sahel, façade Atlantique', climate: 'Désertique au nord, semi-aride au sud' },
      history: { independence: '1960', colonisateur: 'France' },
      culture: { cuisine: ['Thieboudienne', 'Mafé', 'Couscous de poisson'], languages: ['Arabe hassaniya', 'Pulaar', 'Soninké', 'Wolof'] },
      economy: { mainSectors: ['Mines (fer, or)', 'Pêche', 'Élevage'], exports: ['Minerai de fer', 'Or', 'Poissons'] },
      highlights: ['Villes anciennes de Chinguetti (UNESCO)', 'Parc National du Banc d\'Arguin (UNESCO)', 'Désert de l\'Adrar'],
      drapeaux: ['assets/images/mauritanie1.jpeg']
    },

    // ─── AFRIQUE DE L'OUEST ────────────────────────────────────────────────────
    'benin': {
      name: 'Bénin', capital: 'Porto-Novo', population: '14.5M', currency: 'XOF',
      region: 'Afrique de l\'Ouest',
      geography: { position: 'Golfe de Guinée', climate: 'Tropical humide' },
      history: { independence: '1960', colonisateur: 'France' },
      culture: { cuisine: ['Akassa', 'Gbégiri', 'Amiwo'], languages: ['Français', 'Fon', 'Yoruba'] },
      economy: { mainSectors: ['Agriculture', 'Commerce', 'Port de Cotonou'], exports: ['Coton', 'Noix de cajou'] },
      highlights: ['Palais royaux d\'Abomey (UNESCO)', 'Voodoo Festival de Ouidah', 'Parc national de la Pendjari'],
      drapeaux: ['assets/images/benin.png']
    },
    'burkina': {
      name: 'Burkina Faso', capital: 'Ouagadougou', population: '23.5M', currency: 'XOF',
      region: 'Afrique de l\'Ouest',
      geography: { position: 'Sahel, enclavé', climate: 'Semi-aride, saison sèche longue' },
      history: { independence: '1960', colonisateur: 'France' },
      culture: { cuisine: ['Tô', 'Riz gras', 'Soumbala'], languages: ['Français', 'Mooré', 'Dioula'] },
      economy: { mainSectors: ['Agriculture', 'Or', 'Élevage'], exports: ['Or', 'Coton'] },
      highlights: ['Festival du cinéma FESPACO', 'Ruines de Loropéni (UNESCO)', 'Mare aux Hippopotames'],
      drapeaux: ['assets/images/burkina.png']
    },
    'cap-vert': {
      name: 'Cap-Vert', capital: 'Praia', population: '600k', currency: 'CVE',
      region: 'Afrique de l\'Ouest',
      geography: { position: 'Archipel atlantique', climate: 'Aride à semi-aride, tempéré par l\'océan' },
      history: { independence: '1975', colonisateur: 'Portugal' },
      culture: { cuisine: ['Cachupa', 'Grogue'], languages: ['Portugais', 'Créole capverdien'] },
      economy: { mainSectors: ['Tourisme', 'Pêche', 'Services'], exports: ['Poissons', 'Chaussures'] },
      highlights: ['Île de Santiago', 'Île Fogo (volcan)', 'Plages de Sal et Boa Vista', 'Musique Morna'],
      drapeaux: ['assets/images/Cap-Vert.png']
    },
    'cote-ivoire': {
      name: 'Côte d\'Ivoire', capital: 'Yamoussoukro', population: '32M', currency: 'XOF',
      region: 'Afrique de l\'Ouest',
      geography: { position: 'Golfe de Guinée', climate: 'Tropical, équatorial au sud' },
      history: { independence: '1960', colonisateur: 'France' },
      culture: { cuisine: ['Attiéké', 'Foutou', 'Kedjenou'], languages: ['Français', 'Dioula', 'Baoulé'] },
      economy: { mainSectors: ['Cacao', 'Café', 'Pétrole', 'Industrie'], exports: ['Cacao (1er mondial)', 'Café', 'Caoutchouc'] },
      highlights: ['Basilique de Yamoussoukro', 'Parc national de Taï (UNESCO)', 'Réserve de Banco', 'Mont Nimba'],
      drapeaux: ['assets/images/cote.jpg']
    },
    'gambie': {
      name: 'Gambie', capital: 'Banjul', population: '2.7M', currency: 'GMD',
      region: 'Afrique de l\'Ouest',
      geography: { position: 'Enclave dans le Sénégal, côte atlantique', climate: 'Tropical, sec et humide' },
      history: { independence: '1965', colonisateur: 'Royaume-Uni' },
      culture: { cuisine: ['Benachin', 'Domoda', 'Yassa'], languages: ['Anglais', 'Mandingue', 'Wolof', 'Fula'] },
      economy: { mainSectors: ['Tourisme', 'Agriculture', 'Pêche'], exports: ['Noix de cajou', 'Arachides', 'Poissons'] },
      highlights: ['Île de Kunta Kinteh (UNESCO)', 'Réserve naturelle de Gambie', 'Plages atlantiques'],
      drapeaux: ['assets/images/gambie.png']
    },
    'ghana': {
      name: 'Ghana', capital: 'Accra', population: '34.5M', currency: 'GHS',
      region: 'Afrique de l\'Ouest',
      geography: { position: 'Golfe de Guinée', climate: 'Tropical, plus sec au nord' },
      history: { independence: '1957', colonisateur: 'Royaume-Uni' },
      culture: { cuisine: ['Jollof rice', 'Fufu', 'Waakye', 'Banku'], languages: ['Anglais', 'Twi', 'Ga', 'Ewe'] },
      economy: { mainSectors: ['Or', 'Cacao', 'Pétrole', 'Services'], exports: ['Or', 'Cacao', 'Pétrole', 'Bois'] },
      highlights: ['Forts et châteaux du Ghana (UNESCO)', 'Parc national de Mole', 'Réserve Kakum', 'Lac Volta'],
      drapeaux: ['assets/images/ghana.png']
    },
    'guinee': {
      name: 'Guinée', capital: 'Conakry', population: '14M', currency: 'GNF',
      region: 'Afrique de l\'Ouest',
      geography: { position: 'Côte atlantique, Afrique de l\'Ouest', climate: 'Tropical humide' },
      history: { independence: '1958', colonisateur: 'France' },
      culture: { cuisine: ['Poulet yassa', 'Riz gras', 'Sauce feuille de manioc'], languages: ['Français', 'Pular', 'Mandingue', 'Susu'] },
      economy: { mainSectors: ['Mines (bauxite, or, diamants)', 'Agriculture'], exports: ['Bauxite (2e mondial)', 'Or', 'Diamants'] },
      highlights: ['Chutes de la Soumba', 'Monts Fouta-Djalon', 'Îles de Los'],
      drapeaux: ['assets/images/guine-con.jpg']
    },
    'guinee-bissau': {
      name: 'Guinée-Bissau', capital: 'Bissau', population: '2.1M', currency: 'XOF',
      region: 'Afrique de l\'Ouest',
      geography: { position: 'Côte atlantique, archipel Bijagós', climate: 'Tropical humide' },
      history: { independence: '1974', colonisateur: 'Portugal' },
      culture: { cuisine: ['Jollof rice', 'Cachupa', 'Poisson grillé'], languages: ['Portugais', 'Créole', 'Balanta', 'Fula'] },
      economy: { mainSectors: ['Agriculture', 'Pêche'], exports: ['Noix de cajou (major)', 'Poissons'] },
      highlights: ['Archipel des Bijagós (Réserve UNESCO)', 'Parc national de Cantanhez'],
      drapeaux: ['assets/images/Guinea-Bissau.png']
    },
    'liberia': {
      name: 'Liberia', capital: 'Monrovia', population: '5.4M', currency: 'LRD',
      region: 'Afrique de l\'Ouest',
      geography: { position: 'Côte atlantique', climate: 'Tropical humide' },
      history: { independence: '1847' },
      culture: { cuisine: ['Jollof rice', 'Cassava leaf stew', 'Fufu'], languages: ['Anglais', 'Kpelle', 'Bassa'] },
      economy: { mainSectors: ['Caoutchouc', 'Minerai de fer', 'Bois', 'Pêche'], exports: ['Caoutchouc', 'Minerai de fer', 'Or'] },
      highlights: ['Parc national de Sapo', 'Réserve de chimpanzés de Nimba', 'Côte atlantique'],
      drapeaux: ['assets/images/Liberia.png']
    },
    'mali': {
      name: 'Mali', capital: 'Bamako', population: '23.5M', currency: 'XOF',
      region: 'Afrique de l\'Ouest',
      geography: { position: 'Sahel, enclavé', climate: 'Semi-aride à désertique' },
      history: { independence: '1960', colonisateur: 'France' },
      culture: { cuisine: ['Tiguadèguèna', 'Fô', 'Riz au gras'], languages: ['Français', 'Bambara', 'Peul', 'Dogon'] },
      economy: { mainSectors: ['Or', 'Coton', 'Élevage', 'Agriculture'], exports: ['Or', 'Coton'] },
      highlights: ['Tombouctou (UNESCO)', 'Djenné (UNESCO)', 'Falaise de Bandiagara (UNESCO)', 'Boucle du Baoulé'],
      drapeaux: ['assets/images/mali.png']
    },
    'niger': {
      name: 'Niger', capital: 'Niamey', population: '27M', currency: 'XOF',
      region: 'Afrique de l\'Ouest',
      geography: { position: 'Sahel, enclavé, désert au nord', climate: 'Semi-aride, aride au nord (Sahara)' },
      history: { independence: '1960', colonisateur: 'France' },
      culture: { cuisine: ['Dambou', 'Jollof rice', 'Sauce tomate'], languages: ['Français', 'Haoussa', 'Zarma', 'Tamasheq'] },
      economy: { mainSectors: ['Uranium', 'Or', 'Agriculture', 'Élevage'], exports: ['Uranium', 'Or', 'Bétail'] },
      highlights: ['Réserve naturelle de l\'Aïr et du Ténéré (UNESCO)', 'Plateau de l\'Aïr', 'Giraffe de Kouré'],
      drapeaux: ['assets/images/niger.png']
    },
    'nigeria': {
      name: 'Nigéria', capital: 'Abuja', population: '237M', currency: 'NGN',
      region: 'Afrique de l\'Ouest',
      geography: { position: 'Golfe de Guinée', climate: 'Équatorial au sud, semi-aride au nord' },
      history: { independence: '1960', colonisateur: 'Royaume-Uni' },
      culture: { cuisine: ['Jollof rice', 'Suya', 'Egusi', 'Pounded yam'], languages: ['Anglais', 'Haoussa', 'Yoruba', 'Igbo'] },
      economy: { mainSectors: ['Pétrole', 'Agriculture', 'Télécoms', 'Finance'], exports: ['Pétrole brut', 'Gaz naturel', 'Cacao'] },
      highlights: ['Parc national de Yankari', 'Terrains sacrés d\'Osun-Osogbo (UNESCO)', 'Lagos (ville culturelle)', 'Delta du Niger'],
      drapeaux: ['assets/images/nigeria.jpg']
    },
    'senegal': {
      name: 'Sénégal', capital: 'Dakar', population: '18.5M', currency: 'XOF',
      region: 'Afrique de l\'Ouest',
      geography: { position: 'Côte atlantique, porte de l\'Afrique de l\'Ouest', climate: 'Tropical, sahélien au nord' },
      history: { independence: '1960', colonisateur: 'France' },
      culture: { cuisine: ['Thiéboudienne', 'Yassa', 'Mafé', 'Thiou'], languages: ['Français', 'Wolof', 'Pulaar', 'Sérère'] },
      economy: { mainSectors: ['Pêche', 'Tourisme', 'Phosphates', 'Agriculture', 'Pétrole (en développement)'], exports: ['Poissons', 'Phosphates', 'Arachides'] },
      highlights: ['Île de Gorée (UNESCO)', 'Parc national des oiseaux du Djoudj (UNESCO)', 'Lac Rose', 'Casamance', 'Saint-Louis (UNESCO)'],
      drapeaux: ['assets/images/senegal.jpg']
    },
    'sierra-leone': {
      name: 'Sierra Leone', capital: 'Freetown', population: '8.8M', currency: 'SLL',
      region: 'Afrique de l\'Ouest',
      geography: { position: 'Côte atlantique', climate: 'Tropical humide' },
      history: { independence: '1961', colonisateur: 'Royaume-Uni' },
      culture: { cuisine: ['Jollof rice', 'Cassava leaf stew', 'Groundnut stew'], languages: ['Anglais', 'Krio', 'Mende', 'Temne'] },
      economy: { mainSectors: ['Mines (diamants, rutile, bauxite)', 'Agriculture'], exports: ['Diamants', 'Rutile', 'Cacao'] },
      highlights: ['Plages de Freetown Peninsula', 'Parc national de Outamba-Kilimi', 'Îles Turtle'],
      drapeaux: ['assets/images/sierraleonne.png']
    },
    'togo': {
      name: 'Togo', capital: 'Lomé', population: '9M', currency: 'XOF',
      region: 'Afrique de l\'Ouest',
      geography: { position: 'Golfe de Guinée', climate: 'Tropical humide au sud, semi-aride au nord' },
      history: { independence: '1960', colonisateur: 'France' },
      culture: { cuisine: ['Fufu', 'Akpan', 'Abolo'], languages: ['Français', 'Ewé', 'Kabiyè'] },
      economy: { mainSectors: ['Phosphates', 'Agriculture', 'Commerce', 'Port de Lomé'], exports: ['Phosphates', 'Coton', 'Cacao'] },
      highlights: ['Koutammakou (UNESCO)', 'Parc national de la Kéran', 'Lac Togo', 'Marché des fétiches de Lomé'],
      drapeaux: ['assets/images/togo.jpg']
    },

    // ─── AFRIQUE CENTRALE ──────────────────────────────────────────────────────
    'cameroun': {
      name: 'Cameroun', capital: 'Yaoundé', population: '30M', currency: 'XAF',
      region: 'Afrique Centrale',
      geography: { position: 'Golfe de Guinée, carrefour Afrique centrale-ouest', climate: 'Équatorial au sud, semi-aride au nord' },
      history: { independence: '1960', colonisateur: 'France / Royaume-Uni' },
      culture: { cuisine: ['Ndolé', 'Eru', 'Poulet DG', 'Mbongo'], languages: ['Français', 'Anglais', 'Fulfuldé', 'Ewondo'] },
      economy: { mainSectors: ['Pétrole', 'Agriculture (cacao, café)', 'Bois', 'Aluminium'], exports: ['Pétrole', 'Cacao', 'Café', 'Bois'] },
      highlights: ['Parc national de Waza', 'Mont Cameroun (volcan actif)', 'Réserve de Dja (UNESCO)', 'Chutes de la Lobé'],
      drapeaux: ['assets/images/cameroun.jpg']
    },
    'centrafrique': {
      name: 'République Centrafricaine', capital: 'Bangui', population: '5.5M', currency: 'XAF',
      region: 'Afrique Centrale',
      geography: { position: 'Enclavé, centre de l\'Afrique', climate: 'Tropical humide' },
      history: { independence: '1960', colonisateur: 'France' },
      culture: { cuisine: ['Gozo', 'Sauce gombo', 'Manioc'], languages: ['Français', 'Sango'] },
      economy: { mainSectors: ['Diamants', 'Or', 'Bois', 'Agriculture'], exports: ['Diamants', 'Or', 'Bois', 'Café'] },
      highlights: ['Parc national de Dzanga-Sangha (UNESCO)', 'Forêts tropicales', 'Fleuve Oubangui'],
      drapeaux: ['assets/images/centrafrique.jpg']
    },
    'tchad': {
      name: 'Tchad', capital: 'N\'Djamena', population: '19M', currency: 'XAF',
      region: 'Afrique Centrale',
      geography: { position: 'Sahel, enclavé', climate: 'Désertique au nord, semi-aride au centre, tropical au sud' },
      history: { independence: '1960', colonisateur: 'France' },
      culture: { cuisine: ['Boule', 'Sauce arachide', 'Sauce gombo'], languages: ['Français', 'Arabe tchadien', 'Sara'] },
      economy: { mainSectors: ['Pétrole', 'Élevage', 'Agriculture'], exports: ['Pétrole', 'Coton', 'Bétail'] },
      highlights: ['Massif de l\'Aïr (Ennedi, UNESCO)', 'Lac Tchad (en régression)', 'Zakouma (parc national)'],
      drapeaux: ['assets/images/tchad.jpg']
    },
    'congo-brazzaville': {
      name: 'Congo-Brazzaville', capital: 'Brazzaville', population: '6.5M', currency: 'XAF',
      region: 'Afrique Centrale',
      geography: { position: 'Bassin du Congo, côte atlantique', climate: 'Équatorial humide' },
      history: { independence: '1960', colonisateur: 'France' },
      culture: { cuisine: ['Poulet Moambé', 'Saka saka', 'Liboké'], languages: ['Français', 'Kituba', 'Lingala'] },
      economy: { mainSectors: ['Pétrole', 'Bois', 'Agriculture'], exports: ['Pétrole', 'Bois', 'Cacao'] },
      highlights: ['Parc national d\'Odzala-Kokoua', 'Gorilles des plaines', 'Cataractes du Congo'],
      drapeaux: ['assets/images/cong-brazza.jpg']
    },
    'congo-kinshasa': {
      name: 'RD Congo', capital: 'Kinshasa', population: '110M', currency: 'CDF',
      region: 'Afrique Centrale',
      geography: { position: 'Bassin du Congo, 2e plus grand pays d\'Afrique', climate: 'Équatorial, tropical' },
      history: { independence: '1960', colonisateur: 'Belgique' },
      culture: { cuisine: ['Pondu', 'Liboke', 'Chikwangue'], languages: ['Français', 'Lingala', 'Swahili', 'Tshiluba', 'Kikongo'] },
      economy: { mainSectors: ['Mines (cobalt, coltan, or, diamants)', 'Agriculture', 'Hydroélectricité'], exports: ['Cobalt (1er mondial)', 'Coltan', 'Or', 'Diamants'] },
      highlights: ['Parc national des Virunga (UNESCO)', 'Gorilles de montagne', 'Fleuve Congo', 'Chutes Boyoma'],
      drapeaux: ['assets/images/cong-kins.jpg']
    },
    'guinee-equatoriale': {
      name: 'Guinée Équatoriale', capital: 'Malabo', population: '1.8M', currency: 'XAF',
      region: 'Afrique Centrale',
      geography: { position: 'Golfe de Guinée, île Bioko + continent', climate: 'Équatorial humide' },
      history: { independence: '1968', colonisateur: 'Espagne' },
      culture: { cuisine: ['Poulet Moambé', 'Puchero', 'Poisson grillé'], languages: ['Espagnol', 'Français', 'Portugais', 'Bubi', 'Fang'] },
      economy: { mainSectors: ['Pétrole', 'Gaz naturel', 'Bois'], exports: ['Pétrole', 'Gaz', 'Méthanol'] },
      highlights: ['Île Bioko (faune unique)', 'Forêts tropicales', 'Pic Basilé'],
      drapeaux: ['assets/images/Equatorial_Guinea.png']
    },
    'gabon': {
      name: 'Gabon', capital: 'Libreville', population: '2.5M', currency: 'XAF',
      region: 'Afrique Centrale',
      geography: { position: 'Côte atlantique, équateur', climate: 'Équatorial chaud et humide' },
      history: { independence: '1960', colonisateur: 'France' },
      culture: { cuisine: ['Poulet Nyembwe', 'Poisson fumé', 'Manioc'], languages: ['Français', 'Fang', 'Myene'] },
      economy: { mainSectors: ['Pétrole', 'Manganèse', 'Bois', 'Tourisme'], exports: ['Pétrole', 'Manganèse (2e mondial)', 'Bois'] },
      highlights: ['Parc national de Lopé (UNESCO)', 'Gorilles et éléphants de forêt', 'Réserve de la Lopé'],
      drapeaux: ['assets/images/gabon.jpg']
    },
    'saotome': {
      name: 'Sao Tomé-et-Príncipe', capital: 'São Tomé', population: '240k', currency: 'STN',
      region: 'Afrique Centrale',
      geography: { position: 'Golfe de Guinée, archipel volcanique', climate: 'Équatorial humide' },
      history: { independence: '1975', colonisateur: 'Portugal' },
      culture: { cuisine: ['Calulu', 'Poisson grillé', 'Sauce palmiste'], languages: ['Portugais', 'Forro', 'Angolar'] },
      economy: { mainSectors: ['Cacao', 'Pêche', 'Tourisme'], exports: ['Cacao', 'Poissons', 'Copra'] },
      highlights: ['Forêts tropicales', 'Plages sauvages', 'Oiseaux endémiques', 'Roça coloniales'],
      drapeaux: ['assets/images/saotome.jpg']
    },
    'angola': {
      name: 'Angola', capital: 'Luanda', population: '37M', currency: 'AOA',
      region: 'Afrique Centrale',
      geography: { position: 'Côte atlantique, Afrique australe-centrale', climate: 'Semi-aride au sud, tropical au nord' },
      history: { independence: '1975', colonisateur: 'Portugal' },
      culture: { cuisine: ['Muamba de galinha', 'Calulu', 'Funje'], languages: ['Portugais', 'Umbundu', 'Kimbundu', 'Kikongo'] },
      economy: { mainSectors: ['Pétrole', 'Diamants', 'Agriculture', 'Construction'], exports: ['Pétrole brut (majorité)', 'Diamants', 'Gaz'] },
      highlights: ['Kalandula (chutes d\'eau)', 'Désert du Namib (Tombua)', 'Parc national de Kissama', 'Forêts de Maiombe'],
      drapeaux: ['assets/images/angola.jpg']
    },

    // ─── AFRIQUE DE L'EST ──────────────────────────────────────────────────────
    'burundi': {
      name: 'Burundi', capital: 'Gitega', population: '13.5M', currency: 'BIF',
      region: 'Afrique de l\'Est',
      geography: { position: 'Grands Lacs africains, enclavé', climate: 'Tropical, modéré par l\'altitude' },
      history: { independence: '1962', colonisateur: 'Belgique' },
      culture: { cuisine: ['Ugali', 'Brochettes', 'Haricots'], languages: ['Kirundi', 'Français', 'Swahili'] },
      economy: { mainSectors: ['Agriculture (café, thé)', 'Mines (nickel, or)'], exports: ['Café', 'Thé', 'Or'] },
      highlights: ['Lac Tanganyika', 'Parc national de la Kibira', 'Source du Nil (Kagera)'],
      drapeaux: ['assets/images/burundi.jpg']
    },
    'rwanda': {
      name: 'Rwanda', capital: 'Kigali', population: '14.5M', currency: 'RWF',
      region: 'Afrique de l\'Est',
      geography: { position: 'Grands Lacs, pays des mille collines', climate: 'Tropical modéré (altitude)' },
      history: { independence: '1962', colonisateur: 'Belgique' },
      culture: { cuisine: ['Ugali', 'Brochettes', 'Isombe'], languages: ['Kinyarwanda', 'Français', 'Anglais', 'Swahili'] },
      economy: { mainSectors: ['Tourisme (gorilles)', 'Mines (coltan, cassitérite)', 'Agriculture', 'Services'], exports: ['Coltan', 'Cassitérite', 'Café', 'Thé'] },
      highlights: ['Gorilles de montagne (Parc des Volcans)', 'Lac Kivu', 'Mémorial du génocide de Kigali', 'Parc national de Nyungwe'],
      drapeaux: ['assets/images/rwanda.jpg']
    },
    'djibouti': {
      name: 'Djibouti', capital: 'Djibouti', population: '1.2M', currency: 'DJF',
      region: 'Afrique de l\'Est',
      geography: { position: 'Corne de l\'Afrique, détroit de Bab-el-Mandeb', climate: 'Aride, très chaud' },
      history: { independence: '1977', colonisateur: 'France' },
      culture: { cuisine: ['Skoudehkaris', 'Fah-fah', 'Pain plat'], languages: ['Français', 'Arabe', 'Somali', 'Afar'] },
      economy: { mainSectors: ['Port (transit)', 'Bases militaires étrangères', 'Commerce'], exports: ['Services portuaires', 'Produits re-exportés'] },
      highlights: ['Lac Assal (point le plus bas d\'Afrique)', 'Lac Abbé (cheminées)', 'Forêt du Day', 'Plongée sous-marine'],
      drapeaux: ['assets/images/djibuti.jpg']
    },
    'erythree': {
      name: 'Érythrée', capital: 'Asmara', population: '3.7M', currency: 'ERN',
      region: 'Afrique de l\'Est',
      geography: { position: 'Corne de l\'Afrique, mer Rouge', climate: 'Semi-aride à aride' },
      history: { independence: '1993', colonisateur: 'Italie / Éthiopie' },
      culture: { cuisine: ['Zigni', 'Injera', 'Shiro'], languages: ['Tigrigna', 'Arabe', 'Anglais'] },
      economy: { mainSectors: ['Mines', 'Agriculture', 'Pêche'], exports: ['Or', 'Zinc', 'Poissons'] },
      highlights: ['Asmara (architecture moderniste italienne, UNESCO)', 'Archipel des Dahlak', 'Massif Semien (frontière)'],
      drapeaux: ['assets/images/erytrhe.png']
    },
    'ethiopie': {
      name: 'Éthiopie', capital: 'Addis-Abeba', population: '130M', currency: 'ETB',
      region: 'Afrique de l\'Est',
      geography: { position: 'Corne de l\'Afrique, haut plateau', climate: 'Tropical tempéré en altitude, aride au nord-est' },
      history: { independence: 'Jamais colonisée (exception: occupation italienne 1936-41)' },
      culture: { cuisine: ['Injera', 'Wat', 'Kitfo', 'Tibs'], languages: ['Amharique', 'Oromo', 'Tigrigna', 'Somali'] },
      economy: { mainSectors: ['Agriculture (café, fleurs)', 'Hydroélectricité', 'Industrie', 'Services'], exports: ['Café (berceau du café)', 'Khat', 'Fleurs coupées', 'Sésame'] },
      highlights: ['Lalibela (églises rupestres, UNESCO)', 'Axoum (UNESCO)', 'Gondar (châteaux, UNESCO)', 'Vallée du Rift', 'Parc national du Simien (UNESCO)'],
      drapeaux: ['assets/images/ethopi.jpg']
    },
    'kenya': {
      name: 'Kenya', capital: 'Nairobi', population: '57M', currency: 'KES',
      region: 'Afrique de l\'Est',
      geography: { position: 'Côte de l\'Océan Indien, équateur', climate: 'Tropical humide sur la côte, semi-aride à l\'intérieur' },
      history: { independence: '1963', colonisateur: 'Royaume-Uni' },
      culture: { cuisine: ['Ugali', 'Nyama choma', 'Sukuma wiki', 'Pilau'], languages: ['Swahili', 'Anglais', 'Kikuyu', 'Luo'] },
      economy: { mainSectors: ['Tourisme (safaris)', 'Agriculture (thé, fleurs)', 'Télécoms', 'Services'], exports: ['Thé', 'Café', 'Fleurs coupées', 'Légumes'] },
      highlights: ['Masai Mara (Grande Migration)', 'Mont Kenya (UNESCO)', 'Lac Nakuru (flamants roses)', 'Amboseli (vue Kilimandjaro)', 'Côte de Mombasa'],
      drapeaux: ['assets/images/kenya.jpg']
    },
    'somalie': {
      name: 'Somalie', capital: 'Mogadiscio', population: '18.5M', currency: 'SOS',
      region: 'Afrique de l\'Est',
      geography: { position: 'Corne de l\'Afrique, plus longue côte d\'Afrique', climate: 'Aride à semi-aride' },
      history: { independence: '1960', colonisateur: 'Italie / Royaume-Uni' },
      culture: { cuisine: ['Canjeero', 'Suugo suqaar', 'Sambusa'], languages: ['Somali', 'Arabe'] },
      economy: { mainSectors: ['Élevage', 'Pêche', 'Télécoms', 'Transferts de fonds'], exports: ['Bétail', 'Charbon de bois', 'Bananes'] },
      highlights: ['Côtes de l\'Océan Indien', 'Forêt de Lag Badana', 'Grottes de Las Geel (peintures rupestres)'],
      drapeaux: ['assets/images/somali.png']
    },
    'soudan-du-sud': {
      name: 'Soudan du Sud', capital: 'Djouba', population: '12.5M', currency: 'SSP',
      region: 'Afrique de l\'Est',
      geography: { position: 'Afrique centrale-est, enclavé', climate: 'Tropical humide' },
      history: { independence: '2011', colonisateur: 'Soudan / Royaume-Uni' },
      culture: { cuisine: ['Kisra', 'Moulah', 'Asida'], languages: ['Anglais', 'Arabe', 'Dinka', 'Nuer'] },
      economy: { mainSectors: ['Pétrole', 'Agriculture', 'Élevage'], exports: ['Pétrole brut'] },
      highlights: ['Parc national de Boma', 'Sudd (plus grande zone humide d\'Afrique)', 'Fleuve Nil Blanc'],
      drapeaux: ['assets/images/soud-sud.jpg']
    },
    'tanzanie': {
      name: 'Tanzanie', capital: 'Dodoma', population: '68M', currency: 'TZS',
      region: 'Afrique de l\'Est',
      geography: { position: 'Côte de l\'Océan Indien, Grands Lacs', climate: 'Tropical humide sur la côte, semi-aride à l\'intérieur' },
      history: { independence: '1961', colonisateur: 'Royaume-Uni' },
      culture: { cuisine: ['Ugali', 'Pilau', 'Nyama choma', 'Zanzibar mix'], languages: ['Swahili', 'Anglais'] },
      economy: { mainSectors: ['Tourisme', 'Agriculture (café, thé, clou de girofle)', 'Mines (or, tanzanite)', 'Pêche'], exports: ['Or', 'Café', 'Coton', 'Tanzanite'] },
      highlights: ['Serengeti (UNESCO, Grande Migration)', 'Kilimandjaro (UNESCO)', 'Zanzibar (Stone Town, UNESCO)', 'Ngorongoro (UNESCO)', 'Lacs Malawi et Tanganyika'],
      drapeaux: ['assets/images/tanzanie.png']
    },
    'ouganda': {
      name: 'Ouganda', capital: 'Kampala', population: '50M', currency: 'UGX',
      region: 'Afrique de l\'Est',
      geography: { position: 'Grands Lacs, enclavé, équateur', climate: 'Tropical humide, modéré par l\'altitude' },
      history: { independence: '1962', colonisateur: 'Royaume-Uni' },
      culture: { cuisine: ['Matoke', 'Rolex (chapati-eggs)', 'Groundnut stew'], languages: ['Anglais', 'Swahili', 'Luganda'] },
      economy: { mainSectors: ['Agriculture (café, thé)', 'Pétrole (en développement)', 'Tourisme'], exports: ['Café', 'Poissons', 'Thé', 'Or'] },
      highlights: ['Gorilles de montagne (Bwindi, UNESCO)', 'Chutes Murchison', 'Lac Victoria (source du Nil)', 'Parc national du Ruwenzori (UNESCO)'],
      drapeaux: ['assets/images/ouganda.jpg']
    },
    'comores': {
      name: 'Comores', capital: 'Moroni', population: '900k', currency: 'KMF',
      region: 'Afrique de l\'Est',
      geography: { position: 'Océan Indien, archipel volcanique', climate: 'Tropical humide' },
      history: { independence: '1975', colonisateur: 'France' },
      culture: { cuisine: ['Langouste', 'Poisson au lait de coco', 'Mkatra'], languages: ['Shikomori', 'Arabe', 'Français'] },
      economy: { mainSectors: ['Ylang-ylang', 'Vanille', 'Pêche', 'Transferts de fonds'], exports: ['Ylang-ylang (parfumerie)', 'Vanille', 'Clou de girofle'] },
      highlights: ['Volcan Karthala (actif)', 'Plages tropicales', 'Forêts de Mohéli'],
      drapeaux: ['assets/images/comores.jpg']
    },
    'madagascar': {
      name: 'Madagascar', capital: 'Antananarivo', population: '31M', currency: 'MGA',
      region: 'Afrique de l\'Est',
      geography: { position: 'Île de l\'Océan Indien, 4e plus grande île mondiale', climate: 'Tropical humide à l\'est, semi-aride à l\'ouest' },
      history: { independence: '1960', colonisateur: 'France' },
      culture: { cuisine: ['Romazava', 'Ravitoto', 'Vary amin\'anana'], languages: ['Malgache', 'Français'] },
      economy: { mainSectors: ['Agriculture (vanille, clous de girofle)', 'Mines', 'Tourisme', 'Textile'], exports: ['Vanille (1er mondial)', 'Graphite', 'Chromite', 'Crevettes'] },
      highlights: ['Avenue des Baobabs', 'Allée des Baobabs (UNESCO candidat)', 'Parc national de Ranomafana', 'Tsingy de Bemaraha (UNESCO)', 'Lémuriens endémiques'],
      drapeaux: ['assets/images/madagascar.jpg']
    },
    'maurice': {
      name: 'Maurice', capital: 'Port-Louis', population: '1.3M', currency: 'MUR',
      region: 'Afrique de l\'Est',
      geography: { position: 'Île de l\'Océan Indien', climate: 'Tropical maritime' },
      history: { independence: '1968', colonisateur: 'Royaume-Uni' },
      culture: { cuisine: ['Dholl puri', 'Rougaille', 'Gâteau piment', 'Biryani'], languages: ['Anglais', 'Créole mauricien', 'Français', 'Bhojpuri'] },
      economy: { mainSectors: ['Tourisme', 'Finance offshore', 'Textile', 'Sucre'], exports: ['Sucre', 'Textile', 'Services financiers'] },
      highlights: ['Plages de lagon turquoise', 'Vallée des Couleurs', 'Jardin de Pamplemousses', 'Île Rodrigues'],
      drapeaux: ['assets/images/maurice.jpg']
    },
    'seychelles': {
      name: 'Seychelles', capital: 'Victoria', population: '110k', currency: 'SCR',
      region: 'Afrique de l\'Est',
      geography: { position: 'Archipel de l\'Océan Indien', climate: 'Tropical chaud et humide' },
      history: { independence: '1976', colonisateur: 'Royaume-Uni' },
      culture: { cuisine: ['Poisson grillé', 'Chatini', 'Ladob'], languages: ['Créole seychellois', 'Anglais', 'Français'] },
      economy: { mainSectors: ['Tourisme', 'Pêche (thon)', 'Finance offshore'], exports: ['Thon en conserve', 'Poissons', 'Copra'] },
      highlights: ['Vallée de Mai (UNESCO, coco-de-mer)', 'Plages de Beau Vallon et Anse Source d\'Argent', 'Île Aldabra (UNESCO)', 'Tortues géantes'],
      drapeaux: ['assets/images/seychelles.jpg']  // corrigé (était 'aeychelles.jpg')
    },

    // ─── AFRIQUE AUSTRALE ──────────────────────────────────────────────────────
    'botswana': {
      name: 'Botswana', capital: 'Gaborone', population: '2.7M', currency: 'BWP',
      region: 'Afrique Australe',
      geography: { position: 'Enclavé, désert du Kalahari', climate: 'Semi-aride, subtropical' },
      history: { independence: '1966', colonisateur: 'Royaume-Uni' },
      culture: { cuisine: ['Seswaa', 'Pap', 'Morogo'], languages: ['Tswana', 'Anglais'] },
      economy: { mainSectors: ['Diamants', 'Tourisme (safaris)', 'Bœuf', 'Finance'], exports: ['Diamants (majeur)', 'Bœuf', 'Nickel'] },
      highlights: ['Delta de l\'Okavango (UNESCO)', 'Makgadikgadi (plaines de sel)', 'Parc national de Chobe', 'Désert du Kalahari'],
      drapeaux: ['assets/images/botswana.png']
    },
    'eswatini': {
      name: 'Eswatini', capital: 'Mbabane', population: '1.2M', currency: 'SZL',
      region: 'Afrique Australe',
      geography: { position: 'Enclavé entre Afrique du Sud et Mozambique', climate: 'Subtropical, tempéré en altitude' },
      history: { independence: '1968', colonisateur: 'Royaume-Uni' },
      culture: { cuisine: ['Sishwala', 'Emasi', 'Sidvudvu'], languages: ['Swati', 'Anglais'] },
      economy: { mainSectors: ['Sucre', 'Textile', 'Bois', 'Mines'], exports: ['Sucre', 'Textile', 'Bois'] },
      highlights: ['Parc national de Hlane', 'Festival Incwala', 'Festival Umhlanga', 'Réserve de Mlilwane'],
      drapeaux: ['assets/images/Flag_of_Eswatini.svg.png']
    },
    'lesotho': {
      name: 'Lesotho', capital: 'Maseru', population: '2.3M', currency: 'LSL',
      region: 'Afrique Australe',
      geography: { position: 'Enclave dans l\'Afrique du Sud, haut plateau', climate: 'Semi-aride, froid en hiver (neige en altitude)' },
      history: { independence: '1966', colonisateur: 'Royaume-Uni' },
      culture: { cuisine: ['Papa', 'Mokoenya', 'Likhopo'], languages: ['Sesotho', 'Anglais'] },
      economy: { mainSectors: ['Textile', 'Diamants', 'Eau (exportation hydro)', 'Élevage'], exports: ['Textile', 'Diamants', 'Eau'] },
      highlights: ['Montagnes du Drakensberg', 'Maléa-léa (randonnée)', 'Peintures rupestres San', 'Parc national Sehlabathebe (UNESCO)'],
      drapeaux: ['assets/images/leshotoc.png']
    },
    'malawi': {
      name: 'Malawi', capital: 'Lilongwe', population: '22M', currency: 'MWK',
      region: 'Afrique Australe',
      geography: { position: 'Grands Lacs, enclavé, Rift Valley', climate: 'Tropical humide' },
      history: { independence: '1964', colonisateur: 'Royaume-Uni' },
      culture: { cuisine: ['Nsima', 'Chambo', 'Mkaka'], languages: ['Chichewa', 'Anglais'] },
      economy: { mainSectors: ['Agriculture (tabac, thé, sucre)', 'Tourisme', 'Pêche'], exports: ['Tabac', 'Sucre', 'Thé', 'Coton'] },
      highlights: ['Lac Malawi (UNESCO)', 'Parc national de Liwonde', 'Plateau de Nyika', 'Parc national de Majete'],
      drapeaux: ['assets/images/malawi.jpg']
    },
    'mozambique': {
      name: 'Mozambique', capital: 'Maputo', population: '35M', currency: 'MZN',
      region: 'Afrique Australe',
      geography: { position: 'Côte de l\'Océan Indien, Afrique australe', climate: 'Tropical humide, cyclones au nord' },
      history: { independence: '1975', colonisateur: 'Portugal' },
      culture: { cuisine: ['Matapa', 'Caril de caranguejo', 'Prego'], languages: ['Portugais', 'Makhuwa', 'Tsonga'] },
      economy: { mainSectors: ['Gaz naturel (offshore)', 'Agriculture', 'Aluminium', 'Tourisme'], exports: ['Gaz naturel', 'Aluminium', 'Tabac', 'Noix de cajou'] },
      highlights: ['Île de Mozambique (UNESCO)', 'Archipel de Bazaruto', 'Parc national de Gorongosa', 'Plages de Tofo'],
      drapeaux: ['assets/images/mozambique.jpg']
    },
    'namibie': {
      name: 'Namibie', capital: 'Windhoek', population: '3.1M', currency: 'NAD',
      region: 'Afrique Australe',
      geography: { position: 'Côte atlantique, désert du Namib', climate: 'Aride à semi-aride' },
      history: { independence: '1990', colonisateur: 'Afrique du Sud / Allemagne' },
      culture: { cuisine: ['Biltong', 'Kapana', 'Potjiekos'], languages: ['Anglais', 'Afrikaans', 'Oshiwambo', 'Otjiherero', 'Allemand'] },
      economy: { mainSectors: ['Mines (diamants, uranium, or)', 'Agriculture', 'Tourisme', 'Pêche'], exports: ['Diamants', 'Uranium', 'Or', 'Poissons'] },
      highlights: ['Désert du Namib (Sossusvlei, dunes rouges)', 'Parc Etosha (lions, éléphants)', 'Fish River Canyon', 'Côte des Squelettes', 'Pétroglyphes de Twyfelfontein (UNESCO)'],
      drapeaux: ['assets/images/namibi.jpg']
    },
    'afrique-sud': {
      name: 'Afrique du Sud', capital: 'Pretoria', population: '63M', currency: 'ZAR',
      region: 'Afrique Australe',
      geography: { position: 'Pointe méridionale de l\'Afrique, façades Atlantique et Indien', climate: 'Méditerranéen au SO, subtropical à l\'est, semi-aride à l\'intérieur' },
      history: { independence: '1910 (Union), 1994 (fin apartheid)' },
      culture: { cuisine: ['Braai (barbecue)', 'Bobotie', 'Biltong', 'Bunny chow'], languages: ['11 langues officielles (Zoulou, Xhosa, Afrikaans, Anglais, Sotho...)'] },
      economy: { mainSectors: ['Mines (or, platine, charbon, diamants)', 'Finance', 'Industrie', 'Agriculture'], exports: ['Or', 'Platine', 'Charbon', 'Diamants', 'Vins'] },
      highlights: ['Parc Kruger (Big Five)', 'Cap de Bonne-Espérance', 'Grottes de Sterkfontein (UNESCO)', 'Route des Jardins', 'Johannesburg (Soweto)', 'Le Cap (Table Mountain)'],
      drapeaux: ['assets/images/afr-du-sud.jpg']
    },
    'zambie': {
      name: 'Zambie', capital: 'Lusaka', population: '21.5M', currency: 'ZMW',
      region: 'Afrique Australe',
      geography: { position: 'Enclavé, Afrique australe-centrale', climate: 'Tropical humide' },
      history: { independence: '1964', colonisateur: 'Royaume-Uni' },
      culture: { cuisine: ['Nsima', 'Kapenta', 'Mpunga'], languages: ['Anglais', 'Bemba', 'Nyanja', 'Tonga'] },
      economy: { mainSectors: ['Cuivre', 'Cobalt', 'Agriculture', 'Tourisme'], exports: ['Cuivre (majeur)', 'Cobalt', 'Tabac', 'Coton'] },
      highlights: ['Chutes Victoria (UNESCO)', 'Parc national du Bas-Zambèze', 'Parc national de South Luangwa', 'Lac Bangweulu'],
      drapeaux: ['assets/images/zambie.jpg']
    },
    'zimbabwe': {
      name: 'Zimbabwe', capital: 'Harare', population: '17M', currency: 'ZWG',
      region: 'Afrique Australe',
      geography: { position: 'Enclavé, plateau central', climate: 'Subtropical, modéré par l\'altitude' },
      history: { independence: '1980', colonisateur: 'Royaume-Uni (Rhodésie)' },
      culture: { cuisine: ['Sadza', 'Nyama', 'Muriwo'], languages: ['Shona', 'Ndebele', 'Anglais'] },
      economy: { mainSectors: ['Agriculture (tabac)', 'Mines (platine, or, diamants)', 'Tourisme'], exports: ['Or', 'Platine', 'Tabac', 'Diamants'] },
      highlights: ['Chutes Victoria (UNESCO)', 'Ruines du Grand Zimbabwe (UNESCO)', 'Parc national de Hwange', 'Matobo Hills (UNESCO)'],
      drapeaux: ['assets/images/zimbabwe.jpg']
    },
    'angola_australe': {
      name: 'Angola', capital: 'Luanda', population: '37M', currency: 'AOA',
      region: 'Afrique Australe',
      geography: { position: 'Côte atlantique, Afrique australe', climate: 'Semi-aride au sud, tropical au nord' },
      history: { independence: '1975', colonisateur: 'Portugal' },
      culture: { cuisine: ['Muamba de galinha', 'Calulu', 'Funje'], languages: ['Portugais', 'Umbundu', 'Kimbundu'] },
      economy: { mainSectors: ['Pétrole', 'Diamants', 'Agriculture'], exports: ['Pétrole brut', 'Diamants', 'Gaz'] },
      highlights: ['Chutes de Kalandula', 'Désert du Namib (Tombua)', 'Parc national de Kissama'],
      drapeaux: ['assets/images/angola.jpg']
    }
  };

  activeSegment: string = 'general';

  constructor(private route: ActivatedRoute) { }
  ngOnInit() { this.paysId = this.route.snapshot.paramMap.get('id')!; this.chargerInfosPays(); }
  defilerVersSection(s: string) { const e = document.getElementById(s); if (e) e.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  getImagePrincipale() { return this.pays?.drapeaux?.[0] || 'assets/default-pays.jpg'; }
  formaterLangues() { if (!this.pays?.culture?.languages) return 'Non spécifié'; return Array.isArray(this.pays.culture.languages) ? this.pays.culture.languages.join(', ') : this.pays.culture.languages; }
  chargerInfosPays() { this.chargement = true; setTimeout(() => { this.pays = this.infosPays[this.paysId]; this.chargement = false; }, 1000); }
  async partager() {
    if (!this.pays) return;
    const h = Array.isArray(this.pays.highlights) ? this.pays.highlights.slice(0, 3).map((x: any) => `• ${x}`).join('\n') : '';
    const m = `🌍 Découvrez ${this.pays.name} !\n\n📌 Capitale : ${this.pays.capital}\n👥 Population : ${this.pays.population}\n📍 Région : ${this.pays.region}`;
    try { await Share.share({ title: `${this.pays.name} - Infos`, text: m }); } catch (e) { navigator.clipboard.writeText(m); }
  }
  ajouterFavoris() {
    if (!this.pays || !this.paysId) return;
    let f = JSON.parse(localStorage.getItem('favoris') || '[]');
    const i = f.findIndex((x: any) => x.id === this.paysId);
    if (i > -1) { f.splice(i, 1); this.isFavoris = false; } else { f.push({ id: this.paysId, name: this.pays.name, image: this.getImagePrincipale() }); this.isFavoris = true; }
    localStorage.setItem('favoris', JSON.stringify(f));
  }
  getTitreSite(s: string) { return s.split(' - ')[0]; }
  getDescriptionSite(s: string) { const p = s.split(' - '); return p.length > 1 ? p[1] : ''; }
  getImageSite(i: number) { return this.pays?.images?.[i] || 'assets/default-image.jpg'; }
  onSegmentChange(e: any) { this.activeSegment = e.detail.value; }
  openImage(url: string) { this.selectedImage = url; this.isImageModalOpen = true; }
  closeImage() { this.isImageModalOpen = false; setTimeout(() => this.selectedImage = null, 300); }
  ouvrirModalImage(i: number) { const url = this.getImageSite(i); this.openImage(url); }
}

