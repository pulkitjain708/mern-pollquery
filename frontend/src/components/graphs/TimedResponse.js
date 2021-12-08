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

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  

let TimedResponse = ({timedQuery}) => {
    let center = {textAlign:"center"}
    let dv={height:"50%",width:"50%",textAlign:"center"}
    // console.log(data)
    return (
        <div style={dv}>
        <p style={center}>Timed Responses</p>
        {timedQuery.length===0?"Loading...":<Line data={timedQuery.data}  
   options={timedQuery.options} />}  
    
    </div>
    );
}

export default TimedResponse;