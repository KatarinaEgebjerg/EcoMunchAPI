import { UserService } from './../../services/user-service/user.service';
import { Component } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { MealService } from 'src/app/services/meal-service/meal.service';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  animations: [
    trigger('fadeOutIn', [
      state('void', style({ opacity: 0 })),
      transition('void <=> *', animate('400ms ease-in-out')),
    ]),
  ],
})
export class HomePage {
  latestMeals: any[] = [];
  randomMeal: any[] = [];
  user: any;
  favorites: any[] = [];
  favoriteStatus: { [key: string]: boolean } = {};
  isSearchBarFocused = false;
  newIngredient = '';
  showSearchResults: boolean = false;
  isLoading: boolean = false;
  errorMessage: string | null = null;
  userIngredients: any[] = [];
  recipeIngredients: any[] = [];

  constructor(
    private navCtrl: NavController,
    private mealService: MealService,
    private userService: UserService,
    private authService: AuthService,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.authService.currentUser.subscribe(async (user) => {
      this.user = user;
      if (user) {
        await this.getFavorites();
      }
    });
    this.latestmeal();
    this.randomMeals();
  }

  async searchMeals() {
    this.isLoading = true;
    this.showSearchResults = true;
    this.errorMessage = null;
    this.recipeIngredients = [];
    try {
      const bestMatches = await this.mealService.getRecipieByIngredients(
        this.userIngredients
      );
      this.recipeIngredients = bestMatches;
    } catch (error: any) {
      this.errorMessage = error.message;
    }
    this.isLoading = false;
  }

  // Function to add an ingredient to the userIngredients array
  addUserIngredient(ingredient: string) {
    if (ingredient) {
      this.userIngredients.push(ingredient);
      this.newIngredient = '';
    }
  }

  getIngredients(meal: any) {
    return this.mealService.getIngredients(meal);
  }

  onClickedOutside() {
    this.isSearchBarFocused = false;
  }

  onSearchBarFocus() {
    this.isSearchBarFocused = true;
  }

  removeIngredient(index: number, event: Event) {
    this.userIngredients.splice(index, 1);
    event.stopPropagation();
  }

  clearIngredients() {
    this.userIngredients = [];
    this.showSearchResults = false;
    this.errorMessage = null;
  }

  async getFavorites() {
    if (this.user) {
      this.favorites = await this.userService.getFavorites(this.user.uid);
      this.isFavorite();
    }
  }

  async latestmeal() {
    const meal = await this.mealService.getLatestMeal();
    this.latestMeals.push(meal);
  }

  async randomMeals() {
    const meal = await this.mealService.getRandomMeals();
    this.randomMeal = this.randomMeal.concat(meal);
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

  async removeFavorite(meal: any) {
    await this.userService.removeFromFavorites(this.user.uid, meal.idMeal);
    this.favoriteStatus[meal.idMeal] = false;
    this.presentToast('Removed from favorites');
  }

  async addFavorite(meal: any) {
    await this.userService.addToFavorites(this.user.uid, meal.idMeal);
    this.favoriteStatus[meal.idMeal] = true;
    this.presentToast('Added to favorites');
  }

  navigateToProfile() {
    this.navCtrl.navigateForward('tabs/home/profile');
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: 'success',
    });
    toast.present();
  }

  truncateMealName(mealName: string, maxLength: number) {
    if (mealName.length > maxLength) {
      return mealName.substring(0, maxLength) + '...';
    } else {
      return mealName;
    }
  }
}
