const express = require('express');
const router = express.Router();
const {
    getServices,
    getService,
    createService,
    updateService,
    deleteService,
    updateServiceStatus
} = require('../controllers/serviceController');

router.route('/')
    .get(getServices)
    .post(createService);

router.route('/:id')
    .get(getService)
    .put(updateService)
    .delete(deleteService);

router.route('/:id/status')
    .put(updateServiceStatus);

module.exports = router;