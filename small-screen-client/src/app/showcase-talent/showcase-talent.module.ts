import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';

import { ShowcaseTalentRoutingModule } from './showcase-talent-routing.module';
import { ShowcaseTalentComponent } from './showcase-talent.component';

@NgModule({
  imports: [
    CommonModule,
    ShowcaseTalentRoutingModule,
    SharedModule
  ],
  declarations: [ShowcaseTalentComponent]
})
export class ShowcaseTalentModule { }
