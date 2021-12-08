import React, { PureComponent } from 'react';
import {useNavigation,useParams} from 'react-router-dom';
import {useState,useEffect} from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

let Ratio = ({ratioConfig}) => {
    ChartJS.register(ArcElement, Tooltip, Legend);
    let center = {textAlign:"center"}
    let dv={height:"50%",width:"50%",textAlign:"center"}
    console.log("ratioConfig",ratioConfig)
    return (
        <div style={dv}>
   
        <p style={center}>Responed to Not Responded Ratio</p>
        {ratioConfig.length===0?"Loading...":<Pie data={ratioConfig}  
   options={{
    responsive: true,
    maintainAspectRatio: true,
  }} />}  
    
    </div>
    );
}

export default Ratio;