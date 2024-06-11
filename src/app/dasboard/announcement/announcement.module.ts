import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnnouncementRoutingModule } from './announcement-routing.module';
import { AnnouncementComponent } from './announcement.component';
import { SharedModule } from '../../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { FilterByTitlePipe } from './filter-by-title.pipe';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AnnouncementComponent,
    FilterByTitlePipe
  ],
  imports: [
    CommonModule,HttpClientModule,FormsModule,
    AnnouncementRoutingModule,
    SharedModule,
  ]
})
export class AnnouncementModule { }
