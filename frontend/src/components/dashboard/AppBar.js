import logo from "../../logo.png"
import Card from "../containers/card"
import "../../styles/dashboard.css"
import {
  Link,useParams,useNavigate
} from 'react-router-dom';
import session from '../../session'
import {useState} from 'react';
 
let AppBar = ({searchState,search}) => {
  let {mail} = useParams();
  const navigate = useNavigate();
  
  return (
    <div class="AppBar">
      <Card>
      <div>
        <ul>
          <li><img src={logo} height="50px" width="50px" /></li>
          <li>
            <input 
            value={search}
            onChange={e=>searchState(e.target.value)}
            placeholder="Search" style={{width:"500px"}}
            type="text"/>
            </li>
         <li>
         <Link to={`/dashboard/${mail}/newForm`}>New Form</Link>
          </li>
          <li>
            <div 
            onClick={()=>{session.clearSession();navigate('/');}}
            class="imageTag">
              {mail[0]}
              </div>
          </li>
        </ul>
      </div>
      </Card>
    </div>
  );
}

export default AppBar;