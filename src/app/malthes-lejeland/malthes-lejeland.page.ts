import { Component, OnInit } from '@angular/core';
import { LogoutConfirmationModalPage } from '../modals/logout-confirmation-modal/logout-confirmation-modal.page';
import { AuthenticationService } from '../services/authentication/authentication.service';
import { ModalController } from '@ionic/angular';
import { ApiService } from '../services/api/api.service';
import { UpdateUserModalPage } from '../modals/update-user-modal/update-user-modal.page';

@Component({
  selector: 'app-malthes-lejeland',
  templateUrl: './malthes-lejeland.page.html',
  styleUrls: ['./malthes-lejeland.page.scss'],
})
export class MalthesLejelandPage implements OnInit {
  user: any;
  ingredientsInput = '';
  bestMatches: any[] = [];

  constructor(
    private authService: AuthenticationService,
    private modalCtrl: ModalController,
    private apiService: ApiService
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

  async getBestMatches() {
    const ingredients = this.ingredientsInput.split(',');
    this.bestMatches = await this.apiService.getRecipieByIngredients(ingredients);
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
