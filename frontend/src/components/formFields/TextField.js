import '../../styles/inputComponents/TextField.css'
import {useState} from 'react';

let TextField = props =>{
    let {label,placeholder,required,onChange} = props;
    let [value,setValue]=useState("");
    let unique = Math.random().toString(36).slice(3,7)
    return (
        <div>
            <label for={unique}><b>{label}</b></label>
            <input type="text"
            name={label}
            value={value}
            onChange={e=>setValue(e.target.value)}
            placeholder={placeholder}
             name={label} required={required}></input>
        </div>
    );
    }

export default TextField;