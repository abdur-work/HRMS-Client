import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeaveSystemRoutingModule } from './leave-system-routing.module';
import { LeaveSystemComponent } from './leave-system.component';


@NgModule({
  declarations: [
    LeaveSystemComponent,
  ],
  imports: [
    CommonModule,
    LeaveSystemRoutingModule
  ]
})
export class LeaveSystemModule { }
