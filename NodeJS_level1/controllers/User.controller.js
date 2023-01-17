const createError = require('http-errors')
const User = require('../models/User.model');
const { userValidate } = require('../helpers/validation')
const { signAccessToken, signRefreshToken, verifyRefreshToken } = require('../helpers/jwt_service');
const client = require('../helpers/connections_redis');


const register = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const { error } = userValidate(req.body);
        console.log(`:::error validation:::`, error);
        if (error) {
            throw createError(error.details[0].message);
        }

        // if (!email || !password) {
        //     throw createError.BadRequest()
        // }

        const isExist = await User.findOne({ email })

        if (isExist) {
            throw createError.Conflict(`${email} is ready been registered!`)
        }

        const user = new User({
            email,
            password
        })

        const savedUser = await user.save();

        return res.json({ status: 'okay', elements: savedUser })
    }
    catch (error) {
        next(error)
    }
}

const refreshToken = async (req, res, next) => {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken) {
            throw createError.BadRequest();
        }

        const { userId } = await verifyRefreshToken(refreshToken);
        const newAccessToken = await signAccessToken(userId);
        const newRefreshToken = await signRefreshToken(userId);
        res.json({
            accessToken: newAccessToken,
            refreshToken: newRefreshToken
        })
    }
    catch (error) {
        next(error)
    }
}

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const { error } = userValidate(req.body);
        if (error) {
            throw createError(error.details[0].message)
        }

        const user = await User.findOne({ email });
        if (!user) {
            throw createError.NotFound(`User not regiestered`)
        }

        const isValid = await user.isCheckPassword(password)
        if (!isValid) throw createError.Unauthorized();

        const accessToken = await signAccessToken(user._id);
        const refreshToken = await signRefreshToken(user._id);
        res.json({
            accessToken,
            refreshToken
        })
    }
    catch (error) {
        next(error)
    }
}

const logout = async (req, res, next) => {
    try {
        const { refreshToken } = req.body
        if (!refreshToken) {
            throw createError.BadRequest();
        }
        const { userId } = await verifyRefreshToken(refreshToken);
        client.del(userId.toString())
            .catch(() => {
                throw createError.InternalServerError();
            })

        res.json({
            message: 'Logout!'
        })

    } catch (error) {
        next(error);
    }
}

const getLists = (req, res, next) => {
    console.log(req.headers)

    const listUsers = [
        {
            email: 'abc@gmail.com'
        },
        {
            email: 'def@gmail.com'
        }
    ]
    res.json({
        listUsers
    })
}

module.exports = {
    register,
    refreshToken,
    login,
    logout,
    getLists
}