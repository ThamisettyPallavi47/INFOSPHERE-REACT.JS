import React from 'react';
import '../components/styles/Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} NRKS Skill Development Private Limited. All rights reserved.</p>
    </footer>
  );
}
