// const express = require('express');
// const cors = require('cors');
// const mongoose = require('mongoose');
// require('dotenv').config();

// const app = express();
// const port = process.env.PORT || 5000;

// // Middleware
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));



// // MongoDB Connection
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// }).then(() => {
//   console.log('MongoDB connected successfully');
// }).catch((err) => {
//   console.error(' MongoDB connection error:', err);
//   process.exit(1);
// });

// // Import routes
// const authRoutes = require('./routes/auth');
// const employeeRoutes = require('./routes/employees');
// const leadRoutes = require('./routes/leads');
// const dashboardRoutes = require('./routes/dashboard');

// // API routes
// app.use('/api/auth', authRoutes);
// app.use('/api/employees', employeeRoutes);
// app.use('/api/leads', leadRoutes);
// app.use('/api/dashboard', dashboardRoutes);

// // Health check endpoint
// app.get('/', (req, res) => {
//   res.json({
//     message: 'CanovaCRM API is running',
//     version: '1.0.0',
//     status: 'healthy',
//     timestamp: new Date().toISOString()
//   });
// });

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error('Error:', err.stack);
//   res.status(500).json({
//     success: false,
//     message: 'Something went wrong!',
//     error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
//   });
// });

// // 404 handler
// app.use('*', (req, res) => {
//   res.status(404).json({
//     success: false,
//     message: 'Route not found'
//   });
// });

// // Start server
// app.listen(port, () => {
//   console.log(`🚀 Server is running on port: ${port}`);
//   console.log(`📊 API Documentation: http://localhost:${port}`);
//   console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
// }); 

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// ✅ Import routes FIRST before using them
const authRoutes = require('./routes/auth');
const employeeRoutes = require('./routes/employees');
const leadRoutes = require('./routes/leads');
const dashboardRoutes = require('./routes/dashboard');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Now safe to register routes
console.log("Registering /api/auth routes...");
app.use('/api/auth', authRoutes);
console.log("Registering /api/employees routes...");
app.use('/api/employees', employeeRoutes);
console.log("Registering /api/leads routes...");
app.use('/api/leads', leadRoutes);
console.log("Registering /api/dashboard routes...");
app.use('/api/dashboard', dashboardRoutes);

// MongoDB Connection
if (!process.env.MONGO_URI) {
  console.error('❌ MONGO_URI not set in .env file');
  process.exit(1);
}
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('✅ MongoDB connected successfully');
}).catch((err) => {
  console.error('❌ MongoDB connection error:', err);
  process.exit(1);
});

// Health check
app.get('/', (req, res) => {
  res.json({
    message: 'CanovaCRM API is running',
    version: '1.0.0',
    status: 'healthy',
    timestamp: new Date().toISOString()
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Server is running on port: ${port}`);
  console.log(`📊 API Docs: http://localhost:${port}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
});
