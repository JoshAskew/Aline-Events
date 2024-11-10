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
import './SavedEvents.css';
import { Heading, Stack, Table } from "@chakra-ui/react"
import { CloseButton } from "../components/ui/close-button"
import { Button } from "../components/ui/button"
import { useNavigate } from 'react-router-dom';


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

    const navigate = useNavigate();

  const handleBack = () => {
  navigate(-1);  
  };

    return (
        <div className='table-wrapper'>
        <button className="back-button" onClick={handleBack}>Back To Events</button>
        <Stack width="full" gap="5">
        <Heading size="xl">My Saved Events</Heading>
        <Table.Root size="sm" variant="outline" striped>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader className='table-headers'>Buy</Table.ColumnHeader>
              <Table.ColumnHeader className='table-headers'>Event</Table.ColumnHeader>
              <Table.ColumnHeader className='table-headers'>Date</Table.ColumnHeader>
              <Table.ColumnHeader className='table-headers'>Venue</Table.ColumnHeader>
              <Table.ColumnHeader className='table-headers'>Remove Event</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
          {savedEvents.map((event) => (
            
              <Table.Row key={event.id}>
                 <Table.Cell className='event-date'><a className='buy-now' href={event.url} target='_blank'>Buy Now</a></Table.Cell>
                <Table.Cell className='event-headers'>{event.name} <img src={event.imageUrl} alt={event.name} style={{ width: '100px'}} /></Table.Cell>
                <Table.Cell className='event-date'>{event.date}</Table.Cell>
                <Table.Cell className='event-venue' >{event.venue}</Table.Cell>
                <Table.Cell > <CloseButton className='delete-button' variant="solid" /></Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Stack>
        </div>
      );

};

export default SavedEvents;