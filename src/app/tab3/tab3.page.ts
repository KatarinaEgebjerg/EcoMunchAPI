import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  login: any = { username: 'Anna', password: '' };

  
  constructor() {}
  onLogin() {
    console.log('user name:', this.login.username );
    console.log('user password', this.login.password );
  }

  setLoginData() {
    this.login.username = 'edupala.com';
    this.login.password = '12345';
  }
  
}
