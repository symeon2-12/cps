import './StatChart.css';
import React from 'react';
import ReactDOM from 'react-dom';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

let options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Your Stats',
    },
  },
  animation:{
    duration: 0
  },
};


let dataStats = {
  labels : ['Your stats'],
  datasets: [
    {
      label: 'speed',
      data: [20],
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'consistency',
      data: [40],
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

function StatChart(props) {
  const  divRef = React.useRef();
  //const chart = this.chartReference.current.chartInstance;
  console.log(divRef.current);
  if(typeof divRef.current !== 'undefined') {
    console.log(typeof divRef);
    divRef.current.update()
  }
  //divRef.current.update();
  dataStats.datasets[0].data[0] = Math.round(props.avgTBC);
  dataStats.datasets[1].data[0] = Math.round(props.sd);
  //console.log(props.avgTBC, props.sd);
  //console.log(dataStats);
  return (
  <div id="statChart">
  <Bar options={options} data={dataStats} ref={divRef}/>
  </div>
  );
}
export default StatChart;

/*
<Bar options={options} data={dataStats} key={Math.random()} />
*/