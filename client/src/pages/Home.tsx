import React, { useState, useEffect } from 'react';
import { Event } from '../interfaces/Events';
import { searchTicketMaster } from '../api/API';
import EventCard from '../components/EventCard';

import { Button, Card, Image, Text } from "@chakra-ui/react"
import './Home.css'
import Aline from "../images/aline.webp"
import { Link } from "react-router-dom";
import WeatherSidebar from "../components/SideBar";
import {
    PopoverArrow,
    PopoverBody,
    PopoverContent,
    PopoverRoot,
    PopoverTitle,
    PopoverTrigger,
} from "../components/ui/popover"



const Home: React.FC = () => {

    const [events, setEvents] = useState<Event[]>([]); // Initialize empty array
    const [error, setError] = useState<string | null>(null);
    const [eventsIndex, setEventsIndex] = useState<number>(0); // Initialize empty array

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const allEvents = await searchTicketMaster(); // Fetch events using the initial API function

                const detailedEvents = await Promise.all(
                    allEvents.map(async (_allEvents) => {
                      // Fetch detailed data for each candidate by username
                      //const detailedData = await searchGithubUser(allCandidates.login);

                   //   return detailedData;

                   return [][0];
                    })
                  );
          
                  // Set candidates with detailed data
                  setEvents(detailedEvents);

            } catch (err) {
                console.error('Failed to fetch events:', err);
                setError('Failed to fetch events');
            }
        };

        fetchEvents();
    }, []);

    const addToEventList = (): void => {

        let eventName: Event[] = [];

        let getData: string | null = localStorage.getItem('event') || null;

        if (getData !== null) {
            eventName = JSON.parse(getData);
        }

        eventName.push(events[eventsIndex]);
        localStorage.setItem('user', JSON.stringify(eventName));

        if (events.length - 1 !== eventsIndex) {
            setEventsIndex(eventsIndex + 1);
        }

    }

    const removeFromEvents = (): void => {
        if (events.length - 1 !== eventsIndex) {
            setEventsIndex(eventsIndex + 1);
        }
    }

    if (error) {
        return <div>Error: {error}</div>;
    }


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

    // Saying the same thing 

    // return (
    //     <>
    //         <WeatherSidebar />
    //         <Link to="/SavedEvents">
    //             <Button className="saved-button" size="sm" variant="outline">Saved Events</Button>
    //         </Link>
    //         <PopoverRoot>
    //             <PopoverTrigger asChild>
    //                 <Button className="logout" size="sm" variant="outline">
    //                     Logout
    //                 </Button>
    //             </PopoverTrigger>
    //             <PopoverContent>
    //                 <PopoverArrow />
    //                 <PopoverBody>
    //                     <PopoverTitle fontWeight="bold">Are you sure you want to logout?</PopoverTitle>
    //                     <Text my="4">
    //                         These prices are not guaranteed to persist.
    //                     </Text>
    //                     <Link to="../Login">
    //                         <Button className="logout" size="sm" variant="outline">
    //                             Yes, Log Me Out
    //                         </Button>
    //                     </Link>
    //                 </PopoverBody>
    //             </PopoverContent>
    //         </PopoverRoot>
    //         <h1 className="header">Aline</h1>
    //         <div className="cards-container">
    //             <div>
    //                 <div className="event-list">
    //                     {(events.length > 0 && events.length - 1 !== eventsIndex) ? (
    //                         <EventCard
    //                             event={events[eventsIndex]}
    //                             addToEventList={addToEventList}
    //                             removeFromEvents={removeFromEvents}
    //                         />
    //                     ) : (
    //                         <p>No Events found.</p>
    //                     )}
    //                 </div>
    //             </div>
    //         </div>
    //     </>
    // );


};

export default Home;