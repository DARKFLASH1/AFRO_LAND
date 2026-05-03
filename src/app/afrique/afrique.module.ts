import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AfriquePageRoutingModule } from './afrique-routing.module';

import { AfriquePage } from './afrique.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AfriquePageRoutingModule
  ],
  declarations: [AfriquePage]
})
export class AfriquePageModule {}
