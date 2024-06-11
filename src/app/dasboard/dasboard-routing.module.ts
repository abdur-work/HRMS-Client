import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/auth.guard';
import { DasboardComponent } from './dasboard.component';
import { TeamDetailsComponent } from '../common/team-details/team-details.component';
import { ChatComponent } from './chat/chat.component';

const routes: Routes = [{
  path: '', component: DasboardComponent,
  children: [
      { path: '', pathMatch: 'full', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
      { path: 'announcement', pathMatch: 'full', loadChildren: () => import('./announcement/announcement.module').then(m => m.AnnouncementModule) },
    {
      path: 'attendance-system',
      canActivate: [AuthGuard],
      data: {
        requiredRoles: [131]
      },
      loadChildren: () => import('./attendance-systems/attendance-systems.module').then(m => m.AttendanceSystemsModule)
    },
    { path: 'profile', loadChildren: () => import('./profiles/profiles.module').then(m => m.ProfilesModule) },
    {
      path: 'payroll',
      canActivate: [AuthGuard],
      data: {
        requiredRoles: [123]
      }, loadChildren: () => import('./pay-roll/pay-roll.module').then(m => m.PayRollModule)
    },
    {
      path: 'leavesystem',
      canActivate: [AuthGuard],
      data: {
        requiredRoles: [126]
      }, loadChildren: () => import('./leave-system/leave-system.module').then(m => m.LeaveSystemModule) },
    {
      path: 'jobs-applications',
      canActivate: [AuthGuard],
      data: {
        requiredRoles: [103]
      }, loadChildren: () => import('./job-application/job-application.module').then(m => m.JobApplicationModule) },
    {
      path: 'employees',
      canActivate: [AuthGuard],
      data: { requiredRoles: [108] }, loadChildren: () => import('./employees/employees.module').then(m => m.EmployeesModule)
      },
      { path: 'teamdetails', component: TeamDetailsComponent },
      {
        path: 'chat',
        
        loadChildren: () => import('./chat/chat.module').then(m => m.ChatModule)
        },
  ]
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DasboardRoutingModule { }
