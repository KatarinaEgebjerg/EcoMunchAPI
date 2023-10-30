import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MalthesLejelandPage } from './malthes-lejeland.page';

const routes: Routes = [
  {
    path: '',
    component: MalthesLejelandPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MalthesLejelandPageRoutingModule {}
