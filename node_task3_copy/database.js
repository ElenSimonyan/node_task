const fs = require ('fs');

const Database = {};
module.exports= Database;

Database.write = (path, data) => {
    return new Promise((resolve, reject)=>{
        console.log('promise');
        fs.writeFile(path, JSON.stringify(data, null, '\t'), (err) => {
            console.log('err', err);
            if (err) {
                console.log('write file error', err);
                return reject('write tweet error ',err);
            }
            return resolve('data written')
        });
    })
};

Database.read = (path) => {
    return new Promise((resolve, reject) => {
        fs.readFile(path, 'utf8', (err, data) => {
            if (err) return reject(err);
            return resolve(JSON.parse(data));
        });
    })
};

Database.addTweets = (body) => {
    let parsedBody = JSON.parse(body);
    parsedBody.forEach((item) => {
        console.log('item',item);
        item.id = Math.floor(Math.random() * 10000).toString();
    });
    return Database.read('tweets.json')
    .then((data) => {
        if(!data.toString()){
            console.log('1111');
            let obj = {};
            obj.tweets = parsedBody;
            return Database.write('tweets.json', obj)
        }
        else {
            data.tweets = data.tweets.concat(parsedBody);
            return Database.write('tweets.json', data)
        }
    })
};

Database.getTweetById = (id, tweets) => {
    return tweets.find(tweet => tweet.id === id)
};

Database.deleteTweet = (urlId) => {
   return Database.read('tweets.json')
   .then((data) => {
       data.tweets.map((item,i) => {
        if (urlId === item.id) {
            data.tweets.splice(i, 1);
        }
    });
       return Database.write('tweets.json', data)
    })
};

Database.updateTweets = (urlId,body) => {
    return Database.read('tweets.json')
    .then((data) => {
        let parsedBody = JSON.parse(body);
        data.tweets.map((item) => {
            if (urlId === item.id) {
                Object.assign(item, parsedBody);
               return Database.write('tweets.json', data)
            }
        })
    })
};

