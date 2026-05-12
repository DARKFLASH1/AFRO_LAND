// ─── AFRO_LAND — CartePage ────────────────────────────────────────────────────
// Partie 4 : Carte interactive améliorée
//   ✅ Popup d'aperçu avec drapeau, capitale, région avant navigation
//   ✅ Bouton de géolocalisation (déjà présent, amélioré)
//   ✅ Légende des couleurs par région (déjà présente, améliorée)
//   ✅ Recherche sur la carte : zoom automatique sur le pays saisi
// ─────────────────────────────────────────────────────────────────────────────
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import * as L from 'leaflet';
import { LocationService } from '../services/location.service';
import { HttpClient } from '@angular/common/http';
import { PaysService } from '../services/pays.service';

@Component({
  selector: 'app-carte',
  templateUrl: './carte.page.html',
  styleUrls: ['./carte.page.scss'],
  standalone: false
})
export class CartePage implements OnInit, OnDestroy {

  map!: L.Map;
  userMarker?: L.Marker;
  geojsonLayer?: L.GeoJSON;

  // ── Recherche sur carte ────────────────────────────────────────────────────
  afficherRechercheCartes  = false;
  termeRechercheCartes     = '';
  suggestionsCartes: { id: string; name: string; flag: string; latlng?: L.LatLng }[] = [];
  rechercheCartesEnCours   = false;

  // ── Couleurs par région ────────────────────────────────────────────────────
  private readonly regionColors: { [key: string]: string } = {
    'Nord'    : '#ff5252',
    'Ouest'   : '#4caf50',
    'Centre'  : '#ffeb3b',
    'Est'     : '#2196f3',
    'Sud'     : '#9c27b0',
    'Inconnu' : '#9e9e9e'
  };

  // ── Mapping nom anglais → région ──────────────────────────────────────────
  private readonly countryToRegion: { [key: string]: string } = {
    'Algeria': 'Nord', 'Egypt': 'Nord', 'Libya': 'Nord', 'Morocco': 'Nord',
    'Tunisia': 'Nord', 'Western Sahara': 'Nord', 'Sudan': 'Nord', 'Mauritania': 'Nord',
    'Benin': 'Ouest', 'Burkina Faso': 'Ouest', 'Cape Verde': 'Ouest',
    'Ivory Coast': 'Ouest', 'Gambia': 'Ouest', 'Ghana': 'Ouest', 'Guinea': 'Ouest',
    'Guinea-Bissau': 'Ouest', 'Liberia': 'Ouest', 'Mali': 'Ouest', 'Niger': 'Ouest',
    'Nigeria': 'Ouest', 'Senegal': 'Ouest', 'Sierra Leone': 'Ouest', 'Togo': 'Ouest',
    'Cameroon': 'Centre', 'Central African Republic': 'Centre', 'Chad': 'Centre',
    'Congo': 'Centre', 'DR Congo': 'Centre', 'Equatorial Guinea': 'Centre',
    'Gabon': 'Centre', 'Sao Tome and Principe': 'Centre', 'Angola': 'Centre',
    'Burundi': 'Est', 'Comoros': 'Est', 'Djibouti': 'Est', 'Eritrea': 'Est',
    'Ethiopia': 'Est', 'Kenya': 'Est', 'Madagascar': 'Est', 'Malawi': 'Est',
    'Mauritius': 'Est', 'Mozambique': 'Est', 'Rwanda': 'Est', 'Seychelles': 'Est',
    'Somalia': 'Est', 'South Sudan': 'Est', 'Tanzania': 'Est', 'Uganda': 'Est',
    'Botswana': 'Sud', 'Eswatini': 'Sud', 'Swaziland': 'Sud', 'Lesotho': 'Sud',
    'Namibia': 'Sud', 'South Africa': 'Sud', 'Zambia': 'Sud', 'Zimbabwe': 'Sud'
  };

  // ── Mapping nom anglais → id interne ──────────────────────────────────────
  private readonly nameToId: { [key: string]: string } = {
    'Algeria': 'algerie', 'Angola': 'angola', 'Benin': 'benin',
    'Botswana': 'botswana', 'Burkina Faso': 'burkina', 'Burundi': 'burundi',
    'Cameroon': 'cameroun', 'Cape Verde': 'cap-vert',
    'Central African Republic': 'centrafrique', 'Chad': 'tchad',
    'Comoros': 'comores', 'Congo': 'congo-brazzaville', 'DR Congo': 'congo-kinshasa',
    'Djibouti': 'djibouti', 'Egypt': 'egypte',
    'Equatorial Guinea': 'guinee-equatoriale', 'Eritrea': 'erythree',
    'Ethiopia': 'ethiopie', 'Gabon': 'gabon', 'Gambia': 'gambie', 'Ghana': 'ghana',
    'Guinea': 'guinee', 'Guinea-Bissau': 'guinee-bissau',
    'Ivory Coast': 'cote-ivoire', 'Kenya': 'kenya', 'Lesotho': 'lesotho',
    'Liberia': 'liberia', 'Libya': 'libye', 'Madagascar': 'madagascar',
    'Malawi': 'malawi', 'Mali': 'mali', 'Mauritania': 'mauritanie',
    'Mauritius': 'maurice', 'Morocco': 'maroc', 'Mozambique': 'mozambique',
    'Namibia': 'namibie', 'Niger': 'niger', 'Nigeria': 'nigeria', 'Rwanda': 'rwanda',
    'Sao Tome and Principe': 'saotome', 'Senegal': 'senegal',
    'Seychelles': 'seychelles', 'Sierra Leone': 'sierra-leone',
    'Somalia': 'somalie', 'South Africa': 'afrique-sud',
    'South Sudan': 'soudan-du-sud', 'Sudan': 'soudan', 'Swaziland': 'eswatini',
    'Tanzania': 'tanzanie', 'Togo': 'togo', 'Tunisia': 'tunisie',
    'Uganda': 'ouganda', 'Zambia': 'zambie', 'Zimbabwe': 'zimbabwe',
    'Western Sahara': 'maroc'
  };

  // Iso2 code par nom anglais (pour les drapeaux dans la popup)
  private readonly nameToIso2: { [key: string]: string } = {
    'Algeria': 'dz', 'Angola': 'ao', 'Benin': 'bj', 'Botswana': 'bw',
    'Burkina Faso': 'bf', 'Burundi': 'bi', 'Cameroon': 'cm', 'Cape Verde': 'cv',
    'Central African Republic': 'cf', 'Chad': 'td', 'Comoros': 'km',
    'Congo': 'cg', 'DR Congo': 'cd', 'Djibouti': 'dj', 'Egypt': 'eg',
    'Equatorial Guinea': 'gq', 'Eritrea': 'er', 'Ethiopia': 'et', 'Gabon': 'ga',
    'Gambia': 'gm', 'Ghana': 'gh', 'Guinea': 'gn', 'Guinea-Bissau': 'gw',
    'Ivory Coast': 'ci', 'Kenya': 'ke', 'Lesotho': 'ls', 'Liberia': 'lr',
    'Libya': 'ly', 'Madagascar': 'mg', 'Malawi': 'mw', 'Mali': 'ml',
    'Mauritania': 'mr', 'Mauritius': 'mu', 'Morocco': 'ma', 'Mozambique': 'mz',
    'Namibia': 'na', 'Niger': 'ne', 'Nigeria': 'ng', 'Rwanda': 'rw',
    'Sao Tome and Principe': 'st', 'Senegal': 'sn', 'Seychelles': 'sc',
    'Sierra Leone': 'sl', 'Somalia': 'so', 'South Africa': 'za',
    'South Sudan': 'ss', 'Sudan': 'sd', 'Swaziland': 'sz', 'Tanzania': 'tz',
    'Togo': 'tg', 'Tunisia': 'tn', 'Uganda': 'ug', 'Zambia': 'zm',
    'Zimbabwe': 'zw', 'Western Sahara': 'eh'
  };

  // Centroïdes approximatifs pour le zoom à la recherche
  private readonly nameToCentroid: { [key: string]: [number, number] } = {
    'Algeria': [28.0, 3.0], 'Angola': [-11.2, 17.9], 'Benin': [9.3, 2.3],
    'Botswana': [-22.3, 24.7], 'Burkina Faso': [12.4, -1.6], 'Burundi': [-3.4, 29.9],
    'Cameroon': [3.8, 11.5], 'Cape Verde': [16.0, -24.0],
    'Central African Republic': [6.6, 20.9], 'Chad': [15.5, 18.7],
    'Comoros': [-11.6, 43.3], 'Congo': [-0.2, 15.8], 'DR Congo': [-2.9, 23.7],
    'Djibouti': [11.8, 42.6], 'Egypt': [26.8, 30.8],
    'Equatorial Guinea': [1.65, 10.3], 'Eritrea': [15.2, 39.8],
    'Ethiopia': [9.1, 40.5], 'Gabon': [-0.8, 11.6], 'Gambia': [13.4, -15.3],
    'Ghana': [7.9, -1.0], 'Guinea': [11.0, -10.9], 'Guinea-Bissau': [11.8, -15.2],
    'Ivory Coast': [7.5, -5.6], 'Kenya': [0.0, 37.9], 'Lesotho': [-29.6, 28.2],
    'Liberia': [6.4, -9.4], 'Libya': [26.3, 17.2], 'Madagascar': [-20.0, 47.0],
    'Malawi': [-13.3, 34.3], 'Mali': [17.6, -3.9], 'Mauritania': [21.0, -10.9],
    'Mauritius': [-20.3, 57.5], 'Morocco': [31.8, -7.1], 'Mozambique': [-18.7, 35.5],
    'Namibia': [-22.0, 17.1], 'Niger': [17.6, 8.1], 'Nigeria': [9.1, 8.7],
    'Rwanda': [-1.9, 29.9], 'Sao Tome and Principe': [0.2, 6.6],
    'Senegal': [14.5, -14.5], 'Seychelles': [-4.7, 55.5], 'Sierra Leone': [8.5, -11.8],
    'Somalia': [5.2, 46.2], 'South Africa': [-28.5, 24.7], 'South Sudan': [7.9, 29.7],
    'Sudan': [15.6, 32.5], 'Swaziland': [-26.5, 31.5], 'Tanzania': [-6.4, 34.9],
    'Togo': [8.6, 0.8], 'Tunisia': [33.8, 9.6], 'Uganda': [1.4, 32.3],
    'Western Sahara': [24.2, -12.9], 'Zambia': [-13.1, 27.8], 'Zimbabwe': [-19.0, 29.2]
  };

  // Variable pour référencer la popup active
  private activePopup?: L.Popup;

  constructor(
    private locationService: LocationService,
    private router: Router,
    private http: HttpClient,
    private paysService: PaysService
  ) {}

  ngOnInit() {}

  ionViewDidEnter() {
    this.initMap();
  }

  // ── Initialisation Leaflet ─────────────────────────────────────────────────

  initMap() {
    if (this.map) { this.map.remove(); }

    const southWest = L.latLng(-45, -30);
    const northEast = L.latLng(45, 60);
    const bounds    = L.latLngBounds(southWest, northEast);

    this.map = L.map('mapId', {
      maxBounds          : bounds,
      maxBoundsViscosity : 1.0,
      minZoom            : 3,
      maxZoom            : 7
    }).setView([2.0, 16.0], 3);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OpenStreetMap &copy; CartoDB'
    }).addTo(this.map);

    // Fermer la popup en cliquant sur la carte (hors d'un pays)
    this.map.on('click', () => { this.fermerPopup(); });

    this.loadGeoJSON();
    this.addLegend();

    // Exposer la méthode de navigation pour les boutons dans le HTML de la popup
    (window as any)['naviguerVersPays'] = (id: string) => this.naviguerVersPays(id);

    setTimeout(() => { this.map.invalidateSize(); }, 400);
  }

  // ── GeoJSON + événements ──────────────────────────────────────────────────

  loadGeoJSON() {
    this.http.get('assets/africa.geojson').subscribe((data: any) => {
      this.geojsonLayer = L.geoJSON(data, {
        style: (feature: any) => {
          const region = this.countryToRegion[feature.properties.name] || 'Inconnu';
          return {
            color       : '#ffffff',
            weight      : 1,
            opacity     : 1,
            fillOpacity : 0.6,
            fillColor   : this.regionColors[region]
          };
        },
        onEachFeature: (feature, layer) => {
          layer.on({
            mouseover: (e) => {
              const l = e.target;
              l.setStyle({ fillOpacity: 0.9, weight: 2, color: '#333' });
              l.bringToFront();
            },
            mouseout: (e) => {
              this.geojsonLayer?.resetStyle(e.target);
            },
            click: (e) => {
              L.DomEvent.stopPropagation(e);
              this.afficherPopupApercu(feature.properties.name, e.latlng);
            }
          });
          // Tooltip au survol (nom du pays)
          layer.bindTooltip(feature.properties.name, { sticky: true, className: 'leaflet-tooltip-afro' });
        }
      }).addTo(this.map);
    });
  }

  // ── Popup d'aperçu ─────────────────────────────────────────────────────────

  /**
   * Affiche une popup légère avec drapeau, nom, capitale, région.
   * Un bouton "Voir la fiche" déclenche la navigation.
   */
  afficherPopupApercu(nomAnglais: string, latlng: L.LatLng) {
    // Fermer l'éventuelle popup précédente
    this.fermerPopup();

    const id      = this.nameToId[nomAnglais] || nomAnglais.toLowerCase().replace(/ /g, '-');
    const iso2    = this.nameToIso2[nomAnglais];
    const flagUrl = iso2 ? `https://flagcdn.com/w80/${iso2}.png` : '';
    const region  = this.countryToRegion[nomAnglais] || 'Afrique';

    // On charge les infos supplémentaires (capitale) depuis PaysService si disponible
    this.paysService.getPaysById(id).subscribe(pays => {
      const capitale = pays?.capital ?? '';

      const popupHtml = `
        <div class="afro-popup">
          ${flagUrl ? `<img class="afro-popup-flag" src="${flagUrl}" alt="${nomAnglais}" />` : ''}
          <div class="afro-popup-body">
            <h3 class="afro-popup-name">${pays?.name ?? nomAnglais}</h3>
            ${capitale ? `<p class="afro-popup-sub">🏛 ${capitale}</p>` : ''}
            <p class="afro-popup-sub">🌍 ${region}</p>
            ${pays?.population ? `<p class="afro-popup-sub">👥 ${pays.population}</p>` : ''}
          </div>
          <button
            class="afro-popup-btn"
            onclick="window.naviguerVersPays('${id}')">
            Voir la fiche →
          </button>
        </div>
      `;

      this.activePopup = L.popup({
        closeButton    : true,
        className      : 'afro-custom-popup',
        maxWidth       : 240,
        offset         : [0, -4]
      })
        .setLatLng(latlng)
        .setContent(popupHtml)
        .openOn(this.map);
    });
  }

  fermerPopup() {
    if (this.activePopup) {
      this.map.closePopup(this.activePopup);
      this.activePopup = undefined;
    }
  }

  // ── Navigation ─────────────────────────────────────────────────────────────

  naviguerVersPays(id: string) {
    this.router.navigate(['/pays', id]);
  }

  // ── Légende ────────────────────────────────────────────────────────────────

  addLegend() {
    const legend = new L.Control({ position: 'bottomright' });
    legend.onAdd = () => {
      const div = L.DomUtil.create('div', 'info legend afro-legend');
      const labels = ['<strong>Régions</strong>'];
      for (const region of ['Nord', 'Ouest', 'Centre', 'Est', 'Sud']) {
        labels.push(
          `<span class="legend-item">
            <i style="background:${this.regionColors[region]}"></i> ${region}
           </span>`
        );
      }
      div.innerHTML = labels.join('');
      return div;
    };
    legend.addTo(this.map);
  }

  // ── Géolocalisation ────────────────────────────────────────────────────────

  async locateMe() {
    try {
      const position           = await this.locationService.getCurrentPosition();
      const { latitude, longitude } = position.coords;

      if (this.userMarker) {
        this.userMarker.setLatLng([latitude, longitude]);
      } else {
        const icon = L.divIcon({
          html      : `<div class="user-location-dot"></div>`,
          className : '',
          iconSize  : [20, 20],
          iconAnchor: [10, 10]
        });
        this.userMarker = L.marker([latitude, longitude], { icon })
          .addTo(this.map)
          .bindPopup('📍 Vous êtes ici !')
          .openPopup();
      }
      this.map.setView([latitude, longitude], 5);
    } catch (error) {
      console.error('[CartePage] Géolocalisation impossible :', error);
    }
  }

  // ── Recherche sur carte ────────────────────────────────────────────────────

  toggleRechercheCartes() {
    this.afficherRechercheCartes = !this.afficherRechercheCartes;
    if (!this.afficherRechercheCartes) {
      this.termeRechercheCartes = '';
      this.suggestionsCartes    = [];
    }
  }

  onRechercheCartes(event: any) {
    const terme = (event?.detail?.value ?? '').trim();
    this.termeRechercheCartes = terme;

    if (terme.length < 2) {
      this.suggestionsCartes = [];
      return;
    }

    this.rechercheCartesEnCours = true;
    this.paysService.rechercherPays(terme).subscribe({
      next: resultats => {
        this.suggestionsCartes = resultats.slice(0, 6).map(r => ({
          id   : r.id,
          name : r.pays.name,
          flag : r.pays.flag
        }));
        this.rechercheCartesEnCours = false;
      },
      error: () => { this.rechercheCartesEnCours = false; }
    });
  }

  /**
   * Zoom sur un pays à partir des suggestions de recherche.
   * Utilise le centroïde pré-défini (nameToId inversé) ou le centroïde GeoJSON.
   */
  zoomVersPays(paysId: string, paysName: string) {
    this.suggestionsCartes    = [];
    this.afficherRechercheCartes = false;
    this.termeRechercheCartes = '';

    // Chercher le nom anglais (clé) correspondant à l'id
    const nomAnglais = Object.keys(this.nameToId).find(k => this.nameToId[k] === paysId);
    if (nomAnglais && this.nameToCentroid[nomAnglais]) {
      const [lat, lng] = this.nameToCentroid[nomAnglais];
      this.map.flyTo([lat, lng], 5, { animate: true, duration: 1.0 });
      // Afficher la popup après l'animation
      setTimeout(() => {
        this.afficherPopupApercu(nomAnglais, L.latLng(lat, lng));
      }, 1100);
    }
  }

  // ── Destruction ────────────────────────────────────────────────────────────

  ngOnDestroy() {
    if (this.map) { this.map.remove(); }
    // Nettoyer la fonction globale
    delete (window as any)['naviguerVersPays'];
  }
}
