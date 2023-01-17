const Router = require('express').Router();
const { verifyAccessToken } = require('../helpers/jwt_service');
const { register, refreshToken, login, logout, getLists } = require('../controllers/User.controller')

Router.post('/register', register)

Router.post('/refresh-token', refreshToken)

Router.post('/login', login)

Router.delete('/logout', logout)

Router.get('/getlists', verifyAccessToken, getLists)

module.exports = Router