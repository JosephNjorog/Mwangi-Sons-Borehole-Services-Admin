const express = require('express');
const router = express.Router();
const {
    getServices,
    getService,
    createService,
    updateService,
    deleteService,
    updateServiceStatus
} = require('../controllers/serviceController'); // Ensure this path is correct

// Route for getting all services and creating a new service
router.route('/')
    .get(getServices)         // Fetch all services
    .post(createService);     // Create a new service

// Route for getting, updating, and deleting a service by ID
router.route('/:id')
    .get(getService)         // Fetch a single service by ID
    .put(updateService)      // Update a service by ID
    .delete(deleteService);  // Delete a service by ID

// Route for updating the status of a service by ID
router.route('/:id/status')
    .put(updateServiceStatus); // Update service status by ID

module.exports = router; // Export the router