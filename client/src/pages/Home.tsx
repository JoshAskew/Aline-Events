import React, { useEffect, useState } from 'react';
import { Button, Text, Spinner, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import EventCard from '../components/EventCard';
import WeatherSidebar from "../components/SideBar";
import AuthService from "../utils/auth";
import AlineTeal from "../images/alineteal.webp";
import {
    PopoverArrow,
    PopoverBody,
    PopoverContent,
    PopoverRoot,
    PopoverTitle,
    PopoverTrigger,
} from "../components/ui/popover";
import './Home.css';

const Home: React.FC = () => {
    const [ticketData, setTicketData] = useState<any[]>([]);
    const [weatherData, setWeatherData] = useState<any | null>(null);
    const [_weatherError, setWeatherError] = useState<string | null>(null);
    const [loadingWeather, setLoadingWeather] = useState<boolean>(true);
    
  
    const [_error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [userName, setUserName] = useState<string | null>(null);
    const [showContent, setShowContent] = useState<boolean>(false);


    // Fetch Ticket Data
    useEffect(() => {
        const userProfile = AuthService.getProfile();
        if (userProfile) {
            setUserName(userProfile.userName);
        }

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
                console.log("User successfully fetched ticket data:", fetchedticketData);
                setTicketData(fetchedticketData);

            } catch (error) {
                console.error("An error occurred while fetching events:", error);
                setError("An error occurred while fetching events.");
            } finally {
                setLoading(false);
                setTimeout(() => {
                    setShowContent(true);
                }, 5000);
            }
        };

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
            }
        };

        fetchEvents();
        fetchWeatherData();
    }, []);

    // Fetch Weather Data

    return (
        <>
            {
                loadingWeather ? (<WeatherSidebar weatherData={weatherData}/>): null
            }
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
                            <Button onClick={()=>AuthService.logout()} className="logout" size="sm" variant="outline">
                                Yes, Log Me Out
                            </Button>
                        </Link>
                    </PopoverBody>
                </PopoverContent>
            </PopoverRoot>
            <p className='user'>Signed in as: {userName || "User"}</p>
            <img src={AlineTeal} alt="Aline Header" style={{ height: '200px', display: 'block', margin: '0 auto' }}></img>

            {showContent ? (
                <>
                    <div className="cards-container">
                        {loading ? (
                            <VStack colorPalette="teal" marginTop="20px">
                                <Spinner color="colorPalette.600" />
                                <Text color="colorPalette.600">Getting Events..</Text>
                            </VStack>
                        ) : (
                            ticketData && ticketData.slice(0, 6).map((event, index) => (
                                <EventCard key={index} event={event} events={ticketData} setEvents={setTicketData} />
                            ))
                        )}
                    </div>
                </>
            ) : (
                <h1 className='welcome'>Welcome Back, {userName || "User"}!</h1>
            )}
        </>
    );
};

export default Home;
