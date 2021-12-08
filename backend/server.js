const express = require('express');
const mongoose = require('mongoose');
const path = require('path')
const port=3030;
const app = express();

// app.use('/static', express.static(path.join(__dirname, 'static')))
app.use(express.json()) 
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next();
    });
require('./config/dbConfig')
	
app.use('/', require('./routes'));

app.listen(port,()=>{
	console.log(`Listening on 127.0.0.1:${port}`)
})