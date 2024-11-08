import './AboutAline.css'
import {} from "@chakra-ui/react"
import { useNavigate } from 'react-router-dom';


const AboutAline = () => {

  const navigate = useNavigate();

  const handleBack = () => {
  navigate(-1);  
  };

  return (

  <section className="about-aline">
    <button className="back-button2" onClick={handleBack}>Back</button>

      <h1 className="header">About Aline</h1>
        <p className="p1">
          Welcome to Aline - Your One-Stop Solution for local events whether you're taking it solo or with friends!
        </p> 

        <h2>Welcome to Aline!</h2> 
        <p className="p1">Discover the pulse of your local scene with Aline, your ultimate guide to finding and exploring exciting events around you.
          Whether it's a community festival, a vibrant market, or an exclusive concert,
          Aline makes it easy to uncover what's happening and stay in the know about event details and prices.
          Created by a dedicated group of collaborators,
          Aline reflects the passion and expertise of a diverse team committed to enhancing your event-finding experience.
          Join us in creating memorable experiences and making the most of every opportunity right in your community.</p> 

        <h2>Our Story</h2> 
        <p className='p1'>Aline emerged from a group project that turned into a mission-driven venture.
          What started as a shared vision among friends has grown into a dynamic organization committed to excellence and customer satisfaction.
          Together, we have expanded our offerings and honed our expertise to bring you the very best in discovering local events and their prices.</p> 

        <h2>Our Mission</h2>
         <p className='p1'>Our mission is to make finding local events and their prices accessible and effective for everyone.
            Whether you are an individual looking to explore your community or a business aiming to reach more attendees,
            Aline is here to support you every step of the way. We believe in innovation, integrity, and collaboration,
            and strive to embody these principles in everything we do.</p> 

<div className="team-container">
  <h2 className='h2'>Meet Our Team</h2>
    <div className="team-member">
      <h3><a href='https://github.com/TheReal4m4d3u5'>Avery Jacobson</a></h3>
      <p>Front-end and Back-end Engineer</p>
    </div>

  <div className="team-member">
    <h3><a href='https://github.com/cgroth06'>Chris Groth</a></h3>
    <p>Front-end and Back-end Engineer</p>
  </div>

  <div className="team-member">
    <h3><a href='https://github.com/ChristopherP-C'>Chris Persaud-cox</a></h3>
    <p>Front-end and Back-end Engineer</p>
  </div>

  <div className="team-member">
    <h3><a href='https://github.com/DimintriLo'>Dimintri Lo</a></h3>
    <p>Front-end Engineer</p>
  </div>

  <div className="team-member">
    <h3><a href='https://github.com/JoshAskew'>Josh Askew</a></h3>
    <p>Front-end and Back-end Engineer</p>
  </div>
</div>

<h2>Get in Touch</h2>
    <p className="p1">We're here to provide any <a className='contact' href=''>assistance or support</a> you may need.
      Feel free to get in touch with us directly for the latest updates and information about Aline.
      Together, let's achieve greatness!</p>
</section>
  );
};
  
export default AboutAline;
