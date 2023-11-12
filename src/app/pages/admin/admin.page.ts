import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AdminAddRecipeModalPage } from 'src/app/modals/admin-add-recipe-modal/admin-add-recipe-modal.page';
import { AdminUpdateRecipeModalPage } from 'src/app/modals/admin-update-recipe-modal/admin-update-recipe-modal.page';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  async create() {
    const modal = await this.modalCtrl.create({
      component: AdminAddRecipeModalPage,
      cssClass: 'admin-modal',
    });

    await modal.present();
  }

  async update() {
    const modal = await this.modalCtrl.create({
      component: AdminUpdateRecipeModalPage,
      cssClass: 'admin-modal',
    });

    await modal.present();
  }
}
