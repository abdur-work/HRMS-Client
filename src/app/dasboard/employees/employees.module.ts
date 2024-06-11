import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module'
import { EmployeesRoutingModule } from './employees-routing.module';
import { EmployeesComponent } from './employees.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { QuillModule } from 'ngx-quill';
import { EmployeeDetailComponent } from './components/employee-detail/employee-detail.component';
import { WebcamModule } from 'ngx-webcam';
import { WebcamComponent } from '../../common/webcam/webcam.component';
import { EditEmployeeComponent } from '../../common/edit-employee/edit-employee.component';
// import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';

@NgModule({
  declarations: [
    EmployeesComponent,
    AddEmployeeComponent,
    EmployeeDetailComponent,
    WebcamComponent,
    EditEmployeeComponent
  ],
  imports: [
    CommonModule, FormsModule, WebcamModule,
    SharedModule, EmployeesRoutingModule, QuillModule.forRoot()
  ],
  entryComponents: [EditEmployeeComponent]
})
export class EmployeesModule { }
