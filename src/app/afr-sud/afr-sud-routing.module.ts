import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AfrSudPage } from './afr-sud.page';

const routes: Routes = [
  {
    path: '',
    component: AfrSudPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AfrSudPageRoutingModule {}
