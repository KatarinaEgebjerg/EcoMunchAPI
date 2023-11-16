import { Component, OnInit } from '@angular/core';
import { ModalController} from '@ionic/angular';
import { AdminCreateRecipeModalPage} from '../../modals/admin-create-recipe-modal/admin-create-recipe-modal.page';
import { ModalService } from '../../services/modal-service/modal.service';
import { environment } from 'src/environments/environment';
import { AdminEditRecipeModalPage } from 'src/app/modals/admin-edit-recipe-modal/admin-edit-recipe-modal.page';
import { NodeJsExpressService } from 'src/app/services/node-js-express-service/node-js-express.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  password: string = '';
  tutorial: any | null = null;
  currentTutorial = null;
  message = '';

  constructor(
    private modalCtrl: ModalController,
    private modalService: ModalService,
    private modalController: ModalController,
    private NodeJsExpressService: NodeJsExpressService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }
  
  ngOnInit() {
    this.retrieveTutorial
  }

  retrieveTutorial() {
    this.NodeJsExpressService.getAll()
      .subscribe(
        data => {
          this.tutorial = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }


  async adminCreateRecipeModal() {
    const modal = await this.modalCtrl.create({
      component: AdminCreateRecipeModalPage,
      cssClass: 'admin-create-recipe-modal',
      breakpoints: [0, 0.3, 0.65, 0.8],
      initialBreakpoint: 0.65,
    });
    await modal.present();
  }

  async adminEditRecipeModal() {
    const modal = await this.modalCtrl.create({
      component: AdminEditRecipeModalPage,
      cssClass: 'admin-edit-recipe-modal',
      breakpoints: [0, 0.3, 0.65, 0.8],
      initialBreakpoint: 0.65,
    });
    await modal.present();
  }
  
  deleteTutorial() {
    this.NodeJsExpressService.delete(this.tutorial.id)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/admin']);
        },
        error => {
          console.log(error);
        });

}


}
