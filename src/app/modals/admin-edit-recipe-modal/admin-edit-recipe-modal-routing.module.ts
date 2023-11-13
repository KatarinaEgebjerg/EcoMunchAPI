import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminEditRecipeModalPage } from './admin-edit-recipe-modal.page';

const routes: Routes = [
  {
    path: '',
    component: AdminEditRecipeModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminEditRecipeModalPageRoutingModule {}
