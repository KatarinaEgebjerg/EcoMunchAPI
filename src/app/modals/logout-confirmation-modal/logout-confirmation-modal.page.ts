import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, AlertController, ModalController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-logout-confirmation-modal',
  templateUrl: './logout-confirmation-modal.page.html',
  styleUrls: ['./logout-confirmation-modal.page.scss'],
})
export class LogoutConfirmationModalPage implements OnInit {
  constructor(
    private authService: AuthenticationService,
    private navCtrl: NavController,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private modalCtrl: ModalController // add this
  ) {}

  ngOnInit() {}

  async logoutConfirm() {
    const loading = await this.loadingController.create({
      message: 'Logging out...',
    });
    await loading.present();
  
    try {
      await this.authService.logout();
      await this.modalCtrl.dismiss();
      this.navCtrl.navigateBack('/login');
    } catch (error: any) {
      const alert = await this.alertController.create({
        header: 'Logout failed',
        message: error.message,
        buttons: ['OK']
      });
      await alert.present();
    } finally {
      await loading.dismiss();
    }
  }

  async cancel() {
    await this.modalCtrl.dismiss();
  }
}
