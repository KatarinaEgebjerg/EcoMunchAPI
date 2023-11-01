import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LogoutConfirmationModalPage } from '../../modals/logout-confirmation-modal/logout-confirmation-modal.page';
import { UpdateUserModalPage } from '../../modals/update-user-modal/update-user-modal.page';
import { AuthService } from '../../services/auth-service/auth.service';
import { MealService } from '../../services/meal-service/meal.service';
import { UserService } from '../../services/user-service/user.service';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss'],
  animations: [
    trigger('fadeOutIn', [
      state('void', style({ opacity: 0 })),
      transition('void <=> *', animate('1000ms ease-in-out')),
    ]),
  ],
})
export class ProfilePage {
  user: any;
  favorites: any[] = [];
  favoriteStatus: { [key: string]: boolean } = {}; 

  constructor(
    private authService: AuthService,
    private modalCtrl: ModalController,
    private MealService: MealService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.authService.currentUser.subscribe(async (user) => {
      this.user = user;
      if (user) {
        await this.getFavorites();
      }
    });
  }

  async getFavorites() {
    if (this.user) {
      this.favorites = await this.userService.getFavorites(this.user.uid);
      this.isFavorite();
    }
  }

  async logout() {
    const modal = await this.modalCtrl.create({
      component: LogoutConfirmationModalPage, 
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
      await this.authService.updateUserData();
    }
  }

  async addFavorite(meal: any) {
    await this.userService.addToFavorites(this.user.uid, meal.idMeal);
    this.favoriteStatus[meal.idMeal] = true;
  }

  async testAddFavorite() {
    const mealId = '52865'; // Just a test meal id
    await this.userService.addToFavorites(this.user.uid, mealId);
    this.favoriteStatus[mealId] = true; 
    this.favorites.push(await this.MealService.getMealById(mealId));
  }
  
  async removeFavorite(meal: any) {
    await this.userService.removeFromFavorites(this.user.uid, meal.idMeal);
    this.favoriteStatus[meal.idMeal] = false;
    meal.removed = true; 
    setTimeout(() => {
      this.favorites = this.favorites.filter(favorite => favorite.idMeal !== meal.idMeal);
    }, 1000); 
  }
  
  isFavorite() {
    this.favorites.forEach(async (meal) => {
      const isFavorite = await this.userService.isFavorite(this.user.uid, meal.idMeal);
      this.favoriteStatus[meal.idMeal] = isFavorite;
    });
  }

}
