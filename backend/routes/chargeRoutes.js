const express = require('express');
const router = express.Router();
const {
    calculateCharges,
    getServiceCharges,
    updatePaymentStatus,
    getAllCharges
} = require('../controllers/chargeController');

// Route for getting all charges
router.route('/')
    .get(getAllCharges); // Assuming you have this function defined in chargeController

// Route for calculating charges
router.route('/calculate')
    .post(calculateCharges);

// Route for getting charges for a specific service
router.route('/service/:serviceId')
    .get(getServiceCharges);

// Route for updating payment status for a specific charge
router.route('/:id/payment')
    .put(updatePaymentStatus); // Ensure the ID is being used correctly

module.exports = router;