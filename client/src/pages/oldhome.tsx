import React, { useEffect, useState } from 'react';
import EventCard from '../components/EventCard';
import { Button, Text, Spinner, VStack, Box } from "@chakra-ui/react";
import './Home.css';
import { Link } from "react-router-dom";
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

const Home: React.FC = () => {
    const [ticketData, setTicketData] = useState<any[]>([]);
    const [_error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [userName, setUserName] = useState<string | null>(null);
    const [showWelcome, setShowWelcome] = useState<boolean>(false);
    const [showHello, setHello] = useState<boolean>(false);

    useEffect(() => {
        const userProfile = AuthService.getProfile();
        if (userProfile) {
            setUserName(userProfile.userName);
        }

        if (localStorage.getItem("firstLogin") === "true") {
            setShowWelcome(true);
            localStorage.setItem("firstLogin", "false");
            setTimeout(() => {
                setShowWelcome(false);
            }, 4000);
        }

        if (localStorage.getItem("firstSignUp") === "true") {
            setHello(true);
            localStorage.setItem("firstSignUp", "false");
            setTimeout(() => {
                setHello(false);
            }, 5000);
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
                    const errorData = await response.json();
                    console.error("Failed to fetch ticketData", errorData);
                    setError("Failed to fetch events.");
                    return;
                }

                const fetchedTicketData = await response.json();
                console.log("User successfully fetched ticket data:", fetchedTicketData);
                setTicketData(fetchedTicketData);
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
                    <Button className="logout" size="sm" variant="outline">
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
            <p className='user'>Signed in as: {userName || "User"}</p>
            <img src={AlineTeal} alt="Aline Header" style={{ height: '200px', display: 'block', margin: '0 auto' }} />

            {showHello ? (
                <h1 className='hello-message'>Hello, {userName || "New User"}! Welcome to Aline Events!</h1>

            ) : (
                <div className="cards-container">
                    {loading ? (
                        <VStack colorPalette="teal" marginTop="20px">
                            <Spinner color="colorPalette.600" />
                            <Text color="colorPalette.600">Getting Events...</Text>
                        </VStack>
                    ) : (
                        ticketData && ticketData.slice(0, 6).map((event, index) => (
                            <EventCard key={index} event={event} events={ticketData} setEvents={setTicketData} />
                        ))
                    )}
                </div>
            )}

            {showWelcome ? (
                <h1 className='welcome'>Welcome Back, {userName || "User"}!</h1>
            ) : (
                <div className="cards-container">
                    {loading ? (
                        <VStack colorPalette="teal" marginTop="20px">
                            <Spinner color="colorPalette.600" />
                            <Text color="colorPalette.600">Getting Events...</Text>
                        </VStack>
                    ) : (
                        ticketData && ticketData.slice(0, 6).map((event, index) => (
                            <EventCard key={index} event={event} events={ticketData} setEvents={setTicketData} />
                        ))
                    )}
                </div>
            )}
        </>
    );
};

export default Home;
