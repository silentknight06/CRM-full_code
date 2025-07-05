# Project Requirements - CanovaCRM

## 📦 Backend Dependencies (server/package.json)

### Core Dependencies:
```json
{
  "express": "^5.1.0",
  "mongoose": "^8.16.0",
  "cors": "^2.8.5",
  "dotenv": "^16.5.0",
  "bcryptjs": "^2.4.3",
  "jsonwebtoken": "^9.0.2",
  "csv-parser": "^3.0.0"
}
```

### Development Dependencies:
```json
{
  "nodemon": "^3.1.10"
}
```

## 📦 Frontend Dependencies (client/package.json)

### Core Dependencies:
```json
{
  "react": "^19.1.0",
  "react-dom": "^19.1.0",
  "react-router-dom": "^7.6.2",
  "axios": "^1.10.0",
  "recharts": "^2.15.4",
  "react-dropzone": "^14.3.8"
}
```

### Development Dependencies:
```json
{
  "react-scripts": "5.0.1",
  "@testing-library/react": "^16.3.0",
  "@testing-library/jest-dom": "^6.6.3",
  "@testing-library/user-event": "^13.5.0",
  "web-vitals": "^2.1.4"
}
```

## 🔧 System Requirements

### Node.js:
- **Version**: 16.x or higher
- **Package Manager**: npm (v8+) or yarn (v1.22+)

### Database:
- **MongoDB**: 5.0 or higher
- **MongoDB Atlas** (cloud option) or local installation

### Browser Support:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📁 File Structure Requirements

### Backend Structure:
```
server/
├── index.js                 # Main server file
├── package.json             # Dependencies
├── .env                     # Environment variables
├── controllers/
│   ├── authController.js    # Authentication logic
│   ├── dashboardController.js # Dashboard data
│   ├── employeeController.js # Employee management
│   └── leadController.js    # Lead management
├── models/
│   ├── Employee.js          # Employee schema
│   ├── Lead.js              # Lead schema
│   └── Activity.js          # Activity schema
├── routes/
│   ├── auth.js              # Auth endpoints
│   ├── dashboard.js         # Dashboard endpoints
│   ├── employees.js         # Employee endpoints
│   └── leads.js             # Lead endpoints
└── middleware/
    └── auth.js              # JWT authentication
```

### Frontend Structure:
```
client/
├── public/
│   ├── index.html           # Main HTML file
│   ├── favicon.ico          # App icon
│   └── manifest.json        # PWA manifest
├── src/
│   ├── App.js               # Main app component
│   ├── index.js             # App entry point
│   ├── App.css              # Global styles
│   ├── index.css            # Base styles
│   ├── context/
│   │   └── AuthContext.js   # Authentication context
│   ├── services/
│   │   └── api.js           # API service functions
│   ├── components/
│   │   ├── common/          # Shared components
│   │   ├── dashboard/       # Dashboard components
│   │   ├── employee/        # Employee components
│   │   ├── lead/            # Lead components
│   │   ├── layout/          # Layout components
│   │   └── ui/              # UI components
│   └── pages/
│       ├── Dashboard/       # Admin dashboard
│       ├── EmployeeHome/    # Employee home
│       ├── EmployeeLeads/   # Employee leads
│       ├── EmployeeSchedule/ # Employee schedule
│       ├── EmployeeProfile/ # Employee profile
│       ├── Employees/       # Employee management
│       ├── Leads/           # Lead management
│       ├── Login/           # Login page
│       ├── RoleSelection/   # Role selection
│       └── Settings/        # Settings page
└── package.json             # Dependencies
```

## 🔐 Environment Variables

### Backend (.env):
```env
MONGO_URI=mongodb://localhost:27017/canovacrm
JWT_SECRET=your_jwt_secret_key_here
PORT=5000
NODE_ENV=development
```

### Frontend (.env):
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_ENV=development
```

## 🎨 UI/UX Requirements

### Design System:
- **Color Palette**: Blue primary (#007bff), gray secondary (#6c757d)
- **Typography**: System fonts with proper hierarchy
- **Spacing**: Consistent 8px grid system
- **Border Radius**: 8px for cards, 4px for buttons
- **Shadows**: Subtle shadows for depth (0 2px 4px rgba(0,0,0,0.1))

### Responsive Design:
- **Mobile First**: Design for mobile, enhance for desktop
- **Breakpoints**: 768px (tablet), 1200px (desktop)
- **Touch Targets**: Minimum 44px for mobile interactions

### Accessibility:
- **WCAG 2.1 AA** compliance
- **Keyboard Navigation**: Full keyboard accessibility
- **Screen Reader**: Proper ARIA labels and semantic HTML
- **Color Contrast**: Minimum 4.5:1 ratio

## 🔒 Security Requirements

### Authentication:
- **JWT Tokens**: Secure token-based authentication
- **Password Hashing**: bcryptjs with salt rounds of 10
- **Session Management**: Token expiration and refresh
- **Input Validation**: Server-side validation for all inputs

### API Security:
- **CORS**: Proper cross-origin resource sharing
- **Rate Limiting**: Prevent abuse and DDoS attacks
- **Input Sanitization**: Prevent XSS and injection attacks
- **HTTPS**: Secure communication in production

## 📊 Data Models

### Employee Schema:
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
  createdAt: Date,
  updatedAt: Date
}
```

### Lead Schema:
```javascript
{
  name: String (required),
  email: String (required),
  phone: String,
  company: String,
  source: String,
  status: String (enum: ['open', 'closed']),
  type: String (enum: ['hot', 'warm', 'cold']),
  assignedTo: ObjectId (ref: 'Employee'),
  location: String,
  preferredLanguage: String,
  notes: String,
  scheduledCall: {
    date: Date,
    type: String (enum: ['cold_call', 'referral'])
  },
  assignedDate: Date,
  closedDate: Date,
  createdAt: Date,
  updatedAt: Date
}
```

## 🚀 Performance Requirements

### Frontend:
- **Bundle Size**: < 2MB gzipped
- **Load Time**: < 3 seconds on 3G
- **Lighthouse Score**: > 90 for all metrics
- **Code Splitting**: Lazy load routes and components

### Backend:
- **Response Time**: < 200ms for API calls
- **Database Queries**: Optimized with proper indexing
- **Caching**: Implement caching for frequently accessed data
- **Error Handling**: Graceful error handling and logging

## 🧪 Testing Requirements

### Unit Testing:
- **Coverage**: > 80% code coverage
- **Framework**: Jest + React Testing Library
- **Components**: Test all reusable components
- **API**: Test all endpoints with proper mocking

### Integration Testing:
- **API Testing**: Test complete API workflows
- **Database Testing**: Test database operations
- **Authentication**: Test login/logout flows

## 📱 Browser Compatibility

### Supported Browsers:
- **Chrome**: 90+
- **Firefox**: 88+
- **Safari**: 14+
- **Edge**: 90+
- **Mobile Safari**: 14+
- **Chrome Mobile**: 90+

### Polyfills Required:
- **Promise**: For older browsers
- **Fetch API**: For older browsers
- **Array methods**: map, filter, reduce

## 🔄 Version Control

### Git Requirements:
- **Repository**: Git-based version control
- **Branching**: Feature branch workflow
- **Commits**: Conventional commit messages
- **Tags**: Semantic versioning (v1.0.0)

### Code Quality:
- **ESLint**: JavaScript linting
- **Prettier**: Code formatting
- **Husky**: Git hooks for pre-commit checks
- **Lint-staged**: Run linters on staged files

---

**Note**: These requirements ensure a robust, scalable, and maintainable CRM system that follows industry best practices and modern web development standards. 