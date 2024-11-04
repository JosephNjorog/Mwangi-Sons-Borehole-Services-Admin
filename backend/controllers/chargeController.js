const asyncHandler = require('express-async-handler');
const Charge = require('../models/Charge');
const Service = require('../models/Service');

const chargeController = {
    // Calculate charges
    calculateCharges: asyncHandler(async (req, res) => {
        const { serviceId, surveyFee, localAuthorityFee, drillingCost, pumpInstallationCost, plumbingCost } = req.body;

        const service = await Service.findById(serviceId);
        if (!service) {
            res.status(404);
            throw new Error('Service not found');
        }

        // Calculate tax (assuming 16% VAT)
        const subtotal = surveyFee + localAuthorityFee + drillingCost + pumpInstallationCost + plumbingCost;
        const tax = subtotal * 0.16;
        const totalAmount = subtotal + tax;

        const charge = await Charge.create({
            service: serviceId,
            surveyFee,
            localAuthorityFee,
            drillingCost,
            pumpInstallationCost,
            plumbingCost,
            tax,
            totalAmount
        });

        res.status(201).json(charge);
    }),

    // Get charges for a service
    getServiceCharges: asyncHandler(async (req, res) => {
        const charges = await Charge.find({ service: req.params.serviceId }).populate('service');
        if (!charges || charges.length === 0) {
            res.status(404);
            throw new Error('Charges not found for this service');
        }
        res.status(200).json(charges);
    }),

    // Update payment status
    updatePaymentStatus: asyncHandler(async (req, res) => {
        const charge = await Charge.findByIdAndUpdate(req.params.id, { isPaid: req.body.isPaid }, { new: true });

        if (!charge) {
            res.status(404);
            throw new Error('Charge record not found');
        }

        res.status(200).json(charge);
    }),

    // Get all charges (added this function as per your routes)
    getAllCharges: asyncHandler(async (req, res) => {
        const charges = await Charge.find().populate('service'); // Adjust based on your model relationships
        res.status(200).json(charges);
    }),
};

module.exports = chargeController;