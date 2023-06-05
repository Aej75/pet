const express = require('express');
const Register = require('../model/register');
const GlobalResponse = require('../model/global_response');
const { route } = require('./pet_register');

const router = express.Router();



//Register Users
router.post('/', async (req, res) => {

    const registerUser = Register({
        fullName: req.body.fullName,
        email: req.body.email,
        contact: req.body.contact,
        country: req.body.country,
        city: req.body.city,
        street: req.body.street
    });

    try {
        const saveToDB = await registerUser.save();

        const finalResponse = GlobalResponse({
            ok: true,
            data: saveToDB
        });

        res.json(finalResponse);
    } catch (e) {
        res.json({ "message": e });

    }
});



router.get('/', (req, res) => {

});


//Get Users
router.get('/', async (req, res) => {

    try {
        const registeredUsers = await Register.find();


        const finalResponse = GlobalResponse({
            ok: true,
            data: registeredUsers
        });


        res.json(finalResponse);
    } catch (e) {
        res.json({ "message": e });

    }
});


//Delete Users

router.delete('/:id', async (req, res) => {

    try {
        const deletedData = await Register.deleteOne({ _id: req.params.id });
        const finalResponse = GlobalResponse({ ok: true, data: deletedData });
        res.json(finalResponse);

    } catch (e) {
        res.json({ "message": e });

    }

});


module.exports = router;

