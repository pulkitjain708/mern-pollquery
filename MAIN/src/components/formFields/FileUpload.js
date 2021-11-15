import {useState} from 'react';
import '../../styles/inputComponents/FileUpload.css';

let FileUpload = props =>{
    let uploadFile = e =>{
        if(e.target.files && e.target.files[0])
        {
            let size= 15*1024*1024;
            if(e.target.files[0].size>size){
                alert('Max Limit Reached');
               // e.target.value=" "
                return;
            }
        }
    }
    let {label,accept,required} = props;
    if(!accept)
    accept="*"
    let unique = Math.random().toString(36).slice(3,7)
    return (
        <div>
            <label for={unique}><b>{label}</b></label>
            <br/>
            <div class = 'container-fileupload'>
                <div>
                <input 
                name={label}
                required={required}
                type="file" 
                onChange={uploadFile}
                accept={accept}/>
                </div>
                <div>
                    <button>Submit</button>
                </div>
            </div>
        </div>
    );
}

export default FileUpload;