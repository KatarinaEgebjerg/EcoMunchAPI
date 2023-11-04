import { UserService } from './../../services/user-service/user.service';
import { Component } from '@angular/core';
import { ModalController, NavController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { MealService } from 'src/app/services/meal-service/meal.service';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { DishDetailsModalPage } from 'src/app/modals/dish-details-modal/dish-details-modal.page';

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
  categories: any[] = [];
  recipeIngredients: any[] = [];
  ingredients: string[] = []; // All available ingredients
  filteredIngredients: string[] = []; // Ingredients that match the user's input

  constructor(
    private navCtrl: NavController,
    private mealService: MealService,
    private userService: UserService,
    private authService: AuthService,
    private toastController: ToastController,
    private http: HttpClient,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.authService.currentUser.subscribe(async (user) => {
      this.user = user;
      if (user) {
        await this.getFavorites();
      }
    });
    this.http.get<{meals: {idIngredient: string, strIngredient: string}[]}>('../../../assets/ingredients.json').subscribe((data) => {
      this.ingredients = data.meals.map(meal => meal.strIngredient);
    });  
    this.latestmeal();
    this.randomMeals();
  }

  async dishDetailsModal(meal: any) {
    const modal = await this.modalCtrl.create({
      component: DishDetailsModalPage,
      cssClass: 'dish-detail-modal',
      componentProps: {
        'meal': meal
      }
    });
  
    modal.onDidDismiss().then(() => {
      console.log('The dish details modal was dismissed');
      this.getFavorites();
    });
  
    await modal.present();
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

  getItems(ev: any) {
    const val = ev.target.value;
  
    if (val && val.trim() !== '') {
      this.filteredIngredients = this.ingredients.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    } else {
      this.filteredIngredients = [];
    }
  }
  
  selectIngredient(ingredient: string) {
    this.newIngredient = ingredient;
    this.addUserIngredient(ingredient);
    this.filteredIngredients = [];
  }
  
  addUserIngredient(ingredient: string) {
    if (ingredient && !this.userIngredients.includes(ingredient)) {
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

  truncateMealName(
    mealName: string,
    maxNameLength: number,
    maxWordLength: number
  ) {
    let words = mealName.split(' ');
    words = words.map((word) => {
      if (word.length > maxWordLength) {
        return word.substring(0, maxWordLength) + '...';
      } else {
        return word;
      }
    });
    let truncatedName = words.join(' ');
    if (truncatedName.length > maxNameLength) {
      return truncatedName.substring(0, maxNameLength) + '...';
    } else {
      return truncatedName;
    }
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
}
