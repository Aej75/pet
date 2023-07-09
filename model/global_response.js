

const mongoose = require('mongoose');


const GlobalResponseSchema = mongoose.Schema({
    ok: {
        type: Boolean,
        require: true
    },

    data: {
        type: Object,
        default: undefined
    },

    message: {
        type: String,
        default: undefined
    },
    accessToken: {
        type: String,
        default: undefined
    },
    uid: {
        type: String,
        default: undefined
    },
})


module.exports = mongoose.model('GlobalResponse', GlobalResponseSchema);