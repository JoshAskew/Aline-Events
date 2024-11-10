import React, { useEffect, useState } from 'react';
import AuthService from "../utils/auth";
import './SavedEvents.css';
import { Heading, Stack, Table } from "@chakra-ui/react"
import { CloseButton } from "../components/ui/close-button"
import { useNavigate } from 'react-router-dom';
import { deleteEvent } from '../api/eventAPI';
import { EmptyState } from "../components/ui/empty-state"
import { HiColorSwatch } from "react-icons/hi"


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

const SavedEvents: React.FC<Props> = () => {
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
    }, []);

    const handleDelete = async (eventId: string) => {

        try {
            const response = await deleteEvent(Number(eventId));
            if (response.message === 'Event deleted') {
                setSavedEvents(savedEvents.filter((event) => event.id !== eventId));
            } else {
                console.error('Failed to delete event');
            }
        } catch (error) {
            console.error('Failed to delete event', error);
        }
    };

    const navigate = useNavigate();

  const handleBack = () => {
  navigate(-1);  
  };

    return (
        <div className='table-wrapper'>
        <button className="back-button" onClick={handleBack}>Back To Events</button>
        <Stack width="full" gap="5">
        <Heading size="xl">My Saved Events</Heading>
        {savedEvents.length > 0 ? (
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
                <Table.Cell > <CloseButton onClick={() => handleDelete(event.id)} className='delete-button' variant="solid" /></Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
        ) : (
            <EmptyState className='empty-state-container'
            icon={<HiColorSwatch />}
            title="No events currently saved"
            description="Save some events and come check them out here!">
          </EmptyState>
        )}
      </Stack>
        </div>
      );

};

export default SavedEvents;