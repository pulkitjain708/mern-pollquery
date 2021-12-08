import Card from '../containers/card';
import AppBar from './AppBar'
import Main from '../../components/FormGenerator/Main'
import FormWindow  from './formWindows';
import Description from "../FormGenerator/Description";
import FormReport from "./formReport";
import { BrowserRouter as Router , Route , Routes , useParams,useNavigate } from "react-router-dom";
import {useEffect,useState} from 'react';
import DatatableView from "./DataTable"
import session from '../../session';
import PageNotFound from '../PageNotFound'

let Dashboard = props => {
    
    let {mail} = useParams();
    const navigate = useNavigate();
    const [search,searchState]=useState(undefined);
    useEffect(()=>{
        if(!session.checkSession(mail))
        navigate('/')
    },[mail])
    let revertScreen = (cb) => {
        cb();
    }
    return(
        // <Router>
        <Card>
        <AppBar mail={mail} search={search} searchState={searchState} />
        <Routes>
            <Route exact path="" element={<FormWindow search={search} />}/>
            <Route path="*" element={<PageNotFound/>}/>
            <Route  exact path="newForm" element={<Main revertScreen={revertScreen}/>}/>
            <Route  exact path="description" element={<Description />}/>
            <Route  exact path="formReport/:formId" element={<FormReport />}/>
            <Route  exact path="datatable/:formId" element={<DatatableView />}/>
        </Routes>
        </Card>
        // </Router>
    );
    }

export default Dashboard;