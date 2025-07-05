const Employee = require('../models/Employee');
const Lead = require('../models/Lead');
const Activity = require('../models/Activity');

// @desc    Get all employees
// @route   GET /api/employees
// @access  Admin
const getAllEmployees = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = '',
      status = '',
      role = '',
      location = '',
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    // Build query
    const query = {};
    
    if (search) {
      query.$text = { $search: search };
    }
    
    if (status) {
      query.status = status;
    }
    
    if (role) {
      query.role = role;
    }
    
    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }

    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Execute query
    const employees = await Employee.find(query)
      .select('-password')
      .populate('assignedLeads', 'name email company status type')
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit));

    // Get total count
    const total = await Employee.countDocuments(query);

    // Calculate pagination info
    const totalPages = Math.ceil(total / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    res.json({
      success: true,
      data: employees,
      pagination: {
        currentPage: parseInt(page),
        totalPages,
        totalItems: total,
        itemsPerPage: parseInt(limit),
        hasNextPage,
        hasPrevPage
      }
    });
  } catch (error) {
    console.error('Get employees error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching employees'
    });
  }
};

// @desc    Get employee by ID
// @route   GET /api/employees/:id
// @access  Admin or Employee (own profile)
const getEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if user is requesting their own profile or is admin
    if (req.user.role !== 'admin' && req.user._id.toString() !== id) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    const employee = await Employee.findById(id)
      .select('-password')
      .populate('assignedLeads', 'name email company status type assignedDate');

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
    console.error('Get employee error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching employee'
    });
  }
};

// @desc    Create new employee
// @route   POST /api/employees
// @access  Admin
const createEmployee = async (req, res) => {
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

    // Check if employee already exists
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

    const employeeData = employee.getPublicProfile();

    res.status(201).json({
      success: true,
      message: 'Employee created successfully',
      data: employeeData
    });
  } catch (error) {
    console.error('Create employee error:', error);
    
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors
      });
    }

    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Email already exists'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error while creating employee'
    });
  }
};

// @desc    Update employee
// @route   PUT /api/employees/:id
// @access  Admin or Employee (own profile)
const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      firstName,
      lastName,
      location,
      preferredLanguage,
      phone,
      department,
      status,
      role
    } = req.body;

    // Check permissions
    if (req.user.role !== 'admin' && req.user._id.toString() !== id) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    // Find employee
    const employee = await Employee.findById(id);
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
    
    // Only admin can update these fields
    if (req.user.role === 'admin') {
      if (status) employee.status = status;
      if (role) employee.role = role;
    }

    await employee.save();

    // Log activity
    await Activity.logActivity({
      user: req.user._id,
      action: 'employee_updated',
      entityType: 'employee',
      entityId: employee._id,
      description: `${req.user.fullName} updated employee ${employee.fullName}`,
      details: { updatedFields: Object.keys(req.body) }
    });

    const employeeData = employee.getPublicProfile();

    res.json({
      success: true,
      message: 'Employee updated successfully',
      data: employeeData
    });
  } catch (error) {
    console.error('Update employee error:', error);
    
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
      message: 'Server error while updating employee'
    });
  }
};

// @desc    Delete employee
// @route   DELETE /api/employees/:id
// @access  Admin
const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    // Prevent admin from deleting themselves
    if (req.user._id.toString() === id) {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete your own account'
      });
    }

    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found'
      });
    }

    // Check if employee has assigned leads
    const assignedLeads = await Lead.countDocuments({ assignedTo: id });
    if (assignedLeads > 0) {
      return res.status(400).json({
        success: false,
        message: `Cannot delete employee with ${assignedLeads} assigned leads. Please reassign leads first.`
      });
    }

    await Employee.findByIdAndDelete(id);

    // Log activity
    await Activity.logActivity({
      user: req.user._id,
      action: 'employee_deleted',
      entityType: 'employee',
      description: `${req.user.fullName} deleted employee ${employee.fullName}`,
      details: { deletedEmployeeId: id }
    });

    res.json({
      success: true,
      message: 'Employee deleted successfully'
    });
  } catch (error) {
    console.error('Delete employee error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting employee'
    });
  }
};

// @desc    Get employee statistics
// @route   GET /api/employees/:id/stats
// @access  Admin or Employee (own stats)
const getEmployeeStats = async (req, res) => {
  try {
    const { id } = req.params;

    // Check permissions
    if (req.user.role !== 'admin' && req.user._id.toString() !== id) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found'
      });
    }

    // Get lead statistics
    const totalLeads = await Lead.countDocuments({ assignedTo: id });
    const openLeads = await Lead.countDocuments({ assignedTo: id, status: { $in: ['open', 'contacted', 'qualified', 'proposal', 'negotiation'] } });
    const closedLeads = await Lead.countDocuments({ assignedTo: id, status: 'closed' });
    const lostLeads = await Lead.countDocuments({ assignedTo: id, status: 'lost' });

    // Get recent activities
    const recentActivities = await Activity.getRecentActivities(5, id);

    // Get performance metrics
    const thisMonth = new Date();
    thisMonth.setDate(1);
    thisMonth.setHours(0, 0, 0, 0);

    const leadsThisMonth = await Lead.countDocuments({
      assignedTo: id,
      assignedDate: { $gte: thisMonth }
    });

    const closedThisMonth = await Lead.countDocuments({
      assignedTo: id,
      status: 'closed',
      closedDate: { $gte: thisMonth }
    });

    const stats = {
      totalLeads,
      openLeads,
      closedLeads,
      lostLeads,
      leadsThisMonth,
      closedThisMonth,
      conversionRate: totalLeads > 0 ? ((closedLeads / totalLeads) * 100).toFixed(1) : 0,
      recentActivities
    };

    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Get employee stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching employee statistics'
    });
  }
};

// @desc    Get employee leads
// @route   GET /api/employees/:id/leads
// @access  Admin or Employee (own leads)
const getEmployeeLeads = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      page = 1,
      limit = 10,
      status = '',
      type = '',
      sortBy = 'assignedDate',
      sortOrder = 'desc'
    } = req.query;

    // Check permissions
    if (req.user.role !== 'admin' && req.user._id.toString() !== id) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    // Build query
    const query = { assignedTo: id };
    
    if (status) {
      query.status = status;
    }
    
    if (type) {
      query.type = type;
    }

    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Execute query
    const leads = await Lead.find(query)
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit));

    // Get total count
    const total = await Lead.countDocuments(query);

    // Calculate pagination info
    const totalPages = Math.ceil(total / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    res.json({
      success: true,
      data: leads,
      pagination: {
        currentPage: parseInt(page),
        totalPages,
        totalItems: total,
        itemsPerPage: parseInt(limit),
        hasNextPage,
        hasPrevPage
      }
    });
  } catch (error) {
    console.error('Get employee leads error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching employee leads'
    });
  }
};

module.exports = {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployeeStats,
  getEmployeeLeads
}; 