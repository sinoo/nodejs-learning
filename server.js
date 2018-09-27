//http服务器
var http = require('http');
var url = require('url');

//依赖注入，路由并不是直接被引入服务器，而是通过调用时的传参
function start(route, handle) {
  //createServer方法只有唯一参数
  http.createServer(function(req, res) {
    //这个函数在请求到达时会被执行
    //测试时会触发两次，一次请求根目录，一次请求favicon

    // var postData = '';
    //req.url是不包括host的
    var pathname = url.parse(req.url).pathname;
    console.log('request received from ' + pathname);

    // req.setEncoding('utf8');
    // req.addListener('data', function(postDataChunk) {
    //   //每次接收到新数据块时触发
    //   postData += postDataChunk;
    //   console.log('received POST data chunk ' + postDataChunk);
    // });
    // req.addListener('end', function() {
    //   //数据接收完毕时触发
    //   route(handle, pathname, res, postData);
    // });

    route(handle, pathname, res, req);

  }).listen(8888);
  console.log('server started at localhost:8888...');
}

exports.start = start;