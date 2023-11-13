import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PasswordEntryModalPageRoutingModule } from './password-entry-modal-routing.module';

import { PasswordEntryModalPage } from './password-entry-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PasswordEntryModalPageRoutingModule
  ],
  declarations: [PasswordEntryModalPage]
})
export class PasswordEntryModalPageModule {}
