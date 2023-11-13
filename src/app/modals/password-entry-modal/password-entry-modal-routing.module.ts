import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PasswordEntryModalPage } from './password-entry-modal.page';

const routes: Routes = [
  {
    path: '',
    component: PasswordEntryModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PasswordEntryModalPageRoutingModule {}
