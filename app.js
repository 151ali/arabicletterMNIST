var express   = require('express'), 
    app       = express(),
    http      = require('http'),
    socketIo  = require('socket.io');
    fs        = require('fs');
    csv       = require('fast-csv');
    

// start webserver on port 8080
    var server =  http.createServer(app);
    var io = socketIo.listen(server);
    server.listen(8080);
// add directory with our static files
    app.use(express.static(__dirname + '/public'));
    console.log("Server running on 127.0.0.1:8080  press Ctrl-C to terminate....");


// recive the data from the client

function handler (req, res) {
    fs.readFile("index.html",
        function (err, data) {
            if (err) {
                throw err; 
            }
            res.writeHead(200);
            res.end(data);
        });
}
 
io.sockets.on("connection", function (socket) {
    socket.on("event_button_clicked", function (data) {
        var mnist = data.text ;

        // write the array to the csv file 
        csv
    .writeToStream(fs.createWriteStream("output/ar-alphabet.csv", 
        {flags: 'a'}),[
            [""],
            mnist // array of values 
        ], {headers:false} )
    });
});

























