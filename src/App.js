import './App.css';
import React ,{useState,useEffect} from "react";
import TbcChart from './TbcChart';
import StatChart from './StatChart'; 
import StatChart2 from './StatChart2.js'


let currentTime = Date.now();
let lastTime = 0;
let distance = [];
let startTime;
let maxTime=5;
let avgTBC = (0).toFixed(2); //time between clicks
let cps = (0).toFixed(3);
let sd = (0).toFixed(3);

function App() {
  const [totalClicks,setTotalClicks]=useState(0);
  const [seconds, setSeconds] = useState(maxTime.toFixed(2));
  const [isActive, setIsActive] = useState(false);
  
  const increase=()=>{
    currentTime = Date.now();
    if(!isActive && seconds>0) {
      setTotalClicks(totalClicks+1);
      setIsActive(!isActive);
      startTime = Date.now();
    }    
    if(lastTime>0 && calcT()>=0){
      setTotalClicks(totalClicks+1);
      distance.push(currentTime - lastTime);  
      //console.log(distance);        
    }
    lastTime = currentTime;
  }

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(calcT());
      }, 100);
    }
    if (isActive && seconds<=0) {
      setIsActive(!isActive);
      setSeconds((0).toFixed(2));
      clearInterval(interval);     
    }
    if(distance.length>0){
      avgTBC = (distance.reduce((sum,value) => sum + value)/distance.length).toFixed(2);
      cps = (1000/avgTBC).toFixed(3);
      //calculate standard deviation:
      sd = Math.sqrt((distance.reduce((variance,value) => variance + (avgTBC-value)**2,0)/distance.length)).toFixed(2);
    }

    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const reset=()=>{
    setTotalClicks(0);
    setSeconds(maxTime.toFixed(2));
    setIsActive(false);
    distance = [];
    lastTime = 0;
    avgTBC = (0).toFixed(2); //time between clicks
    cps = (0).toFixed(3);
    sd = (0).toFixed(3);
  }

  const calcT=()=>{
    return (maxTime - (Date.now()-startTime)/1000).toFixed(2);
  }

  return (
    <div>
    <div>
      <p>Clicks: {totalClicks}</p>
      <p> time:{seconds}s </p>
      <p>avgTBC: {avgTBC}ms cps: {cps} σ: {sd}</p>
      <button className= 'clickPad' id='mainButton' onClick={increase}>Click here to start</button>
      <button className= 'restartButton' id='restartButton' onClick={reset}>Reset</button>
      </div>
      {/*<TbcChart datapoints={distance} avgTBC={avgTBC} />*/}
      <StatChart avgTBC={avgTBC} sd={sd}/>
      {/*<StatChart2 avgTBC={avgTBC} sd={sd}/>*/}
      </div>

  );
}


export default App;
