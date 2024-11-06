import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} Aline All rights reserved.</p>
      <nav>
        <a href="https://github.com/JoshAskew/Aline-Events">Contact Us</a>
      </nav>
    </footer>
  );
};

export default Footer;
