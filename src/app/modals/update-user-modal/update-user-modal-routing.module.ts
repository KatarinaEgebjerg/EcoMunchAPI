import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateUserModalPage } from './update-user-modal.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateUserModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateUserModalPageRoutingModule {}
