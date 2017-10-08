const http = require('http');
const fs = require('fs');

const write = (path, data) => {
    fs.writeFile(path, JSON.stringify(data, null, '\t'), (err) => {
        if (err) throw err;
        console.log('Added to file!');
    });
}
const message = (mes) => {
    let obj = {};
    obj.message = mes;
    let JSONobj = JSON.stringify(obj);
    return JSONobj;
}
const read = (path, cb) => {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) throw err;
        cb(data)
    })
}
const readBody = (request,cb) => {
    let body = [];
    request.on('error', (err) => {
        console.error(err);
    }).on('data', (chunk) => {
        body.push(chunk);
    }).on('end', () => {
        body = Buffer.concat(body).toString();
        cb(body)
    })
}
const server = http.createServer();
server.on('request', (request, response) => {
    readBody(request,(body) =>{
        const { method, url} = request;
        if (url.includes('/api/tweets')) {
            if (method === 'POST') {
                read('tweet.json', (data) => {
                    let parsedData = JSON.parse(body);
                    const id = new Date().valueOf();
                    parsedData.tweets.map((item) =>{
                        item.id = id.toString();
                    });

                    write('tweet.json', parsedData);
                    response.write('tweets were appended');
                    response.end();
                })
            }
            else if (method === 'GET') {
                read('tweet.json', (data) => {
                    let urlId = request.url.split('/')[3];
                    let parsedData = JSON.parse(data);
                    if (urlId) {
                        parsedData.tweets.map((item) => {
                            if (urlId === item.id) {
                                return response.write(JSON.stringify(item));
                            }
                        })
                    }
                    else {
                        response.write(data)
                    }

                    response.end();
                })
            }

            else if (method === 'PUT') {
                read('tweet.json', (data) => {
                    let urlId = request.url.split('/')[3];
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

                response.write(message('Successfully created tweet'));
                response.end();
            }
            else if (method === 'DELETE') {

                read('tweet.json', (data) => {
                    let urlId = request.url.split('/')[3];
                    let parsedData = JSON.parse(data);
                    parsedData.tweets.map((item) => {
                        if (urlId === item.id) {
                            console.log(item);
                            console.log(parsedData.tweets.splice(item,1));
                        }
                        write('tweet.json', parsedData)
                    })
                    response.write(message(`Successfully deleted tweet ${urlId}`));
                    response.end();
                })
            }
            else {
                response.write('wrong url');
                response.end();
            }
        }
        else  {
            response.status = 404;
            response.write('Method not found');
            response.end();
        }

        response.status = 200;
    });
});
server.listen(8000)



