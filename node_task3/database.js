const fs = require ('fs');

const Database = {};
module.exports= Database;



Database.write = (path, data) => {
    return new Promise((resolve, reject)=>{
        fs.writeFile(path, JSON.stringify(data, null, '\t'), (err) => {
            if (err) return reject('write tweet error ',err);
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

Database.deleteTweet = (request) => {
    Database.read('tweets.json')
    .then((data) => {
        let urlId = request.url.split('/')[3];
        let parsedData = JSON.parse(data);
        parsedData.tweets.forEach((item) => {
            if (urlId === item.id) {
                parsedData.tweets.splice(item, 1);
            }
            Database.write('tweets.json', parsedData)
        });
    })
};

Database.updateTweets = (req,body) => {
    Database.read('tweets.json')
        .then((data) => {
            let urlId = req.url.split('/')[3];
            let parsedData = JSON.parse(data);
            let parsedBody = JSON.parse(body);
            console.log(parsedData);
            parsedData.tweets.map((item) => {
                if (urlId === item.id) {
                    Object.assign(item, parsedBody);
                    Database.write('tweets.json', parsedData)
                }
            })
        })
}