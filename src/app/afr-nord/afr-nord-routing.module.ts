import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AfrNordPage } from './afr-nord.page';

const routes: Routes = [
  {
    path: '',
    component: AfrNordPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AfrNordPageRoutingModule {}
