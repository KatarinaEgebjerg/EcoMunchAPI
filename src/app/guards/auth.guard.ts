// Create a route guard file (e.g., auth.guard.ts)

import { Injectable } from '@angular/core';
import { CanActivate, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ModalController } from '@ionic/angular';
import { PasswordEntryModalPage } from '../modals/password-entry-modal/password-entry-modal.page';
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private modalController: ModalController
  ) {}

  async canActivate(): Promise<boolean | UrlTree> {
    const modal = await this.modalController.create({
      component: PasswordEntryModalPage,
      backdropDismiss: false, // Prevent dismissing the modal by clicking outside
    });
  
    await modal.present();
  
    const result = await modal.onWillDismiss();
  
    if (result.data && result.data.correctPassword) {
      return false; // Prevent the initial navigation to '/admin' from executing
    } else {
      // Redirect to a different page or handle unauthorized access
      return this.router.createUrlTree(['/admin']);
    }
  }
}
