const express = require('express');
const app = express();
const createError = require('http-errors');
const AppRouter = require('./routes/User.route')
require('dotenv').config()
// require('./helpers/connections_mongodb');
const client = require('./helpers/connections_redis');

client
    .set('foo', 'bar')
    .then((res) => console.log(res))
    .catch((err) => console.log(err))
    
client
    .get('foo')
    .then((res) => console.log(res))
    .catch((err) => {
        throw createError.BadRequest(err)
    })

// app.get('/', (req, res, next) => {  
//     console.log("a:::", a);
//     res.send('Home page')
// });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/user', AppRouter)

app.use((req, res, next) => {
    // const error = new Error('Not Found');
    // error.status = 500;
    // next(error);
    next(createError.NotFound('This router does not exist.'))
})

app.use((err, req, res, next) => {
    res.json({
        status: err.status || 500,
        message: err.message
    })
})

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})
