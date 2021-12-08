import Card from "../containers/card"
import {useState,useEffect} from 'react';
import { BrowserRouter as Router , Route , Routes , useParams,useNavigate } from "react-router-dom";
import services from "../../services";

let FormWindow = (props) => {
    const navigate=useNavigate();
    let {mail} = useParams();
    let [forms,formState]=useState(null);
    useEffect(async ()=>{
            await services.fetchByMail({mail})
          .then(data=>formState(data.data))
          return ()=>formState(null)
    },[])

    let fetchResponses = async id => {
            await services.getResponses({id})
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
                         <button onClick={e=>fetchResponses(f._id)}>Download Responses</button>
                         <button onClick={e=>{
                             navigate(`formReport/${f._id}`);
                         }}>View Reports</button>
                         <button onClick={e=>{
                             navigate(`datatable/${f._id}`);
                         }}>View Data Table</button>
                        </Card>
                        )
                }
            </div>
    );
}

export default FormWindow;