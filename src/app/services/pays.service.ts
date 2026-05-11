// ─── AFRO_LAND — PaysService ──────────────────────────────────────────────────
// Étape 3 : Service centralisé avec cache mémoire + recherche multi-critères
// ─────────────────────────────────────────────────────────────────────────────
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Pays, PaysMap, PaysResultat } from '../models/pays.model';

@Injectable({ providedIn: 'root' })
export class PaysService {

  /** Cache en mémoire : évite de recharger le JSON à chaque navigation */
  private cache: PaysMap | null = null;

  constructor(private http: HttpClient) {}

  // ── Chargement ─────────────────────────────────────────────────────────────

  /** Charge (et met en cache) tous les pays depuis assets/data/pays.json */
  getTousPays(): Observable<PaysMap> {
    if (this.cache) {
      return of(this.cache);
    }
    return this.http.get<PaysMap>('assets/data/pays.json').pipe(
      tap(data => (this.cache = data)),
      catchError(err => {
        console.error('[PaysService] Erreur de chargement du JSON :', err);
        return of({});
      })
    );
  }

  /** Retourne un seul pays par son identifiant (ex. 'senegal') */
  getPaysById(id: string): Observable<Pays | undefined> {
    return new Observable(observer => {
      this.getTousPays().subscribe({
        next: tous => {
          observer.next(tous[id]);
          observer.complete();
        },
        error: err => {
          console.error('[PaysService] getPaysById error :', err);
          observer.next(undefined);
          observer.complete();
        }
      });
    });
  }

  /** Retourne les pays d'une région donnée, triés par nom */
  getPaysParRegion(region: string): Observable<PaysResultat[]> {
    return new Observable(observer => {
      this.getTousPays().subscribe(tous => {
        const resultats = Object.entries(tous)
          .filter(([, p]) => p.region === region)
          .map(([id, pays]) => ({ id, pays }))
          .sort((a, b) => a.pays.name.localeCompare(b.pays.name, 'fr'));
        observer.next(resultats);
        observer.complete();
      });
    });
  }

  // ── Recherche ──────────────────────────────────────────────────────────────

  /**
   * Recherche insensible aux accents et à la casse.
   * Cherche dans : nom du pays, capitale, langues.
   * Priorise les résultats dont le nom commence par le terme.
   */
  rechercherPays(terme: string): Observable<PaysResultat[]> {
    const t = this.normaliser(terme.trim());

    return new Observable(observer => {
      this.getTousPays().subscribe(tous => {
        const resultats = Object.entries(tous)
          .filter(([, p]) =>
            this.normaliser(p.name).includes(t) ||
            this.normaliser(p.capital).includes(t) ||
            p.culture.languages.some(l => this.normaliser(l).includes(t))
          )
          .map(([id, pays]) => ({ id, pays }))
          .sort((a, b) => {
            const dA = this.normaliser(a.pays.name).startsWith(t);
            const dB = this.normaliser(b.pays.name).startsWith(t);
            if (dA && !dB) return -1;
            if (!dA && dB) return 1;
            return a.pays.name.localeCompare(b.pays.name, 'fr');
          });

        observer.next(resultats);
        observer.complete();
      });
    });
  }

  // ── "Pays du jour" ─────────────────────────────────────────────────────────

  /**
   * Retourne un pays différent chaque jour (seed basé sur la date).
   * Stable pour toute la journée, change à minuit.
   */
  getPaysduJour(): Observable<PaysResultat> {
    return new Observable(observer => {
      this.getTousPays().subscribe(tous => {
        const ids = Object.keys(tous);
        const seed = new Date().toDateString()
          .split('')
          .reduce((acc, c) => acc + c.charCodeAt(0), 0);
        const index = seed % ids.length;
        const id = ids[index];
        observer.next({ id, pays: tous[id] });
        observer.complete();
      });
    });
  }

  // ── Utilitaires ────────────────────────────────────────────────────────────

  /** Vide le cache (utile si les données sont mises à jour en runtime) */
  viderCache(): void {
    this.cache = null;
  }

  /** Normalise une chaîne : supprime les accents, met en minuscules */
  private normaliser(s: string): string {
    return s
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();
  }
}
