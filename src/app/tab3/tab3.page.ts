import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalPopupPage } from '../modal-popup/modal-popup.page';
import { ModalController } from '@ionic/angular';



@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  login: any = { username: '', password: '' };
  onLogin() {
    console.log('user name:', this.login.username );
    console.log('user password', this.login.password );
  }

  setLoginData() {
    this.login.username = 'edupala.com';
    this.login.password = '12345';
  }
  
  modelData: any;
  constructor(public modalController: ModalController) {}
  async openIonModal() {
    const modal = await this.modalController.create({
      component: ModalPopupPage,
      componentProps: {
        'model_title': "Nomadic model's reveberation"
      }
    });
    modal.onDidDismiss().then((modelData) => {
      if (modelData !== null) {
        this.modelData = modelData.data;
        console.log('Modal Data : ' + modelData.data);
      }
    });
    return await modal.present();
  }

  public alertButtons = ['Logout'];
}
