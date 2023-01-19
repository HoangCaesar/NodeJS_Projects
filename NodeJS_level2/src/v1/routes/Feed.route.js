const Router = require('express').Router();

// Get a list of all feeds
Router.get('/', (req, res) => {
    res.json({
        status: 'success',
        elements: [{
            msg: "Get list of feeds!"
        }]
    })
});

// Get a feed
Router.get(/.*fly$/, (req, res) => {
    res.json({
        status: 'success',
        elements: [{
            msg: "/feeds/ab+cd"
        }]
    })
});

// Post a feed
Router.post('/', (req, res) => {
    res.json({
        status: 'success',
        elements: [{
            msg: "Post a feed!"
        }]
    })
});

// Put a feed
Router.patch('/:id', (req, res) => {
    res.json({
        status: 'success',
        elements: [{
            msg: "Patch a feed!"
        }]
    })
});

// Delete a feed 
Router.delete('/:id', (req, res) => {
    res.json({
        status: 'success',
        elements: [{
            msg: "Delete a feed!"
        }]
    })
});

module.exports = Router;