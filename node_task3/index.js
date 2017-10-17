const http = require('http');

const Utils = require('./utils')

const Handlers = require('./handlers')

const server = http.createServer();
server.on('request', (request, response) => {
    return Handlers.checkEndpoints(request,response)
    .catch ((err) =>  {
        console.log('erroooooor', err);
        Utils.resNotFound(response,err)
    })
});
server.listen(8000);



