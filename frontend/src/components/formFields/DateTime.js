import '../../styles/inputComponents/TextField.css'
import {useState} from "react"

let DateTime = props =>{
    let {label,placeholder,type,required} = props;
    let unique = Math.random().toString(36).slice(3,7)
    let [value,setValue]=useState("");
    return (
        <div>
            <label for={unique}><b>{label}</b></label>
            <br/>
            <input value={value}
            onChange={e=>setValue(e.target.value)}
             type={type} name={unique} name={label} 
             required={required}></input>
        </div>
    );
    }

export default DateTime;