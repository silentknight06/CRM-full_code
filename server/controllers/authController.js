const jwt = require('jsonwebtoken');
const Employee = require('../models/Employee');
const Activity = require('../models/Activity');

// Generate JWT token
const generateToken = (userId) => {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );
};

// @desc    Register new employee (Admin only)
// @route   POST /api/auth/register
// @access  Admin
const registerEmployee = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      location,
      preferredLanguage,
      phone,
      department,
      role = 'employee'
    } = req.body;

    // Check if user already exists
    const existingEmployee = await Employee.findOne({ email });
    if (existingEmployee) {
      return res.status(400).json({
        success: false,
        message: 'Employee with this email already exists'
      });
    }

    // Create new employee
    const employee = new Employee({
      firstName,
      lastName,
      email,
      password,
      location,
      preferredLanguage,
      phone,
      department,
      role
    });

    await employee.save();

    // Log activity
    await Activity.logActivity({
      user: req.user._id,
      action: 'employee_created',
      entityType: 'employee',
      entityId: employee._id,
      description: `${req.user.fullName} created new employee ${employee.fullName}`,
      details: { role, department }
    });

    // Return employee data without password
    const employeeData = employee.getPublicProfile();

    res.status(201).json({
      success: true,
      message: 'Employee registered successfully',
      data: employeeData
    });
  } catch (error) {
    console.error('Register error:', error);
    
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error during registration'
    });
  }
};

// @desc    Login employee
// @route   POST /api/auth/login
// @access  Public
const loginEmployee = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }

    // Find employee by email
    const employee = await Employee.findOne({ email });
    if (!employee) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Check if account is active
    if (employee.status !== 'active') {
      return res.status(401).json({
        success: false,
        message: 'Account is inactive. Please contact administrator.'
      });
    }

    // Verify password
    const isPasswordValid = await employee.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Update last login
    await employee.updateLastLogin();

    // Generate token
    const token = generateToken(employee._id);

    // Log activity
    await Activity.logActivity({
      user: employee._id,
      action: 'login',
      entityType: 'auth',
      description: `${employee.fullName} logged in`,
      details: {
        ipAddress: req.ip || req.connection.remoteAddress,
        userAgent: req.get('User-Agent')
      },
      ipAddress: req.ip || req.connection.remoteAddress,
      userAgent: req.get('User-Agent')
    });

    // Return employee data and token
    const employeeData = employee.getPublicProfile();

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        employee: employeeData,
        token
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during login'
    });
  }
};

// @desc    Get current user profile
// @route   GET /api/auth/profile
// @access  Private
const getProfile = async (req, res) => {
  try {
    const employee = await Employee.findById(req.user._id)
      .select('-password')
      .populate('assignedLeads', 'name email company status type');

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found'
      });
    }

    res.json({
      success: true,
      data: employee
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching profile'
    });
  }
};

// @desc    Update current user profile
// @route   PUT /api/auth/profile
// @access  Private
const updateProfile = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      location,
      preferredLanguage,
      phone,
      department
    } = req.body;

    // Find and update employee
    const employee = await Employee.findById(req.user._id);
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found'
      });
    }

    // Update fields
    if (firstName) employee.firstName = firstName;
    if (lastName) employee.lastName = lastName;
    if (location) employee.location = location;
    if (preferredLanguage) employee.preferredLanguage = preferredLanguage;
    if (phone) employee.phone = phone;
    if (department) employee.department = department;

    await employee.save();

    // Log activity
    await Activity.logActivity({
      user: employee._id,
      action: 'employee_updated',
      entityType: 'employee',
      entityId: employee._id,
      description: `${employee.fullName} updated their profile`
    });

    const employeeData = employee.getPublicProfile();

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: employeeData
    });
  } catch (error) {
    console.error('Update profile error:', error);
    
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error while updating profile'
    });
  }
};

// @desc    Change password
// @route   PUT /api/auth/change-password
// @access  Private
const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Current password and new password are required'
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'New password must be at least 6 characters long'
      });
    }

    // Find employee
    const employee = await Employee.findById(req.user._id);
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found'
      });
    }

    // Verify current password
    const isCurrentPasswordValid = await employee.comparePassword(currentPassword);
    if (!isCurrentPasswordValid) {
      return res.status(400).json({
        success: false,
        message: 'Current password is incorrect'
      });
    }

    // Update password
    employee.password = newPassword;
    await employee.save();

    // Log activity
    await Activity.logActivity({
      user: employee._id,
      action: 'password_changed',
      entityType: 'auth',
      description: `${employee.fullName} changed their password`
    });

    res.json({
      success: true,
      message: 'Password changed successfully'
    });
  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while changing password'
    });
  }
};

// @desc    Logout (client-side token removal)
// @route   POST /api/auth/logout
// @access  Private
const logout = async (req, res) => {
  try {
    // Log activity
    await Activity.logActivity({
      user: req.user._id,
      action: 'logout',
      entityType: 'auth',
      description: `${req.user.fullName} logged out`,
      details: {
        ipAddress: req.ip || req.connection.remoteAddress,
        userAgent: req.get('User-Agent')
      },
      ipAddress: req.ip || req.connection.remoteAddress,
      userAgent: req.get('User-Agent')
    });

    res.json({
      success: true,
      message: 'Logout successful'
    });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during logout'
    });
  }
};

// @desc    Verify token validity
// @route   GET /api/auth/verify
// @access  Private
const verifyToken = async (req, res) => {
  try {
    res.json({
      success: true,
      message: 'Token is valid',
      data: {
        user: req.user
      }
    });
  } catch (error) {
    console.error('Token verification error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during token verification'
    });
  }
};

module.exports = {
  registerEmployee,
  loginEmployee,
  getProfile,
  updateProfile,
  changePassword,
  logout,
  verifyToken
}; 