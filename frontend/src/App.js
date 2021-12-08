import { BrowserRouter as Router , Route , Routes } from "react-router-dom";
import RootLogin from './components/login/RootLogin.js'
import Dashboard from './components/dashboard/board'
import Submit from "./components/submitComponent/submit"
import PageNotFound from './components/PageNotFound'

let App = () => {
    
    return (
        <div>
            <Router>
            <Routes>
            <Route path="*" element={<PageNotFound/>}/>
                <Route exact path="/dashboard/:mail/*" element={<Dashboard/>}/>
                <Route exact path="/" element={<RootLogin/>} />
                <Route exact path="/submitForm/:mail/:formLink" element={<Submit/>} />
            </Routes>
            </Router>   
        </div>
    );

}

export default App;