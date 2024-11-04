const mongoose = require('mongoose');

const chargeSchema = new mongoose.Schema({
    service: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service',
        required: true
    },
    surveyFee: {
        type: Number,
        required: true
    },
    localAuthorityFee: {
        type: Number,
        required: true
    },
    drillingCost: {
        type: Number,
        required: true
    },
    pumpInstallationCost: {
        type: Number,
        default: 0
    },
    plumbingCost: {
        type: Number,
        default: 0
    },
    tax: {
        type: Number,
        required: true
    },
    totalAmount: {
        type: Number,
        required: true
    },
    isPaid: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Charge', chargeSchema);