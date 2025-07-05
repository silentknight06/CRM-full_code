# Sales CRM - Frontend (React)

## Project Structure & Documentation
This README covers the React frontend of the Sales CRM project. It includes features, setup, and usage for the client app.

- For a high-level project overview and setup, see the [root README](../README.md)
- For backend/API details, see [../server/README.md](../server/README.md)

The frontend application for the Sales CRM system built with React.js, featuring a modern, responsive interface with real-time data visualization and comprehensive lead/employee management.

## 🚀 Features

### Dashboard
- **Real-time Analytics**: Live sales performance charts using Recharts
- **Statistics Cards**: Key metrics display with animated counters
- **Recent Activity Feed**: Real-time activity tracking with timestamps
- **Responsive Layout**: Mobile-first design with adaptive components

### Lead Management
- **CSV Upload**: Drag-and-drop file upload with validation
- **Smart Distribution**: Automatic lead assignment based on employee preferences
- **Advanced Search**: Filter leads by status, type, employee, and date
- **Bulk Operations**: Process multiple leads simultaneously
- **Status Tracking**: Visual indicators for lead status (Open/Closed, Hot/Warm/Cold)

### Employee Management
- **CRUD Operations**: Complete create, read, update, delete functionality
- **Pagination**: Efficient data loading with configurable page sizes
- **Sorting**: Click column headers to sort data
- **Search**: Real-time search across all employee fields
- **Role-based Access**: Admin-only employee management

### User Interface
- **Modern Design**: Clean, professional interface with smooth animations
- **Loading States**: Skeleton loaders and progress indicators
- **Error Handling**: User-friendly error messages and retry options
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile

## 🛠️ Tech Stack

- **React.js**: Modern UI framework with hooks
- **React Router**: Client-side routing and navigation
- **Recharts**: Interactive data visualization library
- **React Dropzone**: File upload with drag-and-drop
- **Axios**: HTTP client for API communication
- **CSS3**: Custom styling with responsive design
- **Context API**: State management for authentication

## 📁 Project Structure

```
client/
├── public/                 # Static assets
│   ├── index.html         # Main HTML template
│   ├── favicon.ico        # App icon
│   └── manifest.json      # PWA manifest
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── dashboard/     # Dashboard-specific components
│   │   ├── leads/         # Lead management components
│   │   ├── ui/           # Generic UI components
│   │   └── layout/       # Layout components
│   ├── pages/            # Page components
│   │   ├── Dashboard/    # Main dashboard page
│   │   ├── Employees/    # Employee management
│   │   ├── Leads/        # Lead management
│   │   ├── Login/        # Authentication
│   │   └── Settings/     # User settings
│   ├── services/         # API service layer
│   │   └── api.js        # HTTP client configuration
│   ├── context/          # React context
│   │   └── AuthContext.js # Authentication context
│   ├── App.js            # Main app component
│   ├── App.css           # App-level styles
│   └── index.js          # App entry point
└── package.json          # Dependencies and scripts
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Backend server running (see server README)

### Installation

1. **Navigate to client directory**
   ```bash
   cd client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```

4. **Access the application**
   - Open http://localhost:3000 in your browser

## 📊 Recent Updates (Last 4 Hours)

### ✅ New Components Added
- **CSVUploader**: Advanced file upload with drag-and-drop
- **SalesAnalytics**: Interactive charts with hover effects
- **RecentActivity**: Real-time activity feed component
- **StatsCard**: Animated statistics display
- **CircularProgress**: Loading indicators
- **Pagination**: Efficient data pagination
- **Modal**: Reusable modal dialogs

### ✅ Enhanced Features
- **Role Selection**: Choose between Admin and Employee views
- **Dynamic Dashboard**: Real-time data from backend APIs
- **Interactive Charts**: Sales analytics with tooltips
- **File Upload**: Drag-and-drop CSV functionality
- **Loading States**: Better user experience with skeleton loaders
- **Error Handling**: Comprehensive error management

### ✅ UI/UX Improvements
- **Responsive Design**: Mobile-first approach
- **Modern Styling**: Clean, professional interface
- **Smooth Animations**: CSS transitions and transforms
- **Accessibility**: ARIA labels and keyboard navigation
- **Performance**: Optimized rendering and data loading

## 🎨 Component Library

### Dashboard Components
- `SalesAnalytics`: Interactive charts and graphs
- `StatsCard`: Key metrics display
- `RecentActivity`: Activity feed with timestamps
- `Dashboard`: Main dashboard layout

### Lead Management
- `CSVUploader`: File upload with validation
- `LeadsTable`: Data table with search and pagination
- `LeadForm`: Add/edit lead forms
- `LeadStatus`: Status indicators and filters

### Employee Management
- `EmployeesTable`: Employee data table
- `AddEmployeeForm`: Employee creation form
- `EmployeeListTable`: Paginated employee list

### UI Components
- `Modal`: Reusable modal dialogs
- `CircularProgress`: Loading indicators
- `Pagination`: Data pagination controls
- `Sidebar`: Navigation sidebar
- `Header`: Application header

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the client directory:
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_ENV=development
```

### API Configuration
The application uses Axios for API communication with:
- Base URL configuration
- Request/response interceptors
- Error handling
- Authentication headers

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### Features
- Mobile-first CSS approach
- Flexible grid layouts
- Touch-friendly interface
- Adaptive navigation
- Optimized images and assets

## 🎯 Key Features

### Real-time Data
- Live dashboard updates
- Real-time activity feed
- Dynamic statistics
- Auto-refresh capabilities

### File Upload
- Drag-and-drop interface
- File validation
- Progress indicators
- Error handling
- Multiple file support

### Data Visualization
- Interactive charts
- Hover effects
- Responsive graphs
- Color-coded data
- Export capabilities

### Search & Filter
- Real-time search
- Advanced filtering
- Sort functionality
- Pagination
- Bulk operations

## 🚀 Performance Optimizations

- **Code Splitting**: Lazy loading of components
- **Memoization**: React.memo for expensive components
- **Debouncing**: Search input optimization
- **Virtual Scrolling**: Large data sets handling
- **Image Optimization**: Compressed assets

## 🔒 Security Features

- **Input Validation**: Client-side form validation
- **XSS Prevention**: Sanitized user inputs
- **CSRF Protection**: Token-based requests
- **Secure Headers**: HTTP security headers

## 🧪 Testing

### Available Scripts
```bash
npm test          # Run test suite
npm run build     # Build for production
npm run eject     # Eject from Create React App
```

### Testing Strategy
- Unit tests for components
- Integration tests for API calls
- E2E tests for user flows
- Accessibility testing

## 📦 Build & Deployment

### Production Build
```bash
npm run build
```

### Deployment Options
- **Vercel**: Zero-config deployment
- **Netlify**: Static site hosting
- **AWS S3**: Cloud storage hosting
- **GitHub Pages**: Free hosting

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

---

**Built with React.js and modern web technologies**
