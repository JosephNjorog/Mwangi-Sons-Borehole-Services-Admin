const asyncHandler = require('express-async-handler');
const { Service } = require('../models');

const serviceController = {
    // Get all services
    getServices: asyncHandler(async (req, res) => {
        const services = await Service.find({}).populate('client');
        res.status(200).json(services);
    }),

    // Create service
    createService: asyncHandler(async (req, res) => {
        const service = await Service.create(req.body);
        res.status(201).json(service);
    }),

    // Update service status
    updateServiceStatus: asyncHandler(async (req, res) => {
        const service = await Service.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true, runValidators: true });

        if (!service) {
            res.status(404);
            throw new Error('Service not found');
        }

        res.status(200).json(service);
    }),
};

module.exports = serviceController;
