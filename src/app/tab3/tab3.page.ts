import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { LogoutConfirmationModalPage } from '../modals/logout-confirmation-modal/logout-confirmation-modal.page';
import { UpdateUserModalPage } from '../modals/update-user-modal/update-user-modal.page';
import { AuthenticationService } from '../services/authentication/authentication.service';



@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  login: any = { username: '', password: '' };
  user: any;
  onLogin() {
    console.log('user name:', this.login.username );
    console.log('user password', this.login.password );
  }

  constructor(
    private authService: AuthenticationService,
    private modalCtrl: ModalController,
  ) {}

  setLoginData() {
    this.login.username = 'edupala.com';
    this.login.password = '12345';
  }
  
  ngOnInit() {
    this.authService.currentUser.subscribe((data) => {
      this.user = data;
    });
    console.log(this.user)
  }

  async logout() {
    const modal = await this.modalCtrl.create({
      component: LogoutConfirmationModalPage, // replace with your actual component
      cssClass: 'my-modal',
    });
    await modal.present();
  }

  async updateUser() {
    const modal = await this.modalCtrl.create({
      component: UpdateUserModalPage,
      breakpoints: [0, 0.3, 0.65, 0.8],
      initialBreakpoint: 0.65,
      componentProps: { user: this.user },
      presentingElement: await this.modalCtrl.getTop() // This is necessary for the swipe to close feature to work correctly
    });
  
    await modal.present();
  
    const { data } = await modal.onWillDismiss();
    if (data) {
      // The user data was updated. Refresh the user data.
      this.user = data;
    }
  }
  
}
