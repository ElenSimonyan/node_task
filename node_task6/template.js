const Handlebars = require('handlebars');
const fs = require('fs');
const AllTweetsTemplate = './public/tweets.html';
const SingleTweetsTemplate = './public/singletweet.html';


const Template = {};
module.exports = Template;


Template.compilingAllTweets = (data) => {
    return new Promise ((resolve, reject) => {
        fs.readFile(AllTweetsTemplate, 'utf-8', function(error, source){
            if (error) return reject(error);
            const template = Handlebars.compile(source);
            data.map((tweet) => {
                tweet.tweet = decodeURIComponent(tweet.tweet);
                tweet.user = decodeURIComponent(tweet.user)
            });
            const html = template({tweets: data})
            return resolve(html)
        })
    })
};

Template.compilingOneTweet = (data) => {
    return new Promise ((resolve, reject) => {
        fs.readFile(SingleTweetsTemplate, 'utf-8', function(error, source){
            if (error) return reject(error);
            data.map((tweet) => {
                tweet.tweet = decodeURIComponent(tweet.tweet);
                tweet.user = decodeURIComponent(tweet.user)
            });
            const template = Handlebars.compile(source)
            return resolve(template({tweets: data}))
        })
    })
}