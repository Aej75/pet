const express = require('express');

const router = express.Router();

const Pet = require('../../model/Pet');

const GlobalResponse = require('../../model/global_response')
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

const authRequired = require('../../middleware/auth_required');
const RequestedPet = require('../../model/requested_pet');
const upload = require('../../middleware/multer');
const cloudinary = require('../../utils/cloudinary');

router.get('/all_pets', async (req, res) => {
    try {
        // console.log('Loading');

        const pets = await Pet.find();
        console.log(pets);
        const finalResponse = GlobalResponse({
            ok: true,
            data: pets
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


//Register the pet here ===============>
router.post('/register', authRequired, upload.array('images', 5), [
    body('name').notEmpty().withMessage('Name of your pet is required'),
    body('age').notEmpty().withMessage('Age is required'),
    body('breed').notEmpty().withMessage('Breed is required'),
    body('gender').notEmpty().withMessage('Gender is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('weight').notEmpty().withMessage('Weight is required'),
    body('nature').notEmpty().withMessage('Nature is required'),

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

        const imagesPaths = req.files.map(file => file.path);
        const { name, age, breed, gender, description, weight, nature } = req.body;


        let imageLink = [];

        await Promise.all(
            imagesPaths.map(
                async (e) => await cloudinary.v2.uploader.upload(e).then(
                    (e) => {
                        imageLink.push(e.secure_url);
                    }
                ).catch(e => {
                    throw Error('Image upload Failed!')

                })
            )
        );

        console.log(imageLink);

        const petDetails = Pet({
            name,
            age,
            breed,
            gender,
            description,
            weight,
            images: imageLink,
            nature,
            ownerId: req.user._id,
        });


        const savedPetDetails = await petDetails.save();

        const finalResponse = GlobalResponse({
            ok: true,
            data: savedPetDetails
        });

        res.json(finalResponse);


    } catch (e) {
        const finalResponse = GlobalResponse({
            ok: false,
            message: e.message
        });
        res.status(404).json(finalResponse);
    }
});

// ==========get your added pet=================== //
router.get('/my_pet', async (req, res) => {

    try {
        // Extract the authorization token from the request headers
        const token = req.headers.authorization;

        // Verify and decode the token to get the user information
        const decodedToken = jwt.verify(token, 'secretKey');
        const userId = decodedToken.userId;
        // console.log(userId);


        // Fetch the user details from the database based on the user ID
        const pets = await Pet.find({ ownerId: userId });
        // console.log(pets);

        if (!userId) {
            // Handle case when user is not found
            const finalResponse = GlobalResponse({
                ok: false,
                message: 'User not found'
            });
            return res.status(404).json(finalResponse);
        }


        const finalResponse = GlobalResponse({
            ok: true,
            data: pets
        });
        return res.json(finalResponse);


    } catch (e) {
        const finalResponse = GlobalResponse({
            ok: false,
            message: "Please login!"
        });
        res.json(finalResponse);
    }

});

router.post('/request', authRequired, async (req, res) => {
    try {
        const user = req.user;

        const { petID } = req.body;
        const model = RequestedPet({
            senderID: user._id,
            requestedDate: Date.now(),
            petID: petID
        });

        const saveToDB = await model.save();

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