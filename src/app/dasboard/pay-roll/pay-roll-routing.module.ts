import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PayRollComponent } from './pay-roll.component';

const routes: Routes = [{ path: '', component: PayRollComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PayRollRoutingModule { }
