import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccessDeniedComponent } from './common/access-denied/access-denied.component';
import { AuthGuard } from './core/auth.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  {
    path: 'dashboard',
     canActivate: [AuthGuard],
    data: {
      requiredRoles: [101]
    },
    loadChildren: () => import('./dasboard/dasboard.module').then(m => m.DasboardModule)
  },
  { path: 'access-denied', component: AccessDeniedComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
