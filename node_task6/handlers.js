const Utils = require('./utils');
const Template = require('./template');
const Database = require('./database')

Database.tableCheck();

const Handlers = {};
module.exports = Handlers;

Handlers.getTweetsAPI = (req, reply) => {
    if (req.params.id) {
        return Database.read()
        .then((data) => {
            return Database.getTweetById(req.params.id, data)
        })
        .then((obj) => {
            Utils.responseGet(reply, obj)
        })
    }
    else {
        return Database.read()
        .then((obj) => Utils.responseGet(reply, obj))
    }
};

Handlers.createTweetsAPI = (req, reply) => {
    return Database.addTweets(JSON.parse(req.payload))
    .then(() => Utils.responsePost(reply))
};

Handlers.updateTweetsAPI = (req, reply) => {
    return Database.updateTweets(req.params.id, JSON.parse(req.payload))
    .then((message) => Utils.responsePut(reply, message))
};

Handlers.deleteTweetAPI = (req, reply) => {
    return Database.deleteTweet(req.params.id)
    .then((message) => Utils.responseDelete(reply, req.params.id, message))
};

Handlers.deleteTweetWEB = (req, reply) => {
    Database.deleteTweet(req.params.id)
    .then(() => Utils.redirectHomeResponse(reply))
};

Handlers.updateTweetsWEB = (req, reply) => {
    Database.updateTweets(req.params.id,req.payload)
    .then(() => Utils.redirectHomeResponse(reply))
};

Handlers.getTweetsWEB = (req, reply) => {
    return Database.read()
    .then((data) => Template.compilingAllTweets(data))
    .then((html) => Utils.responseWebParseHTML(reply, html))
};

Handlers.getOneTweetWEB = (req, reply) => {
    return Database.getTweet(req.params.id)
    .then((foundTweet) => Template.compilingOneTweet(foundTweet))
    .then ((html) => Utils.responseWebParseHTML(reply, html))
};

Handlers.createTweetsWEB = (req, reply) => {
    Database.addTweets(req.payload)
    .then(() => Utils.redirectHomeResponse(reply))
};

