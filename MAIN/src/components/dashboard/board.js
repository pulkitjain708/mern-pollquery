import Card from '../containers/card';
import AppBar from './AppBar'
import Main from '../../components/FormGenerator/Main'
import FormWindow  from './formWindows';
import Description from "../FormGenerator/Description";
import FormReport from "./formReport";
import { BrowserRouter as Router , Route , Routes , useParams } from "react-router-dom";
import {useEffect,useState} from 'react';

let Dashboard = props => {
    let {mail} = useParams();
    let revertScreen = (cb) => {
        cb();
    }
    return(
        // <Router>
        <Card>
        <AppBar mail={mail}/>
        <Routes>
        <Route exact path="" element={<FormWindow/>}/>
            <Route  exact path="newForm" element={<Main revertScreen={revertScreen}/>}/>
            <Route  exact path="description" element={<Description />}/>
            <Route  exact path="formReport/:formId" element={<FormReport />}/>
        </Routes>
        </Card>
        // </Router>
    );
    }

export default Dashboard;