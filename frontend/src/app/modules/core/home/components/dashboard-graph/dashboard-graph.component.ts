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
    const ctx = (document.getElementById('myChart') as HTMLCanvasElement).getContext('2d')!;
    let chart: Chart;

    const updateChart = () => {
      if (chart) {
        chart.destroy();
      }

      chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: data.map(dto => `${new Date(0, dto.month).toLocaleString('default', { month: 'long' })} ${dto.year}`),
          datasets: [{
            label: 'Liczba dostaw',
            data: data.map(dto => dto.deliveries.length),
            borderColor: 'rgb(75,157,192)',
            borderWidth: 1,
            fill: true
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    };

    updateChart();

    window.addEventListener('resize', updateChart);
  }

}
