import logo from './../logo.png'

const PageNotFound = () =>{
    return (
        <div style={{textAlign:"center"}}>
            <br/><br/><br/>
            <img src={logo}/>
            <br/><br/><br/>
            <h2>404  Error !!</h2>
            <h1> Page you are trying to access might be Unavailable or Disabled</h1>
        </div>
    );
}

export default PageNotFound