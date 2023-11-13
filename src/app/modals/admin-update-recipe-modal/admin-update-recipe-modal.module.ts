import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminUpdateRecipeModalPageRoutingModule } from './admin-update-recipe-modal-routing.module';

import { AdminUpdateRecipeModalPage } from './admin-update-recipe-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminUpdateRecipeModalPageRoutingModule
  ],
  declarations: [AdminUpdateRecipeModalPage]
})
export class AdminUpdateRecipeModalPageModule {}
