import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LogoutConfirmationModalPageRoutingModule } from './logout-confirmation-modal-routing.module';

import { LogoutConfirmationModalPage } from './logout-confirmation-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LogoutConfirmationModalPageRoutingModule
  ],
  declarations: [LogoutConfirmationModalPage]
})
export class LogoutConfirmationModalPageModule {}
