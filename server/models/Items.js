const mongoose = require('mongoose');

const HotelSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    hotelName: {
        type: String,
        required: true // This field is required
    },
    province: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    email: {
        type: String,
    },
    contactAddress: {
        type: String,
        required: true
    },
    picture: [{
        type: String,
    }],
    context: {
        type: String
    },
    eventTypes: {
        seminar: {
            type: Boolean,
            default: false
        },
        wedding: {
            type: Boolean,
            default: false
        },
        party: {
            type: Boolean,
            default: false
        }
    },
    details: {
        type: String
    }
}, { timestamps: true });

// Export the model
module.exports = mongoose.model('Hotel', HotelSchema);
