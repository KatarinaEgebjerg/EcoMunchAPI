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
import { Directive, ElementRef, Output, EventEmitter, HostListener } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  animations: [
    trigger('fadeOutIn', [
      state('void', style({ opacity: 0 })),
      transition('void <=> *', animate('500ms ease-in-out')),
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

  onClickedOutside() {
    this.isSearchBarFocused = false;
    console.log("🚀 ~ file: home.page.ts:62 ~ HomePage ~ onClickedOutside ~ this.isSearchBarFocused:", this.isSearchBarFocused)
    
  }

  onSearchBarFocus() {
    this.isSearchBarFocused = true;
    console.log("🚀 ~ file: home.page.ts:57 ~ HomePage ~ onSearchBarFocus ~ this.isSearchBarFocused:", this.isSearchBarFocused)
    
  }

  removeIngredient(index: number, event: Event) {
    this.ingredients.splice(index, 1);
    event.stopPropagation();
  }
  
  

  onSearchBarBlur() {
    if (!this.buttonClicked) {
      this.isSearchBarFocused = false;
    }
    this.buttonClicked = false;
  }

  clearIngredients() {
    this.ingredients = [];
  }
  

  addIngredient() {
    if (this.newIngredient) {
      this.ingredients.push(this.newIngredient);
      this.newIngredient = '';
    }
    this.buttonClicked = true;
  }

  ingredientsInput = '';
  bestMatches: any[] = [];
  ingredients: string[] = [];
  buttonClicked = false;





  async getBestMatches() {
    const ingredients = this.ingredientsInput.split(',');
    this.bestMatches = await this.mealService.getRecipieByIngredients(
      ingredients
    );
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
