import React, { useEffect, useState } from 'react';
// import { Event } from '../interfaces/Events';
// import { searchTicketMaster } from '../api/API';
import EventCard from '../components/EventCard';

import { Button, Text } from "@chakra-ui/react"
import './Home.css'
import { Link } from "react-router-dom";
import WeatherSidebar from "../components/SideBar";
import AuthService from "../utils/auth";
import AlineTeal from "../images/alineteal.webp"
import {
    PopoverArrow,
    PopoverBody,
    PopoverContent,
    PopoverRoot,
    PopoverTitle,
    PopoverTrigger,
} from "../components/ui/popover"
import { Spinner, VStack } from "@chakra-ui/react"


const Home: React.FC = () => {

    const [ticketData, setTicketData] = useState<any[]>([]);
    const [_error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    //take their zipcode that is stored in a database postgres db
    useEffect(() => {
        const fetchEvents = async () => {
            setLoading(true);

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
            } finally {
                setLoading(false);
            }

            try {
                const response = await fetch("/api/weatherData", {
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
            } finally {
                setLoading(false);
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
            <img src={AlineTeal} alt="Aline Header" style={{ height: '200px', display: 'block', margin: '0 auto' }}></img>

            <div className="cards-container">
                {loading ? (
                    <VStack colorPalette="teal" marginTop="20px">
                        <Spinner color="colorPalette.600" />
                        <Text color="colorPalette.600">Loading...</Text>
                    </VStack>
                ) : (
                    ticketData && ticketData.slice(0, 6).map((event, index) => (
                        <EventCard key={index} event={event} events={ticketData} setEvents={setTicketData} />
                    ))
                )}
            </div>
        </>
    );

};

export default Home;