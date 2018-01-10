import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { ProductionHouseRoutingModule } from './production-house-routing.module';
import { ProductionHouseComponent } from './production-house.component';

@NgModule({
  imports: [
    CommonModule,
    ProductionHouseRoutingModule,
    RouterModule,
    SharedModule
  ],
  declarations: [ProductionHouseComponent]
})
export class ProductionHouseModule { }
