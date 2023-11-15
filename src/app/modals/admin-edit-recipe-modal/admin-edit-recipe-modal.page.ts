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
  tutorial: any | null = null;
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
      this.getTutorial(id);
    } else {
      // Handle the case where 'id' is null, e.g., show an error message or redirect
    }
  }
  
  getTutorial(id:string) {
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
      recipename: this.tutorial.recipename,
      category: this.tutorial.category,
      ingredientmeasurement: this.tutorial.ingredientmeasurement,
      instructions: this.tutorial.instructions,
      published: status
    };

    this.NodeJsExpressService.update(this.tutorial.id, data)
      .subscribe(
        response => {
          this.tutorial.published = status;
          console.log(response);
        },
        error => {
          console.log(error);
        });
  }

  updateTutorial() {
    this.NodeJsExpressService.update(this.tutorial.id, this.tutorial)
      .subscribe(
        response => {
          console.log(response);
          this.message = 'The tutorial was updated successfully!';
        },
        error => {
          console.log(error);
        });
  }

}
