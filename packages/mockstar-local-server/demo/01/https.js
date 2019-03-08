// https://blog.csdn.net/chenyufeng1991/article/details/60340006

var express = require('express'); // 项目服务端使用express框架
var app = express();
var path = require('path');
var fs = require('fs');

//使用nodejs自带的http、https模块
var http = require('http');
var https = require('https');

//根据项目的路径导入生成的证书文件
var privateKey  = fs.readFileSync(path.join(__dirname, '../../certificate/private.pem'), 'utf8');
var certificate = fs.readFileSync(path.join(__dirname, '../../certificate/file.crt'), 'utf8');
var credentials = {key: privateKey, cert: certificate};

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

//可以分别设置http、https的访问端口号
var PORT = 8000;
var SSLPORT = 8001;

//创建http服务器
httpServer.listen(PORT, function() {
    console.log('HTTP Server is running on: http://localhost:%s', PORT);
});

//创建https服务器
httpsServer.listen(SSLPORT, function() {
    console.log('HTTPS Server is running on: https://localhost:%s', SSLPORT);
});

//可以根据请求判断是http还是https
app.get('/', function (req, res) {
    if(req.protocol === 'https') {
        res.status(200).send('This is https visit!');
    }
    else {
        res.status(200).send('This is http visit!');
    }
});

