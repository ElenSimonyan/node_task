const fs = require ('fs');
const Utils = require('./utils')


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
            return resolve(data);
        });
    })
};

Database.addTweets = (body) => {
    let parsedBody = JSON.parse(body);
    parsedBody.forEach((item) => {
        item.id = Math.floor(Math.random() * 10000).toString();
    });
    Database.read('tweets.json')
    .then((data) => {
        if(!data.toString()){
            let obj = {};
            obj.tweets = parsedBody;
            Database.write('tweets.json', obj)
        }
        else {
            let parsedData = JSON.parse(data.toString());
            parsedData.tweets = parsedData.tweets.concat(parsedBody);
            Database.write('tweets.json', parsedData)
        }
    })
};

Database.getTweetById = (response,request) => {
    return Database.read('tweets.json')
    .then((data) => {
        let urlId = request.url.split('/')[3];
        let parsedData = JSON.parse(data);
        let a = {};
        if (urlId) {
            parsedData.tweets.map((item) => {
                if (urlId === item.id) {
                    a = item;
                }
            });
        }
        else {
            a = parsedData;
        }
        Utils.responseGet(response, a)
    })
    .catch((err) => console.log(err));
};

Database.deleteTweet = (request) => {
   return Database.read('tweets.json')
   .then((data) => {
    let urlId = request.url.split('/')[3];
    let parsedData = JSON.parse(data);
    parsedData.tweets.forEach((item) => {
        if (urlId === item.id) {
            parsedData.tweets.splice(item, 1);
        }
    });
       return Database.write('tweets.json', parsedData)
    })
    .catch((err) => console.log(err));
};

Database.updateTweets = (req,body) => {
    return Database.read('tweets.json')
    .then((data) => {
        let urlId = req.url.split('/')[3];
        let parsedData = JSON.parse(data);
        let parsedBody = JSON.parse(body);
        console.log(parsedData);
        parsedData.tweets.map((item) => {
            if (urlId === item.id) {
                Object.assign(item, parsedBody);
               return Database.write('tweets.json', parsedData)
            }
        })
    })
    .catch((err) => console.log(err));
};