import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AfriquePage } from './afrique.page';

const routes: Routes = [
  {
    path: '',
    component: AfriquePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AfriquePageRoutingModule {}
