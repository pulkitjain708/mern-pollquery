import React from "react";
import loginImg from "./logo.png";

export class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      'mail':"",
      'otp':"",
      'token':''
    };
  }

  registrationLink='http://127.0.0.1:3030/register'
  verifyTokenLink='http://127.0.0.1:3030/register/verifyToken'

   getToken=()=>{
     fetch(this.registrationLink,{
        method:"POST",
        headers:{'Content-Type': 'application/json'},
        body:JSON.stringify({mail:this.state.mail})
     })
     .then(res=>res.json())
     .then(data=>this.setState({...data}))
   }

    register=()=>{
      fetch(this.verifyTokenLink,{
        method:"POST",
        headers:{'Content-Type': 'application/json'},
        body:JSON.stringify(this.state)
     })
     .then(res=>res.json())
     .then(data=>{
      if(data.message)
      {
        alert(data.message);
      // console.log(this.props)
        this.props.showLogin(this.state.mail);
      }
      else if(data.error){
        alert(data.error);
      }
      })
    }

  render() {
    console.log(this.props)
    return (
      <div className="base-container" ref={this.props.containerRef}>
        <div className="header">Register</div>
        <div className="content">
          <div className="image">
            <img src={loginImg} />
          </div>
          <div className="form">
            <div className="form-group">
              <label htmlFor="username">Email</label>
              <input type="text" 
              onBlur={this.getToken}
              name="username" placeholder="Email"
              onChange={e=>this.setState({'mail':e.target.value})}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">OTP</label>
              <input type="text" name="email" placeholder="OTP" 
              onChange={e=>this.setState({'otp':e.target.value})}
              />
            </div>
            {/* <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="text" name="password" placeholder="password" />
            </div> */}
          </div>
        </div>
        <div className="footer">
          <button 
          onClick={this.register}
          type="button" className="btn">
            Register
          </button>
        </div>
      </div>
    );
  }
}
