import { Component, OnInit } from '@angular/core';
import { LogoutConfirmationModalPage } from '../modals/logout-confirmation-modal/logout-confirmation-modal.page';
import { AuthService } from '../services/auth-service/auth.service';
import { ModalController } from '@ionic/angular';
import { MealService } from '../services/meal-service/meal.service';
import { UpdateUserModalPage } from '../modals/update-user-modal/update-user-modal.page';
import { UserService } from '../services/user-service/user.service';

@Component({
  selector: 'app-malthes-lejeland',
  templateUrl: './malthes-lejeland.page.html',
  styleUrls: ['./malthes-lejeland.page.scss'],
})
export class MalthesLejelandPage implements OnInit {
  user: any;
  ingredientsInput = '';
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

  async logoutModal() {
    const modal = await this.modalCtrl.create({
      component: LogoutConfirmationModalPage,
      cssClass: 'my-modal',
    });
    await modal.present();
  }

  async getBestMatches() {
    const ingredients = this.ingredientsInput.split(',');
    this.bestMatches = await this.MealService.getRecipieByIngredients(
      ingredients
    );
  }

  async updateUser() {
    const modal = await this.modalCtrl.create({
      component: UpdateUserModalPage,
      breakpoints: [0, 0.3, 0.65, 0.8],
      initialBreakpoint: 0.65,
      componentProps: { user: this.user },
      presentingElement: await this.modalCtrl.getTop(),
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) {
      this.user = data;
    }
  }

  getIngredients(cocktail: any) {
    return this.MealService.getIngredients(cocktail);
  }
}
