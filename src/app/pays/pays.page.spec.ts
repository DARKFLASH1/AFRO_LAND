// ─── AFRO_LAND — PaysPage — Tests unitaires ──────────────────────────────────
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { PaysPage } from './pays.page';
import { PaysService } from '../services/pays.service';
import { FavorisService } from '../services/favoris.service';
import { Pays } from '../models/pays.model';

const MOCK_PAYS: Pays = {
  name: 'Sénégal', capital: 'Dakar', population: '18.5M',
  currency: 'XOF', region: "Afrique de l'Ouest",
  flag: 'https://flagcdn.com/w160/sn.png',
  superficie: 196712, pib: 30.0, hdi: 0.517,
  religion: 'Islam sunnite',
  wikipedia: 'https://fr.wikipedia.org/wiki/S%C3%A9n%C3%A9gal',
  geography: { position: "Afrique de l'Ouest", climate: 'Tropical' },
  history: { independence: '1960', colonisateur: 'France' },
  culture: { cuisine: ['Thiéboudienne'], languages: ['Wolof', 'Français'] },
  economy: { mainSectors: ['Pêche'], exports: ['Phosphates'] },
  highlights: ['Île de Gorée (UNESCO)', 'Lac Rose'],
};

describe('PaysPage', () => {
  let component: PaysPage;
  let fixture: ComponentFixture<PaysPage>;
  let paysServiceSpy: jasmine.SpyObj<PaysService>;
  let favorisServiceSpy: jasmine.SpyObj<FavorisService>;

  beforeEach(async () => {
    paysServiceSpy = jasmine.createSpyObj('PaysService', ['getPaysById']);
    favorisServiceSpy = jasmine.createSpyObj('FavorisService', ['estFavori', 'toggleFavori']);

    paysServiceSpy.getPaysById.and.returnValue(of(MOCK_PAYS));
    favorisServiceSpy.estFavori.and.resolveTo(false);
    favorisServiceSpy.toggleFavori.and.resolveTo(true);

    await TestBed.configureTestingModule({
      declarations: [PaysPage],
      providers: [
        { provide: PaysService, useValue: paysServiceSpy },
        { provide: FavorisService, useValue: favorisServiceSpy },
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: { get: () => 'senegal' } } },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PaysPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // ── Création ───────────────────────────────────────────────────────────────

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  // ── Chargement ─────────────────────────────────────────────────────────────

  it('should load the correct country on init', () => {
    expect(paysServiceSpy.getPaysById).toHaveBeenCalledWith('senegal');
    expect(component.pays).toEqual(MOCK_PAYS);
    expect(component.chargement).toBeFalse();
  });

  it('should set paysId from route params', () => {
    expect(component.paysId).toBe('senegal');
  });

  it('should set chargement = false after data is loaded', () => {
    expect(component.chargement).toBeFalse();
  });

  // ── État pays undefined (erreur réseau simulée) ───────────────────────────

  it('should handle undefined country gracefully', () => {
    paysServiceSpy.getPaysById.and.returnValue(of(undefined));
    component.chargerInfosPays();
    expect(component.pays).toBeUndefined();
    expect(component.chargement).toBeFalse();
  });

  // ── Favoris ────────────────────────────────────────────────────────────────

  it('should call toggleFavori with correct FavoriItem on ajouterFavoris()', async () => {
    await component.ajouterFavoris();
    expect(favorisServiceSpy.toggleFavori).toHaveBeenCalledWith(
      jasmine.objectContaining({ id: 'senegal', flag: MOCK_PAYS.flag })
    );
  });

  it('should set isFavoris = true when toggleFavori resolves to true', async () => {
    favorisServiceSpy.toggleFavori.and.resolveTo(true);
    await component.ajouterFavoris();
    expect(component.isFavoris).toBeTrue();
  });

  it('should set isFavoris = false when toggleFavori resolves to false', async () => {
    favorisServiceSpy.toggleFavori.and.resolveTo(false);
    await component.ajouterFavoris();
    expect(component.isFavoris).toBeFalse();
  });

  // ── Champs enrichis accessibles (Partie 7) ────────────────────────────────

  it('should expose superficie from the loaded country', () => {
    expect(component.pays?.superficie).toBe(196712);
  });

  it('should expose hdi from the loaded country', () => {
    expect(component.pays?.hdi).toBe(0.517);
  });
});
