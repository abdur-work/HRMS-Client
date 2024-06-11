import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DasboardRoutingModule } from './dasboard-routing.module';
import { DasboardComponent } from './dasboard.component';
import { FormsModule } from '@angular/forms';
import { PieChartComponent } from 'src/app/common/pie-chart/pie-chart.component';

@NgModule({
  declarations: [
    DasboardComponent
  ],
  imports: [
    CommonModule,
    DasboardRoutingModule, FormsModule,
  ],
  exports: []
})
export class DasboardModule { }
