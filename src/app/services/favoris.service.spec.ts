// ─── AFRO_LAND — FavorisService — Tests unitaires ───────────────────────────
import { TestBed } from '@angular/core/testing';
import { FavorisService } from './favoris.service';
import { FavoriItem } from '../models/pays.model';
import { Preferences } from '@capacitor/preferences';

/** Stub léger de Capacitor Preferences (pas de dépendance native en test) */
const mockStore: Record<string, string> = {};

const mockPreferences = {
  get: async ({ key }: { key: string }) => ({
    value: mockStore[key] ?? null,
  }),
  set: async ({ key, value }: { key: string; value: string }) => {
    mockStore[key] = value;
  },
  remove: async ({ key }: { key: string }) => {
    delete mockStore[key];
  },
};

const SENEGAL: FavoriItem = {
  id: 'senegal', name: 'Sénégal',
  capital: 'Dakar', region: "Afrique de l'Ouest",
  flag: 'https://flagcdn.com/w160/sn.png',
};

const GHANA: FavoriItem = {
  id: 'ghana', name: 'Ghana',
  capital: 'Accra', region: "Afrique de l'Ouest",
  flag: 'https://flagcdn.com/w160/gh.png',
};

describe('FavorisService', () => {
  let service: FavorisService;

  beforeEach(async () => {
    // Vider le store entre chaque test
    Object.keys(mockStore).forEach(k => delete mockStore[k]);

    // Remplacer Capacitor Preferences par le stub
    spyOn(Preferences, 'get').and.callFake(mockPreferences.get as any);
    spyOn(Preferences, 'set').and.callFake(mockPreferences.set as any);
    spyOn(Preferences, 'remove').and.callFake(mockPreferences.remove as any);

    TestBed.configureTestingModule({ providers: [FavorisService] });
    service = TestBed.inject(FavorisService);
  });

  // ── getFavoris ─────────────────────────────────────────────────────────────

  it('should return empty array when no favourites are stored', async () => {
    const result = await service.getFavoris();
    expect(result).toEqual([]);
  });

  // ── toggleFavori — ajout ───────────────────────────────────────────────────

  it('should add a country to favourites and return true', async () => {
    const added = await service.toggleFavori(SENEGAL);
    expect(added).toBeTrue();

    const favoris = await service.getFavoris();
    expect(favoris.length).toBe(1);
    expect(favoris[0].id).toBe('senegal');
  });

  // ── toggleFavori — suppression ─────────────────────────────────────────────

  it('should remove an existing favourite and return false', async () => {
    await service.toggleFavori(SENEGAL);         // ajout
    const removed = await service.toggleFavori(SENEGAL); // suppression
    expect(removed).toBeFalse();

    const favoris = await service.getFavoris();
    expect(favoris.length).toBe(0);
  });

  // ── estFavori ──────────────────────────────────────────────────────────────

  it('should return true for a country that has been added', async () => {
    await service.toggleFavori(SENEGAL);
    expect(await service.estFavori('senegal')).toBeTrue();
  });

  it('should return false for a country not in favourites', async () => {
    expect(await service.estFavori('mali')).toBeFalse();
  });

  // ── supprimerFavori ────────────────────────────────────────────────────────

  it('should remove a specific favourite by ID', async () => {
    await service.toggleFavori(SENEGAL);
    await service.toggleFavori(GHANA);
    await service.supprimerFavori('senegal');

    const favoris = await service.getFavoris();
    expect(favoris.length).toBe(1);
    expect(favoris[0].id).toBe('ghana');
  });

  it('should silently succeed when deleting a non-existent favourite', async () => {
    await expectAsync(service.supprimerFavori('inexistant')).toBeResolved();
    expect(await service.getFavoris()).toEqual([]);
  });

  // ── toutEffacer ────────────────────────────────────────────────────────────

  it('should clear all favourites', async () => {
    await service.toggleFavori(SENEGAL);
    await service.toggleFavori(GHANA);
    await service.toutEffacer();

    // Le store est vide ; getFavoris relit Preferences.get → null → []
    expect(await service.getFavoris()).toEqual([]);
  });

  // ── Intégrité des données ──────────────────────────────────────────────────

  it('should preserve all FavoriItem fields when stored', async () => {
    await service.toggleFavori(SENEGAL);
    const [stored] = await service.getFavoris();
    expect(stored.name).toBe('Sénégal');
    expect(stored.capital).toBe('Dakar');
    expect(stored.region).toBe("Afrique de l'Ouest");
    expect(stored.flag).toContain('flagcdn.com');
  });
});
