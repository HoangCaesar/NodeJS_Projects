const express = require('express');
const { connectToDb, getDb } = require('./db');
const { ObjectId } = require('mongodb');

// Init app & Middleware
const app = express();

// db connection
let db;

connectToDb((err) => {
    if (!err) {
        app.listen(3000, () => {
            console.log('App listening on port 3000');
        });
        db = getDb();
    } else {
        console.log('Failed to Listen')
    }
});

// routes
app.get('/books/:id', (req, res) => {
    if(ObjectId.isValid(req.params.id)) {
        db.collection('books')
            .findOne({_id: ObjectId(req.params.id)})
            .then(doc => {
                res.status(200).json(doc)
            })
            .catch(err => {
                res.status(500).json({err: "Could not fetch the document"})
            })
    } else {
        res.status(500).json({err: "Could not fetch the document"})
    }
})

app.get('/books', (req, res) => {
    let books = [];

    db.collection('books')
        .find()
        .sort({author: 1})
        .forEach(book => books.push(book))
        .then(() => {
            res.status(200).json(books)
        })
        .catch(() => {
            res.status(404).json({err: "Could not fetch the documents"})
        })
})

