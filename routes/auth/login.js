const express = require('express');
const router = express.Router();

const User = require('../../model/User')
const bcrypt = require('bcrypt');
const { model } = require('mongoose');
const jwt = require('jsonwebtoken');

const GlobalResponse = require('../../model/global_response')

router.post('/login', async (req, res) => {

    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        const hashedPassword = user.password;

        const comparePassword = await bcrypt.compare(password, hashedPassword);

        if (comparePassword) {
            // Passwords match, create an access token with an expiration time
            const jwtAccessToken = jwt.sign({ userId: user._id }, 'secretKey', { expiresIn: '1h' });


            const finalResponse = GlobalResponse({
                ok: true,
                accessToken: jwtAccessToken
            });
            res.json(finalResponse);
        } else {
            const finalResponse = GlobalResponse({
                ok: false,
                message: "Invalid Password!"
            });
            res.json(finalResponse);
        }

    } catch (e) {
        const finalResponse = GlobalResponse({
            ok: false,
            message: 'Account doesn\'t exist'
        });
        res.json(finalResponse);
    }
});



module.exports = router;

