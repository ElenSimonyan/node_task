const http = require('http');
const fs = require('fs');


http.createServer((request, response) => {
    let body = [];
    const {method, url} = request;
    request.on('error', (err) => {
        console.error(err);
    }).on('data', (chunk) => {
        body.push(chunk);
    }).on('end', () => {
        body = Buffer.concat(body).toString();
        //console.log('end');
        if (url === '/tweet') {
            if (method === 'POST') {
                fs.appendFile('tweet.json', 'data to append', function (err) {
                    if (err) throw err;
                    //console.log('Saved!');
                    response.write('tweets were appended');
                    response.end();
                });
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


}).listen(3000);

