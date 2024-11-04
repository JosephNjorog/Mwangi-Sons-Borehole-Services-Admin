// models/Client.js
const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please add a valid email']
    },
    phone: {
        type: String,
        required: [true, 'Please add a phone number']
    },
    address: {
        type: String,
        required: [true, 'Please add an address']
    }
}, {
    timestamps: true
});

// models/Service.js
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

// models/Charge.js
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

// models/Report.js
const reportSchema = new mongoose.Schema({
    reportType: {
        type: String,
        required: true,
        enum: ['Client', 'Service', 'Revenue', 'Tax']
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    data: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    }
}, {
    timestamps: true
});

module.exports = {
    Client: mongoose.model('Client', clientSchema),
    Service: mongoose.model('Service', serviceSchema),
    Charge: mongoose.model('Charge', chargeSchema),
    Report: mongoose.model('Report', reportSchema)
};