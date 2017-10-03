'use strict'

const http = require('http');


const server = http.createServer((req, res) => {
    const split = req.url.split('?');

    if ('/search' === split[0]) {
        const textSplit = split[1].split('=')[1];
        const firstValue = textSplit.split('&')[0];
        const filter = split[1].split('&')[1];
        const secondValue = filter.split('=')[1];

        res.write(`${firstValue} ${secondValue}`)
    }
    res.end();
});

server.listen(3000, console.log('listening'));
