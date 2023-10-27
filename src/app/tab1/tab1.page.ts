import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  isClicked: boolean = false;

  constructor() {}
  
  showMore() {
  
    // Toggle the 'isClicked' variable to true to trigger the CSS class change
    this.isClicked = true;

    // Add a setTimeout to reset the 'isClicked' variable after a short delay to remove the effect
    setTimeout(() => {
      this.isClicked = false;
    }, 250); // Reset after 250 milliseconds (adjust as needed)
  }
}
