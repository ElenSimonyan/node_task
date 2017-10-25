const fs = require ('fs');
const Commands = require ('./tweets.sql.js');
var sqlite3 = require('sqlite3').verbose();

const Database = {};
module.exports= Database;

Database.db = new sqlite3.Database('tweet.db', error => {
    if (error) {
        console.error(error);
    }
    console.log('db connected');
});

Database.tableCheck = () => {
    Database.db.all(Commands.getTweetsTable, (error,rows)=> {
        if(error) {
            Database.db.run(Commands.createTweetsTable);
        }

        else if(rows.length){
            console.log(rows);//table exists
        }
        else  {
            console.log('table is empty');
        }
    })

};

Database.read = () => {
    return new Promise ((resolve, reject) => {
        Database.db.all(Commands.getTweetsTable, (err, rows) => {
            if (err) return reject(err)
            console.log('text',rows);
            return resolve(rows)
        })
    })
};

Database.addTweets = (body) => {
    let parsedBody = JSON.parse(body);
    parsedBody.forEach((item) => {
        item.id = Math.floor(Math.random() * 10000).toString();
    });
    Database.db.run(Commands.insertTweets(parsedBody[0].user,parsedBody[0].tweet,parsedBody[0].id), error => {
        console.log('create',error)
    });
};

// Database.getTweetById = (id, tweets) => {
//     return tweets.find(tweet => tweet.id === id)
// };

Database.deleteTweet = (urlId) => {
    Database.db.run(Commands.deleteTweetTable(urlId), error => {
        console.log('delete',error)
    });
};

Database.updateTweets = (urlId,body) => {
    let parsedBody = JSON.parse(body);
    Database.db.run(Commands.UpdateTweetTable(parsedBody.user,parsedBody.tweet,urlId), error => {
        console.log('update',error)

    })
};

