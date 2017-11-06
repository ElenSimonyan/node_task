const Boom = require('boom');
const Request = require('request-promise');

const Utils = require('./utils');
const Template = require('./template');

const TWEET_ROOT = 'http://localhost:4000/api/tweets';

const Handlers = {};
module.exports = Handlers;

Handlers.getTweetsWEB = (req, reply) => {
    const uri = TWEET_ROOT;
    const options = {
        uri: uri,
        json: true
    };
    Request(options)
    .then((data) => Template.compilingAllTweets(data))
    .then((html) => Utils.responseWebParseHTML(reply, html))
    .catch((error) => {
        return reply(Boom.badRequest(error))
    })
};
Handlers.deleteTweetWEB = (req, reply) => {
    const uri = TWEET_ROOT+'/'+req.params.id;
    console.log(uri);
    const options = {
        uri: uri,
        method: 'DELETE',
        json: true
    };
    Request(options)
    .then(() => Utils.redirectHomeResponse(reply))
        .catch((error) => {
            return reply(Boom.badRequest(error))
        })
};

Handlers.updateTweetsWEB = (req, reply) => {
    const uri = TWEET_ROOT+'/'+req.params.id;
    console.log(uri);
    const options = {
        uri: uri,
        method: 'PUT',
        body: req.payload,
        json: true
    };
    Request(options)
    .then(() => Utils.redirectHomeResponse(reply))
        .catch((error) => {
            return reply(Boom.badRequest(error))
        })
};



Handlers.getOneTweetWEB = (req, reply) => {
    const uri = TWEET_ROOT+'/'+req.params.id;
    console.log(uri);
    const options = {
        uri: uri,
        method: 'GET',
        json: true
    };
    Request(options)
        .then((foundTweet) => {
          return  Template.compilingOneTweet(foundTweet)
        })
        .then((html) => {
            return Utils.responseWebParseHTML(reply, html)
        })
        .catch((error) => {
            return reply(Boom.badRequest(error))
        })
};

Handlers.createTweetsWEB = (req, reply) => {
    console.log(req.payload);
    const uri = TWEET_ROOT;
    const options = {
        uri: uri,
        method: 'POST',
        body: req.payload,
        json: true
    };
    Request(options)
    .then(() => Utils.redirectHomeResponse(reply))
    .catch((error) => {
        reply(Boom.badRequest(error.message))
    })
};

