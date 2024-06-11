import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuillConfigModule } from 'ngx-quill/config';
import { QuillModule } from 'ngx-quill';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmPopupComponent } from './common/confirm-popup/confirm-popup.component';
import { AccessDeniedComponent } from './common/access-denied/access-denied.component';
import { TeamDetailsComponent } from './common/team-details/team-details.component';
import { GenrateChatComponent } from './common/genrate-chat/genrate-chat.component';
import { AddAnnouncmentComponent } from './common/add-announcment/add-announcment.component';
import { PieChartComponent } from './common/pie-chart/pie-chart.component';
import { RatingComponent } from './common/rating/rating.component';
@NgModule({
  declarations: [
    AppComponent,
    ConfirmPopupComponent,
    AccessDeniedComponent,
    TeamDetailsComponent,
    GenrateChatComponent,
    AddAnnouncmentComponent,
    PieChartComponent,
    RatingComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    NgxSpinnerModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule,
    QuillConfigModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      closeButton: true,
      timeOut: 3000,
      progressBar: true,
    }),
    QuillModule.forRoot(),
  ],
  exports:[
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
