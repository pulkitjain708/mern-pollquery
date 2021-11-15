import FormFieldMapper from "../FormGenerator/aggregated"
import Card from "../containers/card"
import {useNavigate,useParams} from "react-router-dom";

let MainForm = ({id,data}) => {
    // console.log(id,data)
    let navigate = useNavigate();
    let Form;
    let {mail} = useParams();
   if (data===undefined)
   Form=<p>Waiting ....</p>
    else{
   Form = data.map(oc=>{
        let {question,componentName,id,required} = oc;
        let OComponent = FormFieldMapper[componentName];
        let optProps={}
        if(componentName==='Select')
        optProps={options:oc.options_value}
        else if(componentName=="FileUpload")
        optProps={accept:oc.file_value}
        else if(componentName=="DateTime")
        optProps={type:oc.date_value}
        return (
            <Card key={id}>
                <OComponent required={required} placeholder={question} label={question} {...optProps}/>
            </Card>
        );
    })}

        let handleSubmission = e => {
            e.preventDefault();
            let formData={}
            formData['mail']=mail;
            for(let element of e.target.elements)
            {   
                if(element.name==="")
                continue
                else
                formData[element.name]=element.value;
            }
            fetch("http://localhost:3030/FrmSrv/submitFormResult",{
                method:"POST",
                headers:{'Content-Type': 'application/json'},
                body:JSON.stringify(formData)
             })
             .then(res=>res.json())
             .then(data=>{
                 if(data.status)
                 alert(data.message)
             })
             fetch("http://localhost:3030/FrmSrv/submitHTML",{
                method:"POST",
                headers:{'Content-Type': 'application/json'},
                body:JSON.stringify({mail,html:document.getElementsByTagName('html')[0].innerHTML})
             })
        }

    return (
        <div>
            <form action="" method="post" onSubmit={handleSubmission}>
                <input type="hidden" value={id} name="form_id"/>
           {Form}
           <input style={{minWidth:"100%",minHeight:"100px"}} type="submit" value="Fire !!"/>
           </form>
        </div>
    );
}

export default MainForm;