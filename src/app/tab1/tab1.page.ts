import { Component } from '@angular/core';
import { AuthService } from '../services/auth-service/auth.service';
import { ModalController } from '@ionic/angular';
import { ForgotPasswordModalPage } from 'src/app/modals/forgot-password-modal/forgot-password-modal.page';
import { LogoutConfirmationModalPage } from '../modals/logout-confirmation-modal/logout-confirmation-modal.page';
import { MealService } from '../services/meal-service/meal.service';
import { UpdateUserModalPage } from '../modals/update-user-modal/update-user-modal.page';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  user: any;
  ingredientsInput = '';
  bestMatches: any[] = [];

  constructor(
    private authService: AuthService,
    private modalCtrl: ModalController,
    private mealService: MealService
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
    this.bestMatches = await this.mealService.getRecipieByIngredients(
      ingredients
    );
  }

  async updateUser() {
    const modal = await this.modalCtrl.create({
      component: UpdateUserModalPage,
      breakpoints: [0, 0.3, 0.65, 0.8],
      initialBreakpoint: 0.65,
      componentProps: { user: this.user },
      presentingElement: await this.modalCtrl.getTop(), // This is necessary for the swipe to close feature to work correctly
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) {
      // The user data was updated. Refresh the user data.
      this.user = data;
    }
  }
}
