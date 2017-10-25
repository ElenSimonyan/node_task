
const fs = require ('fs')

const Handlers = {};
module.exports = Handlers;

Handlers.write = (path, data) => {
    return new Promise((resolve, reject)=>{
        fs.writeFile(path, JSON.stringify(data, null, '\t'), (err) => {
            if (err) return reject(err);
            console.log('Added to file!');
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
// return read(PATH1)
//     .then((resultFromRead) => write(PATH2, resultFromRead))
//     .then((resultFromWrite) => console.log(resultFromWrite))
//     .catch((err) => console.error('Opps',err))
Handlers.message = mes => {
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
Handlers.addTweetsHandle = (body) => {
    let bodyJSON = JSON.parse(body);
    console.log(bodyJSON);
    bodyJSON.forEach((item) => {
        console.log(item);
        item.id = Math.floor(Math.random() * 10000).toString();
    });
    // Handlers.read('tweets.json', (data) => {
    //         if(!data.toString()){
    //             let obj = {};
    //             obj.tweets = bodyJSON;
    //             Handlers.write('tweets.json', obj)
    //         }
    //         else {
    //             let currentData = JSON.parse(data.toString());
    //             currentData.tweets = currentData.tweets.concat(bodyJSON);
    //             Handlers.write('tweets.json', currentData)
    //         }
    //     })
    Handlers.read('tweets.json')
        .then((data) => {
            if(!data.toString()){
                let obj = {};
                obj.tweets = bodyJSON;
                Handlers.write('tweets.json', obj)
            }
            else {
                let currentData = JSON.parse(data.toString());
                currentData.tweets = currentData.tweets.concat(bodyJSON);
                Handlers.write('tweets.json', currentData)
            }
        })
        .catch((err) => console.log(err));
};
Handlers.getDatabyId = (response, request) => {
    Handlers.read('tweets.json', (data) => {
        let urlId = request.url.split('/')[3];
        let parsedData = JSON.parse(data);
        if (urlId) {
            parsedData.tweets.map((item) => {
                if (urlId === item.id) {
                    return response.write(JSON.stringify(item, null, '\t'));

                }
            });
            //response.end();
        }
        else {
            response.write(data);

        }
        response.end();
    })
};
Handlers.deleteTweet = (response, request) => {
    Handlers.read('tweets.json', (data) => {
        let urlId = request.url.split('/')[3];
        let parsedData = JSON.parse(data);
        parsedData.tweets.forEach((item) => {
            if (urlId === item.id) {
                parsedData.tweets.splice(item,1);
            }
            Handlers.write('tweets.json', parsedData)
        });
        response.write(Handlers.message(`Successfully deleted tweet ${urlId}`));
        response.end();
    })
};
Handlers.updateTweets = (req, body) => {
    Handlers.read('tweets.json', (data) => {
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
};