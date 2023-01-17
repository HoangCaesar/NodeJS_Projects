const JWT = require('jsonwebtoken');
const createError = require('http-errors');
const client = require('../helpers/connections_redis');

const signAccessToken = async (userId) => {
    return new Promise((resolve, reject) => {
        const payload = {
            userId
        }
        const secret = process.env.ACCESS_TOKEN_SECRET;
        const options = {
            expiresIn: '1h' // 10m10s
        }

        JWT.sign(payload, secret, options, (err, token) => {
            if (err) reject(err)
            resolve(token)
        })
    })
}

const verifyAccessToken = (req, res, next) => {
    if (!req.headers['authorization']) {
        return next(createError.Unauthorized())
    }

    const authHeader = req.headers['authorization'];
    const bearerToken = authHeader.split(" ");
    const token = bearerToken[1];

    JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, payload) => {
        if (error) {
            if (error.name === "JsonWebTokenError") {
                return next(createError.Unauthorized())
            }
            return next(createError.Unauthorized(error.message))
        }
        req.payload = payload;
        next();
    })
}

const signRefreshToken = async (userId) => {
    return new Promise((resolve, reject) => {
        const payload = {
            userId
        }
        const secret = process.env.REFRESH_TOKEN_SECRET;
        const options = {
            expiresIn: '1y' // 10m10s
        }

        const A_YEAR_IN_SECONDS = 365 * 24 * 60 * 60
        JWT.sign(payload, secret, options, (err, token) => {
            if (err) reject(err);
            client
                .set(userId.toString(), token)
                .then(() => resolve(token))
                .catch(err => reject(createError.InternalServerError()));
            client.expire(userId.toString(), A_YEAR_IN_SECONDS)
        })
    })
}

const verifyRefreshToken = (refreshToken) => {
    return new Promise((resolve, reject) => {
        JWT.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (error, payload) => {
            if (error) {
                return reject(error)
            }
            client.get(payload.userId)
                .then((res) => {
                    if (refreshToken === res) {
                        return resolve(payload)
                    }
                    return reject(createError.Unauthorized())
                })
                .catch(err => {
                    return reject(createError.InternalServerError())
                })
        })
    })
}

module.exports = {
    signAccessToken, verifyAccessToken, signRefreshToken, verifyRefreshToken
}




