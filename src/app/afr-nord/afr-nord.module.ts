import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AfrNordPageRoutingModule } from './afr-nord-routing.module';

import { AfrNordPage } from './afr-nord.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AfrNordPageRoutingModule
  ],
  declarations: [AfrNordPage]
})
export class AfrNordPageModule {}
