import React from "react";
import loginImg from "./logo.png";
import { useNavigate } from 'react-router-dom';
import services  from "../../services";
import session from "../../session";

 class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      mail:"",
      pass:""
    }
  }
  
  sendLogin= async ()=>{
    if(session.checkSession(this.state.mail))
        return this.props.navigate(`/dashboard/${this.state.mail}`)
        else {
  let {bool,msg} = await services.login(this.state)
     if(bool && msg==='Logged In'){
        session.setSession(this.state.mail);
        this.props.navigate(`/dashboard/${this.state.mail}`)
      }
      else
      alert(msg)
    }   
  }

  render() {
    return (
      <div className="base-container" ref={this.props.containerRef}>
        <div className="header">Login</div>
        <div className="content">
          <div className="image">
            <img 
            src={loginImg} />
          </div>
          <div className="form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="text" 
              onChange={
                e=>this.setState({mail:e.target.value})
              }
              name="username" placeholder="email" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password"
              onChange={
                e=>this.setState({pass:e.target.value})
              }
              name="password" placeholder="password" />
            </div>
          </div>
        </div>
        <div className="footer">
          <button 
          onClick={this.sendLogin}
          type="button" className="btn">
            Login
          </button>
        </div>
      </div>
    );
  }
}


export function WithLogin(props) {
  let navigate = useNavigate();
  return <Login {...props} navigate={navigate} />
}

