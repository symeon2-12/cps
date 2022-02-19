import './App.css';
import React, { useState, useEffect } from 'react';
import TbcChart from './TbcChart';
import StatChart from './StatChart';

let currentTime = Date.now();
let lastTime = 0;
let distance = [];
let startTime;
let maxTime = 5;
let avgTBC = (0).toFixed(2); //time between clicks
let cps = (0).toFixed(3);
let sd = (0).toFixed(3);
let normalizedCps = cps;
let normalizedSd = sd;
let circList = [];
let svgList;

function App() {
  const [totalClicks, setTotalClicks] = useState(0);
  const [seconds, setSeconds] = useState(maxTime.toFixed(2));
  const [isActive, setIsActive] = useState(false);

  const increase = (e) => {
    let btnXY = document.getElementsByClassName('clickPad')[0].getBoundingClientRect();
    const pushCircle = () => {
      circList.push([e.pageX - btnXY.x, e.pageY - btnXY.y]);
    };

    currentTime = Date.now();
    if (!isActive && seconds > 0) {
      setTotalClicks(totalClicks + 1);
      setIsActive(!isActive);
      startTime = Date.now();
      pushCircle();
    }
    if (lastTime > 0 && calcT() >= 0) {
      setTotalClicks(totalClicks + 1);
      distance.push(currentTime - lastTime);
      if (circList > 0) {
        document.getElementById('an0').beginElement();
      }
      //console.log(document.getElementById('an0'));
      pushCircle();
    }
    lastTime = currentTime;
    //console.log(e.pageX, e.pageY);
    //console.log(circList);
  };

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(calcT());
      }, 100);
    }
    if (isActive && seconds <= 0) {
      setIsActive(!isActive);
      setSeconds((0).toFixed(2));
      clearInterval(interval);
      document.getElementsByClassName('cps')[0].style.color = 'yellow';
      document.getElementsByClassName('cps')[0].style.fontSize = '2.5em';
      circList = [];
    }
    if (distance.length > 0) {
      avgTBC = (distance.reduce((sum, value) => sum + value) / distance.length).toFixed(2);
      cps = (1000 / avgTBC).toFixed(3);
      //calculate standard deviation:
      sd = Math.sqrt(distance.reduce((variance, value) => variance + (avgTBC - value) ** 2, 0) / distance.length).toFixed(2);
    }

    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const reset = () => {
    setTotalClicks(0);
    setSeconds(maxTime.toFixed(2));
    setIsActive(false);
    distance = [];
    lastTime = 0;
    avgTBC = (0).toFixed(2); //time between clicks
    cps = (0).toFixed(3);
    sd = (0).toFixed(3);
    document.getElementsByClassName('cps')[0].style.color = null;
    document.getElementsByClassName('cps')[0].style.fontSize = null;
    circList = [];
  };

  const calcT = () => {
    return (maxTime - (Date.now() - startTime) / 1000).toFixed(2);
  };
  const setMaxTime = (t) => {
    maxTime = t;
    reset();
  };

  normalizedCps = (cps / 15) * 100; //15 cps - 100%
  normalizedCps = normalizedCps > 100 ? 100 : normalizedCps;
  normalizedSd = 600 / (sd + 1);
  normalizedSd = normalizedSd > 100 ? 100 : normalizedSd;

  let circles = '';
  /*
  for (let i = 0; i++; i < circList.length) {
    circles =
      circles +
      (
        <circle className="crc" cx={String(circList[i][0])} cy={String(circList[i][1])} r="0" stroke="white" strokeWidth="1" fill="white" id={String('el' + i)} key={String('el' + i)}>
          <animate attributeName="r" from="25" to="0" dur="100s" repeatCount="" id={String('an' + i)} />
        </circle>
      );
  }
  */
  //console.log(String(circles));

  return (
    <div className="wrapper">
      <header className="main-head">
        <h1>CPS Test - Clicks per second test - {maxTime}s</h1>
      </header>
      <nav className="main-nav">
        <button className="timeChoice" value="1" onClick={(e) => setMaxTime(Number(e.target.value))}>
          1s
        </button>
        <button className="timeChoice" value="5" onClick={(e) => setMaxTime(Number(e.target.value))}>
          5s
        </button>
        <button className="timeChoice" value="10" onClick={(e) => setMaxTime(Number(e.target.value))}>
          10s
        </button>
        <button className="timeChoice" value="30" onClick={(e) => setMaxTime(Number(e.target.value))}>
          30s
        </button>
        <button className="timeChoice" value="60" onClick={(e) => setMaxTime(Number(e.target.value))}>
          60s
        </button>
      </nav>
      <div className="main-info">
        <p>
          Clicks: {totalClicks} time:{seconds}s
        </p>
        <p>
          avgTBC: {avgTBC}ms cps: <span className="cps">{cps}</span> σ: {sd}
        </p>
      </div>
      <div className="main-ui">
        <button className="clickPad" id="mainButton" onClick={increase}>
          <svg className="svg-pad" height="100%" width="100%">
            <text x="50%" y="50%" fontSize="20" fill="white" pointerEvents="none" textAnchor="middle" dominantBaseline="middle">
              Click here to start
            </text>
          </svg>
        </button>
        <button className="restartButton" id="restartButton" onClick={reset}>
          Reset
        </button>
      </div>
      <div className="main-chartTBC">
        <TbcChart datapoints={distance} avgTBC={avgTBC} />
      </div>
      <div className="main-chartStats">
        <StatChart avgTBC={normalizedCps} sd={normalizedSd} />
      </div>
      <footer className="main-footer">
        <p></p>
      </footer>
    </div>
  );
}

export default App;

/*
            {circList.length > 0 && (
              <circle className="crc" cx="10" cy="10" r="0" stroke="white" strokeWidth="4" fill="green">
                <animate attributeName="r" from="5" to="0" dur="1s" repeatCount="1" />
              </circle>
            )}

                      <svg className="svg-pad" height="100%" width="100%">
            {circList.map((el) => (
              <p>{el}</p>
            ))}

            <text x="50%" y="50%" fontSize="20" fill="white" pointerEvents="none" textAnchor="middle" dominantBaseline="middle">
              Click here to start
            </text>
          </svg>



<svg className="svg-pad" height="100%" width="100%">
            {circList.map((el) => (
              <circle className="crc" cx={String(el[0])} cy={String(el[1])} r="0" stroke="white" strokeWidth="1" fill="white" key={Math.random()}>
                <animate attributeName="r" from="5" to="0" dur="2s" repeatCount="" key={Math.random()} />
              </circle>
            ))}
            <text x="50%" y="50%" fontSize="20" fill="white" pointerEvents="none" textAnchor="middle" dominantBaseline="middle">
              Click here to start
            </text>
          </svg>


            {circList.map((el, index) => (
              <circle className="crc" cx={String(el[0])} cy={String(el[1])} r="0" stroke="white" strokeWidth="1" fill="white" id={String('el' + index)} key={String('el' + index)}>
                <animate xlinkHref={String('#el' + index)} attributeName="r" from="25" to="0" dur="100s" repeatCount="" id={String('an' + index)} />
              </circle>
            ))}
            <circle className="crc" cx="10" cy="10" r="0" stroke="white" strokeWidth="1" fill="white">
              <animate attributeName="r" from="25" to="0" dur="2s" repeatCount="" />
            </circle>
            */
