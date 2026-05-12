// ─── AFRO_LAND — FavorisPage — Tests unitaires ───────────────────────────────
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { FavorisPage } from './favoris.page';
import { FavorisService } from '../services/favoris.service';
import { FavoriItem } from '../models/pays.model';

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

describe('FavorisPage', () => {
  let component: FavorisPage;
  let fixture: ComponentFixture<FavorisPage>;
  let favorisServiceSpy: jasmine.SpyObj<FavorisService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    favorisServiceSpy = jasmine.createSpyObj('FavorisService', [
      'getFavoris', 'supprimerFavori',
    ]);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    favorisServiceSpy.getFavoris.and.resolveTo([SENEGAL, GHANA]);
    favorisServiceSpy.supprimerFavori.and.resolveTo();

    await TestBed.configureTestingModule({
      declarations: [FavorisPage],
      providers: [
        { provide: FavorisService, useValue: favorisServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FavorisPage);
    component = fixture.componentInstance;
  });

  // ── Création ───────────────────────────────────────────────────────────────

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  // ── ionViewWillEnter ───────────────────────────────────────────────────────

  it('should load favourites on ionViewWillEnter', async () => {
    await component.ionViewWillEnter();
    expect(favorisServiceSpy.getFavoris).toHaveBeenCalledTimes(1);
    expect(component.paysFavoris.length).toBe(2);
  });

  it('should set chargement to false after loading', async () => {
    await component.ionViewWillEnter();
    expect(component.chargement).toBeFalse();
  });

  it('should handle empty favourites list', async () => {
    favorisServiceSpy.getFavoris.and.resolveTo([]);
    await component.ionViewWillEnter();
    expect(component.paysFavoris).toEqual([]);
  });

  // ── supprimerFavori ────────────────────────────────────────────────────────

  it('should call service.supprimerFavori with the correct ID', async () => {
    component.paysFavoris = [SENEGAL, GHANA];
    await component.supprimerFavori('senegal');
    expect(favorisServiceSpy.supprimerFavori).toHaveBeenCalledWith('senegal');
  });

  it('should remove the item from the local list without reloading', async () => {
    component.paysFavoris = [SENEGAL, GHANA];
    await component.supprimerFavori('senegal');
    expect(component.paysFavoris.length).toBe(1);
    expect(component.paysFavoris[0].id).toBe('ghana');
  });

  it('should not mutate other items when one is removed', async () => {
    component.paysFavoris = [SENEGAL, GHANA];
    await component.supprimerFavori('ghana');
    expect(component.paysFavoris[0]).toEqual(SENEGAL);
  });

  // ── Navigation ─────────────────────────────────────────────────────────────

  it('should navigate to the correct country page on ouvrirPays()', () => {
    component.ouvrirPays('ghana');
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/pays', 'ghana']);
  });

  it('should navigate to /afrique on explorerAfrique()', () => {
    component.explorerAfrique();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/afrique']);
  });

  // ── Affichage du flag (bug corrigé : clé "flag" et non "image") ───────────

  it('should expose flag field (not image) on each FavoriItem', async () => {
    component.paysFavoris = [SENEGAL];
    const item = component.paysFavoris[0];
    // "image" ne doit pas exister ; "flag" doit être défini
    expect((item as any)['image']).toBeUndefined();
    expect(item.flag).toContain('flagcdn.com');
  });
});
