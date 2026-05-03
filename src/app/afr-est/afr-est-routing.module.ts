import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AfrEstPage } from './afr-est.page';

const routes: Routes = [
  {
    path: '',
    component: AfrEstPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AfrEstPageRoutingModule {}
