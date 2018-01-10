import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileComponent } from '../shared/components/profile/profile.component';
import { ProductionHouseComponent } from './production-house.component';

const routes: Routes = [
  { path:'', 
    component:ProductionHouseComponent,
    children: [
      { path:'', redirectTo:'user-profile' },
      { path:'user-profile', component:ProfileComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductionHouseRoutingModule { }
