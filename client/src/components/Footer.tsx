import React from 'react';
import "./Footer.css"

const Footer: React.FC = () => {
  return (
    <footer>
      <p className='copy'>&copy; {new Date().getFullYear()} Aline All Rights Reserved.</p>
    </footer>
  );
};

export default Footer;


