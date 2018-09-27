//主文件，入口
var server = require('./server');
var router = require('./router');
var requestHandlers = require('./requestHandlers');

//建议用动词描述请求处理程序
var handle = {};
handle['/'] = requestHandlers.start;
handle['/start'] = requestHandlers.start;
handle['/upload'] = requestHandlers.upload;
handle['/show'] = requestHandlers.show;

server.start(router.route, handle);
