import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminCreateRecipeModalPageRoutingModule } from './admin-create-recipe-modal-routing.module';

import { AdminCreateRecipeModalPage } from './admin-create-recipe-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminCreateRecipeModalPageRoutingModule
  ],
  declarations: [AdminCreateRecipeModalPage]
})
export class AdminCreateRecipeModalPageModule {}
