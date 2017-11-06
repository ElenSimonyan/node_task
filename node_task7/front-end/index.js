
const Hapi = require('hapi');
const routes = require('./routes');
const server = new Hapi.Server();

server.connection({
    host: 'localhost',
    port: 3000,
});

// server.register(require('vision'), (err) => {
//     if (err) {
//         throw err;
//     }
//     server.views({
//         engines: { html: require('handlebars') },
//         path: __dirname + '/public',
//     });
//
//     server.route(routes);
// });
server.route(routes);

server.start((err) => {
    if (err) throw err;
    console.log('Server running at:', server.info.uri);
});




