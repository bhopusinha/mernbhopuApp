const jwt = require('jsonwebtoken');
const User = require('../models/userLoginModel');
const ErroHandler = require('../utils/errorHandler');

const isAuthenticate = async (req, res, next) => {

    const { token } = req.cookies;

    if (!token || token.length < 15) {
        return next(new ErroHandler("to access this resource you need to login!", 400));
    }

    const decodeData = await jwt.verify(token, process.env.SECRET_TOKEN_KEY);

    req.user = await User.findById(decodeData.userId);

    next();
}

module.exports = { isAuthenticate };