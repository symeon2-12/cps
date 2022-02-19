import './StatChart.css';
import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

let options = {
  responsive: true,
  maintainAspectRatio: false,
  indexAxis: 'y',
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Your Stats',
      color: 'white',
    },
    datalabels: {
      display: true,
      anchor: 'center',
      color: 'white',
      font: {
        size: '25',
      },
    },
  },
  animation: {
    duration: 200,
  },
  scales: {
    y: {
      ticks: {
        color: 'white',
      },
    },
    x: {
      min: 0,
      max: 100,
      ticks: {
        color: 'white',
      },
    },
  },
  color: 'white',
};

let dataStats = {
  labels: [''],
  datasets: [
    {
      label: 'speed',
      data: [],
      backgroundColor: 'rgba(255, 99, 132, 1)',
    },
    {
      label: 'consistency',
      data: [],
      backgroundColor: 'rgba(53, 162, 235, 1)',
    },
  ],
};

function StatChart(props) {
  dataStats.datasets[0].data[0] = Math.round(props.avgTBC);
  dataStats.datasets[1].data[0] = Math.round(props.sd);

  let d = JSON.parse(JSON.stringify(dataStats)); //deep clone object
  return (
    <div className="statChart">
      <Bar options={options} data={d} plugins={[ChartDataLabels]} className="barChart" />
    </div>
  );
}
export default StatChart;
