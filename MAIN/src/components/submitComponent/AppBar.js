import "./AppBar.css";
import logo from "../../logo.png"

let AppBar = ({name,desc}) => {
    return (
        <div class="header">
  <a class="logo">
    <img height="50px" width="100px" src={logo}/>
    </a>
  <div class="header-right">
    <a class="active" >{name}</a>
    {/* <a >Contact</a>
    <a >About</a> */}
  </div>
  <h1 class="desc">&nbsp;&nbsp;&nbsp;&nbsp;{desc}</h1>
</div>
    );
}

export default AppBar;