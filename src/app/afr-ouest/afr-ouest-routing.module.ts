import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AfrOuestPage } from './afr-ouest.page';

const routes: Routes = [
  {
    path: '',
    component: AfrOuestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AfrOuestPageRoutingModule {}
