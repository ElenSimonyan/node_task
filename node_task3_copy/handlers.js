const Handlebars = require('handlebars');
const fs = require ('fs');
const AllTweetsTemplate = './public/tweets.html'


const Utils = require('./utils')
const Database = require('./database');

const Handlers = {};
module.exports = Handlers;

Handlers.checkEndpoints = (request,response) => {
    let urlId = request.url.split('/')[3];
        const { method, url} = request;
        if (url.startsWith('/api/tweets')) {
            if (method === 'POST') {
                return Utils.readBody(request)
                .then((body) => Database.addTweets(body))
                .then(() => {
                    return Utils.responsePost(response)
                })
            }
            else if (method === 'GET') {
                if (urlId) {
                    return Database.read('tweets.json')
                    .then((data) => {
                        return Database.getTweetById(urlId,data.tweets)
                    })
                    .then((obj) => {
                        return Utils.responseGet(response, obj)
                    })
                }
                else {
                    return Database.read('tweets.json')
                    .then((obj) => {
                        return Utils.responseGet(response, obj)
                    })
                }
            }
            else if (method === 'PUT') {
                return Utils.readBody(request)
                .then((body) => {
                    return Database.updateTweets(urlId, body)

                })
                .then((message) => {
                    return Utils.responsePut(response, message);
                })
            }
            else if (method === 'DELETE') {
                return Database.deleteTweet(urlId)
                .then((message) => {
                    return Utils.responseDelete(response, urlId, message);
                })
            }
        }
        else if (url === '/' && method === 'GET'){
            return Database.read('tweets.json')
                .then((data) => {
                    fs.readFile(AllTweetsTemplate, 'utf-8', function(err, source){
                        if (err) throw err;
                        var template = Handlebars.compile(source);
                        var html = template({tweets: data.tweets});
                        response.end(html)
                    })
                })
        }
        else if(method === 'GET'){
            let urlId = request.url.split('/')[1];
            return Database.read('tweets.json')
                .then((data) => {
                    fs.readFile(AllTweetsTemplate, 'utf-8', function (err, source) {
                        if (err) throw err;
                        data.tweets.map((item) => {
                            if (urlId === item.id) {
                                var template = Handlebars.compile(source);
                                var html = template({tweets: item});
                                response.end(html)
                            }
                        });

                    })
                })
        }
        else if (url.split('?')[0] === '/create') {
            return Utils.readBody(request)
            .then((body) => {
                return Utils.processBody(body)
                .then((obj) => {
                    return Database.addTweets(obj)
                })
                .then(() => {
                    console.log('im here');
                    return Utils.redirectHomeResponse()
                })
            })
        }
        else {
            return Utils.badRequestResponse(response);
        }
};
