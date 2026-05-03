import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AfrEstPageRoutingModule } from './afr-est-routing.module';

import { AfrEstPage } from './afr-est.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AfrEstPageRoutingModule
  ],
  declarations: [AfrEstPage]
})
export class AfrEstPageModule {}
