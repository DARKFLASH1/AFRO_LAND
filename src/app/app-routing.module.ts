import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'acceuil',  // Démarre sur la page d'accueil
    pathMatch: 'full'
  },
  {
    path: 'acceuil',
    loadChildren: () => import('./acceuil/acceuil.module').then( m => m.AcceuilPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'afrique',
    loadChildren: () => import('./afrique/afrique.module').then( m => m.AfriquePageModule)
  },
  {
    path: 'afr-nord',
    loadChildren: () => import('./afr-nord/afr-nord.module').then( m => m.AfrNordPageModule)
  },
  {
    path: 'afr-centre',
    loadChildren: () => import('./afr-centre/afr-centre.module').then( m => m.AfrCentrePageModule)
  },
  {
    path: 'afr-ouest',
    loadChildren: () => import('./afr-ouest/afr-ouest.module').then( m => m.AfrOuestPageModule)
  },
  {
    path: 'afr-est',
    loadChildren: () => import('./afr-est/afr-est.module').then( m => m.AfrEstPageModule)
  },
  {
    path: 'afr-sud',
    loadChildren: () => import('./afr-sud/afr-sud.module').then( m => m.AfrSudPageModule)
  },
  {
    path: 'pays',
    loadChildren: () => import('./pays/pays.module').then( m => m.PaysPageModule)
  },
  {
    path: 'profil',
    loadChildren: () => import('./profil/profil.module').then( m => m.ProfilPageModule)
  },
  {
    path: 'favoris',
    loadChildren: () => import('./favoris/favoris.module').then( m => m.FavorisPageModule)
  },
  {
    path: 'carte',
    loadChildren: () => import('./carte/carte.module').then( m => m.CartePageModule)
  },
  {
    path: 'quiz',
    loadChildren: () => import('./quiz/quiz.module').then( m => m.QuizPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }