import './TbcChart.css';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import React ,{useState} from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  animation:{
    duration: 0
  },
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Time between clicks in ms',
    },
  },
  scales: {
    y: {
      min: 0,
      suggestedMax: 300,
    },
    x: {
      min: 0,

    }
  },
};

let index = 0;

let data = {
  labels : [],
  datasets: [
    {
      label: 'your results',
      data: [],
      //borderColor: 'rgb(255, 99, 132)',
      borderColor: 'rebeccapurple',
      backgroundColor: 'rebeccapurple',
    },
    {
      label: 'avg',
      data: [],
      borderColor: 'red',
      backgroundColor: 'red',
      pointRadius: 0,
    },
  ],
};

let showLastPoint = 0;

function TbcChart(props) {
  const [t,setT]=useState(0);
  let lastPoint = props.datapoints[props.datapoints.length-1];
  
  //console.log(lastPoint);
  if((lastPoint !== showLastPoint) && lastPoint) {
    setT(lastPoint);
    showLastPoint = lastPoint;
    //console.log(showLastPoint , lastPoint, (lastPoint !== showLastPoint));
    data.datasets[0].data.push(lastPoint);
    data.datasets[1].data.push(props.avgTBC);
    data.datasets[1].data = data.datasets[1].data.map((el) => el = props.avgTBC);
    data.labels.push(++index);
    //console.log(index);
  }
  if(props.datapoints.length===0){
    data.datasets[0].data = [];
    data.datasets[1].data = [];
    data.labels = [];
    index = 0; 
    //console.log(data.labels,data.datasets[0].data);
  }
  return  (
    <div id='tbcChart'>
    <Line options={options} data={data} key={Math.random()}/>
    </div>
  );
}

export default TbcChart;
