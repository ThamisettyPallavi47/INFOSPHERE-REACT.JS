
import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import { Link as ScrollLink } from 'react-scroll';

import '../components/styles/Navbar.css';

const categories = [
  "Finance", "Technology", "Health", "Education", "Politics",
  "Business", "Travel", "Sports", "Lifestyle", "Books", "Science"
];

export default function Navbar({ darkMode, toggleDarkMode }) {
  const location = useLocation();
  // const isHome = location.pathname === '/';
  const isHome = location.pathname === '/' || location.pathname === '/INFOSPHERE-REACT.JS/';

  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <NavLink to="/">Infosphere</NavLink>
      </div>

      <ul className="navbar-categories">
        {/* {isHome ? (
          <>
            <li><a href="#trending-categories">Trending Categories</a></li>
            <li><a href="#about-us-home">About</a></li>
            <li><a href="#contact-us-home">Contact</a></li>
          </>
        ) : ( */}
        {isHome ? (
  <>
    <li>
      <ScrollLink
        to="trending-categories"
        smooth={true}
        duration={500}
        offset={-80} // adjust if your navbar overlaps
      >
        Trending Categories
      </ScrollLink>
    </li>
    <li>
      <ScrollLink
        to="about-us-home"
        smooth={true}
        duration={500}
        offset={-80}
      >
        About
      </ScrollLink>
    </li>
    <li>
      <ScrollLink
        to="contact-us-home"
        smooth={true}
        duration={500}
        offset={-80}
      >
        Contact
      </ScrollLink>
    </li>
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
