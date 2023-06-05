const express = require('express');

const router = express.Router();

const Pet = require('../model/Pet');

const GlobalResponse = require('../model/global_response')




//Register pet details;

router.post('/', async (req, res) => {



    const petDetails = Pet({
        name: req.body.name,
        age: req.body.age,
        breed: req.body.breed,
        gender: req.body.gender,
        description: req.body.description,
        weight: req.body.weight,
        images: req.body.images,
        nature: req.body.nature,

    });

    try {

        const savedPetDetails = await petDetails.save();

        const finalResponse = GlobalResponse({
            ok: true,
            data: savedPetDetails
        });

        res.json(finalResponse);

    } catch (e) {
        res.json({ "message": e });

    }

});

module.exports = router;