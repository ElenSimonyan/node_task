const Utils = require('./utils')
const Database = require('./database')

const Handlers = {};
module.exports = Handlers;

Handlers.checkEndpoints = (request,response) => {
    Utils.readBody(request, (body) =>{
        let urlId = request.url.split('/')[3];

        const { method, url} = request;
        if (url.startsWith('/api/tweets')) {
            if (method === 'POST') {
                return Database.addTweets(body)
                .then(() => {
                    Utils.responsePost(response)
                })
                .catch ((err) =>  {
                    Utils.badRequestResponse(response,err)
                })
            }
            else if (method === 'GET') {
                return Database.getTweetById(response, request)
                .catch ((err) =>  {
                    Utils.badRequestResponse(response,err)
                })
            }

            else if (method === 'PUT') {
                return Database.updateTweets(request, body)
                .then((message) => {
                    Utils.responsePut(response, message);
                })
                .catch ((err) =>  {
                    Utils.badRequestResponse(response,err)
                })
            }
            else if (method === 'DELETE') {
                return Database.deleteTweet(request)
                .then((message) => {
                    Utils.responseDelete(response, urlId, message);
                })
                .catch ((err) =>  {
                    Utils.badRequestResponse(response,err)
                })
            }
            else {
                Utils.responseMethodNotFound(response);
            }
        }
        else  {
            Utils.responseNotFound(response);
        }
        response.writeHead(200, {'Content-Type': 'text/plain'});
    })
}
