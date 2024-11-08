import React from 'react';
import { Card, Image, Text, Button } from "@chakra-ui/react";
import { Event } from '../interfaces/Events.tsx';
import {saveEvent} from '../api/eventAPI.tsx';
import Aline from '../images/aline.webp';

interface EventCardProps {
  event: Event;
  events: Event[];
  //Dispatch in lieu of useState
  setEvents: React.Dispatch<React.SetStateAction<Event[]>>;
  //addToEventList: () => void | undefined;  - from initial code
  //removeFromEvents: () => void | undefined; - from initial code
}

const EventCard: React.FC<EventCardProps> = ({ event, events, setEvents }) => {
  const [saveable, setSaveable] = React.useState(false);

  const addToEventList = async () => {
    setSaveable(true);
    try{
      //save to local storage
      let savedEvents = JSON.parse(localStorage.getItem('savedEvents') || '[]');
      savedEvents.push(event);
      localStorage.setItem('savedEvents', JSON.stringify(savedEvents));

      const response = await saveEvent(event);
      console.log('Event saved:', response);

      nextEvent();
    } catch (error) {
      console.error('Failed to save event:', error);
    }
    setSaveable(false);
  };

  const nextEvent = () => {
    setEvents(events.filter((e) => e.id !== event.id));
  };

  return (
    <Card.Root className="card" maxW="sm" overflow="hidden">
    <Image
        src={Aline}
    />
    <Card.Body gap="2">
        <Card.Title>{event.name}</Card.Title>
        <Card.Description>
            {/* {event.venue} */}
        </Card.Description>
        <Card.Description>
            {/* Click Here For Details and Tickets{event.url} */}
        </Card.Description>
        <Card.Description>
            {/* {event.date} */}
        </Card.Description>
        <Text textStyle="2xl" fontWeight="medium" letterSpacing="tight" mt="2">
            {/* {event.price} */}
        </Text>
      </Card.Body>
      <Card.Footer gap="2">
        <Button variant="solid" onClick={addToEventList} _loading={{opacity: 0.6}}>{saveable? 'Saving...' : 'Save Event'}</Button>
        <Button variant="ghost" onClick={nextEvent}>Skip Event</Button>
      </Card.Footer>
    </Card.Root>
  );
};

export default EventCard;

