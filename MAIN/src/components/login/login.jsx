import React from "react";
import loginImg from "./logo.png";
import { useNavigate } from 'react-router-dom';

 class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      mail:"",
      pass:""
    }
  }
  
  url= 'http://127.0.0.1:3030/login'
  sendLogin=()=>{
    fetch(this.url,{
      method:"POST",
      headers:{'Content-Type': 'application/json'},
      body:JSON.stringify(this.state)
    })
    .then(res=>res.json())
    .then(data=>{
      if(data.error){
        alert(data.error)
      }
      if(data.message){
        alert(data.message)
        this.props.navigate(`/dashboard/${this.state.mail}`)
      }
    })
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

