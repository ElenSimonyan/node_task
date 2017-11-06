
const Hapi = require('hapi');
const routes = require('./routes');
const server = new Hapi.Server();


server.connection({
    host: 'localhost',
    port: 4000,
});

server.route(routes);

server.start((err) => {
    if (err) throw err;
    console.log('Server running at:', server.info.uri);
});




