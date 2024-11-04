const express = require('express');
const router = express.Router();
const {
    calculateCharges,
    getServiceCharges,
    updatePaymentStatus,
    getAllCharges
} = require('../controllers/chargeController');

router.route('/')
    .get(getAllCharges);

router.route('/calculate')
    .post(calculateCharges);

router.route('/service/:serviceId')
    .get(getServiceCharges);

router.route('/:id/payment')
    .put(updatePaymentStatus);

module.exports = router;