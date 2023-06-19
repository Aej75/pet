const express = require('express');
const promotion = require('../../model/promotion');
const GlobalResponse = require('../../model/global_response');
const mongoose = require('mongoose');
const router = express.Router();
const { body, validationResult } = require('express-validator');


/////////For user////////////////////////////////
router.get('/all', async (req, res) => {
    console.log('hello');

    try {
        const data = await promotion.find();


        const finalResponse = GlobalResponse({
            ok: true,
            data: data
        })
        res.status(200).json(finalResponse)
    } catch (e) {
        const finalResponse = GlobalResponse({
            ok: false,
            message: e
        });
        res.status(200).json(finalResponse)
    }
});


router.get('/filter', async (req, res) => {

    try {

        const isActive = req.query.isActive;

        const data = await promotion.findOne({ isActive: isActive });


        if (!data) {
            throw Error("No any promotions");
        }


        const finalResponse = GlobalResponse({
            ok: true,
            data: data
        })
        res.status(200).json(finalResponse)
    } catch (e) {
        const finalResponse = GlobalResponse({
            ok: false,
            message: e.message
        });
        res.status(200).json(finalResponse)
    }
});


///////////////////////////////////////////////





///////for admin to add in db//////////////////////////
router.post('/add', [
    body('title').notEmpty().withMessage('title is required'),
    body('description').notEmpty().withMessage('description is required'),
    body('imageURL').notEmpty().withMessage('imageURL information is required'),
    body('endDate').notEmpty().withMessage('endDate is required'),
    body('isActive').notEmpty().withMessage('isActive is required'),
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

    try {
        const { title, description, imageURL, startDate, endDate, isActive } = req.body;

        const data = promotion({
            title, description, imageURL, startDate: Date.now(), endDate, isActive: true
        });

        const saveToMongoose = await data.save();
        console.log('promotion saved');

        const finalResponse = GlobalResponse({
            ok: true,
            data: saveToMongoose
        });

        res.status(201).json(finalResponse);


    } catch (e) {
        const finalResponse = GlobalResponse({
            ok: false,
            message: e
        });

        res.status(400).json(finalResponse);
    }
});

module.exports = router;