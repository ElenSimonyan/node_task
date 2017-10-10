const fs = require ('fs');

const Handlers = {};
module.exports = Handlers;

Handlers.checkEndpoints = (request,response) => {
    Handlers.readBody(request, (body) =>{
        const { method, url} = request;
        if (url.startsWith('/api/tweets')) {
            if (method === 'POST') {
                Handlers.apiAddTweets(body);
                response.writeHead(200, {'Content-Type': 'application/json'});
                response.write('tweets were appended');
                response.end();
            }
            else if (method === 'GET') {
                response.writeHead(200, {'Content-Type': 'application/json'});
                Handlers.apiGetTweets(response, request);
            }

            else if (method === 'PUT') {
                apiUpdateTweets(request, body);
                response.writeHead(200, {'Content-Type': 'application/json'});
                response.write(Handlers.apiShowsMessage('Successfully created tweet'));
                response.end();
            }
            else if (method === 'DELETE') {
                response.writeHead(200, {'Content-Type': 'application/json'});
                Handlers.apiDeleteTweet(response, request);
            }
            else {
                response.write('Method not found');
                response.end();
            }
        }
        else  {
            response.writeHead(404, {'Content-Type': 'text/plain'});
            response.write('wrong url');
            response.end();
        }

        response.writeHead(200, {'Content-Type': 'text/plain'});
    });
}
//database DATABASE obj
Handlers.write = (path, data) => {
    return new Promise((resolve, reject)=>{
        fs.writeFile(path, JSON.stringify(data, null, '\t'), (err) => {
            if (err) return reject(err);
        });
    })
};
//database DATABASE obj
Handlers.read = (path) => {
    return new Promise((resolve, reject) => {
        fs.readFile(path, 'utf8', (err, data) => {
            if (err) return reject(err);
            return resolve(data);
        });
    })
};
//utils UTILS obj
Handlers.apiShowsMessage = mes => {
    let obj = {};
    obj.message = mes;
    return JSON.stringify(obj, null, '\t');
};
//utils UTILS obj
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
const apiUpdateTweets = (req, body) => {
    //database return UpdateTweets() func
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
