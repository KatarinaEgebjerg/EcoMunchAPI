import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'malthes-lejeland',
        loadChildren: () => import('../malthes-lejeland/malthes-lejeland.module').then(m => m.MalthesLejelandPageModule)
      },
      {
        path: '',
        redirectTo: 'tab1',
        pathMatch: 'full',
      },
    ]
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
