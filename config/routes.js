const { about } = require('../controllers/about');
const { catalog } = require('../controllers/catalog');
const { details } = require('../controllers/details');
const { create, post } = require('../controllers/create');
const {post: commentPost} = require('../controllers/comments');
const { notFound } = require('../controllers/notFound');
const { createAccessory,accessoryPost } = require('../controllers/accessory');

module.exports = (app) => {
    app.get('/', catalog);
    app.get('/about', about);
    app.get('/details/:id', details);
    app.get('/create', create);
    app.post('/create', post);
    app.post('/comments/:cubeId/create',commentPost);

    app.get('/accessory/create', createAccessory);
    app.post('/accessory/create', accessoryPost);


    app.all('*', notFound);
}