import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { LogoutConfirmationModalPage } from '../modals/logout-confirmation-modal/logout-confirmation-modal.page';
import { UpdateUserModalPage } from '../modals/update-user-modal/update-user-modal.page';
import { AuthService } from '../services/auth-service/auth.service';
import { MealService } from '../services/meal-service/meal.service';
import { UserService } from '../services/user-service/user.service';



@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  login: any = { username: '', password: '' };
  user: any;
  onLogin() {
    console.log('user name:', this.login.username );
    console.log('user password', this.login.password );
  }
  ingredientsInput = '';
  bestMatches: any[] = [];
  favorites: any[] = [];

  constructor(
    private authService: AuthService,
    private modalCtrl: ModalController,
    private MealService: MealService,
    private userService: UserService,
  ) {}

  setLoginData() {
    this.login.username = 'edupala.com';
    this.login.password = '12345';
  }
  
  ngOnInit() {
    this.authService.currentUser.subscribe((data) => {
      this.user = data;
    });
    console.log(this.user)
    this.getFavorites();
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
      presentingElement: await this.modalCtrl.getTop() // This is necessary for the swipe to close feature to work correctly
    });
  
    await modal.present();
  
    const { data } = await modal.onWillDismiss();
    if (data) {
      // The user data was updated. Refresh the user data.
      this.user = data;
    }
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

  getIngredients(cocktail: any) {
    return this.MealService.getIngredients(cocktail);
  }

  async addFavorite() {
    const mealId = '52855'; // replace with your static meal id

    await this.userService.addToFavorites(this.user.uid, mealId);
    console.log('Meal added to favorites successfully');
  }
}
