import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { UpdateUserModalPageRoutingModule } from './update-user-modal-routing.module';
import { UpdateUserModalPage } from './update-user-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    UpdateUserModalPageRoutingModule,
  ],
  declarations: [UpdateUserModalPage],
})
export class UpdateUserModalPageModule {}
