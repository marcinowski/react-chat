let http = require('http')
let ws = require('ws')

var server = http.createServer(function(request, response) {
    console.log((new Date()) + ' Received request for ' + request.url);
    response.writeHead(200);
    response.end();
});

var wss = new ws.Server({ server: server });

var messages = [];

wss.on('connection', socket => {
    console.log("Connection successful.");
    socket.on('message', message => {
        var data = JSON.parse(message);
        debugger;
        if (socket.username === undefined) {
            // we get it from the first message
            socket.username = data.username;
            data.msg = data.username + ' joined.'
        };
        wss.clients.forEach(function each(client) {
            if (client.readyState === ws.OPEN) {
                data.username = socket.username;
                client.send(JSON.stringify(data));
            }
        });
    });
})

let config = {
    port: 8000,
    wshost: 'ws://127.0.0.1:8000'
}

server.listen(config.port, function(){console.log("Server running on port " + config.port)})
