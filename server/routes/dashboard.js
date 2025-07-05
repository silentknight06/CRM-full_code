const express = require('express');
const router = express.Router();
const {
  getDashboardStats,
  getSalesAnalytics,
  getRecentActivities,
  getEmployeeDashboard,
  getActivitySummary
} = require('../controllers/dashboardController');
const {
  authenticateToken,
  requireAdmin,
  requireEmployeeOrAdmin,
  sanitizeInput
} = require('../middleware/auth');

// Apply input sanitization to all routes
router.use(sanitizeInput);

// @route   GET /api/dashboard/stats
// @desc    Get dashboard statistics
// @access  Admin
router.get('/stats', authenticateToken, requireAdmin, getDashboardStats);

// @route   GET /api/dashboard/analytics
// @desc    Get sales analytics
// @access  Admin
router.get('/analytics', authenticateToken, requireAdmin, getSalesAnalytics);

// @route   GET /api/dashboard/activities
// @desc    Get recent activities
// @access  Admin
router.get('/activities', authenticateToken, requireAdmin, getRecentActivities);

// @route   GET /api/dashboard/activity-summary
// @desc    Get activity summary
// @access  Admin
router.get('/activity-summary', authenticateToken, requireAdmin, getActivitySummary);

// @route   GET /api/dashboard/employee
// @desc    Get employee dashboard data
// @access  Employee
router.get('/employee', authenticateToken, requireEmployeeOrAdmin, getEmployeeDashboard);

module.exports = router; 