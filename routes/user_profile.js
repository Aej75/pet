const express = require('express');
const jwt = require('jsonwebtoken');

const User = require('../model/User');
const GlobalResponse = require('../model/global_response');
const { body } = require('express-validator');

const router = express.Router();

router.get('/',
    async (req, res) => {
        try {
            // Extract the authorization token from the request headers
            const token = req.headers.authorization;

            // Verify and decode the token to get the user information
            const decodedToken = jwt.verify(token, 'secretKey');
            const userId = decodedToken.userId;

            // Fetch the user details from the database based on the user ID
            const user = await User.findById(userId);

            if (!user) {
                // Handle case when user is not found
                const finalResponse = GlobalResponse({
                    ok: false,
                    message: 'User not found'
                });
                return res.json(finalResponse);
            }

            // Construct the response object
            const finalResponse = GlobalResponse({
                ok: true,
                data: user
            });

            res.json(finalResponse);
        } catch (e) {
            const finalResponse = GlobalResponse({
                ok: false,
                message: "Please login!"
            });
            res.json(finalResponse);
        }
    });

module.exports = router;
