const http = require('http');
const fs = require('fs');

const write = (path, data) => {
    fs.writeFile(path, JSON.stringify(data, null, '\t'), (err) => {
        if (err) throw err;
        console.log('Added to file!');
    });
};
const message = mes => {
    let obj = {};
    obj.message = mes;
    return JSON.stringify(obj, null, '\t');
};
const read = (path, cb) => {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) throw err;
        cb(data);
    });
};
const readBody = (request, cb) => {
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
const getId = body => {
    read('tweet.json', (data) => {
        let parsedData = JSON.parse(body);
        parsedData.tweets.forEach((item) =>{
            item.id = Math.floor(Math.random() * 10000).toString();
        });
        write('tweet.json', parsedData);

    })

};
const getDatabyId = (response, request) => {
    read('tweet.json', (data) => {
        let urlId = request.url.split('/')[3];
        let parsedData = JSON.parse(data);
        if (urlId) {
            parsedData.tweets.map((item) => {
                if (urlId === item.id) {
                    return response.write(JSON.stringify(item, null, '\t'));
                }
            })
        }
        else {
            response.write(data)
        }

        response.end();
    })
};
const deleteTweet = (response, request) => {
    read('tweet.json', (data) => {
        let urlId = request.url.split('/')[3];
        let parsedData = JSON.parse(data);
        parsedData.tweets.forEach((item) => {
            console.log('1')
            if (urlId === item.id) {
                console.log('2')

                parsedData.tweets.splice(item,1);
            }
            console.log('3')

            write('tweet.json', parsedData)
        })
        response.write(message(`Successfully deleted tweet ${urlId}`));
        response.end();
    })
};
const updateTweets = (req, body) => {
    read('tweet.json', (data) => {
        let urlId = req.url.split('/')[3];
        let parsedData = JSON.parse(data);
        let parsedBody = JSON.parse(body);
        parsedData.tweets.map((item) => {
            if (urlId === item.id) {
                item.user = parsedBody.user;
                item.tweet = parsedBody.tweet;
                write('tweet.json', parsedData)
            }
        })
    })
};


const server = http.createServer();
server.on('request', (request, response) => {
    readBody(request, (body) =>{
        const { method, url} = request;
        if (url.includes('/api/tweets')) {
            if (method === 'POST') {
                getId(body);
                response.write('tweets were appended');
                response.end();
            }
            else if (method === 'GET') {
                getDatabyId(response, request);
            }

            else if (method === 'PUT') {
                updateTweets(request,body);
                response.write(message('Successfully created tweet'));
                response.end();
            }
            else if (method === 'DELETE') {
                deleteTweet(response, request);

            }
            else {
                response.write('wrong url');
                response.end();
            }
        }
        else  {
            response.writeHead(404, {'Content-Type': 'text/plain'});
            response.write('Method not found');
            response.end();
        }

        response.writeHead(200, {'Content-Type': 'text/plain'});
    });
});
server.listen(8000);



