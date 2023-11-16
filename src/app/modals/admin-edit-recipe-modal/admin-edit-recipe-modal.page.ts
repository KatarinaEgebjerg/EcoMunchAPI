import { Component, Input, OnInit } from '@angular/core';
import { NodeJsExpressService } from 'src/app/services/node-js-express-service/node-js-express.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from 'src/app/models/recipe.model';
import { ModalController} from '@ionic/angular';

@Component({
  selector: 'app-admin-edit-recipe-modal',
  templateUrl: './admin-edit-recipe-modal.page.html',
  styleUrls: ['./admin-edit-recipe-modal.page.scss'],
})
export class AdminEditRecipeModalPage implements OnInit {
  @Input() recipe: any;
  editedRecipe: any; 


  message = '';

  constructor(
    private NodeJsExpressService: NodeJsExpressService,
    private route: ActivatedRoute,
    private router: Router,
    private modalCtrl: ModalController,
    
  ) { }

  ngOnInit() {
//  this.editedRecipe = { ...this.recipe }

    console.log("Test", this.recipe)
    // const id = this.route.snapshot.paramMap.get('id');
    // if (id !== null) {
    //   this.getRecipe(id);
    // } else {
    //   // Handle the case where 'id' is null, e.g., show an error message or redirect
    // }
  }
  
  getRecipe(recipeid: any) {
    this.NodeJsExpressService.get(recipeid)
      .subscribe(
        (data: Recipe) => { 
          const recipeData = data;
          console.log(recipeData);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  updateRecipe() {
    this.NodeJsExpressService.update(this.recipe.id, this.recipe)
      .subscribe(
        response => {
          console.log(response);
          this.message = 'The recipe was updated successfully!';
        },
        error => {
          console.log(error);
        });
        this.modalCtrl.dismiss(this.recipe)
  }

}
