import FormRender from "./FormRender";
import Interface from "./Interface";
import {useState} from "react";  
import { useNavigate,useParams } from "react-router-dom";

let Main = props => {
    let {mail} = useParams();
    const navigate = useNavigate();
    let [list,listState] = useState([]);
    
    let disabledProp={disabled:false}
    if(list.length===0)
    disabledProp.disabled=true

    let addToList = (question,componentName) => {
        listState(oldList=>[...oldList,{id: Math.random().toString(36).slice(3,7),question,componentName,required:true}])
    }
    let alignH1 = {textAlign:"center"}
    let removeFromList = id => listState(oldList=>oldList.filter(q=>q.id!=id))
    let editRequiredProps=id=>{
            let i = list.findIndex(ele=>ele.id===id)
            list[i]['required']=!list[i]['required'];
            listState([...list])
    }
    let editDateTimeProps = (id,value) => {
        let i = list.findIndex(ele=>ele.id===id)
        list[i]['date_value']=value;
        listState([...list]);
    }
    let editFileUploadProps = (id,value) => {
        let i = list.findIndex(ele=>ele.id===id)
        list[i]['file_value']=value;
        listState([...list]);
    }
    let editSelectProps = (id,value) => {
        let i = list.findIndex(ele=>ele.id===id)
        if(!list[i]['options_value'])
        list[i]['options_value']=[value];
        else
        list[i]['options_value']=[value,...list[i]['options_value']];
        listState([...list]);
    }
    return (
        <div>
            <Interface addToList={addToList}/>
            {list.length==0?<h1 style={alignH1}>Add FormFields</h1>:<h1 style={alignH1}>Preview Form</h1>}
            <FormRender
            editSelectProps={editSelectProps}
            editDateTimeProps={editDateTimeProps} 
            editFileUploadProps={editFileUploadProps}
            editRequiredProps={editRequiredProps}
            removeFromList={removeFromList}
            list={list}/>
            <hr/>
            <div>
            <button {...disabledProp} style={{minWidth:"100%"}}
            onClick={()=>props.revertScreen(()=>{
                localStorage.setItem('form',JSON.stringify(list))
                navigate(`/dashboard/${mail}/description`)
            })}
            >Publish Form</button>
            </div>
        </div>
    )
}

export default Main;