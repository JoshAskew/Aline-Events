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
import { Box } from '@chakra-ui/react';


import { Stack } from "@chakra-ui/react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Field } from "../components/ui/field"
import { Slider } from "../components/ui/slider"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"


const Home: React.FC = () => {
    const [ticketData, setTicketData] = useState<any[]>([]);
    const [weatherData, setWeatherData] = useState<any | null>(null);
    const [_weatherError, setWeatherError] = useState<string | null>(null);
    const [loadingWeather, setLoadingWeather] = useState<boolean>(true);


    const [_error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [userName, setUserName] = useState<string | null>(null);
    const [showHello, setHello] = useState<boolean>(false);  // For new user sign-up
    const [showWelcome, setShowWelcome] = useState<boolean>(false);  // For returning user login
    const [showContent, setShowContent] = useState<boolean>(false);  // To control content visibility
    const [radius, setRadius] = useState<number>(50);

    // Fetch Ticket Data
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
            }, 5000);  // Show message for 5 seconds
        }

        if (localStorage.getItem("firstSignUp") === "true") {
            setHello(true);
            localStorage.setItem("firstSignUp", "false");
            setTimeout(() => {
                setHello(false);
            }, 5000);  // Show message for 5 seconds
        }

        const fetchEvents = async () => {
            setLoading(true);
            try {
                const response = await fetch("/api/ticketData", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${AuthService.getToken()}`
                    },
                    body: JSON.stringify({radius}),
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

        fetchEvents();
        fetchWeatherData();
    }, [radius]);

    // Once both event and weather data are fetched, show the content
    useEffect(() => {
        if (!loading && !loadingWeather) {
            setShowContent(true);
        }
    }, [loading, loadingWeather]);



    const formSchema = z.object({
        value: z.array(
          z
            .number({ message: "Radius is required" })
            .min(50, { message: "Radius must be greater than 50" }),
        ),
      })
      
      type FormValues = z.infer<typeof formSchema>

    const {
        control,
        handleSubmit,
        formState: { errors },
      } = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: { value: [radius] },
      })
    
      const onSubmit = handleSubmit((data) => {setRadius(data.value[0]) })
     


    return (
        <>
         <Box bg="black" className="dark"
            minHeight="100vh" 
            bgGradient="linear(to-r, gray.50, teal.100)"
            p={4}
        >
            {/* Display Welcome messages */}
            {showWelcome && (
                <h1 className='welcome'>Welcome Back, {userName || "User"}!</h1>
            )}
            {showHello && (
                <h1 className='welcome'>Welcome to Aline Events, {userName || "User"}!</h1>
            )}

            {weatherData && <WeatherSidebar weatherData={weatherData} />}

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
                            <Button onClick={() => AuthService.logout()} className="logout" size="sm" variant="outline">
                                Yes, Log Me Out
                            </Button>
                        </Link>
                    </PopoverBody>
                </PopoverContent>
            </PopoverRoot>
            
            <div className='user'>Signed in as: {userName || "User"}</div>

            <form onSubmit={onSubmit}>
      <Stack className='slider' align="flex-start" gap="4" maxW="300px">
        <Controller
          name="value"
          control={control}
          render={({ field }) => (
            <Field
              label={`Search Radius(mi): ${field.value[0]}`}
              invalid={!!errors.value?.length}
              errorText={errors.value?.[0]?.message}
            >
              <Slider
                width="full"
                min={50}
                max={500}
                colorPalette= 'teal'
                step= {25}
                onFocusChange={({ focusedIndex }) => {
                  if (focusedIndex !== -1) return
                  field.onBlur()
                }}
                name={field.name}
                value={field.value}
                onValueChange={({ value }) => {
                  field.onChange(value)
                }}
              />
            </Field>
          )}
        />

        <Button className= "radius-button" size="sm" type="submit">
          Select Radius
        </Button>
      </Stack>
    </form>



            <img src={AlineTeal} alt="Aline Header" style={{ height: '200px', display: 'block', margin: '0 auto', marginTop:'-160px' }} />

            {showContent ? (
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
            ) : (
                <VStack colorPalette="teal" marginTop="20px">
                    <Spinner color="colorPalette.600" />
                    <Text color="colorPalette.600">Loading Content...</Text>
                </VStack>
            )}
            </Box>
        </>
    );
};

export default Home;
