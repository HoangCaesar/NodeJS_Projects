const Router = require('express').Router();

Router.use('/users', require('./User.route'));
Router.use('/feeds', require('./Feed.route'));

module.exports = Router;