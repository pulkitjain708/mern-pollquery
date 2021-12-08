const session = {
    setSession:(mail)=>{
        sessionStorage.setItem('mail',mail);
    }
    ,
    clearSession:()=>{
        sessionStorage.clear();
    },
    checkSession:(mail)=>{
        return sessionStorage.getItem('mail')===mail
    },
    getSession:()=>{
        return sessionStorage.getItem('mail')
    }
}

export default session;