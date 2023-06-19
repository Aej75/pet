const mongoose = require('mongoose');
const UserSchema = mongoose.Schema({


    fullName: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true,
        lowercase: true,
    },
    password: {
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
    isVerified: {
        type: Boolean,
        require: true,
        default: false,
    },
});

module.exports = mongoose.model('User', UserSchema);