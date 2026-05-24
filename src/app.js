const express = require('express');
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/users', require('./routes/user.routes'));
app.use('/api/profile', require('./routes/healthProfile.routes'));
app.use('/api/logs', require('./routes/logs.routes'));
app.use('/api/risks', require('./routes/risks.routes'));
app.use('/api/insights', require('./routes/insights.routes'));

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