const bcrypt = require('bcrypt');
const global_response = require('../model/global_response');


const passwordHash = async (req, res, next) => {
    try {
        const newpassword = req.body.new_password;
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(newpassword, saltRounds);

        req.hashedPassword = hashedPassword;
        next();

    } catch (error) {
        const finalErrorRespnse = global_response({
            ok: false,
            message: error.message
        });
        return res.status(400).json(finalErrorRespnse);
    }
}

module.exports = passwordHash