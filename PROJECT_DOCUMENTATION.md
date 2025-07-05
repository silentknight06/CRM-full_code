# CanovaCRM - Sales CRM System Documentation

## 📋 Project Overview

**CanovaCRM** is a comprehensive Customer Relationship Management (CRM) system designed for sales teams. It's a full-stack web application built with React.js frontend and Node.js/Express.js backend, featuring role-based access control for administrators and employees.

### 🎯 Key Features

- **Role-Based Access Control**: Separate interfaces for Admin and Employee users
- **Lead Management**: Complete lead lifecycle management with assignment and tracking
- **Employee Management**: Add, view, and manage sales team members
- **Dashboard Analytics**: Real-time sales metrics and performance tracking
- **CSV Import**: Bulk lead import functionality
- **Responsive Design**: Modern, mobile-friendly UI
- **Authentication System**: Secure login with JWT tokens

## 🏗️ Architecture

### Frontend (React.js)
- **React 19.1.0** with functional components and hooks
- **React Router DOM** for navigation
- **Axios** for API communication
- **Recharts** for data visualization
- **React Dropzone** for file uploads

### Backend (Node.js/Express.js)
- **Express.js** web framework
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **bcryptjs** for password hashing
- **CORS** enabled for cross-origin requests

## 📁 Project Structure

```
crmSale/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── context/       # React context (Auth)
│   │   └── services/      # API services
│   └── public/            # Static assets
├── server/                # Node.js Backend
│   ├── controllers/       # Business logic
│   ├── models/           # MongoDB schemas
│   ├── routes/           # API endpoints
│   └── middleware/       # Custom middleware
└── README.md
```

## 🚀 Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud)
- npm or yarn package manager

### 1. Clone and Install Dependencies

```bash
# Clone the repository
git clone <repository-url>
cd crmSale

# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

### 2. Environment Configuration

Create `.env` file in the server directory:

```env
MONGO_URI=mongodb://localhost:27017/canovacrm
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

### 3. Database Setup

```bash
# Start MongoDB (if running locally)
mongod

# The application will automatically create collections
# Seed data can be added using the seedData.js file
```

### 4. Start the Application

```bash
# Start backend server (from server directory)
npm start

# Start frontend development server (from client directory)
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## 👥 User Roles & Features

### 🔐 Admin User
**Login Credentials**: admin@canovacrm.com / admin

**Features:**
- **Dashboard**: Overview of all sales metrics
- **Lead Management**: View, assign, and manage all leads
- **Employee Management**: Add and manage sales team members
- **Analytics**: Sales performance charts and reports
- **CSV Import**: Bulk lead import functionality

### 👨‍💼 Employee User
**Login Credentials**: employee@canovacrm.com / employee

**Features:**
- **Employee Home**: Personal dashboard with check-in/out
- **Lead Management**: View and manage assigned leads
- **Schedule**: View scheduled calls and activities
- **Profile**: Personal information and settings

## 📊 Key Screenshots & Features

### 1. Role Selection Screen
- **Location**: Landing page (/)
- **Features**: 
  - Welcome message with CanovaCRM branding
  - Two role selection buttons (Admin/Employee)
  - Clean, modern design with blue theme

### 2. Admin Dashboard
- **Location**: /dashboard (after admin login)
- **Features**:
  - **Stats Cards**: Unassigned leads, leads assigned this week, active salespeople, conversion rate
  - **Sales Analytics Chart**: Weekly sales performance with cumulative data
  - **Recent Activity Feed**: Real-time activity updates
  - **Employees Table**: List of all sales team members with their details

### 3. Lead Management
- **Location**: /leads
- **Features**:
  - **Lead List**: Table view of all leads with status, type, and assignment
  - **Add Leads Button**: Opens CSV upload modal
  - **CSV Upload**: Bulk import functionality with drag-and-drop
  - **Lead Cards**: Individual lead information with action buttons

### 4. Employee Management
- **Location**: /employees
- **Features**:
  - **Employee List**: Table with employee details (name, email, location, language)
  - **Add Employee Form**: Modal with employee registration fields
  - **Employee Actions**: View, edit, and manage employee status

### 5. Employee Home Dashboard
- **Location**: /employee-home
- **Features**:
  - **Navigation Bar**: Home, Leads, Schedule, Profile tabs
  - **Check-in/out System**: Time tracking functionality
  - **Break Management**: Break time tracking and history
  - **Recent Activity**: Personal activity feed

### 6. Login Screen
- **Location**: /login
- **Features**:
  - **Authentication Form**: Email and password fields
  - **Demo Credentials**: Displayed for easy testing
  - **Error Handling**: User-friendly error messages
  - **Loading States**: Visual feedback during authentication

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### Leads
- `GET /api/leads` - Get all leads
- `POST /api/leads` - Create new lead
- `PUT /api/leads/:id` - Update lead
- `DELETE /api/leads/:id` - Delete lead
- `POST /api/leads/upload` - CSV upload

### Employees
- `GET /api/employees` - Get all employees
- `POST /api/employees` - Create new employee
- `PUT /api/employees/:id` - Update employee
- `DELETE /api/employees/:id` - Delete employee

### Dashboard
- `GET /api/dashboard/stats` - Get dashboard statistics
- `GET /api/dashboard/analytics` - Get sales analytics
- `GET /api/dashboard/activities` - Get recent activities

## 🎨 UI/UX Features

### Design System
- **Color Scheme**: Blue primary (#007bff), white background, gray accents
- **Typography**: Clean, readable fonts with proper hierarchy
- **Components**: Reusable cards, buttons, modals, and tables
- **Responsive**: Mobile-first design approach

### Key Components
- **StatsCard**: Displays metrics with icons and values
- **SalesAnalytics**: Line chart showing sales trends
- **RecentActivity**: Activity feed with timestamps
- **Modal**: Reusable modal for forms and content
- **CSVUploader**: Drag-and-drop file upload with progress
- **Pagination**: Page navigation for large datasets

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcryptjs for password security
- **CORS Protection**: Cross-origin request handling
- **Input Validation**: Server-side validation for all inputs
- **Role-Based Access**: Different permissions for admin/employee

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop computers (1200px+)
- Tablets (768px - 1199px)
- Mobile phones (320px - 767px)

## 🚀 Deployment

### Frontend (Vercel)
```bash
cd client
npm run build
# Deploy build folder to Vercel
```

### Backend (Heroku/Railway)
```bash
cd server
# Set environment variables
# Deploy to your preferred platform
```

## 🧪 Testing

### Demo Data
The application includes mock data for demonstration:
- Sample leads with various statuses
- Employee profiles with different locations
- Sales analytics data
- Activity feed examples

### Test Credentials
- **Admin**: admin@canovacrm.com / admin
- **Employee**: employee@canovacrm.com / employee

## 🔄 Future Enhancements

Potential improvements for the system:
- Real-time notifications
- Advanced reporting and analytics
- Email integration
- Mobile app development
- Advanced search and filtering
- Integration with third-party CRM tools

## 📞 Support

For technical support or questions about the implementation:
- Check the code comments for detailed explanations
- Review the API documentation
- Test with the provided demo credentials

---

**Note**: This documentation provides a comprehensive overview of the CanovaCRM system. The actual implementation includes all the features described above with a modern, user-friendly interface designed for sales team productivity. 