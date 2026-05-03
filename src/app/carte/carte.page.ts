import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import * as L from 'leaflet';
import { LocationService } from '../services/location.service';
import { HttpClient } from '@angular/common/http';

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

  // Couleurs par région
  private regionColors: { [key: string]: string } = {
    'Nord': '#ff5252',    // Rouge
    'Ouest': '#4caf50',   // Vert
    'Centre': '#ffeb3b',  // Jaune
    'Est': '#2196f3',     // Bleu
    'Sud': '#9c27b0',     // Violet
    'Inconnu': '#9e9e9e'  // Gris
  };

  private countryToRegion: { [key: string]: string } = {
    'Algeria': 'Nord', 'Egypt': 'Nord', 'Libya': 'Nord', 'Morocco': 'Nord', 'Tunisia': 'Nord', 'Western Sahara': 'Nord', 'Sudan': 'Nord', 'Mauritania': 'Nord',
    'Benin': 'Ouest', 'Burkina Faso': 'Ouest', 'Cape Verde': 'Ouest', 'Ivory Coast': 'Ouest', 'Gambia': 'Ouest', 'Ghana': 'Ouest', 'Guinea': 'Ouest', 'Guinea-Bissau': 'Ouest', 'Liberia': 'Ouest', 'Mali': 'Ouest', 'Niger': 'Ouest', 'Nigeria': 'Ouest', 'Senegal': 'Ouest', 'Sierra Leone': 'Ouest', 'Togo': 'Ouest',
    'Cameroon': 'Centre', 'Central African Republic': 'Centre', 'Chad': 'Centre', 'Congo': 'Centre', 'DR Congo': 'Centre', 'Equatorial Guinea': 'Centre', 'Gabon': 'Centre', 'Sao Tome and Principe': 'Centre', 'Angola': 'Centre',
    'Burundi': 'Est', 'Comoros': 'Est', 'Djibouti': 'Est', 'Eritrea': 'Est', 'Ethiopia': 'Est', 'Kenya': 'Est', 'Madagascar': 'Est', 'Malawi': 'Est', 'Mauritius': 'Est', 'Mozambique': 'Est', 'Rwanda': 'Est', 'Seychelles': 'Est', 'Somalia': 'Est', 'South Sudan': 'Est', 'Tanzania': 'Est', 'Uganda': 'Est',
    'Botswana': 'Sud', 'Eswatini': 'Sud', 'Swaziland': 'Sud', 'Lesotho': 'Sud', 'Namibia': 'Sud', 'South Africa': 'Sud', 'Zambia': 'Sud', 'Zimbabwe': 'Sud'
  };

  constructor(
    private locationService: LocationService,
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit() { }

  ionViewDidEnter() {
    this.initMap();
  }

  initMap() {
    if (this.map) {
      this.map.remove();
    }

    const southWest = L.latLng(-45, -30);
    const northEast = L.latLng(45, 60);
    const bounds = L.latLngBounds(southWest, northEast);

    this.map = L.map('mapId', {
      maxBounds: bounds,
      maxBoundsViscosity: 1.0,
      minZoom: 3,
      maxZoom: 7
    }).setView([2.0, 16.0], 3);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OpenStreetMap'
    }).addTo(this.map);

    this.loadGeoJSON();
    this.addLegend();

    setTimeout(() => {
      this.map.invalidateSize();
    }, 400);
  }

  addLegend() {
    const legend = new L.Control({ position: 'bottomright' });
    legend.onAdd = () => {
      const div = L.DomUtil.create('div', 'info legend');
      div.style.backgroundColor = 'white';
      div.style.padding = '10px';
      div.style.borderRadius = '5px';
      div.style.boxShadow = '0 0 15px rgba(0,0,0,0.2)';
      
      let labels = ['<strong>Régions</strong>'];
      for (let region in this.regionColors) {
        if (region !== 'Inconnu') {
          labels.push(
            `<i style="background:${this.regionColors[region]}; width:18px; height:18px; float:left; margin-right:8px; opacity:0.7"></i> ${region}`
          );
        }
      }
      div.innerHTML = labels.join('<br>');
      return div;
    };
    legend.addTo(this.map);
  }

  loadGeoJSON() {
    this.http.get('assets/africa.geojson').subscribe((data: any) => {
      this.geojsonLayer = L.geoJSON(data, {
        style: (feature: any) => {
          const region = this.countryToRegion[feature.properties.name] || 'Inconnu';
          return {
            color: '#ffffff',
            weight: 1,
            opacity: 1,
            fillOpacity: 0.6,
            fillColor: this.regionColors[region]
          };
        },
        onEachFeature: (feature, layer) => {
          layer.on({
            mouseover: (e) => {
              const l = e.target;
              l.setStyle({ fillOpacity: 0.9, weight: 2, color: '#333' });
            },
            mouseout: (e) => {
              this.geojsonLayer?.resetStyle(e.target);
            },
            click: (e) => {
              this.redirectByCountryName(feature.properties.name);
            }
          });
          layer.bindTooltip(feature.properties.name, { sticky: true });
        }
      }).addTo(this.map);
    });
  }

  redirectByCountryName(name: string) {
    const mapping: { [key: string]: string } = {
      'Algeria': 'algerie', 'Angola': 'angola', 'Benin': 'benin', 'Botswana': 'botswana', 'Burkina Faso': 'burkina', 'Burundi': 'burundi', 'Cameroon': 'cameroun', 'Cape Verde': 'cap-vert', 'Central African Republic': 'centrafrique', 'Chad': 'tchad', 'Comoros': 'comores', 'Congo': 'congo-brazzaville', 'DR Congo': 'congo-kinshasa', 'Djibouti': 'djibouti', 'Egypt': 'egypte', 'Equatorial Guinea': 'guinee-equatoriale', 'Eritrea': 'erythree', 'Ethiopia': 'ethiopie', 'Gabon': 'gabon', 'Gambia': 'gambie', 'Ghana': 'ghana', 'Guinea': 'guinee', 'Guinea-Bissau': 'guinee-bissau', 'Ivory Coast': 'cote-ivoire', 'Kenya': 'kenya', 'Lesotho': 'lesotho', 'Liberia': 'liberia', 'Libya': 'libye', 'Madagascar': 'madagascar', 'Malawi': 'malawi', 'Mali': 'mali', 'Mauritania': 'mauritanie', 'Mauritius': 'maurice', 'Morocco': 'maroc', 'Mozambique': 'mozambique', 'Namibia': 'namibie', 'Niger': 'niger', 'Nigeria': 'nigeria', 'Rwanda': 'rwanda', 'Sao Tome and Principe': 'saotome', 'Senegal': 'senegal', 'Seychelles': 'seychelles', 'Sierra Leone': 'sierra-leone', 'Somalia': 'somalie', 'South Africa': 'afrique-sud', 'South Sudan': 'soudan-du-sud', 'Sudan': 'soudan', 'Swaziland': 'eswatini', 'Tanzania': 'tanzanie', 'Togo': 'togo', 'Tunisia': 'tunisie', 'Uganda': 'ouganda', 'Zambia': 'zambie', 'Zimbabwe': 'zimbabwe', 'Western Sahara': 'maroc'
    };
    const id = mapping[name] || name.toLowerCase().replace(/ /g, '-');
    this.router.navigate(['/pays', id]);
  }

  async locateMe() {
    try {
      const position = await this.locationService.getCurrentPosition();
      const { latitude, longitude } = position.coords;
      if (this.userMarker) {
        this.userMarker.setLatLng([latitude, longitude]);
      } else {
        const icon = L.icon({ iconUrl: 'assets/icon/favicon.png', iconSize: [32, 32], iconAnchor: [16, 32] });
        this.userMarker = L.marker([latitude, longitude], { icon }).addTo(this.map).bindPopup('Vous êtes ici !').openPopup();
      }
      this.map.setView([latitude, longitude], 5);
    } catch (error) { console.error(error); }
  }

  ngOnDestroy() { if (this.map) this.map.remove(); }
}
