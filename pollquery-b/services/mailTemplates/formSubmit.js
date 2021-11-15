//<u><h1>PollQuery</h1></u>
let newForm=(html)=>{
   
    let str=`<!DOCTYPE html>
    <html lang="en">
    <head>
      
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        <div class="main">
        <img width="50%" height="50%" src="cid:logo"/>
            <hr>
           ${html}
        </div>
    </body>
    </html>`
            return str;
    }
    
    module.exports=newForm;