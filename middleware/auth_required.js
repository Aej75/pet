const User = require("../model/User");

const jwt = require('jsonwebtoken');
const GlobalResponse = require('../model/global_response')


const authRequired = async (req, res, next) => {
    try {
        const token = req.headers.authorization;

        if (!token) {
            throw Error('Authorization Token is required');
        }
        if (!token.includes('Bearer')) {
            throw Error('Your token is invalid');
        }


        const tokenWithoutBearer = token.replace('Bearer ', '');

        // console.log(tokenWithoutBearer);

        // Verify and decode the token to get the user information
        jwt.verify(tokenWithoutBearer, 'secretKey', async (error, data) => {

            if (error) {
                console.log(error.message)

                const finalErrorRespnse = GlobalResponse({
                    ok: false,
                    message: error.message
                });
                return res.status(400).json(finalErrorRespnse);
            }


            const user = await User.findById(data.userId);
            if (!user) {
                const finalErrorRespnse = GlobalResponse({
                    ok: false,
                    message: 'Login required!'
                });
                return res.status(400).json(finalErrorRespnse);
            }
            req.user = user;

            next();
        });
    } catch (error) {
        const finalErrorRespnse = GlobalResponse({
            ok: false,
            message: error.message
        });
        return res.status(400).json(finalErrorRespnse);
    }
}

module.exports = authRequired;