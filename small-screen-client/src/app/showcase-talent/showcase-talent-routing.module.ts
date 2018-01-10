import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileComponent } from '../shared/components/profile/profile.component';
import { ShowcaseTalentComponent } from './showcase-talent.component';

const routes: Routes = [
  { path:'', 
    component:ShowcaseTalentComponent,
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
export class ShowcaseTalentRoutingModule { }
