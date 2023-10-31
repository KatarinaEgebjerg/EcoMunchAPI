import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MalthesLejelandPageRoutingModule } from './malthes-lejeland-routing.module';

import { MalthesLejelandPage } from './malthes-lejeland.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MalthesLejelandPageRoutingModule
  ],
  declarations: [MalthesLejelandPage]
})
export class MalthesLejelandPageModule {}
