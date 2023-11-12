import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminAddRecipeModalPageRoutingModule } from './admin-add-recipe-modal-routing.module';

import { AdminAddRecipeModalPage } from './admin-add-recipe-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminAddRecipeModalPageRoutingModule
  ],
  declarations: [AdminAddRecipeModalPage]
})
export class AdminAddRecipeModalPageModule {}
