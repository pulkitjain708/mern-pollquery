import { useParams,useNavigate } from "react-router-dom";
import {useEffect,useState} from 'react';
import AppBar from "./AppBar";
import MainForm from "./MainForm";

let Submit = props => {
    let {mail,formLink} = useParams();
    let navigate = useNavigate();
    let [formComp,formCompState] = useState({name:"Form Title",
        description:"Form Description"
        });
    // console.log(formComp)
    useEffect(()=>{
        fetch('http://localhost:3030/FrmSrv/formBelongsToUser',{
            method:"POST",
            headers:{'Content-Type': 'application/json'},
            body:JSON.stringify({mail,formLink})
          })
          .then(res=>res.json())
          .then(data=>{
              if(data.status===false)
              {
                  alert("You are not in the Recepient List");
                  navigate("/");
              }
              else formCompState(data.form);
          })
    },[]);

    return (
        <div>
            <AppBar name={formComp.name} desc={formComp.description}/>
            <MainForm id={formComp._id} data={formComp.form_data} />
            <h3 style={{float:"right"}}>Shared by {formComp.author} on {Date(formComp.timestamp).slice(0,16)}</h3>
        </div>
    );
}

export default Submit;