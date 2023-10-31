import { Component } from '@angular/core';
import { AuthService } from '../services/auth-service/auth.service';
import { MealService } from '../services/meal-service/meal.service';
import { UserService } from '../services/user-service/user.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(
    private authService: AuthService,
    private modalCtrl: ModalController,
    private MealService: MealService,
    private userService: UserService,
  ) {}
  user: any;
  favorites: any[] = [];
  ngOnInit() {
    this.authService.currentUser.subscribe((data) => {
      this.user = data;
    });
    console.log(this.user)
    this.getFavorites();
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
  
  async addFavorite() {
    const mealId = '52855'; // replace with your static meal id
  
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

