import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AfrOuestPageRoutingModule } from './afr-ouest-routing.module';

import { AfrOuestPage } from './afr-ouest.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AfrOuestPageRoutingModule
  ],
  declarations: [AfrOuestPage]
})
export class AfrOuestPageModule {}
