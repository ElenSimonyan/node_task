const Utils = {};
module.exports = Utils;

Utils.apiShowsMessage = mes => {
    let obj = {};
    obj.message = mes;
    return JSON.stringify(obj, null, '\t');
};

Utils.readBody = (request, cb) => {
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

Utils.responsePut = (response) => {
    response.writeHead(200, {'Content-Type': 'application/json'});
    response.write(Utils.apiShowsMessage('Successfully created tweet'));
    response.end();
};

Utils.responsePost = (response) => {
    response.writeHead(200, {'Content-Type': 'application/json'});
    response.write(Utils.apiShowsMessage('tweets were appended'));
    response.end();
};

Utils.responseDelete = (response, urlId, message) => {
    console.log('delete');
    response.writeHead(200, {'Content-Type': 'application/json'});
    response.write(Utils.apiShowsMessage(`Successfully deleted tweet ${urlId} ,${message}`));
    response.end()
};
Utils.responseGet = (response, a) => {
    response.writeHead(200, {'Content-Type': 'application/json'});
    response.write(JSON.stringify(a, null, '\t'));
    response.end()
};

Utils.responseMethodNotFound = (response) => {
    response.writeHead(404, {'Content-Type': 'application/json'});
    response.write('Method not found');
    response.end();
};

Utils.responseNotFound = (response) => {
    response.writeHead(404, {'Content-Type': 'application/json'});
    response.write('not found response');
    response.end();
};

Utils.badRequestResponse = (response,err) => {
    response.writeHead(400, {'Content-Type': 'application/json'});
    response.statusMessage = err;
    response.write(err);
};
