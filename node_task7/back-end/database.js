
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
    let now = new Date();
    newBody.forEach((item) => {
        item.id = Math.floor(Math.random() * 10000).toString();
        item.created_at = now;
    });
    newBody.forEach((tweet) => {
        db.run(Commands.insertTweets(tweet.user, tweet.tweet, tweet.id, tweet.created_at), error => {
            if (error) console.error(error)
        })
    });
    return Promise.resolve()
};

Database.getTweetById = (id, tweets) => {
    return tweets.find(tweet => tweet.id == id)
};

Database.deleteTweet = (urlId) => {
    let now = new Date();
    db.run(Commands.deleteTweetTable(urlId,now), error => {
        console.log('delete',error)
    });
    return Promise.resolve();
};

Database.updateTweets = (urlId, body) => {
    let now = new Date();
    db.run(Commands.UpdateTweetTable(body.user,body.tweet,urlId,now), error => {
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

