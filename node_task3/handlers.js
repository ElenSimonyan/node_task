
const fs = require ('fs');

const Handlers = {};
module.exports = Handlers;

Handlers.write = (path, data) => {
    return new Promise((resolve, reject)=>{
        fs.writeFile(path, JSON.stringify(data, null, '\t'), (err) => {
            if (err) return reject(err);
        });
    })
};

Handlers.read = (path) => {
    return new Promise((resolve, reject) => {
        fs.readFile(path, 'utf8', (err, data) => {
            if (err) return reject(err);
            return resolve(data);
        });
    })

};
Handlers.apiShowsMessage = mes => {
    let obj = {};
    obj.message = mes;
    return JSON.stringify(obj, null, '\t');
};
Handlers.readBody = (request, cb) => {
    let body = [];
    request.on('error', (err) => {
        console.error(err);
    }).on('data', (chunk) => {
        body.push(chunk);
    }).on('end', () => {
        body = Buffer.concat(body).toString();
        cb(body)
    })
};
Handlers.apiAddTweets = (body) => {
    let parsedBody = JSON.parse(body);
    parsedBody.forEach((item) => {
        item.id = Math.floor(Math.random() * 10000).toString();
    });
    Handlers.read('tweets.json')
    .then((data) => {
        if(!data.toString()){
            let obj = {};
            obj.tweets = parsedBody;
            Handlers.write('tweets.json', obj)
        }
        else {
            let parsedData = JSON.parse(data.toString());
            parsedData.tweets = parsedData.tweets.concat(parsedBody);
            Handlers.write('tweets.json', parsedData)
        }
    })
    .catch((err) => console.log(err));
};
Handlers.apiGetTweets = (response, request) => {
    Handlers.read('tweets.json')
    .then((data) => {
        let urlId = request.url.split('/')[3];
        let parsedData = JSON.parse(data);
        if (urlId) {
            parsedData.tweets.map((item) => {
                if (urlId === item.id) {
                    return response.write(JSON.stringify(item, null, '\t'));
                }
            });
        }
        else {
            response.write(data);
        }
        response.end();
    })
    .catch((err) => console.log(err));
};
Handlers.apiDeleteTweet = (response, request) => {
    Handlers.read('tweets.json')
    .then((data) => {
        let urlId = request.url.split('/')[3];
        let parsedData = JSON.parse(data);
        parsedData.tweets.forEach((item) => {
            if (urlId === item.id) {
                parsedData.tweets.splice(item,1);
            }
            Handlers.write('tweets.json', parsedData)
        });
        response.write(Handlers.apiShowsMessage(`Successfully deleted tweet ${urlId}`));
        response.end();
    })
    .catch((err) => console.log(err));
};
Handlers.apiUpdateTweets = (req, body) => {
    Handlers.read('tweets.json')
    .then((data) => {
        let urlId = req.url.split('/')[3];
        let parsedData = JSON.parse(data);
        let parsedBody = JSON.parse(body);
        console.log(parsedData);
        parsedData.tweets.map((item) => {
            if (urlId === item.id) {
                Object.assign(item, parsedBody);
                Handlers.write('tweets.json', parsedData)
            }
        })
    })
    .catch((err) => console.log(err));
};
