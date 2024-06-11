import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeaveSystemComponent } from './leave-system.component';

const routes: Routes = [{ path: '', component: LeaveSystemComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeaveSystemRoutingModule { }
