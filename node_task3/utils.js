const Utils = {};
module.exports = Utils;

Utils.apiShowsMessage = mes => {
    let obj = {};
    obj.message = mes;
    obj = JSON.stringify(obj, null, '\t');
    console.log(obj);
    return obj;
};

Utils.readBody = (request) => {
    return new Promise ((resolve,reject) => {
        let body = [];
        request.on('error', (err) => {
            return reject(err);
        }).on('data', (chunk) => {
            body.push(chunk);
        }).on('end', () => {
            body = Buffer.concat(body).toString();
            return resolve(body)
        })
    })
}

Utils.responsePut = (response) => {
    response.writeHead(200, {'Content-Type': 'application/json'});
    response.write(Utils.apiShowsMessage('Successfully created tweet'));
    response.end();
    return Promise.resolve();
};

Utils.responsePost = (response) => {
    response.writeHead(200, {'Content-Type': 'application/json'});
    response.write(Utils.apiShowsMessage('tweets were appended'));
    response.end();
    return Promise.resolve();
};

Utils.responseDelete = (response, urlId, message) => {
    console.log('delete');
    response.writeHead(200, {'Content-Type': 'application/json'});
    response.write(Utils.apiShowsMessage(`Successfully deleted tweet ${urlId} ,${message}`));
    response.end()
};

Utils.responseGet = (response, obj) => {
    response.writeHead(200, {'Content-Type': 'application/json'});
    response.write(JSON.stringify(obj, null, '\t'));
    response.end();
};

Utils.responseMethodNotFound = (response) => {
    response.writeHead(404, {'Content-Type': 'text/plain'});
    response.write('Method not found');
    response.end();
};

Utils.badRequestResponse = (response) => {
    response.writeHead(400, {'Content-Type': 'text/plain'});
    response.write('not found response');
    response.end();
};

Utils.resNotFound = (response,err) => {
    response.writeHead(404, {'Content-Type': 'text/plain'});
    response.statusMessage = err;
    response.write(err.message);
    response.end();
};

Utils.responseGetforWeb = (response, buildHTML) => {
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.end(buildHTML);
}

Utils.findTweetById = (id, tweets) => {
    return tweets.find(tweet => tweet.id === id)
};

Utils.redirectHomeResponse = () => {
    console.log('bebe');
    return Promise.resolve(Object.assign({}, {
        header: {
            code: 302,
            type: 'text/html',
            message: 'Redirect',
            redirect: '/'
        }
    }))
};

Utils.processBody = (body) => {
    const query = body.split('=');
    const user = query[1].split('&')[0];
    const tweet = query[2].split('&')[0];
    const obj = [{user: user, tweet: tweet}];
    console.log(obj);
    return Promise.resolve(JSON.stringify(obj));
}