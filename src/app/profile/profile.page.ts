import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LogoutConfirmationModalPage } from '../modals/logout-confirmation-modal/logout-confirmation-modal.page';
import { UpdateUserModalPage } from '../modals/update-user-modal/update-user-modal.page';
import { AuthService } from '../services/auth-service/auth.service';
import { MealService } from '../services/meal-service/meal.service';
import { UserService } from '../services/user-service/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss'],
})
export class ProfilePage {
  user: any;
  bestMatches: any[] = [];
  favorites: any[] = [];

  constructor(
    private authService: AuthService,
    private modalCtrl: ModalController,
    private MealService: MealService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.getUser();
    this.getFavorites();
  }

  getUser() {
    this.authService.currentUser.subscribe((data) => {
      this.user = data;
    });
  }

  getFavorites() {
    this.authService.currentUser.subscribe((user) => {
      if (user) {
        this.userService.getFavorites(user.uid).then((favorites) => {
          this.favorites = favorites;
        });
      }
    });
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
      presentingElement: await this.modalCtrl.getTop(), // This is necessary for the swipe to close feature to work correctly
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) {
      // The user data was updated. Refresh the user data.
      this.user = data;
    }
  }

  getIngredients(cocktail: any) {
    return this.MealService.getIngredients(cocktail);
  }

  async addFavorite() {
    const mealId = '52854'; // replace with your static meal id

    await this.userService.addToFavorites(this.user.uid, mealId);
    console.log('Meal added to favorites successfully');
  }

  async removeFavorite() {
    const mealId = '52855'; // Replace with the meal ID you want to remove from favorites

    try {
      await this.userService.removeFromFavorites(this.user.uid, mealId);
      console.log('Meal removed from favorites successfully');
    } catch (error) {
      console.error('Error removing meal from favorites:', error);
    }
  }
}
