
const User = require('../model/User');
const GlobalResponse = require('../model/global_response')
const bcrypt = require('bcrypt');

// comparePassword middleware


const comparePasswordMiddleware = async (req, res, next) => {
    try {
        // Get the password from the request body
        const { old_password } = req.body;
        console.log(old_password);
        // Access the user object from the request
        const user = req.user;
        // Compare the password with the user's stored password
        const hashedPassword = user.password;
        const comparePassword = await bcrypt.compare(old_password, hashedPassword);

        req.compare = comparePassword
        next(); // Call the next middleware
    } catch (error) {
        const finalErrorRespnse = GlobalResponse({
            ok: false,
            message: error.message
        });
        return res.status(400).json(finalErrorRespnse);
    }
}

module.exports = comparePasswordMiddleware;
