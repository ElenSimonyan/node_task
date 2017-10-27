const fs = require ('fs');
const Commands = require ('./tweets.sql.js');
var sqlite3 = require('sqlite3').verbose();

const Database = {};
module.exports= Database;

const db = new sqlite3.Database('tweet.db', error => {
    if (error) {
        console.error(error);
    }
    console.log('db connected');
});

Database.tableCheck = () => {
    db.all(Commands.getTweetsTable, (error)=> {
        if(error) {
            db.run(Commands.createTweetsTable);
        }
    })
};

Database.read = () => {
    return new Promise ((resolve, reject) => {
        db.all(Commands.getTweetsTable, (err, rows) => {
            if (err) return reject(err)
            return resolve(rows)
        })
    })
};

Database.addTweets = (body) => {
    let newBody = [body];
    newBody.forEach((item) => {
        item.id = Math.floor(Math.random() * 10000).toString();
    });
    newBody.forEach((tweet) => {
        db.run(Commands.insertTweets(tweet.user, tweet.tweet, tweet.id), error => {
            if (error) console.error(error)
        })
    });
    return Promise.resolve()
};

Database.getTweetById = (id, tweets) => {
    console.log(tweets);
    return tweets.find(tweet => tweet.id == id)
};

Database.deleteTweet = (urlId) => {
    db.run(Commands.deleteTweetTable(urlId), error => {
        console.log('delete',error)
    });
    return Promise.resolve();
};

Database.updateTweets = (urlId, body) => {
    db.run(Commands.UpdateTweetTable(body.user,body.tweet,urlId), error => {
        console.log('update',error)
    });
    return Promise.resolve()
};

Database.getTweet = (tweetID) => {
    return new Promise ((resolve, reject) => {
        db.all(Commands.getOneTweet(tweetID), (error, row) => {
            if (error) return reject(error);
            return resolve(row)
        })
    })
}

