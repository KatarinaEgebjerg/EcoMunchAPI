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

  userIngredients: string[] = [];

  // Array to store the ingredients of the found recipes
  recipeIngredients: string[] = [];
 

  constructor(
    private navCtrl: NavController,
    private mealService: MealService,
    private userService: UserService,
    private authService: AuthService,
    private toastController: ToastController,
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
    try {
      // Get the best matches for the current ingredients
      const bestMatches = await this.mealService.getRecipieByIngredients(this.userIngredients);

      // Handle the results here
      console.log(bestMatches);

      // Update the recipeIngredients array with the ingredients of the found recipes
      this.recipeIngredients = bestMatches.map(meal => this.mealService.getIngredients(meal));

    } catch (error) {
      console.error('Error during searchMeals: ', error);
    }
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
  }

  addIngredient() {
    // if (this.userIngredients) {
    //   this.userIngredients.push(this.userIngredients);
    //   this.userIngredients = '';
    // }
  }

  getIngredients(cocktail: any) {
    return this.mealService.getIngredients(cocktail);
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
