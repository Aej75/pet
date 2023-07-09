const mongoose = require('mongoose');
const RequestedPetSchema = mongoose.Schema({
    senderID: {
        type: String,
        require: true,
    },
    requestedDate: {
        type: String,
        require: true,
    },
    petID: {
        type: String,
        require: true
    }
});

module.exports = mongoose.model('RequestedPet', RequestedPetSchema);