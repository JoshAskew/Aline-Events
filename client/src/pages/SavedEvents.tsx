
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button"
import { RiArrowRightLine } from "react-icons/ri"

const Home = () => {
    return (
        <div className="home-container">
        <header className="home-header">
          <h1>Welcome to Aline</h1>
          <p>Discover events, explore, and never miss out on what's happening around you!</p>
        </header>
  
        <div>
          <Link to="/login">
          <Button size="xl" variant="ghost">Login <RiArrowRightLine /></Button>
          </Link>
          <Link to="/signup">
          <Button size="xl" variant="ghost">Sign Up</Button>
          </Link>
        </div>
      </div>
    );
};

export default Home;