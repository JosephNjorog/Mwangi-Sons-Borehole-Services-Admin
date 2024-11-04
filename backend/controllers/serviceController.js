const Service = require('../models/Service'); // Ensure this path is correct

// Get all services
exports.getServices = async (req, res) => {
    try {
        const services = await Service.find(); // Fetch all services from the database
        res.status(200).json(services); // Send services as JSON response
    } catch (error) {
        res.status(500).json({ message: error.message }); // Handle errors
    }
};

// Get a single service by ID
exports.getService = async (req, res) => {
    try {
        const service = await Service.findById(req.params.id); // Fetch service by ID
        if (!service) return res.status(404).json({ message: 'Service not found' }); // Handle not found
        res.status(200).json(service); // Send service as JSON response
    } catch (error) {
        res.status(500).json({ message: error.message }); // Handle errors
    }
};

// Create a new service
exports.createService = async (req, res) => {
    const newService = new Service(req.body); // Create a new service instance
    try {
        const savedService = await newService.save(); // Save service to the database
        res.status(201).json(savedService); // Send created service as JSON response
    } catch (error) {
        res.status(400).json({ message: error.message }); // Handle validation errors
    }
};

// Update an existing service
exports.updateService = async (req, res) => {
    try {
        const updatedService = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true }); // Update service
        if (!updatedService) return res.status(404).json({ message: 'Service not found' }); // Handle not found
        res.status(200).json(updatedService); // Send updated service as JSON response
    } catch (error) {
        res.status(400).json({ message: error.message }); // Handle validation errors
    }
};

// Delete a service
exports.deleteService = async (req, res) => {
    try {
        const deletedService = await Service.findByIdAndDelete(req.params.id); // Delete service
        if (!deletedService) return res.status(404).json({ message: 'Service not found' }); // Handle not found
        res.status(204).send(); // No content response
    } catch (error) {
        res.status(500).json({ message: error.message }); // Handle errors
    }
};

// Update service status
exports.updateServiceStatus = async (req, res) => {
    try {
        const updatedService = await Service.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status }, // Assuming you send status in the request body
            { new: true }
        );
        if (!updatedService) return res.status(404).json({ message: 'Service not found' }); // Handle not found
        res.status(200).json(updatedService); // Send updated service as JSON response
    } catch (error) {
        res.status(400).json({ message: error.message }); // Handle validation errors
    }
};