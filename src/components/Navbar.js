
import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import '../components/styles/Navbar.css';

const categories = [
  "Finance", "Technology", "Health", "Education", "Politics",
  "Business", "Travel", "Sports", "Lifestyle", "Books", "Science"
];

export default function Navbar({ darkMode, toggleDarkMode }) {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <NavLink to="/">Infosphere</NavLink>
      </div>

      <ul className="navbar-categories">
        {isHome ? (
          <>
            <li><a href="#trending-categories">Trending Categories</a></li>
            <li><a href="#about-us-home">About</a></li>
            <li><a href="#contact-us-home">Contact</a></li>
          </>
        ) : (
          <>
            <li><NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink></li>
            <li
              className="dropdown"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <span className="dropdown-title">Trending Categories ▼</span>
              {dropdownOpen && (
                <ul className="dropdown-menu">
                  {categories.map(cat => (
                    <li key={cat}>
                      <NavLink
                        to={`/category/${cat.toLowerCase()}`}
                        onClick={() => setDropdownOpen(false)}
                        className={({ isActive }) => isActive ? 'active' : ''}
                      >
                        {cat}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
            </li>
            <li><NavLink to="/about" className={({ isActive }) => isActive ? 'active' : ''}>About</NavLink></li>
            <li><NavLink to="/contact" className={({ isActive }) => isActive ? 'active' : ''}>Contact</NavLink></li>
          </>
        )}

        {/* 🌗 Toggle Button */}
        <li
          className="theme-toggle-btn"
          onClick={toggleDarkMode}
          title="Toggle theme"
        >
          {darkMode ? '🌙' : '☀️'}
        </li>
      </ul>
    </nav>
  );
}
