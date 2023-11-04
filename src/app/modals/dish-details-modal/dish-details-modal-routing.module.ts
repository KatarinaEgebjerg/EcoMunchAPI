import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DishDetailsModalPage } from './dish-details-modal.page';

const routes: Routes = [
  {
    path: '',
    component: DishDetailsModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DishDetailsModalPageRoutingModule {}
