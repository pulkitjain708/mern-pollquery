import FormFieldMapper from "./aggregated";
import Card from '../containers/card'
import {useState} from 'react';

let FormRender = props =>
    {           
        let {list,removeFromList,
            editRequiredProps,
            editDateTimeProps,editFileUploadProps,editSelectProps
        } = props;
        
        let [selectText,selectTextState]=useState("");

        let DateFileSelect = componentName => {
            return {
                'FileUpload':(id)=>{
                    return (
                    <select 
                    onChange={(e)=>editFileUploadProps(id,e.target.value)}
                    id="uploadopts"> 
                    <option value="image/*">Image</option>,
                    <option value=".doc,.docx,.pdf">Document</option>,
                    <option value="video/* , audio/*">Media </option>    
                    </select>
                    )
                },
                'Select':(id)=>{
                        return (
                            <span>&nbsp;&nbsp;&nbsp;&nbsp;<input onChange={e=>selectTextState(e.target.value)} 
                            style={{width:"30%"}} type="text"/><button
                            onClick={()=>editSelectProps(id,selectText)}
                            >+</button></span>
                        );
                },
                'DateTime':(id)=>{
                    return (
                        <select 
                        onChange={(e)=>editDateTimeProps(id,e.target.value)}
                        id="dateopts"> 
                        <option value="datetime-local">Date Time</option>,
                        <option value="date">Date</option>,
                        <option value="time">Time</option>    
                        </select>
                        )
                }
            }[componentName]
        }
        let renderdFormComponents = list.map((l)=>
            {
                let {question,componentName,id,required} = l;
                let OComponent = FormFieldMapper[componentName];
                let OptComponent=['FileUpload','Select','DateTime'].includes(componentName)===true?DateFileSelect(componentName)(id):null;
                let optProps=null;
                if(l.date_value)
                optProps={type:l.date_value}
                if(l.file_value)
                optProps={accept:l.file_value}
                if(l.options_value)
                optProps={options:l.options_value}
                return (
                    <div class="container">
                <Card key={id}>
                    <OComponent 
                {...optProps}
                required={required}
                label={question}/></Card>
              
                <div>
                    <button onClick={e=>removeFromList(id)}>Remove</button>
                    <input type="checkbox" id={`required-${id}`}
                     onChange={()=>editRequiredProps(id)} checked={required}/>
                    <label for={`required-${id}`}>required</label>
                    {OptComponent}
                </div>
                    </div>
                );
            }
            );

        return (
            <div>
                {renderdFormComponents}
            </div>
        );
    }

export default FormRender