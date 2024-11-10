import React, { useEffect, useState } from 'react';
// import { Button, Text, Spinner, VStack } from "@chakra-ui/react";
// import { Link } from "react-router-dom";
// import EventCard from '../components/EventCard';
// import WeatherSidebar from "../components/SideBar";
import AuthService from "../utils/auth";
// import AlineTeal from "../images/alineteal.webp";
// import {
//     PopoverArrow,
//     PopoverBody,
//     PopoverContent,
//     PopoverRoot,
//     PopoverTitle,
//     PopoverTrigger,
// } from "../components/ui/popover";
import './Home.css';

//create a saved events page which will check a users JWT token for their id, authenticate it, then if it is valid, fetch each event from the events database which has the proper id in its userId column
//then display each event in a card format
type Event = {
    id: string;
    name: string;
    url: string;
    imageUrl: string;
    venue: string;
    date: string;
}

type Props = {
    token: string;
};

const SavedEvents: React.FC<Props> = ({ token }) => {
    const [savedEvents, setSavedEvents] = useState<Event[]>([]);

    useEffect(() => {
        const fetchSavedEvents = async () => {
            try {
                const response = await fetch("/api/events/saved", {
                    method: "GET",
                    headers: {
                        'Authorization': `Bearer ${AuthService.getToken()}`
                    }
                });

                if (!response.ok) {
                    console.error("Failed to fetch saved events");
                    return;
                }

                const data = await response.json();
                console.log(data);
                setSavedEvents(data);
            } catch (error) {
                console.error("Failed to fetch saved events", error);
            }
        };
        fetchSavedEvents();
    }, [token]);

    return (
        <div>
          <h1>Saved Events</h1>
          <ul>
            {savedEvents.map((event) => (
              <li key={event.id}>
                <h2>{event.name}</h2>
                <p>Date: {event.date}</p>
                <p>Venue: {event.venue}</p>
                <a href={event.url}>Event Link</a>
                <img src={event.imageUrl} alt={event.name} style={{ width: '150px' }} />
              </li>
            ))}
          </ul>
        </div>
      );

};

export default SavedEvents;