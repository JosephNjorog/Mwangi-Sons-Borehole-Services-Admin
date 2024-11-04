const express = require('express');
const router = express.Router();
const {
    generateRevenueReport,
    generateClientReport,
    generateServiceReport,
    getReports,
    getReport
} = require('../controllers/reportController');

// Route for getting all reports
router.route('/')
    .get(getReports);

// Route for getting a specific report by ID
router.route('/:id')
    .get(getReport);

// Route for generating a revenue report
router.route('/revenue')
    .post(generateRevenueReport);

// Route for generating a client report
router.route('/client')
    .post(generateClientReport);

// Route for generating a service report
router.route('/service')
    .post(generateServiceReport);

module.exports = router; // Export the router