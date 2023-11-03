import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  activeTab: any;

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateActiveTab(event.urlAfterRedirects);
      }
    });
  }

  updateActiveTab(url: string) {
    if (url.startsWith('/tabs/home/profile')) {
      this.activeTab = null;
    } else if (url.startsWith('/tabs/home')) {
      this.activeTab = 'home'; 
    }
  }
  
  

}
