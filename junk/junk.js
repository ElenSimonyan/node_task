const http = require('http');
const fs = require('fs');

const write = (path, data) => {
    fs.writeFile(path, JSON.stringify(data), function (err) {
        if (err) throw err;
        console.log('Added to file!');
    });
}


const read = (path, cb) => {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) throw err;
        // console.log(data)
        cb(data)
    })
}
// read('tweets.json', (data) => {
//     write('tweets2.json',data)
//     return
// })

http.createServer((request, response) => {
    let body = [];
    const {method, url} = request;
    request.on('error', (err) => {
        console.error(err);
    }).on('data', (chunk) => {
        body.push(chunk);
    }).on('end', () => {
        body = Buffer.concat(body).toString();
        if (url === '/tweet') {
            if (method === 'POST') {
                // fs.readFile('tweet.json', 'utf8', function (err, data) {
                //     if (err) throw err;
                //     const obj = {tweets: []};
                //     obj.tweets = obj.tweets.concat(data);
                //     obj.tweets = obj.tweets.concat(body);
                //     console.log(obj);
                //
                //     fs.writeFile('tweet.json', JSON.stringify(obj) , function (err) {
                //         if (err) throw err;
                //         response.write('tweets were appended');
                //         response.end();
                //     });
                //     //write('tweet.json',obj)
                //
                // });
                read('tweet.json', (data) => {
                    const obj = {tweets: []};
                        obj.tweets = obj.tweets.concat(data);
                        obj.tweets = obj.tweets.concat(body);
                  write('tweet.json',obj)
                        response.write('tweets were appended');
                        response.end();


              })
            }
            if (method === 'GET') {
                fs.readFile('tweet.json', 'utf8', function (err, data) {
                    if (err) throw err;
                    response.write(data);
                    response.end();
                });
            }
        }
        else {
            response.write('wrong url');
            response.end();
        }
    });

    //response.writeHead(200, {'Content-Type': '/json'})


}).listen(4000);

