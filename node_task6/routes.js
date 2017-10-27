
const routes = [];
module.exports = routes

const Handlers = require('./handlers')

routes.push({
    method: 'GET',
    path:'/api/tweets',
    handler: Handlers.getTweetsAPI
});

routes.push({
    method: 'GET',
    path:'/api/tweets/{id}',
    handler: Handlers.getTweetsAPI
});

routes.push({
    method: 'POST',
    path:'/api/tweets',
    handler: Handlers.createTweetsAPI
});

routes.push({
    method: 'PUT',
    path:'/api/tweets/{id}',
    handler: Handlers.updateTweetsAPI
});

routes.push({
    method: 'DELETE',
    path:'/api/tweets/{id}',
    handler: Handlers.deleteTweetAPI
});

routes.push({
    method: 'GET',
    path: '/delete/{id}',
    handler: Handlers.deleteTweetWEB
});

routes.push({
    method: 'POST',
    path:'/update/{id}',
    handler: Handlers.updateTweetsWEB
});

routes.push({
    method: 'GET',
    path:'/',
    handler: Handlers.getTweetsWEB
});

routes.push({
    method: 'GET',
    path:'/{id}',
    handler: Handlers.getOneTweetWEB
});

routes.push({
    method: 'POST',
    path:'/create',
    handler: Handlers.createTweetsWEB
});