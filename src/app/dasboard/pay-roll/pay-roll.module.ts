//import { NgModule } from '@angular/core';
//import { CommonModule } from '@angular/common';
//import { PayRollRoutingModule } from './pay-roll-routing.module';
//import { PayRollComponent } from './pay-roll.component';
//import { SharedModule } from '../../shared/shared.module';
//import { DatePipe } from '@angular/common'; // Import DatePipe
//import { AddPayRollComponent } from '../../common/add-pay-roll/add-pay-roll.component';
//import { EmployeeSalaryHistoryComponent } from '../../common/employee-salary-history/employee-salary-history.component';

//@NgModule({
//  declarations: [
//    PayRollComponent, AddPayRollComponent, EmployeeSalaryHistoryComponent
//  ],
//  imports: [
//    CommonModule,
//    PayRollRoutingModule,
//    SharedModule
//  ],
//  providers: [
//    DatePipe // Add DatePipe to providers
//  ],
//  entryComponents: [AddPayRollComponent, EmployeeSalaryHistoryComponent]
//})
//export class PayRollModule { }


import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PayRollRoutingModule } from './pay-roll-routing.module';
import { PayRollComponent } from './pay-roll.component';
import { SharedModule } from '../../shared/shared.module';
import { DatePipe } from '@angular/common'; // Import DatePipe
import { AddPayRollComponent } from '../../common/add-pay-roll/add-pay-roll.component';
import { EmployeeSalaryHistoryComponent } from '../../common/employee-salary-history/employee-salary-history.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    PayRollComponent, AddPayRollComponent, EmployeeSalaryHistoryComponent
  ],
  imports: [
    CommonModule,
    PayRollRoutingModule,
    SharedModule,
    FormsModule
  ],
  providers: [
    DatePipe // Add DatePipe to providers
  ],
  entryComponents: [AddPayRollComponent, EmployeeSalaryHistoryComponent]
})
export class PayRollModule { }
