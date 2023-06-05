const mongoose = require('mongoose');


const PetSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    breed: {
        type: String,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },

    gender: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    images: {
        type: [String],
        required: true
    },

    nature: {
        type: [String],
        required: true
    }

});

module.exports = mongoose.model('Pet', PetSchema);