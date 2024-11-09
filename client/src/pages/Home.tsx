import React, { useEffect, useState } from 'react';
// import { Event } from '../interfaces/Events';
// import { searchTicketMaster } from '../api/API';
//import EventCard from '../components/EventCard';

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
//import { Spinner, VStack } from "@chakra-ui/react"


const Home: React.FC = () => {

    const [_ticketData, setTicketData] = useState<any[]>([]);
    const [_weatherData, setWeatherData] = useState<any | null>(null);
    const [_ticketError, setTicketError] = useState<string | null>(null);
    const [_weatherError, setWeatherError] = useState<string | null>(null);
    const [_loadingTickets, setLoadingTickets] = useState<boolean>(true);
    const [_loadingWeather, setLoadingWeather] = useState<boolean>(true);
   
    const fetchTicketData = async () => {
        setLoadingTickets(true);
        try {
            const response = await fetch("/api/ticketData", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${AuthService.getToken()}`
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Failed to fetch ticketData", errorData);
                setTicketError("Failed to fetch ticket data.");
                return;
            }

            const fetchedTicketData = await response.json();
            console.log("Fetched Ticket Data:", fetchedTicketData);
            setTicketData(fetchedTicketData);

        } catch (error) {
            console.error("An error occurred while fetching ticket data:", error);
            setTicketError("An error occurred while fetching ticket data.");
        } finally {
            setLoadingTickets(false);
        }
    };

    // Fetch Weather Data
    const fetchWeatherData = async () => {
        setLoadingWeather(true);
        try {
            const response = await fetch("/api/weatherData", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${AuthService.getToken()}`
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Failed to fetch weatherData", errorData);
                setWeatherError("Failed to fetch weather data.");
                return;
            }

            const fetchedWeatherData = await response.json();
            console.log("Fetched Weather Data:", fetchedWeatherData);
            setWeatherData(fetchedWeatherData);

        } catch (error) {
            console.error("An error occurred while fetching weather data:", error);
            setWeatherError("An error occurred while fetching weather data.");
        } finally {
            setLoadingWeather(false);
        }
    };

    useEffect(() => {
        fetchTicketData();
        fetchWeatherData();
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
                {/* {loading ? (
                    <VStack colorPalette="teal" marginTop="20px">
                        <Spinner color="colorPalette.600" />
                        <Text color="colorPalette.600">Loading...</Text>
                    </VStack> */}
                {/* ) : (
                    ticketData && ticketData.slice(0, 6).map((event, index) => (
                        <EventCard key={index} event={event} events={ticketData} setEvents={setTicketData} />
                    ))
                )} */}
            </div>
        </>
    );

};

export default Home;