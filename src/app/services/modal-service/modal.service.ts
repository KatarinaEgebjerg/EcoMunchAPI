import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PasswordEntryModalPage } from '../../modals/password-entry-modal/password-entry-modal.page';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  constructor(private modalController: ModalController) {}

  async presentPasswordModal() {
    const modal = await this.modalController.create({
      component: PasswordEntryModalPage,
    });

    await modal.present();
  }

  async dismissPasswordModal() {
    await this.modalController.dismiss();
  }
}
