import './TbcChart.css';
import React from 'react';
import { useState, memo } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

let options = {
  responsive: true,
  maintainAspectRatio: false,
  animation: {
    duration: 200,
    easing: 'linear',
  },
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Time between clicks in ms',
      color: 'white',
    },
  },
  scales: {
    y: {
      min: 0,
      suggestedMax: 300,
      ticks: {
        color: 'white',
      },
    },
    x: {
      min: 0,
      ticks: {
        color: 'white',
      },
    },
  },
  color: 'white',
};

let data = {
  labels: [],
  datasets: [
    {
      label: 'your results',
      data: [],
      borderColor: 'rgba(255, 185, 221, 1)',
      backgroundColor: 'rgba(255, 185, 221, 1)',
    },
    {
      label: 'avg',
      data: [],
      borderColor: 'rgba(0, 255, 0, 0.67)',
      backgroundColor: 'rgba(0, 255, 0, 0.67)',
      pointRadius: 0,
    },
  ],
};

let showLastPoint = 0;

function TbcChart(props) {
  const [t, setT] = useState(0);
  let lastPoint = props.datapoints[props.datapoints.length - 1];

  if (lastPoint !== showLastPoint && lastPoint) {
    setT(lastPoint);
    showLastPoint = lastPoint;
    data.datasets[0].data = props.datapoints.slice(0);
    data.datasets[1].data = props.datapoints.slice(0);
    data.datasets[1].data = data.datasets[1].data.map((el) => (el = props.avgTBC));
    data.labels = data.datasets[1].data.map((el, index) => (el = index + 2));
  }
  if (props.datapoints.length === 0) {
    data.datasets[0].data = [];
    data.datasets[1].data = [];
    data.labels = [];
  }

  let d = JSON.parse(JSON.stringify(data)); //deep clone object

  return (
    <div className="tbcChart">
      <Line options={options} data={d} id="line1" />
    </div>
  );
}

export default memo(TbcChart);
