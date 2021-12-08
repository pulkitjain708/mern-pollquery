//<u><h1>PollQuery</h1></u>
let newForm=(author,link,m)=>{
   
    let str=`<!DOCTYPE html>
    <html lang="en">
    <head>
        <style>
            *{
                color:white;
                text-align: center;
            }
            .main
            {   
                margin:40px;
                padding:20px;
                width:60%;
                height:90%;
                background-color:black;
                border-radius:90px;
            }
        </style>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        <div class="main">
        <img width="50%" height="50%" src="cid:logo"/>
            <hr>
            <h4>Dear,</h4> <h2><i>${m}</i></h2> 
            <p>${author} has shared a form with you !! Respond via <a href='${link}'><h1><u>This Link</u></h1></a> </p>
        </div>
    </body>
    </html>`
            return str;
    }
    
    module.exports=newForm;