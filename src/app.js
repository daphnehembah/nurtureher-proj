const express = require('express');
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/users', require('./routes/user.routes'));
app.use('/api/health-profile', require('./routes/healthProfile.routes'));
app.use('/api/health-status', require('./routes/healthStatus.routes'));
app.use('/api/symptoms', require('./routes/symptoms.routes'));
app.use('/api/lifestyle', require('./routes/lifestyle.routes'));
app.use('/api/risk', require('./routes/risk.routes'));
app.use('/api/notifications', require('./routes/notifications.routes'));
app.use('/api/risk', require('./routes/risk.routes'));

// Health check
app.get('/', (req, res) => res.json({ status: 'API is running' }));

// 404 handler
app.use((req, res) => res.status(404).json({ message: 'Route not found' }));

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ message: err.message || 'Server error' });
});

module.exports = app;