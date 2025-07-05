const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Employee = require('./models/Employee');
const Lead = require('./models/Lead');
const Activity = require('./models/Activity');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('✅ MongoDB connected for seeding');
}).catch((err) => {
  console.error('❌ MongoDB connection error:', err);
  process.exit(1);
});

// Seed data
const seedEmployees = [
  {
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@canovacrm.com',
    password: 'admin',
    location: 'New York',
    preferredLanguage: 'English',
    role: 'admin',
    department: 'Management',
    phone: '+1-555-0101'
  },
  {
    firstName: 'John',
    lastName: 'Smith',
    email: 'john.smith@canovacrm.com',
    password: 'employee',
    location: 'New York',
    preferredLanguage: 'English',
    role: 'employee',
    department: 'Sales',
    phone: '+1-555-0102'
  },
  {
    firstName: 'Maria',
    lastName: 'Garcia',
    email: 'maria.garcia@canovacrm.com',
    password: 'employee',
    location: 'Los Angeles',
    preferredLanguage: 'Spanish',
    role: 'employee',
    department: 'Sales',
    phone: '+1-555-0103'
  },
  {
    firstName: 'David',
    lastName: 'Chen',
    email: 'david.chen@canovacrm.com',
    password: 'employee',
    location: 'San Francisco',
    preferredLanguage: 'Mandarin',
    role: 'employee',
    department: 'Sales',
    phone: '+1-555-0104'
  },
  {
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.johnson@canovacrm.com',
    password: 'employee',
    location: 'Chicago',
    preferredLanguage: 'English',
    role: 'employee',
    department: 'Sales',
    phone: '+1-555-0105'
  }
];

const seedLeads = [
  {
    name: 'Alice Johnson',
    email: 'alice@techcorp.com',
    phone: '+1-555-0201',
    company: 'Tech Corp',
    source: 'Website',
    status: 'open',
    type: 'hot',
    location: 'San Francisco',
    preferredLanguage: 'English',
    notes: 'Interested in enterprise solution',
    value: 50000,
    currency: 'USD',
    tags: ['enterprise', 'tech']
  },
  {
    name: 'Carlos Rodriguez',
    email: 'carlos@innovate.com',
    phone: '+1-555-0202',
    company: 'Innovate Inc',
    source: 'Referral',
    status: 'contacted',
    type: 'warm',
    location: 'Miami',
    preferredLanguage: 'Spanish',
    notes: 'Follow up scheduled for next week',
    value: 25000,
    currency: 'USD',
    tags: ['startup', 'innovation']
  },
  {
    name: 'Li Wei',
    email: 'li.wei@globaltech.com',
    phone: '+1-555-0203',
    company: 'Global Tech',
    source: 'Cold Call',
    status: 'qualified',
    type: 'hot',
    location: 'Seattle',
    preferredLanguage: 'Mandarin',
    notes: 'Very interested in our platform',
    value: 75000,
    currency: 'USD',
    tags: ['enterprise', 'global']
  },
  {
    name: 'Emma Wilson',
    email: 'emma@startup.com',
    phone: '+1-555-0204',
    company: 'StartupXYZ',
    source: 'Social Media',
    status: 'open',
    type: 'warm',
    location: 'Austin',
    preferredLanguage: 'English',
    notes: 'Looking for growth solutions',
    value: 15000,
    currency: 'USD',
    tags: ['startup', 'growth']
  },
  {
    name: 'Ahmed Hassan',
    email: 'ahmed@middleeast.com',
    phone: '+1-555-0205',
    company: 'Middle East Solutions',
    source: 'Email Campaign',
    status: 'proposal',
    type: 'hot',
    location: 'Dubai',
    preferredLanguage: 'Arabic',
    notes: 'Ready for proposal presentation',
    value: 100000,
    currency: 'USD',
    tags: ['enterprise', 'middle-east']
  },
  {
    name: 'Sophie Martin',
    email: 'sophie@frenchtech.com',
    phone: '+1-555-0206',
    company: 'French Tech Solutions',
    source: 'Trade Show',
    status: 'negotiation',
    type: 'hot',
    location: 'Paris',
    preferredLanguage: 'French',
    notes: 'Final negotiations in progress',
    value: 60000,
    currency: 'EUR',
    tags: ['enterprise', 'europe']
  },
  {
    name: 'Raj Patel',
    email: 'raj@indiatech.com',
    phone: '+1-555-0207',
    company: 'India Tech Solutions',
    source: 'Website',
    status: 'open',
    type: 'cold',
    location: 'Mumbai',
    preferredLanguage: 'Hindi',
    notes: 'Initial contact made',
    value: 30000,
    currency: 'INR',
    tags: ['startup', 'india']
  },
  {
    name: 'Yuki Tanaka',
    email: 'yuki@japantech.com',
    phone: '+1-555-0208',
    company: 'Japan Tech Corp',
    source: 'Referral',
    status: 'contacted',
    type: 'warm',
    location: 'Tokyo',
    preferredLanguage: 'Japanese',
    notes: 'Scheduled demo next week',
    value: 45000,
    currency: 'JPY',
    tags: ['enterprise', 'japan']
  }
];

// Seed function
const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seeding...');

    // Clear existing data
    await Employee.deleteMany({});
    await Lead.deleteMany({});
    await Activity.deleteMany({});

    console.log('🗑️  Cleared existing data');

    // Create employees
    const createdEmployees = [];
    for (const employeeData of seedEmployees) {
      const employee = new Employee(employeeData);
      await employee.save();
      createdEmployees.push(employee);
      console.log(`👤 Created employee: ${employee.fullName}`);
    }

    // Create leads and assign some to employees
    const createdLeads = [];
    for (let i = 0; i < seedLeads.length; i++) {
      const leadData = seedLeads[i];
      
      // Assign leads to employees (skip admin)
      if (i < createdEmployees.length - 1) {
        leadData.assignedTo = createdEmployees[i + 1]._id; // Skip admin (index 0)
        leadData.assignedDate = new Date();
      }

      const lead = new Lead(leadData);
      await lead.save();
      createdLeads.push(lead);
      console.log(`🎯 Created lead: ${lead.name}`);

      // Update employee's assigned leads
      if (leadData.assignedTo) {
        await Employee.findByIdAndUpdate(leadData.assignedTo, {
          $push: { assignedLeads: lead._id }
        });
      }
    }

    // Create some sample activities
    const sampleActivities = [
      {
        user: createdEmployees[0]._id, // Admin
        action: 'employee_created',
        entityType: 'employee',
        entityId: createdEmployees[1]._id,
        description: `${createdEmployees[0].fullName} created new employee ${createdEmployees[1].fullName}`,
        details: { role: 'employee', department: 'Sales' }
      },
      {
        user: createdEmployees[0]._id, // Admin
        action: 'lead_created',
        entityType: 'lead',
        entityId: createdLeads[0]._id,
        description: `${createdEmployees[0].fullName} created new lead ${createdLeads[0].name}`,
        details: { status: 'open', type: 'hot' }
      },
      {
        user: createdEmployees[1]._id, // John Smith
        action: 'lead_assigned',
        entityType: 'lead',
        entityId: createdLeads[0]._id,
        description: `${createdEmployees[1].fullName} was assigned lead ${createdLeads[0].name}`,
        details: { assignedBy: createdEmployees[0].fullName }
      }
    ];

    for (const activityData of sampleActivities) {
      await Activity.logActivity(activityData);
      console.log(`📝 Created activity: ${activityData.description}`);
    }

    console.log('✅ Database seeding completed successfully!');
    console.log(`📊 Created ${createdEmployees.length} employees`);
    console.log(`🎯 Created ${createdLeads.length} leads`);
    console.log(`📝 Created ${sampleActivities.length} activities`);

    // Display login credentials
    console.log('\n🔐 Login Credentials:');
    console.log('Admin: admin@canovacrm.com / admin');
    console.log('Employee: john.smith@canovacrm.com / employee');

    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error);
    process.exit(1);
  }
};

// Run seeding
seedDatabase(); 