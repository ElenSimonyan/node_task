const Utils = {};
module.exports = Utils;

Utils.apiShowsMessage = mes => {
    let obj = {};
    obj.message = mes;
    obj = JSON.stringify(obj, null, '\t');
    return obj;
};

Utils.readBody = (request) => {
   // console.log(request);
    return new Promise ((resolve,reject) => {
        let body = [];
        console.log('eee');
        request.on('error', (err) => {
            return reject(err);
        }).on('data', (chunk) => {
            console.log('chunk');
            body.push(chunk);
        }).on('end', () => {
            //console.log('33');

            body = Buffer.concat(body).toString();
            console.log(body);

            return resolve(body)
        })
    })
}

Utils.responsePut = (response) => {
    return response(Utils.apiShowsMessage('Successfully created tweet')).header('Content-Type', 'aplication/json');
};

Utils.responsePost = (response) => {
    return response(Utils.apiShowsMessage('tweets were appended')).header('Content-Type', 'aplication/json');;
};

Utils.responseDelete = (response, urlId, message) => {
    return response(Utils.apiShowsMessage(`Successfully deleted tweet ${urlId} ,${message}`)).header('Content-Type', 'aplication/json');;
};

Utils.responseGet = (response, obj) => {
    return response(JSON.stringify(obj, null, '\t')).header('Content-Type', 'aplication/json');
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
};

Utils.findTweetById = (id, tweets) => {
    return tweets.find(tweet => tweet.id === id)
};

Utils.responseWebParseHTML = (reply, html) => {
   return reply(html)
};

Utils.redirectHomeResponse = (res) => {
    res.redirect('http://localhost:3000/');
};

Utils.splitValues = (body) => {
    return Utils.splitForUpdate(body)
    .then((obj) => {
        const newobj = JSON.parse(obj)
        const arr = [newobj];
        return Promise.resolve(JSON.stringify(arr))
    });
};