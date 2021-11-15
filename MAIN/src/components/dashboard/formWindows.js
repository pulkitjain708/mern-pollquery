import Card from "../containers/card"
import {useState,useEffect} from 'react';
import { BrowserRouter as Router , Route , Routes , useParams } from "react-router-dom";
let FormWindow = (props) => {
    let url=`http://127.0.0.1:3030/FrmSrv/fetchByMail`
    let url2=`http://127.0.0.1:3030/FrmSrv/getResponses`
    let {mail} = useParams();
    let [forms,formState]=useState(null);
    useEffect(()=>{
        fetch(url,{
            method:"POST",
            headers:{'Content-Type': 'application/json'},
            body:JSON.stringify({mail})
          })
          .then(res=>res.json())
          .then(data=>formState(data.data))
          return ()=>formState(null)
    },[])

    let fetchResponses = id => {
        fetch(url2,{
            method:"POST",
            headers:{'Content-Type': 'application/json'},
            body:JSON.stringify({id})
          })
          .then(res=>res.blob())
          .then(blob=> {var file = window.URL.createObjectURL(blob);
          window.location.assign(file);})
    }

    let sx={textAlign:"center"}
    return (
            <div>
                {!forms || forms.length==0  ?<h1 style={sx}>No Forms Available</h1>:<h1 style={sx}>Saved Forms</h1>}
                {
                  forms && forms.map(f=>
                        <Card key={f._id}>
                         <p> Title : {f.name}</p>
                         <p>Description : {f.description}</p> 
                         <button onClick={e=>fetchResponses(f._id)}>View 0 responses</button>
                        </Card>
                        )
                }
            </div>
    );
}

export default FormWindow;