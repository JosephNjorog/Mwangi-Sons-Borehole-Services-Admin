// controllers/clientController.js
const asyncHandler = require('express-async-handler');
const { Client } = require('../models');

const clientController = {
    // Get all clients
    getClients: asyncHandler(async (req, res) => {
        const clients = await Client.find({});
        res.status(200).json(clients);
    }),

    // Get single client
    getClient: asyncHandler(async (req, res) => {
        const client = await Client.findById(req.params.id);
        if (!client) {
            res.status(404);
            throw new Error('Client not found');
        }
        res.status(200).json(client);
    }),

    // Create client
    createClient: asyncHandler(async (req, res) => {
        const { name, email, phone, address } = req.body;
        
        const clientExists = await Client.findOne({ email });
        if (clientExists) {
            res.status(400);
            throw new Error('Client already exists');
        }

        const client = await Client.create({
            name,
            email,
            phone,
            address
        });

        res.status(201).json(client);
    }),

    // Update client
    updateClient: asyncHandler(async (req, res) => {
        const client = await Client.findById(req.params.id);
        
        if (!client) {
            res.status(404);
            throw new Error('Client not found');
        }

        const updatedClient = await Client.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        res.status(200).json(updatedClient);
    }),

    // Delete client
    deleteClient: asyncHandler(async (req, res) => {
        const client = await Client.findById(req.params.id);
        
        if (!client) {
            res.status(404);
            throw new Error('Client not found');
        }

        await client.remove();
        res.status(200).json({ message: 'Client removed' });
    })
};

// controllers/serviceController.js
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
        const service = await Service.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true, runValidators: true }
        );
        
        if (!service) {
            res.status(404);
            throw new Error('Service not found');
        }

        res.status(200).json(service);
    })
};

// controllers/chargeController.js
const asyncHandler = require('express-async-handler');
const { Charge, Service } = require('../models');

const chargeController = {
    // Calculate charges
    calculateCharges: asyncHandler(async (req, res) => {
        const { serviceId, surveyFee, localAuthorityFee, drillingCost, 
                pumpInstallationCost, plumbingCost } = req.body;

        const service = await Service.findById(serviceId);
        if (!service) {
            res.status(404);
            throw new Error('Service not found');
        }

        // Calculate tax (assuming 16% VAT)
        const subtotal = surveyFee + localAuthorityFee + drillingCost + 
                        pumpInstallationCost + plumbingCost;
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
        const charges = await Charge.findOne({ service: req.params.serviceId })
                                  .populate('service');
        if (!charges) {
            res.status(404);
            throw new Error('Charges not found for this service');
        }
        res.status(200).json(charges);
    }),

    // Update payment status
    updatePaymentStatus: asyncHandler(async (req, res) => {
        const charge = await Charge.findByIdAndUpdate(
            req.params.id,
            { isPaid: req.body.isPaid },
            { new: true }
        );
        
        if (!charge) {
            res.status(404);
            throw new Error('Charge record not found');
        }

        res.status(200).json(charge);
    })
};

// controllers/reportController.js
const asyncHandler = require('express-async-handler');
const { Report, Charge, Service, Client } = require('../models');

const reportController = {
    // Generate revenue report
    generateRevenueReport: asyncHandler(async (req, res) => {
        const { startDate, endDate } = req.body;

        const charges = await Charge.find({
            createdAt: { 
                $gte: new Date(startDate), 
                $lte: new Date(endDate) 
            }
        }).populate('service');

        const revenueData = {
            totalRevenue: charges.reduce((acc, curr) => acc + curr.totalAmount, 0),
            totalTax: charges.reduce((acc, curr) => acc + curr.tax, 0),
            serviceBreakdown: charges.reduce((acc, curr) => {
                const serviceType = curr.service.serviceType;
                acc[serviceType] = (acc[serviceType] || 0) + curr.totalAmount;
                return acc;
            }, {})
        };

        const report = await Report.create({
            reportType: 'Revenue',
            startDate,
            endDate,
            data: revenueData
        });

        res.status(201).json(report);
    }),

    // Get all reports
    getReports: asyncHandler(async (req, res) => {
        const reports = await Report.find({});
        res.status(200).json(reports);
    }),

    // Get specific report
    getReport: asyncHandler(async (req, res) => {
        const report = await Report.findById(req.params.id);
        if (!report) {
            res.status(404);
            throw new Error('Report not found');
        }
        res.status(200).json(report);
    })
};

module.exports = {
    clientController,
    serviceController,
    chargeController,
    reportController
};