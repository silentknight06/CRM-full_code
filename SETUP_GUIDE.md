# Quick Setup Guide - CanovaCRM

## 🚀 Quick Start (5 minutes)

### 1. Prerequisites Check
```bash
node --version  # Should be v16 or higher
npm --version   # Should be v8 or higher
```

### 2. Project Setup
```bash
# Create project structure
mkdir crmSale
cd crmSale

# Create client and server directories
mkdir client server
```

### 3. Backend Setup
```bash
cd server

# Initialize package.json
npm init -y

# Install dependencies
npm install express mongoose cors dotenv bcryptjs jsonwebtoken csv-parser
npm install --save-dev nodemon

# Create .env file
echo "MONGO_URI=mongodb://localhost:27017/canovacrm
JWT_SECRET=your_secret_key_here
PORT=5000" > .env
```

### 4. Frontend Setup
```bash
cd ../client

# Create React app
npx create-react-app .

# Install additional dependencies
npm install axios react-router-dom recharts react-dropzone
```

### 5. Start Development
```bash
# Terminal 1 - Start backend
cd server
npm start

# Terminal 2 - Start frontend
cd client
npm start
```

## 📋 Required Files Structure

### Backend Files to Create:
- `server/index.js` - Main server file
- `server/models/Employee.js` - Employee schema
- `server/models/Lead.js` - Lead schema
- `server/models/Activity.js` - Activity schema
- `server/routes/auth.js` - Authentication routes
- `server/routes/employees.js` - Employee routes
- `server/routes/leads.js` - Lead routes
- `server/routes/dashboard.js` - Dashboard routes
- `server/controllers/` - Controller files
- `server/middleware/auth.js` - Authentication middleware

### Frontend Files to Create:
- `client/src/App.js` - Main app component
- `client/src/pages/` - All page components
- `client/src/components/` - Reusable components
- `client/src/context/AuthContext.js` - Authentication context
- `client/src/services/api.js` - API service functions

## 🎯 Key Features to Implement

### 1. Authentication System
- Login/logout functionality
- JWT token management
- Role-based access (admin/employee)

### 2. Admin Dashboard
- Statistics cards (unassigned leads, conversion rate, etc.)
- Sales analytics chart
- Recent activity feed
- Employee management table

### 3. Lead Management
- Lead listing with filters
- Lead assignment functionality
- CSV bulk import
- Lead status tracking

### 4. Employee Interface
- Personal dashboard
- Assigned leads view
- Schedule management
- Profile settings

### 5. Employee Management
- Add new employees
- View employee list
- Assign leads to employees
- Employee performance tracking

## 🎨 UI Components to Build

### Core Components:
- **Header** - Navigation and user info
- **Sidebar** - Menu navigation
- **StatsCard** - Metric display cards
- **Modal** - Reusable modal component
- **Table** - Data display tables
- **Charts** - Analytics visualization
- **Forms** - Input forms with validation

### Pages:
- **RoleSelection** - Landing page with role choice
- **Login** - Authentication page
- **Dashboard** - Admin overview
- **Leads** - Lead management
- **Employees** - Employee management
- **EmployeeHome** - Employee dashboard
- **EmployeeLeads** - Employee's assigned leads
- **EmployeeSchedule** - Employee's schedule
- **EmployeeProfile** - Employee profile

## 🔧 API Endpoints to Implement

### Authentication:
```javascript
POST /api/auth/login
POST /api/auth/register
```

### Leads:
```javascript
GET /api/leads
POST /api/leads
PUT /api/leads/:id
DELETE /api/leads/:id
POST /api/leads/upload
```

### Employees:
```javascript
GET /api/employees
POST /api/employees
PUT /api/employees/:id
DELETE /api/employees/:id
```

### Dashboard:
```javascript
GET /api/dashboard/stats
GET /api/dashboard/analytics
GET /api/dashboard/activities
```

## 🎨 Design Guidelines

### Color Scheme:
- Primary: #007bff (Blue)
- Secondary: #6c757d (Gray)
- Success: #28a745 (Green)
- Danger: #dc3545 (Red)
- Warning: #ffc107 (Yellow)
- Background: #f8f9fa (Light Gray)

### Typography:
- Font Family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto
- Headings: Bold, 24px-32px
- Body: Regular, 14px-16px
- Small: 12px for captions

### Layout:
- Container max-width: 1200px
- Card padding: 20px
- Border radius: 8px
- Box shadow: 0 2px 4px rgba(0,0,0,0.1)

## 📱 Responsive Breakpoints

```css
/* Mobile */
@media (max-width: 767px) { }

/* Tablet */
@media (min-width: 768px) and (max-width: 1199px) { }

/* Desktop */
@media (min-width: 1200px) { }
```

## 🧪 Testing Data

### Sample Employees:
```javascript
const employees = [
  {
    firstName: "John",
    lastName: "Smith",
    email: "john.smith@canovacrm.com",
    location: "New York",
    preferredLanguage: "English",
    role: "employee"
  },
  {
    firstName: "Maria",
    lastName: "Garcia",
    email: "maria.garcia@canovacrm.com",
    location: "Los Angeles",
    preferredLanguage: "Spanish",
    role: "employee"
  }
];
```

### Sample Leads:
```javascript
const leads = [
  {
    name: "Alice Johnson",
    email: "alice@company.com",
    phone: "+1-555-0123",
    company: "Tech Corp",
    status: "open",
    type: "hot",
    location: "San Francisco"
  }
];
```

## 🚀 Deployment Checklist

### Frontend (Vercel):
- [ ] Build optimization
- [ ] Environment variables set
- [ ] API base URL configured
- [ ] CORS settings updated

### Backend (Heroku/Railway):
- [ ] Environment variables configured
- [ ] MongoDB connection string set
- [ ] JWT secret configured
- [ ] Port configuration

## 📞 Support Resources

- **React Documentation**: https://reactjs.org/docs/
- **Express.js Guide**: https://expressjs.com/
- **MongoDB Atlas**: https://www.mongodb.com/atlas
- **JWT.io**: https://jwt.io/

---

**Estimated Development Time**: 2-3 weeks for a complete implementation
**Difficulty Level**: Intermediate (React + Node.js experience required) 