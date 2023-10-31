import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {
  redirectUnauthorizedTo,
  redirectLoggedInTo,
  canActivate,
} from '@angular/fire/auth-guard';
import { IntroGuard } from './guards/intro.guard';


const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToTabs = () => redirectLoggedInTo(['tabs']);

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginPageModule),
      ...canActivate(redirectLoggedInToTabs),
      canLoad: [IntroGuard]
  },
  {
    path: 'tabs',
    loadChildren: () =>
      import('./pages/tabs/tabs.module').then((m) => m.TabsPageModule),
      ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'intro',
    loadChildren: () =>
      import('./pages/intro/intro.module').then((m) => m.IntroPageModule),
  },
  {
    path: '',
    redirectTo: 'tabs',
    pathMatch: 'full',
  },
  {
    path: 'logout-confirmation-modal',
    loadChildren: () => import('./modals/logout-confirmation-modal/logout-confirmation-modal.module').then( m => m.LogoutConfirmationModalPageModule)
  },
  {
    path: 'update-user-modal',
    loadChildren: () => import('./modals/update-user-modal/update-user-modal.module').then( m => m.UpdateUserModalPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
