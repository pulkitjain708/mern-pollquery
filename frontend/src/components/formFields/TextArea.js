import '../../styles/inputComponents/TextArea.css'
import {useState} from 'react';

let TextArea = props =>{
    let {label,placeholder,required,onChange} = props;
    let [value,setValue]=useState("");
    let unique = Math.random().toString(36).slice(3,7);
    return (
        <div>
            <label for={unique}><b>{label}</b></label>
            <textarea
            name={label}
            value={value}
            onChange={e=>setValue(e.target.value)}
            // onChange={onChange}
            required={required}
            name={label} placeholder={placeholder} 
            style={{height:"200px"}}></textarea>
        </div>
    );
}

export default TextArea