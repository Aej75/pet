const express = require('express');
const authRequired = require('../../middleware/auth_required');
const comparePasswordMiddleware = require('../../middleware/compare_password');
const User = require('../../model/User');
const GlobalResponse = require('../../model/global_response');
const bcrypt = require('bcrypt');
const passwordHash = require('../../middleware/password_hashing');

const router = express.Router();

router.post('/', authRequired, comparePasswordMiddleware, passwordHash, async (req, res) => {

    console.log(req.compare);

    try {
        if (req.compare) {
            const user = req.user;

            user.password = req.hashedPassword;

            await user.save();
            const finalResponse = GlobalResponse({
                ok: true,
                message: 'Password successfully changed!'
            });
            res.json(finalResponse);
        } else {
            const finalErrorRespnse = GlobalResponse({
                ok: false,
                message: 'Invalid Old Password'
            });
            return res.status(400).json(finalErrorRespnse);
        }

    } catch (error) {
        const finalErrorRespnse = GlobalResponse({
            ok: false,
            message: error.message
        });
        return res.status(400).json(finalErrorRespnse);
    }
})


module.exports = router;