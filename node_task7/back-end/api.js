const Boom = require('boom');
const Utils = require('./utils');
const Database = require('./database');

Database.tableCheck();

const Api = {};
module.exports = Api;

Api.getTweetsAPI = (req, reply) => {
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

Api.createTweetsAPI = (req, reply) => {
    return Database.addTweets((req.payload))
        .then(() => Utils.responsePost(reply))
};

Api.updateTweetsAPI = (req, reply) => {
    return Database.updateTweets(req.params.id,(req.payload))
        .then((message) => Utils.responsePut(reply, message))
        .catch((error) => {
            return reply(Boom.badRequest(error))
        })
};

Api.deleteTweetAPI = (req, reply) => {
    return Database.deleteTweet(req.params.id)
        .then((message) => Utils.responseDelete(reply, req.params.id, message))
        .catch((error) => {
            return reply(Boom.badRequest(error))
        })
};