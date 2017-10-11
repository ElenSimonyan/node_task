const http = require('http');

const Handlers = require('./handlers')

const server = http.createServer();
server.on('request', (request, response) => {
    Handlers.checkEndpoints(request,response)
});
server.listen(8000);



