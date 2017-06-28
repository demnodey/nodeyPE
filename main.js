const express = require('express');
const app = express();
const server = require('http').createServer(app);
const fs = require('fs');

var port = 8001;

app.use('/js', express.static(__dirname + '/js'));
app.use('/asset', express.static(__dirname + '/asset'));


app.get('/',function(req,res){
    fs.readFile('./index.html',function(error, data){
        res.end(data);
    });
});


server.listen(port, function(){
    console.log('http://localhost:'+port+' // connection');
})