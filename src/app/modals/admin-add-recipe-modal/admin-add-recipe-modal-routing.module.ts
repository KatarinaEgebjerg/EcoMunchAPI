import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminAddRecipeModalPage } from './admin-add-recipe-modal.page';

const routes: Routes = [
  {
    path: '',
    component: AdminAddRecipeModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminAddRecipeModalPageRoutingModule {}
