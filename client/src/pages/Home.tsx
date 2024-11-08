import React, { useEffect, useState } from 'react';
// import { Event } from '../interfaces/Events';
// import { searchTicketMaster } from '../api/API';
//import EventCard from '../components/EventCard';

import { Button, Card, Image, Text } from "@chakra-ui/react"
import './Home.css'
import Aline from "../images/aline.webp"
import { Link } from "react-router-dom";
import WeatherSidebar from "../components/SideBar";
import AuthService from "../utils/auth";

import {
    PopoverArrow,
    PopoverBody,
    PopoverContent,
    PopoverRoot,
    PopoverTitle,
    PopoverTrigger,
} from "../components/ui/popover"


const Home: React.FC = () => {

    const [ticketData, setTicketData] = useState(null);
    const [error, setError] = useState<string | null>(null);

    //take their zipcode that is stored in a database postgres db
        useEffect(() => {
        const fetchEvents = async () => {

            try {
            const response = await fetch("/api/ticketData", {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${AuthService.getToken()}`
                },
              });
        
              if (!response.ok) {
                const errorData = await response.json(); // Get the error response body
                console.error("Failed to fetch ticketData", errorData);
                setError("Failed to fetch events.");
                return;
              }
        
              const fetchedticketData = await response.json();
              console.log("User successfully fetched fetchedTicketData:", fetchedticketData);
              setTicketData(fetchedticketData);
              console.log(ticketData);

            } catch (error) {
                console.error("An error occurred while fetching events:", error);
                setError("An error occurred while fetching events.");
            }
        };

        fetchEvents();
    }, []);

    return (
        <>
            <WeatherSidebar />
            <Link to="/SavedEvents">
                <Button className="saved-button" size="sm" variant="outline">Saved Events</Button>
            </Link>
            <PopoverRoot>
                <PopoverTrigger asChild>
                    <Button className="logout" size="sm" variant="outline" >
                        Logout
                    </Button>
                </PopoverTrigger>
                <PopoverContent>
                    <PopoverArrow />
                    <PopoverBody>
                        <PopoverTitle fontWeight="bold">Are you sure you want to logout?</PopoverTitle>
                        <Text my="4">
                            These prices are not guaranteed to persist.
                        </Text>
                        <Link to="../Login">
                            <Button className="logout" size="sm" variant="outline">
                                Yes, Log Me Out
                            </Button>
                        </Link>
                    </PopoverBody>
                </PopoverContent>
            </PopoverRoot>
            <h1 className="header">Aline</h1>
            <div className="cards-container">
                
                
                <Card.Root className="card" maxW="sm" overflow="hidden">
                    <Image
                        src={Aline}
                    />
                    <Card.Body gap="2">
                        <Card.Title>Event Title</Card.Title>

                            {/* Display the error if it exists */}
                            {error && <Text color="red.500" className="error-message">{error}</Text>}

                        <Card.Description>
                            This is the type of the event.
                        </Card.Description>
                        <Card.Description>
                            Start Date-End Date
                        </Card.Description>
                        <Text textStyle="2xl" fontWeight="medium" letterSpacing="tight" mt="2">
                            $450-$1000
                        </Text>
                    </Card.Body>
                    <Card.Footer gap="2">
                        <Button variant="solid">Save Event</Button>
                        <Button variant="ghost">Skip Event</Button>
                    </Card.Footer>
                </Card.Root>
            </div>
        </>
    );


};

export default Home;