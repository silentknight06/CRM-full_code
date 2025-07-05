# CanovaCRM Backend Server

A comprehensive Node.js/Express.js backend for the CanovaCRM sales management system.

## 🚀 Features

- **Authentication & Authorization**: JWT-based authentication with role-based access control
- **Employee Management**: Complete CRUD operations for sales team members
- **Lead Management**: Comprehensive lead tracking with assignment and status management
- **Dashboard Analytics**: Real-time statistics and performance metrics
- **CSV Import**: Bulk lead import functionality
- **Activity Logging**: Complete audit trail of all system activities
- **File Upload**: Secure file handling for CSV imports
- **Input Validation**: Comprehensive validation and sanitization
- **Rate Limiting**: Protection against abuse
- **Error Handling**: Graceful error handling and logging

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud)
- npm or yarn

## 🛠️ Installation

1. **Clone the repository and navigate to server directory**
   ```bash
   cd server
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment file**
   ```bash
   # Create .env file with the following variables:
   MONGO_URI=mongodb://localhost:27017/canovacrm
   JWT_SECRET=your_jwt_secret_key_here
   PORT=5000
   NODE_ENV=development
   ```

4. **Start MongoDB** (if running locally)
   ```bash
   mongod
   ```

5. **Seed the database** (optional)
   ```bash
   npm run seed
   ```

6. **Start the server**
   ```bash
   npm start
   ```

The server will be running at `http://localhost:5000`

## 🔐 Authentication

### Login Credentials (after seeding)
- **Admin**: admin@canovacrm.com / admin
- **Employee**: john.smith@canovacrm.com / employee

### JWT Token Usage
Include the JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

## 📚 API Documentation

### Authentication Endpoints

#### POST /api/auth/login
Login with email and password
```json
{
  "email": "admin@canovacrm.com",
  "password": "admin"
}
```

#### POST /api/auth/register (Admin only)
Register new employee
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@company.com",
  "password": "password123",
  "location": "New York",
  "preferredLanguage": "English",
  "role": "employee"
}
```

#### GET /api/auth/profile
Get current user profile

#### PUT /api/auth/profile
Update current user profile

#### PUT /api/auth/change-password
Change password
```json
{
  "currentPassword": "oldpassword",
  "newPassword": "newpassword"
}
```

### Employee Management Endpoints

#### GET /api/employees
Get all employees with pagination and filters
```
Query parameters:
- page: Page number (default: 1)
- limit: Items per page (default: 10)
- search: Search term
- status: Filter by status
- role: Filter by role
- location: Filter by location
- sortBy: Sort field (default: createdAt)
- sortOrder: Sort order (asc/desc, default: desc)
```

#### GET /api/employees/:id
Get employee by ID

#### POST /api/employees (Admin only)
Create new employee
```json
{
  "firstName": "Jane",
  "lastName": "Smith",
  "email": "jane.smith@company.com",
  "password": "password123",
  "location": "Los Angeles",
  "preferredLanguage": "English",
  "department": "Sales",
  "phone": "+1-555-0123"
}
```

#### PUT /api/employees/:id
Update employee

#### DELETE /api/employees/:id (Admin only)
Delete employee

#### GET /api/employees/:id/stats
Get employee statistics

#### GET /api/employees/:id/leads
Get employee's assigned leads

### Lead Management Endpoints

#### GET /api/leads
Get all leads with pagination and filters
```
Query parameters:
- page: Page number (default: 1)
- limit: Items per page (default: 10)
- search: Search term
- status: Filter by status
- type: Filter by type
- assignedTo: Filter by assigned employee
- source: Filter by source
- location: Filter by location
- sortBy: Sort field (default: createdAt)
- sortOrder: Sort order (asc/desc, default: desc)
```

#### GET /api/leads/:id
Get lead by ID

#### POST /api/leads (Admin only)
Create new lead
```json
{
  "name": "John Doe",
  "email": "john.doe@company.com",
  "phone": "+1-555-0123",
  "company": "Tech Corp",
  "source": "Website",
  "status": "open",
  "type": "warm",
  "location": "New York",
  "preferredLanguage": "English",
  "notes": "Interested in our solution",
  "value": 50000,
  "currency": "USD",
  "tags": ["enterprise", "tech"]
}
```

#### PUT /api/leads/:id
Update lead

#### DELETE /api/leads/:id (Admin only)
Delete lead

#### POST /api/leads/upload (Admin only)
Upload leads from CSV file
```
Content-Type: multipart/form-data
Body: csvFile (CSV file)
```

#### GET /api/leads/stats (Admin only)
Get lead statistics

### Dashboard Endpoints

#### GET /api/dashboard/stats (Admin only)
Get dashboard statistics

#### GET /api/dashboard/analytics (Admin only)
Get sales analytics
```
Query parameters:
- period: Time period (7d, 30d, 90d, 1y, default: 7d)
```

#### GET /api/dashboard/activities (Admin only)
Get recent activities
```
Query parameters:
- limit: Number of activities (default: 10)
```

#### GET /api/dashboard/activity-summary (Admin only)
Get activity summary
```
Query parameters:
- days: Number of days (default: 7)
```

#### GET /api/dashboard/employee
Get employee dashboard data

## 📊 Data Models

### Employee Schema
```javascript
{
  firstName: String (required),
  lastName: String (required),
  email: String (required, unique),
  location: String (required),
  preferredLanguage: String (required),
  password: String (required, hashed),
  role: String (enum: ['admin', 'employee']),
  status: String (enum: ['active', 'inactive']),
  assignedLeads: [ObjectId],
  phone: String,
  department: String,
  hireDate: Date,
  lastLogin: Date,
  profileImage: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Lead Schema
```javascript
{
  name: String (required),
  email: String (required),
  phone: String,
  company: String,
  source: String,
  status: String (enum: ['open', 'contacted', 'qualified', 'proposal', 'negotiation', 'closed', 'lost']),
  type: String (enum: ['hot', 'warm', 'cold']),
  assignedTo: ObjectId (ref: 'Employee'),
  location: String,
  preferredLanguage: String,
  notes: String,
  scheduledCall: {
    date: Date,
    type: String,
    notes: String
  },
  value: Number,
  currency: String,
  assignedDate: Date,
  closedDate: Date,
  lastContact: Date,
  nextFollowUp: Date,
  tags: [String],
  customFields: Map,
  createdAt: Date,
  updatedAt: Date
}
```

### Activity Schema
```javascript
{
  user: ObjectId (ref: 'Employee', required),
  action: String (required),
  entityType: String (enum: ['lead', 'employee', 'system', 'auth']),
  entityId: ObjectId,
  description: String (required),
  details: Object,
  ipAddress: String,
  userAgent: String,
  timestamp: Date,
  severity: String (enum: ['low', 'medium', 'high', 'critical'])
}
```

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcryptjs with salt rounds of 10
- **Input Validation**: Comprehensive validation for all inputs
- **Input Sanitization**: Automatic sanitization of user inputs
- **Rate Limiting**: Protection against abuse (100 requests per 15 minutes)
- **CORS Protection**: Configurable cross-origin resource sharing
- **Role-Based Access**: Different permissions for admin and employee users

## 📁 Project Structure

```
server/
├── index.js                 # Main server file
├── package.json             # Dependencies and scripts
├── .env                     # Environment variables
├── seedData.js              # Database seeding script
├── uploads/                 # File upload directory
├── controllers/             # Business logic
│   ├── authController.js    # Authentication logic
│   ├── dashboardController.js # Dashboard data
│   ├── employeeController.js # Employee management
│   └── leadController.js    # Lead management
├── models/                  # Database schemas
│   ├── Employee.js          # Employee model
│   ├── Lead.js              # Lead model
│   └── Activity.js          # Activity model
├── routes/                  # API endpoints
│   ├── auth.js              # Authentication routes
│   ├── dashboard.js         # Dashboard routes
│   ├── employees.js         # Employee routes
│   └── leads.js             # Lead routes
└── middleware/              # Custom middleware
    └── auth.js              # Authentication middleware
```

## 🚀 Deployment

### Environment Variables
Set the following environment variables in production:

```env
MONGO_URI=mongodb://your-production-mongodb-uri
JWT_SECRET=your-production-jwt-secret
PORT=5000
NODE_ENV=production
```

### Production Considerations
- Use a strong JWT secret
- Set up MongoDB with proper authentication
- Configure CORS for your frontend domain
- Set up proper logging
- Use HTTPS in production
- Set up monitoring and error tracking

## 🧪 Testing

### Manual Testing
Use tools like Postman or curl to test the API endpoints.

### Example API Calls

#### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@canovacrm.com", "password": "admin"}'
```

#### Get Employees (with token)
```bash
curl -X GET http://localhost:5000/api/employees \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

#### Create Lead
```bash
curl -X POST http://localhost:5000/api/leads \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Lead",
    "email": "test@example.com",
    "company": "Test Corp",
    "source": "Website"
  }'
```

## 📝 Error Handling

The API returns consistent error responses:

```json
{
  "success": false,
  "message": "Error description",
  "errors": ["Detailed error messages"] // For validation errors
}
```

## 🔄 Activity Logging

All system activities are automatically logged with:
- User who performed the action
- Action type and description
- Entity involved
- Timestamp and IP address
- Additional details

## 📞 Support

For issues or questions:
1. Check the error logs
2. Verify environment variables
3. Ensure MongoDB is running
4. Check API documentation

---

**Note**: This backend is designed to work with the CanovaCRM frontend React application. 