// ─── AFRO_LAND — PaysService — Tests unitaires ───────────────────────────────
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PaysService } from './pays.service';
import { PaysMap, Pays } from '../models/pays.model';

/** JSON minimal valide pour les tests */
const MOCK_DATA: PaysMap = {
  senegal: {
    name: 'Sénégal', capital: 'Dakar', population: '18.5M',
    currency: 'XOF', region: 'Afrique de l\'Ouest',
    flag: 'https://flagcdn.com/w160/sn.png',
    superficie: 196712, pib: 30.0, hdi: 0.517,
    religion: 'Islam sunnite',
    wikipedia: 'https://fr.wikipedia.org/wiki/S%C3%A9n%C3%A9gal',
    geography: { position: 'Afrique de l\'Ouest', climate: 'Tropical' },
    history: { independence: '1960', colonisateur: 'France' },
    culture: { cuisine: ['Thiéboudienne'], languages: ['Wolof', 'Français'] },
    economy: { mainSectors: ['Pêche'], exports: ['Phosphates'] },
    highlights: ['Île de Gorée (UNESCO)'],
  },
  ghana: {
    name: 'Ghana', capital: 'Accra', population: '34.5M',
    currency: 'GHS', region: 'Afrique de l\'Ouest',
    flag: 'https://flagcdn.com/w160/gh.png',
    superficie: 238533, pib: 76.0, hdi: 0.632,
    religion: 'Christianisme',
    wikipedia: 'https://fr.wikipedia.org/wiki/Ghana',
    geography: { position: 'Afrique de l\'Ouest', climate: 'Tropical' },
    history: { independence: '1957', colonisateur: 'Royaume-Uni' },
    culture: { cuisine: ['Fufu'], languages: ['Anglais', 'Akan'] },
    economy: { mainSectors: ['Cacao', 'Or'], exports: ['Or', 'Cacao'] },
    highlights: ['Parc national de Kakum'],
  },
};

describe('PaysService', () => {
  let service: PaysService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PaysService],
    });
    service = TestBed.inject(PaysService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();         // vérifie qu'aucune requête non attendue ne traîne
    (service as any).cache = null; // réinitialise le cache entre les tests
  });

  // ── getTousPays ────────────────────────────────────────────────────────────

  it('should load all countries via HTTP', (done) => {
    service.getTousPays().subscribe(data => {
      expect(Object.keys(data).length).toBe(2);
      expect(data['senegal'].name).toBe('Sénégal');
      done();
    });
    httpMock.expectOne('assets/data/pays.json').flush(MOCK_DATA);
  });

  it('should use the in-memory cache on second call (no second HTTP request)', (done) => {
    service.getTousPays().subscribe(() => {
      // deuxième appel — ne doit pas émettre de requête HTTP
      service.getTousPays().subscribe(data => {
        expect(data['ghana'].name).toBe('Ghana');
        done();
      });
      // pas de flush ici : le cache est utilisé
    });
    httpMock.expectOne('assets/data/pays.json').flush(MOCK_DATA);
  });

  it('should return empty object on HTTP error', (done) => {
    service.getTousPays().subscribe(data => {
      expect(data).toEqual({});
      done();
    });
    httpMock.expectOne('assets/data/pays.json').error(new ErrorEvent('Network error'));
  });

  // ── getPaysById ────────────────────────────────────────────────────────────

  it('should return the correct country by ID', (done) => {
    service.getPaysById('senegal').subscribe((pays: Pays | undefined) => {
      expect(pays).toBeDefined();
      expect(pays!.capital).toBe('Dakar');
      done();
    });
    httpMock.expectOne('assets/data/pays.json').flush(MOCK_DATA);
  });

  it('should return undefined for an unknown country ID', (done) => {
    service.getPaysById('pays-inexistant').subscribe((pays: Pays | undefined) => {
      expect(pays).toBeUndefined();
      done();
    });
    httpMock.expectOne('assets/data/pays.json').flush(MOCK_DATA);
  });

  // ── rechercherPays ─────────────────────────────────────────────────────────

  it('should find a country by name (accent-insensitive)', (done) => {
    service.rechercherPays('senegal').subscribe(results => {
      expect(results.length).toBe(1);
      expect(results[0].id).toBe('senegal');
      done();
    });
    httpMock.expectOne('assets/data/pays.json').flush(MOCK_DATA);
  });

  it('should find a country by capital', (done) => {
    service.rechercherPays('Accra').subscribe(results => {
      expect(results.length).toBe(1);
      expect(results[0].id).toBe('ghana');
      done();
    });
    httpMock.expectOne('assets/data/pays.json').flush(MOCK_DATA);
  });

  it('should find countries by language', (done) => {
    service.rechercherPays('Wolof').subscribe(results => {
      expect(results.some(r => r.id === 'senegal')).toBeTrue();
      done();
    });
    httpMock.expectOne('assets/data/pays.json').flush(MOCK_DATA);
  });

  it('should return empty array for unmatched search term', (done) => {
    service.rechercherPays('xyznotfound').subscribe(results => {
      expect(results.length).toBe(0);
      done();
    });
    httpMock.expectOne('assets/data/pays.json').flush(MOCK_DATA);
  });

  // ── Champs enrichis (Partie 7) ────────────────────────────────────────────

  it('should expose superficie, pib, hdi, religion, wikipedia on enriched countries', (done) => {
    service.getPaysById('senegal').subscribe((pays: Pays | undefined) => {
      expect(pays!.superficie).toBe(196712);
      expect(pays!.pib).toBe(30.0);
      expect(pays!.hdi).toBe(0.517);
      expect(pays!.religion).toBe('Islam sunnite');
      expect(pays!.wikipedia).toContain('wikipedia.org');
      done();
    });
    httpMock.expectOne('assets/data/pays.json').flush(MOCK_DATA);
  });

  // ── getPaysParRegion ───────────────────────────────────────────────────────

  it('should return only countries matching the given region', (done) => {
    service.getPaysParRegion("Afrique de l'Ouest").subscribe(results => {
      expect(results.length).toBe(2);
      expect(results.map(r => r.id).sort()).toEqual(['ghana', 'senegal']);
      done();
    });
    httpMock.expectOne('assets/data/pays.json').flush(MOCK_DATA);
  });

  it('should return empty array for unknown region', (done) => {
    service.getPaysParRegion('Région inconnue').subscribe(results => {
      expect(results.length).toBe(0);
      done();
    });
    httpMock.expectOne('assets/data/pays.json').flush(MOCK_DATA);
  });
});
