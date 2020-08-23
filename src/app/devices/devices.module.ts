import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DevicesRoutingModule } from './devices-routing.module';
import { DevicesComponent } from './devices.component';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
  declarations: [DevicesComponent],
  imports: [
    CommonModule,
    DevicesRoutingModule,
    MatListModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule
  ]
})
export class DevicesModule { }
