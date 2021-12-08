import axios from 'axios';
const config = axios.create({
    baseURL:'http://127.0.0.1:3030/'
})

config.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    alert(error)
    // passes to catch block of promise chain of axios calls 
    // need not be handled since error alerted and axios handles internally
    return Promise.reject(error);
  });

const  services = {
            login:async(data)=>{
              let  value="dfd"
              let  bool=true
          await config.post("/login",data)
           .then(res=>{
                if(res.data.message)
                value=res.data.message
                else if(res.data.error)
                value=res.data.error
           })
           return Promise.resolve({bool,msg:value})
            },
            register:async(data)=>{
              let data2=""
              await config.post('/register',data)
              .then(res=>data2=res.data)
              return Promise.resolve(data2)
            },
            verifyToken:async(data)=>{
              let data2=""
              await config.post('/register/verifyToken',data)
              .then(res=>data2=res.data)
              return Promise.resolve(data2)
            },
            deleteResponse:async(data)=>{
              let data2=""
              await config.post('/FrmSrv/deleteResponse',data)
              .then(res=>data2=res.data)
              return Promise.resolve(data2)
            },
            datatable:async(data)=>{
              let data2=""
              await config.post('/FrmSrv/datatable',data)
              .then(res=>data2=res.data)
              return Promise.resolve(data2)
            },
            aggregate:async(data)=>{
              let data2=""
              await config.post('/aggregate/',data)
              .then(res=>data2=res.data)
              return Promise.resolve(data2)
            },
            fetchByMail:async(data)=>{
              let data2=""
              await config.post('/FrmSrv/fetchByMail',data)
              .then(res=>data2=res.data)
              return Promise.resolve(data2)
            },
            getResponses:async(data)=>{
              let data2=""
              await config.post('/FrmSrv/getResponses',data,{responseType:'blob'})
              .then(res=>data2=res.data)
              return Promise.resolve(data2)
            },
            submitForm:async(data)=>{
              let data2=""
              await config.post('/FrmSrv/submitFormResult',data)
              .then(res=>data2=res.data)
              return Promise.resolve(data2)
            },
            submitHTML:async(data)=>{
              let data2=""
              await config.post('/FrmSrv/submitHTML',data)
              .then(res=>data2=res.data)
              return Promise.resolve(data2)
            },
            formBelongsToUser:async(data)=>{
              let data2=""
              await config.post('/FrmSrv/formBelongsToUser',data)
              .then(res=>data2=res.data)
              return Promise.resolve(data2)
            }
}


export default services;