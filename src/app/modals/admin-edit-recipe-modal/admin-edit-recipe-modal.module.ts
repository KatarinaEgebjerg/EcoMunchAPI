import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminEditRecipeModalPageRoutingModule } from './admin-edit-recipe-modal-routing.module';

import { AdminEditRecipeModalPage } from './admin-edit-recipe-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminEditRecipeModalPageRoutingModule
  ],
  declarations: [AdminEditRecipeModalPage]
})
export class AdminEditRecipeModalPageModule {}
