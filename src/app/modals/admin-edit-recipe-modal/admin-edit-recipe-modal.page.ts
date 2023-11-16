import { Component, OnInit } from '@angular/core';
import { NodeJsExpressService } from 'src/app/services/node-js-express-service/node-js-express.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from 'src/app/models/recipe.model';

@Component({
  selector: 'app-admin-edit-recipe-modal',
  templateUrl: './admin-edit-recipe-modal.page.html',
  styleUrls: ['./admin-edit-recipe-modal.page.scss'],
})
export class AdminEditRecipeModalPage implements OnInit {
  recipe: any | null = null;
  message = '';

  constructor(
    private NodeJsExpressService: NodeJsExpressService,
    private route: ActivatedRoute,
    private router: Router
    
  ) { }

  ngOnInit() {
    this.message = '';
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.getRecipe(id);
    } else {
      // Handle the case where 'id' is null, e.g., show an error message or redirect
    }
  }
  
  getRecipe(id:string) {
    this.NodeJsExpressService.get(id)
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

  updatePublished(status: boolean) {
    const data = {
      recipename: this.recipe.recipename,
      category: this.recipe.category,
      ingredientmeasurement: this.recipe.ingredientmeasurement,
      instructions: this.recipe.instructions,
      published: status
    };

    this.NodeJsExpressService.update(this.recipe.id, data)
      .subscribe(
        response => {
          this.recipe.published = status;
          console.log(response);
        },
        error => {
          console.log(error);
        });
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
  }

}
