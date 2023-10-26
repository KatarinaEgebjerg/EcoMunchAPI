import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentication/authentication.service';
import { ModalController } from '@ionic/angular';
import { ForgotPasswordModalPage } from 'src/app/modals/forgot-password-modal/forgot-password-modal.page';
import { LogoutConfirmationModalPage } from '../modals/logout-confirmation-modal/logout-confirmation-modal.page';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  user: any;

  constructor(
    private authService: AuthenticationService,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.authService.currentUser.subscribe((data) => {
      this.user = data;
    });
  }

  async logout() {
    const modal = await this.modalCtrl.create({
      component: LogoutConfirmationModalPage, // replace with your actual component
      cssClass: 'my-modal',
    });
    await modal.present();
  }
}
