import TextField from '../formFields/TextField'
import TextArea from "../formFields/TextArea"
import {useState,useRef} from 'react';
import {useNavigate,useParams} from "react-router-dom";
let Description = props => {
    let {mail} = useParams();
    const navigate=useNavigate();
    // let [name,nameState] = useState("");
    // let [desc,descState] = useState("");
    // let [mails,mailState] = useState("");
    let nameRef=useRef();
    let descRef=useRef();
    let mailsRef=useRef();
    let send = () => {
        if(nameRef.current.value === "" || descRef.current.value==="" || mailsRef.current.value.split(',').length===1 ){
            alert('Fill in Fields')
            return 
        }
        let details = {}
        details['author']=mail
        details['name']=nameRef.current.value;
        details['description']=descRef.current.value;
        details['mail']=mailsRef.current.value.split(',');
        details['form_data']=JSON.parse(localStorage.getItem('form'))
        console.log(details)
        // make a fetch request to save data and go to dashboard
        fetch(`http://127.0.0.1:3030/FrmSrv/newForm`,{
            method:"POST",
            headers:{'Content-Type': 'application/json'},
            body:JSON.stringify(details)
          })
          .then(res=>res.json())
          .then(d=>alert(d.message))
        navigate(`/dashboard/${mail}`);
    }

    return (
        <div>
            <input type="text" placeholder="Form name" ref={nameRef}/>
            <textarea placeholder="Form Description" style={{minHeight:"100px"}} ref={descRef}></textarea>
            <textarea placeholder="Share with (seperated by comma for multiple people)"
            style={{minHeight:"100px"}}
            ref={mailsRef}
            ></textarea>
            <button style={{minWidth:"100%"}}
            onClick={send}
            >Share !!</button>
        </div>
    );
}


export default Description;