const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client',
        required: true
    },
    serviceType: {
        type: String,
        required: [true, 'Please specify service type'],
        enum: ['Drilling', 'Pump Installation', 'Plumbing', 'Survey']
    },
    location: {
        type: String,
        required: [true, 'Please add service location']
    },
    status: {
        type: String,
        enum: ['Pending', 'In Progress', 'Completed'],
        default: 'Pending'
    },
    depth: {
        type: Number,
        required: [true, 'Please specify drilling depth']
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Service', serviceSchema);