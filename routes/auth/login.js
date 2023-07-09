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

        if (!user) {
            throw new Error('User not found');
        }
        const hashedPassword = user.password;
        const comparePassword = await bcrypt.compare(password, hashedPassword);

        if (comparePassword) {
            // Passwords match, create an access token with an expiration time
            const jwtAccessToken = jwt.sign({ userId: user._id }, 'secretKey', { expiresIn: '1h' });
            const finalResponse = GlobalResponse({
                ok: true,
                accessToken: jwtAccessToken,
                data: user
            });
            res.json(finalResponse);

        } else {
            throw Error("Invalid Password!");
        }

    } catch (e) {
        const finalResponse = GlobalResponse({
            ok: false,
            message: e.message
        });
        res.status(400).json(finalResponse);
    }
});



module.exports = router;

