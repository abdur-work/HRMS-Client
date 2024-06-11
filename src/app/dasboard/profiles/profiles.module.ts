import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfilesRoutingModule } from './profiles-routing.module';
import { ProfilesComponent } from './profiles.component';
import { SharedModule } from '../../shared/shared.module'
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ProfilesComponent
  ],
  imports: [
    CommonModule,
    ProfilesRoutingModule,
    FormsModule,
    SharedModule
  ]
})
export class ProfilesModule { }
