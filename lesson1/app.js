'use strict'

const http = require('http');


const Query = (url) => {
    const result = {};
    const textSplit = url[1].split('&');
    const valArr = [];
    textSplit.map((item) => {
        result[item.split('=')[0]] = item.split('=')[1]
        valArr.push(result[item.split('=')[0]])
    });
    return valArr
};

const server = http.createServer((req, res) => {
    const splitedUrl = req.url.split('?');

    if (req.url === '/search') {
        res.write('you are in the root')
    }
    else if ('/search' === splitedUrl[0] && splitedUrl[1] !== "") {
        res.write(JSON.stringify(Query(splitedUrl)));
    }
    else res.write('bad request');

    res.end();
});

server.listen(3000, console.log('listening'));
