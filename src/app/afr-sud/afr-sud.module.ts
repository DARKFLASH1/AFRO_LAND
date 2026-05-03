import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AfrSudPageRoutingModule } from './afr-sud-routing.module';

import { AfrSudPage } from './afr-sud.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AfrSudPageRoutingModule
  ],
  declarations: [AfrSudPage]
})
export class AfrSudPageModule {}
