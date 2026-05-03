import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AfrCentrePageRoutingModule } from './afr-centre-routing.module';

import { AfrCentrePage } from './afr-centre.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AfrCentrePageRoutingModule
  ],
  declarations: [AfrCentrePage]
})
export class AfrCentrePageModule {}
