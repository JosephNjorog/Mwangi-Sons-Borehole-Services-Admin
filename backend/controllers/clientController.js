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

        const client = await Client.create({ name, email, phone, address });
        res.status(201).json(client);
    }),

    // Update client
    updateClient: asyncHandler(async (req, res) => {
        const client = await Client.findById(req.params.id);

        if (!client) {
            res.status(404);
            throw new Error('Client not found');
        }

        const updatedClient = await Client.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
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
    }),
};

module.exports = clientController;
