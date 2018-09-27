var exec = require('child_process').exec;
var querystring = require('querystring');
var fs = require('fs');
var formidable = require('formidable');

function start(res) {
  console.log('request handler "start" was called');

  // //非阻塞操作，获取当前目录下所有的文件
  // //很明显，对/start的请求耗时并不会影响到对/upload的请求
  // exec('find /',
  //   { timeout: 10000, maxBuffer: 20000 * 1024 },
  //   function(err, stdout, stderr) {
  // // exec('ls -lah', function(err, stdout, stderr) {
  //   //回调函数
  //   res.writeHead(200, { 'Content-Type': 'text/plain' });
  //   res.write(stdout);
  //   res.end();
  // });

  var body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" content="text/html; '+
    'charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action="/upload" method="post" enctype="multipart/form-data">'+
    '<input type="file" name="upload" multiple="multiple"/>'+ //有name才会post成数据
    '<input type="submit" value="Upload file" />'+
    '</form>'+
    '</body>'+
    '</html>';
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write(body);
  res.end();
}

function upload(res, req) {
  console.log('request handler "upload" was called');
  var form = new formidable.IncomingForm();
  console.log('about to parse');
  form.parse(req, function(err, fields, files) {
    console.log('parsing done');
    fs.renameSync(files.upload.path, './tmp/test.png');
    res.writeHead(200, {"Content-Type": "text/html"});
    res.write("received image:<br/>");
    res.write("<img src='/show' />");
    res.end();
  });
  // res.writeHead(200, { 'Content-Type': 'text/plain' });
  // res.write('you\'ve sent text: ' + querystring.parse(postData).text);
  // res.end();
}

function show(res) {
  console.log('request handler "show" was called');
  //二进制读取
  fs.readFile('./tmp/test.png', 'binary', function(err, file) {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.write(err + '\n');
      res.end();
    } else {
      res.writeHead(200, { 'Content-Type': 'image/png' });
      //二进制写入
      res.write(file, 'binary');
      res.end();
    }
  });

}

exports.start = start;
exports.upload = upload;
exports.show = show;
