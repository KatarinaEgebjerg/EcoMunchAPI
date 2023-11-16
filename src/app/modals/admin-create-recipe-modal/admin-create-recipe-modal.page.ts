import { Component, OnInit } from '@angular/core';
import { NodeJsExpressService } from 'src/app/services/node-js-express-service/node-js-express.service';

@Component({
  selector: 'app-admin-create-recipe-modal',
  templateUrl: './admin-create-recipe-modal.page.html',
  styleUrls: ['./admin-create-recipe-modal.page.scss'],
})
export class AdminCreateRecipeModalPage implements OnInit {
  recipe = {
    recipename: '',
    category: '',
    ingredientmeasurement: '',
    instructions:'',
    published: false
  };
  submitted = false;

  constructor(private NodeJsExpressService: NodeJsExpressService) { }

  ngOnInit() {
  }
  saveRecipe() {
    const data = {
      recipename: this.recipe.recipename,
      category: this.recipe.category,
      ingredientmeasurement: this.recipe.ingredientmeasurement,
      instructions: this.recipe.instructions
    };

    this.NodeJsExpressService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }

  newRecipe() {
    this.submitted = false;
    this.recipe = {
      recipename: '',
      category: '',
      ingredientmeasurement: '',
      instructions:'',
      published: false
    };
  }
}
