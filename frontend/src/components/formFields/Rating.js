import '../../styles/inputComponents/Rating.css'
import {useState} from 'react';

let Rating = props =>{
    let s = "⭐";
    let {label,required,onChange} = props;
    let unique = Math.random().toString(36).slice(3,7)
    let [rate,rateState]=useState(5);
    let r = no =>rateState(oldRate=>no);

    return (
        <div>
            <label for={unique}><b>{label} :{rate} <input type="hidden" value={rate} name={label}/> </b></label>
        <br/>
        <div required={required} 
        name={label}
        onChange={onChange}
         class="rating-container">
            <div class="col" onClick={()=>r(1)}>{rate>=1?s:" "}</div>
            <div class="col" onClick={()=>r(2)}>{rate>=2?s:" "}</div>
            <div class="col" onClick={()=>r(3)}>{rate>=3?s:" "}</div>
            <div class="col" onClick={()=>r(4)}>{rate>=4?s:" "}</div>
            <div class="col" onClick={()=>r(5)}>{rate>=5?s:" "}</div>
        </div>
        </div>
    );
}

export default Rating;