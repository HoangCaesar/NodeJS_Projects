const express = require('express');
require('dotenv').config();
const helmet = require('helmet');
const morgan = require('morgan');
const mongoose = require('mongoose');
const createError = require('http-errors');
const { v4: uuid } = require('uuid');

// Project Import
const appRouter = require('./src/v1/routes');
const logEvents = require('./src/v1/helpers/logEvents');

// ===================================== SERVER =====================================

const app = express();
app.use(helmet());
app.use(morgan('dev'));

// mongoose
//     .connect('mongodb://127.0.0.1:27017')
//     .then(() => {
//         console.log('MongoDB connected!')
//     })
//     .catch(error => {
//         console.error('Connection to mongoDB failed!')
//     })

mongoose.connect('mongodb://127.0.0.1:27017/users', { serverSelectionTimeoutMS: 3000 });

mongoose.connection.on('connected', () => {
    console.log('MongoDB is connected!');
});

process.on('SIGINT', async () => {
    await mongoose.connection.close();
    process.exit(0);
});

mongoose.connection.on('disconnected', () => {
    console.log('MongoDB disconnected!');
});

mongoose.connection.on('error', (error) => {
    console.log(error.message);
});

app.use('/api/v1/', appRouter);

app.use((req, res, next) => {
    // res.status(404);
    // res.json({
    //     status: 404,
    //     message: 'Not found',
    //     links: {
    //         docs: 'https://doc.com/api',
    //     },
    // });
    next(createError(404, 'Not Found!'));
});

app.use((err, req, res, next) => {
    logEvents(`${req.method} ${req.url} ${req.status || 500} ${err.message} *** ID-Error: ${uuid()}`);
    res.status(err.status || 500);
    res.json({
        status: err.status || 500,
        message: err.message,
        // links: {
        //     'docs': 'https://doc.com/api'
        // }
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
});
