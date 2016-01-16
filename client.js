var io = require('socket.io-client');
var ss = require('socket.io-stream');
var fs = require('fs');
var commander = require('commander');

commander.version('0.0.1')
.option('-u, --upload', 'Upload the given file')
.option('-d, --download', 'Downoad the file')
.parse(process.argv);

var uploadFile = function(file) {
  fs.stat(file, function(err, stats) {
    if (err || !stats) {
      console.error("file not found");
      process.exit(1);
    }
    else {
      var sizeFile = stats.size;
      var currentSizeUploaded = 0;

      ss(socket).emit('file', stream, {name: filename});
      fs.createReadStream(filename).pipe(stream);

      socket.on('uploaded-size', function(size) {
        console.log("size uploaded : " + size);
        currentSizeUploaded += size;
        var currentPercent = currentSizeUploaded / sizeFile * 100;
        console.log(currentPercent);
      });
    }
  });
}

if (!commander.upload && !commander.download) {
  console.log("no options specified");
  process.exit(1);
}
else {
  var socket = io.connect('http://127.0.0.1:9000');
  var stream = ss.createStream();
  var filename = 'file.txt';

  socket.on('connect', function() {
    console.log("client connected");

    if (commander.upload) {
      uploadFile('file.txt');
    }
    else if (commande.download) {

    }

    socket.on('disconnect', function() {
      console.log("disctonned to the server");
    });
  });
}
