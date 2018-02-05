var http = require('http');
var fs = require('fs');

http.createServer(function (req, res) {
    //create an empty file named mynewfile2.txt:
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('Start Writting!');
    fs.writeFile('test/mynewfile1.txt', 'Hello content!', function (err) {
        if (err) throw err;
        console.log('Saved!');
    });

    fs.appendFile('test/mynewfile1.txt', ' This is my text.', function (err) {
        if (err) throw err;
        console.log('Updated!');
    });

    fs.writeFile('test/mynewfile2.txt', 'This is my text', function (err) {
        if (err) throw err;
        console.log('Replaced!');
    });

    fs.unlink('test/mynewfile2.txt', function (err) {
        if (err) throw err;
        console.log('File deleted!');
    });

    res.end('End Writting!.')
}).listen(8080);