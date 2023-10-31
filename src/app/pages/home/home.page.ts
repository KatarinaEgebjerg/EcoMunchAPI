import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {

  constructor(private navCtrl: NavController) {}

  navigateToProfile() {
    this.navCtrl.navigateForward('tabs/home/profile');
  }
  
  isClicked: boolean = false;

  showMore() {
  
    // Toggle the 'isClicked' variable to true to trigger the CSS class change
    this.isClicked = true;

    // Add a setTimeout to reset the 'isClicked' variable after a short delay to remove the effect
    setTimeout(() => {
      this.isClicked = false;
    }, 250); // Reset after 250 milliseconds (adjust as needed)
  }
}

