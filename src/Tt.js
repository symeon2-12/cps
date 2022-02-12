import React, { Component } from 'react';
import { render } from 'react-dom';
//import './style.css';
import { Doughnut } from 'react-chartjs-2'
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

class Tt extends Component {
  constructor() {
    super();
    
    this.chartReference = React.createRef();
    this.state = {
      name: 'React',      
      data: {
        labels: ['Red', 'Green', 'Blue'],
        datasets: [{
          data: [5, 7, 6],
          backgroundColor: ['red', 'green', 'blue']
        }]       
      }
    };

    setInterval(() => {
      const chart = this.chartReference.current.chartInstance;
      chart.data.datasets[0].data = [
        Math.floor(Math.random() * 10) + 1,
        Math.floor(Math.random() * 10) + 1, 
        Math.floor(Math.random() * 10) + 1
      ];
      chart.update();
    }, 2000); 
  }

  render() {
    return (
      <Doughnut ref={this.chartReference} data={this.state.data} />
    )
  }
}

export default Tt;
//render(<App />, document.getElementById('root'));
