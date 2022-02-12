import './StatChart2.css';
import React, { Component }  from 'react';
import {Bar} from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

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
    duration: 500
  },
};

export default class StatChart2 extends React.Component {
  constructor(props) {
    super(props);
    this.chartReference = React.createRef();
    console.log(this.chartReference);
    this.state = {
      index: 1,
      dataStatsState: {
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
      }
    }

  }
  componentDidUpdate() {
    const chart = this.chartReference.current.chartInstance;
    //chart.data.datasets[0].data[0] = Math.round(this.props.avgTBC);
    dataStats.datasets[0].data[0] = Math.round(this.props.avgTBC);
    dataStats.datasets[1].data[0] = Math.round(this.props.sd); 
    console.log(this.chartReference.current.chartInstance);
  }
  render() {
    return (
        

        <Bar ref={this.chartReference} data={this.state.dataStatsState} options={options} />

    );
  }
}
/*
      <div id='statChart2'>
        <Bar ref={this.chartReference} data={dataStats} options={options} />
      </div>
import './StatChart2.css';
import React from 'react';
import {Bar} from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

let state = {
  labels: ['January', 'February', 'March',
           'April', 'May'],
  datasets: [
    {
      label: 'abc',
      backgroundColor: 'rgba(75,192,192,1)',
      borderColor: 'rgba(0,0,0,1)',
      borderWidth: 2,
      data: [65, 59, 80, 81, 56]
    }
  ]
}

let options2 = {
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Your Stats',
    },
  },
}

export default class StatChart2 extends React.Component {
  render() {
    return (
        
      <div id='statChart2'>
        <p>{this.props.title}</p>
        <Bar data={state} options={options2} />
      </div>
    );
  }
}
*/