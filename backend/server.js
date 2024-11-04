const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');
const { errorHandler, notFound } = require('./middleware/errorMiddleware');
const clientRoutes = require('./routes/clientRoutes');  // Make sure this path is correct
const serviceRoutes = require('./routes/serviceRoutes');  // Add similar imports for your other routes
const chargeRoutes = require('./routes/chargeRoutes');
const reportRoutes = require('./routes/reportRoutes');
// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/clients', routes.clientRoutes);
app.use('/api/services', routes.serviceRoutes);
app.use('/api/charges', routes.chargeRoutes);
app.use('/api/reports', routes.reportRoutes);

// Error handling
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});