import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AttendanceSystemsComponent } from './attendance-systems.component';
import { AddLeaveRequestComponent } from './add-leave-request/add-leave-request.component'
import { LeaveRequestComponent } from './leave-request/leave-request.component';

const routes: Routes = [{ path: '', component: AttendanceSystemsComponent },
{ path: 'add-leave-request', component: AddLeaveRequestComponent },
{ path: 'leave-request', component: LeaveRequestComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AttendanceSystemsRoutingModule { }
