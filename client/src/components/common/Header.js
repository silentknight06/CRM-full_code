import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './Header.css';

const mockResults = [
  'Tanner Finsha',
  'Emeto Winner',
  'Tassy Omah',
  'Priya',
  'Jay'
];

const getBreadcrumb = (pathname) => {
  if (pathname.startsWith('/leads')) return 'Home > Leads';
  if (pathname.startsWith('/employees')) return 'Home > Employees';
  if (pathname === '/' || pathname.startsWith('/dashboard')) return 'Home > Dashboard';
  return 'Home';
};

const Header = () => {
  const [search, setSearch] = useState('');
  const [showResults, setShowResults] = useState(false);
  const location = useLocation();

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setShowResults(true);
  };

  const filteredResults = mockResults.filter(r => r.toLowerCase().includes(search.toLowerCase()));

  return (
    <header className="header">
      <div className="search-bar-container">
        <span className="search-icon" role="img" aria-label="search">🔍</span>
        <input
          type="text"
          className="search-bar"
          placeholder="Search here..."
          value={search}
          onChange={handleSearchChange}
          onFocus={() => setShowResults(true)}
          onBlur={() => setTimeout(() => setShowResults(false), 200)}
        />
        {showResults && search && (
          <div className="search-results-dropdown">
            {filteredResults.length > 0 ? (
              filteredResults.map((result, idx) => (
                <div key={idx} className="search-result-item">{result}</div>
              ))
            ) : (
              <div className="search-result-item">No results found</div>
            )}
          </div>
        )}
      </div>
      <div className="breadcrumb-row">
        <nav className="breadcrumb">
          {getBreadcrumb(location.pathname)}
        </nav>
      </div>
    </header>
  );
};

export default Header; 