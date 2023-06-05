

const mongoose = require('mongoose');


const GlobalResponseSchema = mongoose.Schema({
    ok: {
        type: Boolean,
        require: true
    },
    data: {
        type: Array
    }
})


module.exports = mongoose.model('GlobalResponse', GlobalResponseSchema);