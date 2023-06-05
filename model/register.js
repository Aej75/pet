const mongoose = require('mongoose');

const RegisterSchema = mongoose.Schema({
    fullName: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    contact: {
        type: String,
        require: true
    },
    country: {
        type: String,
        require: true
    },
    city: {
        type: String,
        require: true
    },
    street: {
        type: String,
        require: true
    },
    imageBase64: {
        type: String,
        require: true
    },
});

module.exports = mongoose.model('Register', RegisterSchema);