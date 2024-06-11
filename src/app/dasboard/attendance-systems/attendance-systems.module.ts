import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AttendanceSystemsRoutingModule } from './attendance-systems-routing.module';
import { AttendanceSystemsComponent } from './attendance-systems.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { AttendanceReportComponent } from './attendance-report/attendance-report.component';
import { LeaveRequestComponent } from './leave-request/leave-request.component';
import { AddLeaveRequestComponent } from './add-leave-request/add-leave-request.component';
import { QuillModule } from 'ngx-quill'
import { AddAttendanceComponent } from '../../common/add-attendance/add-attendance.component';

@NgModule({
  declarations: [
    AttendanceSystemsComponent,
    AttendanceComponent,
    AttendanceReportComponent,
    LeaveRequestComponent,
    AddLeaveRequestComponent,
    AddAttendanceComponent
  ],
  imports: [
    CommonModule, FormsModule,
    AttendanceSystemsRoutingModule,QuillModule.forRoot()
  ],
  entryComponents: [AddAttendanceComponent],
  providers:[DatePipe]
})
export class AttendanceSystemsModule { }
