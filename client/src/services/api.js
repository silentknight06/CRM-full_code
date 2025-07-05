const API_BASE_URL = '/api';

// Helper function to get auth token
const getAuthToken = () => {
  return localStorage.getItem('token');
};

// Helper function to set auth token
const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem('token', token);
  } else {
    localStorage.removeItem('token');
  }
};

// Helper function to get headers
const getHeaders = () => {
  const token = getAuthToken();
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` })
  };
};

// Generic API request function
const apiRequest = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: getHeaders(),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'API request failed');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Authentication API
export const authAPI = {
  login: async (email, password) => {
    const data = await apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
    setAuthToken(data.token);
    return data;
  },

  logout: () => {
    setAuthToken(null);
  },

  getProfile: async () => {
    return await apiRequest('/auth/profile');
  },

  updateProfile: async (profileData) => {
    return await apiRequest('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData)
    });
  },

  changePassword: async (currentPassword, newPassword) => {
    return await apiRequest('/auth/change-password', {
      method: 'PUT',
      body: JSON.stringify({ currentPassword, newPassword })
    });
  }
};

// Dashboard API
export const dashboardAPI = {
  getStats: async () => {
    return await apiRequest('/dashboard/stats');
  },

  getAnalytics: async (days = 7) => {
    return await apiRequest(`/dashboard/analytics?days=${days}`);
  },

  getRecentActivities: async () => {
    return await apiRequest('/dashboard/activities');
  },

  getEmployees: async () => {
    return await apiRequest('/dashboard/employees');
  }
};

// Employees API
export const employeesAPI = {
  getAll: async (page = 1, limit = 10, search = '', sortBy = 'createdAt', sortOrder = 'asc') => {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      search,
      sortBy,
      sortOrder
    });
    return await apiRequest(`/employees?${params}`);
  },

  getById: async (id) => {
    return await apiRequest(`/employees/${id}`);
  },

  create: async (employeeData) => {
    return await apiRequest('/employees', {
      method: 'POST',
      body: JSON.stringify(employeeData)
    });
  },

  update: async (id, employeeData) => {
    return await apiRequest(`/employees/${id}`, {
      method: 'PUT',
      body: JSON.stringify(employeeData)
    });
  },

  delete: async (id) => {
    return await apiRequest(`/employees/${id}`, {
      method: 'DELETE'
    });
  },

  getActive: async () => {
    return await apiRequest('/employees/active');
  }
};

// Leads API
export const leadsAPI = {
  getAll: async (page = 1, limit = 10, search = '', status = '', type = '', assignedTo = '') => {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      search,
      status,
      type,
      assignedTo
    });
    return await apiRequest(`/leads?${params}`);
  },

  getById: async (id) => {
    return await apiRequest(`/leads/${id}`);
  },

  create: async (leadData) => {
    return await apiRequest('/leads', {
      method: 'POST',
      body: JSON.stringify(leadData)
    });
  },

  update: async (id, leadData) => {
    return await apiRequest(`/leads/${id}`, {
      method: 'PUT',
      body: JSON.stringify(leadData)
    });
  },

  delete: async (id) => {
    return await apiRequest(`/leads/${id}`, {
      method: 'DELETE'
    });
  },

  assign: async (id, employeeId) => {
    return await apiRequest(`/leads/${id}/assign`, {
      method: 'PUT',
      body: JSON.stringify({ employeeId })
    });
  },

  close: async (id) => {
    return await apiRequest(`/leads/${id}/close`, {
      method: 'PUT'
    });
  },

  uploadCSV: async (leads, distributionType) => {
    return await apiRequest('/leads/upload-csv', {
      method: 'POST',
      body: JSON.stringify({ leads, distributionType })
    });
  },

  getStats: async () => {
    return await apiRequest('/leads/stats');
  }
};

const api = {
  auth: authAPI,
  dashboard: dashboardAPI,
  employees: employeesAPI,
  leads: leadsAPI
};

export default api; 