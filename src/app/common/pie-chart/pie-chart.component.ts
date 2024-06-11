import { Component } from '@angular/core';
// import * as CanvasJS from 'canvasjs';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent {
  ngAfterViewInit() {
    // let chart = new CanvasJS.Chart('chartContainer', this.chartOptions);
    // chart.render();
  }
  chartOptions = {
    animationEnabled: true,
    title: {
      text: 'Sales by Department',
    },
    data: [
      {
        type: 'pie',
        startAngle: -90,
        indexLabel: '{name}: {y}',
        yValueFormatString: "#,###.##'%'",
        dataPoints: [
          { y: 14.1, name: 'Toys' },
          { y: 28.2, name: 'Electronics' },
          { y: 14.4, name: 'Groceries' },
          { y: 43.3, name: 'Furniture' },
        ],
      },
    ],
  };
}
