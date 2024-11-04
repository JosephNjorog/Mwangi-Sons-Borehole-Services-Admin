const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');
const { errorHandler, notFound } = require('./middleware/errorMiddleware');
const clientRoutes = require('./routes/clientRoutes');  // Ensure this path is correct
const serviceRoutes = require('./routes/serviceRoutes');  // Import for service routes
const chargeRoutes = require('./routes/chargeRoutes');    // Import for charge routes
const reportRoutes = require('./routes/reportRoutes');    // Import for report routes

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/clients', clientRoutes);   // Correct usage
app.use('/api/services', serviceRoutes);   // Correct usage
app.use('/api/charges', chargeRoutes);     // Correct usage
app.use('/api/reports', reportRoutes);     // Correct usage

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
