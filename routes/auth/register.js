const express = require('express');
const User = require('../../model/User');
const GlobalResponse = require('../../model/global_response');
const { body, validationResult } = require('express-validator');

const router = express.Router();
const bcrypt = require('bcrypt');
const authRequired = require('../../middleware/auth_required');


//Register Users
router.post('/register', [
    body('fullName').notEmpty().withMessage('Full name is required'),


    body('email')
        .isEmail().withMessage('Invalid email address')
        .custom(async (value) => {
            const existingUser = await User.findOne({ email: value });
            if (existingUser) {
                return Promise.reject('Email already exists');
            }
        }),

    body('password').notEmpty().withMessage('Password is required'),
    body('contact').notEmpty().withMessage('Contact information is required'),
    body('city').notEmpty().withMessage('City is required'),
    body('street').notEmpty().withMessage('Street address is required'),

], async (req, res) => {
    const errors = validationResult(req);


    //Error handling / Validation 
    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(error => error.msg);

        const finalErrorRespnse = GlobalResponse({
            ok: false,
            message: errorMessages.join(', ')
        });
        return res.status(400).json(finalErrorRespnse);
    }


    const { fullName, email, password, contact, city, street } = req.body;


    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        // console.log(hashedPassword);
        const user = User({
            fullName,
            email,
            password: hashedPassword,
            contact,

            city,
            street,

        });

        const saveToDB = await user.save();

        const finalResponse = GlobalResponse({
            ok: true,
            data: saveToDB
        });

        res.json(finalResponse);
    } catch (e) {
        const finalResponse = GlobalResponse({
            ok: false,
            message: e
        });
        res.json(finalResponse);
    }
});





//Get Users
router.get('/register', async (req, res) => {

    try {
        const user = await User.find();
        const finalResponse = GlobalResponse({
            ok: true,
            data: user
        });


        res.json(finalResponse);
    } catch (e) {
        res.json({ "message": e });

    }
});


//Delete Users

router.delete('/:id', async (req, res) => {

    try {
        const deletedData = await User.deleteOne({ _id: req.params.id });
        const finalResponse = GlobalResponse({ ok: true, data: "Deleted Successfully" });
        res.json(finalResponse);

    } catch (e) {
        res.json({ "message": e });

    }

});


router.patch('/verify', authRequired, async (req, res) => {
    try {
        const user = req.user;
        user.isVerified = req.body.isVerified;

        const saveToDB = await user.save();
        const finalResponse = GlobalResponse({
            ok: true,
            data: saveToDB
        });

        res.json(finalResponse);

    } catch (error) {
        const finalResponse = GlobalResponse({
            ok: false,
            message: error
        });
        res.json(finalResponse);
    }
});
router.post('/avatar', authRequired, async (req, res) => {
    try {
        const user = req.user;
        user.avatar = req.body.avatar;

        const saveToDB = await user.save();
        const finalResponse = GlobalResponse({
            ok: true,
            data: saveToDB
        });

        res.json(finalResponse);

    } catch (error) {
        const finalResponse = GlobalResponse({
            ok: false,
            message: error
        });
        res.json(finalResponse);
    }
});


module.exports = router;

