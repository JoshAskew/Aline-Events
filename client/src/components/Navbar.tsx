import { Link } from 'react-router-dom';
import "./Navbar.css"
import  User from "../images/user.png"
import Home from "../images/home.png"

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="./AboutAline">❔About Aline</Link></li>
        <li>
  <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
  <img
  src={Home}
  width={15}
  alt="User icon"
  style={{ marginRight: '8px' }}
/>
    To Home
  </Link>
</li>
        <li>
  <Link to="./Login" style={{ display: 'flex', alignItems: 'center' }}>
  <img
  src={User}
  width={15}
  alt="User icon"
  style={{ marginRight: '8px' }}
/>
    To Login
  </Link>
</li>
      </ul>
    </nav>
  );
};

export default Navbar;
