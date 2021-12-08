import '../../styles/inputComponents/Geolocation.css'
import {useState} from 'react';

let Geolocation = props => {
    let [loc,locState]=useState("");
    let {label,placeholder,required} = props;
    let unique = Math.random().toString(36).slice(3,7);
    let showPos=pos=>{
        let {coords} = pos;
        let {latitude,longitude}=coords;
        console.log(latitude,longitude)
     let url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=db481c0a86514b9482dab12b6e79a9a7&language=en`
        fetch(url)
        .then(r=>r.json())
        .then(data=>locState(data.results[0].formatted))
    }
    let fetchLoc=()=>{
        if(!navigator.geolocation)
        {
            alert("Browser does'nt support this feature")
        }
        else{
            navigator.geolocation.getCurrentPosition(showPos)
        }
    }

    return (
        <div>
            <label for={unique}><b>{label}</b></label>
            <br/>
            <div class="geo-container">
             <div class="col-geo">   
            <button
            onClick={fetchLoc}
            >Fetch Location</button>
            </div>
            <div class="col-geo"> 
            <input type="text" 
            name={label}
            required={required}
            placeholder={placeholder}
            value={loc}
             required></input>
            </div>
            </div>
        </div>
    );
    }

export default Geolocation