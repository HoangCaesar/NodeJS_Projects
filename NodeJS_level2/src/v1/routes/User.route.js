const Router = require('express').Router();
const createError = require('http-errors');

// Get a list of all users
Router.get('/', (req, res, next) => {
    next(createError.InternalServerError("This is an Error to log"))
    // res.json({
    //     status: 'success',
    //     elements: [{
    //         msg: "Get list of users!"
    //     }]
    // })
});

// Get a user
Router.get('/:id', (req, res) => {
    res.json({
        status: 'success',
        elements: [{
            msg: "Get a user!"
        }]
    })
});

// Post a user
Router.post('/', (req, res) => {
    res.json({
        status: 'success',
        elements: [{
            msg: "Post a user!"
        }]
    })
});

// Put a user
Router.patch('/:id', (req, res) => {
    res.json({
        status: 'success',
        elements: [{
            msg: "Patch a user!"
        }]
    })
});

// Delete a user 
Router.delete('/:id', (req, res) => {
    res.json({
        status: 'success',
        elements: [{
            msg: "Delete a user!"
        }]
    })
});

module.exports = Router;