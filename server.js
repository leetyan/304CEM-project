var http = require('http'); 
var fs = require('fs');
var path = require('path');

var bodyparser = require('body-parser');    // 解析 HTTP 請求主體的中介軟體
var express = require('express');
 
var conf = require('./conn');
var accounts = require('./api/routes/userGetAndPost');
var recipe = require('./api/routes/recipeGetAndPost');
var comment = require('./api/routes/commentGetAndPost');
var favourite = require('./api/routes/favouriteGetAndPost');
 
var app = express();
 
// 使用 bodyparser.json() 將 HTTP 請求方法 POST、DELETE、PUT 和 PATCH，放在 HTTP 主體 (body) 發送的參數存放在 req.body
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
 
app.use('/user', accounts);
app.use('/recipe', recipe);
app.use('/comment', comment);
app.use('/favourite', favourite);

app.listen(conf.port, function () {
    console.log('api listening on port ' + conf.port + '!');
});


http.createServer(function(req,res){
    if(req.url === "/"){
        fs.readFile('./template/index.html',"UTF-8",function(error,html){
            res.writeHead(200, {'Content-Type': 'text/html'}); 
            res.end(html);
        });
    }else if(req.url === "/signin.html"){
        fs.readFile('./template/signin.html',"UTF-8",function(error,html){
            res.writeHead(200, {'Content-Type': 'text/html'}); 
            res.end(html);
        });
    }else if(req.url.match("\.css$")){
        var cssPath = path.join(__dirname,'/template',req.url);
        var fileStream = fs.createReadStream(cssPath,"UTF-8");
        res.writeHead(200, {'Content-Type': 'text/css'}); 
        fileStream.pipe(res);
    }else if(req.url.match("\.png$")){
        var imagePath = path.join(__dirname,'/template',req.url);
        var fileStream = fs.createReadStream(imagePath);
        res.writeHead(200, {'Content-Type': 'image/png'}); 
        fileStream.pipe(res);
    }else if(req.url.match("\.jpg$")){
        var imagePath2 = path.join(__dirname,'/template',req.url);
        var fileStream = fs.createReadStream(imagePath2);
        res.writeHead(200, {'Content-Type': 'image/jpg'}); 
        fileStream.pipe(res);
    }else{
        fs.readFile('./template/'+req.url,"UTF-8",function(error,html){
            res.writeHead(200, {'Content-Type': 'text/html'}); 
            res.end(html);
        });
    }
}).listen(3000);

    console.log('web listening on port 3000!');





// var server = http.createServer(function(req, res){
//     console.log('request was made: ' + req.url);
//     res.writeHead(200, {'Content-Type': 'text/html'}); 
//     var myReadStream = fs.createReadStream(__dirname + '/template/index.html','utf8');
//     myReadStream.pipe(res);
// });

// server.listen(3000);
// console.log('listening to port 3000');

// http.createServer(function(request, response) { 
    
//     response.writeHead(200, {"Content-Type": "text/html"}); 

//     fs.readFile('./template/index.html',null,function(error,data){
//         if(error){
//             response.writeHead(404);
//             response.write('File not find!');
//         }else{
//             response.write(data);
//         }
//         response.end();
//     });
 
// }).listen(3000);