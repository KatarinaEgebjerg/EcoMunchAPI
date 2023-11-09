import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { MealService } from 'src/app/services/meal-service/meal.service';
import { UserService } from 'src/app/services/user-service/user.service';
import { EventEmitter } from '@angular/core';


@Component({
  selector: 'app-dish-details-modal',
  templateUrl: './dish-details-modal.page.html',
  styleUrls: ['./dish-details-modal.page.scss'],
})
export class DishDetailsModalPage implements OnInit {
  @Input() meal: any;
  @Input() userIngredients!: string[];
  favoriteStatus: { [key: string]: boolean } = {};
  user: any;
  favorites: any[] = [];
  onFavoriteChange = new EventEmitter();

  constructor(
    private mealService: MealService,
    private modalCtrl: ModalController,
    private userService: UserService,
    private toastController: ToastController,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.currentUser.subscribe(async (user) => {
      this.user = user;
      if (user) {
        await this.getFavorites();
      }
    });
  }

  getAvailableIngredients(meal: any) {
    const ingredients = this.getIngredients(meal);
    return ingredients.filter(ingredient => this.userIngredients.includes(ingredient));
  }
  

  getIngredients(meal: any) {
    return this.mealService.getIngredients(meal);
  }

  getMeasruements(meal: any) {
    return this.mealService.getMeasurements(meal);
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  async removeFavorite(meal: any) {
    await this.userService.removeFromFavorites(this.user.uid, meal.idMeal);
    this.favoriteStatus[meal.idMeal] = false;
    this.presentToast('Removed from favorites');
    this.onFavoriteChange.emit();
  }

  async addFavorite(meal: any) {
    await this.userService.addToFavorites(this.user.uid, meal.idMeal);
    this.favoriteStatus[meal.idMeal] = true;
    this.presentToast('Added to favorites');
    this.onFavoriteChange.emit();
  }

  async getFavorites() {
    if (this.user) {
      this.favorites = await this.userService.getFavorites(this.user.uid);
      this.isFavorite();
    }
  }

  
  isFavorite() {
    this.favorites.forEach(async (meal) => {
      const isFavorite = await this.userService.isFavorite(
        this.user.uid,
        meal.idMeal
      );
      this.favoriteStatus[meal.idMeal] = isFavorite;
    });
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: 'success',
    });
    toast.present();
  }

  getCategoryIcon(strCategory: string) {
    if (strCategory === 'Beef') {
      return 'assets/icon/cow.svg';
    } else if (strCategory === 'Breakfast') {
      return 'assets/icon/breakfast.svg';
    } else if (strCategory === 'Chicken') {
      return 'assets/icon/chicken.svg';
    } else if (strCategory === 'Dessert') {
      return 'assets/icon/dessert.svg';
    } else if (strCategory === 'Goat') {
      return 'assets/icon/goat.svg';
    } else if (strCategory === 'Lamb') {
      return 'assets/icon/lamb.svg';
    } else if (strCategory === 'Miscellaneous') {
      return 'assets/icon/miscellaneous.svg';
    } else if (strCategory === 'Pasta') {
      return 'assets/icon/pasta.svg';
    } else if (strCategory === 'Pork') {
      return 'assets/icon/pig.svg';
    } else if (strCategory === 'Seafood') {
      return 'assets/icon/seafood.svg';
    } else if (strCategory === 'Side') {
      return 'assets/icon/miscellaneous.svg';
    } else if (strCategory === 'Starter') {
      return 'assets/icon/miscellaneous.svg';
    } else if (strCategory === 'Vegan') {
      return 'assets/icon/leaf.svg';
    } else if (strCategory === 'Vegetarian') {
      return 'assets/icon/leaf.svg';
    }

    return 'assets/icon/miscellaneous.svg';
  }

  formatInstructions(instructions: string) {
    return instructions.replace(/\. /g, '.<br><br>');
  }
}
