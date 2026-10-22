const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const authRoutes = require('./routes/auth.routes');
const patientRoutes = require('./routes/patient.routes');
const doctorRoutes = require('./routes/doctor.routes');
const mappingRoutes = require('./routes/mapping.routes');
const errorHandler = require('./middleware/error.middleware');

const app = express();



app.use(helmet());
app.use(cors());
app.use(express.json());





const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // limit each IP to 20 requests per windowMs
  message: { success: false, message: 'Too many requests from this IP, please try again after 15 minutes' },
});
app.use('/api/auth', authLimiter);





app.use('/api/auth', authRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/mappings', mappingRoutes);



app.get('/', (req, res) => {
  res.status(200).json({ success: true, message: 'Healthcare Backend API is running' });
});



// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ success: false, message: 'Endpoint not found' });
});



// Centralized Error Handler
app.use(errorHandler);

module.exports = app;