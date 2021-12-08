import {useNavigation,useParams} from 'react-router-dom';
import {useState,useEffect} from 'react';
import Ratio from '../graphs/Ratio';
import EachUserResponse from "../graphs/EachUserResponse"
import TimedResponse from "../graphs/TimedResponse";
import services from '../../services';

let FormReport = () =>{
    let {formId}=useParams();
    let center = {textAlign:"center"}
    let [ratioConfig,ratioConfigState]=useState([]);
    let [eachUserConfig,eachUserConfigState]=useState([]);
    let [timedQuery,timedQueryState]=useState([]);
    useEffect(async ()=>{
        await services.aggregate({id:formId})
          .then(d=>{
              ratioConfigState(d.ratioConfig)
              eachUserConfigState(d.eachUserConfig)
              timedQueryState(d.timedQueryConfig)
          })
    },[])
    

   return (
        <div>
            <h1 style={center}>Reports</h1>
            <Ratio  ratioConfig={ratioConfig}/>
            <br/>
            <br/>
            <EachUserResponse eachUserConfig={eachUserConfig}/>
            <TimedResponse timedQuery={timedQuery}/>
            </div>
    );
}

export default FormReport;