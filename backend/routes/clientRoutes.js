// routes/clientRoutes.js
const express = require('express');
const router = express.Router();
const { clientController } = require('../controllers');

router.route('/')
    .get(clientController.getClients)
    .post(clientController.createClient);

router.route('/:id')
    .get(clientController.getClient)
    .put(clientController.updateClient)
    .delete(clientController.deleteClient);

// routes/serviceRoutes.js
const express = require('express');
const router = express.Router();
const { serviceController } = require('../controllers');

router.route('/')
    .get(serviceController.getServices)
    .post(serviceController.createService);

router.route('/:id/status')
    .put(serviceController.updateServiceStatus);

// routes/chargeRoutes.js
const express = require('express');
const router = express.Router();
const { chargeController } = require('../controllers');

router.post('/calculate', chargeController.calculateCharges);
router.get('/service/:serviceId', chargeController.getServiceCharges);
router.put('/:id/payment', chargeController.updatePaymentStatus);

// routes/reportRoutes.js
const express = require('express');
const router = express.Router();
const { reportController } = require('../controllers');

router.post('/revenue', reportController.generateRevenueReport);
router.get('/', reportController.getReports);
router.get('/:id', reportController.getReport);

module.exports = {
    clientRoutes: require('./clientRoutes'),
    serviceRoutes: require('./serviceRoutes'),
    chargeRoutes: require('./chargeRoutes'),
    reportRoutes: require('./reportRoutes')
};