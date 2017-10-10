const http = require('http');
//const fs = require('fs');

const Handlers = require('./handlers')

const server = http.createServer();
server.on('request', (request, response) => {
    Handlers.checkEndpoints(request,response)
});
server.listen(8000);



