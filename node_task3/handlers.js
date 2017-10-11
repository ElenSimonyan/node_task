const fs = require ('fs');
const Utils = require('./utils')
const Database = require('./database')

const Handlers = {};
module.exports = Handlers;

const apiAddTweets = (body) => {
    Database.addTweets(body)
    //.catch((err) => console.log(err));
};
const apiGetTweets = (response, request) => {
    Database.getTweets(response, request)
    //.catch((err) => console.log(err));
};
const apiDeleteTweet = (response, request) => {
    Database.deleteTweet(request);
        //mna stex
    //.catch((err) => console.log(err));--?
};
const apiUpdateTweets = (req, body) => {
     Database.updateTweets(req,body)
    //.catch((err) => console.log(err));
};
Handlers.checkEndpoints = (request,response) => {
    Utils.readBody(request, (body) =>{
        let urlId = request.url.split('/')[3];

        const { method, url} = request;
        if (url.startsWith('/api/tweets')) {
            if (method === 'POST') {
                apiAddTweets(body);
                Utils.responsePost(response)
            }
            else if (method === 'GET') {
                response.writeHead(200, {'Content-Type': 'application/json'});
                apiGetTweets(response, request);
            }

            else if (method === 'PUT') {
                // Utils responsePut func
                apiUpdateTweets(request, body);
                Utils.responsePut(response);
            }
            else if (method === 'DELETE') {
                apiDeleteTweet(response, request); //return
                Utils.responseDelete(response,urlId);
                // .catch ((err) =>  {
                //     response.writeHead(400, {'Content-Type': 'text/plain'})
                //     response.statusMessage = err;
                //     response.write(err);
                //})}
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
