var exec = require('child_process').exec;

function start(res) {
  console.log('Request handle \'start\' was called.');
  // var content = 'empty';

  //win下不支持命令'ls -lah'
  exec('dir', function(error, stdout, stderr) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    // res.write('123');
    res.end();
  });

  // function sleep(ms) {
  //   var startTime = Date.now();
  //   while (Date.now() < startTime + ms);
  // }
  // sleep(10000);

  // return content;
}

function upload(res) {
  console.log('Request handle \'upload\' was called.');
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.write('Hello Upload');
  res.end();
}

exports.start = start;
exports.upload = upload;
