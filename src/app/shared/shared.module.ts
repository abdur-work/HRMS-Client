import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UploadFileComponent } from '../common/upload-file/upload-file.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FilterPipe } from '../custom-pipes/filter.pipe';
import { DeleteConfirmationComponent } from '../common/delete-confirmation/delete-confirmation.component';
import { PersonalInformationComponent } from '../dasboard/employees/components/personal-information/personal-information.component';
import { SalaryComponent } from '../dasboard/employees/components/salary/salary.component';
import { BankDetailComponent } from '../dasboard/employees/components/bank-detail/bank-detail.component';
import { AddSalaryComponent } from '../../app/common/add-salary/add-salary.component';
import { SaveBankDetailComponent } from '../../app/common/save-bank-detail/save-bank-detail.component';

@NgModule({
  declarations: [UploadFileComponent, DeleteConfirmationComponent, FilterPipe, PersonalInformationComponent, SalaryComponent, BankDetailComponent,
    AddSalaryComponent, SaveBankDetailComponent],
  imports: [
    CommonModule, FormsModule
  ],
  exports: [UploadFileComponent, NgxPaginationModule, FilterPipe, PersonalInformationComponent, SalaryComponent, BankDetailComponent, DeleteConfirmationComponent],
  entryComponents: [AddSalaryComponent, SaveBankDetailComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class SharedModule { }
