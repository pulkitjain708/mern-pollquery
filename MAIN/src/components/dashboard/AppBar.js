import logo from "../../logo.png"
import Card from "../containers/card"
import "../../styles/dashboard.css"

import {
  Link,useParams
} from 'react-router-dom';

let AppBar = (props) => {
  let {mail} = useParams();
  return (
    <div class="AppBar">
      <Card>
      <div>
        <ul>
          <li><img src={logo} height="50px" width="50px" /></li>
          <li><input 
            // style={{borderStyle:"solid",borderRadius:"10%"}}
            placeholder="search" style={{width:"500px"}} type="text"/></li>
         <li>
         <Link to={`/dashboard/${mail}/newForm`}>New Form</Link>
          </li>
          <li>
            <div class="imageTag">
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