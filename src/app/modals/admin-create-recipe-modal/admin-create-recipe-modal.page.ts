import { Component, OnInit } from '@angular/core';
import { NodeJsExpressService } from 'src/app/services/node-js-express-service/node-js-express.service';

@Component({
  selector: 'app-admin-create-recipe-modal',
  templateUrl: './admin-create-recipe-modal.page.html',
  styleUrls: ['./admin-create-recipe-modal.page.scss'],
})
export class AdminCreateRecipeModalPage implements OnInit {
  tutorial = {
    title: '',
    description: '',
    published: false
  };
  submitted = false;

  constructor(private NodeJsExpressService: NodeJsExpressService) { }

  ngOnInit() {
  }
  saveTutorial() {
    const data = {
      title: this.tutorial.title,
      description: this.tutorial.description
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

  newTutorial() {
    this.submitted = false;
    this.tutorial = {
      title: '',
      description: '',
      published: false
    };
  }
}
