const http = require('http');
const fs = require('fs');

const Handlers = require('./handlers')

const server = http.createServer();
server.on('request', (request, response) => {
    Handlers.readBody(request, (body) =>{
        const { method, url} = request;
        if (url.startsWith('/api/tweets')) {

            if (method === 'POST') {
                Handlers.apiAddTweets(body);
                response.write('tweets were appended');
                response.end();
            }
            else if (method === 'GET') {
                Handlers.apiGetTweets(response, request);
            }

            else if (method === 'PUT') {
                Handlers.apiUpdateTweets(request, body);
                response.write(Handlers.apiShowsMessage('Successfully created tweet'));
                response.end();
            }
            else if (method === 'DELETE') {
                Handlers.apiDeleteTweet(response, request);
            }
            else {
                response.write('Method not found');
                response.end();
            }
        }
        else  {
            response.writeHead(404, {'Content-Type': 'text/plain'});
            response.write('wrong url');
            response.end();
        }

        response.writeHead(200, {'Content-Type': 'text/plain'});
    });
});
server.listen(8000);



