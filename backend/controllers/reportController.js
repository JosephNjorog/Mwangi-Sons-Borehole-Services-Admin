const asyncHandler = require('express-async-handler');
const { Report, Charge } = require('../models');

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
    }),
};

module.exports = reportController;
