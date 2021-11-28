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


let EachUserResponse = ({eachUserConfig}) => {
    let center = {textAlign:"center"}
    let dv={height:"50%",width:"50%",textAlign:"center"}
    // console.log(data)
    return (
         <div style={dv}>
   
        <p style={center}>Each User Response Count</p>
        {eachUserConfig.length===0?"Loading...":<Bar data={eachUserConfig.data}  
   options={eachUserConfig.options} />}  
    
    </div>
    );
}

export default EachUserResponse;