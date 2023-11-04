import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DishDetailsModalPageRoutingModule } from './dish-details-modal-routing.module';

import { DishDetailsModalPage } from './dish-details-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DishDetailsModalPageRoutingModule
  ],
  declarations: [DishDetailsModalPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DishDetailsModalPageModule {}
