const Utils = {};
module.exports = Utils;

Utils.apiShowsMessage = mes => {
    let obj = {};
    obj.message = mes;
    obj = JSON.stringify(obj, null, '\t');
    return obj;
};

Utils.responsePut = (response) => {
    return response('Successfully created tweet').header('Content-Type', 'aplication/json');
};

Utils.responsePost = (response) => {
    return response(Utils.apiShowsMessage('tweets were appended')).header('Content-Type', 'aplication/json');;
};

Utils.responseDelete = (response, urlId) => {
    return response(Utils.apiShowsMessage(`Successfully deleted tweet ${urlId}`)).header('Content-Type', 'aplication/json');
};

Utils.responseGet = (response, obj) => {
    return response(JSON.stringify(obj, null, '\t')).header('Content-Type', 'aplication/json');
};

Utils.redirectHomeResponse = (res) => {
    res.redirect('http://localhost:3000/');
};
