import { Component, Input, OnInit } from '@angular/core';
import { Chart, registerables } from "chart.js";
import { DeliveryGraphDTO } from "../../models/DeliveryGraphDTO";

@Component({
  selector: 'app-dashboard-graph',
  templateUrl: './dashboard-graph.component.html',
  styleUrl: './dashboard-graph.component.scss'
})
export class DashboardGraphComponent implements OnInit {
  @Input() graphDTOs: DeliveryGraphDTO[];

  ngOnInit() {
    Chart.register(...registerables);
    this.createChart(this.graphDTOs);
  }

  createChart(data: DeliveryGraphDTO[]): void {
    data = data.sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime())

    const ctx = (document.getElementById('myChart') as HTMLCanvasElement).getContext('2d')!;
    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.map(dto => new Date(0, dto.label).toLocaleString('default', { month: 'long' })),
        // labels,
        datasets: [{
          label: 'Liczba dostaw',
          data: data.map(dto => dto.count),
          borderColor: 'rgb(75,157,192)',
          borderWidth: 1,
          fill: false,
          tension: 0.2
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
    console.log(chart)
  }
}
