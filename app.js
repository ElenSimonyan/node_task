'use strict'

const http = require('http');


const func = (url,i) => {
    const result = {};
    const textSplit = url[1].split('&');
    const key = textSplit[i].split('=')[0];
    const value = textSplit[i].split('=')[1];
    result[key] = value;
    return (`${result[key]} `);
}

const server = http.createServer((req, res) => {
    const split = req.url.split('?');

    if ('/search' === split[0]) {
        const query = split[1].split('&');

        for (let i = 0; i < query.length; i++ ){
            res.write(func(split,i))
        }

    }
    res.end();
});

server.listen(3000, console.log('listening'));
