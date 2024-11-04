const express = require('express');
const router = express.Router();
const {
    generateRevenueReport,
    generateClientReport,
    generateServiceReport,
    getReports,
    getReport
} = require('../controllers/reportController');

router.route('/')
    .get(getReports);

router.route('/:id')
    .get(getReport);

router.route('/revenue')
    .post(generateRevenueReport);

router.route('/client')
    .post(generateClientReport);

router.route('/service')
    .post(generateServiceReport);

module.exports = router;