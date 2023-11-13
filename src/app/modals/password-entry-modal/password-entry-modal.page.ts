import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalService } from '../../services/modal-service/modal.service';

@Component({
  selector: 'app-password-modal',
  templateUrl: './password-entry-modal.page.html',
  styleUrls: ['./password-entry-modal.page.scss'],
})
export class PasswordEntryModalPage {
  password: string = '';

  constructor(
    private modalController: ModalController,
    private modalService: ModalService
  ) {}

  checkPassword() {
    const correctPassword = 'admin'; 

    if (this.password === correctPassword) {
      this.modalService.dismissPasswordModal();
    } else {
      
      console.error('Incorrect password');
    }
  }
}
