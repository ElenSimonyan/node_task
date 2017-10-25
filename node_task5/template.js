
const Handlebars = require('handlebars');
const fs = require('fs');
const AllTweetsTemplate = './public/tweets.html';
const SingleTweetsTemplate = './public/singletweet.html';

const Database =require('./database.js');

const Commands = require ('./tweets.sql.js');


const Template = {};
module.exports = Template;


Template.compilingAllTweets = (data,response) => {
    fs.readFile(AllTweetsTemplate, 'utf-8', function(err, source){
        if (err) throw err;
        const template = Handlebars.compile(source);
        data.map((tweet) => {
            tweet.tweet = decodeURIComponent(tweet.tweet)
            tweet.user = decodeURIComponent(tweet.user)
        });
        const html = template({tweets: data});
        response.end(html)
    })
}

Template.compilingOneTweet = (request,response,data) => {
    let urlId = request.url.split('/')[1];
    fs.readFile(SingleTweetsTemplate, 'utf-8', function (err, source) {
        if (err) throw err;
        data = Database.db.run(Commands.getOneTweet(urlId));
        console.log('menqeeeenq',Database.db.run(Commands.getOneTweet(urlId)));

        const template = Handlebars.compile(source);
        const html = template({tweets: data});

        response.end(html)
    })
}