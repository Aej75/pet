const mongoose = require('mongoose');


const promotionSchema = mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    imageURL: {
        type: String,
        require: true
    },
    startDate: {
        type: Date,
    },
    endDate: {
        type: Date,
        require: true
    },
    isActive: {
        type: Boolean,
        require: true
    }

});

module.exports = mongoose.model('Promotion', promotionSchema);