import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminUpdateRecipeModalPage } from './admin-update-recipe-modal.page';

const routes: Routes = [
  {
    path: '',
    component: AdminUpdateRecipeModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminUpdateRecipeModalPageRoutingModule {}
